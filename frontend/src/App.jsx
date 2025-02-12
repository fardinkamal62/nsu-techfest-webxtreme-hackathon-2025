import { Outlet } from 'react-router-dom'
import Nav from './components/Nav/Nav'
import Footer from './components/Footer/Footer'
import CrimePost from "./components/Dashboard/Profile/CrimePost/CrimePost"
import { useEffect, useState } from 'react'

function App() {
  const [data, setData] = useState([])

    useEffect(() => {
      fetch('http://localhost:3000/api/v1/report')
        .then(response => response.json())
        .then(data => 
          setData(data.data)
        )
        .catch(error => console.log('error', error))
    });
  return (
    <>
      <div className="min-h-screen bg-cover bg-center px-7">
        <Nav />
        <Outlet />
        {
          data && data.map((item, index) => (
            <CrimePost key={index} data={item} />
          ))
        }

        <Footer />
      </div>
    </>
  )
}

export default App
