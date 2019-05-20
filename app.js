var packAndReport = require('./packager').packAndReport;
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

var orders=[]
for (var i = 1;i<1000000;i++){
    var newOrder = {
        customerId: Math.round(getRandomArbitrary(1,50)),
        orderId : i.toString(),
        weight:Math.round(getRandomArbitrary(1,5)),
    }
    orders.push(newOrder);
}
console.log(orders)
var result = packAndReport(orders);
console.log(result.vans.length)
console.log(result.spreadVanIds.length)

