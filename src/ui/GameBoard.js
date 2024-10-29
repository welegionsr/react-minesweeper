'use client';

import { calculateNeighborMines, checkWinCondition, createEmptyBoard, placeMines, revealAllMines, revealEmptyCells } from "@/app/lib";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

export default function GameBoard({rows, cols, numMines}){

    const [board, setBoard] = useState([]);

    useEffect(() => {
        const newBoard = createBoard(rows, cols, numMines);
        setBoard(newBoard);
    }, [rows, cols, numMines]);

    function createBoard(rows, cols, numMines){
        let emptyBoard = createEmptyBoard(rows, cols);
        emptyBoard = placeMines(emptyBoard, rows, cols, numMines);
        return calculateNeighborMines(emptyBoard, rows, cols);
    }

    function handleCellClick(rowIndex, colIndex) {
        const updatedBoard = [...board];  // Make a copy of the current board state

        if (updatedBoard[rowIndex][colIndex].flagged || updatedBoard[rowIndex][colIndex].revealed) {
            return; // Ignore if the cell is already flagged or revealed
        }

        updatedBoard[rowIndex][colIndex].revealed = true;

        if(updatedBoard[rowIndex][colIndex].isMine){
            // if pressed on a mine, game over!
            alert("Game over! you clicked on a mine!");
            revealAllMines(updatedBoard);
        }
        else if(updatedBoard[rowIndex][colIndex].neighborMines === 0) {
            // if no mines nearby, trigger reveals recursively
            revealEmptyCells(updatedBoard, rowIndex, colIndex);
        }

        setBoard(updatedBoard);

        if (checkWinCondition(updatedBoard, numMines)) {
            alert("Congratulations! You've won the game!");
        }
    }

    function handleRightClick(e, rowIndex, colIndex) {
        e.preventDefault(); // Prevent the default right-click menu

        const newBoard = [...board];

        if (!newBoard[rowIndex][colIndex].revealed) {
            newBoard[rowIndex][colIndex].flagged = !newBoard[rowIndex][colIndex].flagged; // Toggle flag
        }

        setBoard(newBoard); // Update the state

        if (checkWinCondition(newBoard, numMines)) {
            alert("Congratulations! You've won the game!");
        }
    }

    function resetGame() {
        const newBoard = createBoard(rows, cols, numMines);
        setBoard(newBoard);
    }

    return (
        <Container>
            {
                board.map((row, rowIndex) =>(
                    <Row key={rowIndex}>
                        {row.map((cell, colIndex) => (
                            <Col key={colIndex} className="p-1">
                                <Button
                                    className={cell.revealed ? "revealed" : ""}
                                    variant={cell.revealed ? (cell.isMine ? "danger" : "light") : "secondary"}
                                    onClick={() => handleCellClick(rowIndex, colIndex)}
                                    onContextMenu={(e) => handleRightClick(e, rowIndex, colIndex)}
                                    style={{ width: '100%', height: '3rem', fontSize: '1.2rem' }}
                                >
                                    {cell.revealed ? (
                                        cell.isMine ? "💣" : cell.neighborMines > 0 ? cell.neighborMines : ""
                                    ) : cell.flagged ? "🚩" : ""}
                                </Button>
                            </Col>
                        ))}
                    </Row>
                ))
            }
        </Container>
    );
}