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
        checked={setChecked(props, controlSettings)}
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

function setChecked(props, controlSettings) {
  return controlSettings.ptMaster
    ? props.showPublicTransit
    : props[controlSettings.key];
}

export default controlOption;
