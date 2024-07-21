import React from 'react'
import ReactDOM from 'react-dom/client'
import Navbar from './components/Navbar'
import Tagline from './components/Tagline'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Navbar/>
    <Tagline/>
  </React.StrictMode>,
)
