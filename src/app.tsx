import React from "react";
import ReactDOM from "react-dom";

import ProgressBarsChart from "./container/ProgressBarsChart";

import styles from "./app.scss";

const App = (): React.ReactElement => (
  <div className={styles.container}>
    <ProgressBarsChart />
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));
