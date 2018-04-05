(function() {
    'use strict';
  
    angular
      .module('gfttestFrontend')
      .controller('HomeController', HomeController);
  
    /** @ngInject */
    function HomeController($timeout, ClientFactory, toastr) {
        var vm = this;
        vm.selectedAgeRange = null;
        vm.clients = [];
        vm.searchText = '';
        vm.searchCriteria = '';
        vm.placeHolder = "Please select a searching criteria";
        vm.SelectAgeRange = SelectAgeRange;
        vm.SearchOnKeyDown = SearchOnKeyDown;
        vm.Search = Search;
        vm.isLoading = false;

        vm.ageRanges = [
            { id: 1, ageRange: 'All' },
            { id: 2, ageRange: 'Less than 20' },
            { id: 3, ageRange: 'From 21 to 40' },
            { id: 4, ageRange: 'More than 40' }
        ];
        
        function SearchOnKeyDown($event) {
            if(event.which === 13 && vm.searchText !== '' && vm.selectedAgeRange !== null)
            {
                Search();
            }
        }

        function SelectAgeRange(ageRange) {
            vm.selectedAgeRange = ageRange;
        }

        function Search() {
            SearchClient(vm.searchText, vm.selectedAgeRange.id);
        }

        function SearchClient(name, ageRange) {
            if (name.length < 3)
            {
                vm.validationError = true;
                vm.validationErrorMessage = 'Name must be greater than 3 characters.'
            }
            else
            {
                vm.validationError = false;
                vm.isLoading = true;
                ClientFactory.SearchClients(name, ageRange).then(
                    function (response) {
                        vm.clients = response.data;
                        
                        if (vm.clients.length == 0) {
                            vm.noClientsFound = true;
                        }
                        
                        vm.isLoading = false;
                    },
                    function (response) {
                        console.log(response);
                    }
                );
            }
        }
    }
  })();
  