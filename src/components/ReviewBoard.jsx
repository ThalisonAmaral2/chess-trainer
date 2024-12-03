import { Chessboard } from 'react-chessboard'
import { Chess } from 'chess.js'
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard , faPaste} from '@fortawesome/free-solid-svg-icons'


export const ReviewBoard = ({position}) => {
    const [game, setGame] = useState(new Chess(position));

    const copyPgn = () => {
      navigator.clipboard.writeText(game.pgn())
    }
    const copyFen = () => {
      navigator.clipboard.writeText(game.fen())
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
      </div>
    )
}