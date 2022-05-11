import { useState } from 'react';
import './App.css';
import Grid from './components/Grid';

function App() {
  const [state, setState] = useState({
    color: '',
    result: [],
    isLoading: false,
  });
  const { color, result, isLoading } = state;
  
  const handleColorChange = (e) => {
    setState((p) => ({ ...p, color: e.target.value }));
  };

  const findColors = () => {
    if (isLoading) return;

    if (!color) {
      setState((p) => ({ ...p, result: [] }));
      return;
    }

    setState((p) => ({ ...p, isLoading: true }));

    fetch(`https://api.color.pizza/v1/names/${color}`).then((res) => res.json().then((res) => {
      setState((p) => ({
        ...p,
        result: res?.colors || [],
        isLoading: false
      }));
    })).catch((err) => {
      setState((p) => ({
        ...p,
        result: [],
        isLoading: false
      }));
    });
  };

  return (
    <div className="main-container">
      <div className="search-form">
        <h2>Color a Word!</h2>
        <input placeholder="Enter any color..." value={color} onChange={handleColorChange} />
        <button disabled={isLoading} onClick={findColors} className="btn-primary">Search</button>
      </div>
      {result.length === 0  && <p className="no-results">No result found.</p>}
      <div className="box-container">
        {result.map((color) => <Grid key={color.hex} color={color} />)}
      </div>
    </div>
  );
}

export default App;
