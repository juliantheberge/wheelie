import React from 'react';
// import * as W from "./wheel.tsx";
import * as W from './wheel'
// import { Dial } from './original.tsx';
import './App.css';

let data = [
  {
    name: ""
  },
  // {
  //   name: "two"
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
