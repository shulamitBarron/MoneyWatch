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
var month_1 = require("../models/month");
var insightsConfiguration_1 = require("../models/insightsConfiguration");
var common_1 = require("./common");
var insightsMessages = {};
var generateCategory = function (sortedFilterTransactions) {
    var index = 0;
    var blocks = [];
    var sum = sortedFilterTransactions.map(function (s) { return +s.value; }).reduce(function (a, b) { return a + b; });
    for (index = 0; index < 3 && index < sortedFilterTransactions.length; index++) {
        blocks.push.apply(blocks, [{
                blockId: "chart" + (index + 1),
                type: "pie-chart",
                var: "selectedCategoryRow" + (index + 1),
                centerText: Math.floor(sortedFilterTransactions[index].value * 100 / sum) + "%",
                slices: sortedFilterTransactions.map(function (transaction, i) { return (__assign({ highlight: i === index }, transaction)); })
            }, {
                blockId: "label" + (index + 1),
                type: "txt",
                text: sortedFilterTransactions[index].category
            }]);
    }
    return blocks;
};
var teaserBlocks = function (id, lang, curDate) {
    return [
        {
            blockId: "icon",
            url: "-",
            type: "image",
            alt: "-"
        },
        {
            blockId: "title",
            type: "txt",
            text: insightsMessages[lang][id]["title"]
        },
        {
            blockId: "teaser-text",
            type: "txt",
            text: insightsMessages[lang][id]["teaser-text"]
        }
    ];
};
var generqateInsights = function (id) {
    var curDate = new Date();
    return {
        id: id,
        generatedDate: curDate,
        useCaseId: insightsConfiguration_1.storyIdForInsightId[id],
        insightId: insightsConfiguration_1.storyIdForInsightId[id].split("_UC", 1)[0],
        presentedDate: curDate,
        insightType: "STORY",
        type: "inform",
        selectedDate: curDate,
        highlighted: true,
        status: "read"
    };
};
var generqateInsight67f = function (id, transactions, value, length, lang) {
    var curDate = new Date();
    var teaser = teaserBlocks(id, lang, curDate);
    teaser[2].text = teaser[2].text.replace("{{transaction}}", value.transaction);
    return __assign({}, generqateInsights(id), { teaserTemplate: "doubleBox", teaserBlocks: teaser.concat([
            {
                blockId: "box-label1",
                type: "txt",
                text: insightsMessages[lang][id]["box-label1"]
            },
            {
                blockId: "box-value1",
                type: "txt",
                text: length
            },
            {
                blockId: "box-label2",
                type: "txt",
                text: insightsMessages[lang][id]["box-label2"]
            },
            {
                blockId: "box-value2",
                type: "txt",
                text: "\u20AA" + Math.abs(+value.amount)
            }
        ]), score: 26.0, category1: "", category2: "", category3: "" });
};
var generqateInsight85c = function (id, transactions, lang) {
    var curDate = new Date();
    return __assign({}, generqateInsights(id), { teaserTemplate: "image", teaserBlocks: teaserBlocks(id, lang, curDate).concat([
            {
                blockId: "main-image",
                type: "image",
                url: insightsMessages[lang][id]["main-image"],
                alt: "Mobile Banking"
            }
        ]), score: 26.0, category1: "Information", category2: "Spending", category3: "money_in" });
};
var generqateInsightda0 = function (id, transactions, lang) {
    var curDate = new Date();
    return __assign({}, generqateInsights(id), { teaserTemplate: "pinChart", teaserBlocks: teaserBlocks(id, lang, curDate).concat([
            {
                blockId: "chart",
                type: "pin-chart",
                class: "teaser-body",
                direction: "vertical",
                series: [transactions.map(function (amount) { return ({
                        label: "" + (insightsMessages[lang][id]["sign"] + Math.round(+amount.amount).toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")),
                        value: Math.abs(amount.amount)
                    }); })],
                categories: transactions.map(function (amount) {
                    return new Date(amount.date).getDate() + " " + month_1.default[lang][+amount.month];
                }),
                accessibilityCategories: transactions.map(function (amount) {
                    return new Date(amount.date).getDate() + " " + month_1.default[lang][+amount.month];
                }),
                seriesLabels: transactions.map(function (amount) { return "" + (insightsMessages[lang][id]["sign"] +
                    Math.round(+amount.amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")); })
            }
        ]), score: 15.0, category1: "", category2: "", category3: "" });
};
var generqateInsightfe0 = function (id, transactions, lang) {
    var curDate = new Date();
    return __assign({}, generqateInsights(id), { teaserTemplate: "pinChart", teaserBlocks: teaserBlocks(id, lang, curDate).concat([
            {
                blockId: "chart",
                type: "pin-chart",
                class: "teaser-body",
                direction: "vertical",
                series: [transactions.map(function (amount) { return ({
                        label: "" + (insightsMessages[lang][id]["sign"] + Math.round(+amount.amount).toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")),
                        value: Math.abs(amount.amount)
                    }); })],
                categories: transactions.map(function (amount) {
                    return new Date(amount.date).getDate() + " " + month_1.default[lang][+amount.month];
                }),
                accessibilityCategories: transactions.map(function (amount) {
                    return new Date(amount.date).getDate() + " " + month_1.default[lang][+amount.month];
                }),
                seriesLabels: transactions.map(function (amount) { return "" + (insightsMessages[lang][id]["sign"] +
                    Math.round(+amount.amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")); })
            }
        ]), score: 13, category1: "", category2: "", category3: "" });
};
var generqateInsight22c = function (id, transactions, lang) {
    var curDate = new Date();
    return __assign({}, generqateInsights(id), { teaserTemplate: "image", teaserBlocks: teaserBlocks(id, lang, curDate).concat([
            {
                blockId: "main-image",
                type: "image",
                url: "IntroducePersonetics",
                alt: insightsMessages[lang][id]["main-image"]
            }
        ]), score: 50, category1: "smiley_face", category2: "Spending", category3: "Information" });
};
var generqateInsight372 = function (id, transactions, lang) {
    var curDate = new Date();
    var teaser = teaserBlocks(id, lang, curDate);
    teaser[2].text = teaser[2].text.replace("{{month}}", month_1.default[lang][curDate.getMonth() - 1]);
    return __assign({}, generqateInsights(id), { teaserTemplate: "horizontalBar", teaserBlocks: teaser.concat([
            {
                blockId: "chart",
                type: "bar-chart",
                class: "teaser-body",
                direction: "horizontal",
                categories: transactions.map(function (transaction) {
                    return month_1.default[lang][(new Date(transaction[0].date)).getMonth()];
                }),
                series: transactions.map(function (transaction) {
                    var filterTransaction = common_1.groupBy(transaction, function (item) { return [item.Mode]; });
                    return [{
                            "value": filterTransaction[0] ?
                                Math.abs(filterTransaction[0].map(function (t) { return +t.amount; }).reduce(function (a, b) { return a + b; })) : 0
                        }, {
                            "value": filterTransaction[1] ?
                                Math.abs(filterTransaction[1].map(function (t) { return +t.amount; }).reduce(function (a, b) { return a + b; })) : 0
                        }];
                }),
                seriesLabels: [
                    insightsMessages[lang][id]["in"],
                    insightsMessages[lang][id]["out"]
                ],
                accessibilityCategories: transactions.map(function (transaction) {
                    return month_1.default[lang][(new Date(transaction[0].date)).getMonth()];
                })
            }
        ]), score: 7, category1: "in_out", category2: "Spending", category3: "money_in" });
};
var generqateInsight3f2 = function (id, sortedFilterTransactions, lang) {
    var curDate = new Date();
    return __assign({}, generqateInsights(id), { teaserTemplate: "pie", teaserBlocks: teaserBlocks(id, lang, curDate).concat(generateCategory(sortedFilterTransactions)), score: 3, category1: "spend_decrease" });
};
var generqateInsight3f2B = function (id, sortedFilterTransactions, lang) {
    var curDate = new Date();
    return __assign({}, generqateInsights(id), { teaserTemplate: "pie", teaserBlocks: teaserBlocks(id, lang, curDate).concat(generateCategory(sortedFilterTransactions)), score: 3, category1: "spend_decrease" });
};
var generqateInsight393 = function (id, length, reduce, lang) {
    var curDate = new Date();
    return __assign({}, generqateInsights(id), { teaserTemplate: "doubleBox", teaserBlocks: teaserBlocks(id, lang, curDate).concat([
            {
                blockId: "box-label1",
                type: "txt",
                text: insightsMessages[lang][id]["box-label1"]
            },
            {
                blockId: "box-value1",
                type: "txt",
                text: length
            },
            {
                blockId: "box-label2",
                type: "txt",
                text: insightsMessages[lang][id]["box-label2"]
            },
            {
                blockId: "box-value2",
                type: "txt",
                text: "\u20AA" + Math.abs(Math.abs(reduce))
            }
        ]), score: 7, category1: "Information", category2: "", category3: "" });
};
var generqateInsight586 = function (id, amount, lang) {
    var curDate = new Date();
    return __assign({}, generqateInsights(id), { teaserTemplate: "image", teaserBlocks: teaserBlocks(id, lang, curDate).concat([
            {
                "blockId": "main-image",
                "type": "image",
                "url": insightsMessages[lang][id]["url"],
                "alt": "Quiz image"
            }
        ]), score: 7, category1: "", category2: "", category3: "" });
};
var generqateInsight34c = function (id, transactions, lang) {
    var curDate = new Date();
    return __assign({}, generqateInsights(id), { teaserTemplate: "pinChart", teaserBlocks: teaserBlocks(id, lang, curDate).concat([
            {
                "blockId": "chart",
                "type": "pin-chart",
                "class": "teaser-body",
                "direction": "vertical",
                series: [transactions.map(function (amount) { return ({
                        label: "" + (insightsMessages[lang][id]["sign"] + Math.round(+amount.amount).toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")),
                        value: Math.abs(amount.amount)
                    }); })],
                categories: transactions.map(function (amount) {
                    return new Date(amount.date).getDate() + " " + month_1.default[lang][+amount.month];
                }),
                accessibilityCategories: transactions.map(function (amount) {
                    return new Date(amount.date).getDate() + " " + month_1.default[lang][+amount.month];
                }),
                seriesLabels: transactions.map(function (amount) { return "" + (insightsMessages[lang][id]["sign"] +
                    Math.round(+amount.amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")); })
            }
        ]), score: 7, category1: "spend_decrease", category2: "", category3: "" });
};
function generqateInsight7a5(id, categoryDescription, lang) {
    var curDate = new Date();
    var teaser = teaserBlocks(id, lang, curDate);
    teaser[2].text = teaser[2].text.replace("{{categoryDescription}}", categoryDescription);
    teaser[2].text = teaser[2].text.replace("{{month}}", month_1.default[lang][curDate.getMonth() - 1]);
    return __assign({}, generqateInsights(id), { teaserTemplate: "image", teaserBlocks: teaser.concat([
            {
                "blockId": "main-image",
                "type": "image",
                "url": insightsMessages[lang][id]["url"],
                "alt": "Quiz image"
            }
        ]), score: 7, category1: "", category2: "", category3: "" });
}
var generqateInsight222 = function (id, transactions, lang) {
    var curDate = new Date();
    return __assign({}, generqateInsights(id), { teaserTemplate: "image", teaserBlocks: teaserBlocks(id, lang, curDate).concat([
            {
                blockId: "main-image",
                type: "image",
                url: insightsMessages[lang][id]["main-image"],
                alt: "Mobile Banking"
            }
        ]), score: 26.0, category1: "Information", category2: "Spending", category3: "money_in" });
};
exports.default = function (id, transactions, lang, messages) {
    insightsMessages = messages;
    var amount;
    var curDate = new Date();
    var prevDate = new Date((new Date).setMonth(curDate.getMonth() - 1));
    transactions = transactions.map(function (t) {
        return (__assign({}, t, { date: new Date(t.date), month: (new Date(t.date).getMonth()).toString(), mode: t.Mode }));
    });
    switch (id) {
        case "72154aa7-d6b9-4f8e-b40d-a292cd0c167f":
            amount = transactions.filter(function (t) { return t.Mode === "Out"; });
            var length_1 = 0;
            var value = amount.find(function (item, idx) {
                return (length_1 = amount.filter(function (a, i) {
                    return i !== idx && a.amount == item.amount && a.transaction === item.transaction &&
                        (new Date(a.date)).getTime() === (new Date(item.date)).getTime() &&
                        Math.ceil(Math.abs(new Date().getTime() -
                            new Date(a.date).getTime()) / (1000 * 3600 * 24)) <= 4;
                }).length + 1) > 1;
            });
            return length_1 > 1 ? generqateInsight67f(id, transactions, value, length_1, lang) : null;
        case "66b719da-5a83-433b-bd82-c8ed2ca1685c":
            amount = transactions.filter(function (t) {
                return t.type === "DepositCheck" && t.Mode === "In" &&
                    Math.ceil(Math.abs(new Date().getTime() -
                        new Date(t.date).getTime()) / (1000 * 3600 * 24)) <= 4;
            });
            return amount.length ? generqateInsight85c(id, amount, lang) : null;
        case "0ebf81f1-273a-47b2-ae66-59fc50520da0":
            amount = transactions.filter(function (t) {
                var usrYear, usrMonth = new Date(t.date).getMonth() + 1;
                var curYear, curMonth = curDate.getMonth() + 1;
                if ((usrYear = new Date(t.date).getFullYear()) < (curYear = curDate.getFullYear())) {
                    curMonth += (curYear - usrYear) * 12;
                }
                var diffMonths = curMonth - usrMonth;
                if (new Date(t.date).getDate() > curDate.getDate())
                    diffMonths--;
                return t.categoryDescription === "Salary" && t.Mode === "In" && diffMonths < 12;
            });
            amount = amount.sort(function (a, b) { return -1 * a.date.getTime() - b.date.getTime(); }).slice(0, 5).reverse();
            return amount.find(function (t) {
                return Math.ceil(Math.abs(new Date().getTime() -
                    new Date(t.date).getTime()) / (1000 * 3600 * 24)) <= 4;
            }) ?
                generqateInsightda0(id, amount, lang) : null;
        case "16052c32-574b-4a15-882e-0286e4d64fe0":
            amount = transactions.filter(function (t) {
                var usrYear, usrMonth = new Date(t.date).getMonth() + 1;
                var curYear, curMonth = curDate.getMonth() + 1;
                if ((usrYear = new Date(t.date).getFullYear()) < (curYear = curDate.getFullYear())) {
                    curMonth += (curYear - usrYear) * 12;
                }
                var diffMonths = curMonth - usrMonth;
                if (new Date(t.date).getDate() > curDate.getDate())
                    diffMonths--;
                return t.categoryDescription === "Government" && t.Mode === "In" && diffMonths < 12;
            });
            amount = amount.sort(function (a, b) { return -1 * a.date.getTime() - b.date.getTime(); }).slice(0, 5).reverse();
            return amount.find(function (t) {
                return Math.ceil(Math.abs(new Date().getTime() -
                    new Date(t.date).getTime()) / (1000 * 3600 * 24)) <= 4;
            }) ?
                generqateInsightfe0(id, amount, lang) : null;
        case "147443c7-7be1-4f68-8ff3-ce65e992c22c":
            return generqateInsight22c(id, amount, lang);
        case "d1e567b3-262f-4da8-bb46-dbd4c132f372":
            amount = [
                transactions.filter(function (t) {
                    var usrYear, usrMonth = new Date(t.date).getMonth() + 1;
                    var curYear, curMonth = curDate.getMonth() + 1;
                    if ((usrYear = new Date(t.date).getFullYear()) < (curYear = curDate.getFullYear())) {
                        curMonth += (curYear - usrYear) * 12;
                    }
                    var diffMonths = curMonth - usrMonth;
                    return diffMonths === 1;
                }),
                transactions.filter(function (t) {
                    var usrYear, usrMonth = new Date(t.date).getMonth() + 1;
                    var curYear, curMonth = curDate.getMonth() + 1;
                    if ((usrYear = new Date(t.date).getFullYear()) < (curYear = curDate.getFullYear())) {
                        curMonth += (curYear - usrYear) * 12;
                    }
                    var diffMonths = curMonth - usrMonth;
                    return diffMonths === 2;
                })
            ];
            return amount[0].length && amount[1].length && curDate.getDate() < 20 ? generqateInsight372(id, amount, lang) : null;
        case "6b739292-bb50-4284-9d66-342de48403f2":
            var filterOutTansaction = common_1.groupBy(transactions.filter(function (t) {
                var usrYear, usrMonth = new Date(t.date).getMonth() + 1;
                var curYear, curMonth = curDate.getMonth() + 1;
                if ((usrYear = new Date(t.date).getFullYear()) < (curYear = curDate.getFullYear())) {
                    curMonth += (curYear - usrYear) * 12;
                }
                var diffMonths = curMonth - usrMonth;
                return t.Mode === "Out" && diffMonths === 1;
            }), function (item) { return [item.categoryDescription]; });
            var sortedFilterOutTransactions = filterOutTansaction.map(function (tran) { return ({
                category: tran[0].categoryDescription,
                value: Math.abs(tran.map(function (t) { return +t.amount; }).reduce(function (a, b) { return a + b; }))
            }); }).sort(function (a, b) { return a.value > b.value ? -1 : 1; });
            return sortedFilterOutTransactions.length && curDate.getDate() < 20 ?
                generqateInsight3f2(id, sortedFilterOutTransactions, lang) : null;
        case "6b739292-bb50-4284-9d66-342de48403f2-b":
            var filterInTransaction = common_1.groupBy(transactions.filter(function (t) {
                return t.Mode === "In" &&
                    (new Date(t.date)).getMonth() === curDate.getMonth() &&
                    (new Date(t.date)).getFullYear() === curDate.getFullYear();
            }), function (item) { return [item.categoryDescription]; });
            var sortedFilterInTransactions = filterInTransaction.map(function (tran) { return ({
                category: tran[0].categoryDescription,
                value: Math.abs(tran.map(function (t) { return +t.amount; }).reduce(function (a, b) { return a + b; }))
            }); }).sort(function (a, b) { return a.value > b.value ? -1 : 1; });
            return sortedFilterInTransactions.length && curDate.getDate() < 20 ?
                generqateInsight3f2B(id, sortedFilterInTransactions, lang) : null;
        case "c71202e6-46b8-42ec-ba53-5dc25d6db393":
            amount = transactions.filter(function (t) { return t.type === "PostedCheck" &&
                t.Mode === "Out" && Math.ceil(Math.abs(new Date().getTime() -
                new Date(t.date).getTime()) / (1000 * 3600 * 24)) <= 2; });
            return amount.length ?
                generqateInsight393(id, amount.length, amount.map(function (t) { return +t.amount; }).reduce(function (a, b) { return a + b; }), lang) : null;
        case "b6b765af-0378-4413-a4f3-aa83d816d586":
            amount = transactions;
            return amount.length && curDate.getDate() % 3 === 2 ?
                generqateInsight586(id, amount, lang) : null;
        case "22741535-e6d1-4aa3-93de-a021efb8f34c":
            amount = transactions.filter(function (t) { return t.mode === "Out" && (new Date(t.date)).getDate() === (new Date()).getDate(); });
            amount = common_1.groupBy(amount, function (item) { return [item.transaction]; });
            var periods_1 = [1, 2, 3];
            amount = amount.filter(function (a) { return !periods_1.filter(function (pp) { return !a.find(function (t) {
                var usrYear, usrMonth = new Date(t.date).getMonth() + 1;
                var curYear, curMonth = curDate.getMonth() + 1;
                if ((usrYear = new Date(t.date).getFullYear()) < (curYear = curDate.getFullYear())) {
                    curMonth += (curYear - usrYear) * 12;
                }
                var diffMonths = curMonth - usrMonth;
                return diffMonths === pp;
            }); }).length; });
            amount.sort(function (a, b) { return b.length - a.length; });
            amount[0].sort(function (a, b) { return a.date.getTime() - b.date.getTime(); });
            return amount.length ?
                generqateInsight34c(id, amount[0], lang) : null;
        case "7221df03-f2e3-421e-8667-eea0c6b7c7a5":
            var theTransactions = common_1.groupBy(transactions.filter(function (t) { return t.Mode === "Out"; }), function (item) { return [item.categoryDescription]; });
            theTransactions = theTransactions.map(function (t) { return common_1.groupBy(t, function (item) {
                return [(new Date(item.date)).getMonth(), (new Date(item.date)).getFullYear()];
            }); });
            theTransactions = theTransactions.map(function (theT) { return theT.filter(function (theTransactions_0) {
                var curDate = new Date();
                var t = theTransactions_0[0];
                var usrYear, usrMonth = new Date(t.date).getMonth() + 1;
                var curYear, curMonth = curDate.getMonth() + 1;
                if ((usrYear = new Date(t.date).getFullYear()) < (curYear = curDate.getFullYear())) {
                    curMonth += (curYear - usrYear) * 12;
                }
                var diffMonths = curMonth - usrMonth;
                return diffMonths && diffMonths < 4;
            }); });
            var peri_1 = [2, 3, 4];
            theTransactions = theTransactions.map(function (theTransaction) { return ({
                theTransactions: theTransaction,
                categoryDescription: theTransaction[0][0].categoryDescription,
                avg: peri_1.map(function (p) {
                    var trans = theTransaction.filter(function (theTransactions_0) {
                        var curDate = new Date();
                        var t = theTransactions_0[0];
                        var usrYear, usrMonth = new Date(t.date).getMonth() + 1;
                        var curYear, curMonth = curDate.getMonth() + 1;
                        if ((usrYear = new Date(t.date).getFullYear()) < (curYear = curDate.getFullYear())) {
                            curMonth += (curYear - usrYear) * 12;
                        }
                        var diffMonths = curMonth - usrMonth;
                        return diffMonths === p;
                    });
                    return trans.length ? trans[0].map(function (t) { return +t.amount; }).reduce(function (a, b) { return a + b; }) : 0;
                }).reduce(function (a, b) { return a + b; }) / peri_1.length
            }); });
            theTransactions = theTransactions.map(function (tt) {
                var lastTr = tt.theTransactions.filter(function (theTransactions_0) {
                    var curDate = new Date();
                    var t = theTransactions_0[0];
                    var usrYear, usrMonth = new Date(t.date).getMonth() + 1;
                    var curYear, curMonth = curDate.getMonth() + 1;
                    if ((usrYear = new Date(t.date).getFullYear()) < (curYear = curDate.getFullYear())) {
                        curMonth += (curYear - usrYear) * 12;
                    }
                    var diffMonths = curMonth - usrMonth;
                    return diffMonths === 1;
                });
                return {
                    sum: lastTr.length ? lastTr[0].map(function (a) { return +a.amount; }).reduce(function (a, b) { return a + b; }) : 0,
                    categoryDescription: tt.categoryDescription,
                    Difference: lastTr.length ? lastTr[0].map(function (a) { return +a.amount; }).reduce(function (a, b) { return a + b; }) - tt.avg : 0,
                    avg: tt.avg
                };
            });
            theTransactions = theTransactions.sort(function (a, b) { return a.Difference - b.Difference; });
            return theTransactions.length && curDate.getDate() < 20 ?
                generqateInsight7a5(id, theTransactions[0].categoryDescription, lang) : null;
        case "66b719da-5a83-433b-bd82-c8ed22222222":
            var orderChecks_1 = transactions.filter(function (t) { return t.type === 'OrderChecks'; }).sort(function (a, b) { return -1 * a.date.getTime() - b.date.getTime(); });
            orderChecks_1 = orderChecks_1.length ? orderChecks_1[0] : null;
            theTransactions = orderChecks_1 ? transactions.filter(function (t) { return t.type === 'PostedCheck' && t.date.getTime() > orderChecks_1.date.getTime(); }) : [];
            return theTransactions.length > 20 ?
                generqateInsight222(id, theTransactions, lang) : null;
        default:
            break;
    }
};
