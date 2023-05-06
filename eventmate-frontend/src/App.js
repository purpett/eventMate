import './App.css';
import AllEventsPage from './components/AllEventsPage';
import NavBar from './components/NavBar';
import { Routes, Route } from 'react-router-dom';

import CreateEventPage from './components/CreateEventPage';
import { useState, useEffect } from "react"
import SignUp from './components/SignUp';




function App() {

  const [everyEvent, setEveryEvent] = useState([])

  return (
    <div className="App">
      <NavBar />
      <h1>EventMate by The Full Stack Squad</h1>

      
      <Routes>
        <Route path='/' element={ <AllEventsPage everyEvent={everyEvent} setEveryEvent={setEveryEvent}/> } />
        <Route path='/CreateEventPage' element={ <CreateEventPage everyEvent={everyEvent} setEveryEvent={setEveryEvent}/>} />
        <Route path='/SignUp' element= {  <SignUp />} />
      </Routes>
      

    
    </div>
  );
}

export default App;