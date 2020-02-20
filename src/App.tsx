import React from 'react';
// import * as W from "./wheel.tsx";
import * as W from './wheel'
// import { Dial } from './original.tsx';
import './App.css';

let data : W.Item[] = [
  {
    name: "one",
    x: 0,
    y: 0
  },
  {
    name: "two",
    x: 0,
    y: 0
  },
  {
    name: "three",
    x: 0,
    y: 0
  },
  {
    name: "four",
    x: 0,
    y: 0
  },
  // {
  //   name: "five"
  // },
  // {
  //   name: "six"
  // },
  // {
  //   name: "seven"
  // }
]

function App() {
  return (
    <div className = "menu">
      <W.Wheel items = {data} organization = "opposite" />
    </div>
  );
}

export default App;
