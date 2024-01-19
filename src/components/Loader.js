import { CircularProgress } from '@mui/material'
import React from 'react'
import './Loader.css'

function Loader() {
  return (

    <div className='loader-div'>
<center>
  <h1>Loading</h1>
  <CircularProgress/>
  </center>
    </div>
  
  )
}

export default Loader