import { useEffect, useState } from "react";
import "./App.css";

/* images */
import Logo from "./assets/images/logo.svg";
import LogoMastercraft from "./assets/images/logo-mastercraft.svg";
import MobileMenu from "./assets/images/icon-hamburger.svg";
import MobileMenuClose from "./assets/images/icon-close-menu.svg";
import Bookmark from "./assets/images/icon-bookmark.svg";
import Bookmarked from "./assets/images/icon-bookmarked.svg";
import BackingModalClose from "./assets/images/icon-close-modal.svg";
import IconCheck from "./assets/images/icon-check.svg";

/* components */
import NavTitles from "./components/navTitles";
import Pledge from "./components/pledge";

function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [mobileMenuState, setMobileMenuState] = useState(false);
  const [backingModalState, setBackingModalState] = useState(false);
  const [backingCompleteState, setBackingCompleteState] = useState(false);
  const [activePledge, setActivePledge] = useState(-1);
  const [bookmarkState, setBookmarkState] = useState(false);
  const mobileBreakpoint = 1200;

  /* dev: think about disabling clicks outside when modal state is active */
  const [disableBackgroundClick, setDisableBackgroundClick] = useState(false);

  /* data arrays */
  const navTitlesArr = ["About", "Discover", "Get Started"];
  const pledgeDataArr = [
    {
      title: "Pledge with no reward",
      description:
        "Choose to support us without a reward if you simply believe in our project. As a backer, you will be signed up to receive product updates via email.",
      minPledge: 0,
      remaining: -1,
    },
    {
      title: "Bamboo Stand",
      description:
        "You get an ergonomic stand made of natural bamboo. You've helped us launch our promotional campaign, and you’ll be added to a special Backer member list.",
      minPledge: 25,
      remaining: 101,
    },
    {
      title: "Black Edition Stand",
      description:
        "You get a Black Special Edition computer stand and a personal thank you. You’ll be added to our Backer member list. Shipping is included.",
      minPledge: 75,
      remaining: 64,
    },
    {
      title: "Mahogany Special Edition",
      description:
        "You get two Special Edition Mahogany stands, a Backer T-Shirt, and a personal thank you. You’ll be added to our Backer member list. Shipping is included.",
      minPledge: 200,
      remaining: 0,
    },
  ];

  /* event handlers */
  const handleModalButtons = (index) => {
    if (index < 0) {
      setBackingModalState(false);
      return;
    }

    setBackingModalState(true);

    setActivePledge(index);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted");
    setBackingModalState(false);
    setBackingCompleteState(true);
  };

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

      <main>
        <header className="std-container">
          <img
            className="header__logo"
            src={LogoMastercraft}
            alt="mastercraft logo"
          ></img>
          <hgroup className="header__hgroup">
            <h1>Mastercraft Bamboo Monitor Riser</h1>
            <p>
              A beautiful & handcrafter monitor stand to reduce neck and eye
              strain.
            </p>
          </hgroup>
          <div className="header__options">
            <button
              className="std-button"
              onClick={() => handleModalButtons(0)}
            >
              Back this project
            </button>
            <button
              className="header__bookmark"
              onClick={() => setBookmarkState(!bookmarkState)}
            >
              {bookmarkState ? (
                <img
                  className="bookmark__img"
                  src={Bookmarked}
                  alt="bookmarked img"
                ></img>
              ) : (
                <img
                  className="bookmark__img"
                  src={Bookmark}
                  alt="bookmark img"
                ></img>
              )}
              {windowWidth > mobileBreakpoint ? (
                <p
                  className={
                    "bookmark__text" +
                    (bookmarkState ? " bookmark__text--active" : "")
                  }
                >
                  {bookmarkState ? "Bookmarked" : "Bookmark"}
                </p>
              ) : null}
            </button>
          </div>
        </header>

        <article className="std-container stat-tracker">
          <div className="stat-tracker__container">
            <div className="stat-tracker__single-stat-container">
              <p className="stat-tracker__current">$89,914</p>
              <p>of $100,000 backed</p>
            </div>
            <div className="stat-tracker__single-stat-container">
              <p className="stat-tracker__current">5,007</p>
              <p>total backers</p>
            </div>
            <div className="stat-tracker__single-stat-container">
              <p className="stat-tracker__current">56</p>
              <p>days left</p>
            </div>
          </div>
          <div className="stat-tracker__progress-bar">
            <div className="stat-tracker__progress-bar--inner"></div>
          </div>
        </article>

        <article className="std-container pledge">
          <hgroup className="pledge__header">
            <h2>About this project</h2>
            <p>
              The Mastercraft Bamboo Monitor Riser is a sturdy and stylish
              platform that elevates your screen to a more comfortable viewing
              height. Placing your monitor at eye level has the potential to
              improve your posture and make you more comfortable while at work,
              helping you stay focused on the task at hand.
            </p>
            <p>
              Featuring artisan craftsmanship, the simplicity of design creates
              extra desk space below your computer to allow notepads, pens, and
              USB sticks to be stored under the stand.
            </p>
          </hgroup>

          <div className="pledge__container">
            {pledgeDataArr.map((data, index) => {
              return index === 0 ? null : (
                <Pledge
                  key={`Pledge${index}`}
                  index={index}
                  data={data}
                  onClick={() => handleModalButtons(index)}
                  modal={false}
                ></Pledge>
              );
            })}
          </div>
        </article>

        {backingModalState ? (
          <form className="backing-modal">
            <img
              className="backing-modal__close"
              src={BackingModalClose}
              alt="close icon"
              onClick={() => handleModalButtons(-1)}
            ></img>
            <hgroup className="backing-modal__hgroup">
              <h2>Back this project</h2>
              <p>
                Want to support us in bringing Mastercraft Bamboo Monitor Riser
                out in the world?
              </p>
            </hgroup>

            {pledgeDataArr.map((data, index) => {
              return (
                <Pledge
                  key={`PledgeModal${index}`}
                  index={index}
                  data={data}
                  onClick={() => handleModalButtons(index)}
                  modal={true}
                  active={activePledge === index}
                  onSubmit={handleSubmit}
                ></Pledge>
              );
            })}
          </form>
        ) : null}

        {backingCompleteState ? (
          <div className="backing-modal complete">
            <img
              className="complete__icon-check"
              src={IconCheck}
              alt="icon check mark"
            ></img>
            <hgroup className="complete__hgroup">
              <h2>Thanks for your support!</h2>
              <p>
                Your pledge brings us one step closer to sharing Mastercraft
                Bamboo Monitor Riser worldwide. You will get an email once our
                campaign is completed.
              </p>
            </hgroup>
            <button
              className="std-button"
              onClick={() => setBackingCompleteState(false)}
            >
              Got it!
            </button>
          </div>
        ) : null}
      </main>

      <footer className="attribution">
        Challenge by{" "}
        <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
          Frontend Mentor
        </a>
        {". Coded by "}
        <a href="https://github.com/exchyphen" target="_blank">
          exc
        </a>
        .
      </footer>
    </>
  );
}

export default App;
