/*
	Theory by TEMPLATED
	templated.co @templatedco
	Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
*/

(function($) {
	// Breakpoints.
		skel.breakpoints({
			xlarge:	'(max-width: 1680px)',
			large:	'(max-width: 1280px)',
			medium:	'(max-width: 980px)',
			small:	'(max-width: 736px)',
			xsmall:	'(max-width: 480px)'
		});
	$(function() {
		var	$window = $(window),
			$body = $('body');
		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');
			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});
		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});
	// Off-Canvas Navigation.
		// Navigation Panel.
			$(
				'<div id="navPanel">' +
					$('#nav').html() +
					'<a href="#navPanel" class="close"></a>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left'
				});
		// Fix: Remove transitions on WP<10 (poor/buggy performance).
			if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
				$('#navPanel')
					.css('transition', 'none');
	});
})(jQuery);




//Search Bar
function search() {
	var input = document.getElementById("userInput").value;
	localStorage.setItem("input", input);
	window.location.href = "analysis.html";
}




/* Example Charts */
var data1 = {
    labels: [
        "Assets",
        "Liabilities",
        "Equity"
    ],
    datasets: [{
            data: [10000, 6000, 4000],
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


var ctx = document.getElementById("myChart1");
var myChart1 = new Chart(ctx, {
    type: 'doughnut',
    data: data1,
});

var ctx = document.getElementById("myChart2");
var myChart2 = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Revenue", "COGS", "Overhead", "Taxes", "Dividends", "Net Income"],
        datasets: [{
            label: 'Income Statement 2016',
            data: [32000, 15000, 7000, 4000, 2000, 4000],
            backgroundColor: [
                'rgba(255, 99, 132, 0.8',
                'rgba(54, 162, 235, 0.8)',
                'rgba(255, 206, 86, 0.8)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(153, 102, 255, 0.8)',
                'rgba(255, 159, 64, 0.8)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
    	
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});

var ctx = document.getElementById("myChart3");
var scatterChart = new Chart(ctx, {
    type: 'line',
    data: {
        datasets: [{
            label: 'Dividend Yield',
            backgroundColor: ['rgba(51, 172, 52, 0.8)'],
            data: [{
                x: 0,
                y: 2.04
            }, {
                x: 1,
                y: 2.16
            }, {
                x: 2,
                y: 2.67
            }]
        }]
    },
    options: {
        scales: {
            xAxes: [{
                type: 'linear',
                position: 'bottom'
            }]
        }
    }
});




