import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import qAndA from './data';

const Question = ({title,info}) => {
  const [showInfo, setShowInfo] = useState(false)
  return (
  <aritcle className='question'>
    <header>
      <h4>{title}</h4>
      <button className='btn' onClick={() => setShowInfo(!showInfo)}>
        {showInfo ? <AiOutlineMinus/> : <AiOutlinePlus/>}
      </button>
    </header>
    {showInfo && <p>{info}</p>}
  </aritcle>
  )}

export default Question;
