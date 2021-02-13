class Customer {
  id: number;
  name: string;
  discount: number;

  constructor(id: number, name: string, discount: number) {
    this.id = id;
    this.name = name;
    this.discount = discount;
  }

  getID = (): number => this.id;

  getName = (): string => this.name;

  getDiscount = (): number => this.discount;

  setDiscount = (discount: number): void => {
    this.discount = discount;
  };

  toString = (): string => `${this.name}(${this.id})`;
}

class Invoice {
  id: number;
  customer: Customer;
  amount: number;

  constructor(id: number, customer: Customer, amount: number) {
    this.id = id;
    this.customer = customer;
    this.amount = amount;
  }

  getId = (): number => this.id;

  getCustomer = (): Customer => this.customer;

  setCustomer = (customer: Customer): void => {
    this.customer = customer;
  };

  getAmount = (): string => `${this.amount}`;

  setAmount = (amount: number): void => {
    this.amount = amount;
  };

  getCustomerName = (): string => this.customer.name;

  getAmountAfterDiscount = (): number => this.amount - this.customer.discount;
}

class AccountClass {
  id: number;
  customer: Customer;
  balance: number;

  constructor(id: number, customer: Customer, balance: number = 0.0) {
    this.id = id;
    this.customer = customer;
    this.balance = balance;
  }

  getID = (): number => this.id;

  getCustomer = (): Customer => this.customer;

  getBalance = (): number => this.balance;

  setBalance = (balance: number): void => {
    this.balance = balance;
  };

  toString = (): string =>
    `${this.customer.toString()} balance=${this.balance.toFixed(2)}`;

  getCustomerName = (): string => this.customer.name;

  deposit = (amount: number): AccountClass => {
    this.balance += amount;
    return this;
  };

  withdraw = (amount: number): AccountClass => {
    if (this.balance >= amount) {
      this.balance -= amount;
      return this;
    } else {
      console.log("Amount withdrawn exceeds the current balance !");
      return this;
    }
  };
}
