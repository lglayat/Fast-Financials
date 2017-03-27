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
	
	
	var url1 = "http://edgaronline.api.mashery.com/v2/corefinancials/ann?primarysymbols=" + input + "&appkey=ngrfwrjwnw8aevvaxmb4dmcv";
	
	$.ajax({
		url: url1,
		type: "GET",
		// Request body
	})
	.done(function(quote1) {
		console.log(quote1);
		
	
		//Store the 2016 data I need in resultsArray[]
		var resultsArray = 	quote1.result.rows[0];	
		
		//These are for storing historical Income
		var resultsArray2 = quote1.result.rows[1];
		var myArray2 = ["netincome"];
		var resultsArray3 = quote1.result.rows[2];
		var myArray3 = ["netincome"];
		var resultsArray4 = quote1.result.rows[3];
		var myArray4 = ["netincome"];

		
		
		
		//Array which holds names of data I need
		var myArray = ["companyname","primaryexchange" ,"fiscalyear" ,"capitalexpenditures","cashfromfinancingactivities","cashfrominvestingactivities","cashfromoperatingactivities", "ebit","costofrevenue","grossprofit","incomebeforetaxes","netincome","researchdevelopmentexpense","totalrevenue","sellinggeneraladministrativeexpenses","commonstock","cashandcashequivalents","cashcashequivalentsandshortterminvestments","goodwill","intangibleassets","inventoriesnet","otherassets","othercurrentassets","othercurrentliabilities","otherliabilities","propertyplantequipmentnet", "retainedearnings","totalassets","totalcurrentassets","totalcurrentliabilities","totalliabilities","totallongtermdebt","totalreceivablesnet","totalshorttermdebt" ,  "totalstockholdersequity"];
					
		//Iterate through resultsArray, replacing the desired values names with values 
		for(var i = 0; i < resultsArray.values.length ; i++) {
    		var index = myArray.indexOf(resultsArray.values[i].field);
     		if(index != -1){
     			myArray[index] = resultsArray.values[i].value;
     		}
    	 }
    	 
    	 console.log(myArray);
    	 //These for loops are only for getting the "net income" value for the historical income chart
    	 for(var i = 0; i < resultsArray2.values.length ; i++) {
    		var index = myArray2.indexOf(resultsArray2.values[i].field);
     		if(index != -1){
     			myArray2[index] = resultsArray2.values[i].value;
     		}
    	 }
    	 for(var i = 0; i < resultsArray3.values.length ; i++) {
    		var index = myArray3.indexOf(resultsArray3.values[i].field);
     		if(index != -1){
     			myArray3[index] = resultsArray3.values[i].value;
     		}
    	 }
    	 for(var i = 0; i < resultsArray4.values.length ; i++) {
    		var index = myArray4.indexOf(resultsArray4.values[i].field);
     		if(index != -1){
     			myArray4[index] = resultsArray4.values[i].value;
     		}
    	 }
    	 
    	
	
		//    GENERAL INFO    //
		var companyName = myArray[0];
		var primaryExchange = myArray[1];
		var fiscalYear = myArray[2];
	
		
		// BALANCE SHEET DATA //
		var totalAssets = myArray[27];
		var totalCurrentAssets = myArray[28];
		var inventory = myArray[20];
		var goodwill = myArray[18];
		var intangibleAssets = myArray[19];
		var cash = myArray[16];
		var shortTermInv = myArray[17];
		var otherAssets = myArray[21];
		var propertyEquip = myArray[25];
		/*-------------------------------------------------------------*/
		var totalLiabilities = myArray[30];
		var totalLTDebt = myArray[31];
		var totalCurrentLiabilities = myArray[29];
		/*-------------------------------------------------------------*/
		var totalReceivablesNet = myArray[32];
		var totalStockholdersEquity = myArray[34];

		// INCOME STATEMENT DATA //
		var totalRevenue = myArray[13];
		var cogs = myArray[8];
		var ebit = myArray[7];
		var grossProfit = myArray[9];
		var incomeBeforeTaxes = myArray[10];
		var netIncome = myArray[11];
		/*---------------------------------------------------------*/
		var capEx = myArray[3];
		var rAndD = myArray[12];
		var sellingAndAdminExp = myArray[14];
		
		//   CASH FLOW DATA    //
		var financing = myArray[4];
		var investing = myArray[5];
		var operating = myArray[6];

 		//  HISTORICAL DATA //
 		var income15 = myArray2[0];
 		var income14 = myArray3[0];
 		var income13 = myArray4[0];


  

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
    		labels: ["Cap Ex", "Research and Dev.", "Selling & Admin"],
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
	
	
	
	
	
	
	
	
	
	
