import React, { Component } from "react";
import "../css/Index.css";
import BuildGrid, { MergePieceToGrid } from "../components/Grid";
import PieceBuilder, { colors } from "../components/PieceBuilder";
import { MoveLeft, MoveRight, Fall, Rotate, PieceCanBeMoved } from "../components/Move";

class Index extends Component{
    state = {
        grid: null,
        height: 20,
        width: 10,
        piece: null,
        nbrLineDeleted: 0,
        score: 0
    }

    componentDidMount() {
        this.initGame();
    }

    initGame = () => {
        this.setState({grid:this.buildGrid()}, () => {
            this.generatePiece();
            setInterval(() => {
                const result = Fall(this.state.piece, this.state);
                if (result !== false) {
                    this.setState(result);
                } else this.setState(MergePieceToGrid(this.state), () => {
                    this.generatePiece();
                });
            }, 1_250);
            window.addEventListener("keydown", (e) => {
                switch (e.keyCode) {
                    case 81:
                        this.setState(MoveLeft(this.state.piece, this.state));
                        break;
                    case 68:
                        this.setState(MoveRight(this.state.piece, this.state));
                        break;
                    case 90:
                        this.setState(Rotate({...this.state.piece}, this.state));
                        break;
                    case 82:
                        this.setState(Rotate({...this.state.piece}, this.state));
                        break;
                    case 83:
                        const result = Fall(this.state.piece, this.state);
                        if (result !== false) {
                            this.setState(result);
                        } else this.setState(MergePieceToGrid(this.state), () => {
                            this.generatePiece();
                        });
                        break;
                }
            });
        });
    }

    buildGrid = () => {
        let grid = [];
        for (let y = 0; y < this.state.height; y++) {
            let line = [];
            for (let x = 0; x < this.state.width; x++) line.push(0);
            grid.push(line);
        }
        return grid;
    }

    generatePiece = () => {
        let piece = {
            posX: 4,
            posY: 0,
            grid: PieceBuilder[Object.keys(PieceBuilder)[Math.floor(Math.random() * Object.keys(PieceBuilder).length)]],
            mergeData: [],
            color: Math.floor(Math.random() * colors.length)
        }
        let result = PieceCanBeMoved(piece, this.state);
        if (result !== false) {
            piece.mergeData = result;
            this.setState({piece});
        }
    }

    render() {
        return (<>
            <h1 style={{ textAlign: "center" }}>TETRIS</h1>
            <h3>Line{(this.state.nbrLineDeleted > 1 ? "s" : "")} deleted: {this.state.nbrLineDeleted}</h3>
            <h3>Score: {this.state.score}</h3>
            <h3>Best Score: {window.localStorage.getItem("recore")}</h3>
            {
                this.state.grid !== null && <BuildGrid grid={this.state.grid} piece={this.state.piece} state={this.state}/>
            }
        </>);
    }
}

export default Index;