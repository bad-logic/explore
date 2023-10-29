solving concurrency problem using redis

Problem:

A company has n number of shares and customers can buy it. when multiple customers try to buy the
shares at the same time, we face concurrency issues allowing all customers requesting to buy at that specific time
to buy the shares even though there may or may not be enough shares for them to buy.

```
$ npm start
```

will first allocate 1000 shares for a company which will be stored in redis.
And then it will simulate 30 customers trying to buy 100 shares each. In the naive implementation
simulated by the function `buySharesConcurrently` every one is able to buy 100 shares each and still there
are some shares left to be bought.

To address this issue number of solutions are tried:

1. `buySharesConcurrentlyWithRedisAtomicOperation` unable to address the issue
2. `buySharesConcurrentlyWithRedisTransactionOperation` unable to address the issue
3. `buySharesConcurrentlyWithLuaScriptsInsideRedisServer` addresses the issue
4. `buySharesConcurrentlyWithRedisLocks` addresses the issue

Both option 3 and 4 addresses this issues with different approaches.

reference:
<a href="https://blog.stackademic.com/solving-concurrency-problems-with-redis-and-golang-720e68b2b95a" target="_blank">https://blog.stackademic.com/solving-concurrency-problems-with-redis-and-golang-720e68b2b95a</a>
