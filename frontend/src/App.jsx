import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/NavBar'
import { Home } from 'lucide-react'


function App() {
  const [count, setCount] = useState(0)

  return (
     <>
     <Navbar />
     <Routes>
      <Route path="/" element={<Home />}/>
     </Routes>
     </>
  )
}

export default App