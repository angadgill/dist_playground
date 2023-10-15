document.addEventListener("DOMContentLoaded", function () {
    const dfSlider = document.getElementById("df-slider");
    const dfValue = document.getElementById("df-value");
    const chartContainer = document.getElementById("chi-square-chart").getContext("2d");

    dfSlider.addEventListener("input", updateChart);

    function updateChart() {
        const df = parseInt(dfSlider.value);

        dfValue.textContent = df;

        const data = generateChiSquareDistribution(df);
        plotChiSquareDistribution(data);
    }

    function generateChiSquareDistribution(df) {
        const data = [];
        for (let x = 0; x <= 20; x += 0.01) {
            const probability = (Math.pow(x, (df / 2 - 1)) * Math.exp(-x / 2)) / (Math.pow(2, df / 2) * gamma(df / 2));
            data.push({ x, y: probability });
        }
        return data;
    }

    function gamma(n) {
        if (n === 1) return 1;
        if (n === 0.5) return Math.sqrt(Math.PI);
        return (n - 1) * gamma(n - 1);
    }

    function plotChiSquareDistribution(data) {
        const labels = data.map(point => point.x);
        const values = data.map(point => point.y);

        if (window.chart) {
            window.chart.destroy();
        }

        window.chart = new Chart(chartContainer, {
            type: 'line',
            data: {
                labels,
                datasets: [{
                    label: 'Chi-Square Distribution',
                    data: values,
                    borderColor: 'red',
                    borderWidth: 2,
                    fill: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: false,
                scales: {
                    x: {
                        type: 'linear',
                        position: 'bottom',
                        title: {
                            display: true,
                            text: 'X'
                        }
                    },
                    y: {
                        type: 'linear',
                        position: 'left',
                        title: {
                            display: true,
                            text: 'Probability'
                        }
                    }
                }
            }
        });
    }

    // Initial chart rendering
    updateChart();
});
