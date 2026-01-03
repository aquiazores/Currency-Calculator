/**
 * CURRENCY CONVERTER BACKEND SERVER
 * 
 * This is our Express.js server that:
 * 1. Listens for requests from the frontend
 * 2. Converts currencies using exchange rates
 * 3. Saves conversion history to Supabase
 * 
 * Think of it like a waiter in a restaurant:
 * - Frontend (customer) makes a request
 * - Server (waiter) processes it
 * - Database (kitchen) stores the information
 * - Server returns the result to frontend
 */

// ============================================
// STEP 1: Import required packages
// ============================================
// These are like tools we need to build our server
const fetch = require('node-fetch');

const express = require('express');           // Express helps us create a web server
const cors = require('cors');                 // CORS allows frontend to talk to backend
const dotenv = require('dotenv');             // dotenv loads environment variables from .env file
const { createClient } = require('@supabase/supabase-js'); // Supabase client to connect to database

// Load environment variables from .env file
// This is like reading a secret note with passwords and API keys
dotenv.config();

// ============================================
// STEP 2: Create Express app
// ============================================
// This creates our server application
const app = express();

// ============================================
// STEP 3: Configure middleware
// ============================================
// Middleware is like a security guard that checks requests before they reach our code

// CORS: Allows our frontend (running on different port) to make requests
// Without this, browsers block requests for security reasons
app.use(cors());

// JSON parser: Converts incoming JSON data into JavaScript objects
// When frontend sends data, Express needs to understand it
app.use(express.json());

// ============================================
// STEP 4: Connect to Supabase
// ============================================
// Supabase is our database (like a digital filing cabinet)

// Get credentials from environment variables
// These are stored in .env file (never commit this file to git!)
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Check if credentials are provided
if (!supabaseUrl || !supabaseKey) {
    console.error('❌ ERROR: Missing Supabase credentials!');
    console.error('Please create a .env file with SUPABASE_URL and SUPABASE_KEY');
    process.exit(1); // Stop the server if credentials are missing
}

// Create Supabase client
// This is like getting a key to access our database
const supabase = createClient(supabaseUrl, supabaseKey);

console.log('✅ Connected to Supabase!');

// ============================================
// STEP 5: Helper function to get exchange rate
// ============================================
/**
 * Gets the exchange rate between two currencies
 * 
 * Example: If 1 USD = 0.92 EUR, then:
 * - fromCurrency = 'USD', toCurrency = 'EUR'
 * - Returns: 0.92 (meaning 1 USD = 0.92 EUR)
 * 
 * How it works:
 * 1. Get rate of "from" currency to USD
 * 2. Get rate of "to" currency to USD
 * 3. Calculate: (from_rate / to_rate) = exchange rate
 */
// ============================================
// STEP 5: Helper function to get exchange rate
// ============================================
// ============================================
// STEP 5: Helper function to get exchange rate
// ============================================
async function getExchangeRate(fromCurrency, toCurrency) {
    try {
        if (fromCurrency === toCurrency) return 1;

        // 1. Try to fetch LIVE rates from the API
        const API_KEY = process.env.EXCHANGE_RATE_API_KEY;
        const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurrency}`;
        
        console.log(`🌐 Fetching live rate from API for ${fromCurrency}...`);
        
        // We set a timeout so the app doesn't hang if the API is slow
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        
        const data = await response.json();

        if (data.result === 'success') {
            const liveRate = data.conversion_rates[toCurrency];
            if (liveRate) {
                console.log(`✅ Live Rate Found: 1 ${fromCurrency} = ${liveRate} ${toCurrency}`);
                return liveRate;
            }
        }
    } catch (error) {
        console.error('⚠️ Live API failed, shifting to manual fallback:', error.message);
    }

    // 2. MANUAL FALLBACK (Your current list)
    // This runs if the API is down or the currency isn't found
    const manualRates = {
        'USD': 1.0,
        'EUR': 0.92,
        'GBP': 0.79,
        'JPY': 150.0,
        'CAD': 1.35,
        'AUD': 1.52,
        'INR': 83.0,
        'PHP': 58.0,
        'THB': 34.5,
        'VND': 25400.0
    };

    const fromRate = manualRates[fromCurrency];
    const toRate = manualRates[toCurrency];

    if (fromRate !== undefined && toRate !== undefined) {
        console.log(`✅ Using manual fallback rate: ${toRate / fromRate}`);
        return toRate / fromRate;
    }

    // 3. DATABASE FALLBACK (The last resort)
    const { data: currencies } = await supabase
        .from('currencies')
        .select('code, rate_to_usd')
        .in('code', [fromCurrency, toCurrency]);

    const dbFrom = currencies?.find(c => c.code === fromCurrency)?.rate_to_usd || 1;
    const dbTo = currencies?.find(c => c.code === toCurrency)?.rate_to_usd || 1;

    return dbTo / dbFrom;
}
// ============================================
// STEP 7: Main conversion endpoint
// ============================================
/**
 * POST /convert
 * 
 * This is the main endpoint that handles currency conversion
 * 
 * Request body should contain:
 * {
 *   "amount": 100,
 *   "from": "USD",
 *   "to": "EUR"
 * }
 * 
 * Response:
 * {
 *   "success": true,
 *   "result": 92.00,
 *   "rate": 0.92,
 *   "message": "Conversion successful"
 * }
 */
app.post('/convert', async (req, res) => {
    try {
        // Extract data from request body
        // This is like reading the order from the customer
        const { amount, from, to } = req.body;

        // ============================================
        // Validation: Check if required data is provided
        // ============================================
        if (!amount || !from || !to) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: amount, from, or to'
            });
        }

        // Convert amount to number
        const amountNum = parseFloat(amount);
        
        // Check if amount is a valid number
        if (isNaN(amountNum) || amountNum <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Amount must be a positive number'
            });
        }

        // Check if currencies are the same
        if (from === to) {
            return res.status(400).json({
                success: false,
                message: 'Cannot convert currency to itself'
            });
        }

        console.log(`🔄 Converting ${amount} ${from} to ${to}...`);

        // ============================================
        // Get exchange rate
        // ============================================
        const exchangeRate = await getExchangeRate(from, to);

        // ============================================
        // Calculate converted amount
        // ============================================
        // Formula: converted_amount = amount × exchange_rate
        // Example: 100 USD × 0.92 = 92 EUR
        const convertedAmount = amountNum * exchangeRate;

        // Round to 2 decimal places (standard for currency)
        const roundedAmount = Math.round(convertedAmount * 100) / 100;

        // ============================================
        // Save to conversion history in Supabase
        // ============================================
        try {
            const { error: historyError } = await supabase
                .from('conversion_history')
                .insert({
                    amount: amountNum,
                    from_currency: from,
                    to_currency: to,
                    converted_amount: roundedAmount,
                    exchange_rate: exchangeRate
                });

            if (historyError) {
                // Log error but don't fail the request
                // Conversion still works even if history save fails
                console.error('⚠️  Could not save to history:', historyError.message);
            } else {
                console.log('✅ Saved to conversion history');
            }
        } catch (historyError) {
            // If Supabase is not set up, just log and continue
            console.log('⚠️  History not saved (Supabase may not be configured)');
        }

        // ============================================
        // Return success response
        // ============================================
        if (data && data.length > 0) {
            const exchangeRate = data[0].rate_to_usd;
            const convertedAmount = amount * exchangeRate;

            // --- NEW: SAVE TO HISTORY ---
            // We don't use 'await' here because we want the user to get their 
            // result immediately while the save happens in the background.
            supabase.from('currency_rates_history').insert([
                { 
                    currency_code: to, 
                    rate_to_usd: exchangeRate, 
                    recorded_at: new Date() 
                }
            ]).then(({ error }) => {
                if (error) console.error("History Save Error:", error);
            });
            // ----------------------------

            res.json({
                success: true,
                result: convertedAmount,
                rate: exchangeRate
            });
        }

    } catch (error) {
        // If something goes wrong, return error response
        console.error('❌ Error in /convert endpoint:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

// ============================================
// STEP 8: Endpoint to get available currencies
// ============================================
/**
 * GET /currencies
 * 
 * Returns list of all available currencies
 * Frontend uses this to populate dropdown menus
 */
// ============================================
// STEP 8: Endpoint to get available currencies
// ============================================
app.get('/currencies', async (req, res) => {
    // 1. We define the list we WANT to see here
    const mockedCurrencies = [
        { code: 'USD', name: 'US Dollar' },
        { code: 'EUR', name: 'Euro' },
        { code: 'GBP', name: 'British Pound' },
        { code: 'JPY', name: 'Japanese Yen' },
        { code: 'CAD', name: 'Canadian Dollar' },
        { code: 'AUD', name: 'Australian Dollar' },
        { code: 'INR', name: 'Indian Rupee' },
        { code: 'PHP', name: 'Philippine Peso' },
        { code: 'THB', name: 'Thai Baht' },
        { code: 'VND', name: 'Vietnamese Dong' }
    ];

    try {
        // 2. We skip the database check for now to force the new currencies to show
        console.log('✅ Sending manual currency list (PHP, THB, VND included)');
        
        // This 'return' stops the function here and sends the list above
        return res.json({ 
            success: true, 
            currencies: mockedCurrencies 
        });

        /* DATABASE CODE IS COMMENTED OUT BELOW FOR FUTURE USE
           Once you add PHP/THB/VND to your Supabase dashboard, 
           you can move the code back.
        */
        /*
        const { data: currencies, error } = await supabase
            .from('currencies')
            .select('code, name')
            .order('code');

        if (!error && currencies && currencies.length > 0) {
            return res.json({ success: true, currencies });
        }
        */

    } catch (error) {
        console.error('❌ Error in /currencies endpoint:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching currencies'
        });
    }
});

// ============================================
// STEP 9: Health check endpoint
// ============================================
/**
 * GET /
 * 
 * Simple endpoint to check if server is running
 * Useful for testing
 */
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Currency Converter API is running!',
        endpoints: {
            'POST /convert': 'Convert currencies',
            'GET /currencies': 'Get list of currencies',
            'GET /': 'Health check'
        }
    });
});

// ============================================
// STEP 10: Start the server
// ============================================
// Get port from environment variable or use default 3000
const PORT = process.env.PORT || 10000; // User Render's port or default to 10000

// GET /history/:code - Returns the last 7 days of rates for a specific currency
app.get('/history/:code', async (req, res) => {
    try {
        const { code } = req.params;
        const { data, error } = await supabase
            .from('currency_rates_history')
            .select('rate_to_usd, recorded_at')
            .eq('currency_code', code)
            .order('recorded_at', { ascending: true })
            .limit(20); // Get the most recent records

        if (error) throw error;
        res.json({ success: true, history: data });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET /history/:code - Returns the historical rates for the chart
app.get('/history/:code', async (req, res) => {
    try {
        const { code } = req.params;
        
        const { data, error } = await supabase
            .from('currency_rates_history')
            .select('rate_to_usd, recorded_at')
            .eq('currency_code', code)
            .order('recorded_at', { ascending: true })
            .limit(30); // Returns the last 30 data points

        if (error) throw error;

        res.json({
            success: true,
            history: data
        });
    } catch (error) {
        console.error("History Fetch Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Start listening for requests
app.listen(PORT, '0.0.0.0', () => {
    console.log('🚀 Server is running!');
    console.log(`📍 Listening on http://localhost:${PORT}`);
    console.log(`📝 API endpoint: http://localhost:${PORT}/convert`);
    console.log('');
    console.log('💡 Tips:');
    console.log('   - Make sure .env file has SUPABASE_URL and SUPABASE_KEY');
    console.log('   - Frontend should connect to this URL');
    console.log('   - Test with: curl http://localhost:3000/');
});

