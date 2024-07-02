import { createRoot } from "react-dom/client"
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"

import "./assets/reset.css"
import "./assets/index.css"


import Login from "./Login"


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