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
    transactions = transactions.map(function (t) { return (__assign({}, t, { date: new Date(t.date), month: (new Date(t.date).getMonth() + 1).toString(), mode: t.Mode, categoryGroup: { en: t.categoryDescription }, categoryDescription: { en: t.categoryDescription }, device: t.transaction, bizCategory: { en: t.categoryDescription } })); });
    accounts = accounts.map(function (t) { return (__assign({}, t, { name: { en: t.name }, accountNumber: t.number, "count": Math.abs(t.amount), "sum": Math.abs(t.balance), "avg": Math.abs(t.balance), "std": Math.abs(t.balance) })); });
    var theTransactions = [];
    var theAccounts = [];
    var curDate = new Date();
    var facts = {};
    var periods = [];
    var per = Math.floor(Math.random() * 3) + 5;
    for (var i = 1; i < per; i++) {
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
                            new Date(a.date).getTime()) / (1000 * 3600 * 24)) <= 4;
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
                return facts[table] = generateTable_1.default(table, transactions, accounts, [["In"], ["Out"]], periods);
            });
            break;
        case "6b739292-bb50-4284-9d66-342de48403f2":
            theTransactions = transactions.filter(function (t) {
                return t.Mode === "Out" && periods.indexOf(t.month.toString()) > -1;
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
        case "6b739292-bb50-4284-9d66-342de48403f2-b":
            theTransactions = transactions.filter(function (t) { return t.Mode === "In" && periods.indexOf(t.month.toString()) > -1; });
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
        case "66b719da-5a83-433b-bd82-c8ed2ca1685c":
            theTransactions = transactions.filter(function (t) {
                return t.Mode === "In" && t.type === "DepositCheck" &&
                    Math.ceil(Math.abs(new Date().getTime() -
                        new Date(t.date).getTime()) / (1000 * 3600 * 24)) <= 4;
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
        case "c71202e6-46b8-42ec-ba53-5dc25d6db393":
            theTransactions = transactions.filter(function (t) { return t.type === "PostedCheck" &&
                t.Mode === "Out" && Math.ceil(Math.abs(new Date().getTime() -
                new Date(t.date).getTime()) / (1000 * 3600 * 24)) <= 2; });
            theTransactions = theTransactions.sort(function (a, b) { return -1 * a.date.getTime() - b.date.getTime(); }).reverse();
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
        case "b6b765af-0378-4413-a4f3-aa83d816d586":
            theTransactions = transactions.filter(function (t) { return t.mode === "Out"; });
            var categories_1 = theTransactions.map(function (t) { return t.categoryDescription.en; });
            var categoryDescriptions = categories_1.filter(function (t, i) { return t && t !== "null" && categories_1.indexOf(t) === i; });
            var selectedCategory_1 = categoryDescriptions[Math.floor(Math.random() * categoryDescriptions.length)];
            theTransactions = theTransactions.filter(function (t) { return t.categoryDescription.en === selectedCategory_1; });
            theAccounts = accounts.filter(function (account) {
                return theTransactions.filter(function (t) { return t.accountNumber === account.number; }).length > 0;
            });
            if (theTransactions.length && theAccounts.length) {
                var selectedAccount_1 = theAccounts[Math.floor(Math.random() * theAccounts.length)];
                theTransactions = theTransactions.filter(function (t) {
                    var usrYear, usrMonth = new Date(t.date).getMonth() + 1;
                    var curYear, curMonth = curDate.getMonth() + 1;
                    if ((usrYear = new Date(t.date).getFullYear()) < (curYear = curDate.getFullYear())) {
                        curMonth += (curYear - usrYear) * 12;
                    }
                    var diffMonths = curMonth - usrMonth;
                    return t.accountNumber === selectedAccount_1.number && diffMonths && diffMonths <= periods.length;
                });
                insightsConfiguration_1.tablesForStory[insightsConfiguration_1.storyIdForInsightId[storyId]].map(function (table) {
                    return facts[table] = generateTable_1.default(table, theTransactions, [selectedAccount_1], [["In"], ["Out"]], periods, selectedCategory_1);
                });
            }
            else {
                throw "error";
            }
            break;
        case "22741535-e6d1-4aa3-93de-a021efb8f34c":
            theTransactions = transactions.filter(function (t) { return t.mode === "Out" && (new Date(t.date)).getDate() === (new Date()).getDate(); });
            theTransactions = common_1.groupBy(theTransactions, function (item) { return [item.transaction]; });
            var p_1 = [1, 2, 3];
            theTransactions = theTransactions.filter(function (a) { return !p_1.filter(function (pp) { return !a.find(function (t) {
                var usrYear, usrMonth = new Date(t.date).getMonth() + 1;
                var curYear, curMonth = curDate.getMonth() + 1;
                if ((usrYear = new Date(t.date).getFullYear()) < (curYear = curDate.getFullYear())) {
                    curMonth += (curYear - usrYear) * 12;
                }
                var diffMonths = curMonth - usrMonth;
                return diffMonths === pp;
            }); }).length; });
            theTransactions.sort(function (a, b) { return b.length - a.length; });
            theTransactions = theTransactions[0];
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
               case "7221df03-f2e3-421e-8667-eea0c6b7c7a5":
            transactions = transactions.map(t => ({...t , categoryDescription: t.categoryDescription.en}));
            theTransactions = groupBy(transactions.filter(t => t.Mode === "Out" && t.categoryDescription && t.categoryDescription !== "null") , item => [item.categoryDescription]);
            theTransactions = theTransactions.map(t => groupBy(t , item =>
                [(new Date(item.date)).getMonth() , (new Date(item.date)).getFullYear()]));
            theTransactions = theTransactions.map(theT => theT.filter(theTransactions_0 => {
                const curDate = new Date();
                let t = theTransactions_0[0];
                let usrYear , usrMonth = new Date(t.date).getMonth() + 1;
                let curYear , curMonth = curDate.getMonth() + 1;
                if ((usrYear = new Date(t.date).getFullYear()) < (curYear = curDate.getFullYear())) {
                    curMonth += (curYear - usrYear) * 12;
                }
                let diffMonths = curMonth - usrMonth;
                return diffMonths && diffMonths < 4

            }));
            const peri = [2 , 3 , 4];
            theTransactions = theTransactions.map(theTransaction => theTransaction.length && theTransaction[0][0]? ({
                theTransactions: theTransaction ,
                categoryDescription: theTransaction[0][0].categoryDescription ,
                avg: peri.map(p => {
                    var trans = theTransaction.filter(theTransactions_0 => {
                        const curDate = new Date();
                        let t = theTransactions_0[0];
                        let usrYear , usrMonth = new Date(t.date).getMonth() + 1;
                        let curYear , curMonth = curDate.getMonth() + 1;
                        if ((usrYear = new Date(t.date).getFullYear()) < (curYear = curDate.getFullYear())) {
                            curMonth += (curYear - usrYear) * 12;
                        }
                        let diffMonths = curMonth - usrMonth;
                        return diffMonths === p;

                    });
                    return trans.length ? trans[0].map(t => +t.amount).reduce((a , b) => a + b) : 0;
                }).reduce((a , b) => a + b) / peri.length
            }): theTransaction);
            theTransactions = theTransactions.map(tt => {
                const lastTr = tt.theTransactions? tt.theTransactions.filter(theTransactions_0 => {
                    const curDate = new Date();
                    let t = theTransactions_0[0];
                    let usrYear , usrMonth = new Date(t.date).getMonth() + 1;
                    let curYear , curMonth = curDate.getMonth() + 1;
                    if ((usrYear = new Date(t.date).getFullYear()) < (curYear = curDate.getFullYear())) {
                        curMonth += (curYear - usrYear) * 12;
                    }
                    let diffMonths = curMonth - usrMonth;
                    return diffMonths === 1;

                }): [];
                return {
                    sum: lastTr.length ? lastTr[0].map(a => +a.amount).reduce((a , b) => a + b) : 0 ,
                    categoryDescription: tt.categoryDescription ,
                    Difference: lastTr.length ? lastTr[0].map(a => +a.amount).reduce((a , b) => a + b) - tt.avg : 0 ,
                    avg: tt.avg
                }
            });
            theTransactions = theTransactions.sort((a , b) => a.Difference - b.Difference);
            let selectedCat;
            if (theTransactions.length) {
                selectedCat = theTransactions[0].categoryDescription;
            } else {
                throw "error";
            }
            theTransactions = transactions.filter(t => t.mode === "Out" && t.categoryDescription === selectedCat);
            theAccounts = accounts.filter(account =>
                theTransactions.filter(t => t.accountNumber === account.number).length > 0);
            if (theTransactions.length && theAccounts.length) {
                tablesForStory[storyIdForInsightId[storyId]].map(table =>
                    facts[table] = generateTble(table , theTransactions , theAccounts , [["In"] , ["Out"]] , periods , selectedCat));
            } else {
                throw "error";
            }
            break;
        case "66b719da-5a83-433b-bd82-c8ed22222222":
            var orderChecks_1 = transactions.filter(function (t) { return t.type === 'OrderChecks'; }).sort(function (a, b) { return -1 * a.date.getTime() - b.date.getTime(); });
            orderChecks_1 = orderChecks_1.length ? orderChecks_1[0] : null;
            theTransactions = orderChecks_1 ? transactions.filter(function (t) { return t.type === 'PostedCheck' && t.date.getTime() > orderChecks_1.date.getTime(); }) : [];
            theAccounts = accounts.filter(function (account) {
                return theTransactions.filter(function (t) { return t.accountNumber === account.number; }).length > 0;
            });
            if (theTransactions.length && theAccounts.length) {
                insightsConfiguration_1.tablesForStory[insightsConfiguration_1.storyIdForInsightId[storyId]].map(function (table) {
                    return facts[table] = generateTable_1.default(table, theTransactions, theAccounts, [["In"], ["Out"]], periods, '', orderChecks_1);
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
