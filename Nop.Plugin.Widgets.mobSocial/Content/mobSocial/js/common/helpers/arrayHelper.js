app.factory('arrayHelper', function () {
   return {
       deleteObject: function (arr, objectKey, objectValue) {
           if (!arr)
               return arr;
           if (Object.prototype.toString.call(arr) == "[object Array]") {
               for (var i = 0; i < arr.length; i++) {
                    if (arr[i][objectKey] == objectValue) {
                        arr.splice(i, 1);
                    }
                }   
           }
           
           return arr;
       },
       ///copies specified fields from provided object to a new object
       stripObjectToFields : function(obj, fields) {
           var newObj = {};
           for (var i = 0; i < fields.length; i++) {
               if (obj[fields[i]])
                   newObj[fields[i]] = obj[fields[i]];
           }
           return newObj;
       },
       ///copies all fields except specified fields from provided object to a new object
       stripObjectExceptFields: function (obj, fields) {
           var newObj = {};
           for (var i = 0; i < fields.length; i++) {
               if (obj[fields[i]])
                   continue;
               newObj[fields[i]] = obj[fields[i]];
           }
           return newObj;
       },
       ///converts an integer array to string array and returns
       intArrayToStringArray: function (intArray) {
           if (intArray)
            return intArray.map(function(x) { return x.toString(); });
       },
       distinct: function(arr) {
           return arr.filter((v, i, a) => a.indexOf(v) == i);
       }
    };
});