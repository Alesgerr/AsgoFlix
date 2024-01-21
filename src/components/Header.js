import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { CiSearch, CiDark, CiLight, CiMenuBurger } from "react-icons/ci";
import { HiMiniXMark } from "react-icons/hi2";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Input,
  Collapse,
} from "@material-tailwind/react";
import profile from "../assets/profile.png";
import { motion } from "framer-motion";
import useAuth from "../custom-hooks/useAuth";
import { logout } from "../firebase";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import IconBtn from "@mui/material/IconButton";
import axios from "axios";
// import PersonAdd from '@mui/icons-material/PersonAdd';
// import Settings from '@mui/icons-material/Settings';
// import Logout from '@mui/icons-material/Logout';

const Header = () => {
  const [openNav, setOpenNav] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [imdbId, setImdbId] = useState("");
  // const [apiKey] = useState('f345faa446485deffb377e9fe52e2792');
  // const [externalSource] = useState('imdb_id');
  // const [foundMovies, setFoundMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  // const [defaultResults, setDefaultResults] = useState([]);
  const open = Boolean(anchorEl);
  const { currentUser } = useAuth();

  const closeLinkHandle = () => {
    setOpenNav(false);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = async () => {
    try {
      const apiKey = "f345faa446485deffb377e9fe52e2792";
      const apiUrl = `https://api.themoviedb.org/3/search/multi?query=${searchQuery}&include_adult=false&language=en-US&page=1&api_key=${apiKey}`;
      const response = await axios.get(apiUrl);
      setSearchResults(response.data.results || []);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };
  // const fetchDefaultResults = async () => {
  //   try {
  //     const apiKey = "f345faa446485deffb377e9fe52e2792";
  //     const defaultApiUrl = `https://api.themoviedb.org/3/search/multi?query=${imdbId}&include_adult=false&language=en-US&api_key=${apiKey}`;
  //     const defaultResponse = await axios.get(defaultApiUrl);
  //     setDefaultResults(defaultResponse.data.results || []);
  //     console.log(defaultResponse, "DEFAULT");
  //   } catch (error) {
  //     console.error("Error fetching default data:", error.message);
  //   }
  // };

  useEffect(() => {
    // Kullanıcının yazdığı şeyi takip etmek ve anında sonuçları getirmek
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim() !== "") {
        handleSearch();
      } else {
        // Kullanıcı bir şey yazmazsa, sonuçları sıfırla
        setSearchResults([]);
      }
    }, 500); // Belirli bir süre bekledikten sonra (örneğin, 500ms) arama yap

    return () => clearTimeout(timeoutId); // Her yazı değiştikçe önceki zamanlamayı temizle
  }, [searchQuery]);

  const navList = (
    <ul
      onClick={closeLinkHandle}
      className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6"
    >
      <NavLink to="/tv" className="flex items-center">
        Tv
      </NavLink>

      <NavLink to="/movies" className="flex items-center">
        Movies
      </NavLink>
      <NavLink to="/categories" className="flex items-center">
        Categories
      </NavLink>
    </ul>
  );
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") === "light" ? "dark" : "light"
  );

  const menu = [
    {
      name: "Sign In",
      url: "/login",
    },
  ];

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const changeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <Navbar
      className={`${
        openNav ? "dark:bg-black" : "bg-white"
      } dark:text-white rounded-none bg-transparent ml-2 mr-2 mx-auto dark:shadow-gray-900 dark:shadow-sm shadow-md dark:border-hidden border-hidden text-black px-4 py-2 lg:px-8 lg:py-4 relative z-50`}
    >
      <div className="container mx-auto flex flex-wrap lg:items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="/"
          className="mr-4 cursor-pointer py-1.5 flex items-center font-medium"
        >
          <div className="logo font-bold" style={{ fontSize: "23px" }}>
            <NavLink to="/" className="flex items-center">
              Asgoflix
            </NavLink>
          </div>
          <div className="flex ml-3">
            <div className="hidden lg:block text-1xl ">{navList}</div>
          </div>
        </Typography>
        <div className="items-center gap-x-2 flex">
          <div className="hidden lg:flex">
            <div className="flex items-center w-full gap-2 md:w-full">
              <div className="relative flex">
                <Input
                  type="search"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  containerProps={{
                    className: "min-w-[288px]",
                  }}
                  className="pl-9 p-2 rounded-lg  "
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
                {/* <button onClick={handleSearch}>
                  <CiSearch />
                </button> */}
                <div className="!absolute left-2 top-[30px] z-50  text-black">
                  {/* <button onClick={handleSearch}>
                    
                  </button> */}
                  {/* Arama yapıldığında sonuçları göster */}
                  {/* {defaultResults.length > 0 && (
                    <div className="mt-5">
                      <h2>Default Results:</h2>
                      <ul>
                        {defaultResults.map((result) => (
                          <li key={result.id}>{result.title || result.name}</li>
                        ))}
                      </ul>
                    </div>
                  )} */}

                  {/* Arama yapıldığında sonuçları göster */}
                  {searchResults.length > 0 && (
                    <div className="mt-7 p-3 bg-gray-100 border rounded">
                      <ul>
                        <div>
                          {searchResults?.slice(0, 10).map((result) => (
                            <li key={result.id} className="mb-2">
                              <Link
                                to={`/${
                                  result.media_type === "tv" ? "tv" : "movies"
                                }/${result.id}`}
                                className="text-blue-500 hover:underline"
                              >
                                {result.title || result.name}
                              </Link>
                            </li>
                          ))}
                        </div>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="user-i">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              {/* <Typography sx={{ minWidth: 100 }}>Contact</Typography> */}
              {/* <Typography sx={{ minWidth: 100 }}>Profile</Typography> */}
              <Tooltip title="Account settings">
                <IconBtn
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <motion.img
                    className="rounded-circle object-fit-cover"
                    width={35}
                    height={35}
                    whileTap={{ scale: 1.2 }}
                    src={currentUser ? currentUser.photoURL : profile}
                    alt={currentUser ? "" : ""}
                  />
                </IconBtn>
              </Tooltip>
            </Box>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 42,
                    height: 42,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleClose}>
                <Avatar /> {currentUser ? currentUser.displayName : "Profile"}
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  {/* <PersonAdd fontSize="small" /> */}
                </ListItemIcon>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  {/* <Settings fontSize="small" /> */}
                  {currentUser ? (
                    <Link to="/profile">
                      <button>Settings</button>
                    </Link>
                  ) : (
                    ""
                  )}
                </ListItemIcon>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  {/* <Logout fontSize="small" /> */}
                  {currentUser ? (
                    <button onClick={logout}>Logout</button>
                  ) : (
                    <Link to="sign-in">Sign in</Link>
                  )}
                </ListItemIcon>
              </MenuItem>
            </Menu>
          </div>
          {/* <Button
            size="sm"
            className="rounded-lg dark:text-black dark:bg-white text-white bg-black"
          >
            Search
          </Button> */}
          <div className="hidden lg:flex">
            <button onClick={changeTheme} className="rounded-lg  ml-2">
              {theme === "dark" ? <CiDark size={30} /> : <CiLight size={30} />}
            </button>
          </div>
          <button
            variant="text"
            className="ml-auto h-6 w-6  hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? <HiMiniXMark size={25} /> : <CiMenuBurger size={25} />}
          </button>
        </div>
      </div>
      <Collapse open={openNav}>
        <div className="container mx-auto">
          {navList}
          <div className="flex flex-col gap-x-2 sm:flex-row sm:items-center">
            <div className="relative w-full gap-2 md:w-max">
              <Input
                type="search"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                containerProps={{
                  className: "min-w-[288px]",
                }}
                className=" p-2 pl-9 placeholder:text-blue-gray-300 rounded-lg focus:!border-hidden"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
              <div className="!absolute left-2 top-[12px]">
                <CiSearch />
              </div>
              {searchResults.length > 0 && (
                <div className="mt-7 p-3 bg-gray-100 border rounded" onClick={closeLinkHandle}>
                  <ul>
                    <div>
                      {searchResults?.slice(0, 10).map((result) => (
                        <li key={result.id} className="mb-2">
                          <Link
                            to={`/${
                              result.media_type === "tv" ? "tv" : "movies"
                            }/${result.id}`}
                            className="text-blue-500 hover:underline"
                          >
                            <div className="flex items-center">
                              <img
                                src={`https://image.tmdb.org/t/p/original/${
                                  result.poster_path ? result.poster_path : result.backdrop_path
                                }`}
                                alt=""
                                className="w-12 rounded-md"
                              />
                              <h2 className="ml-2">{result.title || result.name}</h2>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </div>
                  </ul>
                </div>
              )}
            </div>
            <Button
              size="sm"
              className="mt-2 rounded-lg sm:mt-0 dark:text-black dark:bg-white text-white bg-black"
            >
              Search
            </Button>
            <div className="mt-3 sm:mt-0 md:mt-0">
              <button
                onClick={changeTheme}
                className="rounded-lg w-full h-full"
              >
                {theme === "dark" ? (
                  <div className="flex justify-center rounded-lg bg-black dark:bg-white text-white dark:text-black w-full px-2 py-2">
                    <div className="font-bold sm:hidden">Dark Mode</div>
                    <CiDark className="ml-2" size={25} />
                  </div>
                ) : (
                  <div className="flex justify-center rounded-lg bg-black dark:bg-white text-white dark:text-black w-full px-2 py-2">
                    <div className="font-bold sm:hidden">Light Mode</div>
                    <CiLight className="ml-2" size={25} />
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </Collapse>
    </Navbar>
  );
};

export default Header;
