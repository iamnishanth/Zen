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
  tre;
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

class Accounts {
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

  deposit = (amount: number): Accounts => {
    this.balance += amount;
    return this;
  };

  withdraw = (amount: number): Accounts => {
    if (this.balance >= amount) {
      this.balance -= amount;
      return this;
    } else {
      console.log("Amount withdrawn exceeds the current balance !");
      return this;
    }
  };
}

let customerObject = [];
let invoiceObject = [];
let accountObject = [];

document.getElementById("customerSubmit").addEventListener("click", () => {
  let customerID = parseInt(
    (<HTMLInputElement>document.querySelector("#customerID")).value
  );
  let customerName = (<HTMLInputElement>document.querySelector("#customerName"))
    .value;
  let customerDiscount = parseInt(
    (<HTMLInputElement>document.querySelector("#customerDiscount")).value
  );

  let obj = new Customer(customerID, customerName, customerDiscount);
  customerObject.push(obj);

  let option1 = document.createElement("option");
  option1.setAttribute("id", `${obj.id}`);
  option1.innerText = obj.name;
  let option2 = document.createElement("option");
  option2.setAttribute("id", `${obj.id}`);
  option2.innerText = obj.name;
  let invoiceCustomer = document.getElementById("invoiceCustomer");
  let accountCustomer = document.getElementById("accountCustomer");

  invoiceCustomer.appendChild(option1);
  accountCustomer.appendChild(option2);

  let tableItems = "";
  for (let elm of customerObject) {
    tableItems += `<tr>
      <td>${elm.id}</td>
      <td>${elm.name}</td>
      <td>${elm.discount}</td>
    </tr>`;
  }
  document.querySelector(".customerTable").innerHTML = tableItems;
});

document.getElementById("invoiceSubmit").addEventListener("click", () => {
  let invoiceID = parseInt(
    (<HTMLInputElement>document.querySelector("#invoiceID")).value
  );
  let invoiceCustomer = (<HTMLSelectElement>(
    document.querySelector("#invoiceCustomer")
  )).value;
  let invoiceCustomerObj;
  for (let obj of customerObject) {
    if (obj.name === invoiceCustomer) {
      invoiceCustomerObj = obj;
    }
  }
  let invoiceAmount = parseInt(
    (<HTMLInputElement>document.getElementById("invoiceAmount")).value
  );
  let object = new Invoice(invoiceID, invoiceCustomerObj, invoiceAmount);
  invoiceObject.push(object);

  let tableItems = "";
  for (let elm of invoiceObject) {
    tableItems += `<tr>
      <td>${elm.id}</td>
      <td>${elm.customer.name}</td>
      <td>${elm.amount}</td>
    </tr>`;
  }
  document.querySelector(".invoiceTable").innerHTML = tableItems;
});

document.getElementById("accountSubmit").addEventListener("click", () => {
  let accountID = parseInt(
    (<HTMLInputElement>document.querySelector("#accountID")).value
  );
  let accountCustomer = (<HTMLSelectElement>(
    document.querySelector("#accountCustomer")
  )).value;
  let accountCustomerObj;
  for (let obj of customerObject) {
    if (obj.name === accountCustomer) {
      accountCustomerObj = obj;
    }
  }
  let accountBalance = parseInt(
    (<HTMLInputElement>document.getElementById("accountBalance")).value
  );
  let object = new Accounts(accountID, accountCustomerObj, accountBalance);
  accountObject.push(object);

  let tableItems = "";
  for (let elm of accountObject) {
    tableItems += `<tr>
      <td>${elm.id}</td>
      <td>${elm.customer.name}</td>
      <td>${elm.balance}</td>
    </tr>`;
  }
  document.querySelector(".accountTable").innerHTML = tableItems;
});
