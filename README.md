# bcx-temple

This module takes advantage of smaller Node modules dedicated to scalar/numeric/object value transformations and provides tag-based text processing.

All occurrences of special tags are found in the the text, provided for doText() method and optionally modified with modifiers.

Modifiers can be chained and parametrized, but of course, the functionality is limited by the number of supported modifiers.

This module is dependent on bcx-scalar-modifier, bcx-object-modifier, bcx-numeric-modifier, but it is easily modified to use other modules if needed.

While this module is already functionally usable for processing of given text, you will need to extend it with functions to read templates from the disk/cache/etc.
Or you can use bcx-templar module which does exactly that.

## Installation

```
npm install bcx-temple
```

## Example

This module comes with example.js. Run it with node to see how it works:

```
node example.js
```
