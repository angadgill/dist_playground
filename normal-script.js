document.addEventListener("DOMContentLoaded", function () {
    const meanSlider = document.getElementById("mean-slider");
    const stddevSlider = document.getElementById("stddev-slider");
    const meanValue = document.getElementById("mean-value");
    const stddevValue = document.getElementById("stddev-value");
    const chartContainer = document.getElementById("normal-chart").getContext("2d");

    meanSlider.addEventListener("input", updateChart);
    stddevSlider.addEventListener("input", updateChart);

    function updateChart() {
        const mean = parseFloat(meanSlider.value);
        const stddev = parseFloat(stddevSlider.value);

        meanValue.textContent = mean;
        stddevValue.textContent = stddev;

        const data = generateNormalDistribution(mean, stddev);
        plotNormalDistribution(data);
    }

    function generateNormalDistribution(mean, stddev) {
        const data = [];
        for (let x = -5; x <= 5; x += 0.1) {
            const probability = (1 / (stddev * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mean) / stddev, 2));
            data.push({ x, y: probability });
        }
        return data;
    }

    function plotNormalDistribution(data) {
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
                    label: 'Normal Distribution',
                    data: values,
                    borderColor: 'blue',
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
