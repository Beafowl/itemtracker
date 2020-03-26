var chartDocument = document.getElementById('chart')

var chart = new Chart(chartDocument, {

    type: 'line',
    data: {
        labels: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"],
        datasets: [{
            label: "Vollmondkristall",
            backgroundColor: 'rgba(186, 90, 242, 0.7)',
            borderColor: 'rgba(151, 33, 219, 1)',
			steppedLine: true
        }]
    }
});