# LifeGPT 🌟

Your AI reflection buddy for personal growth and actionable life advice.

## Features

🎭 **4 Unique AI Personas:**
- **🌟 Future Self**: Wise guidance from your successful future self
- **👴 60-Year-Old Self**: Life experience and deep wisdom
- **🎉 Biggest Fan**: Unconditional support and encouragement  
- **💬 Brutally Honest Friend**: Direct, truthful feedback

🎯 **Smart Contextual Suggestions:**
After just 1 exchange, get targeted advice based on your specific situation:
- 📈 **Financial**: "Save 10% monthly" • "Track expenses for 30 days"
- 💪 **Health**: "Workout 3x/week" • "Walk 10k steps daily"
- 💼 **Career**: "Update LinkedIn this week" • "Apply to 3 jobs daily"
- ❤️ **Relationships**: "Text 3 friends" • "Plan weekly date nights"

## Tech Stack

- **Frontend**: Next.js 15 with Turbopack
- **AI**: Google Gemini 1.5 Flash
- **Styling**: Tailwind CSS
- **Database**: Prisma + PostgreSQL
- **Auth**: NextAuth.js

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/handyman30/lifegpt.git
cd lifegpt
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Create .env.local file
GOOGLE_GEMINI_API_KEY=your_gemini_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to start chatting!

## Environment Variables

- `GOOGLE_GEMINI_API_KEY`: Get your free API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
- `DATABASE_URL`: PostgreSQL connection string
- `NEXTAUTH_SECRET`: Random secret for NextAuth
- `NEXTAUTH_URL`: Your app URL (http://localhost:3000 for development)

## Live Demo

🚀 [Try LifeGPT Live](https://lifegpt.up.railway.app)

## License

MIT
