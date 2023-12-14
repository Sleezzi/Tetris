import MergePieceToGrid from "./Grid"

export function PieceCanBeMoved(piece, state) {
    let coordinate = [];
    for (let y = 0; y < piece.grid.length; y++) {
        for (let x = 0; x < piece.grid[0].length; x++) {
            if (piece.grid[y][x] > 0) {
                if (y + piece.posY === 20 ||
                    state.grid[y + piece.posY][x + piece.posX] === undefined ||
                    state.grid[y + piece.posY][x + piece.posX] > 0) return false;
                coordinate.push(`y:${y + piece.posY}, x:${x + piece.posX}`);
            }
        }
    }
    return coordinate;
}

export function MoveLeft(piece, state) {
    if (piece === null) return false;
    let newPiece = {...piece};
    newPiece.posX--;
    let canMove = PieceCanBeMoved(newPiece, state);
    if (canMove !== false) {
        piece.mergeData = canMove;
        piece.posX--;
    }
    return {piece};
}

export function MoveRight(piece, state) {
    if (piece === null) return false;
    let newPiece = {...piece};
    newPiece.posX++;
    let canMove = PieceCanBeMoved(newPiece, state);
    if (canMove !== false) {
        piece.mergeData = canMove;
        piece.posX++;
    }
    return {piece};
}

export function Fall(piece, state) {
    if (piece === null) return false;
    let newPiece = {...piece};
    newPiece.posY++;
    let canMove = PieceCanBeMoved(newPiece, state);
    if (canMove !== false) {
        piece.mergeData = canMove;
        piece.posY++;
    } else return false;
    return {piece};
}

export function Rotate(piece, state) {
    let newGrid = [];
    for (let x = 0; x < piece.grid[0].length; x++) {
        let line = [];
        for (let y = piece.grid.length-1; y > -1; y--) {
            line.push(piece.grid[y][x]);
        }
        newGrid.push(line);
    }
    let newPiece = {...piece};
    newPiece.grid = newGrid;
    let canMove = PieceCanBeMoved(newPiece, state);
    if (canMove !== false) {
        piece.mergeData = canMove;
        piece.grid = newGrid;
    }
    return {piece};
}