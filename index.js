
/**
 * Module dependencies.
 */
var sm = require('bcx-sscalar-modifier.js');
// var nm = require('./number_modifier.js');
// var om = require('./object_modifier.js');

exports.doText = doText;
// exports.getTemplate = getTemplate;
// exports.doTemplate = doTemplate;
// exports.loopTemplate = loopTemplate;

function doText(templateText, data, options) {
    options = options || {};
    var startDelimiter = ('startDelimiter' in options) ? options["startDelimiter"] : '{{';
    var endDelimiter = ('endDelimiter' in options) ? options["endDelimiter"] : '}}';
    var templateParts = templateText.split(startDelimiter);
    var replacementParts = [];
    replacementParts.push(templateParts.shift());
    templateParts.forEach(function(templatePart) {
        var tagParts = templatePart.split(endDelimiter, 2);
        replacementParts.push(doTag(tagParts[0], data, options));
        if (tagParts.length == 2) {
            replacementParts.push(tagParts[1]);
        }
    });

    return replacementParts.join('');
}
function doTag(tag, data, options) {
    var tagParts = tag.split('|');
    var tagName = tagParts.shift();
    var tagValue = findValue(data, tagName);
    //return (tagParts.length > 0) ? doModifierChain(tagValue, tagParts) : tagValue;
    return doModifierChain(tagValue, tagParts, data, options);
}

function findValue(data, key) {
    var hierarchy = key.split('.');
    if (hierarchy.length == 0) {
        return '';
    }
    hierarchy.forEach(function(pathElement) {
        if (pathElement in data) {   //@TODO data.hasOwnProperty?
            data = data[pathElement];
        } else {
            console.log('Expected key ' + key + ' is not in the data');
            return '';
      }
    });
    return data;
}

function doModifierChain(value, modifiers, data, options) {
    modifiers.forEach(function(modifierDefinition) {
        var modifier = parseModifier(modifierDefinition);
        if ("name" in modifier) {
            value = applyModifier(value, modifier.name, modifier.params, data, options);
        }
    });
    return (typeof value == 'object') ? '' : value;
}

function applyModifier(value, name, params, data, options) {
    switch (typeof value) {
        case 'string':
            return sm.apply(value, name, params, data, options);
            break;
        // case 'object':
        //     return om.apply(value, name, params, data, options);
        //     break;
        // case 'number':
        //     return nm.apply(value, name, params, data, options);
        //     break;
    }

    return value;
}

function parseModifier(modifier) {
    var qm = modifier.indexOf('?');
    var output = {};
    if (qm !== -1) {
        output.name = modifier.substr(0, qm);
        output.query = modifier.substr(qm + 1);
        output.params = querystring.parse(output.query);
    } else {
        output.name = modifier;
        output.query = '';
        output.params = {};
    }
    return output;
}