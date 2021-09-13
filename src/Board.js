import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {

  static defaultProps = {
    nrows : 3, 
    ncols : 3, 
    chanceLightStartsOn : .4
  }

  constructor(props) {
    super(props);
    this.state = { hasWon : false, board : this.createBoard()}
    this.flipCellsAround = this.flipCellsAround.bind(this);

    // TODO: set initial state
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = [];
    // TODO: create array-of-arrays of true/false values
    // 0 = off 1 = on
    for (let x = 0; x < this.props.nrows; x++){
      let holder = [];
      for (let y = 0; y < this.props.ncols; y++){
        let val = (Math.floor(Math.random() * 2))
        val === 0 ? holder.push(false) : holder.push(true);
      }
      board.push(holder)
    }
    return board
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    // TODO: flip this cell and the cells around it
    flipCell(y, x);
    flipCell(y+1, x);
    flipCell(y-1, x);
    flipCell(y, x+1);
    flipCell(y, x-1);      

    // win when every cell is turned off
    // TODO: determine is the game has been won
    let hasWon = true;
    for (let x = 0; x < this.props.nrows; x++){
      for (let y = 0; y < this.props.ncols; y++){
        if (board[y][x] === true) {
          hasWon = false; 
      }
    }
    }

    this.setState({board: board, hasWon: hasWon});
  }


  /** Render game board or winning message. */

  render() {
    let renderBoard = []
    for (let r = 0; r < this.props.nrows; r++){
      let holder = [];
      for (let c = 0; c < this.props.ncols; c++){
        let coord = `${r}-${c}`;
        holder.push(<Cell isLit = {this.state.board[r][c]}  key = {coord} flipCellsAroundMe = {() => this.flipCellsAround(coord)}/>)
    }
    renderBoard.push(<tbody>{holder}</tbody>)
  }
  // console.log(board);


    return(
    <div>
      <h1>Lights Out</h1>
      {renderBoard}
    </div>
    )
    // if the game is won, just show a winning msg & render nothing else

    // TODO

    // make table board

    // TODO
  }
}


export default Board;
