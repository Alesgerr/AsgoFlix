import React from 'react'
import MovieCards from '../components/MovieCards'

const Home = () => {
  return (
    <div className='main'>
      <section className='movieCard'>
         <div className="container mx-auto">
            <MovieCards />
         </div>
      </section>
    </div>
  )
}

export default Home