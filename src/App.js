import React from 'react';
import './App.css';
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import MainScreen from './components/mainscreen';

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
            My Todo App
          </Typography>
        </Toolbar>
      </AppBar>
      <MainScreen />
    </div>
  );
}

export default App;
