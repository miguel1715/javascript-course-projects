class BankAccount {
    constructor() {
        this.balance = 0;
        this.transactions = [];
    }

    deposit(amount) {
        if (amount > 0) {
            this.transactions.push({ type: "deposit", amount: amount});
            this.balance += amount;
            return `Successfully deposited $${amount}. New balance: $${this.balance}`;
        } else {
            return `Deposit amount must be greater than zero.`;
        }
    }

    withdraw(amount) {
        if (amount > 0 && amount <= this.balance) {
            this.transactions.push({ type: "withdraw", amount: amount});
            this.balance -= amount;
            return `Successfully withdrew $${amount}. New balance: $${this.balance}`
        } else {    
            return "Insufficient balance or invalid amount.";
        }
    }

    checkBalance() {
        return `Current balance: $${this.balance}`;
    }

    listAllDeposits() {
        const finalDeposits = this.transactions
        .filter((t) => t.type === "deposit")
        .map((t) => t.amount)
        .join(",");
        return "Deposits: " + finalDeposits;
    }

    listAllWithdrawals() {
        const finalWithdrawals = this.transactions
        .filter((t) => t.type === "withdraw")
        .map((t) => t.amount)
        .join(",")
        return "Withdrawals: " + finalWithdrawals;
    }
};

const myAccount = new BankAccount();

console.log(myAccount.deposit(200));
console.log(myAccount.deposit(150));
console.log(myAccount.deposit(100));
console.log(myAccount.withdraw(50));
console.log(myAccount.withdraw(75));

console.log(myAccount.checkBalance());
console.log(myAccount.listAllDeposits());
console.log(myAccount.listAllWithdrawals());