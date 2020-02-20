import React from 'react';
import * as W from './wheel'
import './App.css';
import * as G from './gen-data'

function App() {
	let limits = G.genItemLimits(4, 8)
	console.log({ limits })
	return (
		<div className="menu">
			<W.Wheel
				items={G.genData(limits.countItems)}
				organization="stacking"
				maxItems={limits.maxItems}
				itemRadius={limits.radius} />
			<h1 style={{
				position: 'fixed',
				top: 0,
				left: 0
			}}>COUNT: {limits.countItems}/{limits.maxItems}</h1>
		</div>
	);
}

export default App;
