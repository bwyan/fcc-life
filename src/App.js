import React, {Component} from 'react';

//components
import Grid from './Grid';
import GameControls from './GameControls';

//styles
import './App.scss';

class App extends Component {
  constructor() {
    super();

    this.setGridDimensions = this.setGridDimensions.bind(this);
    this.toggleIsAliveState = this.toggleIsAliveState.bind(this);
    this.isAlive = this.isAlive.bind(this);
    this.setCellToNextStageOfLife = this.setCellToNextStageOfLife.bind(this);
    this.addToCellsToBeUpdated = this.addToCellsToBeUpdated.bind(this);
  }

  setGridDimensions(x, y) {
    const rows = x;
    const columns = y || this.state.columns;
    let aliveCells = this.state.aliveCells;

    if (aliveCells.length < rows) {
      for (var i = aliveCells.length; i < rows; i++) {aliveCells.push([])}
    } else if (aliveCells.length > rows) {
      aliveCells.splice(rows);
    }

    aliveCells.forEach(row => {
      row = row.filter(entry => {return entry < columns});
    })

    this.setState({
      rows: rows,
      columns: columns,
      aliveCells: aliveCells
    })
  }

  //may be redundant but keep for now (depends on algo for the game rules)
  // makeAlive(row, col) {
  //   if (aliveCells[row].indexOf(col) === -1) { //check to make sure cells don't get added more than once
  //     aliveCells[row].push(col);  
  //   }
  // }

  // //may be redundant but keep for now (depending on algo for the game rules)
  // makeDead(row, col) {
  //   if (!aliveCells[row].indexOf(col) === -1) {
  //     aliveCells[row].splice(aliveCells[row].indexOf(col), 1);
  //   }
  // }

  isAlive(row, col) {
    const aliveCells = this.state.aliveCells;

    if (row < 0 || row > this.state.rows -1  || col < 0 || col > this.state.columns - 1) return false;

    return (aliveCells[row].indexOf(col) === -1 ? false : true);
  }

  toggleIsAliveState(row, col) {
    //make the variable easier to read
    let aliveCells = this.state.aliveCells;

    //prevent adding cells that are beyond the grid
    if (row > this.state.rows || col > this.state.columns || row < 0 || col < 0) return;

    //add or remove 
    if (!this.isAlive(row, col)) { //if cell isn't in aliveCells (is dead)
      aliveCells[row].push(col); //add it
    } else {
      aliveCells[row].splice(aliveCells[row].indexOf(col), 1); //remove it
    }

    //update state with the new aliveCells
    this.setState({
      aliveCells: aliveCells
    })
  }

  
  addToCellsToBeUpdated(row, col) {
    const cellsToBeUpdated = this.state.cellsToBeUpdated;

    cellsToBeUpdated.push([row, col]);

    this.setState({
      cellsToBeUpdated: cellsToBeUpdated
    })
  }


  setCellToNextStageOfLife(row, col) {
    const neighbors = [
      [row - 1, col - 1], [row -1, col], [row - 1, col + 1],
      [row, col - 1], [row, col + 1],
      [row + 1, col -1 ], [row + 1, col], [row + 1, col + 1]
    ];

    let aliveNeighborsCount = 0;

    if(this.isAlive(row, col)) { //RULES FOR ALIVE CELLS
      for (let i = 0; i < 8; i++) { //test each neighbor cell.
 
        const nr = Number(neighbors[i][0]);
        const nc = Number(neighbors[i][1]);

        if (this.isAlive(nr, nc)) { //if the neighbor cell is alive…          
          aliveNeighborsCount++; //increment the count.
          
          if (aliveNeighborsCount >= 4) { //once the count reaches 4, we can stop because the rules are the same for 4–8 living neighbors.
            break;
          }
        }
      }

      if (aliveNeighborsCount === 0 || aliveNeighborsCount === 1) {
        this.addToCellsToBeUpdated(row, col);
      }

    } else if (!this.isAlive(row,col)) { //RULES FOR DEAD CELLS
      for (let i = 0; i < 8; i++) { //test each neighbor cell.
 
        const nr = Number(neighbors[i][0]);
        const nc = Number(neighbors[i][1]);

        if (this.isAlive(nr, nc)) { //if the neighbor cell is alive…
          aliveNeighborsCount++; //increment the count.        
        }
      }

      if (aliveNeighborsCount === 3) { //once the count reaches 4, we can stop because the rules are the same for 4–8 living neighbors.
        this.addToCellsToBeUpdated(row, col);
      }
    } 
  }

  setGameToNextStageOfLife() {
    for (let r = 0; r < this.state.rows; r++) {
      for (let c = 0; c < this.state.columns; c++) {
        this.setCellToNextStageOfLife(r, c);
      }
    }

    let cellsToBeUpdated = this.state.cellsToBeUpdated;

    cellsToBeUpdated.forEach(cell => {
      this.toggleIsAliveState(cell[0], cell[1]);
    });

    cellsToBeUpdated = [];
    this.setState({
      cellsToBeUpdated: cellsToBeUpdated
    })

    //if(this.state.gameIsRunning) {this.setGameToNextStageOfLife()} (need something like this to keep game running)
  }

  componentWillMount() {
    this.setState({
      rows: 3,
      columns: 20,
      aliveCells: [ [ 0, 5, 20, 1 ], [ 2, 10 ], [ 6, 3, 1 ] ],
      cellsToBeUpdated: [],
      gameIsRunning: true
    })
  }

  componentDidMount() { //TODO: get better starting data for aliveCells and remove this hack.
    this.setGridDimensions(20, 20);
  }

  render() {
    return (
      <div>
        <h1>The Game of Life</h1>
        <div className="game">
          <GameControls />
          <Grid rows={this.state.rows} columns={this.state.columns} aliveCells={this.state.aliveCells} toggleIsAliveState={this.toggleIsAliveState}/>
        </div>
      </div>
    )
  }
}

export default App;
