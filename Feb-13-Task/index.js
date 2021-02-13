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
var AccountClass = /** @class */ (function () {
    function AccountClass(id, customer, balance) {
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
    return AccountClass;
}());
