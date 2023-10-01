document.addEventListener("DOMContentLoaded", function () {
    const rSlider = document.getElementById("r-slider");
    const pSlider = document.getElementById("p-slider");
    const rValue = document.getElementById("r-value");
    const pValue = document.getElementById("p-value");
    const chartContainer = document.getElementById("negative-binomial-chart").getContext("2d");

    rSlider.addEventListener("input", updateChart);
    pSlider.addEventListener("input", updateChart);

    function updateChart() {
        const r = parseFloat(rSlider.value);
        const p = parseFloat(pSlider.value);

        rValue.textContent = r;
        pValue.textContent = p;

        const data = generateNegativeBinomialDistribution(r, p);
        plotNegativeBinomialDistribution(data);
    }

    function generateNegativeBinomialDistribution(r, p) {
        const data = [];
        for (let x = 0; x <= 20; x++) {
            const probability = (factorial(x + r - 1) / (factorial(x) * factorial(r - 1))) * (p ** r) * ((1 - p) ** x);
            data.push({ x, y: probability });
        }
        return data;
    }

    function factorial(n) {
        if (n === 0 || n === 1) return 1;
        return n * factorial(n - 1);
    }

    function plotNegativeBinomialDistribution(data) {
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
                    label: 'Negative Binomial Distribution',
                    data: values,
                    backgroundColor: 'orange',
                    borderColor: 'orange',
                    borderWidth: 1
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
