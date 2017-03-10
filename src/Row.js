import React from 'react';
import Cell from './Cell';

class Row extends React.Component {
	render() {
		let cells = []

		for (var i = 0; i < this.props.columns; i++) {
			cells.push(<Cell key={i} isAlive={this.props.aliveCells}/>)
		}		

		return(
			<tr>
				{cells}
			</tr>
		)
	}
}

export default Row;