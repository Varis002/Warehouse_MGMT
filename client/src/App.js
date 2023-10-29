import React from 'react'
import { BrowserRouter , Routes , Route , Navigate} from 'react-router-dom';
import Home from './pages/Home';
import Details from './pages/Details';
import './App.css'

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/warehouse" replace={true} />}/>
        <Route path='/warehouse' element={<Home/>}/>
        <Route path='/warehouse/details/:id' element={<Details/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App