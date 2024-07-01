import { createRoot } from "react-dom/client"

function App(){
  return(
    <>
      <p>Página criada</p>
    </>
  )
}

createRoot(document.querySelector(".root")).render(<App></App>)