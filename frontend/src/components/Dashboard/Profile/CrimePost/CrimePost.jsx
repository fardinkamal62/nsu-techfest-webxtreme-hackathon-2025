import { useEffect, useState } from 'react'

export default function CrimePost() {
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
    {
      data && data.map((item, index) => (
        <div className="card card-side bg-base-100 shadow-xl mt-4">
        <figure>
          <img
            src={item.attachments[0]}
            alt="Movie"
            className=" w-96"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {item.title}
          </h2>
          <p>
            {item.description}
          </p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">View</button>
          </div>
        </div>
      </div>
      ))
    }
    </>
  );
}
