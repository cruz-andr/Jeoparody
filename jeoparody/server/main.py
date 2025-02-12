from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Test route
@app.get("/")
async def root():
    return {"message": "Jeoparody API is running!"}

# Model for questions
class Question(BaseModel):
    value: int
    question: str
    answer: str
    isAnswered: bool = False
    isDailyDouble: bool = False

# Model for categories
class Category(BaseModel):
    title: str
    questions: List[Question]

# Model for game state
class Game(BaseModel):
    categories: List[Category]
    currentScore: int = 0

# Store games in memory (replace with database in production)
games = {}

@app.post("/api/games")
async def create_game(game: Game):
    game_id = len(games) + 1
    games[game_id] = game
    return {"game_id": game_id}

@app.get("/api/games/{game_id}")
async def get_game(game_id: int):
    if game_id not in games:
        return {"error": "Game not found"}
    return games[game_id]