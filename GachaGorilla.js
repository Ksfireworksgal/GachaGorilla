Items = new Mongo.Collection('items');

//create schema for data validation 
Items.attachSchema(new SimpleSchema({
  store: {
    type: String,
    label: "Store Name",
    max: 200
  },
  name: {
    type: String,
    label: "Name",
    max: 200
  },
  weight: {
    type: Number,
    label: "Weight",
    decimal: true,
    min: 0  
  },
  weightType: {
    type: String,
    label: "Weight Type",
    max: 200
  },
  qty: {
    type: Number,
    label: "Quantity",
    decimal: true
  },
  qtyType: {
    type: String,
    label: "Quantity Type",
    max: 200
  },
  price: {
    type: Number,
    label: "Price",
    decimal: true
  }
}));  // close validation schema



if(Meteor.isClient){
  Template.itemList.helpers({
    items: function() {
      return Items.find();
    }
  }); 


//creating an object from the form fields - inserting the object - clearing out the form
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

    Items.insert(newItem, {validationContext: 'insertForm'}, function(error, result) {
      if(!error){    
        $('#addItemForm').find('input:text').val('');
        $('#itemStore').focus();
      }
    });

    return false;
  }
});

//set up edit item function
Template.item.helpers({
  editing: function(){
    return Session.equals('editItemId', this._id);
  } 
});

//set up delete Item function
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
});// close template events

var saveItem = function(){
  var editItem = {
    store: $("#editItemStore").val(),
    name: $("#editItemName").val(),
    weight: $("#editItemWeight").val(),
    weightType: $("#editItemWeightType").val(),
    qty: $("#editItemQty").val(),
    qtyType: $("#editItemQtyType").val(),
    price: $("#editItemPrice").val()
  }

  Items.update(Session.get('editItemId'), {$set: editItem}, {validationContext: 'updateForm'}, function(error, result) {
      if(!error){    
  Session.set('editItemId', null);
}
});
} 

Template.itemerrors.helpers({
  errors: function(){
    var context = Items.simpleSchema().namedContext(this.contextName);
    return context.invalidKeys().map(function(data){ return {message: context.keyErrorMessage(data.name)}});
  }
});
































}// end client

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}// end server