import controls from "../services/controls.service";

export const controlToggle = (state, key, checked) => {
  let result = [key];
  const pressedControl = controls.find(control => control.key === key);

  if (pressedControl.isMaster) {
    // Master checkbox have been pressed. Update all sub checkboxes.
    controls
      .filter(obj => obj.masterKey === key)
      .forEach(box => result.push(box.key));
  } else {
    // Check if it is a sub box.
    const masterKey = pressedControl.masterKey;
    if (masterKey) {
      if (checked) {
        // A sub checkbox enabled. Enable master.
        result.push(masterKey);
      } else {
        const subBoxes = controls.filter(obj => obj.masterKey === masterKey);
        const subStates = subBoxes.map(sub => state[sub.key]);
        const offNumber = subStates.reduce(
          (acc, isOn) => (isOn ? acc : acc + 1),
          1
        );

        if (offNumber === subBoxes.length) {
          // All sub checkboxes off. Disable master.
          result.push(masterKey);
        }
      }
    }
  }

  return result;
};

export default controlToggle;
