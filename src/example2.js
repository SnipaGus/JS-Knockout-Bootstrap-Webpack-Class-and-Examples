import ko from 'knockout';

var SimpleListModel = function(items) {
    this.items = ko.observableArray(items);
    this.itemToAdd = ko.observable("");
    this.addItem = function() {
        if (this.itemToAdd() != "") {
            this.items.push(this.itemToAdd()); // Adds the item. Writing to the "items" observableArray causes any associated UI to update.
            this.itemToAdd(""); // Clears the text box, because it's bound to the "itemToAdd" observable
        }
    }.bind(this);  // Ensure that "this" is always this view model

    // TODO: Add function to handle removing an item from the list.
    // TODO: Notify the user when they attempt to remove an item when there are none in the list
    // TODO: Alternatively, disable the the remove button when the list is empty
};

ko.applyBindings(new SimpleListModel(["Alpha", "Beta", "Gamma"]));