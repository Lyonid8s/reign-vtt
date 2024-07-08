export class ReignItem extends Item {
  prepareData() {
    super.prepareData();
    console.log("ReignItem: prepareData called");
  }

  getRollData() {
    const rollData = { ...this.system };
    console.log("ReignItem: getRollData called", rollData);
    return rollData;
  }
}
