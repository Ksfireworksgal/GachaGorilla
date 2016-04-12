Items = new Mongo.Collection('items');

if (Meteor.isClient) {

Template.addItem.events({
  'submit form': function(e, b){
    var newItem = {
      desginer: $('#itemdesigner').val(),
      eventName: $('#itemeventName').val(),
      gachaName: $('#itemgachaName').val(),
      rarity: $('#itemrarity').val(),
      color: $('#itemcolor').val(),
      size:$('#itemsize').val(),
      qty: $('#itemqty').val(),
      price: $('#itemprice').val()
    };

    Items.insert(newItem);
 
    $('#addItemForm').find('input:text').val('');
    $('#itemStore').focus();
    return false;
  }
});
Template.item.helpers({
  editing: function(){
    return Session.equals('editItemId', this._id);
  },
});

Template.item.events({
  'click .deleteItem': function(){
    Items.remove(this._id);
  },
  'click .editItem': function(){
    Session.set('editItemId', this._id);
  },
    'click .cancelItem': function(){
    Session.set('editItemId', null);
  },
  'click .saveItem': function(){
    saveItem();
  },
  'keypress input': function(e){
    if(e.keyCode === 13){
      saveItem();
    }
    else if(e.keyCode === 27){
      Session.set('editItemId', null);
    }
  }

});//closes the template.item.events

var saveItem = function(){
  var editItem = {
    designer: $("#editItemdesigner").val(),
    eventName: $("#editItemeventName").val(),
    gachaName: $("#editItemgachaName").val(),
    rarity: $("#editItemrairty").val(),
    color: $("#editItemcolor").val(),
    size: $("#editItemsize").val(),
    qty: $("#editItemqty").val(),
    price: $("#editItemprice").val()
  }

  Items.update(Session.get('editItemId'), {$set: editItem});
  Session.set('editItemId', null);
}

  
  














}