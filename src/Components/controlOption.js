import React from "react";
import { Checkbox } from "semantic-ui-react";

const controlOption = (props, controlSettings, toggleLayer, i) => {
  return (
    <div
      className={
        "controller-option " +
        (controlSettings.indent ? "option-indented-checkbox " : "") +
        (shouldDisable(props, controlSettings.dep) ? "disabled" : "")
      }
      key={i}
    >
      <Checkbox
        label={controlSettings.label}
        ref={controlSettings.ref}
        type="checkbox"
        checked={props[controlSettings.key]}
        defaultChecked={props[controlSettings.key]}
        onChange={(e, { checked }) =>
          toggleLayer({
            ...controlSettings,
            checked
          })
        }
      />
    </div>
  );
};

function shouldDisable(props, dependentBox) {
  return dependentBox && !props[dependentBox];
}

export default controlOption;
