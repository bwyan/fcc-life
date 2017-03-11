import React from 'react';
import Cell from './Cell';

class Row extends React.Component {
	render() {
		let cells = []
		let aliveCells = this.props.aliveCells;

		for (var i = 0; i < this.props.columns; i++) {
			cells.push(<Cell key={i} isAlive={aliveCells.indexOf(i) === -1 ? false : true}/>)
		}		

		return(
			<tr>
				{cells}
			</tr>
		)
	}
}

export default Row;