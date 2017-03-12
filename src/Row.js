import React from 'react';
import Cell from './Cell';

class Row extends React.Component {
	render() {
		let cells = []
		let aliveCells = this.props.aliveCells;

		for (var i = 0; i < this.props.columns; i++) {
			cells.push(<Cell key={i} rowNumber={this.props.rowNumber} colNumber={i} isAlive={aliveCells.indexOf(i) === -1 ? false : true} toggleIsAliveState={this.props.toggleIsAliveState}/>)
		}		

		return(
			<tr>
				{cells}
			</tr>
		)
	}
}

export default Row;