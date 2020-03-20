import * as randomWords from 'random-words';
import * as W from './wheel'
import { emojis } from './emojis';
import * as React from 'react';



// not sure if these 
function genWord() {
	return randomWords()
}

function genCoord() {
	return {
		content: emoji(),
		x: 0,
        y: 0,
        arc: 0
	}
}

function numRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function genData(amount: number): W.Item[] {
	let data: W.Item[] = [];
	for (let i = 0; i < amount; i++) {
		data.push(genCoord())
	}
	return data;
}

export function genItemLimits(min: number, max: number) {
    let maxItems: number = numRange(min, max)
    let radius: number = numRange(maxItems * 15, maxItems*40)
	return {
		maxItems,
        countItems: Math.floor(Math.random() * (maxItems - min + 1)) + min,
        radius
	}
}

export function emoji() {
	let maxItems: number = numRange(0, emojis.length)
	return emojis[Math.floor(Math.random() * (maxItems - 0)) + 0]
}