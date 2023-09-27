document.addEventListener("DOMContentLoaded", function () {
    const shapeSlider = document.getElementById("shape-slider");
    const scaleSlider = document.getElementById("scale-slider");
    const shapeValue = document.getElementById("shape-value");
    const scaleValue = document.getElementById("scale-value");
    const chartContainer = document.getElementById("gamma-chart").getContext("2d");

    shapeSlider.addEventListener("input", updateChart);
    scaleSlider.addEventListener("input", updateChart);

    function updateChart() {
        const shape = parseFloat(shapeSlider.value);
        const scale = parseFloat(scaleSlider.value);

        shapeValue.textContent = shape;
        scaleValue.textContent = scale;

        const data = generateGammaDistribution(shape, scale);
        plotGammaDistribution(data);
    }

    function generateGammaDistribution(shape, scale) {
        const data = [];
        for (let x = 0; x <= 10; x += 0.01) {
            const y = (x ** (shape - 1)) * Math.exp(-x / scale) / (scale ** shape * gamma(shape));
            data.push({ x, y });
        }
        return data;
    }

    function gamma(n) {
        if (n === 1) return 1;
        if (n === 0.5) return Math.sqrt(Math.PI);
        return (n - 1) * gamma(n - 1);
    }

    function plotGammaDistribution(data) {
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
                    label: 'Gamma Distribution',
                    data: values,
                    borderColor: 'green',
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
