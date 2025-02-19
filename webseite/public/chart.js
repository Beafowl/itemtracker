var mainChartDocument = document.getElementById("mainChart");
var secondChartDocument = document.getElementById("secondChart");

var mainChart = new Chart(mainChartDocument, {
  type: "line",
  data: {
    labels: [],
    datasets: [
      {
        label: "Vollmondkristall",
        backgroundColor: "rgba(186, 90, 242, 0.7)",
        borderColor: "rgba(151, 33, 219, 1)",
        data: []
      }
    ]
  },
  options: {
    legend: {
        align: "start",
        position: "left"
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        xAxes: [{
            type: 'time',
            time: {                                                                                                                                                                       
                tooltipFormat: 'DD.MM.YYYY HH:mm:ss',
                displayFormats: {
                    millisecond: 'HH:mm:ss.SSS',
                    second: 'HH:mm:ss',
                    minute: 'HH:mm',
                    hour: 'HH'
                }
            },
            display: true,
            scaleLabel: {
                display: true,
                labelString: 'Zeit'
            }
         }]
    }
  }
});

var secondChart = new Chart(secondChartDocument, {
    type: "bar",
    data: {
      labels: ["Lowest", "Highest", "Average"],
      datasets: [
        {
          backgroundColor: ["rgba(251, 255, 40, 0.7)", "rgba(44, 40, 255, 0.7)", "rgba(255, 44, 40, 0.7)"],
          borderColor: "rgba(151, 33, 219, 1)",
          data: []
        }
      ]
    },
    options: {
        legend: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
  });
