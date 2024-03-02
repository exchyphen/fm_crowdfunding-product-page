import { useEffect, useState } from "react";
import "./App.css";

/* images */
import Logo from "./assets/images/logo.svg";
import MobileMenu from "./assets/images/icon-hamburger.svg";
import MobileMenuClose from "./assets/images/icon-close-menu.svg";

/* components */
import NavTitles from "./components/navTitles";

function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [mobileMenuState, setMobileMenuState] = useState(false);
  const mobileBreakpoint = 1200;

  /* data arrays */
  const navTitlesArr = ["About", "Discover", "Get Started"];

  /* initial load */
  useEffect(() => {
    const resize = () => {
      setWindowWidth(window.innerWidth);

      // ensure that mobile menu modal is closed
      if (window.innerWidth > mobileBreakpoint) {
        setMobileMenuState(false);
      }
    };

    window.addEventListener("resize", resize);

    // clean up
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <>
      <nav>
        <img className="nav__logo" src={Logo} alt="logo img"></img>
        {windowWidth > mobileBreakpoint ? (
          <ul className="nav__list">
            <NavTitles titlesArr={navTitlesArr} modalState={false}></NavTitles>
          </ul>
        ) : !mobileMenuState ? (
          <img
            className="nav__mobile-menu"
            src={MobileMenu}
            alt="menu open icon"
            onClick={() => setMobileMenuState(!mobileMenuState)}
          ></img>
        ) : (
          <img
            className="nav__mobile-menu"
            src={MobileMenuClose}
            alt="menu close icon"
            onClick={() => setMobileMenuState(!mobileMenuState)}
          ></img>
        )}
        {mobileMenuState ? (
          <ul className="nav__list--mobile">
            <NavTitles titlesArr={navTitlesArr} modalState={true}></NavTitles>
          </ul>
        ) : null}
      </nav>
    </>
  );
}

export default App;
