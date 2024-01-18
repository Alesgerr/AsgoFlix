import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { CiSearch, CiDark, CiLight } from "react-icons/ci";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Input,
  Collapse,
} from "@material-tailwind/react";

const Header = () => {
  const [openNav, setOpenNav] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeLinkHande = () => {
    setOpenNav(false);
  };
  const navList = (
    <ul
      onClick={closeLinkHande}
      className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6"
    >
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <NavLink to="/tv" className="flex items-center">
          Tv
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <NavLink to="/movies" className="flex items-center">
          Movies
        </NavLink>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <NavLink to="/categories" className="flex items-center">
          Categories
        </NavLink>
      </Typography>
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
    <Navbar className={`${openNav ? 'dark:bg-black' : 'bg-white'} dark:text-white rounded-none bg-transparent ml-2 mr-2 mx-auto dark:shadow-gray-900 dark:shadow-sm shadow-md dark:border-hidden border-hidden text-black px-4 py-2 lg:px-8 lg:py-4 relative z-50`}>
      <div className="container mx-auto flex flex-wrap lg:items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
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
        <div className="hidden items-center gap-x-2 lg:flex ">
          <div className="relative flex w-full gap-2 md:w-full">
            <Input
              type="search"
              placeholder="Search"
              containerProps={{
                className: "min-w-[288px]",
              }}
              className="pl-9 rounded-lg  "
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <div className="!absolute left-2 top-[12px]">
              <CiSearch />
            </div>
          </div>
          <Button
            size="sm"
            className="rounded-lg dark:text-black dark:bg-white text-white bg-black"
          >
            Search
          </Button>
          <button onClick={changeTheme} className="rounded-lg  ml-2">
            {theme === "dark" ? <CiDark size={25} /> : <CiLight size={25} />}
          </button>
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <div className="container mx-auto">
          {navList}
          <div className="flex flex-col gap-x-2 sm:flex-row sm:items-center">
            <div className="relative w-full gap-2 md:w-max">
              <Input
                type="search"
                placeholder="Search"
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
            </div>
            <Button
              size="sm"
              className="mt-2 rounded-lg sm:mt-0 dark:text-black dark:bg-white text-white bg-black"
            >
              Search
            </Button>
            <div className="mt-3 flex text-center">
              <button onClick={changeTheme} className="rounded-lg ml-2">
                {theme === "dark" ? (
                  <CiDark size={25} />
                ) : (
                  <CiLight size={25} />
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
