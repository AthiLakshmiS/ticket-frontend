import './App.scss'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SupportAgent from './components/supportAgent';
import SupportTicket from './components/supportTicket';
import SupportTask from './components/supportTask';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/agent' element={<SupportAgent />}></Route>
        <Route path='/ticket' element={<SupportTicket />}></Route>
        <Route path='/' element={<SupportTask />}></Route>
      </Routes>
    </Router>
  )
}

export default App
