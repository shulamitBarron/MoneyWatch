import {tablesForStory , storyIdForInsightId} from '../models/insightsConfiguration'
import generateTble from './generateTable'
import {groupBy} from "./common";

export const generateFacts = (storyId , transactions , accounts): {} => {
    transactions = transactions.map(t =>
        ({
            ...t ,
            date: new Date(t.date) ,
            month: (new Date(t.date).getMonth() + 1).toString() ,
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
    let theAccounts = [];
    const curDate = new Date();
    const facts = {};
    const periods = [];
    for (let i = 0; i < 4; i++) {
        periods.push((new Date((new Date).setMonth(curDate.getMonth() - i)).getMonth() + 1).toString())
    }
    switch (storyId) {
        case "72154aa7-d6b9-4f8e-b40d-a292cd0c167f":
            let theTrans = transactions.filter((t: any) => t.Mode === "Out");
            theTrans = theTrans.filter((item , idx) =>
                theTrans.filter((a , i) =>
                    i !== idx && a.amount == item.amount && a.transaction === item.transaction &&
                    (new Date(a.date)).getTime() === (new Date(item.date)).getTime() &&
                    Math.ceil(Math.abs(new Date().getTime() -
                        new Date(a.date).getTime()) / (1000 * 3600 * 24)) <= 2).length + 1 > 1
            );
            if (theTrans.length) {
                theTrans = groupBy(theTrans , item => [item.amount , item.date , item.transaction]);
                theTrans = theTrans.length ?
                    theTrans
                        .sort((a , b) => a.length > b.length ? -1 : 1)[0]
                        .map(t => ({...t , amount: Math.abs(t.amount)})) : [];
                theAccounts = accounts.filter(account =>
                    theTrans.filter(t => t.accountNumber === account.number).length > 0);
                if (theTrans.length && theAccounts.length) {
                    tablesForStory[storyIdForInsightId[storyId]].map(table =>
                        facts[table] = generateTble(table , theTrans , theAccounts));
                } else {
                    throw "error";
                }
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
            theTransactions = transactions.filter(t =>
                t.Mode === "In" && t.type === "DepositCheck" &&
                Math.ceil(Math.abs(new Date().getTime() -
                    new Date(t.date).getTime()) / (1000 * 3600 * 24)) <= 2);
            theAccounts = accounts.filter(account =>
                theTransactions.filter(t => t.accountNumber === account.number).length > 0);
            if (theTransactions.length && theAccounts.length) {
                tablesForStory[storyIdForInsightId[storyId]].map(table =>
                    facts[table] = generateTble(table , theTransactions , theAccounts , [["In"] , ["Out"]] , periods));
            } else {
                throw "error";
            }
            break;
        case "0ebf81f1-273a-47b2-ae66-59fc50520da0":
            theTransactions = transactions.filter((t: any) => {
                let usrYear , usrMonth = new Date(t.date).getMonth() + 1;
                let curYear , curMonth = curDate.getMonth() + 1;
                if ((usrYear = new Date(t.date).getFullYear()) < (curYear = curDate.getFullYear())) {
                    curMonth += (curYear - usrYear) * 12;
                }
                let diffMonths = curMonth - usrMonth;
                if (new Date(t.date).getDate() > curDate.getDate()) diffMonths--;
                return t.categoryDescription.en === "Salary" && t.Mode === "In" && diffMonths < 12;
            });
            theTransactions = theTransactions.sort((a , b) => -1 * a.date.getTime() - b.date.getTime()).slice(0 , 5).reverse();
            theAccounts = accounts.filter(account =>
                theTransactions.filter(t => t.accountNumber === account.number).length > 0);
            if (theTransactions.length && theAccounts.length) {
                tablesForStory[storyIdForInsightId[storyId]].map(table =>
                    facts[table] = generateTble(table , theTransactions , theAccounts , [["In"] , ["Out"]] , periods));
            } else {
                throw "error";
            }
            break;
        case "16052c32-574b-4a15-882e-0286e4d64fe0":
            theTransactions = transactions.filter((t: any) => {
                let usrYear , usrMonth = new Date(t.date).getMonth() + 1;
                let curYear , curMonth = curDate.getMonth() + 1;
                if ((usrYear = new Date(t.date).getFullYear()) < (curYear = curDate.getFullYear())) {
                    curMonth += (curYear - usrYear) * 12;
                }
                let diffMonths = curMonth - usrMonth;
                if (new Date(t.date).getDate() > curDate.getDate()) diffMonths--;
                return t.categoryDescription.en === "Government" && t.Mode === "In" && diffMonths < 12;
            });
            theTransactions = theTransactions.sort((a , b) => -1 * a.date.getTime() - b.date.getTime()).slice(0 , 5).reverse();
            theAccounts = accounts.filter(account =>
                theTransactions.filter(t => t.accountNumber === account.number).length > 0);
            if (theTransactions.length && theAccounts.length) {
                tablesForStory[storyIdForInsightId[storyId]].map(table =>
                    facts[table] = generateTble(table , theTransactions , theAccounts , [["In"] , ["Out"]] , periods));
            } else {
                throw "error";
            }
            break;
        default:
            break;
    }
    return facts;
}