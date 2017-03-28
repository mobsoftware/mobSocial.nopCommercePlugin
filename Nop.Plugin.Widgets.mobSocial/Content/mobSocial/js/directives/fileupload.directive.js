app.requires.push('angularFileUpload');
app.requires.push('angular-img-cropper');


app.directive("fileUploadButton", ['$http', 'FileUploader', '$compile', "$timeout", '$rootScope', function ($http, FileUploader, $compile, $timeout, $rootScope) {
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
            var crop = attrs.crop;
            var width = attrs.width;
            var height = attrs.height;
            scope.imageData = {
                base64: null,
                base64cropped:null
            };
            scope.croppedBounds = {};

            var htmlUpload = $("<input name='" + name + "' type='file' style='opacity:0;position:absolute;left:-5000px' nv-file-select='' uploader='uploader' id='file_uploader_" + id + "'" + multiple + " img-cropper-fileread image='imageData.base64' />");
            var htmlProgress = $("<span id='progress_" + id + "'></span>");
            var htmlCropTool = $("<div class='fixed-popup' style='display:none' id='cropTool_" + id + "'><div class='overlay'></div><div class='content'><div class='fieldset'><h3>Crop your image</h3><canvas width='800' height='400' id='canvas_cropper' image-cropper image='imageData.base64' cropped-image='imageData.base64cropped' crop-width='" + width + "' crop-height='" + height + "' keep-aspect='true' touch-radius='30' crop-area-bounds='croppedBounds'></canvas><div><button ng-click='cropDone()'>Crop</button><button ng-click='cancelCrop()'>Cancel</button></div></div></div></div");
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
                var msg = "";
                if (uploadtype === "image") {
                    msg = "You can only upload image files. Allowed extensions are .jpg, .png, .jpeg, .bmp and .gif";
                }
                else if (uploadtype === "video") {
                    msg = "You can only upload video files. Allowed extensions are .mp4, .avi, and .3gp";
                }
                else if (uploadtype === "music") {
                    msg = "You can only upload music files. Allowed extensions are .mp3, .wav, and .amr";
                }
                alert(msg);
                if (typeof scope[attrs.onwhenaddingfilefailed] == "function") {
                    scope[attrs.onwhenaddingfilefailed](item, filter, options);
                }
            };
            uploader.onAfterAddingFile = function (fileItem) {
                fileItem.formData.push(extraData);
                
                //if it's an image file and crop is enabled, let's find out the width and height of original image
                if (crop) {
                    //let's modify reference points relative to actual size of image
                    var img = new Image();
                    img.onload = function () {
                        var actualWidth = img.width;
                        var actualHeight = img.height;
                        scope.imageData.actualWidth = actualWidth;
                        scope.imageData.actualHeight = actualHeight;
                    };
                    img.src = scope.imageData.base64;
                }

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
                //add the crop data if available
                if (crop) {
                    scope.croppedBounds.crop = true;
                    //let's modify reference points relative to actual size of image
                    //we are getting the top value from the lower edge of image. therefore we'll to recalculate it from top
                    scope.croppedBounds.width = scope.croppedBounds.left + scope.croppedBounds.right;
                    scope.croppedBounds.height = scope.croppedBounds.top - scope.croppedBounds.bottom;
                    scope.croppedBounds.top = scope.imageData.actualHeight - scope.croppedBounds.top;
                    item.formData.push(scope.croppedBounds);
                }
                if (typeof scope[attrs.onbeforeuploaditem] == "function") {
                    scope[attrs.onbeforeuploaditem](item);
                }

                console.log("uploading about to start");
            };
            uploader.onProgressItem = function (fileItem, progress) {
                $(elem).hide();
                htmlProgress.html(progress + "% complete");
                htmlProgress.removeClass("upload-complete");
                htmlProgress.addClass("upload-progress");
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
                    htmlProgress.removeClass("upload-progress");
                    htmlProgress.addClass("upload-complete");
                    $timeout(function() {
                            htmlProgress.fadeOut();
                        },
                        5000);
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

            scope.cropDone = function() {
                uploader.uploadAll();
                $("#cropTool_" + id).hide();
                $rootScope.bodyScroll(true);
            }

            scope.cancelCrop = function () {
                $("#cropTool_" + id).hide();
                $rootScope.bodyScroll(true);
            }


            $(elem).after(htmlUpload);
            $(elem).after(htmlProgress);
            if (crop) {
                $(".content-wrapper").append(htmlCropTool);
            }
            $compile($("#file_uploader_" + id))(scope);
            $compile($("#cropTool_" + id))(scope);
            $(elem).click(function () {
                htmlUpload.trigger("click");
            });

            htmlUpload.change(function () {
                if (crop) {
                    $("#cropTool_" + id).show();
                    $rootScope.bodyScroll(false);
                } else {
                    uploader.uploadAll();
                }
            });
        }
    }
}]);