import React from 'react';
import { Debounce } from 'react-throttle';
import ErrorMessage from './ErrorMessage';

class GameControls extends React.Component {
	constructor() {
		super();

		this.changeDimensions = this.changeDimensions.bind(this);
	}

	changeDimensions(event) {
		event.preventDefault();
		let rows = this.rowField.value;
		let columns = this.columnField.value;

		if (rows > 50) {
			this.rowField.value = 50;
			rows = 50;

			this.setState({
				errorIsVisible: true,
				message: 'Max number of rows is 50'
			});

			setTimeout(function() {
				this.setState({errorIsVisible: false});
			}.bind(this), this.state.messageDuration)
		}

		if (columns > 50) {
			this.columnField.value = 50;
			columns = 50;

			this.setState({
				errorIsVisible: true,
				message: 'Max number of columns is 50'
			});

			setTimeout(function() {
				this.setState({errorIsVisible: false});
			}.bind(this), this.state.messageDuration)
		}

		this.props.setGridDimensions(rows, columns);
	}

	componentWillMount() {
		this.setState({
			errorIsVisible: false,
			messageDuration: 5000
		})
	}

	render() {
	  return( 
	    <div className="game-controls">
	    	<div className="container">
	      <button id='next-button' onClick={this.props.setGameToNextStageOfLife} hidden>DEV: next</button>
	      <button onClick={this.props.toggleGameState} className={this.props.gameIsRunning ? 'red' : 'green'}>{this.props.gameIsRunning ? 'Stop' : 'Start'}</button>
	      <button onClick={this.props.clearGrid}>Reset</button>
	      <form>
		      <label>
		      	Rows
		      	<Debounce time="1000" handler="onChange">
			      	<input type="number" min="1" max="50" defaultValue={this.props.rows} onChange={this.changeDimensions} ref={(input) => {this.rowField = input}}/>
		      	</Debounce>
	      	</label>
		      <label>
		      	Columns
		      	<Debounce time="1000" handler="onChange">
			      	<input type="number" min="1" max="50" defaultValue={this.props.columns}  onChange={this.changeDimensions} ref={(input) => {this.columnField = input}}/>
		      	</Debounce>
		      </label>
		      {this.state.errorIsVisible ? <ErrorMessage message={this.state.message} /> : null}
		     </form>
		     </div>
	    </div>			
		)
	}
}

export default GameControls;