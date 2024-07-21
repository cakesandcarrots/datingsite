import React from 'react'
import ReactDOM from 'react-dom/client'
import Navbar from './components/Navbar'
import Tagline from './components/Tagline'
import Couple from './components/Couple'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Navbar/>
    <Tagline/>
    <Couple/>
  </React.StrictMode>,
)
