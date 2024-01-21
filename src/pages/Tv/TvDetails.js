import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import "../../assets/MovieDetail.css";
import Slider from "react-slick";
import VideoList from "../../components/VideoList";
import Skeleton from "@mui/material/Skeleton";

const LoadingCardActor = () => (
  <div className="flex justify-center  gap-2">
    <Skeleton
      className="dark:bg-gray-500 rounded-sm"
      variant="circular"
      width={100}
      height={100}
    />
  </div>
);
const LoadingCard = () => (
  <div className="flex justify-center gap-2">
    <Skeleton
      className="dark:bg-gray-500 rounded-sm "
      variant="rectangular"
      width={300}
      height={200}
    />
    {/* <Skeleton variant="rounded" width={500} height={160} /> */}
  </div>
);
const TvDetails = () => {
  const { id } = useParams();
  const [movieData, setMovieData] = useState();
  const [movieDataVideo, setMovieDataVideo] = useState();
  const [simMovData, setSimMovData] = useState();
  const [seasonData, setSeasonData] = useState([]);
  const [sortBy, setSortBy] = useState("sort");
  const [castData, setCastData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const apiKey = "f345faa446485deffb377e9fe52e2792";

    const res = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=en-US`
    );
    setMovieData(res.data);
    setSeasonData(res.data.seasons);
  };
  const fetchDataVideos = async () => {
    const apiKey = "f345faa446485deffb377e9fe52e2792";

    const res = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${apiKey}&language=en-US`
    );
    setLoading(false);
    setMovieDataVideo(res.data.results);
  };
  const fetchCredits = async () => {
    try {
      const apiKey = "f345faa446485deffb377e9fe52e2792";
      const res = await axios.get(
        `https://api.themoviedb.org/3/tv/${id}/credits?api_key=${apiKey}&language=en-US`
      );
      setLoading(false);
      setCastData(res.data);
    } catch (error) {
      console.error("Fetch credits error:", error);
    }
  };
  const fetchSimilar = async () => {
    const apiKey = "f345faa446485deffb377e9fe52e2792";

    const res = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}/similar?api_key=${apiKey}&language=en-US&page=1`
    );
    setLoading(false);
    setSimMovData(res.data.results);
  };
  useEffect(() => {
    fetchData();
    fetchDataVideos();
    fetchCredits();
    fetchSimilar();
  }, [id]);
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
      sortedSeasons = sortedSeasons.sort(
        (a, b) => new Date(b.air_date) - new Date(a.air_date)
      );
    } else if (sortBy === "first_air_date.asc") {
      sortedSeasons = sortedSeasons.sort(
        (a, b) => new Date(a.air_date) - new Date(b.air_date)
      );
    }
    return sortedSeasons.map((season, index) => (
      <div key={index} className="bg-gray-800 p-4 rounded-md lg:w-36">
        <h3 className="md:text-1x1 lg:text-1xl font-bold text-white">
          {season.name}
        </h3>
        {/* <p className="text-gray-400">Air Date: {season.air_date}</p> */}
        <p className="text-gray-400 flex">Episode {season.episode_count}</p>
        {/* <p className="text-gray-400">Vote Average: {season.vote_average}</p> */}
        <div className="flex items-center">
          <FaStar className="text-yellow-400" />
          <span className="ml-1 text-white">{season.vote_average}</span>
        </div>
      </div>
    ));
  };

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
  const settings2 = {
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
          slidesToScroll: 3,
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
      {movieData && (
        <>
          <div
            className="banner container mx-auto overflow-hidden" /*</>style={{backgroundImage: `url(https://image.tmdb.org/t/p/original/${backdrop_path})`}} */
          >
            <div className="mb-3 movie-content md:flex lg:flex text-black">
              <div className="relative movie-content__poster flex justify-center">
                {loading ? (
                  <Skeleton
                    className="dark:bg-gray-500 rounded-md mt-3"
                    variant="rectangular"
                    width={400}
                    height={600}
                  />
                ) : (
                  <div className="pt-5 max-w-80">
                    <img
                      className="rounded-xl details_img"
                      src={`https://image.tmdb.org/t/p/original/${
                        poster_path ? poster_path : backdrop_path
                      }`}
                      alt=""
                    />
                  </div>
                )}
              </div>
              <div className="movie-content__info flex flex-col justify-center  sm:mb-0 md:mb-0 lg:mb-0 md:pl-4 lg:pl-6 dark:text-white font-bold">
                <div className="flex items-center justify-between">
                  <div>
                    {loading ? (
                      <Skeleton
                        className="dark:bg-gray-500 rounded-md mt-3"
                        variant="rectangular"
                        width={150}
                        height={40}
                      />
                    ) : (
                      <h1 className="mt-2 mb-2 text-2xl font-bold">{name}</h1>
                    )}
                    {loading ? (
                      <Skeleton
                        className="dark:bg-gray-500 rounded-md mt-3"
                        variant="rectangular"
                        width={120}
                        height={70}
                      />
                    ) : (
                      <div>
                        <VideoList videos={movieDataVideo} />
                        <div className="mt-2 mb-2">
                          {first_air_date?.slice(0, 4) ===
                          last_air_date?.slice(0, 4)
                            ? "Publication Date: " + first_air_date?.slice(0, 4)
                            : first_air_date?.slice(0, 4)}{" "}
                          {last_air_date?.slice(0, 4) ===
                          first_air_date?.slice(0, 4)
                            ? ""
                            : "| " + last_air_date?.slice(0, 4)}
                        </div>
                      </div>
                    )}
                  </div>
                  {/* ({languages}) */}
                </div>
                <div className="mt-2 mb-2 genres flex gap-1 flex-wrap text-white">
                  {loading ? (
                    <Skeleton
                      className="dark:bg-gray-500 rounded-md mt-3"
                      variant="rectangular"
                      width={300}
                      height={50}
                    />
                  ) : (
                    <div className="flex flex-wrap">
                      {genres &&
                        genres.slice(0, 5).map((genre, i) => (
                          <Link to={`/genres/tv-series/${genre.id}`} key={i}>
                            <div className="gap-1 flex">
                              <span key={i} className="genres__item ">
                                {genre.name}
                              </span>
                            </div>
                          </Link>
                        ))}
                    </div>
                  )}
                </div>
                <div className="mt-2 mb-2 flex items-center">
                  {loading ? (
                    <Skeleton
                      className="dark:bg-gray-500 rounded-sm mt-2"
                      variant="rectangular"
                      width={100}
                      height={40}
                    />
                  ) : (
                    <div>
                      <FaStar className="me-2 text-yellow-400" />{" "}
                      {vote_average.toFixed(2)}
                    </div>
                  )}
                </div>
                {loading ? (
                  <div>
                    <div className="mt-2 mb-2">
                      {loading ? (
                        <Skeleton
                          className="dark:bg-gray-500 rounded-sm mt-2"
                          variant="rectangular"
                          width={110}
                          height={40}
                        />
                      ) : (
                        <div>Seasons {seasons.length}</div>
                      )}
                    </div>
                    <Skeleton
                      className="dark:bg-gray-500 rounded-sm"
                      variant="rectangular"
                      width={100}
                      height={100}
                    />
                  </div>
                ) : (
                  <div className="mt-2 mb-2 season">
                    <div className="flex flex-wrap gap-1">
                      {renderSeasons()}
                    </div>
                  </div>
                )}
                <div className="description flex">
                  {loading ? (
                    Array.from({ length: 8 }).map((_, index) => (
                      <Skeleton
                        key={index}
                        className="dark:bg-gray-500 rounded-sm mt-2"
                        variant="rectangular"
                        width={100}
                        height={100}
                      />
                    ))
                  ) : (
                    <p className="mt-2 mb-2">{overview}</p>
                  )}
                </div>

                <div className="mt-2 mb-2 cast">
                  <Slider {...settings}>
                    {loading
                      ? Array.from({ length: 4 }).map((_, index) => (
                          <LoadingCardActor key={index} />
                        ))
                      : castData.cast?.map((dt) => (
                          <div
                            key={dt.id}
                            className="rounded-md overflow-hidden shadow-md"
                          >
                            <Link to={`/actor-details/${dt.id}`}>
                              <div className="relative">
                                <div className="relative movieContentDiv flex justify-center">
                                  {dt.profile_path ? (
                                    <img
                                      className="inset-0  h-24 w-24 object-cover rounded-full"
                                      src={`https://image.tmdb.org/t/p/w300/${dt?.profile_path}`}
                                    />
                                  ) : (
                                    <img
                                      className="inset-0  h-24 w-24 object-cover rounded-full"
                                      width={200}
                                      height={200}
                                      src={
                                        "https://thinksport.com.au/wp-content/uploads/2020/01/avatar-.jpg"
                                      }
                                    />
                                  )}
                                </div>
                                <div className="p-4 movieContentDiv text-center ">
                                  <div className="actor_name">
                                    <h4 className="text-md font-semibold">
                                      {dt?.name}
                                    </h4>
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
            <div className="similar-movies container mx-auto px-5 relative">
              {loading ? (
                ""
              ) : (
                <h1 className="dark:text-white px-1 py-5 font-bold text-2xl">
                  Similar Movies
                </h1>
              )}
              <Slider {...settings2}>
                {loading
                  ? Array.from({ length: 6 }).map((_, index) => (
                      <LoadingCard key={index} />
                    ))
                  : simMovData?.map((dt, i) => (
                      <div
                        key={i}
                        className="relative cursor-pointer text-white gap-2 "
                      >
                        <Link to={`/tv/${dt.id}`}>
                          <div className="relative">
                            <img
                              className="h-64 object-cover rounded-2xl"
                              width={500}
                              height={450}
                              src={`https://image.tmdb.org/t/p/original/${
                                dt?.backdrop_path || dt?.poster_path
                              }`}
                            />
                            <div className="absolute inset-0 bg-black opacity-50 rounded-2xl"></div>
                            <div className="absolute bottom-0 p-2 w-full h-full flex flex-col items-start justify-end transition-opacity">
                              <div className="text-2x1 font-bold">
                                {dt?.title}
                              </div>
                              <div className="flex items-center font-bold">
                                {dt.release_date
                                  ? dt.release_date.slice(0, 4)
                                  : ""}
                                <div
                                  className={`flex items-center ${
                                    dt.release_date ? "ml-5" : "sasas"
                                  }`}
                                >
                                  {dt?.vote_average.toFixed(2)}
                                  <FaStar className="ml-1 text-yellow-500" />{" "}
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
              </Slider>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TvDetails;
