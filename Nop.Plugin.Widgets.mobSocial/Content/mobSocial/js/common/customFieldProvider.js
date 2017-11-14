app.factory('customFieldProvider', ["arrayHelper", function (arrayHelper) {
    return {
        fieldTypes: [
                 {
                     Id: 1,
                     Text: "Text"
                 },
                 {
                     Id: 2,
                     Text: "Text Area"
                 },
                 {
                     Id: 3,
                     Text: "Wyswyg"
                 },
                 {
                     Id: 4,
                     Text: "Number"
                 },
                 {
                     Id: 5,
                     Text: "Email"
                 },
                 {
                     Id: 6,
                     Text: "Password"
                 },
                 {
                     Id: 7,
                     Text: "CheckBox"
                 },
                 {
                     Id: 8,
                     Text: "CheckBox List"
                 },
                 {
                     Id: 9,
                     Text: "DateTime"
                 },
                 {
                     Id: 10,
                     Text: "Radio Buttons"
                 },
                 {
                     Id: 11,
                     Text: "Color Selector"
                 },
                 {
                     Id: 12,
                     Text: "Captcha"
                 },
                 {
                     Id: 13,
                     Text: "Dropdown"
                 },
                 {
                     Id: 14,
                     Text: "Linked Dropdowns"
                 },
                 {
                     Id: 15,
                     Text: "Image Upload"
                 },
                 {
                     Id: 16,
                     Text: "File Upload"
                 }
        ],

        getFieldTypeName: function(id) {
            for (var i = 0; i < this.fieldTypes.length; i++) {
                if (this.fieldTypes[i].Id == id)
                    return this.fieldTypes[i].Text;
            }
            return "";
        },
        parseAvailableValues: function (fieldId, availableValues) {
            fieldId = parseInt(fieldId);
            if ([8, 10, 13, 14].indexOf(fieldId) == -1)
                return availableValues;
            availableValues = availableValues || "";
            var lines = availableValues.split("\n");
            if (fieldId != 14) {
                //multiline separation for simple lists
                return arrayHelper.distinct(lines);
            } else {
                //a multi-level dropdown
                var levelingCharacter = "-";
                var targetObject = this._parseChildTree(lines, levelingCharacter);
                return targetObject;
            }
        },
        _parseChildTree: function(valueLines, levelingCharacter) {
            var parents = [];
            var values = [];
            var lineIndex = 0;
            var level = 1;
            var targetObject = {};
            var activeParent = targetObject;
            while (true) {
               
                var levelString = Array(level).join(levelingCharacter);
                var line = valueLines[lineIndex];
                var indexOf = line.indexOf(levelString);
                if (indexOf == 0) {
                    var value = line.substr(levelString.length);
                    activeParent[value] = {};//empty child for now
                     //matched
                    parents.push(activeParent);
                    values.push(value);
                    activeParent = activeParent[value];
                    lineIndex++;
                    level++;
                }
                else if (indexOf == -1) {
                    activeParent = parents.pop();
                    level--;
                    var poppedValue = values.pop();
                    if (Object.keys(activeParent[poppedValue]).length == 0)
                        activeParent[poppedValue] = poppedValue;
                }


                if (lineIndex == valueLines.length) {
                    activeParent = parents.pop();
                    var poppedValue = values.pop();
                    activeParent[poppedValue] = poppedValue;
                    break;
                }
            }
            return targetObject;
        }

    };
}]);