export default {
    "BT_DuplicateTransactionCharge_D94": {
        "en": {
            "DuplicateTransactionCharge_UC9_BT_DuplicateTransactionCharge_D94_block_1488727324976_txt": "If you think that the charge is wrong, please contact the merchant and ask for clarification."
        } ,
        "he": {
            "DuplicateTransactionCharge_UC9_BT_DuplicateTransactionCharge_D94_block_1488727324976_txt": "במידה והחיוב אינו נכון, מומלץ לבצע בירור מול בית העסק או ליצור קשר עם חברת האשראי "
        }
    } ,
    "BT_DuplicateTransactionCharge_D92": {
        "en": {
            "DuplicateTransactionCharge_UC9_BT_DuplicateTransactionCharge_D92_block_1488726659304_accountSelectorAllAccountsText": "<span class=\"perso-bold\">{{count}}  similar charge(s)</span><br>{{Amount confirmedTransaction.amount format='###,###,###.00'}}" ,
            "DuplicateTransactionCharge_UC9_BT_DuplicateTransactionCharge_D92_block_1488726659304_accountSelectorAccountText": "<span class=\"perso-bold\">{{transactions.filter('account',id).groupBy('id').size()}} charge(s)</span><br>{{Amount confirmedTransaction.amount format='###,###,###.00'}}"
        } ,
        "he": {
            "DuplicateTransactionCharge_UC9_BT_DuplicateTransactionCharge_D92_block_1488726659304_accountSelectorAllAccountsText": "<span class=\"perso-bold\">{{count}} חיוב/ים זהים </span><br>{{Amount confirmedTransaction.amount format='###,###,###.00'}} כל חיוב " ,
            "DuplicateTransactionCharge_UC9_BT_DuplicateTransactionCharge_D92_block_1488726659304_accountSelectorAccountText": "{{transactions.filter('account',id).groupBy('id').size()}} חיוב/ים זהים כל חיוב {{Amount confirmedTransaction.amount format='###,###,###.00'}}"
        }
    } ,
    "BT_DuplicateTransactionCharge_D93": {
        "en": {
            "DuplicateTransactionCharge_UC9_BT_DuplicateTransactionCharge_D93_block_1488727176895_txt": "Details of similar charges:"
        } ,
        "he": {
            "DuplicateTransactionCharge_UC9_BT_DuplicateTransactionCharge_D93_block_1488727176895_txt": "פרטי החיובים הזהים: "
        }
    } ,
    "BT_ DuplicateTransactionCharge_D91": {
        "en": {
            "TXT_D11_B1": "You have {{count}} similar charges from {{confirmedTransaction.transaction}} on {{Date confirmedTransaction.date}}."
        } ,
        "he": {
            "TXT_D11_B1": "לתשומת ליבך, בתאריך {{Date confirmedTransaction.date format='DD/MM/yy'}} בוצעו {{count}} חיובים זהים בכרטיסי האשראי בחשבון. "
        }
    } ,
    "IntroducePersonetics_D11": {
        "en": {
            "IntroducePersonetics_UC1_IntroducePersonetics_D11_block_1510061350161_txt": "Spending Analysis",
            "IntroducePersonetics_UC1_IntroducePersonetics_D11_block_1510061364663_txt": "We will help you compare your spending between months and across categories, so you can see where your money goes and how your spending changes.",
            "IntroducePersonetics_UC1_IntroducePersonetics_D11_block_1510061276763_txt": "Cash Flow Forecast",
            "IntroducePersonetics_UC1_IntroducePersonetics_D11_block_1510061303885_txt": "Financial Education",
            "alt": "IntroducePersonetics image",
            "IntroducePersonetics_UC1_IntroducePersonetics_D11_block_1510061217574_txt": "Account Activity",
            "IntroducePersonetics_UC1_IntroducePersonetics_D11_block_1510061318273_txt": "We will suggest specific steps to increase savings, reduce debt, and improve your financials. In addition, we can help you create and automate a savings plan to meet your financial objectives.",
            "url": "introduce-personetics",
            "IntroducePersonetics_UC1_IntroducePersonetics_D11_block_1510061264079_txt": "We will discover your account activity trends, highlight important events, and flag unusual events.",
            "IntroducePersonetics_UC1_IntroducePersonetics_D11_block_0_imageUrl": "introduce-personetics",
            "IntroducePersonetics_UC1_IntroducePersonetics_D11_block_1510061375935_txt": "Customize your Insights",
            "IntroducePersonetics_UC1_IntroducePersonetics_D11_block_1510061290202_txt": "We will predict your cash flow, inform you ahead of time if your balance may not be enough to cover upcoming expenses and remind you about upcoming payments.",
            "IntroducePersonetics_UC1_IntroducePersonetics_D11_block_1510061169662_txt": "FinFit is a new breed of banking solution that puts your needs first. It provides timely and useful insights that keep you informed and help you stay on top of your financial affairs.",
            "IntroducePersonetics_UC1_IntroducePersonetics_D11_block_1510061392481_txt": "Get more out of FinFit by rating the insights that you receive. That way, we can adjust what we share with you and focus on what matters most."
        }
    },
    "SumSpendingMerchant_D31": {} ,
    "SumSpendingMerchant_D33": {} ,
    "SumSpendingMerchant_D33-b": {} ,
    "SumSpendingMerchant_D34": {} ,
    "BT_NotifySalaryDeposit.D22": {
        "en": {
            "accountTmpl": "{{Amount utils.abs(transactions.sortBy('date','desc').filterByDays('date',currentDate,-5).sum('amount')) format='###,###,###'}}<br><span class=\"perso-bold\">{{transactions.filterByDays('date',currentDate,-5).size()}} Pay Cheques</span>"
        }
    },
    "BT_NotifySalaryDeposit.D23": {
        "en": {
            "recentPaycheckTxt": "Take a look at your recent pay cheque deposits:",
            "labelAmount": "{{Amount utils.abs(amount)}}",
            "NotifySalaryDeposit_UC2_BT_NotifySalaryDeposit.D23_block_1509985196284_txt": "Pay Bills"
        }
    },
    "BT_NotifySalaryDeposit.D21": {
        "en": {
            "notifySalaryDepositTxt": "{{transactions.filterByDays('date',currentDate,-5).size()}} pay cheques were recently deposited into your account"
        }
    },
    "EOMCashFlowAnalysis_D33-b": {
        "en": {
            "changeFromAvgTxt": "Change from avg.",
            "totalCashFlowTxt": "Cash flow in {{Date selectedMonth format='M'}}",
            "avgMonthlyCashFlowTxt": "Avg. monthly cash flow"
        }
    },
    "EOMCashFlowAnalysis_D31": {
        "en": {
            "D31_Text": "Review the activity in your account during {{Date lastMonthDate format='m'}}."
        }
    },
    "EOMCashFlowAnalysis_D34": {
        "en": {
            "centerText": "{{Amount cashFlowTransactions.filter('account',selectedAccount.id).filter('month',selectedMonth).filter('mode',selectedTab.id).sum('amount')}}<br>Total",
            "chartLabel": "{{Amount amount}}"
        }
    },
    "BT_EOMCashFlowAnalysis.D111": {
        "en": {
            "inText": "Inflows",
            "D34_B1_Text": "Summary by type for {{Date selectedMonth format='m'}}:",
            "inId": "In",
            "outId": "Out",
            "outText": "Outflows"
        }
    },
    "accountSelector": {
        "en": {
            "accountTxt": "{{Amount (utils.abs(cashFlowTransactions.filter('month',utils.formatDate(lastMonthDate,'mm')).filter('mode','In').filter('account',id).sum('amount'))-utils.abs(cashFlowTransactions.filter('month',utils.formatDate(lastMonthDate,'mm')).filter('mode','Out').filter('account',id).sum('amount')))}}<br><span class='perso-bold'>Total cash flow</span>"
        }
    },
    "EOMCashFlowAnalysis_D33": {
        "en": {
            "chartLabel": "{{Amount amount}}",
            "D33_B1_Text": "Here's a view of your account activity:"
        }
    },
    "EOMCashFlowAnalysis_D35": {} ,
    "BT_NewMerchants.D21": {} ,
    "BT_NewMerchants.D22": {} ,
    "BT_NewMerchants.D23": {} ,
    "BT_PurchaseAnalysis.D641": {
        "en": {
            "centerText": "{{Amount utils.abs(transactions.filter('account',selectedAccount.id).filter('month',selectedMonth).sum('amount'))}}<br>Total",
            "label": "{{Amount -1*amount}}",
            "topSpendingTxt": "Let's review your top spending categories in {{Date selectedMonth format='m'}}:"
        }
    },
    "BT_PurchaseAnalysis.D631": {
        "en": {
            "monthlyPurchasesTxt": "Let's review your monthly purchases on {{accounts.filter('id',selectedAccount.id).getValue(0,'number')}}",
            "chartLabel": "{{Amount -1*amount}}"
        }
    },
    "BT_PurchaseAnalysis.D62": {
        "en": {
            "accountTmpl": "{{Amount utils.abs(transactions.filter('account',id).filter('month',dateUtils.getMonth(currentDate,-1)).sum('amount'))}}<br><span class='perso-bold'>Total purchases</span>"
        }
    },
    "BT_PurchaseAnalysis.D631-b": {
        "en": {
            "monthAvgTxt": "Avg. monthly purchases",
            "percentTxt": "Change from avg.",
            "selectedMonthSumTxt": "{{Date selectedMonth format='M'}} purchases"
        }
    },
    "BT_PurchaseAnalysis.D61": {
        "en": {
            "noteTxt": "That's right in line with your average monthly amount of {{Amount -1*transactions.filter('currencyCd',localCurrencyCd).sum('amount')/periods.size() format='###,###,###'}}.",
            "purchaseSpendingsAmountTxt": "Your purchases total {{Amount utils.abs(transactions.filter('month',dateUtils.getMonth(currentDate,-1)).filter('currencyCd',localCurrencyCd).sum('amount'))}} for the month of {{utils.monthName(dateUtils.getMonth(currentDate,-1))}}."
        }
    },
    "BT_ RecommendRDC_D12": {
        "en": {
            "RecommendRDC_UC1_BT_ RecommendRDC_D12_block_1491130885876_accountSelectorAccountText": "<span class=\"perso-bold\">1 check</span><br>{{Amount utils.abs(confirmedTransaction.amount) format='###,###,###.00'}}"
        },
        "he": {
            "RecommendRDC_UC1_BT_ RecommendRDC_D12_block_1491130885876_accountSelectorAccountText": "1 שיק : {{Amount utils.abs(confirmedTransaction.amount) format='###,###,###.00'}} "
        }
    },
    "BT_ RecommendRDC_D13": {
        "en": {
            "RecommendRDC_UC1_BT_ RecommendRDC_D13_block_1491131804369_txt": "Use your smartphone to deposit checks, and save time on trips to the ATM and your branch.<br>With the same security and protection as Online Banking, you can make check deposits whenever you want from almost anywhere just by using your phone's camera.",
            "RecommendRDC_UC1_BT_ RecommendRDC_D13_block_1491131834027_txt": "Learn more"
        },
        "he": {
            "RecommendRDC_UC1_BT_ RecommendRDC_D13_block_1491131804369_txt": "רציתי לספר לך על שירות הפקדת שיקים שקיים באפליקציית הבנק. הפקדת שיקים באפליקציה תחסוך לך לגשת לסניף או למכונה אוטומטית להפקדת שיקים.<br>כל מה שצריך לעשות זה לצלם את השיק ישירות מאפליקציית הבנק והשיק יופקד בקלות ובנוחות. ",
            "RecommendRDC_UC1_BT_ RecommendRDC_D13_block_1491131834027_txt": "לפרטים נוספים "
        }
    },
    "BT_ RecommendRDC_D11": {
        "en": {
            "TXT_D11_B1": "On {{Date confirmedTransaction.date}} a check was deposited to your account."
        },
        "he": {
            "TXT_D11_B1": "בתאריך {{Date confirmedTransaction.date format='DD/MM/yy'}} הפקדת שיק בחשבון. "
        }
    },"BT_NotifySalaryDeposit.D11": {
        "en": {
            "notifySalaryDepositTxt": "On {{Date confirmedTransaction.date}}, a paycheck of {{Amount utils.abs(confirmedTransaction.amount) format='###,###,###.00'}} was deposited into your account."
        },
        "he": {
            "notifySalaryDepositTxt": "רציתי לעדכן אותך שבתאריך {{Date confirmedTransaction.date format='DD/MM/yy'}} הופקדה משכורת לחשבונך. "
        }
    },
    "BT_NotifySalaryDeposit.D12": {
        "en": {
            "accountTmpl": "<span class=\"perso-bold\">1 Paycheck</span><br>{{Amount utils.abs(confirmedTransaction.amount) format='###,###,###.00'}}"
        },
        "he": {
            "accountTmpl": "סכום משכורת: {{Amount utils.abs(confirmedTransaction.amount) format='###,###,###.00'}} "
        }
    },
    "BT_NotifySalaryDeposit.D13": {
        "en": {
            "recentPaycheckTxt": "Recent paycheck deposits:",
            "labelAmount": "{{Amount utils.abs(amount)}}"
        },
        "he": {
            "recentPaycheckTxt": "להלן פירוט המשכורות האחרונות שהופקדו בחשבון: "
        }
    },
    "BT_PurchaseAnalysis.D651": {} ,
    "BT_SumSpendingCategory.D58": {} ,
    "BT_SumSpendingCategory.D571": {} ,
    "BT_SumSpendingCategory.D111": {} ,
    "BT_SumSpendingCategory.D111-b": {} ,
    "BT_SumSpendingCategory.D12": {} ,
    "BT_UnexpectedDeposit.D11": {} ,
    "BT_UnexpectedDeposit.D12": {} ,
    "BT_UnexpectedDeposit.D13": {}
}