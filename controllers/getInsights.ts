import {MongoClient} from 'mongodb';
import * as errors from "../models/errors"
import url from "../db/db";
import generator from "./generateInsights"
import {
    blockForDialog ,
    dialogsForStory ,
    storyIdForInsightId ,
    classForDialog ,
    nextCondition
} from "../models/insightsConfiguration"
import {generateFacts} from './generateFacts'

export const getInsightDetails = (req , res) => {
    try {
        if (!req.headers.token || !req.headers.name) {
            throw errors.parameterRequaire("Name and token");
        }
        MongoClient.connect(url , function (err , db) {
            try {
                if (err) throw err;
                db.collection('banks').find({
                    bankName: req.headers.name ,
                    token: req.headers.token
                }).toArray(function (err , mongoRes) {
                    try {
                        db.close();
                        if (err) throw err;
                        if (!mongoRes.length)
                            throw errors.autonticationError();
                        if (!mongoRes[0].insights.includes(req.body.insightId))
                            throw errors.InsightnotVaild(req.body.insightId);
                        const transactions = req.body.transactions;
                        const accounts = req.body.accounts;
                        const language = req.headers.lang || "en";
                        const insightId = req.body.insightId;
                        const TextForDialog = mongoRes[0].TextForDialog;
                        const storyId = storyIdForInsightId[insightId];
                        const text = {storyId};
                        text["title"] = {};
                        text["title"][language] = {txt: mongoRes[0].insightsMessages[language][insightId].title}
                        const story = {
                            story: {
                                storyId ,
                                dialogs:
                                    dialogsForStory[storyId].map((dialog , i) => {
                                        text[dialog] = TextForDialog[dialog];
                                        return {
                                            id: dialog ,
                                            ...classForDialog.indexOf(dialog) > -1 ? {class: "perso-white"} : {} ,
                                            blocks: blockForDialog[dialog].map((block , index) => ({index , ...block})) ,
                                            ...i + 1 < dialogsForStory[storyId].length ?
                                                {next: nextCondition[dialog] || {target: dialogsForStory[storyId][i + 1]}} : {}
                                        };
                                    }) ,
                                id: storyId + "_Definition"
                            } ,
                            facts: {
                                storyId ,
                                ...generateFacts(insightId , transactions , accounts)
                            } ,
                            text
                        };
                        res.send(story);
                    } catch (err) {
                        res.status(err.errorCode || 401).send(err);
                    }
                });
            } catch (err) {
                res.status(err.errorCode || 401).send(err);
            }
        });
    }
    catch (err) {
        res.status(err.errorCode || 500).send(err);
    }
}

export const getInsights = (req , res) => {
    try {
        if (!req.headers.token || !req.headers.name) {
            throw errors.parameterRequaire("Name and token");
        }
        const language = req.headers.lang || "en";
        MongoClient.connect(url , function (err , db) {
            try {
                if (err) throw err;
                db.collection('banks').find({
                    bankName: req.headers.name ,
                    token: req.headers.token
                }).toArray(function (err , mongoRes) {
                    try {
                        db.close();
                        if (err) throw err;
                        if (!mongoRes.length)
                            throw errors.autonticationError();
                        const UserInsights = [];
                        const BankInsights = mongoRes[0].insights;
                        const transactions = req.body.transactions;
                        BankInsights.forEach((BankInsight) => {
                            const insight = generator(BankInsight , transactions , language , mongoRes[0].insightsMessages);
                            if (insight != null)
                                UserInsights.push(insight);
                        });
                        res.send({'insights': UserInsights});
                    }
                    catch (err) {
                        res.status(err.errorCode || 401).send(err);
                    }
                });
            } catch (err) {
                res.status(err.errorCode || 401).send(err);
            }
        });
    }
    catch (err) {
        res.status(err.errorCode || 500).send(err);
    }
}


var aaa2 = {
    "story": {
        "storyId": "TestCategorySpendingIQ_UC1" ,
        "dialogs": [{
            "id": "BT_TestCategorySpendingIQ_D11" ,
            "blocks": [{
                "index": 0 ,
                "id": "block_1490027334172" ,
                "type": "txt" ,
                "txt": "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_D11_block_1490027334172_txt" ,
                "class": "perso-H2" ,
                "text": "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_D11_block_1490027334172_txt"
            } , {
                "index": 1 ,
                "id": "block_1490027517883" ,
                "type": "buttons" ,
                "buttonType": "button" ,
                "options": [{
                    "type": "data" ,
                    "txt": "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_D11_block_1490027517883_txt" ,
                    "src": "quizRanges"
                }] ,
                "class": "perso-radio-buttons" ,
                "var": "selectedAnswer"
            }] ,
            "next": [{
                "cond": "selectedAnswer.answer == 'true'" ,
                "target": "BT_TestCategorySpendingIQ_D121"
            } , {"cond": "selectedAnswer.answer == 'false'" , "target": "BT_TestCategorySpendingIQ_D122"}]
        } , {
            "id": "BT_TestCategorySpendingIQ_D121" ,
            "blocks": [{
                "index": 0 ,
                "id": "block_1490199194443" ,
                "type": "txt" ,
                "txt": "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_D121_block_1490199194443_txt" ,
                "class": "perso-H2" ,
                "text": "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_D121_block_1490199194443_txt"
            } , {
                "index": 1 ,
                "id": "block_1490027730358" ,
                "type": "txt" ,
                "txt": "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_121_block_1490027730358_txt" ,
                "class": "perso-body" ,
                "text": "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_121_block_1490027730358_txt"
            } , {
                "index": 2 ,
                "id": "block_1490027817853" ,
                "type": "txt" ,
                "txt": "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_121_block_1490027817853_txt" ,
                "class": "perso-body" ,
                "text": "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_121_block_1490027817853_txt"
            }] ,
            "next": {"target": "BT_TestCategorySpendingIQ_D13"}
        } , {
            "id": "BT_TestCategorySpendingIQ_D122" ,
            "blocks": [{
                "index": 0 ,
                "id": "block_1490199163910" ,
                "type": "txt" ,
                "description": "" ,
                "txt": "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_D122_block_1490199163910_txt" ,
                "class": "perso-H2" ,
                "text": "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_D122_block_1490199163910_txt"
            } , {
                "index": 1 ,
                "id": "block_1490027901006" ,
                "type": "txt" ,
                "txt": "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_D122_block_1490027901006_txt" ,
                "class": "perso-body" ,
                "text": "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_D122_block_1490027901006_txt"
            } , {
                "index": 2 ,
                "id": "block_1490027949712" ,
                "type": "txt" ,
                "txt": "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_D122_block_1490027949712_txt" ,
                "class": "perso-body" ,
                "text": "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_D122_block_1490027949712_txt"
            }] ,
            "next": {"target": "BT_TestCategorySpendingIQ_D13"}
        } , {
            "id": "BT_TestCategorySpendingIQ_D13" ,
            "blocks": [{
                "index": 0 ,
                "id": "block_1490028079328" ,
                "type": "txt" ,
                "txt": "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_D13_block_1490028079328_txt" ,
                "class": "perso-H4" ,
                "text": "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_D13_block_1490028079328_txt"
            } , {
                "index": 1 ,
                "id": "block_1490028287513" ,
                "type": "bar-chart" ,
                "src": "transactions.groupBy('month','amount')" ,
                "direction": "vertical" ,
                "categories": "periods.sortByMonth('month','asc')" ,
                "x": "utils.monthName(month)" ,
                "y": "utils.abs(amount)" ,
                "default": "transactions.groupBy('month','amount').sortByMonth('month','desc').first('month')" ,
                "label": "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_D13_block_1490028287513_label" ,
                "var": "selectedMonth" ,
                "varSource": "month"
            }] ,
            "next": {"target": "BT_TestCategorySpendingIQ_D14"}
        } , {
            "id": "BT_TestCategorySpendingIQ_D14" ,
            "blocks": [{
                "index": 0 ,
                "id": "block_1490084831712" ,
                "type": "txt" ,
                "description": "" ,
                "txt": "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_D14_block_1490084831712_txt" ,
                "class": "perso-H4" ,
                "text": "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_D14_block_1490084831712_txt"
            } , {
                "index": 1 ,
                "id": "block_1490085307205" ,
                "type": "tranList" ,
                "src": "transactions.filter('month',selectedMonth).sortBy('date','desc')" ,
                "columns": [] ,
                "class": "perso-txlist1"
            }]
        }] ,
        "id": "TestCategorySpendingIQ_UC1_Definition"
    } ,
    "facts": {
        "storyId": "TestCategorySpendingIQ_UC1" ,
        "quizRanges": {
            "type": "PTable" ,
            "cols": ["id" , "from" , "to" , "answer"] ,
            "rows": [["1" , "401.0" , "530.0" , "false"] , ["2" , "531.0" , "750.0" , "false"] , ["3" , "751.0" , "1000.0" , "false"] , ["4" , "1001.0" , "1300.0" , "true"]] ,
            "attributesTypes": ["PNumber" , "PNumber" , "PNumber" , "Undefined"]
        } ,
        "seriesNames": {
            "type": "PTable" ,
            "cols": ["seriesNames"] ,
            "rows": [["In"] , ["Out"]] ,
            "attributesTypes": ["String"]
        } ,
        "periods": {
            "type": "PTable" ,
            "cols": ["month"] ,
            "rows": [["9"] , ["8"] , ["7"] , ["6"] , ["5"] , ["4"]] ,
            "attributesTypes": ["PNumber"]
        } ,
        "currentDate": {
            "type": "PDate" ,
            "cols": ["value"] ,
            "rows": [["2017-09-10T06:29:49.691Z"]] ,
            "attributesTypes": ["PDate"]
        } ,
        "accounts": {
            "type": "PTable" ,
            "cols": ["id" , "name" , "image" , "balance" , "number" , "credit" , "currencyCd" , "program" , "type" , "depositBalance" , "displayBalance" , "creditLine" , "outstandingBalance" , "lastStatementDueDate" , "lastStatementMinPayment" , "lastStatementFullBalance" , "lastStatementCutoffDate" , "pastDueAmount" , "accountStatus" , "numberOfOwners" , "clientAccountType" , "count" , "sum" , "avg" , "std"] ,
            "rows": [["26287000152588736443740" , {"en": "כרטיס אשראי"} , "PERSO_40" , "0.0" , "4437" , "7273.31" , "ILS" , null , "Credit" , "0.0" , "7726.69" , "15000.0" , "7726.69" , null , "0.0" , "8182.91" , null , "0.0" , "Open" , "1" , null , "41" , "6501.26" , "1083.5433333333333" , "885.6208876764871"]] ,
            "attributesTypes": ["String" , "PText" , "String" , "PAmount" , "String" , "PAmount" , "String" , "Undefined" , "String" , "PAmount" , "PAmount" , "PAmount" , "PAmount" , "Undefined" , "PAmount" , "PAmount" , "Undefined" , "PAmount" , "String" , "PNumber" , "Undefined" , "PNumber" , "PNumber" , "PNumber" , "PNumber"]
        } ,
        "transactions": {
            "type": "PTable" ,
            "cols": ["id" , "account" , "accountNumber" , "transaction" , "amount" , "date" , "type" , "month" , "mode" , "currencyCd" , "currencyCdOriginal" , "categoryGroup" , "categoryDescription" , "device"] ,
            "rows": [["262870001525887364437מגה בעיר נאות30.22180176171" , "26287000152588736443740" , "4437" , "מגה בעיר נאות" , "-30.22" , "2017-09-10T00:00:00.000Z" , "Charge" , "9" , "Out" , "ILS" , "ILS" , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , null] , ["262870001525887364437סופר זול בן ג105.5180176170" , "26287000152588736443740" , "4437" , "סופר זול בן ג" , "-105.5" , "2017-09-09T00:00:00.000Z" , "Charge" , "9" , "Out" , "ILS" , "ILS" , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , null] , ["262870001525887364437סופר סימה113.59180176166" , "26287000152588736443740" , "4437" , "סופר סימה" , "-113.59" , "2017-09-08T00:00:00.000Z" , "Charge" , "9" , "Out" , "ILS" , "ILS" , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , null] , ["262870001525887364437סופר סימה74.38180176165" , "26287000152588736443740" , "4437" , "סופר סימה" , "-74.38" , "2017-09-07T00:00:00.000Z" , "Charge" , "9" , "Out" , "ILS" , "ILS" , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , null] , ["262870001525887364437ברודצקי תא AM44.75180176163" , "26287000152588736443740" , "4437" , "ברודצקי תא AM" , "-44.75" , "2017-09-06T00:00:00.000Z" , "Charge" , "9" , "Out" , "ILS" , "ILS" , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , null] , ["262870001525887364437צרכניית הגוש115.7180176160" , "26287000152588736443740" , "4437" , "צרכניית הגוש" , "-115.7" , "2017-09-04T00:00:00.000Z" , "Charge" , "9" , "Out" , "ILS" , "ILS" , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , null] , ["262870001525887364437פיין מרקט578.09180176158" , "26287000152588736443740" , "4437" , "פיין מרקט" , "-578.09" , "2017-09-03T00:00:00.000Z" , "Charge" , "9" , "Out" , "ILS" , "ILS" , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , null] , ["262870001525887364437ידע הבשרים אט301.4180176156" , "26287000152588736443740" , "4437" , "ידע הבשרים אט" , "-301.4" , "2017-09-03T00:00:00.000Z" , "Charge" , "9" , "Out" , "ILS" , "ILS" , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , null] , ["262870001525887364437טרי על הבוקר28163849087" , "26287000152588736443740" , "4437" , "טרי על הבוקר" , "-28.0" , "2017-08-30T00:00:00.000Z" , "Charge" , "8" , "Out" , "ILS" , "ILS" , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , null] , ["262870001525887364437צרכניית הגוש74.1163849084" , "26287000152588736443740" , "4437" , "צרכניית הגוש" , "-74.1" , "2017-08-29T00:00:00.000Z" , "Charge" , "8" , "Out" , "ILS" , "ILS" , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , null] , ["262870001525887364437ביתא קפה195163849082" , "26287000152588736443740" , "4437" , "ביתא קפה" , "-195.0" , "2017-08-28T00:00:00.000Z" , "Charge" , "8" , "Out" , "ILS" , "ILS" , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , null] , ["262870001525887364437'סופר פארם רמ155.09163849078" , "26287000152588736443740" , "4437" , "'סופר פארם רמ" , "-155.09" , "2017-08-28T00:00:00.000Z" , "Charge" , "8" , "Out" , "ILS" , "ILS" , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , null] , ["262870001525887364437צביקה ש.ב.חנו51163849075" , "26287000152588736443740" , "4437" , "צביקה ש.ב.חנו" , "-51.0" , "2017-08-27T00:00:00.000Z" , "Charge" , "8" , "Out" , "ILS" , "ILS" , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , null] , ["262870001525887364437סופר זול בן ג236.75163849072" , "26287000152588736443740" , "4437" , "סופר זול בן ג" , "-236.75" , "2017-08-26T00:00:00.000Z" , "Charge" , "8" , "Out" , "ILS" , "ILS" , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , null] , ["262870001525887364437'סופר פארם רמ59.8163849073" , "26287000152588736443740" , "4437" , "'סופר פארם רמ" , "-59.8" , "2017-08-26T00:00:00.000Z" , "Charge" , "8" , "Out" , "ILS" , "ILS" , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , null] , ["262870001525887364437עגבניה-דיזנגו25163849067" , "26287000152588736443740" , "4437" , "עגבניה-דיזנגו" , "-25.0" , "2017-08-24T00:00:00.000Z" , "Charge" , "8" , "Out" , "ILS" , "ILS" , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , null] , ["262870001525887364437טבע ספורט קסט56.35163849065" , "26287000152588736443740" , "4437" , "טבע ספורט קסט" , "-56.35" , "2017-08-24T00:00:00.000Z" , "Charge" , "8" , "Out" , "ILS" , "ILS" , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , null] , ["262870001525887364437רמת אביב - מי173.92163849064" , "26287000152588736443740" , "4437" , "רמת אביב - מי" , "-173.92" , "2017-08-21T00:00:00.000Z" , "Charge" , "8" , "Out" , "ILS" , "ILS" , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , null] , ["262870001525887364437'סופר פארם רמ116.56163849059" , "26287000152588736443740" , "4437" , "'סופר פארם רמ" , "-116.56" , "2017-08-19T00:00:00.000Z" , "Charge" , "8" , "Out" , "ILS" , "ILS" , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , null] , ["262870001525887364437רמת אביב - מי288.45163849055" , "26287000152588736443740" , "4437" , "רמת אביב - מי" , "-288.45" , "2017-08-18T00:00:00.000Z" , "Charge" , "8" , "Out" , "ILS" , "ILS" , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , null] , ["262870001525887364437נוי השדה שוק 141.52163849051" , "26287000152588736443740" , "4437" , "נוי השדה שוק " , "-141.52" , "2017-08-18T00:00:00.000Z" , "Charge" , "8" , "Out" , "ILS" , "ILS" , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , null] , ["262870001525887364437שופרסל שלי רמ115.8163849046" , "26287000152588736443740" , "4437" , "שופרסל שלי רמ" , "-115.8" , "2017-08-11T00:00:00.000Z" , "Charge" , "8" , "Out" , "ILS" , "ILS" , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , null] , ["262870001525887364437שמו קונדיטורי35163849042" , "26287000152588736443740" , "4437" , "שמו קונדיטורי" , "-35.0" , "2017-08-07T00:00:00.000Z" , "Charge" , "8" , "Out" , "ILS" , "ILS" , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , null] , ["262870001525887364437שופרסל שלי רמ34.55163849043" , "26287000152588736443740" , "4437" , "שופרסל שלי רמ" , "-34.55" , "2017-08-07T00:00:00.000Z" , "Charge" , "8" , "Out" , "ILS" , "ILS" , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , null] , ["262870001525887364437ידע הבשרים אט23163849041" , "26287000152588736443740" , "4437" , "ידע הבשרים אט" , "-23.0" , "2017-08-06T00:00:00.000Z" , "Charge" , "8" , "Out" , "ILS" , "ILS" , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , null] , ["262870001525887364437ברודצקי תא AM82.98163849039" , "26287000152588736443740" , "4437" , "ברודצקי תא AM" , "-82.98" , "2017-08-05T00:00:00.000Z" , "Charge" , "8" , "Out" , "ILS" , "ILS" , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , null] , ["262870001525887364437שופרסל שלי רמ159.23147462613" , "26287000152588736443740" , "4437" , "שופרסל שלי רמ" , "-159.23" , "2017-07-30T00:00:00.000Z" , "Charge" , "7" , "Out" , "ILS" , "ILS" , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , null] , ["262870001525887364437סופר פארם נמל71.7147462612" , "26287000152588736443740" , "4437" , "סופר פארם נמל" , "-71.7" , "2017-07-30T00:00:00.000Z" , "Charge" , "7" , "Out" , "ILS" , "ILS" , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , null] , ["262870001525887364437טרי על הבוקר127147462611" , "26287000152588736443740" , "4437" , "טרי על הבוקר" , "-127.0" , "2017-07-30T00:00:00.000Z" , "Charge" , "7" , "Out" , "ILS" , "ILS" , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , null] , ["262870001525887364437פיין מרקט651.22147462609" , "26287000152588736443740" , "4437" , "פיין מרקט" , "-651.22" , "2017-07-28T00:00:00.000Z" , "Charge" , "7" , "Out" , "ILS" , "ILS" , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , null] , ["262870001525887364437נוי השדה שוק 56.66147462608" , "26287000152588736443740" , "4437" , "נוי השדה שוק " , "-56.66" , "2017-07-27T00:00:00.000Z" , "Charge" , "7" , "Out" , "ILS" , "ILS" , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , null] , ["262870001525887364437פרש אין דה סי177.68147462604" , "26287000152588736443740" , "4437" , "פרש אין דה סי" , "-177.68" , "2017-07-23T00:00:00.000Z" , "Charge" , "7" , "Out" , "ILS" , "ILS" , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , null] , ["262870001525887364437צביקה ש.ב.חנו79.2147462596" , "26287000152588736443740" , "4437" , "צביקה ש.ב.חנו" , "-79.2" , "2017-07-09T00:00:00.000Z" , "Charge" , "7" , "Out" , "ILS" , "ILS" , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , null] , ["262870001525887364437שופרסל שלי רמ62.8147462591" , "26287000152588736443740" , "4437" , "שופרסל שלי רמ" , "-62.8" , "2017-07-07T00:00:00.000Z" , "Charge" , "7" , "Out" , "ILS" , "ILS" , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , null] , ["262870001525887364437בורגרס בר רמת173147462590" , "26287000152588736443740" , "4437" , "בורגרס בר רמת" , "-173.0" , "2017-07-07T00:00:00.000Z" , "Charge" , "7" , "Out" , "ILS" , "ILS" , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , null] , ["262870001525887364437שי מעדני דגים139147462588" , "26287000152588736443740" , "4437" , "שי מעדני דגים" , "-139.0" , "2017-07-06T00:00:00.000Z" , "Charge" , "7" , "Out" , "ILS" , "ILS" , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , null] , ["262870001525887364437פרש אין דה סי36.48147462587" , "26287000152588736443740" , "4437" , "פרש אין דה סי" , "-36.48" , "2017-07-05T00:00:00.000Z" , "Charge" , "7" , "Out" , "ILS" , "ILS" , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , null] , ["262870001525887364437שופרסל שלי רמ78.59147462584" , "26287000152588736443740" , "4437" , "שופרסל שלי רמ" , "-78.59" , "2017-07-03T00:00:00.000Z" , "Charge" , "7" , "Out" , "ILS" , "ILS" , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , null] , ["262870001525887364437טבע ספורט קסט47.2147462583" , "26287000152588736443740" , "4437" , "טבע ספורט קסט" , "-47.2" , "2017-07-02T00:00:00.000Z" , "Charge" , "7" , "Out" , "ILS" , "ILS" , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , null] , ["262870001525887364437קפה סבסטיאן485147462581" , "26287000152588736443740" , "4437" , "קפה סבסטיאן" , "-485.0" , "2017-07-01T00:00:00.000Z" , "Charge" , "7" , "Out" , "ILS" , "ILS" , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , null] , ["262870001525887364437סודה קלאב900138765832" , "26287000152588736443740" , "4437" , "סודה קלאב" , "-900.0" , "2017-06-18T00:00:00.000Z" , "Charge" , "6" , "Out" , "ILS" , "ILS" , {
                "en": "Groceries" ,
                "he": "סופרמרקטים ומעדניות"
            } , {"en": "Groceries" , "he": "סופרמרקטים ומעדניות"} , null]] ,
            "attributesTypes": ["String" , "String" , "String" , "String" , "PAmount" , "PDate" , "String" , "PNumber" , "String" , "String" , "String" , "PText" , "PText" , "Undefined"]
        } ,
        "categoryGroup": {
            "type": "PCategoryGroup" ,
            "cols": ["id" , "description"] ,
            "rows": [["CG10000" , {"en": "Groceries" , "he": "סופרמרקטים ומעדניות"}]] ,
            "attributesTypes": ["String" , "PText"]
        }
    } ,
    "text": {
        "storyId": "TestCategorySpendingIQ_UC1" ,
        "title": {"en": {"txt": "quiz"}} ,
        "BT_TestCategorySpendingIQ_D11": {
            "en": {
                "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_D11_block_1490027517883_txt": "{{Amount from format='###,###,###'}} - {{Amount to format='###,###,###'}}" ,
                "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_D11_block_1490027334172_txt": "Can you guess your average monthly spend on <b>{{categoryGroup.description}}</b> from your account {{accounts.getValue(0,'number')}}?"
            } ,
            "he": {"TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_D11_block_1490027334172_txt": "האם תוכל/י לנחש מה ההוצאה החודשית  הממוצעת שלך ב{{categoryGroup.description}} בכרטיס האשראי שמסתיים ב{{accounts.getValue(0,'number')}}? "}
        } ,
        "BT_TestCategorySpendingIQ_D121": {
            "en": {
                "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_121_block_1490027817853_txt": "It looks like you're aware of your spending habits. Stay on top of your expenses and work towards your budgeting and savings goals." ,
                "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_D121_block_1490199194443_txt": "Good job!" ,
                "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_121_block_1490027730358_txt": "Your average monthly spending on {{categoryGroup.description}} is {{Amount (transactions.sum('amount')-transactions.filter('month',periods.first('month')).sum('amount'))/(periods.size()-1) format='+###,###,###'}}."
            } ,
            "he": {
                "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_121_block_1490027817853_txt": "נראה שאת/ה מכיר/ה את הוצאותיך בחשבון, זו דרך טובה לשלוט בהוצאות ולחסוך לעתיד! " ,
                "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_D121_block_1490199194443_txt": "יפה מאוד! " ,
                "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_121_block_1490027730358_txt": "ההוצאה הממוצעת ב{{categoryGroup.description}} היא {{Amount (transactions.sum('amount')-transactions.filter('month',periods.first('month')).sum('amount'))/(periods.size()-1) format='+###,###,###'}}. "
            }
        } ,
        "BT_TestCategorySpendingIQ_D122": {
            "en": {
                "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_D122_block_1490027901006_txt": "Your average monthly spending on {{categoryGroup.description}} is {{Amount (transactions.sum('amount')-transactions.filter('month',periods.first('month')).sum('amount'))/(periods.size()-1) format='+###,###,###'}}." ,
                "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_D122_block_1490027949712_txt": "Stay on top of your expenses and work towards your budgeting and savings goals." ,
                "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_D122_block_1490199163910_txt": "Not exactly"
            } ,
            "he": {
                "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_D122_block_1490027901006_txt": "הוצאה הממוצעת ב{{categoryGroup.description}} היא {{Amount (transactions.sum('amount')-transactions.filter('month',periods.first('month')).sum('amount'))/(periods.size()-1) format='+###,###,###'}}. " ,
                "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_D122_block_1490027949712_txt": "חשוב להכיר את הוצאותיך בחשבון, זו דרך טובה לשלוט בהוצאות ולחסוך לעתיד " ,
                "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_D122_block_1490199163910_txt": "לא בדיוק "
            }
        } ,
        "BT_TestCategorySpendingIQ_D13": {
            "en": {
                "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_D13_block_1490028287513_label": "{{Amount utils.abs(amount)}}" ,
                "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_D13_block_1490028079328_txt": "Here's your spending on {{categoryGroup.description}}:"
            } ,
            "he": {"TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_D13_block_1490028079328_txt": "להלן התפלגות הוצאותיך ב{{categoryGroup.description}} "}
        } ,
        "BT_TestCategorySpendingIQ_D14": {
            "en": {"TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_D14_block_1490084831712_txt": "Here's what you spent on {{categoryGroup.description}} in {{Date selectedMonth format='m'}}"} ,
            "he": {"TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_D14_block_1490084831712_txt": "פירוט ההוצאות ב{{categoryGroup.description}} לחודש {{Date selectedMonth format='m'}} "}
        }
    } ,
    "unreadMessages": 1 ,
    "ok": true ,
    "protocolVersion": 2.3 ,
    "statusMessage": "ok" ,
    "status": "200"
}

var aaa1 = {
    "story": {
        "storyId": "TestCategorySpendingIQ_UC1" ,
        "dialogs": [{
            "id": "BT_TestCategorySpendingIQ_D11" ,
            "blocks": [{
                "index": 0 ,
                "id": "block_1490027334172" ,
                "type": "txt" ,
                "txt": "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_D11_block_1490027334172_txt" ,
                "class": "perso-H2" ,
                "text": "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_D11_block_1490027334172_txt"
            } , {
                "index": 1 ,
                "id": "block_1490027517883" ,
                "type": "buttons" ,
                "buttonType": "button" ,
                "options": [{
                    "type": "data" ,
                    "txt": "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_D11_block_1490027517883_txt" ,
                    "src": "quizRanges"
                }] ,
                "class": "perso-radio-buttons" ,
                "var": "selectedAnswer"
            }] ,
            "next": [{
                "cond": "selectedAnswer.answer == 'true'" ,
                "target": "BT_TestCategorySpendingIQ_D121"
            } , {"cond": "selectedAnswer.answer == 'false'" , "target": "BT_TestCategorySpendingIQ_D122"}]
        } , {
            "id": "BT_TestCategorySpendingIQ_D121" ,
            "blocks": [{
                "index": 0 ,
                "id": "block_1490199194443" ,
                "type": "txt" ,
                "txt": "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_D121_block_1490199194443_txt" ,
                "class": "perso-H2" ,
                "text": "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_D121_block_1490199194443_txt"
            } , {
                "index": 1 ,
                "id": "block_1490027730358" ,
                "type": "txt" ,
                "txt": "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_121_block_1490027730358_txt" ,
                "class": "perso-body" ,
                "text": "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_121_block_1490027730358_txt"
            } , {
                "index": 2 ,
                "id": "block_1490027817853" ,
                "type": "txt" ,
                "txt": "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_121_block_1490027817853_txt" ,
                "class": "perso-body" ,
                "text": "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_121_block_1490027817853_txt"
            }] ,
            "next": {"target": "BT_TestCategorySpendingIQ_D13"}
        } , {
            "id": "BT_TestCategorySpendingIQ_D122" ,
            "blocks": [{
                "index": 0 ,
                "id": "block_1490199163910" ,
                "type": "txt" ,
                "description": "" ,
                "txt": "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_D122_block_1490199163910_txt" ,
                "class": "perso-H2" ,
                "text": "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_D122_block_1490199163910_txt"
            } , {
                "index": 1 ,
                "id": "block_1490027901006" ,
                "type": "txt" ,
                "txt": "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_D122_block_1490027901006_txt" ,
                "class": "perso-body" ,
                "text": "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_D122_block_1490027901006_txt"
            } , {
                "index": 2 ,
                "id": "block_1490027949712" ,
                "type": "txt" ,
                "txt": "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_D122_block_1490027949712_txt" ,
                "class": "perso-body" ,
                "text": "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_D122_block_1490027949712_txt"
            }] ,
            "next": {"target": "BT_TestCategorySpendingIQ_D13"}
        } , {
            "id": "BT_TestCategorySpendingIQ_D13" ,
            "blocks": [{
                "index": 0 ,
                "id": "block_1490028079328" ,
                "type": "txt" ,
                "txt": "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_D13_block_1490028079328_txt" ,
                "class": "perso-H4" ,
                "text": "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_D13_block_1490028079328_txt"
            } , {
                "index": 1 ,
                "id": "block_1490028287513" ,
                "type": "bar-chart" ,
                "src": "transactions.groupBy('month','amount')" ,
                "direction": "vertical" ,
                "categories": "periods.sortByMonth('month','asc')" ,
                "x": "utils.monthName(month)" ,
                "y": "utils.abs(amount)" ,
                "default": "transactions.groupBy('month','amount').sortByMonth('month','desc').first('month')" ,
                "label": "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_D13_block_1490028287513_label" ,
                "var": "selectedMonth" ,
                "varSource": "month"
            }] ,
            "next": {"target": "BT_TestCategorySpendingIQ_D14"}
        } , {
            "id": "BT_TestCategorySpendingIQ_D14" ,
            "blocks": [{
                "index": 0 ,
                "id": "block_1490084831712" ,
                "type": "txt" ,
                "description": "" ,
                "txt": "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_D14_block_1490084831712_txt" ,
                "class": "perso-H4" ,
                "text": "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_D14_block_1490084831712_txt"
            } , {
                "index": 1 ,
                "id": "block_1490085307205" ,
                "type": "tranList" ,
                "src": "transactions.filter('month',selectedMonth).sortBy('date','desc')" ,
                "columns": [] ,
                "class": "perso-txlist1"
            }]
        }] ,
        "id": "TestCategorySpendingIQ_UC1_Definition"
    } ,
    "facts": {
        "storyId": "TestCategorySpendingIQ_UC1" ,
        "quizRanges": {
            "type": "PTable" ,
            "cols": ["id" , "from" , "to" , "answer"] ,
            "rows": [[0 , 135 , 635 , true] , [1 , 635 , 1135 , false] , [2 , 1135 , 1635 , false] , [3 , 1635 , 2135 , false]] ,
            "attributesTypes": ["PNumber" , "PNumber" , "PNumber" , "Undefined"]
        } ,
        "seriesNames": {
            "type": "PTable" ,
            "cols": ["seriesNames"] ,
            "attributesTypes": ["String"] ,
            "rows": [["In"] , ["Out"]]
        } ,
        "periods": {
            "type": "PTable" ,
            "cols": ["month"] ,
            "attributesTypes": ["PNumber"] ,
            "rows": [["1"] , ["12"] , ["11"] , ["10"] , ["9"]]
        } ,
        "currentDate": {
            "type": "PDate" ,
            "cols": ["value"] ,
            "attributesTypes": ["PDate"] ,
            "rows": [["2018-02-10T20:43:05.225Z"]]
        } ,
        "accounts": {
            "type": "PTable" ,
            "cols": ["id" , "name" , "image" , "balance" , "number" , "credit" , "currencyCd" , "program" , "type" , "depositBalance" , "displayBalance" , "creditLine" , "outstandingBalance" , "lastStatementDueDate" , "lastStatementMinPayment" , "lastStatementFullBalance" , "lastStatementCutoffDate" , "pastDueAmount" , "accountStatus" , "numberOfOwners" , "clientAccountType" , "count" , "sum" , "avg" , "std"] ,
            "attributesTypes": ["String" , "PText" , "Undefined" , "PAmount" , "String" , "PAmount" , "String" , "Undefined" , "String" , "PAmount" , "PAmount" , "PAmount" , "PAmount" , "Undefined" , "PAmount" , "PAmount" , "Undefined" , "PAmount" , "String" , "PNumber" , "String" , "PNumber" , "PNumber" , "PNumber" , "PNumber"] ,
            "rows": [["B_1010_1004" , {} , null , "24430" , "1004" , "1000" , "ILS" , null , "Credit" , null , null , null , null , null , null , null , null , null , "Open" , "1" , null , null , 24430 , 24430 , 24430]]
        } ,
        "transactions": {
            "type": "PTable" ,
            "cols": ["id" , "account" , "accountNumber" , "transaction" , "amount" , "date" , "type" , "month" , "mode" , "currencyCd" , "currencyCdOriginal" , "categoryGroup" , "categoryDescription" , "device"] ,
            "attributesTypes": ["String" , "String" , "String" , "String" , "PAmount" , "PDate" , "String" , "PNumber" , "String" , "String" , "Undefined" , "PText" , "PText" , "String"] ,
            "rows": [["17" , "B_1010_1004" , "1004" , "sem.COM" , "-1000.99" , "2018-01-08T00:00:00.000Z" , "charge" , "1" , "Out" , "ILS" , null , {"en": "Grocery"} , {"en": "Grocery"} , "sem.COM"]]
        } ,
        "categoryGroup": {
            "type": "PCategoryGroup" ,
            "cols": ["id" , "description"] ,
            "rows": [["CG10000" , {"en": "Grocery"}]] ,
            "attributesTypes": ["String" , "PText"]
        }
    } ,
    "text": {
        "storyId": "TestCategorySpendingIQ_UC1" ,
        "title": {"en": {"txt": "quiz"}} ,
        "BT_TestCategorySpendingIQ_D11": {
            "en": {
                "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_D11_block_1490027517883_txt": "{{Amount from format='###,###,###'}} - {{Amount to format='###,###,###'}}" ,
                "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_D11_block_1490027334172_txt": "Can you guess your average monthly spend on <b>{{categoryGroup.description}}</b> from your account {{accounts.getValue(0,'number')}}?"
            } ,
            "he": {"TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_D11_block_1490027334172_txt": "האם תוכל/י לנחש מה ההוצאה החודשית  הממוצעת שלך ב{{categoryGroup.description}} בכרטיס האשראי שמסתיים ב{{accounts.getValue(0,'number')}}? "}
        } ,
        "BT_TestCategorySpendingIQ_D121": {
            "en": {
                "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_121_block_1490027817853_txt": "It looks like you're aware of your spending habits. Stay on top of your expenses and work towards your budgeting and savings goals." ,
                "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_D121_block_1490199194443_txt": "Good job!" ,
                "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_121_block_1490027730358_txt": "Your average monthly spending on {{categoryGroup.description}} is {{Amount (transactions.sum('amount')-transactions.filter('month',periods.first('month')).sum('amount'))/(periods.size()-1) format='+###,###,###'}}."
            } ,
            "he": {
                "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_121_block_1490027817853_txt": "נראה שאת/ה מכיר/ה את הוצאותיך בחשבון, זו דרך טובה לשלוט בהוצאות ולחסוך לעתיד! " ,
                "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_D121_block_1490199194443_txt": "יפה מאוד! " ,
                "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_121_block_1490027730358_txt": "ההוצאה הממוצעת ב{{categoryGroup.description}} היא {{Amount (transactions.sum('amount')-transactions.filter('month',periods.first('month')).sum('amount'))/(periods.size()-1) format='+###,###,###'}}. "
            }
        } ,
        "BT_TestCategorySpendingIQ_D122": {
            "en": {
                "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_D122_block_1490027901006_txt": "Your average monthly spending on {{categoryGroup.description}} is {{Amount (transactions.sum('amount')-transactions.filter('month',periods.first('month')).sum('amount'))/(periods.size()-1) format='+###,###,###'}}." ,
                "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_D122_block_1490027949712_txt": "Stay on top of your expenses and work towards your budgeting and savings goals." ,
                "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_D122_block_1490199163910_txt": "Not exactly"
            } ,
            "he": {
                "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_D122_block_1490027901006_txt": "הוצאה הממוצעת ב{{categoryGroup.description}} היא {{Amount (transactions.sum('amount')-transactions.filter('month',periods.first('month')).sum('amount'))/(periods.size()-1) format='+###,###,###'}}. " ,
                "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_D122_block_1490027949712_txt": "חשוב להכיר את הוצאותיך בחשבון, זו דרך טובה לשלוט בהוצאות ולחסוך לעתיד " ,
                "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_D122_block_1490199163910_txt": "לא בדיוק "
            }
        } ,
        "BT_TestCategorySpendingIQ_D13": {
            "en": {
                "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_D13_block_1490028287513_label": "{{Amount utils.abs(amount)}}" ,
                "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_D13_block_1490028079328_txt": "Here's your spending on {{categoryGroup.description}}:"
            } ,
            "he": {"TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_D13_block_1490028079328_txt": "להלן התפלגות הוצאותיך ב{{categoryGroup.description}} "}
        } ,
        "BT_TestCategorySpendingIQ_D14": {
            "en": {"TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_D14_block_1490084831712_txt": "Here's what you spent on {{categoryGroup.description}} in {{Date selectedMonth format='m'}}"} ,
            "he": {"TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ_D14_block_1490084831712_txt": "פירוט ההוצאות ב{{categoryGroup.description}} לחודש {{Date selectedMonth format='m'}} "}
        }
    } ,
    "unreadMessages": 1 ,
    "ok": true ,
    "protocolVersion": 2.3 ,
    "statusMessage": "ok" ,
    "status": "200"
}