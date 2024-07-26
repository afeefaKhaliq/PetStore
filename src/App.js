import React from 'react';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div>
      <h1>Welcome to PetStore</h1>
      <Link to="/Login">Login</Link>
    </div>
  );
}

export default App;
