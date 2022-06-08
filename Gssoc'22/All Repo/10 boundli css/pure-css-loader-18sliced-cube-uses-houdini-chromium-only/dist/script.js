/* all JS is registering custom properties, which we should be able to do from the CSS in the future and then this will be a CSS-only demo  */
CSS.registerProperty({
  name: '--f',
  syntax: '<integer>',
  initialValue: 0,
  inherits: true });


CSS.registerProperty({
  name: '--sr',
  syntax: '<number>',
  initialValue: 0,
  inherits: true });