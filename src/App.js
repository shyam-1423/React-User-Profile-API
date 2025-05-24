// App.js
import React from 'react';
import UserList from './components/UserList';
import './App.scss';

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div className="app">
      <UserList />
    </div>
  );
};

export default App;