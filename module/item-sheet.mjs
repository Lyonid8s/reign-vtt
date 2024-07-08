export class ReignItemSheet extends ItemSheet {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ['reign', 'sheet', 'item'],
      width: 520,
      height: 480,
      tabs: [
        {
          navSelector: '.sheet-tabs',
          contentSelector: '.sheet-body',
          initial: 'description',
        },
      ],
    });
  }

  /** @override */
  get template() {
    return `systems/reign-vtt/templates/item/item-${this.item.type}-sheet.hbs`;
  }

  /** @override */
  async getData() {
    const context = super.getData();
    context.system = this.document.system;
    console.log("ReignItemSheet: getData called", context);
    return context;
  }

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);
    console.log("ReignItemSheet: activateListeners called");
  }
}
