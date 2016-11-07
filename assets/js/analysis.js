//Get Stock Ticker from Local Storage
var input = localStorage.getItem('input');




angular.module('myApp', [])
	.controller('dummy', ['$scope', '$sce', function ($scope, $sce) {

	$scope.url = $sce.trustAsResourceUrl('http://platform.last10k.com/filings/annotationchart?ticker=' + input);
	
	$scope.url2 = $sce.trustAsResourceUrl('http://platform.last10k.com/filings?ticker=' + input);
	
	
	
}]);	





src="http://platform.last10k.com/filings/annotationchart?ticker="

	var url1 = "https://services.last10k.com/v1/company/";
	var url2 = "/balancesheet?formType=10-K&filingOrder=0";
	var url3 = "/income?formType=10-K&filingOrder=0";
	var url4 = "/cashflows?formType=10-K&filingOrder=0";
	
	//AJAX request for Stock Quote
	$.ajax({
		url: url1 + input + "/quote",
		beforeSend: function(xhrObj){
			// Request headers
			xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","b6bad9006c254c91bec10dc0cfc5ed99" );
		},
		type: "GET",
		// Request body
		data: "{body}",
	})
	.done(function(quote) {
	
		console.log(quote);	
		//Cash Flow Statement Variables
		
		var compName = quote.Name;
		var mktCap = quote.MarketCapitalization;
		var ebitda = quote.Ebitda;
		var price = quote.LastTradePrice;
		var peRatio = quote.PeRatio;
		var volume = quote.Volume;
		document.getElementById('para').innerHTML = compName;
		document.getElementById('price').innerHTML = price;
	})
	
	
	//AJAX request for Balance Sheet Info
	$.ajax({
		url: url1 + input + url2,
		beforeSend: function(xhrObj){
			// Request headers
			xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","a957da2095614930a4ba35bcc9671ca0" );
		},
		type: "GET",
		// Request body
		data: "{body}",
	})
	.done(function(balanceSheet) {
	
		console.log(balanceSheet);	
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
	})




	
	//AJAX request for Income Statement Info
	$.ajax({
		url: url1 + input + url3,
		beforeSend: function(xhrObj){
			// Request headers
			xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","3a5e758def25400b86cef81739db211d" );
		},
		type: "GET",
		// Request body
		data: "{body}",
	})
	.done(function(incomeStatement) {
	
		console.log(incomeStatement);	
		//Income Statement Variables
		var COGS = incomeStatement.Data.CostOfGoodsSold;
		var salesRevNet = incomeStatement.Data.Revenues;
		var rAndDev = incomeStatement.Data.ResearchAndDevelopmentExpense;
		var mktgExp = incomeStatement.Data.SellingAndMarketingExpense;
		var netIncome = incomeStatement.Data.NetIncomeLoss;
		var genExp = incomeStatement.Data.GeneralAndAdministrativeExpense;
		var divPerShare = incomeStatement.Data.CommonStockDividendsPerShareDeclared;
		var grossProfit = incomeStatement.Data.GrossProfit;
		var eps = incomeStatement.Data.EarningsPerShareBasic;
		
		
		
		var data = {
    	labels: ["Revenue", "COGS", "Gross Profit", "Net Income"],
    	datasets: [
        {
            label: "Income Statement",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [salesRevNet, COGS, grossProfit, netIncome],
            spanGaps: false,
        }
    ]
};
		
		var ctx = document.getElementById("myChart8");
		var myLineChart = new Chart(ctx, {
   			type: 'line',
    		data: data,
		});

	})




	/////////////////////////////////////////////
	//AJAX request for Statement of Cash Flows //
	/////////////////////////////////////////////
	
	$.ajax({
		url: url1 + input + url4,
		beforeSend: function(xhrObj){
			// Request headers
			xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","549ae5069295445fb1b6b4ca55465a60" );
		},
		type: "GET",
		// Request body
		data: "{body}",
	})
	.done(function(stmtCashFlows) {
	
		console.log(stmtCashFlows);	
		//Cash Flow Statement Variables
		
		var operating = stmtCashFlows.Data.NetCashProvidedByUsedInOperatingActivitiesContinuingOperations;
		var financing = stmtCashFlows.Data.NetCashProvidedByUsedInFinancingActivitiesContinuingOperations;
		var investing = stmtCashFlows.Data.NetCashProvidedByUsedInInvestingActivitiesContinuingOperations;
		
		var data = {
    		labels: ["Operating", "Financing", "Investing"],
   			datasets: [ {
            label: "Statement of Cash Flows",
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
            data: [operating, financing, investing],
        	}
    		]
		};

		var ctx = document.getElementById("myChart9");
		var myBarChart = new Chart(ctx, {
   		type: 'bar',
    	data: data,
		});
	})
