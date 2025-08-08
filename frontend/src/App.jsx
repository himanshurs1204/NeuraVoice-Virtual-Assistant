import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signup from './pages/auth/signup'

function App() {
  return(
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
        </Routes>
        
      </Router>
    </div>
  )
}

export default App
