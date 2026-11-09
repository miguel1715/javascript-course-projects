# Bank Account Management

A console-based bank account built for the freeCodeCamp JavaScript certification.
It uses a `BankAccount` class that tracks a balance and stores every transaction as an object.

## Example

```js
const myAccount = new BankAccount();

myAccount.deposit(200);     // Successfully deposited $200. New balance: $200
myAccount.deposit(-50);     // Deposit amount must be greater than zero.
myAccount.withdraw(500);    // Insufficient balance or invalid amount.
myAccount.withdraw(50);     // Successfully withdrew $50. New balance: $150
myAccount.checkBalance();   // Current balance: $150
myAccount.listAllDeposits();     // Deposits: 200
myAccount.listAllWithdrawals();  // Withdrawals: 50
```

## What I practised

- Writing a class with a constructor and methods that change the object's own data through `this`
- Validating input before changing any data
- Chaining `filter`, `map` and `join` to build a formatted list