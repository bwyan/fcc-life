import React from 'react';

class Cell extends React.Component {
	handleClick(e) {
		e.preventDefault();
		const row = Number(e.target.getAttribute("data-row"));
		const col = Number(e.target.getAttribute("data-col"));

		this.props.toggleIsAliveState(row, col);
	}

	render() {
		return(
			<td data-row={this.props.rowNumber} data-col={this.props.colNumber} onClick={(e) => this.handleClick(e)}>{this.props.isAlive ? '🌺' : '🌫'}</td>
		)
	}
}

export default Cell;