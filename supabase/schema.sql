-- Currency Converter Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Table 1: currencies
-- This stores all available currencies and their exchange rates
-- Think of it like a price list for currencies
CREATE TABLE IF NOT EXISTS currencies (
    id SERIAL PRIMARY KEY,
    code VARCHAR(3) UNIQUE NOT NULL,  -- e.g., 'USD', 'EUR', 'GBP'
    name VARCHAR(100) NOT NULL,       -- e.g., 'US Dollar', 'Euro'
    rate_to_usd DECIMAL(10, 4) NOT NULL,  -- Exchange rate to USD (base currency)
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Table 2: conversion_history
-- This stores every conversion the user makes
-- Like a receipt for each conversion
CREATE TABLE IF NOT EXISTS conversion_history (
    id SERIAL PRIMARY KEY,
    amount DECIMAL(15, 2) NOT NULL,        -- Original amount
    from_currency VARCHAR(3) NOT NULL,     -- Currency code (e.g., 'USD')
    to_currency VARCHAR(3) NOT NULL,       -- Currency code (e.g., 'EUR')
    converted_amount DECIMAL(15, 2) NOT NULL,  -- Result after conversion
    exchange_rate DECIMAL(10, 6) NOT NULL,     -- Rate used for conversion
    created_at TIMESTAMP DEFAULT NOW()     -- When conversion happened
);

-- Insert some sample currencies with mocked rates
-- These are example rates (not real-time)
INSERT INTO currencies (code, name, rate_to_usd) VALUES
    ('USD', 'US Dollar', 1.0000),
    ('EUR', 'Euro', 0.9200),
    ('GBP', 'British Pound', 0.7900),
    ('JPY', 'Japanese Yen', 150.0000),
    ('CAD', 'Canadian Dollar', 1.3500),
    ('AUD', 'Australian Dollar', 1.5200),
    ('INR', 'Indian Rupee', 83.0000)
ON CONFLICT (code) DO NOTHING;

-- Create an index for faster lookups by currency code
CREATE INDEX IF NOT EXISTS idx_currencies_code ON currencies(code);

-- Create an index for faster history queries
CREATE INDEX IF NOT EXISTS idx_history_created_at ON conversion_history(created_at);

