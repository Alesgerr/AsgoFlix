import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FaStar } from "react-icons/fa";
import '../../assets/MovieDetail.css'

const MoviesDetails = () => {
   const {id} = useParams()
   const [movieData, setMovieData] = useState()

   const fetchData = async () => {
      const apiKey = "f345faa446485deffb377e9fe52e2792";

      const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`)
      setMovieData(res.data)
      console.log(res);
   }
   useEffect(() => {
      fetchData()
   },[id])
   const {
      budget,
      backdrop_path,
      poster_path,
      production_companies,
      production_countries,
      release_date,
      name,
      vote_average,
      overview,
      popularity,
      original_language,
      genres,
      video,
      title
    } = movieData || {};
  return (
   <>
   {
      movieData && (
         <> 
            <div className="banner" style={{backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`}}>
               <div className="absolute inset-0 bg-black opacity-40"></div>
               <div className="mb-3 movie-content">
                  <div className="relative movie-content__poster flex flex-col justify-center h-screen">
                  
                     <div className="movie-content__poster__img rounded-md h-96 w-full" style={{backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`}}></div>
                     {/* <div className="absolute inset-0 rounded-md bg-black opacity-50"></div> */}
                  </div>
                  
                  <div className="movie-content__info  text-white font-bold">
                     <h1 className="title">{title}</h1>
                     <div className="genres flex flex-wrap gap-1">{genres && genres.slice(0, 5).map((genre, i) => (
                        <span key={i} className="genres__item">{genre.name}</span>))}
                     </div>
                     <div className="flex items-center"><FaStar className="me-2 text-yellow-400"/> {vote_average.toFixed(2)}</div>
                     
                     <p>{overview}</p>
                     <div className="cast">

                     </div>
                  </div>
               </div>
            </div>
         </>
      )
   }
</>
  )
}

export default MoviesDetails