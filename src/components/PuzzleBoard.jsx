import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaste } from '@fortawesome/free-solid-svg-icons';

export const PuzzleBoard = (props) => {
    const [puzzles, setPuzzles] = useState([]);
    const [game, setGame] = useState(new Chess());
    const [currentPuzzle, setCurrentPuzzle] = useState({});
    const [userSequence, setUserSequence] = useState([]);
    const [solution, setSolution] = useState([]);

    useEffect(() => {
        setPuzzles(props.list);
    }, [props.list]);

    useEffect(() => {
        if (currentPuzzle.fen) {
            const newGame = new Chess(currentPuzzle.fen);
            setGame(newGame);
            setSolution(currentPuzzle.moves);
            setUserSequence([]);
        }
    }, [currentPuzzle]);

    const copyPgn = () => {
        navigator.clipboard.writeText(game.pgn());
    };

    const copyFen = () => {
        navigator.clipboard.writeText(game.fen());
    };

    const nextPuzzle = () => {
        const index = Math.floor(Math.random() * 10);
        setCurrentPuzzle(puzzles[index]);
    };

    const cloneGame = (game) => {
        const newGame = new Chess();
        newGame.loadPgn(game.pgn());
        return newGame;
    };

    const onDrop = (sourceSquare, targetSquare, piece) => {
        try {
            const gameCopy = cloneGame(game);
            const move = gameCopy.move({
                from: sourceSquare,
                to: targetSquare,
                promotion: piece[1]?.toLowerCase() ?? "q",
            });

            if (!move) return false;

            const moveNumber = userSequence.length;
            const correctMove = solution[moveNumber];

            if (move.san === correctMove) {
                // Update user sequence and board
                setUserSequence(prevSequence => [...prevSequence, move.san, solution[moveNumber+1]]);

                if (moveNumber < solution.length - 1) {
                    // Apply next solution move
                    const nextMove = solution[moveNumber + 1];
                    const updatedGame = cloneGame(gameCopy);
                    updatedGame.move(nextMove);
                    setGame(updatedGame);
                } else {
                    nextPuzzle()
                }
            } else {
                alert('Incorrect move, puzzle reset.');
                resetPuzzle();
            }
            return true;
        } catch (err) {
            console.error({ error: err.message });
        }
    };

    const resetPuzzle = () => {
        setUserSequence([]);
        nextPuzzle();
    };

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
            <button onClick={copyFen}>
                <FontAwesomeIcon icon={faPaste} /> FEN
            </button>
            <button onClick={copyPgn}>
                <FontAwesomeIcon icon={faPaste} /> PGN
            </button>
            <button onClick={nextPuzzle}>
                Next
            </button>
        </div>
    );
};
