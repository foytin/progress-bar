import React from "react";
import styles from "./Error.scss";

const Error = (): React.ReactElement => (
  <div className={styles.centered} data-testid="error-page">
    <span role="img" className={styles.emoji} aria-label="error">
      😭
    </span>
    <p className={styles.title}>Ooooops!</p>
    <p className={styles.text}>Out of Service! Please try it later.</p>
  </div>
);

export default Error;
