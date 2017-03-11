import React, {Component} from 'react';

//components
import Grid from './Grid';

//styles
import './App.scss';

class App extends Component {
  constructor() {
    super();

    this.setGridDimensions = this.setGridDimensions.bind(this);
  }

  setGridDimensions(x, y) {
    const rows = x;
    const columns = y || this.state.columns;
    const aliveCells = this.state.aliveCells;

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
          <Grid rows={this.state.rows} columns={this.state.columns} aliveCells={this.state.aliveCells}/>
        </div>
      </div>
    )
  }
}

export default App;
