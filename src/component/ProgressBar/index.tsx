import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import styles from "./ProgressBar.scss";

interface ProgressBarProps {
  value: number;
  limit: number;
}

const ProgressBar = (props: ProgressBarProps): React.ReactElement => {
  const { value, limit } = props;
  const barClassName = classnames(styles.bar, {
    [styles.normal]: value <= limit,
    [styles.alert]: value > limit,
  });

  return (
    <div className={styles.container} data-testid="progress-bar">
      <p data-testid="bar-number">{`${value}%`}</p>
      <div
        className={barClassName}
        style={{ width: value > 100 ? "100%" : `${value}%` }}
        data-testid="bar-block"
      />
    </div>
  );
};

ProgressBar.propTypes = {
  value: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
};

export default ProgressBar;
