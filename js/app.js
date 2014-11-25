// text element are accessed by javascript variables that begin with 'txt'
// button elements are accessed by javascript variables that begin with 'btn' 


var app = {

  //variables to be initialized once the window renders its document. 
  init: function(){
    this.txtItem = document.getElementById('item');
    this.txtItem.focus();
    this.btnAddItem = document.getElementById('addItem');
    this.incompleteList = document.getElementById('incompleteList');
    this.completedList = document.getElementById('completedList');
    this.setListeners();

    //loop to bindListEvents to listItem
    for(var i = 0; i < this.incompleteList.children.length; i++) {
      this.bindListEvents(this.incompleteList.children[i], this.completedShoppingList);
    }

    for(var j = 0; j < this.completedList.children.length; j++) {
      this.bindListEvents(this.completedList.children[j], this.incompleteShoppingList);
    }
  },

  setListeners: function(){
    var self = this;
    self.btnAddItem.onclick = function(){
      self.addItemToList();
    };
  },

  //Create a list item and append other elements to it
  createNewElement: function(itemString) {
    //create new ListItem
    var listItem = document.createElement("li");

    //create checkbox
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    //create label
    var label = document.createElement("label");
    label.innerHTML = itemString;

    //create delete button
    var btnDelete = document.createElement("button");
    btnDelete.innerHTML = "Delete";
    btnDelete.className = "delete";
    btnDelete.type = "Button";

    //Append elements to listItem
    listItem.appendChild(checkbox);
    listItem.appendChild(label);
    listItem.appendChild(btnDelete);
    return listItem;
  },

  //function that acts as an event listener for the checkbox & delete button
  bindListEvents: function(shoppingListItem, checkboxEventHandler) {
    var checkbox = shoppingListItem.querySelector("input[type=checkbox]");
    var btnDelete = shoppingListItem.querySelector("button.delete");

    btnDelete.onclick = app.deleteItem;

    checkbox.onchange = checkboxEventHandler;
  },

  //function to move an unchecked item back to the incomplete list container
  completedShoppingList: function() {
    var listItem = this.parentNode;
    app.completedList.appendChild(this.parentNode);
    app.bindListEvents(listItem, app.incompleteShoppingList);
  },

  //function to move a checked item to the completed list container
  incompleteShoppingList: function() {
    var listItem = this.parentNode;
    app.incompleteList.appendChild(listItem);
    app.bindListEvents(listItem, app.completedShoppingList);
  },

  //function to add item to the incomplete list container
  addItemToList: function() {
    if(this.btnAddItem) {
      var listItem = this.createNewElement(this.txtItem.value);
      //append to ShoppingList
      this.incompleteList.appendChild(listItem);
      app.bindListEvents(listItem, app.completedShoppingList);
      this.txtItem.value = "";
      this.txtItem.focus();
    }
  },

  //function to delete an item from any container
  deleteItem: function() {
    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    ul.removeChild(listItem);
  }
};


//initialize the variables
window.onload = app.init();