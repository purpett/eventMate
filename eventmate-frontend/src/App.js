import './App.css';
import AllEventsPage from './components/AllEventsPage';
import NavBar from './components/NavBar';
import { Routes, Route } from 'react-router-dom';
import EventPage from './components/EventPage';

function App() {

  return (
    <div className="App">
      <h1>EventMate by The Full Stack Squad</h1>
      <NavBar />
      <Routes>
        <Route path='/' element={ <AllEventsPage /> } />

        <Route path='/:id' element={<EventPage />} />
      </Routes>

    </div>
  );
}

export default App;