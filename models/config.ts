export default{
    "BT_TestCategorySpendingIQ.D11": {
        "en": {
            "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ.D11_block_1490027517883_txt": "{{Amount from format='###,###,###'}} - {{Amount to format='###,###,###'}}",
            "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ.D11_block_1490027334172_txt": "How much do you usually spend on <b>{{categoryGroup.description}}</b> from account {{confirmedAccount.accountNumber}} each month? {{Emoji 1F914}}"
        }
    },
    "TeaserDialog": {
        "en": {
            "teaserText": "Can you guess how much you usually spend on {{confirmedTransaction.category}} each month?",
            "date": "{{currentDate}}",
            "titleTextBox": "Quiz time 🤔"
        }
    },
    "title": {
        "en": {
            "txt": "Insights"
        }
    },
    "BT_TestCategorySpendingIQ.D13": {
        "en": {
            "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ.D13_block_1490028287513_label": "{{Amount utils.abs(amount)}}",
            "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ.D13_block_1490028079328_txt": "{{categoryGroup.description}} spending by month"
        }
    },
    "BT_TestCategorySpendingIQ.D122": {
        "en": {
            "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ.D122_block_1490027901006_txt": "Your average monthly spending on {{categoryGroup.description}} is actually {{Amount (transactions.sum('amount')-transactions.filter('month',periods.first('month')).sum('amount'))/(periods.size()-1) format='+###,###,###'}}.",
            "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ.D122_block_1490199163910_txt": "You’re a little off…"
        }
    },
    "BT_TestCategorySpendingIQ.D121": {
        "en": {
            "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ.D121_block_1490199194443_txt": "You got it! {{Emoji 1F389}} {{Emoji 1F389}} {{Emoji 1F389}}",
            "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ.121_block_1490027730358_txt": "Your average monthly spending on {{categoryGroup.description}} is {{Amount (transactions.sum('amount')-transactions.filter('month',periods.first('month')).sum('amount'))/(periods.size()-1) format='+###,###,###'}}."
        }
    },
    "BT_TestCategorySpendingIQ.D14": {
        "en": {
            "TestCategorySpendingIQ_UC1_BT_TestCategorySpendingIQ.D14_block_1490084831712_txt": "Details of {{categoryGroup.description}} spending in {{Date selectedMonth format='m'}}"
        },
    "EOMCashFlowAnalysis_D33-b": {
        "en": {
            "txtBoxLal2": "Average out",
            "txtBoxLal1": "Average in"
        },
        "fr": {
            "txtBoxLal2": "Sorties<br>moyennes",
            "txtBoxLal1": "Rentrées<br>moyennes"
        }
    },
    "EOMCashFlowAnalysis_D31": {
        "en": {
            "D31_Text": "Review {{Date lastMonthDate format='m'}} activity summary."
        },
        "fr": {
            "D31_Text": "Passez en revue le sommaire des activités pour {{Date lastMonthDate format='m'}}."
        }
    },
    "TeaserDialog": {
        "en": {
            "date": "{{currentDate}}",
            "teaserText": "Let's play it back: time to review your {{Date lastMonthDate format='m'}} account activity.",
            "inflows": "Inflows",
            "titleTextBox": "In Review",
            "alt": "Lampon image",
            "url": "images/lampon"
        },
        "fr": {
            "date": "{{currentDate}}",
            "teaserText": "Voyons voir : c'est le moment de revoir les activités de votre compte pour {{Date lastMonthDate format='m'}}.",
            "inflows": "Entrées",
            "titleTextBox": "Aperçu",
            "alt": "Lampon image",
            "url": "images/lampon"
        }
    },
    "title": {
        "en": {
            "txt": "In Review"
        },
        "fr": {
            "txt": "Aperçu"
        }
    },
    "EOMCashFlowAnalysis_D34": {
        "en": {
            "centerText": "Total<br>{{Amount cashFlowTransactions.filter('account',selectedAccount.id).filter('month',selectedMonth).filter('mode',selectedTab.id).sum('amount') format='###,###,###.00'}}",
            "D34_B1_Text": "Narrow down your account summary by type during {{Date selectedMonth format='m'}}:",
            "chartLabel": "{{Amount amount format='###,###,###.00'}}"
        },
        "fr": {
            "centerText": "Total<br>{{Amount cashFlowTransactions.filter('account',selectedAccount.id).filter('month',selectedMonth).filter('mode',selectedTab.id).sum('amount') format='###,###,###.00'}}",
            "D34_B1_Text": "Précisez le sommaire de compte par type pour {{Date selectedMonth format='m'}} :",
            "chartLabel": "{{Amount amount format='###,###,###.00'}}"
        }
    },
    "BT_EOMCashFlowAnalysis.D111": {
        "en": {
            "inText": "Inflows",
            "inId": "In",
            "outId": "Out",
            "outText": "Outflows"
        },
        "fr": {
            "inText": "Entrées",
            "inId": "In",
            "outId": "Out",
            "outText": "Sorties"
        }
    },
    "accountSelector": {
        "en": {
            "accountTxt": "<span class=\"perso-bold\">In:</span> {{Amount utils.abs(cashFlowTransactions.filter('month',utils.formatDate(lastMonthDate,'mm')).filter('mode','In').filter('account',id).sum('amount')) format='###,###,###.00'}}<br><span class=\"perso-bold\">Out:</span> {{Amount utils.abs(cashFlowTransactions.filter('month',utils.formatDate(lastMonthDate,'mm')).filter('mode','Out').filter('account',id).sum('amount')) format='###,###,###.00'}}"
        },
        "fr": {
            "accountTxt": "<span class=\"perso-bold\">Entrées :</span> {{Amount utils.abs(cashFlowTransactions.filter('month',utils.formatDate(lastMonthDate,'mm')).filter('mode','In').filter('account',id).sum('amount')) format='###,###,###.00'}}<br><span class=\"perso-bold\">Sorties :</span> {{Amount utils.abs(cashFlowTransactions.filter('month',utils.formatDate(lastMonthDate,'mm')).filter('mode','Out').filter('account',id).sum('amount')) format='###,###,###.00'}}"
        }
    },
    "EOMCashFlowAnalysis_D35": {
        "en": {
            "EOMCashFlowAnalysis_UC3_EOMCashFlowAnalysis_D35_block_1488121952092_txt": "See {{Date selectedMonth format='m'}}'s {{selectedBizClass}}:"
        },
        "fr": {
            "EOMCashFlowAnalysis_UC3_EOMCashFlowAnalysis_D35_block_1488121952092_txt": "Jetez un coup d'œil aux {{selectedBizClass}} pour {{Date selectedMonth format='m'}} :"
        }
    },
    "EOMCashFlowAnalysis_D33": {
        "en": {
            "chartLabel": "{{Amount amount format='###,###,###.00'}}",
            "D33_B1_Text": "Here’s your overall account activity:"
        },
        "fr": {
            "chartLabel": "{{Amount amount format='###,###,###.00'}}",
            "D33_B1_Text": "Voici les activités globales de votre compte :"
        }
    }
},
    "storyId": "DuplicateTransactionCharge_UC9",
    "BT_DuplicateTransactionCharge_D94": {
        "en": {
            "DuplicateTransactionCharge_UC9_BT_DuplicateTransactionCharge_D94_block_1488727324976_txt": "If you think that the charge is wrong, please contact the merchant and ask for clarification, or you can contact us at 888-1231234."
        },
        "he": {
            "DuplicateTransactionCharge_UC9_BT_DuplicateTransactionCharge_D94_block_1488727324976_txt": "במידה והחיוב אינו נכון, מומלץ לבצע בירור מול בית העסק או ליצור קשר עם חברת האשראי "
        }
    },
    "BT_DuplicateTransactionCharge_D92": {
        "en": {
            "DuplicateTransactionCharge_UC9_BT_DuplicateTransactionCharge_D92_block_1488726659304_accountSelectorAllAccountsText": "<span class=\"perso-bold\">{{count}}  similar charge(s)</span><br>{{Amount confirmedTransaction.amount format='###,###,###.00'}}",
            "DuplicateTransactionCharge_UC9_BT_DuplicateTransactionCharge_D92_block_1488726659304_accountSelectorAccountText": "<span class=\"perso-bold\">{{transactions.filter('account',id).groupBy('id').size()}} charge(s)</span><br>{{Amount confirmedTransaction.amount format='###,###,###.00'}}"
        },
        "he": {
            "DuplicateTransactionCharge_UC9_BT_DuplicateTransactionCharge_D92_block_1488726659304_accountSelectorAllAccountsText": "<span class=\"perso-bold\">{{count}} חיוב/ים זהים </span><br>{{Amount confirmedTransaction.amount format='###,###,###.00'}} כל חיוב ",
            "DuplicateTransactionCharge_UC9_BT_DuplicateTransactionCharge_D92_block_1488726659304_accountSelectorAccountText": "{{transactions.filter('account',id).groupBy('id').size()}} חיוב/ים זהים כל חיוב {{Amount confirmedTransaction.amount format='###,###,###.00'}}"
        }
    },
    "BT_DuplicateTransactionCharge_D93": {
        "en": {
            "DuplicateTransactionCharge_UC9_BT_DuplicateTransactionCharge_D93_block_1488727176895_txt": "Details of similar charges:"
        },
        "he": {
            "DuplicateTransactionCharge_UC9_BT_DuplicateTransactionCharge_D93_block_1488727176895_txt": "פרטי החיובים הזהים: "
        }
    },

    "BT_ DuplicateTransactionCharge_D91": {
        "en": {
            "TXT_D11_B1": "You have {{count}} similar charges from {{confirmedTransaction.device}} on {{Date confirmedTransaction.date}}."
        },
        "he": {
            "TXT_D11_B1": "לתשומת ליבך, בתאריך {{Date confirmedTransaction.date format='DD/MM/yy'}} בוצעו {{count}} חיובים זהים בכרטיסי האשראי בחשבון. "
        }
    }
};
