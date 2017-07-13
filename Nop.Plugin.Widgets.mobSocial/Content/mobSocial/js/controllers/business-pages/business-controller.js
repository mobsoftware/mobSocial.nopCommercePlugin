app.controller("BusinessController",
    [
        "$scope", "businessService", function ($scope, businessService) {
            $scope.filter = {
                country: {},
                stateProvince: {}
            }
            $scope.getById = function(id) {
                businessService.getById(id,
                    function(response) {
                        if (response.Success) {
                            $scope.business = response.ResponseData.Business;
                        }
                    });
            }

            $scope.getAll = function () {
                var filter = {
                    countryId: $scope.filter.country.Id,
                    stateProvinceId: $scope.filter.stateProvince.Id,
                    city: $scope.filter.city,
                    search: $scope.filter.search,

                }
                $scope.businesses = [];
                businessService.getAll(filter,
                    function(response) {
                        if (response.Success) {
                            var businesses = [];
                            for (var i = 0; i < response.ResponseData.BusinessPages.length; i++) {
                                var b = response.ResponseData.BusinessPages[i];
                                b.SeName = b.SeName.replaceAll("-", "");
                                businesses.push(b);
                            }
                            $scope.businesses = businesses;
                        }
                    });
            }

            $scope.getCountries = function() {
                businessService.getCountries(function(response) {
                    if (response.Success) {
                        $scope.countries = response.ResponseData.Countries;
                    }
                });
            }

            $scope.getStates = function(countryId) {
                businessService.getStates(countryId, function(response) {
                    if (response.Success) {
                        $scope.states = response.ResponseData.States;
                    }
                });
            }

            $scope.initBusinessSearch = function (searchText) {
                $scope.filter.search = searchText;
                $scope.getCountries();
            }

            $scope.$watch('filter', function () {
                $scope.getAll();
            }, true);
        }
    ]);