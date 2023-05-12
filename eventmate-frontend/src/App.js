import './App.css';
import AllEventsPage from './components/AllEventsPage';
import NavBar from './components/NavBar';
import { Routes, Route } from 'react-router-dom';
import EventPage from './components/EventPage';
import CreateEventPage from './components/CreateEventPage';
import { useState } from "react"
import SignUp from './components/SignUp';
import Login from './components/Login';
import ProfilePage from './components/ProfilePage';
import Footer from './components/Footer';


function App() {

  const [everyEvent, setEveryEvent] = useState([])

  return (
    <div className="App">
      <div className="app-content">
        <NavBar />
        <Routes>
          <Route path='/' element={<AllEventsPage everyEvent={everyEvent} setEveryEvent={setEveryEvent} />} />
          <Route path='/CreateEventPage' element={<CreateEventPage everyEvent={everyEvent} setEveryEvent={setEveryEvent} />} />
          <Route path='/ProfilePage' element={<ProfilePage />} />
          <Route path='/SignUp' element={<SignUp />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/ProfilePage' element={<ProfilePage />} />

          <Route path='/:id' element={<EventPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;