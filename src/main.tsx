import React from 'react'
import ReactDOM from 'react-dom/client'
//beign with css init
import "reset-css"
//UI

//gobal style
import "@/assets/styles/global.scss"
//component
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  // </React.StrictMode>
)
