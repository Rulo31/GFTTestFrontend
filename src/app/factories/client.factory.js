'use strict';

/*
	Interact with the web service by providing put/post/get/delete methods
*/
angular.module('gfttestFrontend')
	.factory('ClientFactory', function($http) {
		//var baseUrl = 'http://localhost:10784/api/Client/';
		var baseUrl = '/api/Client/';

		return {
			SearchClients: function(name, ageRange) {
				return $http.get(baseUrl + 'SearchClient' + '/' + name + '/' + ageRange);
			}
		}
	}
);