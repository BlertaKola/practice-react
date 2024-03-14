import { useState } from 'react'
import './App.css'
import Home from './components/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import About from './components/About'
import Authentication from './components/Authentication'
import Reviews from './components/Reviews'
import Review from './components/Review'
function App() {
  const userId = localStorage.getItem('userId');
  const [loguser, setLogUser] = useState({ id: '', email: '' });
  console.log("LOG USER ID: ", userId)
  return (
    <>

      <BrowserRouter>
        <Routes>
          {
            userId ?
              <>
                <Route path='/' element={<Home userId = {userId}/>} />
                <Route path='/movies/new' element={<About userId = {userId}/>} />
                <Route path='/movies/:id/reviews' element={<Reviews userId = {userId} />} />
                <Route path='/movies/:id/reviews/new' element={<Review userId={userId} />} />
              </>
              :
              <>
                <Route path='/auth' element={<Authentication loguser={loguser} setLogUser={setLogUser} />} />
                <Route path='/' element={<Authentication loguser={loguser} setLogUser={setLogUser} />} />
                <Route path='/about' element={<Authentication loguser={loguser} setLogUser={setLogUser} />} />
              </>
          }

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
