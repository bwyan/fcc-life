import React, {Component} from 'react';

//components
import Grid from './Grid';
import GameControls from './GameControls';

//constants
import neighbors from './neighbors';

//styles
import './App.scss';

class App extends Component {
  constructor() {
    super();

    this.setGridDimensions = this.setGridDimensions.bind(this);
    this.toggleIsAliveState = this.toggleIsAliveState.bind(this);
    this.isAlive = this.isAlive.bind(this);
    this.setCellToNextStageOfLife = this.setCellToNextStageOfLife.bind(this);
    this.setGameToNextStageOfLife = this.setGameToNextStageOfLife.bind(this);
    this.addTocellsToToggle = this.addTocellsToToggle.bind(this);
    this.addToCellsToMakeAlive = this.addToCellsToMakeAlive.bind(this);
    this.addToCellsToMakeDead = this.addToCellsToMakeDead.bind(this);
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



  isAlive(row, col) {
    if (row < 0 || row > this.state.rows -1  || col < 0 || col > this.state.columns - 1) return false;//TODO: remove this once we have different rules for edge and corner cells.

    return this.state.aliveCells[row].includes(col);
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

  
  addTocellsToToggle(row, col) {
    const cellsToToggle = this.state.cellsToToggle;

    cellsToToggle.push([row, col]);

    this.setState({
      cellsToToggle: cellsToToggle
    })
  }
  
  addToCellsToMakeAlive(row, col) {
    const cellsToMakeAlive = this.state.cellsToMakeAlive;

    cellsToMakeAlive.push([row, col]);

    this.setState({
      cellsToMakeAlive: cellsToMakeAlive
    })
  }

  addToCellsToMakeDead(row, col) {
    const cellsToMakeDead = this.state.cellsToMakeDead;

    cellsToMakeDead.push([row, col]);

    this.setState({
      cellsToMakeDead: cellsToMakeDead
    })
  }  


  setCellToNextStageOfLife(row, col) {
    let aliveNeighborsCount = 0;

    switch (this.isAlive(row, col)) {
      case true:

        for (let i = 0; i < 8; i++) { //test each neighbor cell.
   
          const nr = Number(neighbors[i][0]) + row;
          const nc = Number(neighbors[i][1]) + col;

          if (this.isAlive(nr, nc)) { //if the neighbor cell is alive…          
            aliveNeighborsCount++; //increment the count.
            
            if (aliveNeighborsCount >= 4) { //once the count reaches 4, we can stop because the rules are the same for 4–8 living neighbors.
              this.addToCellsToMakeDead(row, col);
              break;
            }
          }
        }

        if (aliveNeighborsCount === 0 || aliveNeighborsCount === 1) {
          this.addToCellsToMakeDead(row, col);
        }
        break;
      
      case false:
        for (let i = 0; i < 8; i++) { //test each neighbor cell.
   
          const nr = Number(neighbors[i][0]) + row;
          const nc = Number(neighbors[i][1]) + col;

          if (this.isAlive(nr, nc)) { //if the neighbor cell is alive…
            aliveNeighborsCount++; //increment the count.
            
            if (aliveNeighborsCount > 3) {
              break;
            }      
          }
        }
        if (aliveNeighborsCount === 3) {//cells with three neighbors come to life
          this.addToCellsToMakeAlive(row, col);
        }
        break;

      default:
        console.error('Cell was neither alive nor dead');
    } 
  }

  setGameToNextStageOfLife() {
    for (let r = 0; r < this.state.rows; r++) {
      for (let c = 0; c < this.state.columns; c++) {
        this.setCellToNextStageOfLife(r, c);
      }
    }

    let cellsToMakeDead = this.state.cellsToMakeDead;
    let cellsToMakeAlive = this.state.cellsToMakeAlive;
    let aliveCells = this.state.aliveCells;

    cellsToMakeAlive.forEach(cell => {
      aliveCells[cell[0]].push(cell[1]);
    });

    cellsToMakeDead.forEach(cell => {
      aliveCells[cell[0]].splice(aliveCells[cell[0]].indexOf(cell[1]), 1);
      // aliveCells[row].splice(aliveCells[row].indexOf(col), 1);
    });

    this.setState({
      aliveCells: aliveCells,
      cellsToMakeAlive: [],
      cellsToMakeDead: []
    })

    //if(this.state.gameIsRunning) {this.setGameToNextStageOfLife()} (need something like this to keep game running)
  }

  componentWillMount() {
    this.setState({
      rows: 3,
      columns: 20,
      aliveCells: [ [1, 5, 10, 20], [1, 5, 10, 20], [1, 5, 10, 20], [], [1, 5, 10, 20], [1, 5, 10, 20], [1, 5, 10, 20], [], [1, 5, 10, 20], [1, 5, 10, 20], [1, 5, 10, 20], []],
      cellsToMakeAlive: [],
      cellsToMakeDead: [],
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
          <GameControls setGameToNextStageOfLife={this.setGameToNextStageOfLife}/>
          <Grid rows={this.state.rows} columns={this.state.columns} aliveCells={this.state.aliveCells} toggleIsAliveState={this.toggleIsAliveState}/>
        </div>
      </div>
    )
  }
}

export default App;
