const DEBUG = true; // Set to true to enable logging

function log(...args) {
  if (DEBUG) console.log(...args);
}

log("Loading utils.js");

export function validateInput(input, min, max) {
  log("Validating input: ", input, "with min:", min, "and max:", max);
  const validated = Math.max(min, Math.min(max, input));
  log("Validated input:", validated);
  return validated;
}

export function calculateDerivedStat(baseStat, modifier) {
  log("Calculating derived stat: ", baseStat, modifier);
  const derivedStat = baseStat + modifier;
  log("Calculated derived stat:", derivedStat);
  return derivedStat;
}

export function rollDice(formula) {
  log("Rolling dice with formula: ", formula);
  const roll = new Roll(formula).roll({async: false});
  log("Dice roll result:", roll);
  return roll;
}

log("Utils Script Loaded");
