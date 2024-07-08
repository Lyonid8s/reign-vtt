// character-sheet.js
import { registerHelpers } from "./handlebars-helpers.js";

// Extend the basic ActorSheet with some modifications
export class ReignCharacterSheet extends ActorSheet {
  /** @override */
  static get defaultOptions() {
    const options = super.defaultOptions;
    options.classes = ["reign", "sheet", "actor"];
    options.template = "systems/reign-vtt/templates/character-sheet.html"; // Ensure correct path
    options.width = 800;
    options.height = 700;
    options.tabs = [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }];
    return options;
  }

  /** @override */
  getData() {
    const context = super.getData();
    context.system = this.actor.system;
    context.config = CONFIG.reign;
    console.log("ReignCharacterSheet: getData called", context);
    return context;
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);
    const element = $(html);
    console.log("ReignCharacterSheet: activateListeners called", html);

    element.find('.number-attribute').change(ev => {
      const target = ev.currentTarget;
      const value = parseInt(target.value);
      this.actor.update({ [target.name]: value }).then(() => {
        console.log("Actor updated:", this.actor);
        console.log("Updated attribute value:", this.actor.system.attributes[target.name.split('.')[2]].value);
      }).catch(err => {
        console.error("Error updating actor:", err);
      });
    });

    element.find('.number-skill').change(ev => {
      const target = ev.currentTarget;
      const skillName = target.name.split('.')[2];
      const value = parseInt(target.value);
      const path = `system.skills.${skillName}.value`;
      this.actor.update({ [path]: value }).then(() => {
        console.log("Actor updated:", this.actor);
        console.log("Updated skill value:", this.actor.system.skills[skillName]?.value);
      }).catch(err => {
        console.error("Error updating actor:", err);
      });
    });

    element.find('.checkboxes input[type="checkbox"]').change(ev => {
      const target = ev.currentTarget;
      const skillName = target.name.split('.')[2];
      const field = target.name.split('.')[3];
      const value = target.checked;
      const path = `system.skills.${skillName}.${field}`;
      this.actor.update({ [path]: value }).then(() => {
        console.log("Actor updated:", this.actor);
        console.log("Updated checkbox value:", this.actor.system.skills[skillName]?.[field]);
      }).catch(err => {
        console.error("Error updating actor:", err);
      });
    });

    element.find('.skill-row-template input[type="text"]').change(ev => {
      const target = ev.currentTarget;
      const skillName = target.value.trim();
      if (skillName) {
        const skillValue = element.find('.skill-row-template .number-skill').val();
        const skillE = element.find('.skill-row-template [name="newSkillE"]').is(':checked');
        const skillM = element.find('.skill-row-template [name="newSkillM"]').is(':checked');
        
        const updateData = {};
        updateData[`system.skills.${skillName}.value`] = skillValue;
        updateData[`system.skills.${skillName}.e`] = skillE;
        updateData[`system.skills.${skillName}.m`] = skillM;

        this.actor.update(updateData).then(() => {
          console.log("Actor updated with new skill:", this.actor);
        }).catch(err => {
          console.error("Error updating actor with new skill:", err);
        });

        const newRow = `
          <tr class="skill-row">
            <td>${skillName}</td>
            <td class="number-input">
              <input type="number" name="system.skills.${skillName}.value" value="${skillValue}" min="0" max="6" class="number-skill">
            </td>
            <td class="checkboxes">
              <input type="checkbox" name="system.skills.${skillName}.e" ${skillE ? 'checked' : ''}>
            </td>
            <td class="checkboxes">
              <input type="checkbox" name="system.skills.${skillName}.m" ${skillM ? 'checked' : ''}>
            </td>
          </tr>`;
        $(newRow).insertBefore(element.find('.skill-row-template'));
        
        element.find('.skill-row-template input').val('');
        element.find('.skill-row-template input[type="checkbox"]').prop('checked', false);
      }
    });
  }
}

Hooks.once('init', async function () {
  try {
    const templatePaths = [
      'systems/reign-vtt/templates/partials/personal-details.html',
      'systems/reign-vtt/templates/partials/body.html',
      'systems/reign-vtt/templates/partials/charm.html',
      'systems/reign-vtt/templates/partials/command.html',
      'systems/reign-vtt/templates/partials/knowledge.html',
      'systems/reign-vtt/templates/partials/coordination.html',
      'systems/reign-vtt/templates/partials/senses.html',
      'systems/reign-vtt/templates/partials/other-info.html'
    ];
    await loadTemplates(templatePaths);

    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("reign", ReignCharacterSheet, { makeDefault: true });

    registerHelpers();

    console.log("ReignCharacterSheet: Templates loaded and sheet registered");
  } catch (err) {
    console.error("Error initializing ReignCharacterSheet:", err);
  }
});
