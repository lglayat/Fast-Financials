//Get Stock Ticker from Local Storage
var input = localStorage.getItem('input');





//Setting up URL for Widgets
angular.module('myApp', [])
	.controller('dummy', ['$scope', '$sce', function ($scope, $sce) {

	$scope.url = $sce.trustAsResourceUrl('http://platform.last10k.com/filings/annotationchart?ticker=' + input);
	$scope.url2 = $sce.trustAsResourceUrl('http://platform.last10k.com/filings?ticker=' + input);
	$scope.url3 = $sce.trustAsResourceUrl('http://edgaronline.api.mashery.com/v2/corefinancials/ann?primarysymbols=' + input + '&appkey=du46n6pcze7x7a5jamvb9kyj')
}]);	








	/////////////////////////////////////////////
	//		AJAX request for Stock Quote data   //
	/////////////////////////////////////////////
	

	//AJAX request for Stock Quote
	$.ajax({
		url: "https://services.last10k.com/v1/company/"+ input + "/quote",
		beforeSend: function(xhrObj){
			// Request headers
			xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","b6bad9006c254c91bec10dc0cfc5ed99" );
		},
		type: "GET",
		// Request body
		data: "{body}",
	})
	.done(function(quote) {
		//Table Data   
		console.log(quote);	
		var price = quote.LastTradePrice;
		var high = quote.DailyHigh;
		var low = quote.DailyLow;
		var close = quote.LastTradePrice;
		var bookValue = quote.BookValue;
		var eps = quote.EarningsShare;
		var peRatio = quote.PeRatio;
		var pegRatio = quote.PegRatio;
		var volume = quote.Volume;
		var mktCap = quote.MarketCapitalization;

		//Populate Table
		document.getElementById('high').innerHTML = high;
		document.getElementById('low').innerHTML = low;
		document.getElementById('close').innerHTML = close;
		document.getElementById('volume').innerHTML = volume;
		document.getElementById('eps').innerHTML = eps;
		document.getElementById('peRatio').innerHTML = peRatio;
		document.getElementById('pegRatio').innerHTML = pegRatio;
		document.getElementById('bookValue').innerHTML = bookValue;
		document.getElementById('price').innerHTML = price;
	})  
	
	
	
	
	
	
	
	
	
	/////////////////////////////////////////////
	//		AJAX request for EDGAR data		   //
	/////////////////////////////////////////////
	
	
	var url1 = "http://edgaronline.api.mashery.com/v2/corefinancials/ann?primarysymbols=" + input + "&appkey=du46n6pcze7x7a5jamvb9kyj";
	
	$.ajax({
		url: url1,
		type: "GET",
		// Request body

	})
	.done(function(quote1) {
		console.log(quote1);
		
		
		//    GENERAL INFO    //
		var companyName = quote1.result.rows[0].values[1].value;
		var primaryExchange = quote1.result.rows[0].values[3].value;
		var fiscalYear = quote1.result.rows[0].values[18].value;
	
		
		// BALANCE SHEET DATA //
		var totalAssets =quote1.result.rows[0].values[58].value;
		var totalCurrentAssets = quote1.result.rows[0].values[59].value;
		var inventory = quote1.result.rows[0].values[52].value;
		var goodwill = quote1.result.rows[0].values[50].value;
		var intangibleAssets = quote1.result.rows[0].values[51].value;
		var cash = quote1.result.rows[0].values[48].value;
		var shortTermInv = quote1.result.rows[0].values[49].value;
		var otherAssets = quote1.result.rows[0].values[53].value;
		var propertyEquip = quote1.result.rows[0].values[56].value;
		/*-------------------------------------------------------------*/
		var totalLiabilities = quote1.result.rows[0].values[61].value;
		var totalLTDebt = quote1.result.rows[0].values[62].value;
		var totalCurrentLiabilities = quote1.result.rows[0].values[60].value;
		/*-------------------------------------------------------------*/
		var totalReceivablesNet = quote1.result.rows[0].values[63].value;
		var totalStockholdersEquity = quote1.result.rows[0].values[65].value;

		
		// INCOME STATEMENT DATA //
		var totalRevenue = quote1.result.rows[0].values[45].value;
		var cogs = quote1.result.rows[0].values[39].value;
		var ebit = quote1.result.rows[0].values[38].value;
		var grossProfit = quote1.result.rows[0].values[40].value;
		var incomeBeforeTaxes = quote1.result.rows[0].values[41].value;
		var netIncome = quote1.result.rows[0].values[42].value;	
		/*---------------------------------------------------------*/
		var capEx = quote1.result.rows[0].values[29].value;
		var rAndD = quote1.result.rows[0].values[44].value;
		var sellingAndAdminExp = quote1.result.rows[0].values[46].value;
		
		
		//   CASH FLOW DATA    //
		var financing = quote1.result.rows[0].values[30].value;
		var investing = quote1.result.rows[0].values[31].value;
		var operating = quote1.result.rows[0].values[32].value;


		// HISTORICAL DATA //
		var income15 = quote1.result.rows[1].values[42].value;
		var income14 = quote1.result.rows[2].values[42].value;
		var income13 =quote1.result.rows[3].values[42].value;

		//     HEADER DATA     //
		document.getElementById('para').innerHTML = companyName + " ";


		//    CHART DATA     //

		//INCOME STATEMENT CHART
		var data = {
			labels: ["Revenue", "COGS", "Gross Profit", "EBIT", "Net Income"],
    		datasets: [{
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
            	data: [totalRevenue, cogs, grossProfit, ebit, netIncome],
            	spanGaps: false,
        	}]
		};
		var ctx = document.getElementById("myChart8");
		var myLineChart = new Chart(ctx, {
   			type: 'line',
    		data: data,
		});



		//CASH FLOW CHART
		var data2 = {
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
		var ctx2 = document.getElementById("myChart9");
		var myBarChart = new Chart(ctx2, {
   		type: 'bar',
    	data: data2,
		});
		
		//Balance Sheet Chart
		var data3 = {
    		labels: ["Assets", "Liabilities", "Equity"  ],
    		datasets: [{
            	data: [totalAssets, totalLiabilities, totalStockholdersEquity],
            	backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            	hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"] }]
		};
		var ctx = document.getElementById("myChart7");
		var myChart7 = new Chart(ctx, {
  		type: 'doughnut',
    	data: data3,
		});
		
		//Assets Breakdown
		var data4 = {
    		labels: ["Inventory", "Cash & Equivalent", "Short-Term Inv.", "Goodwill", "Intangible Assets", "Other", "PropPlant&Equip" ],
    		datasets: [{
            	data: [inventory, cash, shortTermInv, goodwill, intangibleAssets, otherAssets, propertyEquip],
            	backgroundColor: ["#FF6384", "#36A2EB", "#9fc323", "#450c59","#b46906","#97b4a6","#f06967"],
            	hoverBackgroundColor: ["#FF6384", "#36A2EB", "#9fc323","#450c59", "#b46906", "#97b4a6","#f06967"] }]
		};
		var ctx = document.getElementById("myChart10");
		var myChart10 = new Chart(ctx, {
  		type: 'doughnut',
    	data: data4,
		});
		
		// Income Breakdown
		var data5 = {
			labels: ["2016", "2015", "2014", "2013"],
    		datasets: [{
            	label: "Historical Income",
            	fill: false,
           		lineTension: 0.1,
            	backgroundColor: "#41db64",
            	borderColor: "#41db64",
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
            	data: [netIncome, income15, income14 , income13],
            	spanGaps: false,
        	}]
		};
		var ctx = document.getElementById("myChart11");
		var myLineChart11 = new Chart(ctx, {
   			type: 'line',
    		data: data5,
		});
		
		//Expense Breakdown
		var data6 = {
    		labels: ["Capital Expenditures", "Research and Dev.", "Selling & Admin"],
   			datasets: [ {
            label: "Expense Breakdown",
            backgroundColor: [
                '#a0a5ff',
                '#507055',
                '#f28008',
              
               
            ],
            borderColor: [
                '#a0a5ff',
                '#507055',
                '#f28008'
            ],
            borderWidth: 1,
            data: [capEx, rAndD, sellingAndAdminExp],
        	}
    		]
		};
		var ctx2 = document.getElementById("myChart12");
		var myBarChart = new Chart(ctx2, {
   		type: 'bar',
    	data: data6,
		});
		
	});
	
	
	
	
	
	
	
	
	
	
