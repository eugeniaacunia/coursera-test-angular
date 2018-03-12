(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

// list of items to buy
ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var buyList = this;

  buyList.items = ShoppingListCheckOffService.getBuyItems();

  buyList.checkList = function(itemIdex){
    ShoppingListCheckOffService.checkItemsList(itemIdex);
  };

  buyList.message = function(){
    return (buyList.items == "");
  };

}

// list of bought items
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var boughtList = this;
  boughtList.items = ShoppingListCheckOffService.getBoughtItems();

  boughtList.checkList = function(itemIdex){
    ShoppingListCheckOffService.checkItemsList(itemIdex);
  };

  boughtList.message = function(){
    return (boughtList.items == "");
  };
}

function ShoppingListCheckOffService() {
  var service = this;
  var boughtList = [];
  
  // list
  var buyList = [
  {
    name: "cookies",
    quantity: "10"
  },
  {
    name: "bananas",
    quantity: "5"
  },
  {
    name: "chips",
    quantity: "4"
  },
  {
    name: "chocolates",
    quantity: "10"
  },
  {
    name: "apples",
    quantity: "8"
  }
  ];

  // this function populate the bought list and remove items from buy list
  service.checkItemsList = function(itemIdex){
    boughtList.push(buyList[itemIdex]);
    buyList.splice(itemIdex, 1);
    
  };

  service.getBuyItems = function(){
    return buyList; 
  };

  service.getBoughtItems = function(){
    return boughtList;
  };

}

})();
