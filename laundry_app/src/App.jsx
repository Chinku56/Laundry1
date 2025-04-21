import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import LoginPage from './pages/Login'
import Signup from './pages/Signup'
const App = () => {
  return (
    <div>
      {/* <LoginPage /> */}
      <Router>
        {/* <LoginPage /> */}
        <Routes>

        <Route path='/login'element={<LoginPage/>} />
        <Route path='/signup' element={<Signup/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
