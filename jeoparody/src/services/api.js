const API_BASE_URL = 'http://localhost:8000/api';

export const apiService = {
  async createGame(gameData) {
    const response = await fetch(`${API_BASE_URL}/games`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(gameData),
    });
    return response.json();
  },

  async getGame(gameId) {
    const response = await fetch(`${API_BASE_URL}/games/${gameId}`);
    return response.json();
  },

  async updateGame(gameId, gameData) {
    const response = await fetch(`${API_BASE_URL}/games/${gameId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(gameData),
    });
    return response.json();
  }
};