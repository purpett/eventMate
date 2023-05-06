import './App.css';
import AllEventsPage from './components/AllEventsPage';
import NavBar from './components/NavBar';
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <h1>EventMate by The Full Stack Squad</h1>
      <NavBar />
      <AllEventsPage />
      <Routes>
        <Route path='/' element={ <AllEventsPage /> } />
      </Routes>

    </div>
  );
}

export default App;