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
var insightsConfiguration_1 = require("../models/insightsConfiguration");
var generateTable_1 = require("./generateTable");
var common_1 = require("./common");
exports.generateFacts = function (storyId, transactions, accounts) {
    transactions = transactions.map(function (t) {
        return (__assign({}, t, { date: new Date(t.date), month: (new Date(t.date).getMonth() + 1).toString(), mode: t.Mode, categoryGroup: { en: t.categoryDescription }, categoryDescription: { en: t.categoryDescription }, device: t.transaction }));
    });
    accounts = accounts.map(function (t) { return (__assign({}, t, { name: { en: t.name }, "count": Math.abs(t.amount), "sum": Math.abs(t.balance), "avg": Math.abs(t.balance), "std": Math.abs(t.balance) })); });
    var theTransactions = [];
    var theAccounts = [];
    var curDate = new Date();
    var facts = {};
    var periods = [];
    for (var i = 0; i < 4; i++) {
        periods.push((new Date((new Date).setMonth(curDate.getMonth() - i)).getMonth() + 1).toString());
    }
    switch (storyId) {
        case "72154aa7-d6b9-4f8e-b40d-a292cd0c167f":
            var theTrans_1 = transactions.filter(function (t) { return t.Mode === "Out"; });
            theTrans_1 = theTrans_1.filter(function (item, idx) {
                return theTrans_1.filter(function (a, i) {
                    return i !== idx && a.amount == item.amount && a.transaction === item.transaction &&
                        (new Date(a.date)).getTime() === (new Date(item.date)).getTime() &&
                        Math.ceil(Math.abs(new Date().getTime() -
                            new Date(a.date).getTime()) / (1000 * 3600 * 24)) <= 2;
                }).length + 1 > 1;
            });
            if (theTrans_1.length) {
                theTrans_1 = common_1.groupBy(theTrans_1, function (item) { return [item.amount, item.date, item.transaction]; });
                theTrans_1 = theTrans_1.length ?
                    theTrans_1
                        .sort(function (a, b) { return a.length > b.length ? -1 : 1; })[0]
                        .map(function (t) { return (__assign({}, t, { amount: Math.abs(t.amount) })); }) : [];
                theAccounts = accounts.filter(function (account) {
                    return theTrans_1.filter(function (t) { return t.accountNumber === account.number; }).length > 0;
                });
                if (theTrans_1.length && theAccounts.length) {
                    insightsConfiguration_1.tablesForStory[insightsConfiguration_1.storyIdForInsightId[storyId]].map(function (table) {
                        return facts[table] = generateTable_1.default(table, theTrans_1, theAccounts);
                    });
                }
                else {
                    throw "error";
                }
            }
            break;
        case "147443c7-7be1-4f68-8ff3-ce65e992c22c":
            insightsConfiguration_1.tablesForStory[insightsConfiguration_1.storyIdForInsightId[storyId]].map(function (table) {
                return facts[table] = generateTable_1.default(table);
            });
            break;
        case "d1e567b3-262f-4da8-bb46-dbd4c132f372":
            insightsConfiguration_1.tablesForStory[insightsConfiguration_1.storyIdForInsightId[storyId]].map(function (table) {
                return facts[table] = generateTable_1.default(table, transactions, accounts);
            });
            break;
        case "6b739292-bb50-4284-9d66-342de48403f2":
            theTransactions = transactions.filter(function (t) { return t.Mode === "Out" && periods.indexOf(t.month.toString()) > -1; });
            insightsConfiguration_1.tablesForStory[insightsConfiguration_1.storyIdForInsightId[storyId]].map(function (table) {
                return facts[table] = generateTable_1.default(table, theTransactions, accounts.filter(function (account) {
                    return theTransactions.filter(function (t) { return t.accountNumber === account.number; }).length > 0;
                }), [["In"], ["Out"]], periods);
            });
            break;
        case "6b739292-bb50-4284-9d66-342de48403f2-b":
            theTransactions = transactions.filter(function (t) { return t.Mode === "In" && periods.indexOf(t.month.toString()) > -1; });
            insightsConfiguration_1.tablesForStory[insightsConfiguration_1.storyIdForInsightId[storyId]].map(function (table) {
                return facts[table] = generateTable_1.default(table, theTransactions, accounts.filter(function (account) {
                    return theTransactions.filter(function (t) { return t.accountNumber === account.number; }).length > 0;
                }), [["In"], ["Out"]], periods);
            });
            break;
        case "66b719da-5a83-433b-bd82-c8ed2ca1685c":
            theTransactions = transactions.filter(function (t) {
                return t.Mode === "In" && t.type === "DepositCheck" &&
                    Math.ceil(Math.abs(new Date().getTime() -
                        new Date(t.date).getTime()) / (1000 * 3600 * 24)) <= 2;
            });
            theAccounts = accounts.filter(function (account) {
                return theTransactions.filter(function (t) { return t.accountNumber === account.number; }).length > 0;
            });
            if (theTransactions.length && theAccounts.length) {
                insightsConfiguration_1.tablesForStory[insightsConfiguration_1.storyIdForInsightId[storyId]].map(function (table) {
                    return facts[table] = generateTable_1.default(table, theTransactions, theAccounts, [["In"], ["Out"]], periods);
                });
            }
            else {
                throw "error";
            }
            break;
        case "0ebf81f1-273a-47b2-ae66-59fc50520da0":
            theTransactions = transactions.filter(function (t) {
                var usrYear, usrMonth = new Date(t.date).getMonth() + 1;
                var curYear, curMonth = curDate.getMonth() + 1;
                if ((usrYear = new Date(t.date).getFullYear()) < (curYear = curDate.getFullYear())) {
                    curMonth += (curYear - usrYear) * 12;
                }
                var diffMonths = curMonth - usrMonth;
                if (new Date(t.date).getDate() > curDate.getDate())
                    diffMonths--;
                return t.categoryDescription.en === "Salary" && t.Mode === "In" && diffMonths < 12;
            });
            theTransactions = theTransactions.sort(function (a, b) { return -1 * a.date.getTime() - b.date.getTime(); }).slice(0, 5).reverse();
            theAccounts = accounts.filter(function (account) {
                return theTransactions.filter(function (t) { return t.accountNumber === account.number; }).length > 0;
            });
            if (theTransactions.length && theAccounts.length) {
                insightsConfiguration_1.tablesForStory[insightsConfiguration_1.storyIdForInsightId[storyId]].map(function (table) {
                    return facts[table] = generateTable_1.default(table, theTransactions, theAccounts, [["In"], ["Out"]], periods);
                });
            }
            else {
                throw "error";
            }
            break;
        case "16052c32-574b-4a15-882e-0286e4d64fe0":
            theTransactions = transactions.filter(function (t) {
                var usrYear, usrMonth = new Date(t.date).getMonth() + 1;
                var curYear, curMonth = curDate.getMonth() + 1;
                if ((usrYear = new Date(t.date).getFullYear()) < (curYear = curDate.getFullYear())) {
                    curMonth += (curYear - usrYear) * 12;
                }
                var diffMonths = curMonth - usrMonth;
                if (new Date(t.date).getDate() > curDate.getDate())
                    diffMonths--;
                return t.categoryDescription.en === "Government" && t.Mode === "In" && diffMonths < 12;
            });
            theTransactions = theTransactions.sort(function (a, b) { return -1 * a.date.getTime() - b.date.getTime(); }).slice(0, 5).reverse();
            theAccounts = accounts.filter(function (account) {
                return theTransactions.filter(function (t) { return t.accountNumber === account.number; }).length > 0;
            });
            if (theTransactions.length && theAccounts.length) {
                insightsConfiguration_1.tablesForStory[insightsConfiguration_1.storyIdForInsightId[storyId]].map(function (table) {
                    return facts[table] = generateTable_1.default(table, theTransactions, theAccounts, [["In"], ["Out"]], periods);
                });
            }
            else {
                throw "error";
            }
            break;
        default:
            break;
    }
    return facts;
};
