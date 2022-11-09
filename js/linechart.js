// Graph CSV Data using chartjs
// Parse the CSV data into the necessary arrays


async function getData() {
    const response = await fetch('../data/Researchcsv.csv')
    const data = await response.text() // CSV in TEXT format
    const table = data.split('\n').slice(1)
    const xTrial = []
    const yWithout = []
    const yWith = []
    table.forEach(row => {
        const columns = row.split(',')
        const trial = columns[0]
        xTrial.push(trial)
        const without = parseFloat(columns[1])
        yWithout.push(without)
        const withDev = parseFloat(columns[2])
        yWith.push(withDev)
    })
    return { xTrial, yWithout, yWith}
}

async function createChart() {
    const data = await getData();
    // Configured for chart.JS 3.x and above

    const ctx = document.getElementById('myChart');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.xTrial,
            datasets: [{
                label: 'Bottle Opening Times With Device in Seconds',
                data: data.yWithout,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }, {
                label: 'Bottle Opening Times Without Device in Seconds',
                data: data.yWith,
                backgroundColor: 'rgba(9,102,255, 0.2)',
                borderColor: 'rgba(0,102,255, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,                   // Re-size based on screen size
            scales: {                           // x & y axes display options
                x: {
                    title: {
                        display: true,
                        text: 'Trial #',
                        font: {
                            size: 20
                        },
                    },
                    ticks: {
                        callback: function(val, index){
                            return index % 4 === 0 ? this.getLabelForValue(val) :  '' ;   
                        }
                    }
                },
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'Bottle Opening Time in Seconds',
                        font: {
                            size: 20
                        },
                    },
                    ticks: {
                        maxTicksLimit: data.yWithout.length/10,
                        font:{
                            size:10
                        }
                    }
                }
            },
            plugins: {                          // title and legend display options
                title: {
                    display: true,
                    text: 'Water Bottle Opening Times With and Without Device',
                    font: {
                        size: 24
                    },
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                },
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

createChart();