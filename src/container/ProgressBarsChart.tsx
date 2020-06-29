import React, { useState, useEffect } from "react";
import axios from "axios";

import ProgressBar from "../component/ProgressBar";
import StepButton from "../component/StepButton";
import BarSelection from "../component/BarSelection";
import Error from "../component/Error";

import { isVaildArray, keepUniqueArrayValue, sortArray } from "../util/index";

import styles from "./ProgressBarsChart.scss";

const ProgressBarsChart = (): React.ReactElement => {
  const [bars, setBars] = useState<number[]>([]);
  const [buttons, setButtons] = useState<number[]>([]);
  const [threshold, setThreshold] = useState<number>(0);
  const [barIndex, setBarIndex] = useState<string>("0");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get("http://pb-api.herokuapp.com/bars")
      .then((res) => {
        const { data } = res;
        const barsArr = data.bars || [];
        let buttonArr = data.buttons || [];
        const limit = data.limit || 100;
        if (isVaildArray(barsArr)) {
          setBars(barsArr);
        } else {
          setBars([]);
        }
        if (isVaildArray(buttonArr)) {
          // remove duplicated step value
          buttonArr = keepUniqueArrayValue(buttonArr);
          // sort buttons based on button value
          sortArray(buttonArr);
          setButtons(keepUniqueArrayValue(buttonArr));
        } else {
          setButtons([]);
        }
        setThreshold(limit);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setLoading(false);
      });
  }, []);

  const changeProgress = (step: number): void => {
    let value: number | null = null;
    const updatedBars: Array<number> = [...bars];

    if (updatedBars[barIndex] + step <= 0) {
      value = 0;
    } else {
      value = updatedBars[barIndex] + step;
    }
    updatedBars[barIndex] = value;
    setBars([...updatedBars]);
  };

  const loadingPage = (): JSX.Element => (
    <div className={styles.loading} data-testid="loading-spin">
      <span
        className={`spinner-border text-primary ${styles["loading-icon"]}`}
        role="status"
      />
      <span className={styles["loading-text"]}>Data loading...</span>
    </div>
  );

  return (
    <div>
      <h1>Progress Bars Demo</h1>
      {loading ? (
        loadingPage()
      ) : (
        <>
          {bars.map((val, index) => (
            <ProgressBar key={`bar${index}`} value={val} limit={threshold} />
          ))}
          <section className="row">
            <div className={`col-md-5 col-sm-12 ${styles["progress-options"]}`}>
              <BarSelection bars={bars} onChange={(val) => setBarIndex(val)} />
            </div>
            <div className="col-md-7 col-sm-12">
              {buttons.map((val, index) => (
                <StepButton
                  key={`button${index}`}
                  step={val}
                  onClick={changeProgress}
                />
              ))}
            </div>
          </section>
        </>
      )}
      {error ? <Error /> : null}
    </div>
  );
};

export default ProgressBarsChart;
