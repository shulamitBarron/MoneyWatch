"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Tables_1 = require("../models/Tables");
var common_1 = require("./common");
exports.default = function (t, theTransactions, accounts, seriesNames, periods, selectedCategory) {
    if (theTransactions === void 0) { theTransactions = []; }
    if (accounts === void 0) { accounts = []; }
    if (seriesNames === void 0) { seriesNames = []; }
    if (periods === void 0) { periods = []; }
    if (selectedCategory === void 0) { selectedCategory = ""; }
    var table = __assign({}, Tables_1.default[t]);
    var maxDate;
    var curDate = new Date();
    switch (table.case) {
        case "transaction":
            maxDate = new Date(Math.max.apply(null, theTransactions.map(function (t) { return new Date(t.date); })));
            var transaction_1 = theTransactions.filter(function (t) { return new Date(t.date).getTime() === maxDate.getTime(); });
            table.rows = [table.cols.map(function (col) { return transaction_1[0] && transaction_1[0][col] ? transaction_1[0][col] : null; })];
            break;
        case "transactions":
            table.rows = theTransactions.map(function (transaction) { return table.cols.map(function (col) { return transaction[col] ? transaction[col] : null; }); });
            break;
        case "transactionCount":
            table.rows = [[theTransactions.length]];
            break;
        case "currentDate":
            table.rows = [[new Date()]];
            break;
        case "accounts":
            table.rows = accounts.map(function (account) { return table.cols.map(function (col) { return account[col] ? account[col] : null; }); });
            break;
        case "account":
            maxDate = new Date(Math.max.apply(null, theTransactions.map(function (t) { return new Date(t.date); })));
            var trans_1 = theTransactions.filter(function (t) { return new Date(t.date).getTime() === maxDate.getTime(); });
            var account_1 = trans_1.length ? accounts.filter(function (a) { return a.number === trans_1[0].accountNumber; }) : null;
            table.rows = [table.cols.map(function (col) { return account_1[0] && account_1[0][col] ? account_1[0][col] : null; })];
            break;
        case "seriesNames":
            table.rows = seriesNames;
            break;
        case "lastMonthDate":
            table.rows = [[(new Date((new Date).setMonth(curDate.getMonth() - 1)).getMonth() + 1).toString()]];
            break;
        case "hasSingleAccount":
            table.rows = [[(accounts.length === 1).toString()]];
            break;
        case "amount":
            theTransactions = theTransactions
                .filter(function (t) { return new Date(t.date).getMonth() === new Date().getMonth(); })
                .map(function (t) { return +t.amount; });
            table.rows = [[theTransactions.length ? theTransactions.reduce(function (a, b) { return a + b; }) : 0]];
            break;
        case "localCurrencyCd":
            table.rows = [[theTransactions[0].currencyCd]];
            break;
        case "barChartExpenses":
            var AccountTransactions = common_1.groupBy(theTransactions, function (item) { return [item.month, item.account]; });
            var Accounts_1 = common_1.groupBy(theTransactions, function (item) { return [item.account]; }).map(function (a) { return a[0].account; });
            table.rows = AccountTransactions
                .map(function (At) { return [At[0].account,
                Math.abs(At.map(function (t) { return +t.amount; }).reduce(function (a, b) { return a + b; })),
                At[0].month,
                At[0].currencyCd]; });
            periods.forEach(function (p) { return Accounts_1.forEach(function (AT) { return !table.rows.find(function (a) {
                return a[0] === AT && a[2] === p;
            }) ? table.rows.push([AT,
                0.00,
                p,
                theTransactions[0].currencyCd]) : null; }); });
            break;
        case "periods":
            table.rows = periods.map(function (p) { return [p]; });
            break;
        case "bizCategories":
            theTransactions = theTransactions.map(function (t) { return t.categoryDescription.en; });
            var categoryDescriptions = theTransactions.filter(function (t, i) { return theTransactions.indexOf(t) === i; });
            table.rows = categoryDescriptions.map(function (g) { return [g]; });
            break;
        case "categoryGroup":
            table.rows = [["CG10000", { "en": selectedCategory }]];
            break;
        case "quizRanges":
            var avg = Math.abs(theTransactions.map(function (t) { return +t.amount; }).reduce(function (a, b) { return a + b; }) / periods.length);
            var random = Math.floor(Math.random() * 2000) + avg - 2000;
            random = random < 0 ? 0 : random;
            var range = [];
            for (var i = 0; i < 4; i++) {
                range.push([i.toString(), (random + 500 * i).toString(), (random + 500 * (i + 1)).toString(), (avg > random + 500 * i && avg < random + 500 * (i + 1)).toString()]);
            }
            table.rows = range;
            break;
        default:
            break;
    }
    delete table.case;
    return table;
};
