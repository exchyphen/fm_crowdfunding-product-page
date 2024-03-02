import "./navTitles.css";

const NavTitles = (props) => {
  return (
    <>
      {props.titlesArr.map((title, index) => {
        return (
          <li
            key={`NavTitles${index}`}
            className={
              "NavTitles__li" +
              (props.modalState ? " NavTitles__li--mobile" : "")
            }
          >
            <a>{title}</a>
          </li>
        );
      })}
    </>
  );
};

export default NavTitles;
