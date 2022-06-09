import React, { useState, useEffect } from 'react'
import rgbToHex from './utils'

// rgb and weight parameters are part of color - Values(color).all(10)
const SingleColor = ({rgb,weight,index,hexColor}) => {
  const [alert,setAlert] = useState(false)
  const bcg = rgb.join(',')
  const hex = rgbToHex(...rgb)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert(false)
    },3000)
    return () => clearTimeout(timeout)
  }, [alert])
  
  return (
  //not the best way to display fonts w dark background by changing font color to white if index>10 but it is honest work
  <article 
  className={`color ${index>10 && 'color-light'}`} 
  style={{backgroundColor:`rgb(${bcg})`}}
  onClick={() => {
    setAlert(true)
    navigator.clipboard.writeText(hex)
  }}
  >
    <p className='percent-value'>{weight}%</p>
    <p className='color-value'>{hex}</p>
    {alert && <p className='alert'>copied to clipboard</p>}
  </article>
  )
}

export default SingleColor
