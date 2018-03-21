import React, { Component } from 'react';
import Dashboard from './dashboard/Dashboard';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Dashboard/>
      </div>
    );
  }
}

export default App;
