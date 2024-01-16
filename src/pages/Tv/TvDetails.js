import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FaStar } from "react-icons/fa";

const TvDetails = () => {
   const {id} = useParams()
   const [movieData, setMovieData] = useState()
   const [seasonData, setSeasonData] = useState([]);
   const [sortBy, setSortBy] = useState("sort");

   const fetchData = async () => {
      const apiKey = "f345faa446485deffb377e9fe52e2792";

      const res = await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=en-US`)
      setMovieData(res.data)
      setSeasonData(res.data.seasons)
      console.log(res);
   }
   useEffect(() => {
      fetchData()
   },[id])
   const {
      budget,
      backdrop_path,
      poster_path,
      languages,
      production_companies,
      production_countries,
      release_date,
      name,
      vote_average,
      overview,
      popularity,
      first_air_date,
      last_air_date,
      original_language,
      genres,
      video,
      seasons,
      
    } = movieData || {};

    const handleSortChange = (value) => {
      setSortBy(value);
    };
    const renderSeasons = () => {
      let sortedSeasons = [...seasonData];
  
      if (sortBy === "first_air_date.desc") {
        sortedSeasons = sortedSeasons.sort((a, b) => new Date(b.air_date) - new Date(a.air_date));
      } else if (sortBy === "first_air_date.asc") {
        sortedSeasons = sortedSeasons.sort((a, b) => new Date(a.air_date) - new Date(b.air_date));
      }
      console.log(sortedSeasons);
      return sortedSeasons.map((season, index) => (
        <div key={index} className="bg-gray-800 p-4 mt-10 rounded-md w-28 md:w-  lg:w-40">
          <h3 className="text-2xl font-bold">{season.name}</h3>
          {/* <p className="text-gray-400">Air Date: {season.air_date}</p> */}
          <p className="text-gray-400">Episode Count: {season.episode_count}</p>
          {/* <p className="text-gray-400">Vote Average: {season.vote_average}</p> */}
        </div>
      ));
    };
  return (
   <>
      {
         movieData && (
            <> 
               <div className="banner" style={{backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`}}>
                  <div className="absolute inset-0 bg-black opacity-40"></div>
                  <div className="mb-3 movie-content">
                  {/* <div className="mt-24">
                     <label className="text-gray-400">Sort By:</label>
                     <select
                        value={sortBy}
                        onChange={(e) => handleSortChange(e.target.value)}
                        className="ml-2 p-2 border rounded dark:bg-black"
                     >
                        <option value="sort">Sort</option>
                        <option value="first_air_date.desc">Newest to Oldest</option>
                        <option value="first_air_date.asc">Oldest to Newest</option>
                     </select>
                  </div> */}
                     <div className="relative movie-content__poster flex flex-col justify-center h-screen">
                     
                        <div className="movie-content__poster__img rounded-md h-96 w-full" style={{backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`}}></div>
                        {/* <div className="absolute inset-0 rounded-md bg-black opacity-50"></div> */}
                     </div>
                     
                     <div className="movie-content__info  text-white font-bold">
                        <div className="flex items-center justify-between">
                        
                        <div>
                           <h1 className='text-2xl font-bold'>{name}</h1>
                           <div className='mt-2 mb-2'>{first_air_date} || {last_air_date}</div>
                           <div>Seasons {seasons.length}</div>
                           
                        </div>
                        {/* ({languages}) */}
                        </div>
                        <div className="genres flex flex-wrap items-center gap-1">{genres && genres.slice(0, 5).map((genre, i) => (
                           <span key={i} className="genres__item">{genre.name}</span>))}
                        </div>
                        <div className="flex items-center"><FaStar className="me-2 text-yellow-400"/> {vote_average.toFixed(2)}</div>
                        <div className="season">
                           <div className='flex flex-wrap gap-1'>{renderSeasons()}</div>
                        </div>
                        <p>{overview}</p>
                        <div className='flex gap-2'>
                              {production_companies?.map(item => (
                                 <div className='' key={item.id}>
                                    <div className=''>
                                       <img className='w-32 h-10 object-contain' src={`https://image.tmdb.org/t/p/original/${item.logo_path}`} alt="" />
                                    </div>
                                    <div className='text-center'>{item.name}</div>
                                 </div>
                              ))}
                           </div>
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

export default TvDetails