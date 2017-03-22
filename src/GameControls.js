import React from 'react';
import { Debounce } from 'react-throttle';

class GameControls extends React.Component {
	constructor() {
		super();

		this.changeDimensions = this.changeDimensions.bind(this);
	}

	changeDimensions(event) {
		event.preventDefault();
		const rows = this.rowField.value;
		const columns = this.columnField.value;

		this.props.setGridDimensions(rows, columns);
	}

	render() {
	  return( 
	    <div className="game--controls">
	      <button id='next-button' onClick={this.props.setGameToNextStageOfLife} hidden>DEV: next</button>
	      <button onClick={this.props.toggleGameState}>{this.props.gameIsRunning ? 'Stop' : 'Start'}</button>
	      <button onClick={this.props.clearGrid}>Reset</button>
	      <form>
		      <label>
		      	Rows
		      	<Debounce time="250" handler="onChange">
			      	<input type="number" defaultValue={this.props.rows} onChange={this.changeDimensions} ref={(input) => {this.rowField = input}}/>
		      	</Debounce>
	      	</label>
		      <label>
		      	Columns
		      	<Debounce time="250" handler="onChange">
			      	<input type="number" defaultValue={this.props.columns}  onChange={this.changeDimensions} ref={(input) => {this.columnField = input}}/>
		      	</Debounce>
		      </label>
		     </form>
	    </div>			
		)
	}
}

export default GameControls;