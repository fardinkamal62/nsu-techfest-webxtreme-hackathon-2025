import { Outlet } from 'react-router-dom'
import Nav from './components/Nav/Nav'

function App() {

  return (
    <>
      <div className="min-h-screen bg-cover bg-center">
      <Nav></Nav>
      <Outlet />
    </div>
    </>
  )
}

export default App
