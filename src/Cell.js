import React from 'react';

class Cell extends React.Component {
	render() {
		return(
			<td>{this.props.isAlive ? '😀' : '☠️'}</td>
		)
	}
}

export default Cell;