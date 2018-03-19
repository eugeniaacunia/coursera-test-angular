(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller ('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive ('foundItems', FoundItemsDirective)

// display the list menu on the screen
function FoundItemsDirective (){
  var ddo = {
    templateUrl:'foundItems.html',
    restrict: 'E',
    scope : {
      found: '<',
      onRemove: '&'//,
//      errorMessage: '<'
    }
  };
  return ddo;
}

// Declare and create a NarrowItDownController (with controller as syntax) that
// will wrap your search textbox and button as well as the list of found items.
NarrowItDownController.$inject= ["MenuSearchService"];
function NarrowItDownController (MenuSearchService){
  var menu = this;
  menu.found = [];
  menu.searchTerm='';
  menu.errorMessage = '';

  menu.processSearchTerm = function (){

    // if the searchTerm is empty, report a error message
    if (menu.searchTerm === ' '){
      menu.errorMessage = 'Nothing Found';
    }
    else {
      var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);
      promise.then(function (response){
        menu.found = response;
        })
        .catch (function(error){
          console.log(("que hay que enviar como error ????"));
        });
      };
  }; //end menu.processSearchTerm

  menu.remove = function(itemIndex){
    MenuSearchService.removeItem (itemIndex);
  };
}

//
MenuSearchService.$inject = ['$http'];
function MenuSearchService($http, searchTerm) {
  var service = this;
  var foundItems = [];

  // That method will be responsible for reaching out to the server (using
  // the $http service) to retrieve the list of all the menu items. Once it
  //  gets all the menu items, it should loop through them to pick out the ones
  // whose description matches the searchTerm.
  service.getMatchedMenuItems= function(searchTerm){
    return $http({
        method: "GET",
        url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
    })
    .then (function (response){
        // process result and only keep items that match
        var items = [];
        items = response.data.menu_items;
        for (var i=0; i < items.length; i++){
            var description = items[i].description;
            if (description.toLowerCase().indexOf(searchTerm) !== -1){
              foundItems.push(items[i]);
            }
        }

        // return processed items
        return foundItems;
      })
      .catch (function(error){
        console.log(error);
      });
  }; // end getMatchedMenuItems

  service.removeItem = function(itemIndex){
    foundItems.splice(itemIndex,1);
  };

}
})();
