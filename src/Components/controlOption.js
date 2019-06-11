import React from "react";
import { Checkbox } from "semantic-ui-react";

const controlOption = (props, controlSettings, toggleLayer, i) => {
  return (
    <div className={
      "controller-option " +
      ( controlSettings.dep ? 'option-secondary-checkbox ' : '' ) +
      ( controlSettings.dep && !props[ controlSettings.dep ] ? 'disabled' : '' )
    } key={ i }>
      <Checkbox
        label={ controlSettings.label }
        ref={ controlSettings.ref }
        type="checkbox"
        defaultChecked={ props[ controlSettings.key ] }
        onChange={ (e, { checked }) => toggleLayer({
          ...controlSettings,
          checked
        }) }
      />
    </div>
  )
}

export default controlOption;