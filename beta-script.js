document.addEventListener("DOMContentLoaded", function () {
    const alphaSlider = document.getElementById("alpha-slider");
    const betaSlider = document.getElementById("beta-slider");
    const alphaValue = document.getElementById("alpha-value");
    const betaValue = document.getElementById("beta-value");
    const chartContainer = document.getElementById("beta-chart").getContext("2d");

    alphaSlider.addEventListener("input", updateChart);
    betaSlider.addEventListener("input", updateChart);

    function updateChart() {
        const alpha = parseFloat(alphaSlider.value);
        const beta = parseFloat(betaSlider.value);

        alphaValue.textContent = alpha;
        betaValue.textContent = beta;

        const data = generateBetaDistribution(alpha, beta);
        plotBetaDistribution(data);
    }

    function generateBetaDistribution(alpha, beta) {
        const data = [];
        for (let x = 0; x <= 1; x += 0.01) {
            const y = (x ** (alpha - 1)) * ((1 - x) ** (beta - 1));
            data.push({ x, y });
        }
        return data;
    }

    function plotBetaDistribution(data) {
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
                    label: 'Beta Distribution',
                    data: values,
                    borderColor: 'blue',
                    borderWidth: 2,
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
                            text: 'Y'
                        }
                    }
                }
            }
        });
    }

    // Initial chart rendering
    updateChart();
});
