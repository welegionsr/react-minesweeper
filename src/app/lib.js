export function createEmptyBoard(rows, cols) {
    return Array.from({ length: rows }, () => Array.from({ length: cols }, () => ({ isMine: false, neighborMines: 0, revealed: false, flagged: false })));
}

export function placeMines(board, rows, cols, numMines) {
    let placedMines = 0;

    while (placedMines < numMines) {
        const row = Math.floor(Math.random() * rows);
        const col = Math.floor(Math.random() * cols);

        // If a mine is already placed, skip this iteration
        if (!board[row][col].isMine) {
            board[row][col].isMine = true;
            placedMines++;
        }
    }
    return board;
}

export function calculateNeighborMines(board, rows, cols) {
    const directions = [
        [-1, 0], [1, 0], [0, -1], [0, 1],  // N, S, W, E
        [-1, -1], [1, 1], [-1, 1], [1, -1] // NW, SE, NE, SW
    ];

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (!board[row][col].isMine) {
                let mineCount = 0;
                directions.forEach(([dx, dy]) => {
                    const newRow = row + dx;
                    const newCol = col + dy;

                    if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                        if (board[newRow][newCol].isMine) {
                            mineCount++;
                        }
                    }
                });
                board[row][col].neighborMines = mineCount;
            }
        }
    }
    return board;
}

export function revealEmptyCells(board, row, col) {
    const directions = [
        [-1, 0], [1, 0], [0, -1], [0, 1], // Up, Down, Left, Right
        [-1, -1], [-1, 1], [1, -1], [1, 1] // Diagonals
    ];

    directions.forEach(([dRow, dCol]) => {
        const newRow = row + dRow;
        const newCol = col + dCol;

        if (
            newRow >= 0 && newRow < board.length &&
            newCol >= 0 && newCol < board[0].length &&
            !board[newRow][newCol].revealed && !board[newRow][newCol].isMine
        ) {
            board[newRow][newCol].revealed = true;

            if (board[newRow][newCol].neighborMines === 0) {
                revealEmptyCells(board, newRow, newCol); // Continue flood fill
            }
        }
    });
}

export function revealAllMines(board) {
    for (let row of board) {
        for (let cell of row) {
            if (cell.isMine) {
                cell.revealed = true;
            }
        }
    }
}

export function checkWinCondition(board, numMines) {
    let correctFlags = 0;
    let revealedCells = 0;
    const totalCells = board.length * board[0].length;
    const totalNonMineCells = totalCells - numMines;

    for(let row of board){
        for(let cell of row){
            if(cell.flagged && cell.isMine)
            {
                // if the cell is a mine, and it's flagged, count it as correct
                ++correctFlags;
            }
            if(cell.revealed && !cell.isMine)
            {
                // if the cell is revealed and not a mine, count it as a non-mine cell
                ++revealedCells;
            }
        }
    }

    return (revealedCells === totalNonMineCells) && (correctFlags === numMines);
}

