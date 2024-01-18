import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FaStar } from "react-icons/fa";
import '../../assets/MovieDetail.css'
import Slider from "react-slick";

const MoviesDetails = () => {
   const {id} = useParams()
   const [movieData, setMovieData] = useState()
   const [castData, setCastData] = useState({})

   const fetchData = async () => {
      const apiKey = "f345faa446485deffb377e9fe52e2792";

      const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`)
      setMovieData(res.data)
   }
   const fetchCredits = async () => {
      try {
        const apiKey = "f345faa446485deffb377e9fe52e2792";
        const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`);
        setCastData(res.data);
      } catch (error) {
        console.error("Fetch credits error:", error);
      }
    };
    
   useEffect(() => {
      fetchData()
      fetchCredits()
   },[id])

   const {
      budget, backdrop_path, poster_path, production_companies,
      production_countries, release_date, name, vote_average,
      overview, popularity, original_language, genres, video,
      title, belongs_to_collection
    } = movieData || {};
   
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 4,
            infinite: true,
            dots: true,
          },
        },
      
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
      ],
    };
  return (
   <>
   {
      movieData && (
         <> 
            <div className="banner" /*style={{backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`}}*/>
               <div className="absolute inset-0 dark:bg-black text-black"></div>
               <div className="mb-3  md:flex lg:flex movie-content">
                  <div className="relative movie-content__poster flex justify-center">
                     <div className="pt-5 max-w-80">
                        <img className="rounded-xl details_img" src={`https://image.tmdb.org/t/p/original/${poster_path ? poster_path : backdrop_path}`} alt="" />
                     </div>
                  </div>
                  <div className="movie-content__info flex flex-col justify-center sm:mb-0 md:mb-0 lg:mb-0 md:pl-4 lg:pl-6 dark:text-white font-bold">
                     <h1 className="title text-2xl movieContentDiv">{title}</h1>
                     <div className="mt-2 mb-2 movieContentDiv">
                      <span>Publication Date: {release_date}</span>
                    </div>
                     <div className="genres flex flex-wrap gap-1 movieContentDiv text-white">{genres && genres.slice(0, 5).map((genre, i) => (
                        <span key={i} className="genres__item">{genre.name}</span>))}
                     </div>
                     <div className="flex items-center movieContentDiv"><FaStar className="me-2 text-yellow-400"/> {vote_average.toFixed(2)}</div>
                     <p>{overview}</p>
                     <div className="cast movieContentDiv">
                        <Slider {...settings}>
                        {castData.cast?.map((dt) => (
                        <div key={dt.id} className="rounded-md overflow-hidden shadow-md">
                           <Link to={`/actor-details/${dt.id}`}>
                              <div className="relative">
                                 <div className="relative movieContentDiv flex justify-center">
                                    {dt.profile_path ? 
                                       <img
                                       className="inset-0  h-24 w-24 object-cover rounded-full"
                                       src={`https://image.tmdb.org/t/p/w300/${dt?.profile_path}`}/>  
                                       : 
                                       <img
                                       className="inset-0  h-24 w-24 object-cover rounded-full"
                                       width={200}
                                       height={200}
                                       src={"https://thinksport.com.au/wp-content/uploads/2020/01/avatar-.jpg"}/>
                                    }
                                 </div>
                              <div className="p-4 movieContentDiv text-center">
                                 <div className="actor_name">
                                    <h4 className="text-md font-semibold">{dt?.name}</h4>
                                 </div>
                              </div>
                              </div>
                           </Link>
                        </div>
                        ))}
                     </Slider>
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