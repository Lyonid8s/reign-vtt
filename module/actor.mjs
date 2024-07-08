// actor.mjs
export class ReignActor extends Actor {
  prepareData() {
    super.prepareData();
    console.log("ReignActor: prepareData called", this);
    console.log("Actor type at prepareData:", this.type);
  }

  prepareBaseData() {
    super.prepareBaseData();
    console.log("ReignActor: prepareBaseData called", this);
    console.log("Actor type at prepareBaseData:", this.type);
  }

  prepareDerivedData() {
    super.prepareDerivedData();
    console.log("ReignActor: prepareDerivedData called", this);

    const data = this.system;

    // Ensure the actor has a type
    if (!this.type) {
      console.error("Actor type is undefined in prepareDerivedData!", this);
      this.type = CONFIG.reign.actorTypes.character; // Default to character if undefined
    }
    console.log("Actor type at prepareDerivedData:", this.type);

    // Initialize character attributes if not present
    data.playerName = data.playerName || "";
    data.characterName = data.characterName || "";
    data.company = data.company || "";
    data.mission = data.mission || "";
    data.duty = data.duty || "";
    data.craving = data.craving || "";

    // Initialize attributes if not present
    data.attributes = data.attributes || {
      body: { value: 0, min: 1, max: 6 },
      charm: { value: 0, min: 1, max: 6 },
      command: { value: 0, min: 1, max: 6 },
      coordination: { value: 0, min: 1, max: 6 },
      knowledge: { value: 0, min: 1, max: 6 },
      sense: { value: 0, min: 1, max: 6 }
    };

    // Initialize skills if not present
    data.skills = data.skills || {};
    const defaultSkills = {
      athletics: { value: 0, e: false, m: false },
      endurance: { value: 0, e: false, m: false },
      fight: { value: 0, e: false, m: false },
      parry: { value: 0, e: false, m: false },
      run: { value: 0, e: false, m: false },
      vigor: { value: 0, e: false, m: false }
    };

    for (let skill in defaultSkills) {
      if (!data.skills[skill]) {
        data.skills[skill] = defaultSkills[skill];
      }
    }

    // Initialize company attributes if not present (for company type actors)
    if (this.type === 'company') {
      data.companyAttributes = data.companyAttributes || {
        might: { value: 0, min: 0, max: 6 },
        territory: { value: 0, min: 0, max: 6 },
        treasure: { value: 0, min: 0, max: 6 },
        influence: { value: 0, min: 0, max: 6 },
        sovereignty: { value: 0, min: 0, max: 6 }
      };

      // Initialize company skills if not present
      data.companySkills = data.companySkills || [];
    }
  }
}
