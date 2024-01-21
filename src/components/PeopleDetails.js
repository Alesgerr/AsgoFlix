import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import Slider from "react-slick";

const PeopleDetails = () => {
  const { id } = useParams();
  const [peopleData, setPeopleData] = useState(null);
  const [movieCredits, setMovieCredits] = useState({ cast: [], crew: [] });

  const fetchData = async () => {
    const apiKey = "f345faa446485deffb377e9fe52e2792";

    const res = await axios.get(
      `https://api.themoviedb.org/3/person/${id}?api_key=${apiKey}&language=en-US`
    );
    setPeopleData(res.data);
  };
  const fetchPersonMovieCredits = async () => {
    const apiKey = "f345faa446485deffb377e9fe52e2792";

    const res = await axios.get(
      `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${apiKey}&language=en-US`
    );
    setMovieCredits(res.data);
  };
  useEffect(() => {
    fetchData();
    fetchPersonMovieCredits();
  }, [id]);

  const settings = {
    dots: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4, 
    focusOnSelect: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 0,
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
  // const uniqueMovies = Array.from(new Set([...movieCredits.cast, ...movieCredits.crew].map(movie => movie.id)))
  // .map(id => {
  //   return [...movieCredits.cast, ...movieCredits.crew].find(movie => movie.id === id);
  // });
  return (
   <div className="container mx-auto mt-10 p-4 overflow-hidden">
   {peopleData && (
     <>
       <div className="md:p-8 flex flex-col lg:justify-center md:flex-row">
         <div className="w-full md:w-1/2 lg:w-1/5 mb-4 md:mb-0">
            {peopleData.profile_path ? <img
              src={`https://image.tmdb.org/t/p/original/${peopleData?.profile_path}`}
              alt={peopleData.name}
              className="w-full h-72 object-cover rounded-md"
            /> :  <img
              src={'https://thinksport.com.au/wp-content/uploads/2020/01/avatar-.jpg'}
              alt={peopleData.name}
              className="w-full h-48 object-cover rounded-md"
            />}
         </div>
         <div className="flex flex-col justify-center md:w-2/3 md:px-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
            {peopleData.name}
            </h1>
            <p className="text-gray-500 text-lg md:text-xl mb-5 overflow-hidden" id="biography">
               {peopleData.biography.slice(0, 300)}{/* İlk 200 karakteri göster */}
               {peopleData.biography.length > 200 && (
                  <>
                     <span id="dots">...</span>
                     <span id="more" className="hidden">
                     {peopleData.biography.slice(200)}
                     </span>
                     <button
                     onClick={() => {
                        const dots = document.getElementById("dots");
                        const moreText = document.getElementById("more");
                        const btnText = document.getElementById("read-more-btn");

                        if (dots.style.display === "none") {
                           dots.style.display = "inline";
                           btnText.innerHTML = "More";
                           moreText.style.display = "none";
                        } else {
                           dots.style.display = "none";
                           btnText.innerHTML = "Less than";
                           moreText.style.display = "inline";
                        }
                     }}
                     id="read-more-btn"
                     className="text-blue-500 underline cursor-pointer"
                     >
                        More
                     </button>
                  </>
               )}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-5">
            <div>
               <span className="text-gray-700 font-semibold">Birthday:</span>
               <span className="ml-1">{peopleData.birthday}</span>
            </div>
            <div className="flex">
               <div className="text-gray-700 font-semibold">
                  Place of Birth:
               </div>
               <div className="ml-1">{peopleData.place_of_birth}</div>
            </div>
            </div>
            {/* <div className="mb-5">
               <span className="text-gray-700 font-semibold">Known For:</span>
               <ul className="list-disc pl-5">
                  {peopleData.also_known_as?.map((item) => (
                     <li key={item.id}>{item}</li>
                  ))}
               </ul>
            </div> */}
            {/* Diğer bilgileri ekleyebilirsiniz */}
         </div>
       </div>
       <div className="w-full mt-6">
         <h2 className="text-2xl font-bold mb-3">Movie Credits</h2>
         {/* Cast Slider */}
         {movieCredits.cast.length > 0 && (
           <div className="mb-6">
             <Slider {...settings}>
               {movieCredits.cast.map((movie) => (
                 <div
                   key={movie?.id}
                   className="rounded-md overflow-hidden shadow-md"
                 >
                   <Link to={`/movies/${movie?.id}`}>
                     <div className="relative">
                        <div className="relative">
                          <img
                            src={`https://image.tmdb.org/t/p/w300/${movie?.backdrop_path || movie?.poster_path}`}
                            alt={movie?.title}
                            className="w-full h-48 object-cover rounded-md"
                          />
                          <div className="absolute inset-0 bg-black opacity-50 rounded-md"></div>
                        </div>
                        <div className="p-4">
                           <h4 className="text-lg font-semibold mb-5">
                            {movie.title.length > 50 ? movie.title.slice(20) + "..." : movie.title}
                           </h4>
                           {/* <p className="text-gray-600">{movie?.character}</p> */}
                           {/* <div className="flex items-center mt-2 absolute top-2 right-5 text-white">
                              <FaStar className="text-yellow-500 mr-1" />
                              {movie?.vote_average.toFixed(1)}
                           </div> */}
                        </div>
                     </div>
                   </Link>
                 </div>
               ))}
             </Slider>
           </div>
         )}
 
         {/* Crew Slider */}
         {movieCredits.crew.length > 3 && (
           <div>
             <Slider {...settings}>
               {movieCredits.crew.map((movie) => (
                <div
                   key={movie?.id}
                   className="rounded-md overflow-hidden shadow-md flex flex-1"
                 >
                   <Link to={`/movies/${movie?.id}`}>
                     <div className="relative">
                        <div className="relative">
                          <img
                            src={`https://image.tmdb.org/t/p/w300/${movie?.backdrop_path || movie?.poster_path}`}
                            alt={movie?.title}
                            className="w-full h-48 object-cover rounded-md"
                          />
                          <div className="absolute inset-0 bg-black opacity-50 rounded-md"></div>
                        </div>

                        <div className="p-4">
                           <h4 className="text-lg font-semibold mb-5">
                           {movie.title.length > 50 ? movie.title.slice(20) + "..." : movie.title}
                           </h4>
                           {/* <p className="text-gray-600">{movie?.character}</p> */}
                           {/* <div className="flex items-center mt-2 absolute top-2 right-5 text-white">
                              <FaStar className="text-yellow-500 mr-1" />
                              {movie?.vote_average.toFixed(1)}
                           </div> */}
                        </div>
                     </div>
                   </Link>
                 </div>
               ))}
             </Slider>
           </div>
         )}
       </div>
     </>
   )}
 </div>
 
  );
};

export default PeopleDetails;