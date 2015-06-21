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
            var maxsize = attrs.maxsize;

            var htmlUpload = $("<input name='" + name + "' type='file' style='opacity:0;position:absolute;left:-5000px' nv-file-select='' uploader='uploader' id='file_uploader_" + id + "'  />");
            var htmlProgress = $("<span id='progress_" + id + "'></span>");

            var uploader = scope.uploader = new FileUploader({ url: url });

            //filters
            if (uploadtype == "image") {
                uploader.filters.push({
                    name: 'imageFilter',
                    fn: function (item /*{File|FileLikeObject}*/, options) {
                        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
                    }
                });
            }
            else if (uploadtype == "music") {
                uploader.filters.push({
                    name: 'musicFilter',
                    fn: function (item /*{File|FileLikeObject}*/, options) {
                        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                        return '|mp3|wav|amr|'.indexOf(type) !== -1;
                    }
                });
            }
            else if (uploadtype == "video") {
                uploader.filters.push({
                    name: 'videoFilter',
                    fn: function (item /*{File|FileLikeObject}*/, options) {
                        var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                        return '|mp4|avi|3gp|'.indexOf(type) !== -1;
                    }
                });
            }
            if (maxsize) {
                 //filesize filter
            uploader.filters.push({
                name: 'sizeFilter',
                fn: function (item /*{File|FileLikeObject}*/, options) {
                    return item.size <= maxsize;
                }
            });
            }
           

            // CALLBACKS
            uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
                alert("Can't add this file. Please check file type or file size.");
                if (typeof window[attrs.onWhenAddingFileFailed] == "function") {
                    window[attrs.onWhenAddingFileFailed](item, filter, options);
                }
            };
            uploader.onAfterAddingFile = function (fileItem) {
                console.log(fileItem);
                fileItem.formData.push(extraData);
                if (typeof window[attrs.onAfterAddingFile] == "function") {
                    window[attrs.onAfterAddingFile](fileItem);
                }
            };
            uploader.onAfterAddingAll = function (addedFileItems) {
                if (typeof window[attrs.onAfterAddingAll] == "function") {
                    window[attrs.onAfterAddingAll](addedFileItems);
                }
            };
            uploader.onBeforeUploadItem = function (item) {
                if (typeof window[attrs.onBeforeUploadItem] == "function") {
                    window[attrs.onBeforeUploadItem](item);
                }
            };
            uploader.onProgressItem = function (fileItem, progress) {
                $(elem).hide();
                htmlProgress.html(progress + "% complete");
                if (typeof window[attrs.onProgressItem] == "function") {
                    window[attrs.onProgressItem](fileItem, progress);
                }
            };
            uploader.onProgressAll = function (progress) {
                if (typeof window[attrs.onProgressAll] == "function") {
                    window[attrs.onProgressAll](progress);
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
                if (typeof window[attrs.onSuccessItem] == "function") {
                    window[attrs.onSuccessItem](fileItem, response, status, headers);
                }
            };
            uploader.onErrorItem = function (fileItem, response, status, headers) {

                htmlProgress.html("Upload Failed");
                if (typeof window[attrs.onErrorItem] == "function") {
                    window[attrs.onErrorItem](fileItem, response, status, headers);
                }
            };
            uploader.onCancelItem = function (fileItem, response, status, headers) {
                if (typeof window[attrs.onCancelItem] == "function") {
                    window[attrs.onCancelItem](fileItem, response, status, headers);
                }
            };
            uploader.onCompleteItem = function (fileItem, response, status, headers) {
                $(elem).show();
                if (typeof window[attrs.onCompleteItem] == "function") {
                    window[attrs.onCompleteItem](fileItem, response, status, headers);
                }
            };
            uploader.onCompleteAll = function () {
                if (typeof window[attrs.onCompleteAll] == "function") {
                    window[attrs.onCompleteAll]();
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