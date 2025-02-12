import { Outlet } from 'react-router-dom'
import Nav from './components/Nav/Nav'
import Footer from './components/Footer/Footer'
import CrimePost from "./components/Dashboard/Profile/CrimePost/CrimePost"

function App() {

  return (
    <>
      <div className="min-h-screen bg-cover bg-center px-7">
      <Nav/>
      <Outlet />

      <CrimePost/>
      <CrimePost/>
      <CrimePost/>
      <CrimePost/>
      <CrimePost/>
      <CrimePost/>
      
      <Footer/>
    </div>
    </>
  )
}

export default App
