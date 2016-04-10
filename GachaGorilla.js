gachaList = new Mongo.Collection("GachaList");
if (Meteor.isClient) {
     
Template.gachaList.helpers({
    items: function() {
      var results=gachaList.find();
      return results;
    }
  });  

Template.addGacha.events({
  'submit form': function(e, b){
    var newItem = {
      gachaDesigner: $('#gachaDesigner').val(),
      gachaEvent: $('#gachaEvent').val(),
      gachaName: $('#gachaName').val(),
      gachaColor: $('#gachaColor').val(),
      gachaSize: $('#gachaSize').val(),
      gachaRarity: $('#gachaRarity').val(),
      gachaQty: $('#gachaQty').val(),
      gachaPrice: $('#gachaPrice').val(),
      
    };
 
    gachaList.insert(newItem);
 
    $('#addItemForm').find('input:text').val('');
    $('#itemStore').focus();
    return false;
  }
});

Template.gachaItem.events({
  'click .deleteItem': function(){
    gachaList.remove(this._id);
  }
});

}