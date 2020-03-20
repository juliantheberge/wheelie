import React from 'react';
import * as W from './wheel'
import './App.css';
import * as G from './gen-data'
import styled from 'styled-components';
/**
 * I'm imagining the menu data will be fetched somewhere inside wheel or passed in as with items prop now
 * when the data is fetched, the length of the data arr will determine the calculations for the rest
 * lets make a fill: boolean option which defaults to true which assumes
 */

const Info = styled.h1`
	position: fixed;
	top: 0;
	left: 0;
`;

function App() {
	let limits = G.genItemLimits(1, 18)
	console.log({ limits })
	return (
		<div className="menu">
			<W.Wheel
				items={G.genData(limits.countItems)}
				organization="stacking"
				maxItems={limits.maxItems}
				itemRadius={limits.radius}
				fill = {false} />
			<Info>COUNT: {limits.countItems}/{limits.maxItems}</Info>
		</div>
	);
};

export default App;
