import { Navigate, Route, Routes } from "react-router-dom"
import "./App.css"
import Container from "@mui/material/Container"
import { Heroes } from "./features/heroes/components/Heroes"
import { Hero } from "./features/heroes/components/Hero"

const App = () => {
  return (
    <Container maxWidth="md">
      <Routes>
        <Route path="/heroes/:heroId" element={<Hero />} />
        <Route path="/heroes" element={<Heroes />} />
        <Route path="/" element={<Navigate to="/heroes" replace />} />
      </Routes>
    </Container>
  )
}

export default App
