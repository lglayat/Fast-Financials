

var balanceSheet = JSON.parse(localStorage.getItem('data'));
var input = localStorage.getItem('input');
console.log(balanceSheet);
console.log(input);



	
	var url1 = "https://services.last10k.com/v1/company/";
	var url3 = "/income?formType=10-K&filingOrder=0";
	
	$.ajax({
		url: url1 + input + url3,
		beforeSend: function(xhrObj){
			// Request headers
			xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","a957da2095614930a4ba35bcc9671ca0" );
		},
		type: "GET",
		// Request body
		data: "{body}",
	})
	.done(function(incomeStatement) {
		console.log(incomeStatement);
		var COGS = incomeStatement.Data.CostOfGoodsSold;
		var salesRevNet = incomeStatement.Data.SalesRevenueNet;
		var rAndDev = incomeStatement.Data.ResearchAndDevelopmentExpense;
		var mktgExp = incomeStatement.Data.SellingAndMarketingExpense;
		var netIncome = incomeStatement.Data.NetIncomeLoss;
		var genExp = incomeStatement.Data.GeneralAndAdministrativeExpense;
		var divPerShare = incomeStatement.Data.CommonStockDividendsPerShareDeclared;
		var grossProfit = incomeStatement.Data.GrossProfit;
		var eps = incomeStatement.Data.EarningsPerShareBasic;
		
		var data = {
    		labels: ["Revenue", "COGS", "Gen Exp", "Gross Profit", "Net Income"],
   			datasets: [ {
            label: "My First dataset",
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
            data: [salesRevNet, COGS, genExp, grossProfit, netIncome ],
        	}
    		]
		};

		var ctx = document.getElementById("myChart8");
		var myBarChart = new Chart(ctx, {
   		type: 'bar',
    	data: data,
    	
		});
	})
	
//Balance Sheet Variables
		var company = balanceSheet.Company;
		var acctPay = balanceSheet.Data.AccountsPayableCurrent;
		var acctRec = balanceSheet.Data.AccountsReceivableNetCurrent;
		var currLiab = balanceSheet.Data.AccruedLiabilitiesCurrent;
		var assets = balanceSheet.Data.Assets;
		var currAss = balanceSheet.Data.AssetsCurrent;
		var cashAndEquiv = balanceSheet.Data.CashAndCashEquivalentsAtCarryingValue;
		var APIC = balanceSheet.Data.CommonStocksIncludingAdditionalPaidInCapital;
		var propPlantEquip = balanceSheet.Data.PropertyPlantAndEquipmentNet;
		var retEarn = balanceSheet.Data.RetainedEarningsAccumulatedDeficit;
		var equity = balanceSheet.Data.StockholdersEquity;
		var ltDebtCurr = balanceSheet.Data.LongTermDebtCurrent;
		var ltDebtNonCurr = balanceSheet.Data.LongTermDebtNoncurrent;
		var liab = balanceSheet.Data.Liabilities;

		


		
		var data1 = {
    		labels: [
       			 "Assets",
        		 "Liabilities",
       			 "Equity"  ],
    		datasets: [
        	{
            data: [assets, liab, equity],
            backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
            ],
            hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
            ]
        }]
		};
		
		var ctx = document.getElementById("myChart7");
		var myChart7 = new Chart(ctx, {
  		type: 'doughnut',
    	data: data1,
		});
		
		
		
		


