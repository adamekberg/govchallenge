import controls from "../services/controls.service";

export const controlToggle = (state, key, checked) => {
  let result = [key];
  const pressedControl = controls.find(control => control.key === key);
  const masterKey = pressedControl.masterKey;

  if (masterKey && checked) {
    // A sub checkbox enabled. Enable master.
    result.push(masterKey);
  }

  if (masterKey && !checked) {
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

  if (pressedControl.isMaster) {
    // Master checkbox have been pressed. Update all sub checkboxes.
    controls.forEach(control => {
      if (control.masterKey === key) {
        result.push(control.key);
      }
    });
  }
  return result;
};

export default controlToggle;
