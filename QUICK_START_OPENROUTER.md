# Quick Start: OpenRouter Setup

## 🚀 Get Started in 3 Steps

### Step 1: Get Your OpenRouter API Key
1. Go to [https://openrouter.ai/](https://openrouter.ai/)
2. Sign up or log in
3. Navigate to **Keys** in the sidebar
4. Click **Create Key**
5. Copy your API key

### Step 2: Add to Environment Variables
Open `Backend/.env` and add:
```env
OPENROUTER_API_KEY=sk-or-v1-your-key-here
```

### Step 3: Run the Application

**Backend:**
```bash
cd Backend
npm install
npm run dev
```

**Frontend:**
```bash
cd Frontend
npm install
npm run dev
```

## ✅ That's It!

Your application now has access to 100+ AI models from:
- OpenAI (GPT-4, GPT-3.5, etc.)
- Anthropic (Claude)
- Google (Gemini)
- Meta (Llama)
- Mistral
- And many more!

## 🎯 How to Use

1. Open the application in your browser
2. Click the model selector (CPU icon) in the top navigation
3. Choose any model from the dropdown
4. Start chatting!

## 💡 Tips

- **Free Models**: Look for models with `:free` suffix (e.g., `google/gemini-2.0-flash-exp:free`)
- **Cost**: Check [OpenRouter Pricing](https://openrouter.ai/models) for model costs
- **Credits**: Add credits to your OpenRouter account for paid models

## 🆘 Troubleshooting

**Models not loading?**
- Check your API key is correct
- Ensure backend is running
- Check browser console for errors

**Chat not working?**
- Verify you have credits in OpenRouter account (for paid models)
- Try a free model first
- Check backend logs for errors

## 📚 More Information

- Full Setup Guide: `Backend/OPENROUTER_SETUP.md`
- Migration Details: `OPENROUTER_MIGRATION_SUMMARY.md`
- OpenRouter Docs: [https://openrouter.ai/docs](https://openrouter.ai/docs)

---

**Need Help?** Check the documentation files or visit [OpenRouter Discord](https://discord.gg/openrouter)

