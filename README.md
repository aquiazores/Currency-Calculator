# 💱 Currency Converter Calculator

A beginner-friendly currency converter application built with HTML, Tailwind CSS, Vanilla JavaScript, Node.js, Express.js, and Supabase.

## 📚 What This Project Teaches

This project is designed for beginners and teaches:
- **Frontend Development:** HTML, CSS (Tailwind), and JavaScript
- **Backend Development:** Node.js and Express.js
- **Database:** Supabase (PostgreSQL)
- **API Communication:** How frontend and backend talk to each other
- **Deployment:** How to put your app on the internet (Render)

## 🏗️ Project Structure

```
Currency Calculator/
├── frontend/
│   └── index.html          # All frontend code (HTML, CSS, JS in one file)
├── backend/
│   ├── server.js           # Express server with detailed comments
│   ├── package.json        # Node.js dependencies
│   └── .env                # Environment variables (create this - see setup guide)
├── supabase/
│   └── schema.sql          # Database table definitions
├── .gitignore              # Files to exclude from Git
├── README.md               # This file
├── SETUP_GUIDE.md          # Detailed step-by-step setup instructions
└── DEPLOYMENT_GUIDE.md     # How to deploy to Render
```

## 🚀 Quick Start

### For Complete Beginners

**👉 Start here:** Read `SETUP_GUIDE.md` for detailed, step-by-step instructions with explanations.

### For Those Familiar with Node.js

1. **Backend Setup:**
   ```bash
   cd backend
   npm install
   # Create .env file with:
   # SUPABASE_URL=your_url
   # SUPABASE_KEY=your_key
   # PORT=3000
   node server.js
   ```

2. **Frontend Setup:**
   - Open `frontend/index.html` in a browser
   - Make sure backend is running on port 3000

3. **Supabase Setup:**
   - Create project at https://supabase.com
   - Run SQL from `supabase/schema.sql` in SQL Editor
   - Add credentials to `.env` file

## 📖 Documentation

- **`SETUP_GUIDE.md`** - Complete setup instructions for beginners
- **`WINDOWS_SETUP.md`** - Quick Windows-specific guide (especially for PowerShell errors)
- **`DEPLOYMENT_GUIDE.md`** - How to deploy to Render
- **`HOW_IT_WORKS.md`** - Architecture and data flow explanation
- **Code Comments** - Every file has detailed comments explaining each part

## 🛠️ Tech Stack

- **Frontend:** HTML5, Tailwind CSS (CDN), Vanilla JavaScript
- **Backend:** Node.js, Express.js
- **Database:** Supabase (PostgreSQL)
- **Deployment:** Render

## ✨ Features

- ✅ Convert between multiple currencies
- ✅ Beautiful, modern UI with Tailwind CSS
- ✅ Real-time conversion calculations
- ✅ Conversion history stored in database
- ✅ Swap currencies with one click
- ✅ Responsive design (works on mobile too!)

## 🎯 Learning Path

1. **Week 1:** Set up and understand the project structure
2. **Week 2:** Understand how frontend and backend communicate
3. **Week 3:** Learn about databases and Supabase
4. **Week 4:** Deploy your app to the internet

## 🐛 Troubleshooting

Common issues and solutions are covered in `SETUP_GUIDE.md` under "Common Problems & Solutions".

## 📝 Environment Variables

Create a `.env` file in the `backend/` folder:

```
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
PORT=3000
```

**⚠️ Never commit `.env` to Git!** It's already in `.gitignore`.

## 🤝 Contributing

This is a learning project. Feel free to:
- Add more currencies
- Improve the UI
- Add new features
- Fix bugs

## 📚 Resources

- [Express.js Documentation](https://expressjs.com/)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Node.js Documentation](https://nodejs.org/docs/)

## 🎓 For Teachers

This project is designed to be:
- **Beginner-friendly:** Extensive comments and explanations
- **Self-contained:** All frontend code in one HTML file
- **Educational:** Each concept is explained with analogies
- **Progressive:** Builds from simple to complex

## 📄 License

This project is open source and available for educational purposes.

---

**Happy Learning! 🚀**

If you get stuck, refer to `SETUP_GUIDE.md` for detailed help.

