app.requires.push('angularFileUpload');

app.directive("fileUploadButton", ['$http', 'FileUploader', '$compile', function ($http, FileUploader, $compile) {
    return {
        restrict: 'A',
        scope: false,
        link: function (scope, elem, attrs) {
            //gather attributes
            var url = attrs.url;
            var name = attrs.fieldname;
            if (!attrs.extradata)
                attrs.extradata = "{}";
            var extraData = JSON.parse(attrs.extradata);
            var id = attrs.id;
            var imageSrc = attrs.imagesrc;
            var uploadtype = attrs.uploadtype;
            var multiple = attrs.multiple ? "multiple" : "";

            var htmlUpload = $("<input name='" + name + "' type='file' style='opacity:0;position:absolute;left:-5000' nv-file-select='' uploader='uploader' id='file_uploader_" + id + "'" + multiple + "  />");
            var htmlProgress = $("<span id='progress_" + id + "'></span>");

            var uploader = scope.uploader = new FileUploader({ url: url });
          
            //filters
            if (uploadtype === "image") {
                uploader.filters.push({
                    name: 'imageFilter',
                    fn: function (item /*{File|FileLikeObject}*/, options) {
                        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
                    }
                });
            }
            else if (uploadtype === "music") {
                uploader.filters.push({
                    name: 'musicFilter',
                    fn: function (item /*{File|FileLikeObject}*/, options) {
                        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                        return '|mp3|wav|amr|'.indexOf(type) !== -1;
                    }
                });
            }
            else if (uploadtype === "video") {
                uploader.filters.push({
                    name: 'videoFilter',
                    fn: function (item /*{File|FileLikeObject}*/, options) {
                        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                        return '|mp4|avi|3gp|'.indexOf(type) !== -1;
                    }
                });
            }

            // CALLBACKS
            uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
                alert("Can't add this file");
                if (typeof scope[attrs.onwhenaddingfilefailed] == "function") {
                    scope[attrs.onwhenaddingfilefailed](item, filter, options);
                }
            };
            uploader.onAfterAddingFile = function (fileItem) {
                fileItem.formData.push(extraData);
                if (typeof scope[attrs.onafteraddingfile] == "function") {
                    scope[attrs.onafteraddingfile](fileItem);
                }
            };
            uploader.onAfterAddingAll = function (addedFileItems) {
                if (typeof scope[attrs.onafteraddingall] == "function") {
                    scope[attrs.onafteraddingall](addedFileItems);
                }
            };
            uploader.onBeforeUploadItem = function (item) {
                if (typeof scope[attrs.onbeforeuploaditem] == "function") {
                    scope[attrs.onbeforeuploaditem](item);
                }
            };
            uploader.onProgressItem = function (fileItem, progress) {
                $(elem).hide();
                htmlProgress.html(progress + "% complete");
                if (typeof scope[attrs.onprogressitem] == "function") {
                    scope[attrs.onprogressitem](fileItem, progress);
                }
            };
            uploader.onProgressAll = function (progress) {
                if (typeof scope[attrs.onprogressall] == "function") {
                    scope[attrs.onprogressall](progress);
                }
            };
            uploader.onSuccessItem = function (fileItem, response, status, headers) {
               
                if (response.Success) {
                    if ($("#" + imageSrc))
                        $("#" + imageSrc).attr("src", response.Url);
                    htmlProgress.html("Upload Complete");
                }
                else {
                    alert("Failed to upload file");
                    htmlProgress.html("Upload Failed." + response.Message);
                }
               
                if (typeof scope[attrs.onsuccessitem] == "function") {
                    scope[attrs.onsuccessitem](fileItem, response, status, headers);
                }
            };
            uploader.onErrorItem = function (fileItem, response, status, headers) {

                htmlProgress.html("Upload Failed");
                if (typeof scope[attrs.onerroritem] == "function") {
                    scope[attrs.onerroritem](fileItem, response, status, headers);
                }
            };
            uploader.onCancelItem = function (fileItem, response, status, headers) {
                if (typeof scope[attrs.oncancelitem] == "function") {
                    scope[attrs.oncancelitem](fileItem, response, status, headers);
                }
            };
            uploader.onCompleteItem = function (fileItem, response, status, headers) {
                $(elem).show();
                if (typeof scope[attrs.oncompleteitem] == "function") {
                    scope[attrs.oncompleteitem](fileItem, response, status, headers);
                }
            };
            uploader.onCompleteAll = function () {
                if (typeof scope[attrs.oncompleteall] == "function") {
                    scope[attrs.oncompleteall]();
                }
            };


            $(elem).after(htmlUpload);
            $(elem).after(htmlProgress);
            $compile($("#file_uploader_" + id))(scope);

            $(elem).click(function () {
                htmlUpload.trigger("click");
            });

            htmlUpload.change(function () {
                uploader.uploadAll();
            });
        }
    }
}]);