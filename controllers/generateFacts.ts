import {tablesForStory , storyIdForInsightId} from '../models/insightsConfiguration'
import generateTble from './generateTable'
import {groupBy} from "./common";

export const generateFacts = (storyId , transactions , accounts): any[] => {
    transactions = transactions.map(t =>
        ({
            ...t , month: (new Date(t.date).getMonth() + 1).toString() ,
            mode: t.Mode , categoryGroup: {en: t.categoryDescription} ,
            categoryDescription: {en: t.categoryDescription} ,
            device: t.transaction
        }));
    accounts = accounts.map(t => ({
        ...t ,
        name: {en: t.name} ,
        "count": Math.abs(t.amount) ,
        "sum": Math.abs(t.balance) ,
        "avg": Math.abs(t.balance) ,
        "std": Math.abs(t.balance)
    }));
    let theTransactions = [];
    const curDate = new Date();
    const facts = [];
    const periods = [];
    for (let i = 0; i < 4; i++) {
        periods.push((new Date((new Date).setMonth(curDate.getMonth() - i)).getMonth() + 1).toString())
    }
    switch (storyId) {
        case "72154aa7-d6b9-4f8e-b40d-a292cd0c167f":
            theTransactions = transactions.filter((t: any) => t.Mode === "Out");
            theTransactions = theTransactions.filter((item , idx) =>
                theTransactions.filter((a , i) =>
                    i !== idx && a.amount == item.amount && a.transaction === item.transaction &&
                    (new Date(a.date)).getTime() === (new Date(item.date)).getTime() &&
                    (new Date(a.date)).getMonth() === curDate.getMonth() &&
                    (new Date(a.date)).getFullYear() === curDate.getFullYear()).length + 1 > 1
            )
            if (theTransactions.length) {
                theTransactions = groupBy(theTransactions , item => [item.amount , item.date , item.transaction]);
                theTransactions = theTransactions.sort((a , b) => a.length > b.length ? -1 : 1)[0].map(t =>
                    ({...t , amount: Math.abs(t.amount)}));
                tablesForStory[storyIdForInsightId[storyId]].map(table =>
                    facts[table] = generateTble(table , theTransactions , accounts.filter(account =>
                        theTransactions.filter(t => t.accountNumber === account.number).length > 0)));
            }
            break;
        case "147443c7-7be1-4f68-8ff3-ce65e992c22c":
            tablesForStory[storyIdForInsightId[storyId]].map(table =>
                facts[table] = generateTble(table));
            break;
        case "d1e567b3-262f-4da8-bb46-dbd4c132f372":
            tablesForStory[storyIdForInsightId[storyId]].map(table =>
                facts[table] = generateTble(table , transactions , accounts));
            break;
        case "6b739292-bb50-4284-9d66-342de48403f2":
            theTransactions = transactions.filter(t => t.Mode === "Out" && periods.indexOf(t.month.toString()) > -1);
            tablesForStory[storyIdForInsightId[storyId]].map(table =>
                facts[table] = generateTble(table , theTransactions , accounts.filter(account =>
                    theTransactions.filter(t => t.accountNumber === account.number).length > 0) , [["In"] , ["Out"]] , periods));
            break;
        case "6b739292-bb50-4284-9d66-342de48403f2-b":
            theTransactions = transactions.filter(t => t.Mode === "In" && periods.indexOf(t.month.toString()) > -1);
            tablesForStory[storyIdForInsightId[storyId]].map(table =>
                facts[table] = generateTble(table , theTransactions , accounts.filter(account =>
                    theTransactions.filter(t => t.accountNumber === account.number).length > 0) , [["In"] , ["Out"]] , periods));
            break;
        case "66b719da-5a83-433b-bd82-c8ed2ca1685c":
            theTransactions = transactions.filter(t => t.Mode === "In" && t.type === "DepositCheck" && new Date(t.date).getMonth() === curDate.getMonth() &&
                (new Date(t.date)).getFullYear() === curDate.getFullYear());
            tablesForStory[storyIdForInsightId[storyId]].map(table =>
                facts[table] = generateTble(table , theTransactions , accounts.filter(account =>
                    theTransactions.filter(t => t.accountNumber === account.number).length > 0) , [["In"] , ["Out"]] , periods));
            break;
        case "0ebf81f1-273a-47b2-ae66-59fc50520da0":
            theTransactions = transactions.filter(t => t.Mode === "In" && t.categoryDescription === "Salary" && periods.indexOf(t.month.toString()) > -1);
            tablesForStory[storyIdForInsightId[storyId]].map(table =>
                facts[table] = generateTble(table , theTransactions , accounts.filter(account =>
                    theTransactions.filter(t => t.accountNumber === account.number).length > 0) , [["In"] , ["Out"]] , periods));
            break;
        default:
            break;
    }
    return facts;
}