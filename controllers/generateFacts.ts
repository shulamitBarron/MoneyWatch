import {tablesForStory , storyIdForInsightId} from '../models/insightsConfiguration'
import generateTble from './generateTable'
import {groupBy} from "./common";

export const generateFacts = (storyId , transactions , accounts): {} => {
    transactions = transactions.map(t => ({
        ...t ,
        date: new Date(t.date) ,
        month: (new Date(t.date).getMonth() + 1).toString() ,
        mode: t.Mode , categoryGroup: {en: t.categoryDescription} ,
        categoryDescription: {en: t.categoryDescription} ,
        device: t.transaction ,
        bizCategory: {en: t.categoryDescription}
    }));
    accounts = accounts.map(t => ({
        ...t ,
        name: {en: t.name} ,
        accountNumber: t.number ,
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
    const per = Math.floor(Math.random() * 3) + 5;
    for (let i = 1; i < per; i++) {
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
                        new Date(a.date).getTime()) / (1000 * 3600 * 24)) <= 4).length + 1 > 1
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
                facts[table] = generateTble(table , transactions , accounts , [["In"] , ["Out"]] , periods));
            break;
        case "6b739292-bb50-4284-9d66-342de48403f2":
            theTransactions = transactions.filter(t =>
                t.Mode === "Out" && periods.indexOf(t.month.toString()) > -1);
            theAccounts = accounts.filter(account =>
                theTransactions.filter(t => t.accountNumber === account.number).length > 0);
            if (theTransactions.length && theAccounts.length) {
                tablesForStory[storyIdForInsightId[storyId]].map(table =>
                    facts[table] = generateTble(table , theTransactions , theAccounts , [["In"] , ["Out"]] , periods));
            } else {
                throw "error";
            }
            break;
        case "6b739292-bb50-4284-9d66-342de48403f2-b":
            theTransactions = transactions.filter(t => t.Mode === "In" && periods.indexOf(t.month.toString()) > -1);
            theAccounts = accounts.filter(account =>
                theTransactions.filter(t => t.accountNumber === account.number).length > 0);
            if (theTransactions.length && theAccounts.length) {
                tablesForStory[storyIdForInsightId[storyId]].map(table =>
                    facts[table] = generateTble(table , theTransactions , theAccounts , [["In"] , ["Out"]] , periods));
            } else {
                throw "error";
            }
            break;
        case "66b719da-5a83-433b-bd82-c8ed2ca1685c":
            theTransactions = transactions.filter(t =>
                t.Mode === "In" && t.type === "DepositCheck" &&
                Math.ceil(Math.abs(new Date().getTime() -
                    new Date(t.date).getTime()) / (1000 * 3600 * 24)) <= 4);
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
        case "c71202e6-46b8-42ec-ba53-5dc25d6db393":
            theTransactions = transactions.filter((t: any) => t.type === "PostedCheck" &&
                t.Mode === "Out" && Math.ceil(Math.abs(new Date().getTime() -
                    new Date(t.date).getTime()) / (1000 * 3600 * 24)) <= 2);
            theTransactions = theTransactions.sort((a , b) => -1 * a.date.getTime() - b.date.getTime()).reverse();
            theAccounts = accounts.filter(account =>
                theTransactions.filter(t => t.accountNumber === account.number).length > 0);
            if (theTransactions.length && theAccounts.length) {
                tablesForStory[storyIdForInsightId[storyId]].map(table =>
                    facts[table] = generateTble(table , theTransactions , theAccounts , [["In"] , ["Out"]] , periods));
            } else {
                throw "error";
            }
            break;
        case "b6b765af-0378-4413-a4f3-aa83d816d586":
            theTransactions = transactions.filter((t: any) => t.mode === "Out");
            const categories = theTransactions.map(t => t.categoryDescription.en);
            const categoryDescriptions = categories.filter((t , i) => t && t !== "null" && categories.indexOf(t) === i);
            const selectedCategory = categoryDescriptions[Math.floor(Math.random() * categoryDescriptions.length)];
            theTransactions = theTransactions.filter((t: any) => t.categoryDescription.en === selectedCategory);
            theAccounts = accounts.filter(account =>
                theTransactions.filter(t => t.accountNumber === account.number).length > 0);
            if (theTransactions.length && theAccounts.length) {
                const selectedAccount = theAccounts[Math.floor(Math.random() * theAccounts.length)];
                theTransactions = theTransactions.filter(t => {
                    let usrYear , usrMonth = new Date(t.date).getMonth() + 1;
                    let curYear , curMonth = curDate.getMonth() + 1;
                    if ((usrYear = new Date(t.date).getFullYear()) < (curYear = curDate.getFullYear())) {
                        curMonth += (curYear - usrYear) * 12;
                    }
                    let diffMonths = curMonth - usrMonth;
                    return t.accountNumber === selectedAccount.number && diffMonths && diffMonths <= periods.length
                });
                tablesForStory[storyIdForInsightId[storyId]].map(table =>
                    facts[table] = generateTble(table , theTransactions , [selectedAccount] , [["In"] , ["Out"]] , periods , selectedCategory));
            } else {
                throw "error";
            }
            break;
        case "22741535-e6d1-4aa3-93de-a021efb8f34c":
            theTransactions = transactions.filter(t => t.mode === "Out" && (new Date(t.date)).getDate() === (new Date()).getDate());
            theTransactions = groupBy(theTransactions , item => [item.transaction]);
            const p = [1 , 2 , 3];
            theTransactions = theTransactions.filter(a => !p.filter(pp => !a.find(t => {
                    let usrYear , usrMonth = new Date(t.date).getMonth() + 1;
                    let curYear , curMonth = curDate.getMonth() + 1;
                    if ((usrYear = new Date(t.date).getFullYear()) < (curYear = curDate.getFullYear())) {
                        curMonth += (curYear - usrYear) * 12;
                    }
                    let diffMonths = curMonth - usrMonth;
                    return diffMonths === pp
                })
            ).length);
            theTransactions.sort((a , b) => b.length - a.length);
            theTransactions = theTransactions[0];
            theAccounts = accounts.filter(account =>
                theTransactions.filter(t => t.accountNumber === account.number).length > 0);
            if (theTransactions.length && theAccounts.length) {
                tablesForStory[storyIdForInsightId[storyId]].map(table =>
                    facts[table] = generateTble(table , theTransactions , theAccounts , [["In"] , ["Out"]] , periods));
            } else {
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
            theTransactions = theTransactions.map(theTransaction => ({
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
            }));
            theTransactions = theTransactions.map(tt => {
                const lastTr = tt.theTransactions.filter(theTransactions_0 => {
                    const curDate = new Date();
                    let t = theTransactions_0[0];
                    let usrYear , usrMonth = new Date(t.date).getMonth() + 1;
                    let curYear , curMonth = curDate.getMonth() + 1;
                    if ((usrYear = new Date(t.date).getFullYear()) < (curYear = curDate.getFullYear())) {
                        curMonth += (curYear - usrYear) * 12;
                    }
                    let diffMonths = curMonth - usrMonth;
                    return diffMonths === 1;

                });
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
            let orderChecks = transactions.filter(t => t.type === 'OrderChecks').sort((a , b) => -1 * a.date.getTime() - b.date.getTime());
            orderChecks = orderChecks.length ? orderChecks[0] : null;
            theTransactions = orderChecks ? transactions.filter(t => t.type === 'PostedCheck' && t.date.getTime() > orderChecks.date.getTime()) : [];
            theAccounts = accounts.filter(account =>
                theTransactions.filter(t => t.accountNumber === account.number).length > 0);
            if (theTransactions.length && theAccounts.length) {
                tablesForStory[storyIdForInsightId[storyId]].map(table =>
                    facts[table] = generateTble(table , theTransactions , theAccounts , [["In"] , ["Out"]] , periods , '' , orderChecks));
            } else {
                throw "error";
            }
            break;
        default:
            break;
    }
    return facts;
}


