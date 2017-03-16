import React from 'react';

class GameControls extends React.Component {
	render() {
	  return( 
	    <div className="game--controls">
	      <button>start</button>
	      <button>stop</button>
	      <button>clear</button>
	      <label>Rows<input type="text" /></label>
	      <label>Columns<input type="text" /></label>
	    </div>			
		)
	}
}

export default GameControls;