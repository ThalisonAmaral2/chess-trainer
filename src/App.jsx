import './App.css'
import { PuzzleBoard } from './components/PuzzleBoard'
import { useState, useEffect } from 'react'
import { Puzzle } from './components/Puzzle'

function App() {
  const fen = "r1b3nr/pppk2qp/1bnp4/4p1BQ/2BPP3/2P5/PP3PPP/RN3RK1 w - - 0 1"

  return (
    <>
      <Puzzle/>
    </>
  )
}

export default App
