'use client';

import '@/ui/styles/MainPanel.css';
import GameBoard from './GameBoard';
import { useState } from 'react';
import WelcomePage from './WelcomePage';

export default function MainPanel() {
    const [gamePhase, setGamePhase] = useState('welcome');
    const [boardRows, setBoardRows] = useState(7);
    const [boardCols, setBoardCols] = useState(7);
    const [numMines, setNumMines] = useState(15);
    const [boardSize, setBoardSize] = useState(1);

    const startGame = (size) => {
        setGamePhase('game');
        setBoard(size);
    };

    function setBoard(size)
    {
        if(size === 0)
        {
            setBoardRows(5);
            setBoardCols(5);
            setNumMines(7);
        }
        else if(size === 1)
        {
            setBoardRows(7);
            setBoardCols(7);
            setNumMines(15);
        }
        else if(size === 2)
        {
            setBoardRows(10);
            setBoardCols(10);
            setNumMines(26);
        }
    }

    return (
        <>
            {
                gamePhase === 'welcome' && (
                    <WelcomePage onStart={() => {startGame(boardSize)}} setBoardSize={setBoardSize} />
                )
            }

            {
                gamePhase === 'game' && (
                    <GameBoard
                        rows={boardRows}
                        cols={boardCols}
                        numMines={numMines}
                    />
                )
            }
        </>
    );
}


