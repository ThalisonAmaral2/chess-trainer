import { useEffect, useState } from "react"
import { PuzzleBoard } from "./PuzzleBoard"

export const Puzzle = () => {
    const [data, setData] = useState([])


    const fetchData = async () => {
        try {
            const res = await fetch('http://localhost:3050/combinations')
            if (!res.ok) {
                throw new Error("Network response was not ok")
            }
            const result = await res.json();
            setData(result);

        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleNewPuzzle = () => {
        if (data.length > 0) {
            const gameData = getRandom(data);
            setPuzzleData(gameData);
        }
    }

    return (
        <>
            <button onClick={handleNewPuzzle}>New Puzzle</button>
            {data && <PuzzleBoard list={data} />} {/* Ensure PuzzleBoard only renders if fen is available */}
        </>
    )
}
