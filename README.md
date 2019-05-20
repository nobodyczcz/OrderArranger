# OrderArranger

This repository provide a simple function that read from a object of orders, and package them to vans. The program try to place the orders from same customerId into one vans. Each vans are filled as much close to weight 5 as possible.

The program will first pack orders to smaller sub-order package (in order to save memonary for lagrge amount data), and then cluster these sub-orders by customerId. The program use dynamic programming to allocate orders to vans to ensure that each van is fullfilled.

## Test

The program use Mocha to perform unit testing. Some test cases are set to some boundary conditions some test cases are generated with large amount of ramdom data.

### Test result
![TestResult](https://raw.githubusercontent.com/nobodyczcz/OrderArranger/master/test/TestResult.png)
