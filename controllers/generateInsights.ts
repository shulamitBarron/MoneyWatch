import monthNames from "../models/month";
import insightsMessages from "../models/InsightsMessages";
import {storyIdForInsightId} from "../models/insightsConfiguration"
import {groupBy} from "./common";

const generateCategory = (sortedFilterTransactions: { category: any; value: number }[]): any[] => {
    let index = 0;
    const blocks = [];
    const sum = sortedFilterTransactions.map(s => +s.value).reduce((a , b) => a + b);
    for (index = 0; index < 3 && index < sortedFilterTransactions.length; index++) {
        blocks.push(...[{
            blockId: `chart${index + 1}` ,
            type: "pie-chart" ,
            var: `selectedCategoryRow${index + 1}` ,
            centerText: `${Math.floor(sortedFilterTransactions[index].value * 100 / sum)}%` ,
            slices: sortedFilterTransactions.map((transaction , i) => ({highlight: i === index , ...transaction}))
        } , {
            blockId: `label${index + 1}` ,
            type: "txt" ,
            text: sortedFilterTransactions[index].category
        }])
    }
    return blocks;
}

const teaserBlocks = (id , lang , curDate): any[] => {
    return [
        {
            blockId: "icon" ,
            url: "-" ,
            type: "image" ,
            alt: "-"
        } ,
        {
            blockId: "date" ,
            type: "date-box" ,
            date: curDate
        } ,
        {
            blockId: "title" ,
            type: "txt" ,
            text: insightsMessages[lang][id]["title"]
        } ,
        {
            blockId: "teaser-text" ,
            type: "txt" ,
            text: insightsMessages[lang][id]["teaser-text"]
        }
    ];
};

const generqateInsights = (id) => {
    const curDate = new Date();
    return {
        id ,
        generatedDate: curDate ,
        useCaseId: storyIdForInsightId[id] ,
        insightId: storyIdForInsightId[id].split("_UC" , 1)[0] ,
        presentedDate: curDate ,
        insightType: "STORY" ,
        type: "inform" ,
        selectedDate: curDate ,
        highlighted: true ,
        status: "read"
    };
}

const generqateInsight67f = (id , transactions , value , length , lang) => {
    const curDate = new Date();
    const teaser = teaserBlocks(id , lang , curDate);
    teaser[3].text = teaser[3].text.replace("{{transaction}}" , value.transaction);
    return {
        ...generqateInsights(id) ,
        teaserTemplate: "doubleBox" ,
        teaserBlocks: [
            ...teaser ,
            {
                blockId: "box-label1" ,
                type: "txt" ,
                text: insightsMessages[lang][id]["box-label1"]
            } ,
            {
                blockId: "box-value1" ,
                type: "txt" ,
                text: length
            } ,
            {
                blockId: "box-label2" ,
                type: "txt" ,
                text: insightsMessages[lang][id]["box-label2"]
            } ,
            {
                blockId: "box-value2" ,
                type: "txt" ,
                text: `₪${Math.abs(+value.amount)}`
            }
        ] ,
        score: 26.0 ,
        category1: "" ,
        category2: "" ,
        category3: "" ,
    };
}

const generqateInsight85c = (id , transactions , BankURL , lang) => {
    const curDate = new Date();
    return {
        ...generqateInsights(id) ,
        teaserTemplate: "image" ,
        teaserBlocks: [
            ...teaserBlocks(id , lang , curDate) ,
            {
                blockId: "main-image" ,
                type: "image" ,
                url: BankURL ,
                alt: "Mobile Banking"
            }
        ] ,
        score: 26.0 ,
        category1: "Information" ,
        category2: "Spending" ,
        category3: "money_in" ,
    };
}

const generqateInsightda0 = (id , transactions: any[] , lang) => {
    const curDate = new Date();
    return {
        ...generqateInsights(id) ,
        teaserTemplate: "pinChart" ,
        teaserBlocks: [
            ...teaserBlocks(id , lang , curDate) ,
            {
                blockId: "chart" ,
                type: "pin-chart" ,
                class: "teaser-body" ,
                direction: "vertical" ,
                series: [transactions.map(amount => ({
                    label: `${insightsMessages[lang][id]["sign"] + Math.round(+amount.amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g , ",")}` ,
                    value: Math.abs(amount.amount)
                }))] ,
                categories: transactions.map(amount =>
                    `${new Date(amount.date).getDate()} ${monthNames[lang][+amount.month - 1]}`) ,
                accessibilityCategories: transactions.map(amount =>
                    `${new Date(amount.date).getDate()} ${monthNames[lang][+amount.month + 1]}`) ,
                seriesLabels: transactions.map(amount => `${insightsMessages[lang][id]["sign"] + Math.round(+amount.amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g , ",")}`)
            }
        ] ,
        score: 15.0 ,
        category1: "" ,
        category2: "" ,
        category3: "" ,
    };
}

const generqateInsightfe0 = (id , transactions , lang) => {
    const curDate = new Date();
    return {
        ...generqateInsights(id) ,
        teaserTemplate: "pinChart" ,
        teaserBlocks: [
            ...teaserBlocks(id , lang , curDate) ,
            {
                blockId: "chart" ,
                type: "pin-chart" ,
                class: "teaser-body" ,
                direction: "vertical" ,
                series: [transactions.map((amount: any) => ({
                    label: `${insightsMessages[lang][id]["sign"] + Math.round(+amount.amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g , ",")}` ,
                    value: Math.abs(amount.amount)
                }))] ,
                categories: transactions.map((amount: any) =>
                    `${new Date(amount.date).getDate()} ${monthNames[lang][+amount.month - 1]}`) ,
                accessibilityCategories: transactions.map((amount: any) =>
                    `${new Date(amount.date).getDate()} ${monthNames[lang][+amount.month + 1]}`) ,
                seriesLabels: transactions.map((amount: any) => `${insightsMessages[lang][id]["sign"] + Math.round(+amount.amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g , ",")}`)
            }
        ] ,
        score: 13 ,
        category1: "" ,
        category2: "" ,
        category3: "" ,
    };
}

const generqateInsight22c = (id , transactions , lang) => {
    const curDate = new Date();
    return {
        ...generqateInsights(id) ,
        teaserTemplate: "image" ,
        teaserBlocks: [
            ...teaserBlocks(id , lang , curDate) ,
            {
                blockId: "main-image" ,
                type: "image" ,
                url: "IntroducePersonetics" ,
                alt: insightsMessages[lang][id]["main-image"]
            }
        ] ,
        score: 50 ,
        category1: "smiley_face" ,
        category2: "Spending" ,
        category3: "Information" ,
    };
}

const generqateInsight372 = (id , transactions , lang) => {
    const curDate = new Date();
    const teaser = teaserBlocks(id , lang , curDate);
    teaser[3].text = teaser[3].text.replace("{{month}}" , monthNames[lang][curDate.getMonth()]);
    return {
        ...generqateInsights(id) ,
        teaserTemplate: "horizontalBar" ,
        teaserBlocks: [
            ...teaser ,
            {
                blockId: "chart" ,
                type: "bar-chart" ,
                class: "teaser-body" ,
                direction: "horizontal" ,
                categories: transactions.map(transaction =>
                    monthNames[lang][(new Date(transaction[0].date)).getMonth()]) ,
                series: transactions.map(transaction => {
                    const filterTransaction = groupBy(transaction , item => [item.Mode]);
                    return [{
                        "value": filterTransaction[0] ?
                            Math.abs(filterTransaction[0].map(t => +t.amount).reduce((a , b) => a + b)) : 0
                    } , {
                        "value": filterTransaction[1] ?
                            Math.abs(filterTransaction[1].map(t => +t.amount).reduce((a , b) => a + b)) : 0
                    }];
                })
                ,
                seriesLabels: [
                    insightsMessages[lang][id]["in"] ,
                    insightsMessages[lang][id]["out"]
                ] ,
                accessibilityCategories: transactions.map(transaction =>
                    monthNames[lang][(new Date(transaction[0].date)).getMonth()])
            }
        ] ,
        score: 7 ,
        category1: "in_out" ,
        category2: "Spending" ,
        category3: "money_in" ,
    };
}

const generqateInsight3f2 = (id , sortedFilterTransactions , lang) => {
    const curDate = new Date();

    return {
        ...generqateInsights(id) ,
        teaserTemplate: "pie" ,
        teaserBlocks: [
            ...teaserBlocks(id , lang , curDate) ,
            ...generateCategory(sortedFilterTransactions)
        ] ,
        score: 3 ,
        category1: "spend_decrease"
    };
}

const generqateInsight3f2B = (id , sortedFilterTransactions , lang) => {
    const curDate = new Date();

    return {
        ...generqateInsights(id) ,
        teaserTemplate: "pie" ,
        teaserBlocks: [
            ...teaserBlocks(id , lang , curDate) ,
            ...generateCategory(sortedFilterTransactions)
        ] ,
        score: 3 ,
        category1: "spend_decrease"
    };
}

export default (id , transactions: any , BankURL , lang) => {
    let amount;
    const curDate = new Date();
    const prevDate = new Date((new Date).setMonth(curDate.getMonth() - 1));
    switch (id) {
        case "72154aa7-d6b9-4f8e-b40d-a292cd0c167f":
            amount = transactions.filter((t: any) => t.Mode === "Out");
            let length = 0;
            const value = amount.find((item , idx) =>
                (length = amount.filter((a: any , i) =>
                    i !== idx && a.amount == item.amount && a.transaction === item.transaction &&
                    (new Date(a.date)).getTime() === (new Date(item.date)).getTime() &&
                    (new Date(a.date)).getMonth() === curDate.getMonth() &&
                    (new Date(a.date)).getFullYear() === curDate.getFullYear()).length + 1) > 1
            );
            return length > 1 ? generqateInsight67f(id , transactions , value , length , lang) : null;
        case "66b719da-5a83-433b-bd82-c8ed2ca1685c":
            amount = transactions.filter(t => t.type === "DepositCheck" && new Date(t.date).getMonth() === curDate.getMonth() &&
                (new Date(t.date)).getFullYear() === curDate.getFullYear());
            return amount.length ? generqateInsight85c(id , amount , BankURL , lang) : null;
        case "0ebf81f1-273a-47b2-ae66-59fc50520da0":
            amount = transactions.filter((t: any) =>
                t.categoryDescription === "Salary");
            return amount.find(t =>
                (new Date(t.date)).getMonth() === curDate.getMonth() &&
                (new Date(t.date)).getFullYear() === curDate.getFullYear()) ?
                generqateInsightda0(id , amount , lang) : null;
        case "16052c32-574b-4a15-882e-0286e4d64fe0":
            amount = transactions.filter((t: any) => t.Mode === "In" && t.categoryDescription === "Government");
            return amount.find(t =>
                (new Date(t.date)).getMonth() === curDate.getMonth() &&
                (new Date(t.date)).getFullYear() === curDate.getFullYear()) ?
                generqateInsightfe0(id , amount , lang) : null;
        case "147443c7-7be1-4f68-8ff3-ce65e992c22c":
            return generqateInsight22c(id , amount , lang);
        case "d1e567b3-262f-4da8-bb46-dbd4c132f372":
            amount = [
                transactions.filter((t: any) =>
                    (new Date(t.date)).getMonth() === curDate.getMonth() &&
                    (new Date(t.date)).getFullYear() === curDate.getFullYear()) ,
                transactions.filter((t: any) =>
                    (new Date(t.date)).getMonth() === prevDate.getMonth() &&
                    (new Date(t.date)).getFullYear() === prevDate.getFullYear())
            ];
            return amount[0].length && amount[1].length ? generqateInsight372(id , amount , lang) : null;
        case "6b739292-bb50-4284-9d66-342de48403f2":
            const filterOutTansaction = groupBy(transactions.filter(t =>
                t.Mode === "Out" &&
                (new Date(t.date)).getMonth() === curDate.getMonth() &&
                (new Date(t.date)).getFullYear() === curDate.getFullYear()) ,
                item => [item.categoryDescription]);
            const sortedFilterOutTransactions = filterOutTansaction.map(tran => ({
                category: tran[0].categoryDescription ,
                value: Math.abs(tran.map(t => +t.amount).reduce((a , b) => a + b))
            })).sort((a , b) => a.value > b.value ? -1 : 1)
            return sortedFilterOutTransactions.length ? generqateInsight3f2(id , sortedFilterOutTransactions , lang) : null;
        case "6b739292-bb50-4284-9d66-342de48403f2-b":
            const filterInTransaction = groupBy(transactions.filter(t =>
                t.Mode === "In" &&
                (new Date(t.date)).getMonth() === curDate.getMonth() &&
                (new Date(t.date)).getFullYear() === curDate.getFullYear()) ,
                item => [item.categoryDescription]);
            const sortedFilterInTransactions = filterInTransaction.map(tran => ({
                category: tran[0].categoryDescription ,
                value: Math.abs(tran.map(t => +t.amount).reduce((a , b) => a + b))
            })).sort((a , b) => a.value > b.value ? -1 : 1)
            return sortedFilterInTransactions.length ? generqateInsight3f2B(id , sortedFilterInTransactions , lang) : null;
        default:
            break;
    }
}

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
