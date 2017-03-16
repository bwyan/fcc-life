import React from 'react';

class Button extends React.Component {
	render() {
		return(
			<button onClick={this.handleClick}>{this.props.label}</button>
		)
	}
}

export default Button;