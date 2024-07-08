// config.mjs
export const REIGN = {};

REIGN.actorTypes = {
  character: 'character',
  company: 'company'
};

REIGN.abilities = {
  body: 'REIGN.Ability.Body',
  charm: 'REIGN.Ability.Charm',
  command: 'REIGN.Ability.Command',
  coordination: 'REIGN.Ability.Coordination',
  knowledge: 'REIGN.Ability.Knowledge',
  sense: 'REIGN.Ability.Sense'
};

REIGN.skills = {
  athletics: 'Athletics',
  endurance: 'Endurance',
  fight: 'Fight',
  parry: 'Parry',
  run: 'Run',
  vigor: 'Vigor',
  fascinate: 'Fascinate',
  graces: 'Graces'
};

CONFIG.reign = REIGN;

console.log("REIGN Configuration Loaded", CONFIG.reign);
