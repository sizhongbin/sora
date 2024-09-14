setup.saveData = window.localStorage;

setup.save = slot => {
  const data = {
    level: State.getVar('$pcLevel'),
    name: State.getVar('$pcName'),
    string: Save.serialize()
  };
  setup.saveData.setItem(`slot${slot}`, JSON.stringify(data));
};

setup.load = (slot, readOnly = 0) => {
  const data = JSON.parse(setup.saveData.getItem(`slot${slot}`));
  if (readOnly) return data;
  else Save.deserialize(data.string);
};
