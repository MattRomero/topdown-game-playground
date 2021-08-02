import React from 'react';
import './App.scss';
import { FirstMap } from './Maps/'
import { MainCharacter } from './Characters' 

function App() {
  return (
    <div className="App">
      <FirstMap>
        <MainCharacter/>
      </FirstMap>
    </div>
  );
}

export default App;
