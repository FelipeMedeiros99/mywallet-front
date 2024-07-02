import { createRoot } from "react-dom/client"
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"

import "./assets/reset.css"
import "./assets/index.css"


import Login from "./Components/Login"

// https://mywallet-back-p4xq.onrender.com

function App(){
  return(
    <>
      <Router>        
        <Routes>
          <Route path="/" element={<Login />}/> 
        </Routes>
      </Router>
    </>
  )
}

createRoot(document.querySelector(".root")).render(<App></App>)