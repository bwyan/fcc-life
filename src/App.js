import React, {Component} from 'react';

//components
import Grid from './Grid';

//styles
import './App.scss';

class App extends Component {
  componentWillMount() {
    this.setState({
      rows: 20,
      columns: 20
    })
  }

  render() {
    return (
      <div>
        <h1>The Game of Life</h1>
        <div className="game">
          <div className="game--controls"></div>
          <Grid rows={this.state.rows} columns={this.state.columns}/>
        </div>
      </div>
    )
  }
}

export default App;
