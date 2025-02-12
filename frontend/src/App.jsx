import { Outlet } from 'react-router-dom'
import Nav from './components/Nav/Nav'
import Footer from './components/Footer/Footer'

function App() {

  return (
    <>
      <div className="min-h-screen bg-cover bg-center">
      <Nav></Nav>
      <Outlet />
      <Footer/>
    </div>
    </>
  )
}

export default App
