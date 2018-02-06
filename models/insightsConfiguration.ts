export const storyIdForInsightId = {
    "72154aa7-d6b9-4f8e-b40d-a292cd0c167f": "DuplicateTransactionCharge_UC9" ,
    "66b719da-5a83-433b-bd82-c8ed2ca1685c": "RecommendRDC_UC1" ,
    "0ebf81f1-273a-47b2-ae66-59fc50520da0": "NotifySalaryDeposit_UC4" ,
    "16052c32-574b-4a15-882e-0286e4d64fe0": "NotifyGovernmentDeposit_UC1" ,
    "147443c7-7be1-4f68-8ff3-ce65e992c22c": "IntroducePersonetics_UC1" ,
    "40c6377e-888c-4e10-8647-4f4eed2ccea7": "SumSpendingMerchant_UC3" ,
    "0b1a223e-071b-4a89-8dc9-c56a9bdb3729": "NotifySalaryDeposit_UC2" ,
    "d1e567b3-262f-4da8-bb46-dbd4c132f372": "EOMCashFlowAnalysis_UC3" ,
    "39dd2b10-caa1-4fd2-ac24-180a2a86cfb4": "NewMerchants_UC5" ,
    "6b739292-bb50-4284-9d66-342de48403f2": "PurchaseAnalysis_UC6" ,
    "6b739292-bb50-4284-9d66-342de48403f2-b": "RevenueAnalysis_UC6" ,
    "7221df03-f2e3-421e-8667-eea0c6b7c7a5": "SumSpendingCategory_UC3" ,
    "c71202e6-46b8-42ec-ba53-5dc25d6db393": "UnexpectedDeposit_UC1"
}

export const dialogsForStory = {
    "DuplicateTransactionCharge_UC9": [
        "BT_ DuplicateTransactionCharge_D91" ,
        "BT_DuplicateTransactionCharge_D92" ,
        "BT_DuplicateTransactionCharge_D93" ,
        "BT_DuplicateTransactionCharge_D94"
    ] ,
    "RecommendRDC_UC1": [
        "BT_ RecommendRDC_D11" ,
        "BT_ RecommendRDC_D12" ,
        "BT_ RecommendRDC_D13"
    ] ,
    "NotifySalaryDeposit_UC4": [
        "BT_NotifySalaryDeposit.D11" ,
        "BT_NotifySalaryDeposit.D12" ,
        "BT_NotifySalaryDeposit.D13"
    ] ,
    "NotifyGovernmentDeposit_UC1" :[

    ],
    "IntroducePersonetics_UC1": [
        "IntroducePersonetics_D11"
    ] ,
    "SumSpendingMerchant_UC3": [
        "SumSpendingMerchant_D31" ,
        "accountSelector" ,
        "SumSpendingMerchant_D33" ,
        "SumSpendingMerchant_D33-b" ,
        "SumSpendingMerchant_D34"
    ] ,
    "NotifySalaryDeposit_UC2": [
        "BT_NotifySalaryDeposit.D21" ,
        "BT_NotifySalaryDeposit.D22" ,
        "BT_NotifySalaryDeposit.D23"
    ] ,
    "EOMCashFlowAnalysis_UC3": [
        "EOMCashFlowAnalysis_D31" ,
        "accountSelector" ,
        "EOMCashFlowAnalysis_D33" ,
        "EOMCashFlowAnalysis_D33-b" ,
        "BT_EOMCashFlowAnalysis.D111" ,
        "EOMCashFlowAnalysis_D34" ,
        "EOMCashFlowAnalysis_D35"
    ] ,
    "NewMerchants_UC5": [
        "BT_NewMerchants.D21" ,
        "BT_NewMerchants.D22" ,
        "BT_NewMerchants.D23"
    ] ,
    "PurchaseAnalysis_UC6": [
        "BT_PurchaseAnalysis.D61" ,
        "BT_PurchaseAnalysis.D62" ,
        "BT_PurchaseAnalysis.D631" ,
        "BT_PurchaseAnalysis.D631-b" ,
        "BT_PurchaseAnalysis.D641" ,
        "BT_PurchaseAnalysis.D651"
    ] ,
    "RevenueAnalysis_UC6": [
        "BT_PurchaseAnalysis.D61" ,
        "BT_PurchaseAnalysis.D62" ,
        "BT_PurchaseAnalysis.D631" ,
        "BT_PurchaseAnalysis.D631-b" ,
        "BT_PurchaseAnalysis.D641" ,
        "BT_PurchaseAnalysis.D651"
    ] ,
    "SumSpendingCategory_UC3": [
        "BT_SumSpendingCategory.D58" ,
        "BT_SumSpendingCategory.D571" ,
        "BT_SumSpendingCategory.D111" ,
        "BT_SumSpendingCategory.D111-b" ,
        "BT_SumSpendingCategory.D12"
    ] ,
    "UnexpectedDeposit_UC1": [
        "BT_UnexpectedDeposit.D11" ,
        "BT_UnexpectedDeposit.D12" ,
        "BT_UnexpectedDeposit.D13"
    ]
}

export const blockForDialog = {
    "BT_ DuplicateTransactionCharge_D91": [
        {
            type: "txt" ,
            txt: "TXT_D11_B1" ,
            class: "perso-H2" ,
            id: "block_0" ,
            text: "TXT_D11_B1"
        }
    ] ,
    "BT_DuplicateTransactionCharge_D92": [
        {
            id: "block_1488726659304" ,
            type: "account-selector" ,
            src: "accounts.abs('sum').sortBy('sum','desc')" ,
            var: "selectedAccount" ,
            showAll: true ,
            default: "'all'" ,
            accountText: "DuplicateTransactionCharge_UC9_BT_DuplicateTransactionCharge_D92_block_1488726659304_accountSelectorAccountText" ,
            allAccountsText: "DuplicateTransactionCharge_UC9_BT_DuplicateTransactionCharge_D92_block_1488726659304_accountSelectorAllAccountsText" ,
            selected: "all"
        }
    ] ,
    "BT_DuplicateTransactionCharge_D93": [
        {
            id: "block_1488727176895" ,
            type: "txt" ,
            txt: "DuplicateTransactionCharge_UC9_BT_DuplicateTransactionCharge_D93_block_1488727176895_txt" ,
            class: "perso-H4" ,
            text: "DuplicateTransactionCharge_UC9_BT_DuplicateTransactionCharge_D93_block_1488727176895_txt"
        } ,
        {
            id: "block_1488727202649" ,
            type: "tranList" ,
            src: "transactions.filter('account',selectedAccount.id)" ,
            columns: [
                "date" ,
                "amount" ,
                "category"
            ] ,
            class: "perso-txlist1"
        }
    ] ,
    "BT_DuplicateTransactionCharge_D94": [
        {
            id: "block_1488727324976" ,
            type: "txt" ,
            txt: "DuplicateTransactionCharge_UC9_BT_DuplicateTransactionCharge_D94_block_1488727324976_txt" ,
            class: "perso-body" ,
            text: "DuplicateTransactionCharge_UC9_BT_DuplicateTransactionCharge_D94_block_1488727324976_txt"
        }
    ] ,
    "BT_ RecommendRDC_D11": [
        {
            "type": "txt" ,
            "txt": "TXT_D11_B1" ,
            "class": "perso-H2" ,
            "id": "block_0" ,
            "text": "TXT_D11_B1"
        }
    ] ,
    "BT_ RecommendRDC_D12": [
        {
            "id": "block_1491130885876" ,
            "type": "account-selector" ,
            "options": [
                {
                    "type": "data" ,
                    "src": "confirmedAccount" ,
                    "text": "RecommendRDC_UC1_BT_ RecommendRDC_D12_block_1491130885876_accountSelectorAccountText"
                }
            ] ,
            "src": "confirmedAccount" ,
            "var": "selectedAccount" ,
            "showAll": false ,
            "accountText": "RecommendRDC_UC1_BT_ RecommendRDC_D12_block_1491130885876_accountSelectorAccountText"
        }
    ] ,
    "BT_ RecommendRDC_D13": [
        {
            "id": "block_1491131804369" ,
            "type": "txt" ,
            "txt": "RecommendRDC_UC1_BT_ RecommendRDC_D13_block_1491131804369_txt" ,
            "text": "RecommendRDC_UC1_BT_ RecommendRDC_D13_block_1491131804369_txt"
        } ,
        {
            "id": "block_1491131834027" ,
            "type": "buttons" ,
            "buttonType": "navigateTo" ,
            "options": [
                {
                    "id": "InitiateRDCLink" ,
                    "type": "static" ,
                    "txt": "RecommendRDC_UC1_BT_ RecommendRDC_D13_block_1491131834027_txt"
                }
            ]
        }
    ] ,
    "BT_NotifySalaryDeposit.D11": [
        {
            "type": "txt" ,
            "txt": "notifySalaryDepositTxt" ,
            "class": "perso-H2" ,
            "id": "block_0" ,
            "text": "notifySalaryDepositTxt"
        }
    ] ,
    "BT_NotifySalaryDeposit.D12": [
        {
            "type": "account-selector" ,
            "accountText": "accountTmpl" ,
            "src": "accounts.sortBy('number','DESC')" ,
            "default": "accounts.max('number').getValue(0,'id')" ,
            "showAll": false ,
            "id": "block_0" ,
            "var": "selectedAccount"
        }
    ] ,
    "BT_NotifySalaryDeposit.D13": [
        {
            "type": "txt" ,
            "txt": "recentPaycheckTxt" ,
            "class": "perso-H4" ,
            "id": "block_0" ,
            "text": "recentPaycheckTxt"
        } ,
        {
            "type": "tranList" ,
            "class": "perso-txlist1" ,
            "src": "transactions.sortBy('date','desc')" ,
            "id": "block_1"
        }
    ] ,
    "IntroducePersonetics_D11": [
        {
            id: "block_1510061169662" ,
            type: "txt" ,
            description: "" ,
            txt: "IntroducePersonetics_UC1_IntroducePersonetics_D11_block_1510061169662_txt"
        } ,
        {
            id: "block_1510061217574" ,
            type: "txt" ,
            txt: "IntroducePersonetics_UC1_IntroducePersonetics_D11_block_1510061217574_txt"
        } ,
        {
            id: "block_1510061264079" ,
            type: "txt" ,
            txt: "IntroducePersonetics_UC1_IntroducePersonetics_D11_block_1510061264079_txt"
        } ,
        {
            id: "block_1510061276763" ,
            type: "txt" ,
            txt: "IntroducePersonetics_UC1_IntroducePersonetics_D11_block_1510061276763_txt"
        } ,
        {
            id: "block_1510061290202" ,
            type: "txt" ,
            txt: "IntroducePersonetics_UC1_IntroducePersonetics_D11_block_1510061290202_txt"
        } ,
        {
            id: "block_1510061303885" ,
            type: "txt" ,
            txt: "IntroducePersonetics_UC1_IntroducePersonetics_D11_block_1510061303885_txt"
        } ,
        {
            id: "block_1510061318273" ,
            type: "txt" ,
            txt: "IntroducePersonetics_UC1_IntroducePersonetics_D11_block_1510061318273_txt"
        } ,
        {
            id: "block_1510061350161" ,
            type: "txt" ,
            txt: "IntroducePersonetics_UC1_IntroducePersonetics_D11_block_1510061350161_txt"
        } ,
        {
            id: "block_1510061364663" ,
            type: "txt" ,
            txt: "IntroducePersonetics_UC1_IntroducePersonetics_D11_block_1510061364663_txt"
        } ,
        {
            id: "block_1510061375935" ,
            type: "txt" ,
            txt: "IntroducePersonetics_UC1_IntroducePersonetics_D11_block_1510061375935_txt"
        } ,
        {
            id: "block_1510061392481" ,
            type: "txt" ,
            txt: "IntroducePersonetics_UC1_IntroducePersonetics_D11_block_1510061392481_txt"
        }
    ] ,
    "SumSpendingMerchant_D31": [
        {
            "type": "txt" ,
            "txt": "storySubtitle" ,
            "class": "perso-H2" ,
            "id": "block_0"
        } ,
        {
            "type": "txt" ,
            "id": "block_1" ,
            "class": "perso-body" ,
            "txt": "SumSpendingMerchant_UC3_SumSpendingMerchant_D31_block_1_txt"
        }
    ] ,
    "accountSelector": [
        {
            "type": "account-selector" ,
            "var": "selectedAccount" ,
            "accountText": "accountTmpl" ,
            "allAccountsText": "allAccounts" ,
            "src": "accounts.abs('sum').sortBy('sum','desc')" ,
            "default": "'all'" ,
            "showAll": true ,
            "id": "block_0"
        }
    ] ,
    "SumSpendingMerchant_D33": [
        {
            "showIf": "selectedAccount.id == 'all'" ,
            "type": "txt" ,
            "id": "block_2" ,
            "txt": "D33_B1_Text_All_Accounts" ,
            "class": "perso-H4"
        } ,
        {
            "showIf": "selectedAccount.id != 'all'" ,
            "type": "txt" ,
            "id": "block_2" ,
            "txt": "SumSpendingMerchant_UC3_SumSpendingMerchant_D33_block_2_txt" ,
            "class": "perso-H4"
        } ,
        {
            "type": "bar-chart" ,
            "direction": "vertical" ,
            "src": "transactions.filter('account',selectedAccount.id).groupBy('month','amount').sortByMonth('month','asc')" ,
            "var": "selectedMonth" ,
            "varSource": "month" ,
            "x": "utils.monthName(month,'MMM')" ,
            "y": "-1*amount" ,
            "categories": "periods.sortByMonth('month','asc')" ,
            "label": "label" ,
            "default": "utils.formatDate(lastMonthDate,'mm')" ,
            "id": "block_3" ,
            "selected": "3"
        }
    ] ,
    "SumSpendingMerchant_D33-b": [
        {
            "type": "textboxes" ,
            "boxes": [
                {
                    "value": "Amount -1*transactions.filter('account',selectedAccount.id).filter('month',selectedMonth).sum('amount') format='###,###,###'" ,
                    "label": "SumByMonth"
                } ,
                {
                    "value": "utils.highlightText(Amount -1*transactions.filter('account',selectedAccount.id).sum('amount')/periods.size() format='###,###,###')" ,
                    "label": "AvgByMonth"
                } ,
                {
                    "value": "utils.formatPercent((utils.round(transactions.filter('account',selectedAccount.id).filter('month',selectedMonth).sum('amount'))-utils.round(transactions.filter('account',selectedAccount.id).sum('amount')/periods.size()))/utils.round(transactions.filter('account',selectedAccount.id).sum('amount')/periods.size()+.01))" ,
                    "label": "percentTxt"
                }
            ] ,
            "id": "block_0"
        }
    ] ,
    "SumSpendingMerchant_D34": [
        {
            "type": "txt" ,
            "txt": "D34_Text" ,
            "class": "perso-H4" ,
            "id": "block_0"
        } ,
        {
            "type": "tranList" ,
            "src": "transactions.filter('account',selectedAccount.id).filter('month',selectedMonth).sortBy('date','desc')" ,
            "class": "perso-txlist1" ,
            "id": "block_1"
        }
    ] ,
    "BT_NotifySalaryDeposit.D21": [
        {
            "type": "txt" ,
            "txt": "notifySalaryDepositTxt" ,
            "class": "perso-H2" ,
            "id": "block_0"
        }
    ] ,
    "BT_NotifySalaryDeposit.D22": [
        {
            "type": "account-selector" ,
            "accountText": "accountTmpl" ,
            "src": "accounts.sortBy('number','DESC')" ,
            "default": "accounts.max('number').getValue(0,'id')" ,
            "showAll": false ,
            "id": "block_0" ,
            "var": "selectedAccount"
        }
    ] ,
    "BT_NotifySalaryDeposit.D23": [
        {
            "type": "txt" ,
            "txt": "recentPaycheckTxt" ,
            "class": "perso-H4" ,
            "id": "block_0"
        } ,
        {
            "type": "tranList" ,
            "class": "perso-txlist1" ,
            "src": "transactions.sortBy('date','desc')" ,
            "id": "block_1"
        }
    ] ,
    "EOMCashFlowAnalysis_D31": [
        {
            "type": "txt" ,
            "txt": "D31_Text" ,
            "class": "perso-H2" ,
            "id": "block_0" ,
            "index": 0
        }
    ] ,
    "EOMCashFlowAnalysis_D33": [
        {
            "type": "txt" ,
            "txt": "D33_B1_Text" ,
            "class": "perso-H4" ,
            "id": "block_0" ,
            "index": 0
        } ,
        {
            "type": "bar-chart" ,
            "direction": "vertical" ,
            "var": "selectedMonth" ,
            "varSource": "month" ,
            "categories": "periods.sortByMonth('month','asc')" ,
            "src": "cashFlowTransactions.filter('account',selectedAccount.id).groupBy(['month','mode'],'amount','sum')" ,
            "series": "mode" ,
            "seriesNames": "seriesNames" ,
            "x": "utils.monthName(month,'MMM')" ,
            "y": "utils.abs(amount)" ,
            "label": "chartLabel" ,
            "default": "utils.formatDate(lastMonthDate,'mm')" ,
            "id": "block_1" ,
            "index": 1
        }
    ] ,
    "EOMCashFlowAnalysis_D33-b": [

        {
            "type": "textboxes" ,
            "boxes": [
                {
                    "value": "utils.highlightText(Amount cashFlowTransactions.filter('account',selectedAccount.id).filter('month',selectedMonth).filter('mode','In').sum('amount')+cashFlowTransactions.filter('account',selectedAccount.id).filter('month',selectedMonth).filter('mode','Out').sum('amount'))" ,
                    "label": "totalCashFlowTxt"
                } ,
                {
                    "value": "utils.highlightText(Amount (cashFlowTransactions.filter('account',selectedAccount.id).groupBy(['month','mode'],'amount').filter('mode','In').sum('amount')/periods.size())+(cashFlowTransactions.filter('account',selectedAccount.id).groupBy(['month','mode'],'amount').filter('mode','Out').sum('amount')/periods.size()))" ,
                    "label": "avgMonthlyCashFlowTxt"
                } ,
                {
                    "value": "Amount (cashFlowTransactions.filter('account',selectedAccount.id).filter('month',selectedMonth).filter('mode','In').sum('amount')+cashFlowTransactions.filter('account',selectedAccount.id).filter('month',selectedMonth).filter('mode','Out').sum('amount'))-(cashFlowTransactions.filter('account',selectedAccount.id).groupBy(['month','mode'],'amount').filter('mode','In').sum('amount')/periods.size()+cashFlowTransactions.filter('account',selectedAccount.id).groupBy(['month','mode'],'amount').filter('mode','Out').sum('amount')/periods.size())" ,
                    "label": "changeFromAvgTxt"
                }
            ] ,
            "id": "block_3" ,
        }
    ] ,
    "BT_EOMCashFlowAnalysis.D111": [
        {
            "type": "txt" ,
            "txt": "D34_B1_Text" ,
            "class": "perso-H4" ,
            "id": "block_0" ,
        } ,
        {
            "type": "tabs" ,
            "tabs": [
                {
                    "id": "outId" ,
                    "text": "outText"
                } ,
                {
                    "id": "inId" ,
                    "text": "inText"
                }
            ] ,
            "var": "selectedTab" ,
            "default": "'Out'" ,
            "id": "block_1"
        }
    ] ,
    "EOMCashFlowAnalysis_D34": [
        {
            "type": "pie-chart" ,
            "var": "selectedBizClass" ,
            "varSource": "bizCategory" ,
            "sliceName": "bizCategory" ,
            "sliceValue": "amount" ,
            "label": "chartLabel" ,
            "centerText": "centerText" ,
            "src": "cashFlowTransactions.filter('account',selectedAccount.id).filter('month',selectedMonth).filter('mode',selectedTab.id).groupBy('bizCategory','amount').sortBy('amount','desc')" ,
            "default": "cashFlowTransactions.filter('account',selectedAccount.id).filter('month',selectedMonth).filter('mode',selectedTab.id).groupBy('bizCategory','amount').abs('amount').max('amount').getValue(0,'bizCategory')" ,
            "id": "block_0"
        }
    ] ,
    "EOMCashFlowAnalysis_D35": [
        {
            "type": "tranList" ,
            "class": "perso-txlist1" ,
            "src": "cashFlowTransactions.filter('account',selectedAccount.id).filter('month',selectedMonth).filter('mode',selectedTab.id).filter('bizCategory',selectedBizClass)" ,
            "id": "block_1" ,
        }
    ] ,
    "BT_NewMerchants.D21": [
        {
            "type": "txt" ,
            "txt": "TXT_D11_B1" ,
            "class": "perso-H2" ,
            "id": "block_0" ,
            "description": "Block1"
        }
    ] ,
    "BT_NewMerchants.D22": [
        {
            "type": "account-selector" ,
            "id": "block_3" ,
            "src": "accounts.abs('sum').sortBy('sum','desc')" ,
            "showAll": true ,
            "default": "'all'" ,
            "accountText": "NewMerchants_UC5_BT_NewMerchants.D22_block_3_accountSelectorAccountText" ,
            "dialogTextData": {
                "en": {
                    "NewMerchants_UC5_BT_NewMerchants.D22_block_3_accountSelectorAccountText": "<span class=\"perso-bold\">{{countMerchants}} new place(s)</span><br>{{Amount sum}}" ,
                    "NewMerchants_UC5_BT_NewMerchants.D22_block_3_accountSelectorAllAccountsText": "123"
                }
            } ,
            "var": "selectedAccount" ,
            "allAccountsText": "NewMerchants_UC5_BT_NewMerchants.D22_block_3_accountSelectorAllAccountsText"
        }
    ] ,
    "BT_NewMerchants.D23": [
        {
            "txt": "block_2" ,
            "type": "txt" ,
            "description": "Block1" ,
            "class": "perso-H4" ,
            "id": "block_0"
        } ,
        {
            "type": "tranList" ,
            "id": "block_1" ,
            "src": "transactions.filter('account',selectedAccount.id)" ,
            "columns": [
                "date" ,
                "amount" ,
                "category"
            ] ,
            "class": "perso-txlist1"
        }
    ] ,
    "BT_PurchaseAnalysis.D61": [
        {
            "type": "txt" ,
            "txt": "purchaseSpendingsAmountTxt" ,
            "class": "perso-H2" ,
            "id": "block_0" ,
        } ,
        {
            "type": "txt" ,
            "txt": "noteTxt" ,
            "class": "perso-body" ,
            "id": "block_1" ,
        }
    ] ,
    "BT_PurchaseAnalysis.D62": [
        {
            "type": "account-selector" ,
            "accountText": "accountTmpl" ,
            "var": "selectedAccount" ,
            "src": "utils.join(accounts,transactions.filter('month',dateUtils.getMonth(currentDate,-1)).groupBy('account','amount'),'accounts.id==transactions.account','LEFT').abs('amount').sortBy('amount','desc')" ,
            "default": "utils.join(accounts,transactions.filter('month',dateUtils.getMonth(currentDate,-1)).groupBy('account','amount'),'accounts.id==transactions.account','LEFT').abs('amount').sortBy('amount','desc').getValue(0,'id')" ,
            "showAll": false ,
            "id": "block_0"
        }
    ] ,
    "BT_PurchaseAnalysis.D631": [
        {
            "type": "txt" ,
            "txt": "monthlyPurchasesTxt" ,
            "class": "perso-H4" ,
            "id": "block_0"
        } ,
        {
            "type": "bar-chart" ,
            "direction": "vertical" ,
            "var": "selectedMonth" ,
            "varSource": "month" ,
            "categories": "periods.sortByMonth('month','asc')" ,
            "x": "utils.monthName(month,'MMM')" ,
            "y": "-1*amount" ,
            "label": "chartLabel" ,
            "src": "transactions.filter('account',selectedAccount.id).groupBy('month','amount').sortByMonth('month', 'asc')" ,
            "default": "transactions.filter('account',selectedAccount.id).groupBy('month','amount').sortByMonth('month', 'desc').first('month')" ,
            "id": "block_1"
        }
    ] ,
    "BT_PurchaseAnalysis.D631-b": [
        {
            "type": "textboxes" ,
            "boxes": [
                {
                    "value": "Amount -1*transactions.filter('account',selectedAccount.id).sum('amount')/periods.size() format='###,###,###'" ,
                    "label": "monthAvgTxt"
                } ,
                {
                    "value": "Amount -1*transactions.filter('account',selectedAccount.id).filter('month',selectedMonth).sum('amount') format='###,###,###'" ,
                    "label": "selectedMonthSumTxt"
                } ,
                {
                    "value": "utils.formatPercent((utils.round(transactions.filter('account',selectedAccount.id).filter('month',selectedMonth).sum('amount'))-utils.round(transactions.filter('account',selectedAccount.id).sum('amount')/periods.size()))/utils.round(transactions.filter('account',selectedAccount.id).sum('amount')/periods.size()+.01))" ,
                    "label": "percentTxt"
                }
            ] ,
            "id": "block_0" ,
        }
    ] ,
    "BT_PurchaseAnalysis.D641": [
        {
            "type": "txt" ,
            "txt": "topSpendingTxt" ,
            "class": "perso-H4" ,
            "id": "block_0"
        } ,
        {
            "type": "pie-chart" ,
            "var": "selectedCategory" ,
            "varSource": "categoryGroup" ,
            "sliceName": "categoryGroup" ,
            "sliceValue": "amount" ,
            "label": "label" ,
            "centerText": "centerText" ,
            "src": "transactions.filter('account',selectedAccount.id).filter('month', selectedMonth).groupBy('categoryGroup','amount').sortBy('amount','asc')" ,
            "default": "transactions.filter('account',selectedAccount.id).filter('month',selectedMonth).groupBy('categoryGroup','amount').abs('amount').sortBy('amount','desc').getValue(0,'categoryGroup')" ,
            "id": "block_1"
        }
    ] ,
    "BT_PurchaseAnalysis.D651": [
        {
            "type": "tranList" ,
            "class": "perso-txlist1" ,
            "src": "transactions.filter('account', selectedAccount.id).filter('month', selectedMonth).filter('categoryGroup', selectedCategory)" ,
            "id": "block_0"
        }
    ] ,
    "BT_SumSpendingCategory.D58": [
        {
            "type": "txt" ,
            "txt": "categoryMonthSpendingTxt" ,
            "class": "perso-H2" ,
            "id": "block_0"
        } ,
        {
            "type": "txt" ,
            "id": "block_1" ,
            "txt": "SumSpendingCategory_UC3_BT_SumSpendingCategory.D58_block_1_txt" ,
            "class": "perso-body"
        }
    ] ,
    "BT_SumSpendingCategory.D571": [
        {
            "type": "account-selector" ,
            "allAccountsText": "allAccounts" ,
            "accountText": "accountTmpl" ,
            "var": "selectedAccount" ,
            "src": "accounts.abs('sum').sortBy('sum','desc')" ,
            "default": "'all'" ,
            "showAll": true ,
            "id": "block_0"
        }
    ] ,
    "BT_SumSpendingCategory.D111": [
        {
            "showIf": "selectedAccount.id == 'all'" ,
            "type": "txt" ,
            "id": "block_1" ,
            "txt": "SumSpendingCategory_UC3_BT_SumSpendingCategory.D111_block_1_txt" ,
            "class": "perso-H4"
        } ,
        {
            "showIf": "selectedAccount.id != 'all'" ,
            "type": "txt" ,
            "id": "block_1" ,
            "txt": "D111Title" ,
            "class": "perso-H4"
        } ,
        {
            "type": "bar-chart" ,
            "direction": "vertical" ,
            "var": "selectedMonth" ,
            "varSource": "month" ,
            "categories": "periods.sortByMonth('month','asc')" ,
            "src": "transactions.filter('account',selectedAccount.id).groupBy('month','amount')" ,
            "x": "utils.monthName(month,'MMM')" ,
            "y": "-1*amount" ,
            "label": "chartLabel" ,
            "default": "transactions.filter('account',selectedAccount.id).groupBy('month','amount').sortByMonth('month','desc').first('month')" ,
            "id": "block_2" ,
            "selected": "3"
        }
    ] ,
    "BT_SumSpendingCategory.D111-b": [
        {
            "type": "textboxes" ,
            "boxes": [
                {
                    "value": "Amount transactions.filter('account',selectedAccount.id).sum('amount')/periods.size() format='+###,###,###'" ,
                    "label": "monthAvgTxt"
                } ,
                {
                    "value": "Amount transactions.filter('account',selectedAccount.id).filter('month',selectedMonth).sum('amount') format='+###,###,###'" ,
                    "label": "selectedMonthSumTxt"
                } ,
                {
                    "value": "utils.formatPercent((transactions.filter('account',selectedAccount.id).filter('month',selectedMonth).sum('amount')-(transactions.filter('account',selectedAccount.id).sum('amount')/periods.size()))/(transactions.filter('account',selectedAccount.id).sum('amount')/periods.size()))" ,
                    "label": "percentTxt"
                }
            ]
        }
    ] ,
    "BT_SumSpendingCategory.D12": [
        {
            "type": "txt" ,
            "txt": "categoryTransactions" ,
            "class": "perso-H4" ,
            "id": "block_0"
        } ,
        {
            "type": "tranList" ,
            "class": "perso-txlist1" ,
            "src": "transactions.filter('account',selectedAccount.id).filter('month',selectedMonth).sortBy('date','desc')" ,
            "id": "block_1"
        }
    ] ,
    "BT_UnexpectedDeposit.D11": [
        {
            "type": "txt" ,
            "txt": "block1" ,
            "class": "perso-H2" ,
            "id": "block_0"
        } ,
        {
            "type": "txt" ,
            "txt": "block2" ,
            "class": "perso-body" ,
            "id": "block_1"
        }
    ] ,
    "BT_UnexpectedDeposit.D12": [
        {
            "type": "account-selector" ,
            "accountText": "accountTmpl" ,
            "src": "accounts.sortBy('number','DESC')" ,
            "default": "accounts.max('number').getValue(0,'id')" ,
            "showAll": false ,
            "id": "block_0" ,
            "dialogTextData": {
                "en": {
                    "accountTmpl": "{{count}} deposit<br>{{utils.formatAmount(utils.abs(sum))}}"
                }
            }
        }
    ] ,
    "BT_UnexpectedDeposit.D13": [
        {
            "type": "txt" ,
            "txt": "block1" ,
            "class": "perso-H4" ,
            "id": "block_0"
        } ,
        {
            "type": "tranList" ,
            "class": "perso-txlist1" ,
            "src": "transactions" ,
            "id": "block_1"
        }
    ]
}

export const classForDialog = [
    "BT_PurchaseAnalysis.D631-b" ,
    "BT_PurchaseAnalysis.D62" ,
    "BT_ RecommendRDC_D12" ,
    "BT_NotifySalaryDeposit.D12"
]

export const tablesForStory = {
    "DuplicateTransactionCharge_UC9": [
        "confirmedTransaction" ,
        "count" ,
        "currentDate" ,
        "accounts" ,
        "transactions"
    ] ,
    "RecommendRDC_UC1": [
        "confirmedTransaction" ,
        "confirmedAccount" ,
        "seriesNames" ,
        "periods" ,
        "currentDate" ,
        "accounts" ,
        "transactions"
    ] ,
    "NotifySalaryDeposit_UC4": [
        "confirmedTransaction",
        "confirmedAccount",
        "seriesNames",
        "periods",
        "currentDate",
        "accounts",
        "transactions"
    ] ,
    "IntroducePersonetics_UC1": [
        "currentDate"
    ] ,
    "SumSpendingMerchant_UC3": [] ,
    "NotifySalaryDeposit_UC2": [] ,
    "EOMCashFlowAnalysis_UC3": [
        "accounts" ,
        "currentDate"
    ] ,
    "NewMerchants_UC5": [] ,
    "PurchaseAnalysis_UC6": [
        "date" ,// תאריך נוכחי
        "amount" ,// סכום ההוצאות בחודש הנוכחי
        "seriesNames" ,// הקטגוריות (הוצאות והכנסות)
        "currentDate" , // תאריך נוכחי
        "transactions" ,
        "localCurrencyCd" ,//מטבע מקומי
        "lastMonthDate" ,// החודש האחרון
        "barChartExpenses" ,// טבלת החשבונות שיוצגו: סכום בחשבון  בחודש
        "periods" ,// מערך החודשים אותם נציג (4 חודשים אחרונים)
        "hasSingleAccount" ,// האם חשבון אחד
        "accounts"
    ] ,
    "RevenueAnalysis_UC6": [
        "date" ,// תאריך נוכחי
        "amount" ,// סכום ההוצאות בחודש הנוכחי
        "seriesNames" ,// הקטגוריות (הוצאות והכנסות)
        "currentDate" , // תאריך נוכחי
        "transactions" ,
        "localCurrencyCd" ,//מטבע מקומי
        "lastMonthDate" ,// החודש האחרון
        "barChartExpenses" ,// טבלת החשבונות שיוצגו: סכום בחשבון  בחודש
        "periods" ,// מערך החודשים אותם נציג (4 חודשים אחרונים)
        "hasSingleAccount" ,// האם חשבון אחד
        "accounts"
    ] ,
    "SumSpendingCategory_UC3": [] ,
    "UnexpectedDeposit_UC1": []
}


