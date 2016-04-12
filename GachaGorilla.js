Items = new Mongo.Collection('items');

if (Meteor.isClient) {

Template.addItem.events({
  'submit form': function(e, b){
    var newItem = {
      store: $('#itemStore').val(),
      name: $('#itemName').val(),
      weight: $('#itemWeight').val(),
      weightType: $('#itemWeightType').val(),
      qty: $('#itemQty').val(),
      qtyType: $('#itemQtyType').val(),
      price: $('#itemPrice').val()
    };

    Items.insert(newItem);
 
    $('#addItemForm').find('input:text').val('');
    $('#itemStore').focus();
    return false;
  }
});


Template.item.events({
  'click .deleteItem': function(){
    Items.remove(this._id);
  }
});













}