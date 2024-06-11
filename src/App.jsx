import { Route, Routes } from "react-router-dom"
import Home from "./pages/home/home"
import Battle from "./pages/battle/battle"
import Header from "./components/header/header"


function App() {
  return (
    <>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/battle" element={<Battle />} />
        </Routes>
    </>
  )
}

export default App
