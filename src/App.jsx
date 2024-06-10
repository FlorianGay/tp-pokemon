import { Route, Routes } from "react-router-dom"
import Home from "./pages/home/home"
import Battle from "./pages/battle/battle"


function App() {
  return (
    <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/battle" element={<Battle />} />
        </Routes>
    </>
  )
}

export default App
