document.addEventListener("DOMContentLoaded", function () {
    const lambdaSlider = document.getElementById("lambda-slider");
    const lambdaValue = document.getElementById("lambda-value");
    const chartContainer = document.getElementById("poisson-chart").getContext("2d");

    lambdaSlider.addEventListener("input", updateChart);

    function updateChart() {
        const lambda = parseFloat(lambdaSlider.value);

        lambdaValue.textContent = lambda;

        const data = generatePoissonDistribution(lambda);
        plotPoissonDistribution(data);
    }

    function generatePoissonDistribution(lambda) {
        const data = [];
        for (let x = 0; x <= 20; x++) {
            const probability = (Math.exp(-lambda) * (lambda ** x)) / factorial(x);
            data.push({ x, y: probability });
        }
        return data;
    }

    function factorial(n) {
        if (n === 0 || n === 1) return 1;
        return n * factorial(n - 1);
    }

    function plotPoissonDistribution(data) {
        const labels = data.map(point => point.x);
        const values = data.map(point => point.y);

        if (window.chart) {
            window.chart.destroy();
        }

        window.chart = new Chart(chartContainer, {
            type: 'bar',
            data: {
                labels,
                datasets: [{
                    label: 'Poisson Distribution',
                    data: values,
                    backgroundColor: 'purple',
                    borderColor: 'purple',
                    borderWidth: 1,
                    fill: true,
                    pointRadius: 0
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
