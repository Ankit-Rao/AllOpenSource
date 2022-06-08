(function() {
    /* API call variables */
    var endpoint   = 'https://en.wikipedia.org/w/api.php?',
        baseParams = 'format=json&action=query&',
        callback   = '&callback=JSON_CALLBACK';

    var app = new angular.module('WikipediaSearch', []);

    app.controller("SearchController", function($scope, $http, $timeout) {
        $scope.results = [];
        var searchBox = $("#search");

        $scope.search = function() {
            /* Move the search box to the top when user executes a search */
            if (!(searchBox.hasClass("top"))) {
                searchBox.addClass("top");
            }

            /* Reset article list */
            $scope.results = [];

            /* Search parameters */
            var params = baseParams + 'generator=search&prop=extracts|info&inprop=url&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=',
                query = searchBox.children().val();

            /* If the user executes an empty search, do not make the API call, and reposition the search box back to the center */
            if (query === '') {
                searchBox.removeClass("top");
            } else {

                $http.jsonp(endpoint + params + query + callback).success(function(data) {
                    $timeout(function() {
                        var results = data.query.pages;
                        angular.forEach(results, function(k, v) {
                            $scope.results.push({
                                title: k.title,
                                text: k.extract,
                                url: k.fullurl
                            });
                        });
                    });
                });
            }
        };

        $scope.getRandom = function() {
            /* Move the search box to the top when user gets a random article */
            if (!(searchBox.hasClass("top"))) {
                searchBox.addClass("top");
            }

            /* Reset article list */
            $scope.results = [];
            
            /* Parameters to get a random article */
            var params = baseParams + 'generator=random&prop=extracts|info&exchars=500&exlimit=max&explaintext=&inprop=url&grnnamespace=0';

            $http.jsonp(endpoint + params + callback).success(function(data) {
                $timeout(function() {
                    var results = data.query.pages;
                    angular.forEach(results, function(k, v) {
                        $scope.results.push({
                            title: k.title,
                            text: k.extract,
                            url: k.fullurl
                        });
                    });
                });
            });
        };
    });
})();