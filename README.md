# Mood Tracker - Emotional Regulation Mini-App

A simple, clean web application for tracking how different activities affect your mood. Get personalized emotional analysis and AR/VR wellness recommendations.

![Mood Tracker Screenshot](https://via.placeholder.com/800x400?text=Mood+Tracker+App)

## Features

- **Activity Rating System**: Rate 20 preloaded wellness activities on a 5-level scale
  - 😫 Hate (-2) → 😍 Love (+2)
- **Personal Notes**: Add optional notes for each activity
- **AI-Powered Analysis**: Get emotional insights based on your ratings
- **AR/VR Recommendations**: Receive immersive wellness experiences tailored to your mood
- **Local Data Storage**: Your data stays on your device

## Tech Stack

- **Frontend**: React (Create React App)
- **Backend**: Node.js + Express
- **Storage**: JSON file storage (in-memory + persistence)
- **AI Integration**: Claude API (optional - works without API key using placeholders)

## Project Structure

```
mood-tracker/
├── backend/
│   ├── index.js           # Express server
│   ├── package.json       # Backend dependencies
│   └── .env.example       # Environment variables template
├── frontend/
│   ├── package.json       # Frontend dependencies
│   ├── public/
│   │   └── index.html     # HTML template
│   └── src/
│       ├── index.js       # React entry point
│       ├── index.css      # Global styles
│       ├── App.js         # Main React component
│       ├── App.css        # Component styles
│       └── activities.json # Activity list
└── README.md              # This file
```

## Quick Start

### Prerequisites

- **Node.js** (version 14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- A **terminal/command prompt**

### Step 1: Download the Project

Save all project files to a folder on your computer. The folder structure should look like the diagram above.

### Step 2: Open Two Terminal Windows

You'll need to run the backend and frontend simultaneously.

**On Mac:**
- Open Terminal (Cmd + Space, type "Terminal")
- Press Cmd + T to open a second tab

**On Windows:**
- Open Command Prompt or PowerShell
- Open a second window

### Step 3: Start the Backend Server

In the first terminal window:

```bash
# Navigate to the backend folder (replace /path/to with your actual path)
cd /path/to/mood-tracker/backend

# Install dependencies
npm install

# Start the server
npm start
```

You should see output like:
```
╔════════════════════════════════════════════════════════╗
║        Mood Tracker Backend Server                     ║
║                                                        ║
║   Server running on http://localhost:3001              ║
╚════════════════════════════════════════════════════════╝
```

**Leave this terminal running.**

### Step 4: Start the Frontend

In the second terminal window:

```bash
# Navigate to the frontend folder
cd /path/to/mood-tracker/frontend

# Install dependencies
npm install

# Start the React app
npm start
```

Your browser should automatically open to `http://localhost:3000`. If not, manually visit that URL.

## Using the App

### 1. Rate Activities

For each activity, click the button that best describes how it makes you feel:
- **😫 -2** = Hate
- **😕 -1** = Dislike
- **😐 0** = Neutral
- **🙂 +1** = Like
- **😍 +2** = Love

### 2. Add Notes (Optional)

Type any additional thoughts about an activity in the note field.

### 3. Get Your Analysis

Click **"Get My Emotional Analysis"** to receive:
- Overall emotional tone assessment
- List of your "boosters" (activities that lift your mood)
- List of your "drainers" (activities to be mindful of)
- 3 personalized AR/VR wellness experiences with guided scripts
- Actionable insights and suggestions

### 4. Start a New Session

Click **"Start New Session"** to rate activities again.

## Optional: Connect to Claude API

The app works out of the box with placeholder responses. To get real AI-powered analysis:

### 1. Get a Claude API Key

1. Visit [console.anthropic.com](https://console.anthropic.com/)
2. Sign up or log in
3. Go to "API Keys" in your account settings
4. Create a new API key

### 2. Configure the Backend

1. In the `backend` folder, copy `.env.example` to `.env`:
   ```bash
   cd backend
   cp .env.example .env
   ```

2. Open `.env` in a text editor and add your API key:
   ```
   CLAUDE_API_KEY=your_actual_api_key_here
   PORT=3001
   ```

3. Restart the backend server:
   - Press `Ctrl + C` in the backend terminal
   - Run `npm start` again

## Troubleshooting

### "Failed to submit ratings" Error

**Problem**: Frontend can't connect to backend

**Solution**:
1. Make sure the backend server is running (check first terminal)
2. Check that backend is on port 3001
3. If port 3001 is in use, change it in `backend/.env` and restart

### "Module not found" Error

**Problem**: Dependencies not installed

**Solution**:
```bash
# In the folder with the error:
npm install
```

### Port Already in Use

**Problem**: Another app is using port 3000 or 3001

**Solution for Backend**:
Create a `.env` file in the `backend` folder with:
```
PORT=3002
```

**Solution for Frontend**:
The React app will automatically suggest a different port. Just confirm by pressing `Y`.

### Frontend Shows "Cannot GET /"

**Problem**: Trying to access backend port in browser

**Solution**: Make sure you're visiting `http://localhost:3000` (frontend), not `http://localhost:3001` (backend).

## Customization

### Adding New Activities

Edit `frontend/src/activities.json`:

```json
[
  "Bath / shower",
  "Listening to music",
  "Your New Activity",
  "Another Activity"
]
```

The backend will automatically recognize new activities on the next submission.

### Changing the Rating Scale

The rating scale is defined in both frontend and backend:

**Frontend**: `frontend/src/App.js` - Modify `RATING_OPTIONS` array
**Backend**: `backend/index.js` - Modify `RATING_LABELS` object

### Styling

All styles are in `frontend/src/App.css`. The app uses CSS custom properties and is fully responsive.

## Data Storage

Your ratings are stored in `backend/data/ratings.json`. This file is created automatically when you submit your first ratings.

**To clear all data**: Simply delete the `backend/data` folder.

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/activities` | GET | Get list of activities |
| `/api/ratings` | POST | Submit ratings and get analysis |
| `/api/history` | GET | Get all previous ratings |
| `/api/health` | GET | Check server status |

### Example API Request

```bash
curl -X POST http://localhost:3001/api/ratings \
  -H "Content-Type: application/json" \
  -d '{
    "ratings": [
      {"activity": "Meditation", "rating": 2, "note": "Very calming"},
      {"activity": "Exercise", "rating": 1, "note": null}
    ],
    "timestamp": "2024-01-15T10:00:00Z"
  }'
```

## AR/VR Integration

The app generates structured AR/VR experiences that can be consumed by immersive applications:

```json
{
  "id": "vr_beach_escape",
  "title": "Peaceful Beach Visualization",
  "energy_level": "low",
  "duration_minutes": 5,
  "description": "A gentle immersive experience...",
  "script": "Guided narration text...",
  "visual_elements": ["gentle waves", "warm sunset"],
  "audio_elements": ["ocean waves", "seagulls"]
}
```

This structure is designed to be easily parsed by AR/VR frontend frameworks.

## Development

### Running in Development Mode

**Backend with auto-restart**:
```bash
cd backend
npm install -g nodemon  # Install nodemon globally
nodemon index.js        # Auto-restarts on file changes
```

### Project Architecture

```
User Input (Ratings + Notes)
    ↓
Frontend (React)
    ↓ POST /api/ratings
Backend (Express)
    ↓
Prompt Builder
    ↓
LLM Call (Claude/Placeholder)
    ↓
JSON Response
    ↓
Emotional Analysis Display
    ↓
AR/VR Recommendations
```

## License

MIT License - Feel free to use, modify, and distribute.

## Support

For issues or questions:
1. Check the Troubleshooting section above
2. Review the console logs in both terminal windows
3. Ensure all dependencies are installed with `npm install`

---

**Enjoy tracking your mood and discovering what lifts you up! 🌟**
