import React, { Component } from 'react';
import Calculator from './calculator';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>Sliding Scale Calculator</h2>
          <Calculator />
        </header>
      </div>
    );
  }
}

export default App;
