var packAndReport = require('../packager').packAndReport;
var putToVan = require('../packager').putToVan;

var expect = require('chai').expect;
var assert = require('chai').assert;

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

describe('#putToVan()', function() {

    context('3 order from same cusomerId, total weight is 3', function() {
        it('should return van with 3 order, total weight is 3', function() {
            var orders = {
                'abc':{
                customerId: 1,
                orderId: 'abc',
                weight: 1
                },
                'ghi':{
                customerId: 1,
                orderId: 'ghi',
                weight: 1
                },
                'def':{
                customerId: 1,
                orderId: 'def',
                weight: 1
                }
            }
            var result = putToVan(orders);
            expect(Object.keys(result[0])).to.have.lengthOf(3)
            expect(result[1]).to.equal(3);
          
        })
    })

    context('3 order from same cusomerId, total weight equal to 5', function() {
        it('should return van with 3 order, total weight is 5 ', function() {
            var orders = {
                'abc':{
                customerId: 1,
                orderId: 'abc',
                weight: 3
                },
                'ghi':{
                customerId: 1,
                orderId: 'ghi',
                weight: 1
                },
                'def':{
                customerId: 1,
                orderId: 'def',
                weight: 1
                }
            }
            var result = putToVan(orders);
            expect(Object.keys(result[0])).to.have.lengthOf(3)
            expect(result[1]).to.equal(5);
          
        })
    })

    context('3 order from same cusomerId, total weight larger than 5', function() {
        it('should return van with 3 order, total weight is 5 ', function() {
            var orders = {
                'abc':{
                customerId: 1,
                orderId: 'abc',
                weight: 4
                },
                'ghi':{
                customerId: 1,
                orderId: 'ghi',
                weight: 1
                },
                'def':{
                customerId: 1,
                orderId: 'def',
                weight: 1
                }
            }
            var result = putToVan(orders);
            expect(Object.keys(result[0])).to.have.lengthOf(2)
            expect(result[1]).to.equal(5);
          
        })
    })

    context('100 random orders, function should always find optimal solution', function() {
        it('Total weight always to be 5 ', function() {
            for (var x = 0;x<100;x++){
                var orders = {};
                for (var i = 0;i<100;i++){
                    var newOrder = {
                        customerId: 1,
                        orderId : i.toString(),
                        weight:Math.round(getRandomArbitrary(1,5)),

                    }
                    orders[i.toString()]=newOrder;
                }

                var result = putToVan(orders);
                expect(result[1]).to.equal(5);
            }
          
        })
    })
});
describe('#packAndReport()', function() {

    context('3 order from same cusomerId, total weight larger than 5', function() {
        it('should return 2 van, and spreadIds to be 2 ', function() {
            var orders = [
                {
                customerId: 1,
                orderId: 'abc',
                weight: 4
                },
                {
                customerId: 1,
                orderId: 'ghi',
                weight: 1
                },
                {
                customerId: 1,
                orderId: 'def',
                weight: 1
                }
            ]
            var result = packAndReport(orders);
            expect(result.vans).to.have.lengthOf(2)
            expect(result.spreadVanIds).to.have.lengthOf(2)
          
        })
    })

    context('3 order from same cusomerId, total weight less than 5', function() {
        it('should return 1 van, and spreadIds to be length 0 ', function() {
            var orders = [
                {
                customerId: 1,
                orderId: 'abc',
                weight: 1
                },
                {
                customerId: 1,
                orderId: 'ghi',
                weight: 1
                },
                {
                customerId: 1,
                orderId: 'def',
                weight: 1
                }
            ]
            var result = packAndReport(orders);
            expect(result.vans).to.have.lengthOf(1)
            expect(result.spreadVanIds).to.have.lengthOf(0)
          
        })
    })

    context('3 order from different cusomerId, total weight less than 5', function() {
        it('should return 1 van, and spreadIds to be length 0 ', function() {
            var orders = [
                {
                customerId: 1,
                orderId: 'abc',
                weight: 1
                },
                {
                customerId: 2,
                orderId: 'ghi',
                weight: 1
                },
                {
                customerId: 1,
                orderId: 'def',
                weight: 1
                }
            ]
            var result = packAndReport(orders);
            expect(result.vans).to.have.lengthOf(1)
            expect(result.spreadVanIds).to.have.lengthOf(0)
          
        })
    })

    context('3 order from different cusomerId, total weight larger than 5', function() {
        it('should return 2 van, and spreadIds to be length 2 ', function() {
            var orders = [
                {
                customerId: 1,
                orderId: 'abc',
                weight: 4
                },
                {
                customerId: 2,
                orderId: 'ghi',
                weight: 1
                },
                {
                customerId: 1,
                orderId: 'def',
                weight: 1
                }
            ]
            var result = packAndReport(orders);
            expect(result.vans).to.have.lengthOf(2)
            expect(result.spreadVanIds).to.have.lengthOf(0)
          
        })
    })
    context('200 order from different cusomerId', function() {
        this.timeout(30000);
        it('Should not take too long ', function() {
            var orders=[]
            for (var i = 1;i<200;i++){
                var newOrder = {
                    customerId: Math.round(getRandomArbitrary(1,50)),
                    orderId : i.toString(),
                    weight:Math.round(getRandomArbitrary(1,5)),

                }
                orders.push(newOrder);
            }
            var result = packAndReport(orders);
            expect(result.vans).is.not.empty
        }
        )
    })
    context('1000 order from different cusomerId', function() {
        this.timeout(30000);
        it('Should not take too long ', function() {
            var orders=[]
            for (var i = 1;i<1000;i++){
                var newOrder = {
                    customerId: Math.round(getRandomArbitrary(1,50)),
                    orderId : i.toString(),
                    weight:Math.round(getRandomArbitrary(1,5)),

                }
                orders.push(newOrder);
            }
            var result = packAndReport(orders);
            expect(result.vans).is.not.empty
        }
        )
    })

    context('1 00 000 order from different cusomerId', function() {
        this.timeout(30000);
        it('Should not take too long ', function() {
            var orders=[]
            for (var i = 1;i<100000;i++){
                var newOrder = {
                    customerId: Math.round(getRandomArbitrary(1,50)),
                    orderId : i.toString(),
                    weight:Math.round(getRandomArbitrary(1,5)),

                }
                orders.push(newOrder);
            }
            var result = packAndReport(orders);
            expect(result.vans).is.not.empty
        }
        )
    })

    context('1 000 000 order from different cusomerId', function() {
        this.timeout(300000);
        it('Should take some time ', function() {
            var orders=[]
            for (var i = 1;i<1000000;i++){
                var newOrder = {
                    customerId: Math.round(getRandomArbitrary(1,50)),
                    orderId : i.toString(),
                    weight:Math.round(getRandomArbitrary(1,5)),

                }
                orders.push(newOrder);
            }
            var result = packAndReport(orders);
            expect(result.vans).is.not.empty
        }
        )
    })
});