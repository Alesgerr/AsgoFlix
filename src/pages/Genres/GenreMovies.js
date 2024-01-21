import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {FaStar} from 'react-icons/fa'

const GenreMovies = () => {
   const {id} = useParams()
   const [movieData, setMovieData] = useState()
   const [genres, setGenres] = useState()

   const fetchMovData = async () => {
      const apiKey = "f345faa446485deffb377e9fe52e2792";
    
      const genresResponse = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
      );
      const genres = genresResponse.data.genres;
    
      setGenres(genres);
    
      const moviesResponse = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&include_adult=false&include_video=false&language=en-US`
      );
      setMovieData(moviesResponse.data.results);
    
      if (moviesResponse.data.results) {
        const matchingMovies = moviesResponse.data.results.filter(movie =>
          movie.genre_ids.includes(parseInt(id))
        );
        setMovieData(matchingMovies)
      }
    };
    
    useEffect(() => {
      fetchMovData()

    },[])
  return (
   <div className="relative mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 justify-center container mx-auto cursor-pointer transition-transform px-2">
      {movieData?.map((movie) => (
         <Link to={`/movies/${movie.id}`}>
            <div className="relative">
               <img
                  className="object-cover rounded-xl h-56"
                  width={500}
                  height={300}
                  src={`https://image.tmdb.org/t/p/original/${
                     movie?.backdrop_path || movie?.poster_path
                  }`}
                  alt={movie?.title}
               />
               <div className="absolute inset-0 bg-black opacity-50 rounded-xl"></div>
               <div className="absolute text-white bottom-0 p-2 w-full h-full flex flex-col items-start justify-end transition-opacity">
                  <div className="text-1xl font-bold">{movie?.title}</div>
                  <div className="text-1xl font-bold">
                     <div className="flex items-center">
                     <FaStar className="me-1 text-yellow-500" />{" "}
                     {movie?.vote_average.toFixed(2)}   
                     </div>
                  </div>
               </div>
            </div>
         </Link>
      ))}
 </div>
  )
}

export default GenreMovies