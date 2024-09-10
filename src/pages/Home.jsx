import React from 'react'
import Hamster from '../component/loading/Hamster'

function Home() {
  return (
    <div>
      home
      <Hamster />
      <div>{import.meta.env.VITE_API_URL}</div>
    </div>
  )
}

export default Home
