import tables from '../models/Tables';
import {groupBy} from "./common";

export default (t: any , theTransactions: any[] = [] , accounts: any = [] , seriesNames = [] , periods = []) => {
    let table = tables[t];
    const curDate = new Date();
    switch (table.case) {
        case "transaction":
            table.rows = [table.cols.map(col => theTransactions[0][col] ? theTransactions[0][col] : null)];
            break;
        case "transactions":
            table.rows = theTransactions.map(transaction => table.cols.map(col => transaction[col] ? transaction[col] : null));
            break;
        case "transactionCount":
            table.rows = [[theTransactions.length]];
            break;
        case "currentDate":
            table.rows = [[new Date()]];
            break;
        case "accounts":
            table.rows = accounts.map(account => table.cols.map(col => account[col] ? account[col] : null));
            break;
        case "seriesNames":
            table.rows = seriesNames;
            break;
        case "lastMonthDate":
            table.rows = [[(new Date().getMonth() + 1).toString()]];
            break;
        case "hasSingleAccount":
            table.rows = [[(accounts.length === 1).toString()]];
            break;
        case "amount":
            theTransactions = theTransactions
                .filter(t => new Date(t.date).getMonth() === new Date().getMonth())
                .map(t => +t.amount);
            table.rows = [[theTransactions.length ? theTransactions.reduce((a , b) => a + b) : 0]];
            break;
        case "localCurrencyCd":
            table.rows = [[theTransactions[0].currencyCd]];
            break;
        case "barChartExpenses":
            const AccountTransactions = groupBy(theTransactions , item => [item.month , item.account]);
            const Accounts = groupBy(theTransactions , item => [item.account]).map(a => a[0].account);
            table.rows = AccountTransactions
                .map(At => [At[0].account ,
                    Math.abs(At.map(t => +t.amount).reduce((a , b) => a + b)) ,
                    At[0].month ,
                    At[0].currencyCd]);
            periods.forEach(p => Accounts.forEach(AT => !table.rows.find(a =>
                a[0] === AT && a[2] === p) ? table.rows.push([AT ,
                0.00 ,
                p ,
                theTransactions[0].currencyCd]) : null))
            break;
        case "periods":
            table.rows = [periods];
            break;
        default:
            break;
    }

    delete table.case;
    return table;
}


//
// "facts": {
//     "storyId": "PurchaseAnalysis_UC6",
//         "date": {
//         "type": "PDate",
//             "cols": [
//             "value"
//         ],
//             "rows": [
//             [
//                 "2017-07-04T11:50:24.613Z"
//             ]
//         ],
//             "attributesTypes": [
//             "PDate"
//         ]
//     }, // תאריך נוכחי
//     "amount": {
//         "type": "PAmount",
//             "cols": [
//             "value"
//         ],
//             "rows": [
//             [
//                 "4886.99"
//             ]
//         ],
//             "attributesTypes": [
//             "PAmount"
//         ]
//     },// סכום ההוצאות בחודש הנוכחי
//     "seriesNames": {
//         "type": "PTable",
//             "cols": [
//             "seriesNames"
//         ],
//             "rows": [
//             [
//                 "In"
//             ],
//             [
//                 "Out"
//             ]
//         ],
//             "attributesTypes": [
//             "String"
//         ]
//     }, // הקטגוריות (הוצאות והכנסות)
//     "currentDate": {
//         "type": "PDate",
//             "cols": [
//             "value"
//         ],
//             "rows": [
//             [
//                 "2017-08-04T11:50:24.613Z"
//             ]
//         ],
//             "attributesTypes": [
//             "PDate"
//         ]
//     },// תאריך נוכחי
//     "transactions": {
//         "type": "PTable",
//             "cols": [
//             "id",
//             "account",
//             "accountNumber",
//             "transaction",
//             "amount",
//             "date",
//             "type",
//             "month",
//             "mode",
//             "currencyCd",
//             "currencyCdOriginal",
//             "categoryGroup",
//             "categoryDescription",
//             "device"
//         ],
//             "rows": [
//             [
//                 "91944452",
//                 "33136352",
//                 "xxxx1914",
//                 "OLLY FRESCO S TORONTO TORONTO ON",
//                 "-2.98",
//                 "2017-07-31T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "Olly Fresco's"
//             ],
//             [
//                 "91943724",
//                 "33136348",
//                 "xxxx6250",
//                 "IMPARKXXXXXXXXA TORONTO ON",
//                 "-10.0",
//                 "2017-07-30T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Travel"
//                 },
//                 {
//                     "en": "Travel"
//                 },
//                 "Impark"
//             ],
//             [
//                 "91943720",
//                 "33136348",
//                 "xxxx6250",
//                 "ROGERS *XXXXXXXXX XXX-XXX-XXXX ON",
//                 "-52.59",
//                 "2017-07-30T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Utilities"
//                 },
//                 {
//                     "en": "Utilities"
//                 },
//                 "Rogers Communications"
//             ],
//             [
//                 "91943716",
//                 "33136348",
//                 "xxxx6250",
//                 "BASKIN ROBBINS #XXXXXX TORONTO ON",
//                 "-23.46",
//                 "2017-07-30T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "Baskin-Robbins"
//             ],
//             [
//                 "91944448",
//                 "33136352",
//                 "xxxx1914",
//                 "LOBLAWS 1032 MARKHAM ON",
//                 "-71.88",
//                 "2017-07-29T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Shopping"
//                 },
//                 {
//                     "en": "Shopping"
//                 },
//                 "LOBLAWS 1032 MARKHAM ON"
//             ],
//             [
//                 "91944444",
//                 "33136352",
//                 "xxxx1914",
//                 "THE GARDEN BASKET MARKHAM ON",
//                 "-48.3",
//                 "2017-07-29T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "THE GARDEN BASKET MARKHAM ON"
//             ],
//             [
//                 "91944440",
//                 "33136352",
//                 "xxxx1914",
//                 "FOOD BASICS #661 MARKHAM ON",
//                 "-49.52",
//                 "2017-07-29T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Groceries"
//                 },
//                 {
//                     "en": "Groceries"
//                 },
//                 "Food Basics"
//             ],
//             [
//                 "91944436",
//                 "33136352",
//                 "xxxx1914",
//                 "TIM HORTONS 3098 QTH MARKHAM ON",
//                 "-26.8",
//                 "2017-07-29T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "Tim Hortons"
//             ],
//             [
//                 "91943712",
//                 "33136348",
//                 "xxxx6250",
//                 "PEARSON PARKING T3 TORONTO ON",
//                 "-12.0",
//                 "2017-07-29T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Travel"
//                 },
//                 {
//                     "en": "Travel"
//                 },
//                 "PEARSON PARKING T3 TORONTO ON"
//             ],
//             [
//                 "91943708",
//                 "33136348",
//                 "xxxx6250",
//                 "MARSHALLS 724 MARKHAM ON",
//                 "-155.88",
//                 "2017-07-29T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Shopping"
//                 },
//                 {
//                     "en": "Shopping"
//                 },
//                 "Marshalls"
//             ],
//             [
//                 "91943704",
//                 "33136348",
//                 "xxxx6250",
//                 "HUDSON'S BAY #1532 MARKHAM ON",
//                 "-124.23",
//                 "2017-07-28T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Shopping"
//                 },
//                 {
//                     "en": "Shopping"
//                 },
//                 "HUDSON'S BAY #1532 MARKHAM ON"
//             ],
//             [
//                 "91944432",
//                 "33136352",
//                 "xxxx1914",
//                 "OLLY FRESCO S TORONTO TORONTO ON",
//                 "-2.98",
//                 "2017-07-27T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "Olly Fresco's"
//             ],
//             [
//                 "91944428",
//                 "33136352",
//                 "xxxx1914",
//                 "OLLY FRESCO S TORONTO TORONTO ON",
//                 "-2.98",
//                 "2017-07-26T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "Olly Fresco's"
//             ],
//             [
//                 "91944424",
//                 "33136352",
//                 "xxxx1914",
//                 "OLLY FRESCO S TORONTO TORONTO ON",
//                 "-2.98",
//                 "2017-07-25T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "Olly Fresco's"
//             ],
//             [
//                 "91943700",
//                 "33136348",
//                 "xxxx6250",
//                 "AIR TRANSAT 649JH4 ST LAURENT QC",
//                 "-417.1",
//                 "2017-07-25T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Travel"
//                 },
//                 {
//                     "en": "Travel"
//                 },
//                 "AIR TRANSAT 649JH4 ST LAURENT QC"
//             ],
//             [
//                 "91944420",
//                 "33136352",
//                 "xxxx1914",
//                 "PUSATERI'S YONGE ST. L TORONTO ON",
//                 "-7.91",
//                 "2017-07-24T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "PUSATERI'S YONGE ST. L TORONTO ON"
//             ],
//             [
//                 "91944416",
//                 "33136352",
//                 "xxxx1914",
//                 "OLLY FRESCO S TORONTO TORONTO ON",
//                 "-2.98",
//                 "2017-07-24T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "Olly Fresco's"
//             ],
//             [
//                 "91944412",
//                 "33136352",
//                 "xxxx1914",
//                 "THE GARDEN BASKET MARKHAM ON",
//                 "-16.99",
//                 "2017-07-22T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "THE GARDEN BASKET MARKHAM ON"
//             ],
//             [
//                 "91944408",
//                 "33136352",
//                 "xxxx1914",
//                 "FOOD BASICS #661 MARKHAM ON",
//                 "-72.03",
//                 "2017-07-22T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Groceries"
//                 },
//                 {
//                     "en": "Groceries"
//                 },
//                 "Food Basics"
//             ],
//             [
//                 "91944404",
//                 "33136352",
//                 "xxxx1914",
//                 "OLLY FRESCO S TORONTO TORONTO ON",
//                 "-2.98",
//                 "2017-07-21T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "Olly Fresco's"
//             ],
//             [
//                 "91944400",
//                 "33136352",
//                 "xxxx1914",
//                 "SHOPPERSDRUGMART0985 TORONTO ON",
//                 "-2.25",
//                 "2017-07-21T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Health"
//                 },
//                 {
//                     "en": "Health"
//                 },
//                 "Shoppers Drug Mart"
//             ],
//             [
//                 "91943684",
//                 "33136348",
//                 "xxxx6250",
//                 "RONA # XXXXX UNIONVILLE ON",
//                 "-39.54",
//                 "2017-07-21T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Transportation"
//                 },
//                 {
//                     "en": "Transportation"
//                 },
//                 "76 Gas Station"
//             ],
//             [
//                 "91943676",
//                 "33136348",
//                 "xxxx6250",
//                 "SHELL 5706 HWY 7 MARKHAM ON",
//                 "-68.32",
//                 "2017-07-20T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Transportation"
//                 },
//                 {
//                     "en": "Transportation"
//                 },
//                 "Shell"
//             ],
//             [
//                 "91943672",
//                 "33136348",
//                 "xxxx6250",
//                 "PRESTO TORONTO ON",
//                 "-230.0",
//                 "2017-07-20T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Transportation"
//                 },
//                 {
//                     "en": "Transportation"
//                 },
//                 "PRESTO TORONTO ON"
//             ],
//             [
//                 "91944396",
//                 "33136352",
//                 "xxxx1914",
//                 "NOFRILLS DACOSTA'S #71 MARKHAM ON",
//                 "-7.1",
//                 "2017-07-19T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Groceries"
//                 },
//                 {
//                     "en": "Groceries"
//                 },
//                 "No Frills"
//             ],
//             [
//                 "91944392",
//                 "33136352",
//                 "xxxx1914",
//                 "LONGO'S # 15 TORONTO ON",
//                 "-39.47",
//                 "2017-07-19T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "LONGO'S # 15 TORONTO ON"
//             ],
//             [
//                 "91943668",
//                 "33136348",
//                 "xxxx6250",
//                 "SHOPPERSDRUGMART0945 TORONTO ON",
//                 "-27.21",
//                 "2017-07-18T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Health"
//                 },
//                 {
//                     "en": "Health"
//                 },
//                 "Shoppers Drug Mart"
//             ],
//             [
//                 "696637888",
//                 "33136324",
//                 "xxxx6259",
//                 "MISC PAYMENT -CDLSI",
//                 "-329.03",
//                 "2017-07-18T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Other"
//                 },
//                 {
//                     "en": "Other"
//                 },
//                 "MISC PAYMENT -CDLSI"
//             ],
//             [
//                 "91943664",
//                 "33136348",
//                 "xxxx6250",
//                 "PETROCAN-2830-16TH AVE MARKHAM ON",
//                 "-46.02",
//                 "2017-07-17T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Transportation"
//                 },
//                 {
//                     "en": "Transportation"
//                 },
//                 "Petro-Canada"
//             ],
//             [
//                 "91944388",
//                 "33136352",
//                 "xxxx1914",
//                 "THE GARDEN BASKET MARKHAM ON",
//                 "-25.28",
//                 "2017-07-16T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "THE GARDEN BASKET MARKHAM ON"
//             ],
//             [
//                 "91944384",
//                 "33136352",
//                 "xxxx1914",
//                 "TIM HORTONS 3098 QTH MARKHAM ON",
//                 "-20.26",
//                 "2017-07-15T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "Tim Hortons"
//             ],
//             [
//                 "91943660",
//                 "33136348",
//                 "xxxx6250",
//                 "H &amp; M #CA002 MARKHAM ON",
//                 "-29.38",
//                 "2017-07-15T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Shopping"
//                 },
//                 {
//                     "en": "Shopping"
//                 },
//                 "H&M"
//             ],
//             [
//                 "91943656",
//                 "33136348",
//                 "xxxx6250",
//                 "KIDDIE KOBBLER MARKHAM ON",
//                 "-138.0",
//                 "2017-07-15T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "KIDDIE KOBBLER MARKHAM ON"
//             ],
//             [
//                 "91943648",
//                 "33136348",
//                 "xxxx6250",
//                 "SHOPPERSDRUGMART0612 MARKHAM ON",
//                 "-74.55",
//                 "2017-07-15T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Health"
//                 },
//                 {
//                     "en": "Health"
//                 },
//                 "Shoppers Drug Mart"
//             ],
//             [
//                 "91944380",
//                 "33136352",
//                 "xxxx1914",
//                 "SHOPPERSDRUGMART0985 TORONTO ON",
//                 "-4.27",
//                 "2017-07-14T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Health"
//                 },
//                 {
//                     "en": "Health"
//                 },
//                 "Shoppers Drug Mart"
//             ],
//             [
//                 "91944376",
//                 "33136352",
//                 "xxxx1914",
//                 "FOOD BASICS #661 MARKHAM ON",
//                 "-138.09",
//                 "2017-07-14T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Groceries"
//                 },
//                 {
//                     "en": "Groceries"
//                 },
//                 "Food Basics"
//             ],
//             [
//                 "91944372",
//                 "33136352",
//                 "xxxx1914",
//                 "OLLY FRESCO S TORONTO TORONTO ON",
//                 "-5.46",
//                 "2017-07-14T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "Olly Fresco's"
//             ],
//             [
//                 "91944368",
//                 "33136352",
//                 "xxxx1914",
//                 "SHOPPERSDRUGMART0985 TORONTO ON",
//                 "-2.92",
//                 "2017-07-13T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Health"
//                 },
//                 {
//                     "en": "Health"
//                 },
//                 "Shoppers Drug Mart"
//             ],
//             [
//                 "91944364",
//                 "33136352",
//                 "xxxx1914",
//                 "OLLY FRESCO S TORONTO TORONTO ON",
//                 "-1.73",
//                 "2017-07-13T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "Olly Fresco's"
//             ],
//             [
//                 "91943644",
//                 "33136348",
//                 "xxxx6250",
//                 "SHOPPERS DRUG MART #1013 MARKHAM ON",
//                 "-37.26",
//                 "2017-07-12T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Health"
//                 },
//                 {
//                     "en": "Health"
//                 },
//                 "Shoppers Drug Mart"
//             ],
//             [
//                 "91943640",
//                 "33136348",
//                 "xxxx6250",
//                 "SHOPPERSDRUGMART0985 TORONTO ON",
//                 "-39.27",
//                 "2017-07-12T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Health"
//                 },
//                 {
//                     "en": "Health"
//                 },
//                 "Shoppers Drug Mart"
//             ],
//             [
//                 "91944360",
//                 "33136352",
//                 "xxxx1914",
//                 "LONGO'S # 15 TORONTO ON",
//                 "-16.61",
//                 "2017-07-11T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "LONGO'S # 15 TORONTO ON"
//             ],
//             [
//                 "91943636",
//                 "33136348",
//                 "xxxx6250",
//                 "407ETR WOODBRIDGE ON",
//                 "-98.16",
//                 "2017-07-11T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Travel"
//                 },
//                 {
//                     "en": "Travel"
//                 },
//                 "407 ETR"
//             ],
//             [
//                 "91944356",
//                 "33136352",
//                 "xxxx1914",
//                 "OLLY FRESCO S TORONTO TORONTO ON",
//                 "-3.47",
//                 "2017-07-10T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "Olly Fresco's"
//             ],
//             [
//                 "91944352",
//                 "33136352",
//                 "xxxx1914",
//                 "FOOD BASICS #661 MARKHAM ON",
//                 "-169.61",
//                 "2017-07-09T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Groceries"
//                 },
//                 {
//                     "en": "Groceries"
//                 },
//                 "Food Basics"
//             ],
//             [
//                 "91943632",
//                 "33136348",
//                 "xxxx6250",
//                 "TIM HORTONS 3098 QTH MARKHAM ON",
//                 "-14.31",
//                 "2017-07-09T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "Tim Hortons"
//             ],
//             [
//                 "91943624",
//                 "33136348",
//                 "xxxx6250",
//                 "THE BODY SHOP 1492 TORONTO ON",
//                 "45.2",
//                 "2017-07-07T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "In",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Shopping"
//                 },
//                 {
//                     "en": "Shopping"
//                 },
//                 "The Body Shop"
//             ],
//             [
//                 "91943620",
//                 "33136348",
//                 "xxxx6250",
//                 "SHOPPERSDRUGMART0985 TORONTO ON",
//                 "-3.94",
//                 "2017-07-07T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Health"
//                 },
//                 {
//                     "en": "Health"
//                 },
//                 "Shoppers Drug Mart"
//             ],
//             [
//                 "91943616",
//                 "33136348",
//                 "xxxx6250",
//                 "ALDO #1101 TORONTO ON",
//                 "73.45",
//                 "2017-07-07T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "In",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Shopping"
//                 },
//                 {
//                     "en": "Shopping"
//                 },
//                 "Aldo"
//             ],
//             [
//                 "91944348",
//                 "33136352",
//                 "xxxx1914",
//                 "TIM HORTONS 2253 QTH TORONTO ON",
//                 "-6.47",
//                 "2017-07-06T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "Tim Hortons"
//             ],
//             [
//                 "91944344",
//                 "33136352",
//                 "xxxx1914",
//                 "LONGO'S # 15 TORONTO ON",
//                 "-16.32",
//                 "2017-07-06T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "LONGO'S # 15 TORONTO ON"
//             ],
//             [
//                 "91943612",
//                 "33136348",
//                 "xxxx6250",
//                 "WESTJET XXXXXXXXXXXXXCALGARY AB",
//                 "-1002.03",
//                 "2017-07-06T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Travel"
//                 },
//                 {
//                     "en": "Travel"
//                 },
//                 "WestJet"
//             ],
//             [
//                 "91943608",
//                 "33136348",
//                 "xxxx6250",
//                 "PETROCAN-2830-16TH AVE MARKHAM ON",
//                 "-45.01",
//                 "2017-07-05T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Transportation"
//                 },
//                 {
//                     "en": "Transportation"
//                 },
//                 "Petro-Canada"
//             ],
//             [
//                 "91943604",
//                 "33136348",
//                 "xxxx6250",
//                 "OLLY FRESCO S TORONTO TORONTO ON",
//                 "-5.56",
//                 "2017-07-05T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "Olly Fresco's"
//             ],
//             [
//                 "696637848",
//                 "33136324",
//                 "xxxx6259",
//                 "MISC PAYMENT -CDLSI",
//                 "-329.03",
//                 "2017-07-05T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Other"
//                 },
//                 {
//                     "en": "Other"
//                 },
//                 "MISC PAYMENT -CDLSI"
//             ],
//             [
//                 "91944340",
//                 "33136352",
//                 "xxxx1914",
//                 "FOOD BASICS #661 MARKHAM ON",
//                 "-2.96",
//                 "2017-07-04T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Groceries"
//                 },
//                 {
//                     "en": "Groceries"
//                 },
//                 "Food Basics"
//             ],
//             [
//                 "91944336",
//                 "33136352",
//                 "xxxx1914",
//                 "THE GARDEN BASKET MARKHAM ON",
//                 "-15.21",
//                 "2017-07-04T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "THE GARDEN BASKET MARKHAM ON"
//             ],
//             [
//                 "91944332",
//                 "33136352",
//                 "xxxx1914",
//                 "FOOD BASICS #661 MARKHAM ON",
//                 "-81.99",
//                 "2017-07-04T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Groceries"
//                 },
//                 {
//                     "en": "Groceries"
//                 },
//                 "Food Basics"
//             ],
//             [
//                 "91944328",
//                 "33136352",
//                 "xxxx1914",
//                 "LOBLAWS 1032 MARKHAM ON",
//                 "-103.52",
//                 "2017-07-04T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Shopping"
//                 },
//                 {
//                     "en": "Shopping"
//                 },
//                 "LOBLAWS 1032 MARKHAM ON"
//             ],
//             [
//                 "91943600",
//                 "33136348",
//                 "xxxx6250",
//                 "CORNELL PHARMACY MARKHAM ON",
//                 "-21.57",
//                 "2017-07-04T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Health"
//                 },
//                 {
//                     "en": "Health"
//                 },
//                 "CORNELL PHARMACY MARKHAM ON"
//             ],
//             [
//                 "91943596",
//                 "33136348",
//                 "xxxx6250",
//                 "INDIGO - BROOKFIELD OFFICTORONTO ON",
//                 "-200.0",
//                 "2017-07-04T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Shopping"
//                 },
//                 {
//                     "en": "Shopping"
//                 },
//                 "IndiGo"
//             ],
//             [
//                 "91944324",
//                 "33136352",
//                 "xxxx1914",
//                 "TIM HORTONS 3098 QTH MARKHAM ON",
//                 "-4.17",
//                 "2017-07-03T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "Tim Hortons"
//             ],
//             [
//                 "91943592",
//                 "33136348",
//                 "xxxx6250",
//                 "ROGERS *XXXXXXXXX XXX-XXX-XXXX ON",
//                 "-259.89",
//                 "2017-07-03T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Utilities"
//                 },
//                 {
//                     "en": "Utilities"
//                 },
//                 "Rogers Communications"
//             ],
//             [
//                 "91944516",
//                 "33136356",
//                 "xxxx6439",
//                 "GOOGLE *SVCSAPPS_cidae XXX-XXX-XXXX ON",
//                 "-5.0",
//                 "2017-07-02T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Other"
//                 },
//                 {
//                     "en": "Other"
//                 },
//                 "Google"
//             ],
//             [
//                 "91944320",
//                 "33136352",
//                 "xxxx1914",
//                 "TIM HORTONS 4475 QTH HALIBURTON ON",
//                 "-19.68",
//                 "2017-07-01T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "Tim Hortons"
//             ],
//             [
//                 "91944316",
//                 "33136352",
//                 "xxxx1914",
//                 "FOODLAND 6447 HALIBURTON ON",
//                 "-116.56",
//                 "2017-07-01T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Groceries"
//                 },
//                 {
//                     "en": "Groceries"
//                 },
//                 "FoodLand"
//             ],
//             [
//                 "91943580",
//                 "33136348",
//                 "xxxx6250",
//                 "ROGERS *XXXXXXXXX XXX-XXX-XXXX ON",
//                 "-52.59",
//                 "2017-07-01T00:00:00.000Z",
//                 "Charge",
//                 "7",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Utilities"
//                 },
//                 {
//                     "en": "Utilities"
//                 },
//                 "Rogers Communications"
//             ],
//             [
//                 "91944312",
//                 "33136352",
//                 "xxxx1914",
//                 "OLLY FRESCO S TORONTO TORONTO ON",
//                 "-1.73",
//                 "2017-06-30T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "Olly Fresco's"
//             ],
//             [
//                 "91943576",
//                 "33136348",
//                 "xxxx6250",
//                 "MABEL'S LABELS INC. HAMILTON ON",
//                 "-74.89",
//                 "2017-06-30T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Shopping"
//                 },
//                 {
//                     "en": "Shopping"
//                 },
//                 "MABEL'S LABELS"
//             ],
//             [
//                 "91943572",
//                 "33136348",
//                 "xxxx6250",
//                 "CITIZEN&amp;IMM-EAPPS ENLIGNEOTTAWA ON",
//                 "-100.0",
//                 "2017-06-30T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Transportation"
//                 },
//                 {
//                     "en": "Transportation"
//                 },
//                 "CITIZEN&amp;IMM-EAPPS ENLIGNEOTTAWA ON"
//             ],
//             [
//                 "91944308",
//                 "33136352",
//                 "xxxx1914",
//                 "TIM HORTONS 3235 QTH TORONTO ON",
//                 "-3.68",
//                 "2017-06-29T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "Tim Hortons"
//             ],
//             [
//                 "91944304",
//                 "33136352",
//                 "xxxx1914",
//                 "TIM HORTONS 1725 QTH MARKHAM ON",
//                 "-1.67",
//                 "2017-06-28T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "Tim Hortons"
//             ],
//             [
//                 "91943564",
//                 "33136348",
//                 "xxxx6250",
//                 "WAL-MART SUPERCENTER#3053MARKHAM ON",
//                 "-19.14",
//                 "2017-06-27T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Shopping"
//                 },
//                 {
//                     "en": "Shopping"
//                 },
//                 "Walmart"
//             ],
//             [
//                 "91943560",
//                 "33136348",
//                 "xxxx6250",
//                 "SHOPPERSDRUGMART0612 MARKHAM ON",
//                 "-10.15",
//                 "2017-06-27T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Health"
//                 },
//                 {
//                     "en": "Health"
//                 },
//                 "Shoppers Drug Mart"
//             ],
//             [
//                 "91943556",
//                 "33136348",
//                 "xxxx6250",
//                 "SHOPPER'S DRUG MART #1308MARKHAM ON",
//                 "-13.87",
//                 "2017-06-27T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Health"
//                 },
//                 {
//                     "en": "Health"
//                 },
//                 "Shoppers Drug Mart"
//             ],
//             [
//                 "91943552",
//                 "33136348",
//                 "xxxx6250",
//                 "FOREVER 21 #429 MARKHAM ON",
//                 "-19.1",
//                 "2017-06-27T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Shopping"
//                 },
//                 {
//                     "en": "Shopping"
//                 },
//                 "Forever 21"
//             ],
//             [
//                 "91944300",
//                 "33136352",
//                 "xxxx1914",
//                 "THE GARDEN BASKET MARKHAM ON",
//                 "-15.98",
//                 "2017-06-25T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "THE GARDEN BASKET MARKHAM ON"
//             ],
//             [
//                 "91944296",
//                 "33136352",
//                 "xxxx1914",
//                 "FOOD BASICS #661 MARKHAM ON",
//                 "-194.23",
//                 "2017-06-25T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Groceries"
//                 },
//                 {
//                     "en": "Groceries"
//                 },
//                 "Food Basics"
//             ],
//             [
//                 "91944292",
//                 "33136352",
//                 "xxxx1914",
//                 "TIM HORTONS 3098 QTH MARKHAM ON",
//                 "-6.93",
//                 "2017-06-24T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "Tim Hortons"
//             ],
//             [
//                 "91943544",
//                 "33136348",
//                 "xxxx6250",
//                 "WAL-MART SUPERCENTER#3053MARKHAM ON",
//                 "-49.32",
//                 "2017-06-24T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Shopping"
//                 },
//                 {
//                     "en": "Shopping"
//                 },
//                 "Walmart"
//             ],
//             [
//                 "91943540",
//                 "33136348",
//                 "xxxx6250",
//                 "HALLMARK 5432 MARKHAM ON",
//                 "-20.33",
//                 "2017-06-24T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Shopping"
//                 },
//                 {
//                     "en": "Shopping"
//                 },
//                 "Hallmark"
//             ],
//             [
//                 "91943532",
//                 "33136348",
//                 "xxxx6250",
//                 "RONA # XXXXX UNIONVILLE ON",
//                 "-33.89",
//                 "2017-06-24T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Transportation"
//                 },
//                 {
//                     "en": "Transportation"
//                 },
//                 "76 Gas Station"
//             ],
//             [
//                 "91944288",
//                 "33136352",
//                 "xxxx1914",
//                 "OLLY FRESCO S TORONTO TORONTO ON",
//                 "-3.47",
//                 "2017-06-23T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "Olly Fresco's"
//             ],
//             [
//                 "91943524",
//                 "33136348",
//                 "xxxx6250",
//                 "SHOPPERSDRUGMART0985 TORONTO ON",
//                 "-2.25",
//                 "2017-06-23T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Health"
//                 },
//                 {
//                     "en": "Health"
//                 },
//                 "Shoppers Drug Mart"
//             ],
//             [
//                 "91944284",
//                 "33136352",
//                 "xxxx1914",
//                 "LONGO'S # 15 TORONTO ON",
//                 "-14.95",
//                 "2017-06-22T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "LONGO'S # 15 TORONTO ON"
//             ],
//             [
//                 "91944280",
//                 "33136352",
//                 "xxxx1914",
//                 "LONGO'S # 15 TORONTO ON",
//                 "-9.18",
//                 "2017-06-22T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "LONGO'S # 15 TORONTO ON"
//             ],
//             [
//                 "91944276",
//                 "33136352",
//                 "xxxx1914",
//                 "OLLY FRESCO S TORONTO TORONTO ON",
//                 "-2.98",
//                 "2017-06-22T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "Olly Fresco's"
//             ],
//             [
//                 "91943520",
//                 "33136348",
//                 "xxxx6250",
//                 "SHOPPERSDRUGMART0945 TORONTO ON",
//                 "-24.63",
//                 "2017-06-22T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Health"
//                 },
//                 {
//                     "en": "Health"
//                 },
//                 "Shoppers Drug Mart"
//             ],
//             [
//                 "91943516",
//                 "33136348",
//                 "xxxx6250",
//                 "ESSO 843 DON MILLS ROAD NORTH YORK ON",
//                 "-46.0",
//                 "2017-06-21T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Transportation"
//                 },
//                 {
//                     "en": "Transportation"
//                 },
//                 "Esso"
//             ],
//             [
//                 "91943508",
//                 "33136348",
//                 "xxxx6250",
//                 "PRESTO TORONTO ON",
//                 "-230.0",
//                 "2017-06-21T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Transportation"
//                 },
//                 {
//                     "en": "Transportation"
//                 },
//                 "PRESTO TORONTO ON"
//             ],
//             [
//                 "91944272",
//                 "33136352",
//                 "xxxx1914",
//                 "OLLY FRESCOS TORONTO ON",
//                 "-4.95",
//                 "2017-06-20T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "OLLY FRESCOS TORONTO ON"
//             ],
//             [
//                 "91943504",
//                 "33136348",
//                 "xxxx6250",
//                 "CONSUMER'S CHOICE HM IMPRSCARBOROUGH ON",
//                 "-700.0",
//                 "2017-06-20T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Groceries"
//                 },
//                 {
//                     "en": "Groceries"
//                 },
//                 "CONSUMER'S CHOICE HM IMPRSCARBOROUGH ON"
//             ],
//             [
//                 "91943500",
//                 "33136348",
//                 "xxxx6250",
//                 "DECIEM XXXXXXXXXX ON",
//                 "-33.9",
//                 "2017-06-20T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "DECIEM XXXXXXXXXX ON"
//             ],
//             [
//                 "696637788",
//                 "33136324",
//                 "xxxx6259",
//                 "MISC PAYMENT -CDLSI",
//                 "-329.03",
//                 "2017-06-20T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Other"
//                 },
//                 {
//                     "en": "Other"
//                 },
//                 "MISC PAYMENT -CDLSI"
//             ],
//             [
//                 "91944268",
//                 "33136352",
//                 "xxxx1914",
//                 "PIZZA PIZZA # 84 TORONTO ON",
//                 "-2.25",
//                 "2017-06-19T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "Pizza Pizza"
//             ],
//             [
//                 "91944264",
//                 "33136352",
//                 "xxxx1914",
//                 "LONGO'S # 15 TORONTO ON",
//                 "-30.04",
//                 "2017-06-19T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "LONGO'S # 15 TORONTO ON"
//             ],
//             [
//                 "91944260",
//                 "33136352",
//                 "xxxx1914",
//                 "ESSO NORTH YORK ON",
//                 "-3.96",
//                 "2017-06-19T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Transportation"
//                 },
//                 {
//                     "en": "Transportation"
//                 },
//                 "Esso"
//             ],
//             [
//                 "91944256",
//                 "33136352",
//                 "xxxx1914",
//                 "TIM HORTONS #5797 VAUGHAN ON",
//                 "-19.5",
//                 "2017-06-18T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "Tim Hortons"
//             ],
//             [
//                 "91944252",
//                 "33136352",
//                 "xxxx1914",
//                 "THE GARDEN BASKET MARKHAM ON",
//                 "-4.0",
//                 "2017-06-17T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "THE GARDEN BASKET MARKHAM ON"
//             ],
//             [
//                 "91944248",
//                 "33136352",
//                 "xxxx1914",
//                 "FOOD BASICS #661 MARKHAM ON",
//                 "-145.86",
//                 "2017-06-17T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Groceries"
//                 },
//                 {
//                     "en": "Groceries"
//                 },
//                 "Food Basics"
//             ],
//             [
//                 "91944244",
//                 "33136352",
//                 "xxxx1914",
//                 "LONGO'S # 15 TORONTO ON",
//                 "-15.69",
//                 "2017-06-16T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "LONGO'S # 15 TORONTO ON"
//             ],
//             [
//                 "91943496",
//                 "33136348",
//                 "xxxx6250",
//                 "SHOPPERSDRUGMART0985 TORONTO ON",
//                 "-2.93",
//                 "2017-06-16T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Health"
//                 },
//                 {
//                     "en": "Health"
//                 },
//                 "Shoppers Drug Mart"
//             ],
//             [
//                 "91944240",
//                 "33136352",
//                 "xxxx1914",
//                 "THAI ISLAND TORONTO ON",
//                 "-9.61",
//                 "2017-06-15T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "THAI ISLAND TORONTO ON"
//             ],
//             [
//                 "91943492",
//                 "33136348",
//                 "xxxx6250",
//                 "SHOPPERSDRUGMART0997 TORONTO ON",
//                 "-6.32",
//                 "2017-06-15T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Health"
//                 },
//                 {
//                     "en": "Health"
//                 },
//                 "Shoppers Drug Mart"
//             ],
//             [
//                 "91944236",
//                 "33136352",
//                 "xxxx1914",
//                 "FOOD BASICS #661 MARKHAM ON",
//                 "-58.36",
//                 "2017-06-14T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Groceries"
//                 },
//                 {
//                     "en": "Groceries"
//                 },
//                 "Food Basics"
//             ],
//             [
//                 "91943488",
//                 "33136348",
//                 "xxxx6250",
//                 "SHOPPERS DRUG MART0824 TORONTO ON",
//                 "-23.92",
//                 "2017-06-14T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Health"
//                 },
//                 {
//                     "en": "Health"
//                 },
//                 "Shoppers Drug Mart"
//             ],
//             [
//                 "91943484",
//                 "33136348",
//                 "xxxx6250",
//                 "SHOPPERSDRUGMART0985 TORONTO ON",
//                 "-5.71",
//                 "2017-06-13T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Health"
//                 },
//                 {
//                     "en": "Health"
//                 },
//                 "Shoppers Drug Mart"
//             ],
//             [
//                 "91943480",
//                 "33136348",
//                 "xxxx6250",
//                 "ALDO #1101 TORONTO ON",
//                 "-73.45",
//                 "2017-06-13T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Shopping"
//                 },
//                 {
//                     "en": "Shopping"
//                 },
//                 "Aldo"
//             ],
//             [
//                 "91944232",
//                 "33136352",
//                 "xxxx1914",
//                 "LONGO'S # 15 TORONTO ON",
//                 "-39.01",
//                 "2017-06-12T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "LONGO'S # 15 TORONTO ON"
//             ],
//             [
//                 "91943476",
//                 "33136348",
//                 "xxxx6250",
//                 "GODIVA CHOCOLATIER OF TORONTO ON",
//                 "-16.5",
//                 "2017-06-12T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Groceries"
//                 },
//                 {
//                     "en": "Groceries"
//                 },
//                 "Godiva Chocolatier"
//             ],
//             [
//                 "91943472",
//                 "33136348",
//                 "xxxx6250",
//                 "SHOPPERSDRUGMART0945 TORONTO ON",
//                 "-24.15",
//                 "2017-06-12T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Health"
//                 },
//                 {
//                     "en": "Health"
//                 },
//                 "Shoppers Drug Mart"
//             ],
//             [
//                 "91943468",
//                 "33136348",
//                 "xxxx6250",
//                 "STARBUCKS XXXXX TORONTO ON",
//                 "-2.89",
//                 "2017-06-12T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "Starbucks"
//             ],
//             [
//                 "91943464",
//                 "33136348",
//                 "xxxx6250",
//                 "SHERIDAN NURSERIES UNIONVUNIONVILLE ON",
//                 "13.53",
//                 "2017-06-11T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "In",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Other"
//                 },
//                 {
//                     "en": "Other"
//                 },
//                 "SHERIDAN NURSERIES UNIONVUNIONVILLE ON"
//             ],
//             [
//                 "91943460",
//                 "33136348",
//                 "xxxx6250",
//                 "SHERIDAN NURSERIES UNIONVUNIONVILLE ON",
//                 "-233.37",
//                 "2017-06-11T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Household"
//                 },
//                 {
//                     "en": "Household"
//                 },
//                 "SHERIDAN NURSERIES UNIONVUNIONVILLE ON"
//             ],
//             [
//                 "91943456",
//                 "33136348",
//                 "xxxx6250",
//                 "407ETR WOODBRIDGE ON",
//                 "-76.11",
//                 "2017-06-11T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Travel"
//                 },
//                 {
//                     "en": "Travel"
//                 },
//                 "407 ETR"
//             ],
//             [
//                 "91944228",
//                 "33136352",
//                 "xxxx1914",
//                 "THE GARDEN BASKET MARKHAM ON",
//                 "-84.23",
//                 "2017-06-10T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "THE GARDEN BASKET MARKHAM ON"
//             ],
//             [
//                 "91944224",
//                 "33136352",
//                 "xxxx1914",
//                 "TIM HORTONS 3098 QTH MARKHAM ON",
//                 "-19.86",
//                 "2017-06-10T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "Tim Hortons"
//             ],
//             [
//                 "91944500",
//                 "33136356",
//                 "xxxx6439",
//                 "PRINT THREE TORONTO ON",
//                 "-192.1",
//                 "2017-06-09T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "PRINT THREE TORONTO ON"
//             ],
//             [
//                 "91944220",
//                 "33136352",
//                 "xxxx1914",
//                 "OLLY FRESCOS TORONTO ON",
//                 "-3.23",
//                 "2017-06-09T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "OLLY FRESCOS TORONTO ON"
//             ],
//             [
//                 "91943452",
//                 "33136348",
//                 "xxxx6250",
//                 "PIZZA HUT 2808 UNIONVILLE ON",
//                 "-65.7",
//                 "2017-06-09T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "Pizza Hut"
//             ],
//             [
//                 "91943448",
//                 "33136348",
//                 "xxxx6250",
//                 "INDIGOSPIRIT 581 TORONTO ON",
//                 "-20.0",
//                 "2017-06-09T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Education"
//                 },
//                 {
//                     "en": "Education"
//                 },
//                 "Indigo Spirit"
//             ],
//             [
//                 "91943444",
//                 "33136348",
//                 "xxxx6250",
//                 "ESSO 843 DON MILLS ROAD NORTH YORK ON",
//                 "-46.0",
//                 "2017-06-09T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Transportation"
//                 },
//                 {
//                     "en": "Transportation"
//                 },
//                 "Esso"
//             ],
//             [
//                 "91944216",
//                 "33136352",
//                 "xxxx1914",
//                 "HERO CERTIFIED BURGERS TORONTO ON",
//                 "-6.43",
//                 "2017-06-08T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "HERO CERTIFIED BURGERS TORONTO ON"
//             ],
//             [
//                 "91943440",
//                 "33136348",
//                 "xxxx6250",
//                 "SHOPPERSDRUGMART0985 TORONTO ON",
//                 "-10.49",
//                 "2017-06-08T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Health"
//                 },
//                 {
//                     "en": "Health"
//                 },
//                 "Shoppers Drug Mart"
//             ],
//             [
//                 "91943436",
//                 "33136348",
//                 "xxxx6250",
//                 "RUNNING ROOM-COMMERCE COUTORONTO ON",
//                 "-10.72",
//                 "2017-06-08T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Shopping"
//                 },
//                 {
//                     "en": "Shopping"
//                 },
//                 "RUNNING ROOM-COMMERCE COUTORONTO ON"
//             ],
//             [
//                 "91944212",
//                 "33136352",
//                 "xxxx1914",
//                 "LONGO'S # 15 TORONTO ON",
//                 "-3.42",
//                 "2017-06-07T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "LONGO'S # 15 TORONTO ON"
//             ],
//             [
//                 "91944208",
//                 "33136352",
//                 "xxxx1914",
//                 "TIM HORTONS 3235 QTH TORONTO ON",
//                 "-2.3",
//                 "2017-06-06T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "Tim Hortons"
//             ],
//             [
//                 "91943432",
//                 "33136348",
//                 "xxxx6250",
//                 "INDIGO - BROOKFIELD OFFICTORONTO ON",
//                 "-225.0",
//                 "2017-06-06T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Shopping"
//                 },
//                 {
//                     "en": "Shopping"
//                 },
//                 "IndiGo"
//             ],
//             [
//                 "91943428",
//                 "33136348",
//                 "xxxx6250",
//                 "SHOPPERSDRUGMART0985 TORONTO ON",
//                 "-19.75",
//                 "2017-06-06T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Health"
//                 },
//                 {
//                     "en": "Health"
//                 },
//                 "Shoppers Drug Mart"
//             ],
//             [
//                 "91943424",
//                 "33136348",
//                 "xxxx6250",
//                 "PERKOPOLISCOM XXX-XXX-XXXX ON",
//                 "-130.2",
//                 "2017-06-06T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Other"
//                 },
//                 {
//                     "en": "Other"
//                 },
//                 "PERKOPOLISCOM XXX-XXX-XXXX ON"
//             ],
//             [
//                 "696637732",
//                 "33136324",
//                 "xxxx6259",
//                 "MISC PAYMENT -CDLSI",
//                 "-329.03",
//                 "2017-06-06T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Other"
//                 },
//                 {
//                     "en": "Other"
//                 },
//                 "MISC PAYMENT -CDLSI"
//             ],
//             [
//                 "91944204",
//                 "33136352",
//                 "xxxx1914",
//                 "LONGO'S # 15 TORONTO ON",
//                 "-16.19",
//                 "2017-06-05T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "LONGO'S # 15 TORONTO ON"
//             ],
//             [
//                 "91943420",
//                 "33136348",
//                 "xxxx6250",
//                 "ROGERS *XXXXXXXXX XXX-XXX-XXXX ON",
//                 "-45.19",
//                 "2017-06-05T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Utilities"
//                 },
//                 {
//                     "en": "Utilities"
//                 },
//                 "Rogers Communications"
//             ],
//             [
//                 "91944200",
//                 "33136352",
//                 "xxxx1914",
//                 "FOOD BASICS #661 MARKHAM ON",
//                 "-6.75",
//                 "2017-06-04T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Groceries"
//                 },
//                 {
//                     "en": "Groceries"
//                 },
//                 "Food Basics"
//             ],
//             [
//                 "91944196",
//                 "33136352",
//                 "xxxx1914",
//                 "FOOD BASICS #661 MARKHAM ON",
//                 "-228.38",
//                 "2017-06-04T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Groceries"
//                 },
//                 {
//                     "en": "Groceries"
//                 },
//                 "Food Basics"
//             ],
//             [
//                 "91943416",
//                 "33136348",
//                 "xxxx6250",
//                 "DOLLARAMA # 847 MARKHAM ON",
//                 "-8.76",
//                 "2017-06-04T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Shopping"
//                 },
//                 {
//                     "en": "Shopping"
//                 },
//                 "DOLLARAMA # 847 MARKHAM ON"
//             ],
//             [
//                 "91943412",
//                 "33136348",
//                 "xxxx6250",
//                 "RONA # XXXXX UNIONVILLE ON",
//                 "-63.27",
//                 "2017-06-04T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Transportation"
//                 },
//                 {
//                     "en": "Transportation"
//                 },
//                 "76 Gas Station"
//             ],
//             [
//                 "91944496",
//                 "33136356",
//                 "xxxx6439",
//                 "GOOGLE *SVCSAPPS_cidae g.co/payhelp#ON",
//                 "-1.12",
//                 "2017-06-02T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Other"
//                 },
//                 {
//                     "en": "Other"
//                 },
//                 "Google"
//             ],
//             [
//                 "91944192",
//                 "33136352",
//                 "xxxx1914",
//                 "TAHINI TORONTO ON",
//                 "-10.72",
//                 "2017-06-02T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Travel"
//                 },
//                 {
//                     "en": "Travel"
//                 },
//                 "TAHINI TORONTO ON"
//             ],
//             [
//                 "91944188",
//                 "33136352",
//                 "xxxx1914",
//                 "OLLY FRESCOS TORONTO ON",
//                 "-5.07",
//                 "2017-06-02T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "OLLY FRESCOS TORONTO ON"
//             ],
//             [
//                 "91943400",
//                 "33136348",
//                 "xxxx6250",
//                 "INDIGOSPIRIT 581 TORONTO ON",
//                 "-10.11",
//                 "2017-06-02T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Education"
//                 },
//                 {
//                     "en": "Education"
//                 },
//                 "Indigo Spirit"
//             ],
//             [
//                 "91943396",
//                 "33136348",
//                 "xxxx6250",
//                 "ROGERS *XXXXXXXXX XXX-XXX-XXXX ON",
//                 "-52.59",
//                 "2017-06-02T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Utilities"
//                 },
//                 {
//                     "en": "Utilities"
//                 },
//                 "Rogers Communications"
//             ],
//             [
//                 "91944184",
//                 "33136352",
//                 "xxxx1914",
//                 "OLLY FRESCOS TORONTO ON",
//                 "-2.98",
//                 "2017-06-01T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "OLLY FRESCOS TORONTO ON"
//             ],
//             [
//                 "91944180",
//                 "33136352",
//                 "xxxx1914",
//                 "TIM HORTONS #5551# QTH TORONTO ON",
//                 "-9.98",
//                 "2017-06-01T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "Tim Hortons"
//             ],
//             [
//                 "91943392",
//                 "33136348",
//                 "xxxx6250",
//                 "SHOPPERSDRUGMART0997 TORONTO ON",
//                 "-4.72",
//                 "2017-06-01T00:00:00.000Z",
//                 "Charge",
//                 "6",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Health"
//                 },
//                 {
//                     "en": "Health"
//                 },
//                 "Shoppers Drug Mart"
//             ],
//             [
//                 "91944176",
//                 "33136352",
//                 "xxxx1914",
//                 "OLLY FRESCOS TORONTO ON",
//                 "-2.98",
//                 "2017-05-31T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "OLLY FRESCOS TORONTO ON"
//             ],
//             [
//                 "91944172",
//                 "33136352",
//                 "xxxx1914",
//                 "OLLY FRESCOS TORONTO ON",
//                 "-9.0",
//                 "2017-05-31T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "OLLY FRESCOS TORONTO ON"
//             ],
//             [
//                 "91944168",
//                 "33136352",
//                 "xxxx1914",
//                 "THE GARDEN BASKET MARKHAM ON",
//                 "-69.36",
//                 "2017-05-31T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "THE GARDEN BASKET MARKHAM ON"
//             ],
//             [
//                 "91943388",
//                 "33136348",
//                 "xxxx6250",
//                 "LOWES #XXXXX* SCARBOROUGH ON",
//                 "-186.35",
//                 "2017-05-31T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Household"
//                 },
//                 {
//                     "en": "Household"
//                 },
//                 "Lowe's"
//             ],
//             [
//                 "91943384",
//                 "33136348",
//                 "xxxx6250",
//                 "THE HUDSON'S BAY CENTR TORONTO ON",
//                 "-15.0",
//                 "2017-05-31T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "THE HUDSON'S BAY CENTR TORONTO ON"
//             ],
//             [
//                 "91944164",
//                 "33136352",
//                 "xxxx1914",
//                 "TIM HORTONS #5551# QTH TORONTO ON",
//                 "-2.71",
//                 "2017-05-30T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "Tim Hortons"
//             ],
//             [
//                 "91944160",
//                 "33136352",
//                 "xxxx1914",
//                 "OLLY FRESCOS TORONTO ON",
//                 "-2.98",
//                 "2017-05-30T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "OLLY FRESCOS TORONTO ON"
//             ],
//             [
//                 "91944156",
//                 "33136352",
//                 "xxxx1914",
//                 "MCEWAN TORONTO ON",
//                 "-11.04",
//                 "2017-05-30T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Groceries"
//                 },
//                 {
//                     "en": "Groceries"
//                 },
//                 "Mcewan Enterprise"
//             ],
//             [
//                 "91944152",
//                 "33136352",
//                 "xxxx1914",
//                 "PURDY'S CHOCOLATES # 8 TORONTO ON",
//                 "-6.78",
//                 "2017-05-30T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Groceries"
//                 },
//                 {
//                     "en": "Groceries"
//                 },
//                 "PURDY'S CHOCOLATES # 8 TORONTO ON"
//             ],
//             [
//                 "91943380",
//                 "33136348",
//                 "xxxx6250",
//                 "CREATIVEMARKET.COM XXXXXXXXXX CA 6.00 USD @ 1.XXXXXXXXXXXX",
//                 "-8.31",
//                 "2017-05-30T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Other"
//                 },
//                 {
//                     "en": "Other"
//                 },
//                 "Creative Market"
//             ],
//             [
//                 "91943376",
//                 "33136348",
//                 "xxxx6250",
//                 "SHOPPERSDRUGMART0985 TORONTO ON",
//                 "-46.92",
//                 "2017-05-30T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Health"
//                 },
//                 {
//                     "en": "Health"
//                 },
//                 "Shoppers Drug Mart"
//             ],
//             [
//                 "91943372",
//                 "33136348",
//                 "xxxx6250",
//                 "THE HUDSON'S BAY CENTR TORONTO ON",
//                 "-15.0",
//                 "2017-05-30T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "THE HUDSON'S BAY CENTR TORONTO ON"
//             ],
//             [
//                 "91943368",
//                 "33136348",
//                 "xxxx6250",
//                 "THE HUDSON'S BAY CENTR TORONTO ON",
//                 "-15.0",
//                 "2017-05-29T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "THE HUDSON'S BAY CENTR TORONTO ON"
//             ],
//             [
//                 "91943364",
//                 "33136348",
//                 "xxxx6250",
//                 "ESSO 843 DON MILLS ROAD NORTH YORK ON",
//                 "-50.02",
//                 "2017-05-29T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Transportation"
//                 },
//                 {
//                     "en": "Transportation"
//                 },
//                 "Esso"
//             ],
//             [
//                 "91943360",
//                 "33136348",
//                 "xxxx6250",
//                 "MARKHAM EYE AND VISION MARKHAM ON",
//                 "-100.0",
//                 "2017-05-29T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Shopping"
//                 },
//                 {
//                     "en": "Shopping"
//                 },
//                 "MARKHAM EYE AND VISION MARKHAM ON"
//             ],
//             [
//                 "91944148",
//                 "33136352",
//                 "xxxx1914",
//                 "TIM HORTONS 3098 QTH MARKHAM ON",
//                 "-6.93",
//                 "2017-05-27T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "Tim Hortons"
//             ],
//             [
//                 "91944144",
//                 "33136352",
//                 "xxxx1914",
//                 "FOOD BASICS #661 MARKHAM ON",
//                 "-143.21",
//                 "2017-05-27T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Groceries"
//                 },
//                 {
//                     "en": "Groceries"
//                 },
//                 "Food Basics"
//             ],
//             [
//                 "91944140",
//                 "33136352",
//                 "xxxx1914",
//                 "MARCHE RESTAURANTS CAN TORONTO ON",
//                 "-6.77",
//                 "2017-05-26T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "MARCHE RESTAURANTS CAN TORONTO ON"
//             ],
//             [
//                 "91944136",
//                 "33136352",
//                 "xxxx1914",
//                 "TIM HORTONS 3235 QTH TORONTO ON",
//                 "-3.21",
//                 "2017-05-26T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "Tim Hortons"
//             ],
//             [
//                 "91944132",
//                 "33136352",
//                 "xxxx1914",
//                 "MMMUFFINS #835 TORONTO ON",
//                 "-3.26",
//                 "2017-05-26T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "MMMUFFINS #835 TORONTO ON"
//             ],
//             [
//                 "91943356",
//                 "33136348",
//                 "xxxx6250",
//                 "BOZ ELECTRIC SUPPLY LTD. RICHMOND HILLON",
//                 "-27.32",
//                 "2017-05-26T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Utilities"
//                 },
//                 {
//                     "en": "Utilities"
//                 },
//                 "BOZ ELECTRIC SUPPLY LTD. RICHMOND HILLON"
//             ],
//             [
//                 "91943352",
//                 "33136348",
//                 "xxxx6250",
//                 "THE HUDSON'S BAY CENTR TORONTO ON",
//                 "-15.0",
//                 "2017-05-26T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "THE HUDSON'S BAY CENTR TORONTO ON"
//             ],
//             [
//                 "91943348",
//                 "33136348",
//                 "xxxx6250",
//                 "THE BODY SHOP 1492 TORONTO ON",
//                 "-45.2",
//                 "2017-05-26T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Shopping"
//                 },
//                 {
//                     "en": "Shopping"
//                 },
//                 "The Body Shop"
//             ],
//             [
//                 "91944128",
//                 "33136352",
//                 "xxxx1914",
//                 "VILLA MADINA TORONTO ON",
//                 "-11.06",
//                 "2017-05-25T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "VILLA MADINA TORONTO ON"
//             ],
//             [
//                 "91944124",
//                 "33136352",
//                 "xxxx1914",
//                 "NOFRILLS DACOSTA'S #71 MARKHAM ON",
//                 "-16.92",
//                 "2017-05-25T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Groceries"
//                 },
//                 {
//                     "en": "Groceries"
//                 },
//                 "No Frills"
//             ],
//             [
//                 "91943344",
//                 "33136348",
//                 "xxxx6250",
//                 "SHOPPERSDRUGMART0985 TORONTO ON",
//                 "-7.88",
//                 "2017-05-25T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Health"
//                 },
//                 {
//                     "en": "Health"
//                 },
//                 "Shoppers Drug Mart"
//             ],
//             [
//                 "91943336",
//                 "33136348",
//                 "xxxx6250",
//                 "PRESTO TORONTO ON",
//                 "-230.0",
//                 "2017-05-25T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Transportation"
//                 },
//                 {
//                     "en": "Transportation"
//                 },
//                 "PRESTO TORONTO ON"
//             ],
//             [
//                 "91943332",
//                 "33136348",
//                 "xxxx6250",
//                 "THE HUDSON'S BAY CENTR TORONTO ON",
//                 "-15.0",
//                 "2017-05-25T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "THE HUDSON'S BAY CENTR TORONTO ON"
//             ],
//             [
//                 "91944120",
//                 "33136352",
//                 "xxxx1914",
//                 "TAHINI TORONTO ON",
//                 "-10.72",
//                 "2017-05-24T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Travel"
//                 },
//                 {
//                     "en": "Travel"
//                 },
//                 "TAHINI TORONTO ON"
//             ],
//             [
//                 "91944116",
//                 "33136352",
//                 "xxxx1914",
//                 "OLLY FRESCOS TORONTO ON",
//                 "-2.98",
//                 "2017-05-24T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "OLLY FRESCOS TORONTO ON"
//             ],
//             [
//                 "91944112",
//                 "33136352",
//                 "xxxx1914",
//                 "TIM HORTON'S #2704 TORONTO ON",
//                 "-1.88",
//                 "2017-05-24T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "Tim Hortons"
//             ],
//             [
//                 "91943320",
//                 "33136348",
//                 "xxxx6250",
//                 "THE HUDSON'S BAY CENTR TORONTO ON",
//                 "-15.0",
//                 "2017-05-24T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "THE HUDSON'S BAY CENTR TORONTO ON"
//             ],
//             [
//                 "91944108",
//                 "33136352",
//                 "xxxx1914",
//                 "OLLY FRESCOS TORONTO ON",
//                 "-2.98",
//                 "2017-05-23T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "OLLY FRESCOS TORONTO ON"
//             ],
//             [
//                 "91944104",
//                 "33136352",
//                 "xxxx1914",
//                 "Z-TECA GOURMET BURRITO TORONTO ON",
//                 "-10.11",
//                 "2017-05-23T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "Z-TECA GOURMET BURRITO TORONTO ON"
//             ],
//             [
//                 "91943316",
//                 "33136348",
//                 "xxxx6250",
//                 "THE HUDSON'S BAY CENTR TORONTO ON",
//                 "-15.0",
//                 "2017-05-23T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "THE HUDSON'S BAY CENTR TORONTO ON"
//             ],
//             [
//                 "91943312",
//                 "33136348",
//                 "xxxx6250",
//                 "MMMUFFINS #835 TORONTO ON",
//                 "-7.75",
//                 "2017-05-23T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "MMMUFFINS #835 TORONTO ON"
//             ],
//             [
//                 "91943308",
//                 "33136348",
//                 "xxxx6250",
//                 "MARCHE RESTAURANTS CANADATORONTO ON",
//                 "-2.4",
//                 "2017-05-23T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "MARCHE RESTAURANTS CANADATORONTO ON"
//             ],
//             [
//                 "696637676",
//                 "33136324",
//                 "xxxx6259",
//                 "MISC PAYMENT -CDLSI",
//                 "-329.03",
//                 "2017-05-23T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Other"
//                 },
//                 {
//                     "en": "Other"
//                 },
//                 "MISC PAYMENT -CDLSI"
//             ],
//             [
//                 "91943304",
//                 "33136348",
//                 "xxxx6250",
//                 "CITIZEN&amp;IMM-EAPPS ENLIGNEOTTAWA ON",
//                 "-150.0",
//                 "2017-05-22T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Transportation"
//                 },
//                 {
//                     "en": "Transportation"
//                 },
//                 "CITIZEN&amp;IMM-EAPPS ENLIGNEOTTAWA ON"
//             ],
//             [
//                 "91944100",
//                 "33136352",
//                 "xxxx1914",
//                 "FOODLAND 6447 HALIBURTON ON",
//                 "-121.54",
//                 "2017-05-20T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Groceries"
//                 },
//                 {
//                     "en": "Groceries"
//                 },
//                 "FoodLand"
//             ],
//             [
//                 "91944096",
//                 "33136352",
//                 "xxxx1914",
//                 "OLLY FRESCOS TORONTO ON",
//                 "-3.07",
//                 "2017-05-19T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "OLLY FRESCOS TORONTO ON"
//             ],
//             [
//                 "91943296",
//                 "33136348",
//                 "xxxx6250",
//                 "LIGHT/MINI IN THE BOX COVENTRY 34.26 USD @ 1.XXXXXXXXXXXX",
//                 "45.11",
//                 "2017-05-19T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "In",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Other"
//                 },
//                 {
//                     "en": "Other"
//                 },
//                 "LIGHT/MINI IN THE BOX COVENTRY 34.26 USD @ 1.XXXXXXXXXXXX"
//             ],
//             [
//                 "91943288",
//                 "33136348",
//                 "xxxx6250",
//                 "LIGHT/MINI IN THE BOX COVENTRY",
//                 "44.09",
//                 "2017-05-19T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "In",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Other"
//                 },
//                 {
//                     "en": "Other"
//                 },
//                 "LIGHT/MINI IN THE BOX COVENTRY"
//             ],
//             [
//                 "91943284",
//                 "33136348",
//                 "xxxx6250",
//                 "THE HUDSON'S BAY CENTR TORONTO ON",
//                 "-15.0",
//                 "2017-05-19T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "THE HUDSON'S BAY CENTR TORONTO ON"
//             ],
//             [
//                 "91944092",
//                 "33136352",
//                 "xxxx1914",
//                 "OLLY FRESCOS TORONTO ON",
//                 "-2.98",
//                 "2017-05-18T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "OLLY FRESCOS TORONTO ON"
//             ],
//             [
//                 "91943280",
//                 "33136348",
//                 "xxxx6250",
//                 "SHOPPERSDRUGMART0985 TORONTO ON",
//                 "-48.73",
//                 "2017-05-18T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Health"
//                 },
//                 {
//                     "en": "Health"
//                 },
//                 "Shoppers Drug Mart"
//             ],
//             [
//                 "91943276",
//                 "33136348",
//                 "xxxx6250",
//                 "THE HUDSON'S BAY CENTR TORONTO ON",
//                 "-15.0",
//                 "2017-05-18T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "THE HUDSON'S BAY CENTR TORONTO ON"
//             ],
//             [
//                 "91944088",
//                 "33136352",
//                 "xxxx1914",
//                 "OLLY FRESCOS TORONTO ON",
//                 "-2.98",
//                 "2017-05-17T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "OLLY FRESCOS TORONTO ON"
//             ],
//             [
//                 "91943268",
//                 "33136348",
//                 "xxxx6250",
//                 "SHOPPERSDRUGMART0945 TORONTO ON",
//                 "-14.33",
//                 "2017-05-17T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Health"
//                 },
//                 {
//                     "en": "Health"
//                 },
//                 "Shoppers Drug Mart"
//             ],
//             [
//                 "91943264",
//                 "33136348",
//                 "xxxx6250",
//                 "DECIEM XXXXXXXXXX ON",
//                 "-37.63",
//                 "2017-05-17T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "DECIEM XXXXXXXXXX ON"
//             ],
//             [
//                 "91943260",
//                 "33136348",
//                 "xxxx6250",
//                 "THE HUDSON'S BAY CENTR TORONTO ON",
//                 "-15.0",
//                 "2017-05-17T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "THE HUDSON'S BAY CENTR TORONTO ON"
//             ],
//             [
//                 "91943256",
//                 "33136348",
//                 "xxxx6250",
//                 "BREATH-E-Z VACUUM SERVICEBRAMPTON ON",
//                 "-333.82",
//                 "2017-05-17T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "BREATH-E-Z VACUUM SERVICEBRAMPTON ON"
//             ],
//             [
//                 "91944084",
//                 "33136352",
//                 "xxxx1914",
//                 "TIM HORTON'S #2704 TORONTO ON",
//                 "-0.22",
//                 "2017-05-16T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "Tim Hortons"
//             ],
//             [
//                 "91944080",
//                 "33136352",
//                 "xxxx1914",
//                 "OLLY FRESCOS TORONTO ON",
//                 "-1.25",
//                 "2017-05-16T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "OLLY FRESCOS TORONTO ON"
//             ],
//             [
//                 "91943252",
//                 "33136348",
//                 "xxxx6250",
//                 "THE HUDSON'S BAY CENTR TORONTO ON",
//                 "-15.0",
//                 "2017-05-16T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "THE HUDSON'S BAY CENTR TORONTO ON"
//             ],
//             [
//                 "91943248",
//                 "33136348",
//                 "xxxx6250",
//                 "SP * CAMERA READY COSM HTTPSCAMERARETX 35.13 USD @ 1.XXXXXXXXXXXX",
//                 "-49.19",
//                 "2017-05-16T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Entertainment"
//                 },
//                 {
//                     "en": "Entertainment"
//                 },
//                 "SP * CAMERA READY COSM HTTPSCAMERARETX 35.13 USD @ 1.XXXXXXXXXXXX"
//             ],
//             [
//                 "91944076",
//                 "33136352",
//                 "xxxx1914",
//                 "OLLY FRESCOS TORONTO ON",
//                 "-2.98",
//                 "2017-05-15T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "OLLY FRESCOS TORONTO ON"
//             ],
//             [
//                 "91944072",
//                 "33136352",
//                 "xxxx1914",
//                 "SOUP NUTSY TORONTO ON",
//                 "-9.71",
//                 "2017-05-15T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Other"
//                 },
//                 {
//                     "en": "Other"
//                 },
//                 "SOUP NUTSY TORONTO ON"
//             ],
//             [
//                 "91943244",
//                 "33136348",
//                 "xxxx6250",
//                 "THE HUDSON'S BAY CENTR TORONTO ON",
//                 "-15.0",
//                 "2017-05-15T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "THE HUDSON'S BAY CENTR TORONTO ON"
//             ],
//             [
//                 "91943240",
//                 "33136348",
//                 "xxxx6250",
//                 "RONA # XXXXX UNIONVILLE ON",
//                 "-8.36",
//                 "2017-05-15T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Transportation"
//                 },
//                 {
//                     "en": "Transportation"
//                 },
//                 "76 Gas Station"
//             ],
//             [
//                 "91944068",
//                 "33136352",
//                 "xxxx1914",
//                 "FOOD BASICS #661 MARKHAM ON",
//                 "-158.91",
//                 "2017-05-14T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Groceries"
//                 },
//                 {
//                     "en": "Groceries"
//                 },
//                 "Food Basics"
//             ],
//             [
//                 "91943236",
//                 "33136348",
//                 "xxxx6250",
//                 "ANGUS GLEN GOLF CLUB LTD MARKHAM ON",
//                 "-240.58",
//                 "2017-05-14T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Transportation"
//                 },
//                 {
//                     "en": "Transportation"
//                 },
//                 "Gas N' Go"
//             ],
//             [
//                 "91944064",
//                 "33136352",
//                 "xxxx1914",
//                 "TIM HORTONS 3098 QTH MARKHAM ON",
//                 "-9.06",
//                 "2017-05-13T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "Tim Hortons"
//             ],
//             [
//                 "91944060",
//                 "33136352",
//                 "xxxx1914",
//                 "OLLY FRESCOS TORONTO ON",
//                 "-2.98",
//                 "2017-05-12T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "OLLY FRESCOS TORONTO ON"
//             ],
//             [
//                 "91944056",
//                 "33136352",
//                 "xxxx1914",
//                 "SOUP NUTSY TORONTO ON",
//                 "-9.37",
//                 "2017-05-12T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Other"
//                 },
//                 {
//                     "en": "Other"
//                 },
//                 "SOUP NUTSY TORONTO ON"
//             ],
//             [
//                 "91944052",
//                 "33136352",
//                 "xxxx1914",
//                 "MMMUFFINS #835 TORONTO ON",
//                 "-3.26",
//                 "2017-05-12T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "MMMUFFINS #835 TORONTO ON"
//             ],
//             [
//                 "91943232",
//                 "33136348",
//                 "xxxx6250",
//                 "THE HUDSON'S BAY CENTR TORONTO ON",
//                 "-15.0",
//                 "2017-05-12T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "THE HUDSON'S BAY CENTR TORONTO ON"
//             ],
//             [
//                 "91943224",
//                 "33136348",
//                 "xxxx6250",
//                 "SHOPPERS DRUG MART #1013 MARKHAM ON",
//                 "-30.48",
//                 "2017-05-12T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Health"
//                 },
//                 {
//                     "en": "Health"
//                 },
//                 "Shoppers Drug Mart"
//             ],
//             [
//                 "91944492",
//                 "33136356",
//                 "xxxx6439",
//                 "GOOGLE *SVCSAPPS_cidae g.co/payhelp#ON",
//                 "-13.0",
//                 "2017-05-11T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Other"
//                 },
//                 {
//                     "en": "Other"
//                 },
//                 "Google"
//             ],
//             [
//                 "91944048",
//                 "33136352",
//                 "xxxx1914",
//                 "SOUP NUTSY TORONTO ON",
//                 "-9.71",
//                 "2017-05-11T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Other"
//                 },
//                 {
//                     "en": "Other"
//                 },
//                 "SOUP NUTSY TORONTO ON"
//             ],
//             [
//                 "91944044",
//                 "33136352",
//                 "xxxx1914",
//                 "OLLY FRESCOS TORONTO ON",
//                 "-5.07",
//                 "2017-05-11T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "OLLY FRESCOS TORONTO ON"
//             ],
//             [
//                 "91943220",
//                 "33136348",
//                 "xxxx6250",
//                 "LINDT SPRUNGLI TORONTO ON",
//                 "-10.74",
//                 "2017-05-11T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "LINDT & SPRUNGLI'S"
//             ],
//             [
//                 "91943216",
//                 "33136348",
//                 "xxxx6250",
//                 "407ETR WOODBRIDGE ON",
//                 "-131.6",
//                 "2017-05-11T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Travel"
//                 },
//                 {
//                     "en": "Travel"
//                 },
//                 "407 ETR"
//             ],
//             [
//                 "91943212",
//                 "33136348",
//                 "xxxx6250",
//                 "THE HUDSON'S BAY CENTR TORONTO ON",
//                 "-15.0",
//                 "2017-05-11T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "THE HUDSON'S BAY CENTR TORONTO ON"
//             ],
//             [
//                 "91943208",
//                 "33136348",
//                 "xxxx6250",
//                 "THE HUDSON'S BAY CENTR TORONTO ON",
//                 "-15.0",
//                 "2017-05-10T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "THE HUDSON'S BAY CENTR TORONTO ON"
//             ],
//             [
//                 "91943204",
//                 "33136348",
//                 "xxxx6250",
//                 "SHOPPERSDRUGMART0985 TORONTO ON",
//                 "-12.41",
//                 "2017-05-10T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Health"
//                 },
//                 {
//                     "en": "Health"
//                 },
//                 "Shoppers Drug Mart"
//             ],
//             [
//                 "91943200",
//                 "33136348",
//                 "xxxx6250",
//                 "LIGHT/MINI IN THE BOX COVENTRY 157.46 USD @ 1.4098",
//                 "-221.99",
//                 "2017-05-09T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Entertainment"
//                 },
//                 {
//                     "en": "Entertainment"
//                 },
//                 "LIGHT/MINI IN THE BOX COVENTRY 157.46 USD @ 1.4098"
//             ],
//             [
//                 "91943196",
//                 "33136348",
//                 "xxxx6250",
//                 "THE HUDSON'S BAY CENTR TORONTO ON",
//                 "-15.0",
//                 "2017-05-09T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "THE HUDSON'S BAY CENTR TORONTO ON"
//             ],
//             [
//                 "696637636",
//                 "33136324",
//                 "xxxx6259",
//                 "MISC PAYMENT -CDLSI",
//                 "-329.03",
//                 "2017-05-09T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Other"
//                 },
//                 {
//                     "en": "Other"
//                 },
//                 "MISC PAYMENT -CDLSI"
//             ],
//             [
//                 "91943192",
//                 "33136348",
//                 "xxxx6250",
//                 "THE HUDSON'S BAY CENTR TORONTO ON",
//                 "-15.0",
//                 "2017-05-08T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "THE HUDSON'S BAY CENTR TORONTO ON"
//             ],
//             [
//                 "91943188",
//                 "33136348",
//                 "xxxx6250",
//                 "ROGERS *XXXXXXXXX XXX-XXX-XXXX ON",
//                 "-39.59",
//                 "2017-05-08T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Utilities"
//                 },
//                 {
//                     "en": "Utilities"
//                 },
//                 "Rogers Communications"
//             ],
//             [
//                 "91944040",
//                 "33136352",
//                 "xxxx1914",
//                 "FOOD BASICS #661 MARKHAM ON",
//                 "-120.9",
//                 "2017-05-07T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Groceries"
//                 },
//                 {
//                     "en": "Groceries"
//                 },
//                 "Food Basics"
//             ],
//             [
//                 "91944036",
//                 "33136352",
//                 "xxxx1914",
//                 "LOBLAWS 1032 MARKHAM ON",
//                 "-23.98",
//                 "2017-05-07T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Shopping"
//                 },
//                 {
//                     "en": "Shopping"
//                 },
//                 "LOBLAWS 1032 MARKHAM ON"
//             ],
//             [
//                 "91944032",
//                 "33136352",
//                 "xxxx1914",
//                 "TIM HORTONS 3098 QTH MARKHAM ON",
//                 "-24.39",
//                 "2017-05-06T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "Tim Hortons"
//             ],
//             [
//                 "91943184",
//                 "33136348",
//                 "xxxx6250",
//                 "VICTORIAS SECRET 1621 MARKHAM ON",
//                 "-63.28",
//                 "2017-05-06T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Shopping"
//                 },
//                 {
//                     "en": "Shopping"
//                 },
//                 "Victoria's Secret"
//             ],
//             [
//                 "91943180",
//                 "33136348",
//                 "xxxx6250",
//                 "HUDSON'S BAY #1532 MARKHAM ON",
//                 "107.58",
//                 "2017-05-06T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "In",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Other"
//                 },
//                 {
//                     "en": "Other"
//                 },
//                 "HUDSON'S BAY #1532 MARKHAM ON"
//             ],
//             [
//                 "91943176",
//                 "33136348",
//                 "xxxx6250",
//                 "DHL EXPRESS CANADA LTD BRAMPTON ON",
//                 "-34.26",
//                 "2017-05-06T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Household"
//                 },
//                 {
//                     "en": "Household"
//                 },
//                 "DHL EXPRESS CANADA LTD BRAMPTON ON"
//             ],
//             [
//                 "91944028",
//                 "33136352",
//                 "xxxx1914",
//                 "OLLY FRESCOS TORONTO ON",
//                 "-5.07",
//                 "2017-05-05T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "OLLY FRESCOS TORONTO ON"
//             ],
//             [
//                 "91943172",
//                 "33136348",
//                 "xxxx6250",
//                 "DHL EXPRESS CANADA LTD BRAMPTON ON",
//                 "-44.09",
//                 "2017-05-05T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Household"
//                 },
//                 {
//                     "en": "Household"
//                 },
//                 "DHL EXPRESS CANADA LTD BRAMPTON ON"
//             ],
//             [
//                 "91943168",
//                 "33136348",
//                 "xxxx6250",
//                 "RONA # XXXXX UNIONVILLE ON",
//                 "-8.8",
//                 "2017-05-05T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Transportation"
//                 },
//                 {
//                     "en": "Transportation"
//                 },
//                 "76 Gas Station"
//             ],
//             [
//                 "91943164",
//                 "33136348",
//                 "xxxx6250",
//                 "SHOPPERSDRUGMART0945 TORONTO ON",
//                 "-6.96",
//                 "2017-05-05T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Health"
//                 },
//                 {
//                     "en": "Health"
//                 },
//                 "Shoppers Drug Mart"
//             ],
//             [
//                 "91943160",
//                 "33136348",
//                 "xxxx6250",
//                 "THE HUDSON'S BAY CENTR TORONTO ON",
//                 "-15.0",
//                 "2017-05-05T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "THE HUDSON'S BAY CENTR TORONTO ON"
//             ],
//             [
//                 "91943156",
//                 "33136348",
//                 "xxxx6250",
//                 "MUCHO BURRITO TORONTO ON",
//                 "-8.48",
//                 "2017-05-05T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "MUCHO BURRITO TORONTO ON"
//             ],
//             [
//                 "91944024",
//                 "33136352",
//                 "xxxx1914",
//                 "OLLY FRESCOS TORONTO ON",
//                 "-5.07",
//                 "2017-05-04T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "OLLY FRESCOS TORONTO ON"
//             ],
//             [
//                 "91944020",
//                 "33136352",
//                 "xxxx1914",
//                 "MMMUFFINS #835 TORONTO ON",
//                 "-5.25",
//                 "2017-05-04T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "MMMUFFINS #835 TORONTO ON"
//             ],
//             [
//                 "91943148",
//                 "33136348",
//                 "xxxx6250",
//                 "THE HUDSON'S BAY CENTR TORONTO ON",
//                 "-15.0",
//                 "2017-05-04T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "THE HUDSON'S BAY CENTR TORONTO ON"
//             ],
//             [
//                 "91944016",
//                 "33136352",
//                 "xxxx1914",
//                 "OLLY FRESCOS TORONTO ON",
//                 "-5.07",
//                 "2017-05-03T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "OLLY FRESCOS TORONTO ON"
//             ],
//             [
//                 "91943144",
//                 "33136348",
//                 "xxxx6250",
//                 "THE HUDSON'S BAY CENTR TORONTO ON",
//                 "-15.0",
//                 "2017-05-03T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "THE HUDSON'S BAY CENTR TORONTO ON"
//             ],
//             [
//                 "91943140",
//                 "33136348",
//                 "xxxx6250",
//                 "PETROCAN-2830-16TH AVE MARKHAM ON",
//                 "-48.0",
//                 "2017-05-03T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Transportation"
//                 },
//                 {
//                     "en": "Transportation"
//                 },
//                 "Petro-Canada"
//             ],
//             [
//                 "91943136",
//                 "33136348",
//                 "xxxx6250",
//                 "PRESTO TORONTO ON",
//                 "-230.0",
//                 "2017-05-03T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Transportation"
//                 },
//                 {
//                     "en": "Transportation"
//                 },
//                 "PRESTO TORONTO ON"
//             ],
//             [
//                 "91944012",
//                 "33136352",
//                 "xxxx1914",
//                 "OLLY FRESCOS TORONTO ON",
//                 "-5.07",
//                 "2017-05-02T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "OLLY FRESCOS TORONTO ON"
//             ],
//             [
//                 "91943132",
//                 "33136348",
//                 "xxxx6250",
//                 "LIGHT/MINI IN THE BOX COVENTRY 105.31 USD @ 1.4103",
//                 "-148.52",
//                 "2017-05-02T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Entertainment"
//                 },
//                 {
//                     "en": "Entertainment"
//                 },
//                 "LIGHT/MINI IN THE BOX COVENTRY 105.31 USD @ 1.4103"
//             ],
//             [
//                 "91943124",
//                 "33136348",
//                 "xxxx6250",
//                 "LIGHT/MINI IN THE BOX COVENTRY",
//                 "-138.68",
//                 "2017-05-02T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Other"
//                 },
//                 {
//                     "en": "Other"
//                 },
//                 "LIGHT/MINI IN THE BOX COVENTRY"
//             ],
//             [
//                 "91943120",
//                 "33136348",
//                 "xxxx6250",
//                 "MAXSPACE STONE WORKS INCOTORONTO ON",
//                 "-1991.63",
//                 "2017-05-02T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Shopping"
//                 },
//                 {
//                     "en": "Shopping"
//                 },
//                 "MAXSPACE STONE WORKS INCOTORONTO ON"
//             ],
//             [
//                 "91943116",
//                 "33136348",
//                 "xxxx6250",
//                 "THE HUDSON'S BAY CENTR TORONTO ON",
//                 "-15.0",
//                 "2017-05-02T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "THE HUDSON'S BAY CENTR TORONTO ON"
//             ],
//             [
//                 "91943112",
//                 "33136348",
//                 "xxxx6250",
//                 "MAC ROYAL BANK PLAZA #151TORONTO ON",
//                 "-29.38",
//                 "2017-05-02T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Shopping"
//                 },
//                 {
//                     "en": "Shopping"
//                 },
//                 "Mac"
//             ],
//             [
//                 "91944008",
//                 "33136352",
//                 "xxxx1914",
//                 "OLLY FRESCOS TORONTO ON",
//                 "-2.98",
//                 "2017-05-01T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "OLLY FRESCOS TORONTO ON"
//             ],
//             [
//                 "91943108",
//                 "33136348",
//                 "xxxx6250",
//                 "TRATTORIA MERCATTO TORONTO ON",
//                 "-82.34",
//                 "2017-05-01T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Shopping"
//                 },
//                 {
//                     "en": "Shopping"
//                 },
//                 "TRATTORIA MERCATTO TORONTO ON"
//             ],
//             [
//                 "91943104",
//                 "33136348",
//                 "xxxx6250",
//                 "THE HUDSON'S BAY CENTR TORONTO ON",
//                 "-15.0",
//                 "2017-05-01T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "THE HUDSON'S BAY CENTR TORONTO ON"
//             ],
//             [
//                 "91943100",
//                 "33136348",
//                 "xxxx6250",
//                 "ROGERS *XXXXXXXXX XXX-XXX-XXXX ON",
//                 "-52.59",
//                 "2017-05-01T00:00:00.000Z",
//                 "Charge",
//                 "5",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Utilities"
//                 },
//                 {
//                     "en": "Utilities"
//                 },
//                 "Rogers Communications"
//             ],
//             [
//                 "91944004",
//                 "33136352",
//                 "xxxx1914",
//                 "FOOD BASICS #661 MARKHAM ON",
//                 "-153.65",
//                 "2017-04-30T00:00:00.000Z",
//                 "Charge",
//                 "4",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Groceries"
//                 },
//                 {
//                     "en": "Groceries"
//                 },
//                 "Food Basics"
//             ],
//             [
//                 "91944000",
//                 "33136352",
//                 "xxxx1914",
//                 "FOOD BASICS #661 MARKHAM ON",
//                 "-7.38",
//                 "2017-04-30T00:00:00.000Z",
//                 "Charge",
//                 "4",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Groceries"
//                 },
//                 {
//                     "en": "Groceries"
//                 },
//                 "Food Basics"
//             ],
//             [
//                 "91943096",
//                 "33136348",
//                 "xxxx6250",
//                 "SHOPPER'S DRUG MART #1308MARKHAM ON",
//                 "-34.76",
//                 "2017-04-29T00:00:00.000Z",
//                 "Charge",
//                 "4",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Health"
//                 },
//                 {
//                     "en": "Health"
//                 },
//                 "Shoppers Drug Mart"
//             ],
//             [
//                 "91943996",
//                 "33136352",
//                 "xxxx1914",
//                 "OLLY FRESCOS TORONTO ON",
//                 "-2.98",
//                 "2017-04-28T00:00:00.000Z",
//                 "Charge",
//                 "4",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "OLLY FRESCOS TORONTO ON"
//             ],
//             [
//                 "91943992",
//                 "33136352",
//                 "xxxx1914",
//                 "TIM HORTONS 3235 QTH TORONTO ON",
//                 "-1.88",
//                 "2017-04-28T00:00:00.000Z",
//                 "Charge",
//                 "4",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "Tim Hortons"
//             ],
//             [
//                 "91943092",
//                 "33136348",
//                 "xxxx6250",
//                 "SHOPPERSDRUGMART0997 TORONTO ON",
//                 "-2.25",
//                 "2017-04-28T00:00:00.000Z",
//                 "Charge",
//                 "4",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Health"
//                 },
//                 {
//                     "en": "Health"
//                 },
//                 "Shoppers Drug Mart"
//             ],
//             [
//                 "91943088",
//                 "33136348",
//                 "xxxx6250",
//                 "THE HUDSON'S BAY CENTR TORONTO ON",
//                 "-15.0",
//                 "2017-04-28T00:00:00.000Z",
//                 "Charge",
//                 "4",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "THE HUDSON'S BAY CENTR TORONTO ON"
//             ],
//             [
//                 "91943988",
//                 "33136352",
//                 "xxxx1914",
//                 "MMMUFFINS #835 TORONTO ON",
//                 "-3.26",
//                 "2017-04-27T00:00:00.000Z",
//                 "Charge",
//                 "4",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "MMMUFFINS #835 TORONTO ON"
//             ],
//             [
//                 "91943984",
//                 "33136352",
//                 "xxxx1914",
//                 "OLLY FRESCOS TORONTO ON",
//                 "-5.05",
//                 "2017-04-27T00:00:00.000Z",
//                 "Charge",
//                 "4",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "OLLY FRESCOS TORONTO ON"
//             ],
//             [
//                 "91943980",
//                 "33136352",
//                 "xxxx1914",
//                 "SOUP NUTSY TORONTO ON",
//                 "-9.71",
//                 "2017-04-27T00:00:00.000Z",
//                 "Charge",
//                 "4",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Other"
//                 },
//                 {
//                     "en": "Other"
//                 },
//                 "SOUP NUTSY TORONTO ON"
//             ],
//             [
//                 "91943084",
//                 "33136348",
//                 "xxxx6250",
//                 "BREATHEZ VACUUM SERVICES BRAMPTON ON",
//                 "-330.0",
//                 "2017-04-27T00:00:00.000Z",
//                 "Charge",
//                 "4",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "BREATHEZ VACUUM SERVICES BRAMPTON ON"
//             ],
//             [
//                 "91943080",
//                 "33136348",
//                 "xxxx6250",
//                 "THE HUDSON'S BAY CENTR TORONTO ON",
//                 "-15.0",
//                 "2017-04-27T00:00:00.000Z",
//                 "Charge",
//                 "4",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "THE HUDSON'S BAY CENTR TORONTO ON"
//             ],
//             [
//                 "91943076",
//                 "33136348",
//                 "xxxx6250",
//                 "THE HUDSON'S BAY CENTR TORONTO ON",
//                 "-15.0",
//                 "2017-04-26T00:00:00.000Z",
//                 "Charge",
//                 "4",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "THE HUDSON'S BAY CENTR TORONTO ON"
//             ],
//             [
//                 "91943064",
//                 "33136348",
//                 "xxxx6250",
//                 "THE HUDSON'S BAY CENTR TORONTO ON",
//                 "-15.0",
//                 "2017-04-25T00:00:00.000Z",
//                 "Charge",
//                 "4",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "THE HUDSON'S BAY CENTR TORONTO ON"
//             ],
//             [
//                 "696637592",
//                 "33136324",
//                 "xxxx6259",
//                 "MISC PAYMENT -CDLSI",
//                 "-329.03",
//                 "2017-04-25T00:00:00.000Z",
//                 "Charge",
//                 "4",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Other"
//                 },
//                 {
//                     "en": "Other"
//                 },
//                 "MISC PAYMENT -CDLSI"
//             ],
//             [
//                 "91943056",
//                 "33136348",
//                 "xxxx6250",
//                 "THE HUDSON'S BAY CENTR TORONTO ON",
//                 "-15.0",
//                 "2017-04-24T00:00:00.000Z",
//                 "Charge",
//                 "4",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "THE HUDSON'S BAY CENTR TORONTO ON"
//             ],
//             [
//                 "91943976",
//                 "33136352",
//                 "xxxx1914",
//                 "FOOD BASICS #661 MARKHAM ON",
//                 "-130.62",
//                 "2017-04-23T00:00:00.000Z",
//                 "Charge",
//                 "4",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Groceries"
//                 },
//                 {
//                     "en": "Groceries"
//                 },
//                 "Food Basics"
//             ],
//             [
//                 "91943972",
//                 "33136352",
//                 "xxxx1914",
//                 "TIM HORTONS 1712 QTH MISSISSAUGA ON",
//                 "-23.67",
//                 "2017-04-22T00:00:00.000Z",
//                 "Charge",
//                 "4",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "Tim Hortons"
//             ],
//             [
//                 "91943968",
//                 "33136352",
//                 "xxxx1914",
//                 "THE GARDEN BASKET MARKHAM ON",
//                 "-71.0",
//                 "2017-04-22T00:00:00.000Z",
//                 "Charge",
//                 "4",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "THE GARDEN BASKET MARKHAM ON"
//             ],
//             [
//                 "91943052",
//                 "33136348",
//                 "xxxx6250",
//                 "THE HOME DEPOT #7004 MARKHAM ON",
//                 "145.76",
//                 "2017-04-22T00:00:00.000Z",
//                 "Charge",
//                 "4",
//                 "In",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Household"
//                 },
//                 {
//                     "en": "Household"
//                 },
//                 "Home Depot"
//             ],
//             [
//                 "91943048",
//                 "33136348",
//                 "xxxx6250",
//                 "PRINCESS AUTO MARKHAM ON",
//                 "-31.63",
//                 "2017-04-22T00:00:00.000Z",
//                 "Charge",
//                 "4",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Transportation"
//                 },
//                 {
//                     "en": "Transportation"
//                 },
//                 "PRINCESS AUTO MARKHAM ON"
//             ],
//             [
//                 "91943044",
//                 "33136348",
//                 "xxxx6250",
//                 "THE HOME DEPOT #7004 MARKHAM ON",
//                 "7.09",
//                 "2017-04-22T00:00:00.000Z",
//                 "Charge",
//                 "4",
//                 "In",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Household"
//                 },
//                 {
//                     "en": "Household"
//                 },
//                 "Home Depot"
//             ],
//             [
//                 "91943040",
//                 "33136348",
//                 "xxxx6250",
//                 "THE HOME DEPOT #7136 MARKHAM ON",
//                 "-27.64",
//                 "2017-04-22T00:00:00.000Z",
//                 "Charge",
//                 "4",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Household"
//                 },
//                 {
//                     "en": "Household"
//                 },
//                 "Home Depot"
//             ],
//             [
//                 "91943964",
//                 "33136352",
//                 "xxxx1914",
//                 "OLLY FRESCOS TORONTO ON",
//                 "-2.98",
//                 "2017-04-21T00:00:00.000Z",
//                 "Charge",
//                 "4",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "OLLY FRESCOS TORONTO ON"
//             ],
//             [
//                 "91943032",
//                 "33136348",
//                 "xxxx6250",
//                 "THE HUDSON'S BAY CENTR TORONTO ON",
//                 "-15.0",
//                 "2017-04-21T00:00:00.000Z",
//                 "Charge",
//                 "4",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "THE HUDSON'S BAY CENTR TORONTO ON"
//             ],
//             [
//                 "91943028",
//                 "33136348",
//                 "xxxx6250",
//                 "PETROCAN-2830-16TH AVE MARKHAM ON",
//                 "-50.0",
//                 "2017-04-21T00:00:00.000Z",
//                 "Charge",
//                 "4",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Transportation"
//                 },
//                 {
//                     "en": "Transportation"
//                 },
//                 "Petro-Canada"
//             ],
//             [
//                 "91943960",
//                 "33136352",
//                 "xxxx1914",
//                 "OLLY FRESCOS TORONTO ON",
//                 "-2.98",
//                 "2017-04-20T00:00:00.000Z",
//                 "Charge",
//                 "4",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "OLLY FRESCOS TORONTO ON"
//             ],
//             [
//                 "91943024",
//                 "33136348",
//                 "xxxx6250",
//                 "THE HUDSON'S BAY CENTR TORONTO ON",
//                 "-15.0",
//                 "2017-04-20T00:00:00.000Z",
//                 "Charge",
//                 "4",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "THE HUDSON'S BAY CENTR TORONTO ON"
//             ],
//             [
//                 "91943020",
//                 "33136348",
//                 "xxxx6250",
//                 "SHOPPERSDRUGMART0985 TORONTO ON",
//                 "-7.99",
//                 "2017-04-20T00:00:00.000Z",
//                 "Charge",
//                 "4",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Health"
//                 },
//                 {
//                     "en": "Health"
//                 },
//                 "Shoppers Drug Mart"
//             ],
//             [
//                 "91943956",
//                 "33136352",
//                 "xxxx1914",
//                 "TIM HORTONS 3235 QTH TORONTO ON",
//                 "-4.18",
//                 "2017-04-19T00:00:00.000Z",
//                 "Charge",
//                 "4",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "Tim Hortons"
//             ],
//             [
//                 "91943016",
//                 "33136348",
//                 "xxxx6250",
//                 "THE HUDSON'S BAY CENTR TORONTO ON",
//                 "-15.0",
//                 "2017-04-19T00:00:00.000Z",
//                 "Charge",
//                 "4",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "THE HUDSON'S BAY CENTR TORONTO ON"
//             ],
//             [
//                 "91943012",
//                 "33136348",
//                 "xxxx6250",
//                 "HUDSON'S BAY #1963 TORONTO ON",
//                 "-136.96",
//                 "2017-04-19T00:00:00.000Z",
//                 "Charge",
//                 "4",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Shopping"
//                 },
//                 {
//                     "en": "Shopping"
//                 },
//                 "HUDSON'S BAY #1963 TORONTO ON"
//             ],
//             [
//                 "696637572",
//                 "33136324",
//                 "xxxx6259",
//                 "MISC PAYMENT -CDLSI",
//                 "-329.03",
//                 "2017-04-19T00:00:00.000Z",
//                 "Charge",
//                 "4",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Other"
//                 },
//                 {
//                     "en": "Other"
//                 },
//                 "MISC PAYMENT -CDLSI"
//             ],
//             [
//                 "91943008",
//                 "33136348",
//                 "xxxx6250",
//                 "SOUP NUTSY TORONTO ON",
//                 "-8.58",
//                 "2017-04-18T00:00:00.000Z",
//                 "Charge",
//                 "4",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Other"
//                 },
//                 {
//                     "en": "Other"
//                 },
//                 "SOUP NUTSY TORONTO ON"
//             ],
//             [
//                 "91943004",
//                 "33136348",
//                 "xxxx6250",
//                 "AMAZON MKTPLACE PMTS AMZN.COM/BILLWA 35.81 USD @ 1.3736",
//                 "-49.19",
//                 "2017-04-18T00:00:00.000Z",
//                 "Charge",
//                 "4",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Shopping"
//                 },
//                 {
//                     "en": "Shopping"
//                 },
//                 "Amazon"
//             ],
//             [
//                 "91943000",
//                 "33136348",
//                 "xxxx6250",
//                 "THE HUDSON'S BAY CENTR TORONTO ON",
//                 "-15.0",
//                 "2017-04-18T00:00:00.000Z",
//                 "Charge",
//                 "4",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "THE HUDSON'S BAY CENTR TORONTO ON"
//             ],
//             [
//                 "91943952",
//                 "33136352",
//                 "xxxx1914",
//                 "OLLY FRESCOS TORONTO ON",
//                 "-7.37",
//                 "2017-04-17T00:00:00.000Z",
//                 "Charge",
//                 "4",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "OLLY FRESCOS TORONTO ON"
//             ],
//             [
//                 "91942996",
//                 "33136348",
//                 "xxxx6250",
//                 "SHOPPERSDRUGMART0945 TORONTO ON",
//                 "-20.67",
//                 "2017-04-17T00:00:00.000Z",
//                 "Charge",
//                 "4",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Health"
//                 },
//                 {
//                     "en": "Health"
//                 },
//                 "Shoppers Drug Mart"
//             ],
//             [
//                 "91942992",
//                 "33136348",
//                 "xxxx6250",
//                 "THE HUDSON'S BAY CENTR TORONTO ON",
//                 "-15.0",
//                 "2017-04-17T00:00:00.000Z",
//                 "Charge",
//                 "4",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "THE HUDSON'S BAY CENTR TORONTO ON"
//             ],
//             [
//                 "91943948",
//                 "33136352",
//                 "xxxx1914",
//                 "TIM HORTONS 3098 QTH MARKHAM ON",
//                 "-32.6",
//                 "2017-04-14T00:00:00.000Z",
//                 "Charge",
//                 "4",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "Tim Hortons"
//             ],
//             [
//                 "91943944",
//                 "33136352",
//                 "xxxx1914",
//                 "TIM HORTONS 3235 QTH TORONTO ON",
//                 "-3.97",
//                 "2017-04-13T00:00:00.000Z",
//                 "Charge",
//                 "4",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "Tim Hortons"
//             ],
//             [
//                 "91943940",
//                 "33136352",
//                 "xxxx1914",
//                 "SUBWAY XXXXX TORONTO ON",
//                 "-7.11",
//                 "2017-04-13T00:00:00.000Z",
//                 "Charge",
//                 "4",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "Subway"
//             ],
//             [
//                 "91943936",
//                 "33136352",
//                 "xxxx1914",
//                 "FOOD BASICS #661 MARKHAM ON",
//                 "-188.1",
//                 "2017-04-13T00:00:00.000Z",
//                 "Charge",
//                 "4",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Groceries"
//                 },
//                 {
//                     "en": "Groceries"
//                 },
//                 "Food Basics"
//             ],
//             [
//                 "91942988",
//                 "33136348",
//                 "xxxx6250",
//                 "THE HUDSON'S BAY CENTR TORONTO ON",
//                 "-15.0",
//                 "2017-04-13T00:00:00.000Z",
//                 "Charge",
//                 "4",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "THE HUDSON'S BAY CENTR TORONTO ON"
//             ],
//             [
//                 "91942984",
//                 "33136348",
//                 "xxxx6250",
//                 "MAXSPACE STONE WORKS INCOTORONTO ON",
//                 "-1991.62",
//                 "2017-04-13T00:00:00.000Z",
//                 "Charge",
//                 "4",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Shopping"
//                 },
//                 {
//                     "en": "Shopping"
//                 },
//                 "MAXSPACE STONE WORKS INCOTORONTO ON"
//             ],
//             [
//                 "91942980",
//                 "33136348",
//                 "xxxx6250",
//                 "THE HUDSON'S BAY CENTR TORONTO ON",
//                 "-15.0",
//                 "2017-04-12T00:00:00.000Z",
//                 "Charge",
//                 "4",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "THE HUDSON'S BAY CENTR TORONTO ON"
//             ],
//             [
//                 "91942976",
//                 "33136348",
//                 "xxxx6250",
//                 "CITIZEN&amp;IMM-EAPPS ENLIGNEOTTAWA ON",
//                 "-150.0",
//                 "2017-04-12T00:00:00.000Z",
//                 "Charge",
//                 "4",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Transportation"
//                 },
//                 {
//                     "en": "Transportation"
//                 },
//                 "CITIZEN&amp;IMM-EAPPS ENLIGNEOTTAWA ON"
//             ],
//             [
//                 "91942972",
//                 "33136348",
//                 "xxxx6250",
//                 "MARKHAM STOUFFVILLE HOSPINORTH YORK ON",
//                 "-12.0",
//                 "2017-04-12T00:00:00.000Z",
//                 "Charge",
//                 "4",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Shopping"
//                 },
//                 {
//                     "en": "Shopping"
//                 },
//                 "MARKHAM STOUFFVILLE HOSPINORTH YORK ON"
//             ],
//             [
//                 "91942968",
//                 "33136348",
//                 "xxxx6250",
//                 "CITY OF MARKHAM-REC &amp; CULMARKHAM ON",
//                 "-25.0",
//                 "2017-04-11T00:00:00.000Z",
//                 "Charge",
//                 "4",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Utilities"
//                 },
//                 {
//                     "en": "Utilities"
//                 },
//                 "CITY OF MARKHAM-REC &amp; CULMARKHAM ON"
//             ],
//             [
//                 "91942964",
//                 "33136348",
//                 "xxxx6250",
//                 "THE HUDSON'S BAY CENTR TORONTO ON",
//                 "-15.0",
//                 "2017-04-11T00:00:00.000Z",
//                 "Charge",
//                 "4",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "THE HUDSON'S BAY CENTR TORONTO ON"
//             ],
//             [
//                 "91942960",
//                 "33136348",
//                 "xxxx6250",
//                 "407ETR WOODBRIDGE ON",
//                 "-103.65",
//                 "2017-04-11T00:00:00.000Z",
//                 "Charge",
//                 "4",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Travel"
//                 },
//                 {
//                     "en": "Travel"
//                 },
//                 "407 ETR"
//             ],
//             [
//                 "91942956",
//                 "33136348",
//                 "xxxx6250",
//                 "SHOPPERSDRUGMART0945 TORONTO ON",
//                 "-100.0",
//                 "2017-04-11T00:00:00.000Z",
//                 "Charge",
//                 "4",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Health"
//                 },
//                 {
//                     "en": "Health"
//                 },
//                 "Shoppers Drug Mart"
//             ],
//             [
//                 "91942952",
//                 "33136348",
//                 "xxxx6250",
//                 "WALMART.CA MISSISSAUGA ON",
//                 "-59.82",
//                 "2017-04-11T00:00:00.000Z",
//                 "Charge",
//                 "4",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Shopping"
//                 },
//                 {
//                     "en": "Shopping"
//                 },
//                 "Walmart"
//             ],
//             [
//                 "91942948",
//                 "33136348",
//                 "xxxx6250",
//                 "SHOPPERSDRUGMART0945 TORONTO ON",
//                 "-4.51",
//                 "2017-04-11T00:00:00.000Z",
//                 "Charge",
//                 "4",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Health"
//                 },
//                 {
//                     "en": "Health"
//                 },
//                 "Shoppers Drug Mart"
//             ],
//             [
//                 "91942944",
//                 "33136348",
//                 "xxxx6250",
//                 "MUCHO BURRITO TORONTO ON",
//                 "-8.98",
//                 "2017-04-11T00:00:00.000Z",
//                 "Charge",
//                 "4",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "MUCHO BURRITO TORONTO ON"
//             ],
//             [
//                 "91942940",
//                 "33136348",
//                 "xxxx6250",
//                 "SKINDINAVIA XXXXXXXXXX AZ 40.00 USD @ 1.3695",
//                 "-54.78",
//                 "2017-04-11T00:00:00.000Z",
//                 "Charge",
//                 "4",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Other"
//                 },
//                 {
//                     "en": "Other"
//                 },
//                 "SKINDINAVIA XXXXXXXXXX AZ 40.00 USD @ 1.3695"
//             ],
//             [
//                 "696637544",
//                 "33136324",
//                 "xxxx6259",
//                 "MISC PAYMENT -CDLSI",
//                 "-329.03",
//                 "2017-04-11T00:00:00.000Z",
//                 "Charge",
//                 "4",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Other"
//                 },
//                 {
//                     "en": "Other"
//                 },
//                 "MISC PAYMENT -CDLSI"
//             ],
//             [
//                 "91943932",
//                 "33136352",
//                 "xxxx1914",
//                 "TAHINI TORONTO ON",
//                 "-10.72",
//                 "2017-04-10T00:00:00.000Z",
//                 "Charge",
//                 "4",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Travel"
//                 },
//                 {
//                     "en": "Travel"
//                 },
//                 "TAHINI TORONTO ON"
//             ],
//             [
//                 "91942936",
//                 "33136348",
//                 "xxxx6250",
//                 "THE HOME DEPOT #7004 MARKHAM ON",
//                 "-28.52",
//                 "2017-04-10T00:00:00.000Z",
//                 "Charge",
//                 "4",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Household"
//                 },
//                 {
//                     "en": "Household"
//                 },
//                 "Home Depot"
//             ],
//             [
//                 "91942932",
//                 "33136348",
//                 "xxxx6250",
//                 "PRESTO TORONTO ON",
//                 "-230.0",
//                 "2017-04-10T00:00:00.000Z",
//                 "Charge",
//                 "4",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Transportation"
//                 },
//                 {
//                     "en": "Transportation"
//                 },
//                 "PRESTO TORONTO ON"
//             ],
//             [
//                 "91942928",
//                 "33136348",
//                 "xxxx6250",
//                 "TORONTO PARKING AUTHORITYTORONTO ON",
//                 "-18.0",
//                 "2017-04-10T00:00:00.000Z",
//                 "Charge",
//                 "4",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Travel"
//                 },
//                 {
//                     "en": "Travel"
//                 },
//                 "Toronto Parking Authority"
//             ],
//             [
//                 "91943928",
//                 "33136352",
//                 "xxxx1914",
//                 "FOOD BASICS #661 MARKHAM ON",
//                 "-98.44",
//                 "2017-04-09T00:00:00.000Z",
//                 "Charge",
//                 "4",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Groceries"
//                 },
//                 {
//                     "en": "Groceries"
//                 },
//                 "Food Basics"
//             ],
//             [
//                 "91942924",
//                 "33136348",
//                 "xxxx6250",
//                 "MCDONALD'S #XXXXX Q04 CONCORD ON",
//                 "-6.53",
//                 "2017-04-08T00:00:00.000Z",
//                 "Charge",
//                 "4",
//                 "Out",
//                 "CAD",
//                 null,
//                 {
//                     "en": "Dining"
//                 },
//                 {
//                     "en": "Dining"
//                 },
//                 "Mcdonald's"
//             ]
//         ],
//             "attributesTypes": [
//             "String",
//             "String",
//             "String",
//             "String",
//             "PAmount",
//             "PDate",
//             "String",
//             "PNumber",
//             "String",
//             "String",
//             "Undefined",
//             "PText",
//             "PText",
//             "String"
//         ]
//     },
//     "localCurrencyCd": {
//         "type": "PString",
//             "cols": [
//             "value"
//         ],
//             "rows": [
//             [
//                 "CAD"
//             ]
//         ],
//             "attributesTypes": [
//             "String"
//         ]
//     },//מטבע מקומי
//     "lastMonthDate": {
//         "type": "PNumber",
//             "cols": [
//             "value"
//         ],
//             "rows": [
//             [
//                 "7"
//             ]
//         ],
//             "attributesTypes": [
//             "String"
//         ]
//     },// החודש האחרון
//     "barChartExpenses": {
//         "type": "PTable",
//             "cols": [
//             "account",
//             "amount",
//             "month",
//             "currencyCd"
//         ],
//             "rows": [
//             [
//                 "33136352",
//                 "1114.7100000000003",
//                 "7",
//                 "CAD"
//             ],
//             [
//                 "33136352",
//                 "987.57",
//                 "6",
//                 "CAD"
//             ],
//             [
//                 "33136352",
//                 "865.75",
//                 "5",
//                 "CAD"
//             ],
//             [
//                 "33136352",
//                 "767.6500000000001",
//                 "4",
//                 "CAD"
//             ],
//             [
//                 "33136348",
//                 "3109.2200000000003",
//                 "7",
//                 "CAD"
//             ],
//             [
//                 "33136348",
//                 "2541.7900000000004",
//                 "6",
//                 "CAD"
//             ],
//             [
//                 "33136348",
//                 "5061.830000000001",
//                 "5",
//                 "CAD"
//             ],
//             [
//                 "33136348",
//                 "3535.2299999999996",
//                 "4",
//                 "CAD"
//             ],
//             [
//                 "33136324",
//                 "658.06",
//                 "7",
//                 "CAD"
//             ],
//             [
//                 "33136324",
//                 "658.06",
//                 "6",
//                 "CAD"
//             ],
//             [
//                 "33136324",
//                 "658.06",
//                 "5",
//                 "CAD"
//             ],
//             [
//                 "33136324",
//                 "987.0899999999999",
//                 "4",
//                 "CAD"
//             ],
//             [
//                 "33136356",
//                 "5.0",
//                 "7",
//                 "CAD"
//             ],
//             [
//                 "33136356",
//                 "193.22",
//                 "6",
//                 "CAD"
//             ],
//             [
//                 "33136356",
//                 "13.0",
//                 "5",
//                 "CAD"
//             ],
//             [
//                 "33136356",
//                 "0.0",
//                 "4",
//                 "CAD"
//             ]
//         ],
//             "attributesTypes": [
//             "String",
//             "PAmount",
//             "PNumber",
//             "String"
//         ]
//     },// טבלת החשבונות שיוצגו: סכום בחשבון  בחודש
//     "periods": {
//         "type": "PTable",
//             "cols": [
//             "month"
//         ],
//             "rows": [
//             [
//                 "7"
//             ],
//             [
//                 "6"
//             ],
//             [
//                 "5"
//             ],
//             [
//                 "4"
//             ]
//         ],
//             "attributesTypes": [
//             "PNumber"
//         ]
//     },// מערך החודשים אותם נציג (4 חודשים אחרונים)
//     "hasSingleAccount": {
//         "type": "PString",
//             "cols": [
//             "value"
//         ],
//             "rows": [
//             [
//                 "false"
//             ]
//         ],
//             "attributesTypes": [
//             "String"
//         ]
//     },// האם חשבון אחד
//     "accounts": {
//         "type": "PTable",
//             "cols": [
//             "id",
//             "name",
//             "image",
//             "balance",
//             "number",
//             "credit",
//             "currencyCd",
//             "program",
//             "type",
//             "depositBalance",
//             "displayBalance",
//             "creditLine",
//             "outstandingBalance",
//             "lastStatementDueDate",
//             "lastStatementMinPayment",
//             "lastStatementFullBalance",
//             "lastStatementCutoffDate",
//             "pastDueAmount",
//             "accountStatus",
//             "numberOfOwners",
//             "clientAccountType",
//             "count",
//             "sum",
//             "avg",
//             "std"
//         ],
//             "rows": [
//             [
//                 "33136352",
//                 {
//                     "en": "xxxx1914"
//                 },
//                 null,
//                 "1680.72",
//                 "xxxx1914",
//                 "0.0",
//                 "CAD",
//                 null,
//                 "Credit",
//                 "1680.72",
//                 "1680.72",
//                 "0.0",
//                 "0.0",
//                 null,
//                 "0.0",
//                 "0.0",
//                 null,
//                 "0.0",
//                 "Open",
//                 "1",
//                 "CREDIT",
//                 "132",
//                 "3735.6800000000003",
//                 "933.9200000000001",
//                 "130.24612124742916"
//             ],
//             [
//                 "33136348",
//                 {
//                     "en": "xxxx6250"
//                 },
//                 null,
//                 "4221.23",
//                 "xxxx6250",
//                 "0.0",
//                 "CAD",
//                 null,
//                 "Credit",
//                 "4221.23",
//                 "4221.23",
//                 "0.0",
//                 "0.0",
//                 null,
//                 "0.0",
//                 "0.0",
//                 null,
//                 "0.0",
//                 "Open",
//                 "1",
//                 "CREDIT",
//                 "173",
//                 "14248.07",
//                 "3562.0175",
//                 "934.8856658804597"
//             ],
//             [
//                 "33136324",
//                 {
//                     "en": "xxxx6259"
//                 },
//                 null,
//                 "21910.77",
//                 "xxxx6259",
//                 "0.0",
//                 "CAD",
//                 null,
//                 "Checking",
//                 "21910.77",
//                 "21910.77",
//                 "0.0",
//                 "0.0",
//                 null,
//                 "0.0",
//                 "0.0",
//                 null,
//                 "0.0",
//                 "Open",
//                 "1",
//                 "CHECKING",
//                 "9",
//                 "2961.2699999999995",
//                 "740.3174999999999",
//                 "142.4741693035969"
//             ],
//             [
//                 "33136356",
//                 {
//                     "en": "xxxx6439"
//                 },
//                 null,
//                 "5.0",
//                 "xxxx6439",
//                 "0.0",
//                 "CAD",
//                 null,
//                 "Credit",
//                 "5.0",
//                 "5.0",
//                 "0.0",
//                 "0.0",
//                 null,
//                 "0.0",
//                 "0.0",
//                 null,
//                 "0.0",
//                 "Open",
//                 "1",
//                 "CREDIT",
//                 "4",
//                 "211.22",
//                 "70.40666666666667",
//                 "86.90353323593287"
//             ]
//         ],
//             "attributesTypes": [
//             "String",
//             "PText",
//             "Undefined",
//             "PAmount",
//             "String",
//             "PAmount",
//             "String",
//             "Undefined",
//             "String",
//             "PAmount",
//             "PAmount",
//             "PAmount",
//             "PAmount",
//             "Undefined",
//             "PAmount",
//             "PAmount",
//             "Undefined",
//             "PAmount",
//             "String",
//             "PNumber",
//             "String",
//             "PNumber",
//             "PNumber",
//             "PNumber",
//             "PNumber"
//         ]
//     }
// }