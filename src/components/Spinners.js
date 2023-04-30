import React from 'react'
import loading from './loading.gif'

const Spinners=()=> {
  
    return (
      <div  className='text-center'>
        <img src = {loading} width={25} height={25}  alt="loading"/>
      </div>
    )
  
}
export default Spinners