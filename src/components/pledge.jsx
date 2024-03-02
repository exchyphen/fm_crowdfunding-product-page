import "./pledge.css";

const Pledge = (props) => {
  const data = props.data;

  return (
    <section className="Pledge__container">
      <hgroup>
        <h3>{data.title}</h3>
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
        <button className="std-button">Select Reward</button>
      </div>
    </section>
  );
};

export default Pledge;
