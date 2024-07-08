// handlebars-helpers.js
export function registerHelpers() {
  console.log("Registering Handlebars helpers");

  // Register a handlebars helper to generate a range
  Handlebars.registerHelper('range', function(n) {
    console.log("Helper 'range' called with argument:", n);
    return Array.from({ length: n }, (v, k) => k + 1);
  });

  // Register a helper to check if two values are equal
  Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
    console.log("Helper 'ifEquals' called with arguments:", arg1, arg2);
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
  });

  // Register a helper to increment a value by 1
  Handlebars.registerHelper('inc', function(value) {
    console.log("Helper 'inc' called with argument:", value);
    return parseInt(value) + 1;
  });

  // Register a helper to check a checkbox
  Handlebars.registerHelper('checked', function(value, test) {
    console.log("Helper 'checked' called with arguments:", value, test);
    return value == test ? 'checked' : '';
  });

  console.log("Handlebars helpers registered successfully");
}
