import React from 'react';
import './Gym.css';

const Exercise = (props) => {
  const{img,bodyPart,target,name} =props;
  return (
    <div className='exerciselistdiv'>
           <img src={img} alt="" />
           <div>
            <h2>{name}</h2>
            <p>{bodyPart}</p>
            <p>{target}</p>
           </div>
    </div>
  )
}

export default Exercise;