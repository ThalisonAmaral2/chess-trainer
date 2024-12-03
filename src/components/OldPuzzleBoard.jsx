import { Chessboard } from 'react-chessboard'
import { Chess } from 'chess.js'
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard , faPaste} from '@fortawesome/free-solid-svg-icons'

export const PuzzleBoard = (props) => {
    const [puzzles, setPuzzles] = useState([])
    const [game, setGame] = useState(new Chess());
    const [currentPuzzle, setCurrentPuzzle] = useState({})
    const [userSequence, setUserSequence] = useState([])
    const [solution, setSolution] = useState([])

    useEffect(() => {
        setPuzzles(props.list);
    },[props.list])

    const copyPgn = () => {
      navigator.clipboard.writeText(game.pgn())
    }
    const copyFen = () => {
      navigator.clipboard.writeText(game.fen())
    }
    const nextPuzzle = () => {
        const index = Math.round(Math.random() * 10)
        setCurrentPuzzle(puzzles[index])
        setGame(new Chess(currentPuzzle.fen))

        console.log(currentPuzzle.moves)
        setSolution(currentPuzzle.moves)
        setUserSequence([])
    }
    const cloneGame = (game) => {
      const newGame = new Chess();
      newGame.loadPgn(game.pgn());
      return newGame
    }

    function onDrop(sourceSquare, targetSquare, piece) {
      try {
        const gameCopy = cloneGame(game);
        const move = gameCopy.move({
          from: sourceSquare,
          to: targetSquare,
          promotion: piece[1].toLowerCase() ?? "q",
        });
        // illegal move
        if (move === null) return false;
        setGame(gameCopy);
        // console.log(move.san)
        const moveNumber = userSequence.length;
        if(move.san == solution[moveNumber]){
            setUserSequence([...userSequence, move.san, solution[moveNumber+1]])
            console.log("Correct move boy")
            const gameCopy = cloneGame(game);
            gameCopy.move(solution[moveNumber]);
            setGame(gameCopy)

        }

        return true;
      } catch (err) {
        console.error({error: err.message})
      }
    }
    return (
      <div
      style={{
        margin: '3rem auto',
        maxWidth: '70vh',
        width: '70vw'
      }}
      >
        <Chessboard 
          id="board"
          position={game.fen()}
          onPieceDrop={onDrop}
          customDarkSquareStyle={{ backgroundColor: "#779952" }}
          customLightSquareStyle={{ backgroundColor: "#edeed1" }}
        />
        {/* <button
          onClick={copyFen}
        >
          <FontAwesomeIcon icon={faPaste} /> FEN 
        </button>
  
        <button
          onClick={copyPgn}
        >
          <FontAwesomeIcon icon={faPaste} /> PGN
        </button> */}

        <button
            onClick={nextPuzzle}
        >
            Next
        </button>
      </div>
    )
}

