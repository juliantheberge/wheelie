import React from 'react';
// import * as W from "./wheel.tsx";
import * as W from './wheel'
import * as randomWords from 'random-words'
// import { Dial } from './original.tsx';
import './App.css';

function genWord() {
  return randomWords()
}

function genCoord() {
  return {
    name: genWord(),
    x: 0,
    y: 0
  }
}

function genData(amount: number) : W.Item[] {
  let data : W.Item[] = [] ;
  for (let i = 0; i < amount; i++) {
    data.push(genCoord())
  }
  return data;
}

function genItemLimits(max:number, min: number) {
  let maxItems: number = Math.floor(Math.random() * (max - min + 1)) + min;
  return {
    maxItems,
    items: Math.floor(Math.random() * (maxItems - min + 1)) + min
  }
}

function App() {
  let limits = genItemLimits(12, 8)
  console.log({limits})
  return (
    <div className = "menu">
      <W.Wheel items = {genData(limits.items)} organization = "stacking" maxItems = {limits.maxItems}/>
      <h1 style = {{
        position: 'fixed',
        top: 0,
        left: 0
      }}>{limits.maxItems}</h1>
    </div>
  );
}

export default App;
