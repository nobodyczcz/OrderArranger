
function packAndReport(orders=[]){
    /**
     * @param orders  orders [{customerId: 1,orderId: 'abc',weight: 2},{...}]
     */
    var subOrders=[]
    var vans = []
    var spreadVanIds = []
   while (orders.length>0){
       subOrders.push(orders.pop())
       //divide the orginal orders to lots of suborders, each with a size of 100 orders, to save memoray 
       if(subOrders.length>=100){
           var result = miniPacker(subOrders)
           vans = vans.concat(result[0])
           spreadVanIds = spreadVanIds.concat(result[1])
           subOrders=[]
       }
   }

   if(subOrders.length>0){
        var result = miniPacker(subOrders)
        vans = vans.concat(result[0])
        spreadVanIds = spreadVanIds.concat(result[1])
   }

    return {'vans':vans,'spreadVanIds':spreadVanIds}
}

function miniPacker (orders){
    var customers={}
    var vans=[]
    var spreadVanIds = new Set()
    var notFullOrders=[]
    var customerVans={}

    while (orders.length>0){
        //classify orders by customerId
        var order = orders.pop();
        var customerId = order.customerId 
        if (!customers[customerId]){
            customers[customerId]={}
            customerVans[customerId]=new Set()
        }
        customers[customerId][order.orderId]=order
    }

    for (var customerId in customers){
        //For every customer, try to package their things in one van and fullfill the van.
        var count=0
        while (Object.keys(customers[customerId]).length>0){
            var result = putToVan(customers[customerId])
            if(result[1]==5){
                vans.push({orders:Object.keys(result[0])})
                customerVans[customerId].add(vans.length)
            }
            else{
                //for the orders can't fullfill the van, try to fullfill the van with other customer's goods.
                for(var orderId in result[0]){
                    notFullOrders[orderId]=result[0][orderId]
                }
            }
        }
    }

    while (Object.keys(notFullOrders).length>0){
        //package the rest to vans
        var result = putToVan(notFullOrders)
        vans.push({orders:Object.keys(result[0])})
        for (var orderId in result[0]){
                customerVans[result[0][orderId].customerId].add(vans.length)
        }
        //as these orders are all from previous filter, so they are all spreaded orders.

        
    }


    for(var customerId in customerVans){
        //gather the information about vans with order spreaded.
        if(customerVans[customerId].size>=2){
            for (var vanId of customerVans[customerId]){
                    spreadVanIds.add(vanId)
            }
        }
    }    
    return [vans,[...spreadVanIds]]
}

function putToVan(orders){
    /**
     * @param orders  orders object with orderid and order {orderId1:order1,orderId2:order2} different from original order format
     */
    //use dynamic programming to full a van for orders from one user
    var van = {};
    var weight = 0;
    for(var orderId in orders){
        if(orders[orderId].weight+weight<=5){
            van[orderId] = orders[orderId];
            weight = orders[orderId].weight+weight
        }
        else{
            for (var vankey in van){
                if((weight-van[vankey].weight+orders[orderId].weight)<=5 && orders[orderId].weight> van[vankey].weight){
                    weight = weight-van[vankey].weight+orders[orderId].weight
                    delete van[vankey]
                    van[orderId] = orders[orderId]
                    break
                }
            }
        }
        if(weight==5){
            break
        }
    }

    for (var vankey in van){
        delete orders[vankey]
    }

    return [van,weight]
}

function computeVanWeight(van){
    var sum = 0;
    van.forEach((order,key) => {
        sum = sum+order.weight
        
    });
    return sum;
}

module.exports.packAndReport=packAndReport;
module.exports.putToVan=putToVan;


//console.log(packAndReport(exampleOrders))
