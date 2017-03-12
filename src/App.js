import React, {Component} from 'react';

//components
import Grid from './Grid';

//styles
import './App.scss';

class App extends Component {
  constructor() {
    super();

    this.setGridDimensions = this.setGridDimensions.bind(this);
    this.toggleIsAliveState = this.toggleIsAliveState.bind(this);
    this.isAlive = this.isAlive.bind(this);
    this.setCellToNextStageOfLife = this.setCellToNextStageOfLife.bind(this);
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

    if (row > aliveCells.length) return false;

    return (aliveCells[row].indexOf(col) === -1 ? false : true);
  }

  toggleIsAliveState(row, col) {
    //make the variable easier to read
    let aliveCells = this.state.aliveCells;

    //prevent adding cells that are beyond the grid
    if (row > this.state.rows || col > this.state.columns || row < 0 || col < 0) return;

    //add or remove 
    if (aliveCells[row].indexOf(col) === -1) { //if cell isn't in aliveCells (is dead)
      aliveCells[row].push(col); //add it
    } else { //if cell *is* in aliveCells (is alive)
      aliveCells[row].splice(aliveCells[row].indexOf(col), 1); //remove it
    }

    //update state with the new aliveCells
    this.setState({
      aliveCells: aliveCells
    })
  }

  setCellToNextStageOfLife(row, col) {
    const neighbors = [
      [row - 1, col - 1], [row -1, col], [row - 1, col + 1],
      [row, col - 1], [row, col + 1],
      [row + 1, col -1 ], [row + 1, col], [row + 1, col + 1]
    ];

    let aliveNeighborsCount = 0;

    if(this.isAlive(row, col)) {
      for (var i = neighbors.length - 1; i >= 0; i--) {
        const nr = Number(neighbors[i][0]);
        const nc = Number(neighbors[i][1]);

        if (this.isAlive(nr, nc)) {
          aliveNeighborsCount++;

          if (aliveNeighborsCount >= 4) {
            console.log('cell dies');
            break;
          } else if (aliveNeighborsCount === 2 || aliveNeighborsCount === 3) {
            console.log('cdll stays alive');
            break;
          }
        } else if (!this.isAlive(nr, nc)) {
          aliveNeighborsCount++;
          //
        }
      }
    }
    
  }

  componentWillMount() {
    this.setState({
      rows: 3,
      columns: 20,
      aliveCells: [ [ 0, 5, 20, 1 ], [ 2, 10 ], [ 6, 3, 1 ] ]
    })
  }

  render() {
    return (
      <div>
        <h1>The Game of Life</h1>
        <div className="game">
          <div className="game--controls"></div>
          <Grid rows={this.state.rows} columns={this.state.columns} aliveCells={this.state.aliveCells} toggleIsAliveState={this.toggleIsAliveState}/>
        </div>
      </div>
    )
  }
}

export default App;
