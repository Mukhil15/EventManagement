
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Homepage from './Pages/HomePage'
import Adminpage from './Pages/Adminpage'
import EventsTablePage from './Pages/EventsTablePage'
import AddEventPage from './Pages/AddEventPage'
function App() {
  return (
     <BrowserRouter>
        <Routes>
          <Route path='/'  element= {<Homepage/>} />
          <Route path="/Admin" element={<Adminpage />} />
          <Route path="/EventsTable" element={<EventsTablePage/>} />
          <Route path="/AddEvents" element={<AddEventPage/>}/>
          </Routes> 
     </BrowserRouter>
    
  )
}

export default App
