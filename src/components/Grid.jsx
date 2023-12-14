import { colors } from "./PieceBuilder";

export function MergePieceToGrid(state) {
    const virtualGrid = state.grid;
    state.piece.mergeData.forEach(element => {
        const [y, x] = element.replace("y:", "").replace("x:", "").split(", ");
        virtualGrid[y][x] = state.piece.color+1;
    });
    const result = removeLine(state);
    if (result) virtualGrid
    return {grid: result.cleanGrid, piece: null, nbrLineDeleted: result.nbrLineDeleted, score: result.score};
}

export function removeLine(state) {
    let cleanGrid = [];
    let score = state.score;
    let nbrLineDeleted = state.nbrLineDeleted
    for (let y = 0; y < state.height; y++) {
        let lineCompleted = true;
        for (let x = 0; x < state.width; x++) {
            if (state.grid[y][x] === 0) lineCompleted = false;
        }
        if (lineCompleted) {
            nbrLineDeleted++;
        } else cleanGrid.push(state.grid[y]);
    }

    const height = state.height - cleanGrid.length;
    for (let i = 0; i < height; i++) {
        let line = [];
        for (let x = 0; x < state.width; x++) {
            line.push(0);
        }
        cleanGrid.unshift(line);
    }
    score += 100 * height;
    return {cleanGrid, nbrLineDeleted, score};
}


function BuildGrid({ grid, piece, state }) {
    if (grid === null && piece === null) return (<></>);
    return (
        <div id="grid">
            {
                grid.map((line, y) => {
                    return line.map((col, x) => {
                        let type= "case";
                        let style = {};
                        if (piece !== null && piece.mergeData.indexOf(`y:${y}, x:${x}`) !== -1){
                            type = "piece";
                            style.background = colors[piece.color];
                        }
                        if (grid[y][x] > 0){
                            type = "lockedPiece";
                            style.background = colors[grid[y][x]-1];
                        }
                        if (y === 2 && type === "case") style.borderBottom = "1px solid red";
                        if (y === 2 && type === "lockedPiece") {
                            if (window.localStorage.getItem("recore") < state.score) {
                                window.localStorage.setItem("recore", state.score);
                            }
                            window.location.reload();
                        }
                        return (
                            <span key={`y:${y}, x:${x}`} style={style} role={type} ></span>
                        );
                    });
                })
            }
        </div>
    )
}

export default BuildGrid;