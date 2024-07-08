// reign.mjs
import { registerHelpers } from "./handlebars-helpers.js";
import { ReignCharacterSheet } from "./character-sheet.js";
import { ReignCompanySheet } from "./company-sheet.js";
import { ReignActor } from "./actor.mjs";
import { ReignItem } from "./item.mjs";
import { ReignItemSheet } from "./item-sheet.mjs";

// Preload Handlebars templates
async function preloadHandlebarsTemplates() {
  const templatePaths = [
    // Actor partials
    'systems/reign-vtt/templates/partials/personal-details.html',
    'systems/reign-vtt/templates/partials/body.html',
    'systems/reign-vtt/templates/partials/charm.html',
    'systems/reign-vtt/templates/partials/command.html',
    'systems/reign-vtt/templates/partials/knowledge.html',
    'systems/reign-vtt/templates/partials/coordination.html',
    'systems/reign-vtt/templates/partials/senses.html',
    'systems/reign-vtt/templates/partials/other-info.html',

    // Actor sheets
    'systems/reign-vtt/templates/character-sheet.html',
    'systems/reign-vtt/templates/company-sheet.html'
  ];

  return loadTemplates(templatePaths);
}

Hooks.once('init', async function () {
  try {
    await preloadHandlebarsTemplates();

    registerHelpers();

    // Register custom sheet classes
    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("reign", ReignCharacterSheet, { types: ['character'], makeDefault: true });
    Actors.registerSheet("reign", ReignCompanySheet, { types: ['company'], makeDefault: true });

    // Register custom document classes
    CONFIG.Actor.documentClass = ReignActor;
    CONFIG.Item.documentClass = ReignItem;

    console.log("Reign system initialized successfully");
  } catch (e) {
    console.error("Error initializing Reign system: ", e);
  }
});

Hooks.once('setup', function () {
  console.log('Reign RPG | Setup phase complete');
});

Hooks.once('ready', function () {
  console.log('Reign RPG | Ready phase complete');
});

Hooks.on('renderReignCharacterSheet', (app, html, data) => {
  console.log('Rendering ReignCharacterSheet', { app, html, data });
});

Hooks.on('renderReignCompanySheet', (app, html, data) => {
  console.log('Rendering ReignCompanySheet', { app, html, data });
});
