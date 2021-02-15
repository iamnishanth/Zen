var Customer = /** @class */ (function () {
    function Customer(id, name, discount) {
        var _this = this;
        this.getID = function () { return _this.id; };
        this.getName = function () { return _this.name; };
        this.getDiscount = function () { return _this.discount; };
        this.setDiscount = function (discount) {
            _this.discount = discount;
        };
        this.toString = function () { return _this.name + "(" + _this.id + ")"; };
        this.id = id;
        this.name = name;
        this.discount = discount;
    }
    return Customer;
}());
var Invoice = /** @class */ (function () {
    function Invoice(id, customer, amount) {
        var _this = this;
        this.getId = function () { return _this.id; };
        this.getCustomer = function () { return _this.customer; };
        this.setCustomer = function (customer) {
            _this.customer = customer;
        };
        this.getAmount = function () { return "" + _this.amount; };
        this.setAmount = function (amount) {
            _this.amount = amount;
        };
        this.getCustomerName = function () { return _this.customer.name; };
        this.getAmountAfterDiscount = function () { return _this.amount - _this.customer.discount; };
        this.id = id;
        this.customer = customer;
        this.amount = amount;
    }
    return Invoice;
}());
var Accounts = /** @class */ (function () {
    function Accounts(id, customer, balance) {
        var _this = this;
        if (balance === void 0) { balance = 0.0; }
        this.getID = function () { return _this.id; };
        this.getCustomer = function () { return _this.customer; };
        this.getBalance = function () { return _this.balance; };
        this.setBalance = function (balance) {
            _this.balance = balance;
        };
        this.toString = function () {
            return _this.customer.toString() + " balance=" + _this.balance.toFixed(2);
        };
        this.getCustomerName = function () { return _this.customer.name; };
        this.deposit = function (amount) {
            _this.balance += amount;
            return _this;
        };
        this.withdraw = function (amount) {
            if (_this.balance >= amount) {
                _this.balance -= amount;
                return _this;
            }
            else {
                console.log("Amount withdrawn exceeds the current balance !");
                return _this;
            }
        };
        this.id = id;
        this.customer = customer;
        this.balance = balance;
    }
    return Accounts;
}());
var customerObject = [];
var invoiceObject = [];
var accountObject = [];
document.getElementById("customerSubmit").addEventListener("click", function () {
    var customerID = parseInt(document.querySelector("#customerID").value);
    var customerName = document.querySelector("#customerName")
        .value;
    var customerDiscount = parseInt(document.querySelector("#customerDiscount").value);
    var obj = new Customer(customerID, customerName, customerDiscount);
    customerObject.push(obj);
    var option1 = document.createElement("option");
    option1.setAttribute("id", "" + obj.id);
    option1.innerText = obj.name;
    var option2 = document.createElement("option");
    option2.setAttribute("id", "" + obj.id);
    option2.innerText = obj.name;
    var invoiceCustomer = document.getElementById("invoiceCustomer");
    var accountCustomer = document.getElementById("accountCustomer");
    invoiceCustomer.appendChild(option1);
    accountCustomer.appendChild(option2);
    var tableItems = "";
    for (var _i = 0, customerObject_1 = customerObject; _i < customerObject_1.length; _i++) {
        var elm = customerObject_1[_i];
        tableItems += "<tr>\n      <td>" + elm.id + "</td>\n      <td>" + elm.name + "</td>\n      <td>" + elm.discount + "</td>\n    </tr>";
    }
    document.querySelector(".customerTable").innerHTML = tableItems;
});
document.getElementById("invoiceSubmit").addEventListener("click", function () {
    var invoiceID = parseInt(document.querySelector("#invoiceID").value);
    var invoiceCustomer = (document.querySelector("#invoiceCustomer")).value;
    var invoiceCustomerObj;
    for (var _i = 0, customerObject_2 = customerObject; _i < customerObject_2.length; _i++) {
        var obj = customerObject_2[_i];
        if (obj.name === invoiceCustomer) {
            invoiceCustomerObj = obj;
        }
    }
    var invoiceAmount = parseInt(document.getElementById("invoiceAmount").value);
    var object = new Invoice(invoiceID, invoiceCustomerObj, invoiceAmount);
    invoiceObject.push(object);
    var tableItems = "";
    for (var _a = 0, invoiceObject_1 = invoiceObject; _a < invoiceObject_1.length; _a++) {
        var elm = invoiceObject_1[_a];
        tableItems += "<tr>\n      <td>" + elm.id + "</td>\n      <td>" + elm.customer.name + "</td>\n      <td>" + elm.amount + "</td>\n    </tr>";
    }
    document.querySelector(".invoiceTable").innerHTML = tableItems;
});
document.getElementById("accountSubmit").addEventListener("click", function () {
    var accountID = parseInt(document.querySelector("#accountID").value);
    var accountCustomer = (document.querySelector("#accountCustomer")).value;
    var accountCustomerObj;
    for (var _i = 0, customerObject_3 = customerObject; _i < customerObject_3.length; _i++) {
        var obj = customerObject_3[_i];
        if (obj.name === accountCustomer) {
            accountCustomerObj = obj;
        }
    }
    var accountBalance = parseInt(document.getElementById("accountBalance").value);
    var object = new Accounts(accountID, accountCustomerObj, accountBalance);
    accountObject.push(object);
    var tableItems = "";
    for (var _a = 0, accountObject_1 = accountObject; _a < accountObject_1.length; _a++) {
        var elm = accountObject_1[_a];
        tableItems += "<tr>\n      <td>" + elm.id + "</td>\n      <td>" + elm.customer.name + "</td>\n      <td>" + elm.balance + "</td>\n    </tr>";
    }
    document.querySelector(".accountTable").innerHTML = tableItems;
});
