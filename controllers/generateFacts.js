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
        return (__assign({}, t, { month: (new Date(t.date).getMonth() + 1).toString(), mode: t.Mode, categoryGroup: { en: t.categoryDescription }, categoryDescription: { en: t.categoryDescription }, device: t.transaction }));
    });
    accounts = accounts.map(function (t) { return (__assign({}, t, { name: { en: t.name }, "count": Math.abs(t.amount), "sum": Math.abs(t.balance), "avg": Math.abs(t.balance), "std": Math.abs(t.balance) })); });
    var theTransactions = [];
    var curDate = new Date();
    var facts = [];
    var periods = [];
    switch (storyId) {
        case "72154aa7-d6b9-4f8e-b40d-a292cd0c167f":
            theTransactions = transactions.filter(function (t) { return t.Mode === "Out"; });
            theTransactions = theTransactions.filter(function (item, idx) {
                return theTransactions.filter(function (a, i) {
                    return i !== idx && a.amount == item.amount && a.transaction === item.transaction &&
                        (new Date(a.date)).getTime() === (new Date(item.date)).getTime() &&
                        (new Date(a.date)).getMonth() === curDate.getMonth() &&
                        (new Date(a.date)).getFullYear() === curDate.getFullYear();
                }).length + 1 > 1;
            });
            if (theTransactions.length) {
                theTransactions = common_1.groupBy(theTransactions, function (item) { return [item.amount, item.date, item.transaction]; });
                theTransactions = theTransactions.sort(function (a, b) { return a.length > b.length ? -1 : 1; })[0].map(function (t) {
                    return (__assign({}, t, { amount: Math.abs(t.amount) }));
                });
                insightsConfiguration_1.tablesForStory[insightsConfiguration_1.storyIdForInsightId[storyId]].map(function (table) {
                    return facts[table] = generateTable_1.default(table, theTransactions, accounts.filter(function (account) {
                        return theTransactions.filter(function (t) { return t.accountNumber === account.number; }).length > 0;
                    }));
                });
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
            for (var i = 0; i < 4; i++) {
                periods.push((new Date((new Date).setMonth(curDate.getMonth() - i)).getMonth() + 1).toString());
            }
            theTransactions = transactions.filter(function (t) { return t.Mode === "Out" && periods.indexOf(t.month.toString()) > -1; });
            insightsConfiguration_1.tablesForStory[insightsConfiguration_1.storyIdForInsightId[storyId]].map(function (table) {
                return facts[table] = generateTable_1.default(table, theTransactions, accounts.filter(function (account) {
                    return theTransactions.filter(function (t) { return t.accountNumber === account.number; }).length > 0;
                }), [["In"], ["Out"]], periods);
            });
            break;
        case "6b739292-bb50-4284-9d66-342de48403f2-b":
            for (var i = 0; i < 4; i++) {
                periods.push((new Date((new Date).setMonth(curDate.getMonth() - i)).getMonth() + 1).toString());
            }
            theTransactions = transactions.filter(function (t) { return t.Mode === "In" && periods.indexOf(t.month.toString()) > -1; });
            insightsConfiguration_1.tablesForStory[insightsConfiguration_1.storyIdForInsightId[storyId]].map(function (table) {
                return facts[table] = generateTable_1.default(table, theTransactions, accounts.filter(function (account) {
                    return theTransactions.filter(function (t) { return t.accountNumber === account.number; }).length > 0;
                }), [["In"], ["Out"]], periods);
            });
            break;
        default:
            break;
    }
    return facts;
};
