"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    confirmedTransaction: {
        case: "transaction",
        type: "PTransaction",
        cols: [
            "id",
            "transaction",
            "amount",
            "date",
            "type",
            "currencyCd",
            "status"
        ],
        attributesTypes: [
            "String",
            "String",
            "PAmount",
            "PDate",
            "String",
            "String",
            "String"
        ]
    },
    count: {
        case: "transactionCount",
        type: "PNumber",
        cols: [
            "value"
        ],
        attributesTypes: [
            "String"
        ]
    },
    currentDate: {
        case: "currentDate",
        type: "PDate",
        cols: [
            "value"
        ],
        attributesTypes: [
            "PDate"
        ]
    },
    date: {
        case: "currentDate",
        type: "PDate",
        cols: [
            "value"
        ],
        attributesTypes: [
            "PDate"
        ]
    },
    accounts: {
        case: "accounts",
        type: "PTable",
        cols: [
            "id",
            "name",
            "image",
            "balance",
            "number",
            "credit",
            "currencyCd",
            "program",
            "type",
            "depositBalance",
            "displayBalance",
            "creditLine",
            "outstandingBalance",
            "lastStatementDueDate",
            "lastStatementMinPayment",
            "lastStatementFullBalance",
            "lastStatementCutoffDate",
            "pastDueAmount",
            "accountStatus",
            "numberOfOwners",
            "clientAccountType",
            "count",
            "sum",
            "avg",
            "std"
        ],
        attributesTypes: [
            "String",
            "PText",
            "Undefined",
            "PAmount",
            "String",
            "PAmount",
            "String",
            "Undefined",
            "String",
            "PAmount",
            "PAmount",
            "PAmount",
            "PAmount",
            "Undefined",
            "PAmount",
            "PAmount",
            "Undefined",
            "PAmount",
            "String",
            "PNumber",
            "String",
            "PNumber",
            "PNumber",
            "PNumber",
            "PNumber"
        ]
    },
    confirmedAccount: {
        case: "account",
        type: "PTable",
        cols: [
            "accountNumber",
            "id",
            "name",
            "image",
            "balance",
            "number",
            "credit",
            "currencyCd",
            "program",
            "type",
            "depositBalance",
            "displayBalance",
            "creditLine",
            "outstandingBalance",
            "lastStatementDueDate",
            "lastStatementMinPayment",
            "lastStatementFullBalance",
            "lastStatementCutoffDate",
            "pastDueAmount",
            "accountStatus",
            "numberOfOwners",
            "clientAccountType",
            "count",
            "sum",
            "avg",
            "std"
        ],
        attributesTypes: [
            "String",
            "String",
            "PText",
            "Undefined",
            "PAmount",
            "String",
            "PAmount",
            "String",
            "Undefined",
            "String",
            "PAmount",
            "PAmount",
            "PAmount",
            "PAmount",
            "Undefined",
            "PAmount",
            "PAmount",
            "Undefined",
            "PAmount",
            "String",
            "PNumber",
            "String",
            "PNumber",
            "PNumber",
            "PNumber",
            "PNumber"
        ]
    },
    transactions: {
        case: "transactions",
        type: "PTable",
        cols: [
            "id",
            "account",
            "accountNumber",
            "transaction",
            "amount",
            "date",
            "type",
            "month",
            "mode",
            "currencyCd",
            "currencyCdOriginal",
            "categoryGroup",
            "categoryDescription",
            "device"
        ],
        attributesTypes: [
            "String",
            "String",
            "String",
            "String",
            "PAmount",
            "PDate",
            "String",
            "PNumber",
            "String",
            "String",
            "Undefined",
            "PText",
            "PText",
            "String"
        ]
    },
    cashFlowTransactions: {
        case: "transactions",
        type: "PTable",
        cols: [
            "id",
            "account",
            "accountNumber",
            "transaction",
            "amount",
            "date",
            "month",
            "mode",
            "bizCategory",
            "currencyCd"
        ],
        attributesTypes: [
            "String",
            "String",
            "String",
            "String",
            "PAmount",
            "PDate",
            "PNumber",
            "String",
            "PText",
            "String"
        ]
    },
    seriesNames: {
        case: "seriesNames",
        type: "PTable",
        cols: [
            "seriesNames"
        ],
        attributesTypes: [
            "String"
        ]
    },
    lastMonthDate: {
        case: "lastMonthDate",
        type: "PNumber",
        cols: [
            "value"
        ],
        attributesTypes: [
            "String"
        ]
    },
    hasSingleAccount: {
        case: "hasSingleAccount",
        type: "PString",
        cols: [
            "value"
        ],
        attributesTypes: [
            "String"
        ]
    },
    amount: {
        case: "amount",
        type: "PAmount",
        cols: [
            "value"
        ],
        attributesTypes: [
            "PAmount"
        ]
    },
    localCurrencyCd: {
        case: "localCurrencyCd",
        type: "PString",
        cols: [
            "value"
        ],
        attributesTypes: [
            "String"
        ]
    },
    barChartExpenses: {
        case: "barChartExpenses",
        type: "PTable",
        cols: [
            "account",
            "amount",
            "month",
            "currencyCd"
        ],
        attributesTypes: [
            "String",
            "PAmount",
            "PNumber",
            "String"
        ]
    },
    periods: {
        case: "periods",
        "type": "PTable",
        "cols": [
            "month"
        ],
        "attributesTypes": [
            "PNumber"
        ]
    },
    bizCategories: {
        case: "bizCategories",
        type: "PTable",
        cols: [
            "bizCategory"
        ],
        rows: [],
        attributesTypes: [
            "String"
        ]
    },
    categoryGroup: {
        "case": "categoryGroup",
        "type": "PCategoryGroup",
        "cols": [
            "id",
            "description"
        ],
        "rows": [],
        "attributesTypes": [
            "String",
            "PText"
        ]
    },
    quizRanges: {
        "case": "quizRanges",
        "type": "PTable",
        "cols": [
            "id",
            "from",
            "to",
            "answer"
        ],
        "rows": [],
        "attributesTypes": [
            "PNumber",
            "PNumber",
            "PNumber",
            "Undefined"
        ]
    },
};
