
# 💸 AI Financial

**AI Financial** is an intelligent financial web application that combines data visualization and real-time AI which helps users better understand and manage their money. Built with **React (TypeScript)** and **Tailwind CSS**, it leverages **Gemini AI** for financial recommendations and a **PostgreSQL** backend for secure data handling.

---

## 🧠 Key Features

- **AI-Powered Advisor**  
  Get intelligent advice through Gemini API using `src/ai/flows/financial-advice.ts`.

- **Secure PostgreSQL Connection**  
  Database logic lives in `src/connDb/pgsql.ts` with credentials loaded from environment variables.

- **Clean UI with Tailwind CSS**  
  Responsive components (`src/components/ui`) and utility-first styling.

- **Modular Architecture**  
  Organized code with clear separation for AI logic, database, services, and hooks.

- **Data Visualization**  
  Visual financial data representation using `financial-data-display.tsx`.

---

## 🗂️ Project Structure

```
src/
├── ai/                  # Gemini AI logic
│   ├── flows/           # AI functions and instances
│   │   ├── financial-advice.ts
│   │   ├── ai-instance.ts
│   │   └── dev.ts
│
├── app/                 # App pages and routing
│   ├── api/fetchData/   # API route for fetching financial data
│   ├── route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/          # UI components
│   ├── ui/
│   │   ├── financial-data-display.tsx
│   │   └── icons.ts
│
├── connDb/              # Database connection
│   └── pgsql.ts
│
├── hooks/               # Custom React hooks
│   ├── use-mobile.tsx
│   └── use-toast.ts
│
├── lib/                 # Utility functions
│   └── utils.ts
│
├── services/            # Business logic services
│   └── bank.ts

.env                     # Environment variables (not committed)
README.md                # Project documentation
tailwind.config.ts       # TailwindCSS configuration
tsconfig.json            # TypeScript configuration
package.json             # Project metadata & scripts
```

---

## 🧪 Environment Setup

Create a `.env` file at the root of the project with the following content:

```env
DB_USER=your_user
DB_HOST=your_host
DB_NAME=your_database
DB_PASSWORD=your_password
DB_PORT=5432

GEMINI_API_KEY=your_gemini_api_key
```

> ⚠️ Make sure `.env` is included in `.gitignore` to keep sensitive info private.

---

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Jrblanco1/S25_CSS_G0_GDP_.git
   cd S25_CSS_G0_GDP_
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. Make sure your database is running and accessible via the `.env` values.

---

## 🧠 Gemini AI Integration

The `ai-instance.ts` file initializes the Gemini API client using your key. The core logic for generating advice based on user financial data is in:

- `src/ai/flows/financial-advice.ts`

This module fetches data and prompts Gemini to generate financial suggestions.

---

## 📈 Visualization

Visual financial breakdowns (e.g., pie or bar charts of earnings/expenses) are rendered via:

- `src/components/ui/financial-data-display.tsx`

Data is fetched and transformed using utilities and services located in:

- `src/services/bank.ts`  
- `src/lib/utils.ts`

---

## ✅ TODO / Future Plans

- Add authentication and user accounts
- Connect to real bank APIs
- Export reports in PDF/CSV
- Notification system for budget limits

---

## 🛠️ Tech Stack

- **Frontend:** React (TypeScript), Tailwind CSS
- **Backend:** PostgreSQL (via Node/TS fetch)
- **AI:** Gemini API

---

## 🤝 Contribution

Pull requests and issue submissions are welcome! Please fork the repository and open a PR with changes.

---

## 📄 License

This project is licensed under the MIT License.
