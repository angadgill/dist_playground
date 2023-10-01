document.addEventListener("DOMContentLoaded", function () {
    const nSlider = document.getElementById("n-slider");
    const pSlider = document.getElementById("p-slider");
    const nValue = document.getElementById("n-value");
    const pValue = document.getElementById("p-value");
    const chartContainer = document.getElementById("binomial-chart").getContext("2d");

    nSlider.addEventListener("input", updateChart);
    pSlider.addEventListener("input", updateChart);

    function updateChart() {
        const n = parseInt(nSlider.value);
        const p = parseFloat(pSlider.value);

        nValue.textContent = n;
        pValue.textContent = p;

        const data = generateBinomialDistribution(n, p);
        plotBinomialDistribution(data);
    }

    function generateBinomialDistribution(n, p) {
        const data = [];
        for (let x = 0; x <= n; x++) {
            const probability = (factorial(n) / (factorial(x) * factorial(n - x))) * (p ** x) * ((1 - p) ** (n - x));
            data.push({ x, y: probability });
        }
        return data;
    }

    function factorial(n) {
        if (n === 0 || n === 1) return 1;
        return n * factorial(n - 1);
    }

    function plotBinomialDistribution(data) {
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
                    label: 'Binomial Distribution',
                    data: values,
                    backgroundColor: 'purple',
                    borderColor: 'purple',
                    borderWidth: 1,
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
