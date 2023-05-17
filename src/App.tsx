import { Navigate, Route, Routes } from "react-router-dom"
import Container from "@mui/material/Container"
import { HeroesPage } from "./pages/HeroesPage"
import { HeroPage } from "./pages/HeroPage"
import { ErrorPage } from "./pages/ErrorPage"
import { Header } from "./components/header/Header"

const App = () => (
  <Container maxWidth="md">
    <Header />
    <Routes>
      <Route path="/heroes/:heroId" element={<HeroPage />} />
      <Route path="/heroes" element={<HeroesPage />} />
      <Route path="/error" element={<ErrorPage />} />
      <Route path="/*" element={<Navigate to="/heroes" replace />} />
    </Routes>
  </Container>
)

export default App
