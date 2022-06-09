import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tours-project'
function App() {
  const [loading, setLoading] = useState(true)
  const [tours, setTours] = useState([])
  const removeTour = (id) => {
    // update newTours only if tour.id !== id
    const newTours = tours.filter((tour) => tour.id !== id)
    setTours(newTours)
  }
  
  //function to fetch data
  const fetchTours = async() => {
    //in case setLoading was set as false previously, by setting the state to loading this will inform users accruately while fetching of data is undergoing
    setLoading(true)
    
    try {
      const response = await fetch(url)
      const tours = await response.json()
      setLoading(false)
      setTours(tours)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }
  
  // remember to have a dependency array
  useEffect(() => {
    fetchTours()
  }, [])
  
  //set one return when loading is true and one when it is not true
  if (loading) {
    return (
      <main>
        <Loading/>
      </main>
    )
  } else if (tours.length === 0) {
    return (
      <main>
        <div className='title'>
          <h2>no tours left</h2>
          <button className='btn' onClick={fetchTours}>refresh</button>
        </div>
      </main>
    )
  }


  // explanation for "<Tours tours={tours}/>"
  //  Tours is a component
  //  tours property = tours state value
  return (
    <main>
      <Tours tours={tours} removeTour={removeTour}/>
    </main>
  )
}

export default App
