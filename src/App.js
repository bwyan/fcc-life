import React, {Component} from 'react';

//components
import Grid from './Grid';

//styles
import './App.scss';

class App extends Component {
  componentWillMount() {
    this.setState({
      rows: 20,
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
