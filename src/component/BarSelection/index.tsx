import React from "react";
import PropTypes from "prop-types";

interface BarSelectionProps {
  bars: Array<number>;
  onChange: (arg: string) => void;
}

const BarSelection = (props: BarSelectionProps): React.ReactElement => {
  const { bars, onChange } = props;

  return (
    <select
      className="custom-select custom-select-lg"
      onBlur={(e) => onChange(e.target.value)}
      data-testid="bar-selection"
    >
      {bars.map((_bar, index) => (
        <option key={`progess${index}`} value={index}>
          #Progress {index + 1}
        </option>
      ))}
    </select>
  );
};

BarSelection.propTypes = {
  bars: PropTypes.arrayOf(PropTypes.number).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default BarSelection;
