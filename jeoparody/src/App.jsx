import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import GameBoard from './GameBoard';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-900 text-white py-8">
        <Routes>
          <Route path="/game/:gameId" element={<GameBoard />} />
          <Route path="/" element={<Navigate to="/game/demo" />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App