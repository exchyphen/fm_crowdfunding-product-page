import { useState } from "react";
import "./pledge.css";

const Pledge = (props) => {
  const data = props.data;
  const [customAmount, setCustomAmount] = useState(data.minPledge);
  const [errorState, setErrorState] = useState(false);

  const blockInvalidChar_Integer = (e) => {
    if (["e", "E", "+", "-", "."].includes(e.key)) {
      e.preventDefault();
    }
  };

  const handleCustomAmount = (numStr) => {
    let num = Number(numStr);

    setCustomAmount(Math.trunc(num));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // check for minPledge
    if (customAmount <= 0 || customAmount < data.minPledge) {
      setErrorState(true);
      return;
    }
    setErrorState(false);

    props.onSubmit(customAmount, props.index);
  };

  return (
    <section
      className={
        "Pledge__container" +
        (data.remaining === 0 ? " Pledge__container--oos" : "") +
        (props.modal ? " Pledge__container--modal" : "") +
        (props.active ? " Pledge__container--modal-active" : "")
      }
    >
      {props.modal ? (
        <label className="Pledge__label" htmlFor={props.title}>
          <div className="Pledge__content-container">
            <hgroup className="Pledge__title-container Pledge__title-container--modal">
              <input
                id={props.title}
                className="Pledge__radio"
                type="radio"
                name="pledge"
                disabled={data.remaining === 0 ? "disabled" : ""}
                checked={props.active ? "checked" : ""}
                readOnly
                onClick={() => props.onClick()}
              ></input>
              <div className="Pledge__title-container--header">
                <h3 className="Pledge__title">{data.title}</h3>
                {data.remaining >= 0 ? (
                  <p className="Pledge__money-breakpoint">
                    Pledge ${data.minPledge} or more
                  </p>
                ) : null}
              </div>
            </hgroup>
            {data.remaining >= 0 && !props.mobile ? (
              <div className="Pledge__reward--remaining-container">
                <p className="Pledge__reward--remaining Pledge__reward--modal">
                  {data.remaining}
                </p>
                <p>left</p>
              </div>
            ) : null}
          </div>

          <p className="Pledge__description--modal">{data.description}</p>

          {data.remaining >= 0 && props.mobile ? (
            <div className="Pledge__reward--remaining-container">
              <p className="Pledge__reward--remaining Pledge__reward--modal">
                {data.remaining}
              </p>
              <p>left</p>
            </div>
          ) : null}

          {props.active ? (
            <div className="Pledge__enter-amount-container">
              <div className="Pledge__text-wrapper">
                <p>Enter your pledge</p>
                {errorState ? (
                  <p className="error-message">Pledge too low</p>
                ) : null}
              </div>
              <div className="Pledge__submit-container">
                <div className="Pledge__custom-amount-container">
                  <p className="Pledge__custom-amount--sign">$</p>
                  <input
                    type="number"
                    className="Pledge__custom-amount"
                    value={customAmount}
                    onKeyDown={blockInvalidChar_Integer}
                    onChange={(e) => handleCustomAmount(e.target.value)}
                  ></input>
                </div>
                <button
                  className="std-button"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Continue
                </button>
              </div>
            </div>
          ) : null}
        </label>
      ) : (
        <hgroup className="Pledge__title-container">
          <h3 className="Pledge__title">{data.title}</h3>
          <p className="Pledge__money-breakpoint">
            Pledge ${data.minPledge} or more
          </p>
        </hgroup>
      )}
      {props.modal ? null : <p>{data.description}</p>}

      {props.modal ? null : (
        <div className="Pledge__reward">
          <div className="Pledge__reward--remaining-container">
            <p className="Pledge__reward--remaining">{data.remaining}</p>
            <p>left</p>
          </div>
          <button
            className={
              "std-button" + (data.remaining === 0 ? " button--oos" : "")
            }
            onClick={data.remaining > 0 ? () => props.onClick() : () => {}}
          >
            {data.remaining === 0 ? "Out of stock" : "Select Reward"}
          </button>
        </div>
      )}
    </section>
  );
};

export default Pledge;
