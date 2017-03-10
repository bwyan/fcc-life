import React from 'react';
import Row from './Row'

class Grid extends React.Component {
	render() {
		let rows = [];

		for (var i = 0; i < this.props.rows; i++) {
			rows.push(<Row className={`row row-${i}`} key={i} columns={this.props.columns} aliveCells={this.props.aliveCells[i]}/>)
		}

		return (
			<table>
				<tbody>
					{rows}	
				</tbody>
			</table>
		)
	}
}

export default Grid;