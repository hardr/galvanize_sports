var data = require("./objects");
var inventory = data.inventory;
var shoppingCart = data.shoppingCart;

module.exports = {
    inventory: data.inventory,
    shoppingCart: data.shoppingCart,
    addItem: function(itemId, quant){
        // Your code here!
      for (var i = 0; i < inventory.length; i++) {
        if (inventory[i].id === parseInt(itemId)) {
          if (inventory[i].quantityAvailable >= quant) {
            inventory[i].quantityAvailable -= parseInt(quant);
            shoppingCart[i].quantity += parseInt(quant);
          } else {
            shoppingCart[i].quantity += inventory[i].quantityAvailable;
            inventory[i].quantityAvailable = 0;
          }
        }
      }
    },
    removeItem: function(itemId, quant) {
        // Your code here!
        for (var i = 0; i < shoppingCart.length; i++) {
          if (shoppingCart[i].itemId === parseInt(itemId)) {
            if (shoppingCart[i].quantity >= quant) {
              shoppingCart[i].quantity -= parseInt(quant);
              inventory[i].quantityAvailable += parseInt(quant);
            } else {
              inventory[i].quantityAvailable += shoppingCart[i].quantity;
              shoppingCart[i].quantity = 0;
            }
          }
        }
    },
    getCheckoutSubtotal: function(){
        var checkoutSubtotal = 0;
        // Your code here!
        for (var i = 0; i < shoppingCart.length; i++) {
          checkoutSubtotal += shoppingCart[i].quantity * inventory[i].price;
        }
        return checkoutSubtotal;
    },
    getTax: function(subtotal, rate){
        var tax = 0.00;
        // Your code here!
        tax += subtotal * rate;
        return tax;
    },
    getCheckoutTotal: function(){
        var TAX_RATE = 0.078;
        var checkoutTotal = 0.00;
        // Your code here!
        checkoutTotal += (this.getTax(this.getCheckoutSubtotal(), TAX_RATE) + this.getCheckoutSubtotal()).toFixed(2);
        return checkoutTotal;
    }
}
