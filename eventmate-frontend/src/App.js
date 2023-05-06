import './App.css';
import AllEventsPage from './components/AllEventsPage';
import NavBar from './components/NavBar';
import { Routes, Route } from 'react-router-dom';
import CreateEventPage from './components/CreateEventPage';



function App() {

  return (
    <div className="App">
      <NavBar />
      <h1>EventMate by The Full Stack Squad</h1>
      
      <Routes>
        <Route path='/' element={ <AllEventsPage /> } />
        <Route path='/CreateEventPage' element={ <CreateEventPage />} />
      </Routes>
      
    </div>
  );
}

export default App;