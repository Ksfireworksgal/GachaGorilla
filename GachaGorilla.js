Items = new Mongo.Collection('items');

//create schema for data validation 
Items.attachSchema(new SimpleSchema({
 Designer: {
    type: String,
    label: "Designer",
    max: 200
  },
  Event: {
    type: String,
    label: "Event",
    max: 200
  },
  Gacha: {
    type: String,
    label: "Gacha",
    max: 200  
  },
  Rarity: {
    type: String,
    label: "Rarity",
    max: 200
  },
  Color: {
    type: String,
    label: "Color",
    max:  100
  },
  Size: {
    type: String,
    label: "Size",
    max: 200
  },
  qty: {
    type: Number,
    label: "Quantity",
    decimal: true
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
var addItem = function(){
  var newItem = {
    Designer: $('#itemDesigner').val(),
    Event: $('#itemEvent').val(),
    Rarity: $('#itemRarity').val(),
    Gacha: $('#itemGacha').val(),
    Color: $('#itemColor').val(),
    Size: $('#itemSize').val(),
    qty: $('#itemQty').val(),
    price: $('#itemPrice').val()
  };
 
  Items.insert(newItem, {validationContext: 'insertForm'}, function(error, result) {
    if(!error){
      this.$('form').find('input:text').val('');
      $('#itemDesigner').focus();
    }
  });
}
 
var resetForm = function(template){
  template.$('form').find('input:text').val('');
  template.$('#addItemAccordion').accordion('close', 0);
  Items.simpleSchema().namedContext('insertForm').resetValidation();
}
 
Template.addItem.events({
  'submit form': function(e, template){
    addItem();
    return false;
  },
  'click #cancelButton': function(e, template){
    resetForm(template);
  },
  'keypress input': function(e, template){
    if(e.keyCode === 27){
      resetForm(template);
    } 
  }
 
});
 
Template.addItem.rendered = function(){
  var self = this;
  $('#addItemAccordion.ui.accordion').accordion({
    onOpen: function(){
      self.$('#itemDesigner').focus();
    }
  });
}

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
    Items.simpleSchema().namedContext('updateForm').resetValidation();
    Items.simpleSchema().namedContext('insertForm').resetValidation();
    Session.set('editItemId', this._id);
  },
  'click .cancelItem': function(){
    Items.simpleSchema().namedContext('updateForm').resetValidation();
    Items.simpleSchema().namedContext('insertForm').resetValidation();
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
    Designer: $("#editItemDesigner").val(),
    Event: $("#editItemEvent").val(),
    Gacha: $("#editItemGacha").val(),
    Rarity: $("#editItemRarity").val(),
    Color: $("#editItemColor").val(),
    Size: $("#editItemSize").val(),
    qty: $("#editItemQty").val(),
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