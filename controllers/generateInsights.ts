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
    teaser[2].text = teaser[2].text.replace("{{transaction}}" , value.transaction);
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

const generqateInsight85c = (id , transactions , lang) => {
    const curDate = new Date();
    return {
        ...generqateInsights(id) ,
        teaserTemplate: "image" ,
        teaserBlocks: [
            ...teaserBlocks(id , lang , curDate) ,
            {
                blockId: "main-image" ,
                type: "image" ,
                url: insightsMessages[lang][id]["main-image"] ,
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
                    label: `${insightsMessages[lang][id]["sign"] + Math.round(+amount.amount).toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g , ",")}` ,
                    value: Math.abs(amount.amount)
                }))] ,
                categories: transactions.map(amount =>
                    `${new Date(amount.date).getDate()} ${monthNames[lang][+amount.month]}`) ,
                accessibilityCategories: transactions.map(amount =>
                    `${new Date(amount.date).getDate()} ${monthNames[lang][+amount.month]}`) ,
                seriesLabels: transactions.map(amount => `${insightsMessages[lang][id]["sign"] +
                Math.round(+amount.amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g , ",")}`)
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
                    label: `${insightsMessages[lang][id]["sign"] + Math.round(+amount.amount).toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g , ",")}` ,
                    value: Math.abs(amount.amount)
                }))] ,
                categories: transactions.map((amount: any) =>
                    `${new Date(amount.date).getDate()} ${monthNames[lang][+amount.month]}`) ,
                accessibilityCategories: transactions.map((amount: any) =>
                    `${new Date(amount.date).getDate()} ${monthNames[lang][+amount.month]}`) ,
                seriesLabels: transactions.map((amount: any) => `${insightsMessages[lang][id]["sign"] +
                Math.round(+amount.amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g , ",")}`)
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
    teaser[2].text = teaser[2].text.replace("{{month}}" , monthNames[lang][curDate.getMonth()]);
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

export default (id , transactions: any , lang) => {
    let amount;
    const curDate = new Date();
    const prevDate = new Date((new Date).setMonth(curDate.getMonth() - 1));
    transactions = transactions.map(t =>
        ({
            ...t ,
            date: new Date(t.date) ,
            month: (new Date(t.date).getMonth()).toString() ,
            mode: t.Mode
        }));
    switch (id) {
        case "72154aa7-d6b9-4f8e-b40d-a292cd0c167f":
            amount = transactions.filter((t: any) => t.Mode === "Out");
            let length = 0;
            const value = amount.find((item , idx) =>
                (length = amount.filter((a: any , i) =>
                    i !== idx && a.amount == item.amount && a.transaction === item.transaction &&
                    (new Date(a.date)).getTime() === (new Date(item.date)).getTime() &&
                    Math.ceil(Math.abs(new Date().getTime() -
                        new Date(a.date).getTime()) / (1000 * 3600 * 24)) <= 2).length + 1) > 1
            );
            return length > 1 ? generqateInsight67f(id , transactions , value , length , lang) : null;
        case "66b719da-5a83-433b-bd82-c8ed2ca1685c":
            amount = transactions.filter(t =>
                t.type === "DepositCheck" && t.Mode === "In" &&
                Math.ceil(Math.abs(new Date().getTime() -
                    new Date(t.date).getTime()) / (1000 * 3600 * 24)) <= 2);
            return amount.length ? generqateInsight85c(id , amount , lang) : null;
        case "0ebf81f1-273a-47b2-ae66-59fc50520da0":
            amount = transactions.filter((t: any) => {
                let usrYear , usrMonth = new Date(t.date).getMonth() + 1;
                let curYear , curMonth = curDate.getMonth() + 1;
                if ((usrYear = new Date(t.date).getFullYear()) < (curYear = curDate.getFullYear())) {
                    curMonth += (curYear - usrYear) * 12;
                }
                let diffMonths = curMonth - usrMonth;
                if (new Date(t.date).getDate() > curDate.getDate()) diffMonths--;
                return t.categoryDescription === "Salary" && t.Mode === "In" && diffMonths < 12;
            });
            amount = amount.sort((a , b) => -1 * a.date.getTime() - b.date.getTime()).slice(0 , 5).reverse();
            return amount.find(t =>
                Math.ceil(Math.abs(new Date().getTime() -
                    new Date(t.date).getTime()) / (1000 * 3600 * 24)) <= 2) ?
                generqateInsightda0(id , amount , lang) : null;
        case "16052c32-574b-4a15-882e-0286e4d64fe0":
            amount = transactions.filter((t: any) => {
                let usrYear , usrMonth = new Date(t.date).getMonth() + 1;
                let curYear , curMonth = curDate.getMonth() + 1;
                if ((usrYear = new Date(t.date).getFullYear()) < (curYear = curDate.getFullYear())) {
                    curMonth += (curYear - usrYear) * 12;
                }
                let diffMonths = curMonth - usrMonth;
                if (new Date(t.date).getDate() > curDate.getDate()) diffMonths--;
                return t.categoryDescription === "Government" && t.Mode === "In" && diffMonths < 12;
            });
            amount = amount.sort((a , b) => -1 * a.date.getTime() - b.date.getTime()).slice(0 , 5).reverse();
            return amount.find(t =>
                Math.ceil(Math.abs(new Date().getTime() -
                    new Date(t.date).getTime()) / (1000 * 3600 * 24)) <= 2) ?
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
            const filterOutTansaction = groupBy(transactions.filter(t => {
                    let usrYear , usrMonth = new Date(t.date).getMonth() + 1;
                    let curYear , curMonth = curDate.getMonth() + 1;
                    if ((usrYear = new Date(t.date).getFullYear()) < (curYear = curDate.getFullYear())) {
                        curMonth += (curYear - usrYear) * 12;
                    }
                    let diffMonths = curMonth - usrMonth;
                    return t.Mode === "Out" && diffMonths === 1;
                }) ,
                item => [item.categoryDescription]);
            const sortedFilterOutTransactions = filterOutTansaction.map(tran => ({
                category: tran[0].categoryDescription ,
                value: Math.abs(tran.map(t => +t.amount).reduce((a , b) => a + b))
            })).sort((a , b) => a.value > b.value ? -1 : 1);
            return sortedFilterOutTransactions.length && curDate.getDate()< 10 ?
                generqateInsight3f2(id , sortedFilterOutTransactions , lang) : null;
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
