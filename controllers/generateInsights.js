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
var InsightsMessages_1 = require("../models/InsightsMessages");
var insightsConfiguration_1 = require("../models/insightsConfiguration");
var common_1 = require("./common");
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
            blockId: "date",
            type: "date-box",
            date: curDate
        },
        {
            blockId: "title",
            type: "txt",
            text: InsightsMessages_1.default[lang][id]["title"]
        },
        {
            blockId: "teaser-text",
            type: "txt",
            text: InsightsMessages_1.default[lang][id]["teaser-text"]
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
    teaser[3].text = teaser[3].text.replace("{{transaction}}", value.transaction);
    return __assign({}, generqateInsights(id), { teaserTemplate: "doubleBox", teaserBlocks: teaser.concat([
            {
                blockId: "box-label1",
                type: "txt",
                text: InsightsMessages_1.default[lang][id]["box-label1"]
            },
            {
                blockId: "box-value1",
                type: "txt",
                text: length
            },
            {
                blockId: "box-label2",
                type: "txt",
                text: InsightsMessages_1.default[lang][id]["box-label2"]
            },
            {
                blockId: "box-value2",
                type: "txt",
                text: "\u20AA" + Math.abs(+value.amount)
            }
        ]), score: 26.0, category1: "", category2: "", category3: "" });
};
var generqateInsight85c = function (id, transactions, BankURL, lang) {
    var curDate = new Date();
    return __assign({}, generqateInsights(id), { teaserTemplate: "image", teaserBlocks: teaserBlocks(id, lang, curDate).concat([
            {
                blockId: "main-image",
                type: "image",
                url: BankURL,
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
                        label: "" + (InsightsMessages_1.default[lang][id]["sign"] + Math.round(+amount.amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")),
                        value: Math.abs(amount.amount)
                    }); })],
                categories: transactions.map(function (amount) {
                    return new Date(amount.date).getDate() + " " + month_1.default[lang][+amount.month - 1];
                }),
                accessibilityCategories: transactions.map(function (amount) {
                    return new Date(amount.date).getDate() + " " + month_1.default[lang][+amount.month + 1];
                }),
                seriesLabels: transactions.map(function (amount) { return "" + (InsightsMessages_1.default[lang][id]["sign"] + Math.round(+amount.amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")); })
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
                        label: "" + (InsightsMessages_1.default[lang][id]["sign"] + Math.round(+amount.amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")),
                        value: Math.abs(amount.amount)
                    }); })],
                categories: transactions.map(function (amount) {
                    return new Date(amount.date).getDate() + " " + month_1.default[lang][+amount.month - 1];
                }),
                accessibilityCategories: transactions.map(function (amount) {
                    return new Date(amount.date).getDate() + " " + month_1.default[lang][+amount.month + 1];
                }),
                seriesLabels: transactions.map(function (amount) { return "" + (InsightsMessages_1.default[lang][id]["sign"] + Math.round(+amount.amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")); })
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
                alt: InsightsMessages_1.default[lang][id]["main-image"]
            }
        ]), score: 50, category1: "smiley_face", category2: "Spending", category3: "Information" });
};
var generqateInsight372 = function (id, transactions, lang) {
    var curDate = new Date();
    var teaser = teaserBlocks(id, lang, curDate);
    teaser[3].text = teaser[3].text.replace("{{month}}", month_1.default[lang][curDate.getMonth()]);
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
                    InsightsMessages_1.default[lang][id]["in"],
                    InsightsMessages_1.default[lang][id]["out"]
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
exports.default = function (id, transactions, BankURL, lang) {
    var amount;
    var curDate = new Date();
    var prevDate = new Date((new Date).setMonth(curDate.getMonth() - 1));
    switch (id) {
        case "72154aa7-d6b9-4f8e-b40d-a292cd0c167f":
            amount = transactions.filter(function (t) { return t.Mode === "Out"; });
            var length_1 = 0;
            var value = amount.find(function (item, idx) {
                return (length_1 = amount.filter(function (a, i) {
                    return i !== idx && a.amount == item.amount && a.transaction === item.transaction &&
                        (new Date(a.date)).getTime() === (new Date(item.date)).getTime() &&
                        (new Date(a.date)).getMonth() === curDate.getMonth() &&
                        (new Date(a.date)).getFullYear() === curDate.getFullYear();
                }).length + 1) > 1;
            });
            return length_1 > 1 ? generqateInsight67f(id, transactions, value, length_1, lang) : null;
        case "66b719da-5a83-433b-bd82-c8ed2ca1685c":
            amount = transactions.filter(function (t) { return t.type === "DepositCheck" && new Date(t.date).getMonth() === curDate.getMonth() &&
                (new Date(t.date)).getFullYear() === curDate.getFullYear(); });
            return amount.length ? generqateInsight85c(id, amount, BankURL, lang) : null;
        case "0ebf81f1-273a-47b2-ae66-59fc50520da0":
            amount = transactions.filter(function (t) {
                return t.categoryDescription === "Salary";
            });
            return amount.find(function (t) {
                return (new Date(t.date)).getMonth() === curDate.getMonth() &&
                    (new Date(t.date)).getFullYear() === curDate.getFullYear();
            }) ?
                generqateInsightda0(id, amount, lang) : null;
        case "16052c32-574b-4a15-882e-0286e4d64fe0":
            amount = transactions.filter(function (t) { return t.Mode === "In" && t.categoryDescription === "Government"; });
            return amount.find(function (t) {
                return (new Date(t.date)).getMonth() === curDate.getMonth() &&
                    (new Date(t.date)).getFullYear() === curDate.getFullYear();
            }) ?
                generqateInsightfe0(id, amount, lang) : null;
        case "147443c7-7be1-4f68-8ff3-ce65e992c22c":
            return generqateInsight22c(id, amount, lang);
        case "d1e567b3-262f-4da8-bb46-dbd4c132f372":
            amount = [
                transactions.filter(function (t) {
                    return (new Date(t.date)).getMonth() === curDate.getMonth() &&
                        (new Date(t.date)).getFullYear() === curDate.getFullYear();
                }),
                transactions.filter(function (t) {
                    return (new Date(t.date)).getMonth() === prevDate.getMonth() &&
                        (new Date(t.date)).getFullYear() === prevDate.getFullYear();
                })
            ];
            return amount[0].length && amount[1].length ? generqateInsight372(id, amount, lang) : null;
        case "6b739292-bb50-4284-9d66-342de48403f2":
            var filterOutTansaction = common_1.groupBy(transactions.filter(function (t) {
                return t.Mode === "Out" &&
                    (new Date(t.date)).getMonth() === curDate.getMonth() &&
                    (new Date(t.date)).getFullYear() === curDate.getFullYear();
            }), function (item) { return [item.categoryDescription]; });
            var sortedFilterOutTransactions = filterOutTansaction.map(function (tran) { return ({
                category: tran[0].categoryDescription,
                value: Math.abs(tran.map(function (t) { return +t.amount; }).reduce(function (a, b) { return a + b; }))
            }); }).sort(function (a, b) { return a.value > b.value ? -1 : 1; });
            return sortedFilterOutTransactions.length ? generqateInsight3f2(id, sortedFilterOutTransactions, lang) : null;
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
            return sortedFilterInTransactions.length ? generqateInsight3f2B(id, sortedFilterInTransactions, lang) : null;
        default:
            break;
    }
};
// const generqateInsight3f2 = (id , transactions , lang) => {
//     const curDate = new Date();
//     return {
//         ...generqateInsights(id) ,
//         teaserTemplate: "pinChart" ,
//         teaserBlocks: [
//             ...teaserBlocks(id , lang , curDate) ,
//             {
//                 blockId: "chart" ,
//                 type: "pin-chart" ,
//                 class: "teaser-body" ,
//                 direction: "vertical" ,
//                 series: [transactions.map((amount: any) => ({
//                     label: `${insightsMessages[lang][id]["sign"] + Math.round(+amount.amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g , ",")}` ,
//                     value: amount.amount
//                 }))] ,
//                 categories: transactions.map((amount: any) =>
//                     `${new Date(amount.date).getDate()} ${monthNames[lang][+amount.month - 1]}`) ,
//                 accessibilityCategories: transactions.map((amount: any) =>
//                     `${new Date(amount.date).getDate()} ${monthNames[lang][+amount.month + 1]}`) ,
//                 seriesLabels: transactions.map((amount: any) => `${insightsMessages[lang][id]["sign"] + Math.round(+amount.amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g , ",")}`)
//             }
//         ] ,
//         score: 13 ,
//         category1: "" ,
//         category2: "" ,
//         category3: "" ,
//     };
// }
//
// const generqateInsightea7 = (id , transactions , lang) => {
//     const curDate = new Date();
//     return {
//         ...generqateInsights(id) ,
//         teaserTemplate: "verticalBar" ,
//         teaserBlocks: [
//             ...teaserBlocks(id , lang , curDate) ,
//             {
//                 blockId: "chart" ,
//                 type: "bar-chart" ,
//                 class: "teaser-body" ,
//                 series: [
//                     [
//                         {
//                             "value": 170.18
//                         } ,
//                         {
//                             "value": 167.71
//                         } ,
//                         {
//                             "value": 148.88999999999996
//                         } ,
//                         {
//                             "value": 191.67
//                         }
//                     ]
//                 ] ,
//                 "direction": "vertical" ,
//                 "categories": [
//                     "Apr" ,
//                     "May" ,
//                     "Jun" ,
//                     "Jul"
//                 ] ,
//                 "accessibilityCategories": [
//                     "Apr" ,
//                     "May"
//                 ] ,
//                 "seriesLabels": [
//                     ""
//                 ]
//             }
//         ] ,
//         score: 21 ,
//         category1: "" ,
//         category2: "" ,
//         category3: "" ,
//     };
// }
//
// const generqateInsight729 = (id , transactions , lang) => {
//     const curDate = new Date();
//     return {
//         ...generqateInsights(id) ,
//         teaserTemplate: "pinChart" ,
//         teaserBlocks: [
//             ...teaserBlocks(id , lang , curDate) ,
//             {
//                 blockId: "chart" ,
//                 type: "pin-chart" ,
//                 class: "teaser-body" ,
//                 direction: "vertical" ,
//                 series: [transactions.map((amount: any) => ({
//                     label: `${insightsMessages[lang][id]["sign"] + Math.round(+amount.amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g , ",")}` ,
//                     value: amount.amount
//                 }))] ,
//                 categories: transactions.map((amount: any) =>
//                     `${new Date(amount.date).getDate()} ${monthNames[lang][+amount.month - 1]}`) ,
//                 accessibilityCategories: transactions.map((amount: any) =>
//                     `${new Date(amount.date).getDate()} ${monthNames[lang][+amount.month + 1]}`) ,
//                 seriesLabels: transactions.map((amount: any) => `${insightsMessages[lang][id]["sign"] + Math.round(+amount.amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g , ",")}`)
//             }
//         ] ,
//         score: 13 ,
//         category1: "" ,
//         category2: "" ,
//         category3: "" ,
//     };
// }
// const generqateInsightfb4 = (id , transactions , lang) => {
//     const curDate = new Date();
//     return {
//         ...generqateInsights(id) ,
//         teaserTemplate: "pinChart" ,
//         teaserBlocks: [
//             ...teaserBlocks(id , lang , curDate) ,
//             {
//                 blockId: "chart" ,
//                 type: "pin-chart" ,
//                 class: "teaser-body" ,
//                 direction: "vertical" ,
//                 series: [transactions.map((amount: any) => ({
//                     label: `${insightsMessages[lang][id]["sign"] + Math.round(+amount.amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g , ",")}` ,
//                     value: amount.amount
//                 }))] ,
//                 categories: transactions.map((amount: any) =>
//                     `${new Date(amount.date).getDate()} ${monthNames[lang][+amount.month - 1]}`) ,
//                 accessibilityCategories: transactions.map((amount: any) =>
//                     `${new Date(amount.date).getDate()} ${monthNames[lang][+amount.month + 1]}`) ,
//                 seriesLabels: transactions.map((amount: any) => `${insightsMessages[lang][id]["sign"] + Math.round(+amount.amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g , ",")}`)
//             }
//         ] ,
//         score: 13 ,
//         category1: "" ,
//         category2: "" ,
//         category3: "" ,
//     };
// }
//
// const generqateInsight7a5 = (id , transactions , lang) => {
//     const curDate = new Date();
//     return {
//         ...generqateInsights(id) ,
//         teaserTemplate: "pinChart" ,
//         teaserBlocks: [
//             ...teaserBlocks(id , lang , curDate) ,
//             {
//                 blockId: "chart" ,
//                 type: "pin-chart" ,
//                 class: "teaser-body" ,
//                 direction: "vertical" ,
//                 series: [transactions.map((amount: any) => ({
//                     label: `${insightsMessages[lang][id]["sign"] + Math.round(+amount.amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g , ",")}` ,
//                     value: amount.amount
//                 }))] ,
//                 categories: transactions.map((amount: any) =>
//                     `${new Date(amount.date).getDate()} ${monthNames[lang][+amount.month - 1]}`) ,
//                 accessibilityCategories: transactions.map((amount: any) =>
//                     `${new Date(amount.date).getDate()} ${monthNames[lang][+amount.month + 1]}`) ,
//                 seriesLabels: transactions.map((amount: any) => `${insightsMessages[lang][id]["sign"] + Math.round(+amount.amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g , ",")}`)
//             }
//         ] ,
//         score: 13 ,
//         category1: "" ,
//         category2: "" ,
//         category3: "" ,
//     };
// }
//
// const generqateInsight393 = (id , transactions , lang) => {
//     const curDate = new Date();
//     return {
//         ...generqateInsights(id) ,
//         teaserTemplate: "pinChart" ,
//         teaserBlocks: [
//             ...teaserBlocks(id , lang , curDate) ,
//             {
//                 blockId: "chart" ,
//                 type: "pin-chart" ,
//                 class: "teaser-body" ,
//                 direction: "vertical" ,
//                 series: [transactions.map((amount: any) => ({
//                     label: `${insightsMessages[lang][id]["sign"] + Math.round(+amount.amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g , ",")}` ,
//                     value: amount.amount
//                 }))] ,
//                 categories: transactions.map((amount: any) =>
//                     `${new Date(amount.date).getDate()} ${monthNames[lang][+amount.month - 1]}`) ,
//                 accessibilityCategories: transactions.map((amount: any) =>
//                     `${new Date(amount.date).getDate()} ${monthNames[lang][+amount.month + 1]}`) ,
//                 seriesLabels: transactions.map((amount: any) => `${insightsMessages[lang][id]["sign"] + Math.round(+amount.amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g , ",")}`)
//             }
//         ] ,
//         score: 13 ,
//         category1: "" ,
//         category2: "" ,
//         category3: "" ,
//     };
// }
