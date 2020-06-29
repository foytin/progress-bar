import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import styles from "./StepButton.scss";

interface StepButtonProps {
  step: number;
  onClick: (step: number) => void;
}

const StepButton = (props: StepButtonProps): React.ReactElement => {
  const { step, onClick } = props;

  const buttonValue = (): string => {
    if (step < 0) {
      return step.toString();
    }
    return `+${step}`;
  };

  const cn = classnames(styles.btn, "btn btn-lg btn-outline-dark");
  return (
    <button
      type="button"
      className={cn}
      onClick={() => onClick(step)}
      data-testid="step-btn"
    >
      {buttonValue()}
    </button>
  );
};

StepButton.propTypes = {
  step: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default StepButton;
