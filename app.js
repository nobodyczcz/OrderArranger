var packAndReport = require('./packager').packAndReport;

const exampleOrders = [
    {
    customerId: 1,
    orderId: 'abc',
    weight: 2
    },
    {
    customerId: 2,
    orderId: 'ghi',
    weight: 1
    },
    {
    customerId: 1,
    orderId: 'def',
    weight: 4
    },
    {
    customerId: 1,
    orderId: 'zzz',
    weight: 1
    }
]

console.log(JSON.stringify(packAndReport(exampleOrders)))

