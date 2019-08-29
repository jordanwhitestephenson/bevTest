import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Navigation from './views/Navigation'
import ContentArea from './views/ContentArea'

function App() {
  
  return (
    <div className="App">
      <Navigation />
      <ContentArea/>
    </div>
  );
}

export default App;
