import "./pledge.css";

const Pledge = (props) => {
  const data = props.data;

  return (
    <section
      className={
        "Pledge__container" +
        (data.remaining === 0 ? " Pledge__container--oos" : "")
      }
    >
      <hgroup className="Pledge__title-container">
        <h3 className="Pledge__title">{data.title}</h3>
        <p className="Pledge__money-breakpoint">
          Pledge ${data.minPledge} or more
        </p>
      </hgroup>
      <p>{data.description}</p>
      <div className="Pledge__reward">
        <div className="Pledge__reward--remaining-container">
          <p className="Pledge__reward--remaining">{data.remaining}</p>
          <p>left</p>
        </div>
        <button
          className={
            "std-button" + (data.remaining === 0 ? " button--oos" : "")
          }
        >
          {data.remaining === 0 ? "Out of stock" : "Select Reward"}
        </button>
      </div>
    </section>
  );
};

export default Pledge;
