document.addEventListener("DOMContentLoaded", function () {
    const nSlider = document.getElementById("n-slider");
    const pSlider = document.getElementById("p-slider");
    const iterationsSlider = document.getElementById("iterations-slider");
    const binCountSlider = document.getElementById("bin-count-slider");
    const nValue = document.getElementById("n-value");
    const pValue = document.getElementById("p-value");
    const iterationsValue = document.getElementById("iterations-value");
    const binCountValue = document.getElementById("bin-count-value");

    const bootstrapChartContainer = document.getElementById("bootstrap-mean-chart").getContext("2d");
    const binomialChartContainer = document.getElementById("binomial-chart").getContext("2d");

    nSlider.addEventListener("input", updateCharts);
    pSlider.addEventListener("input", updateCharts);
    iterationsSlider.addEventListener("input", updateCharts);
    binCountSlider.addEventListener("input", updateCharts);

    function generateBinomialSample(n, p) {
        const sample = [];
        for (let i = 0; i < n; i++) {
            const result = Math.random() < p ? 1 : 0;
            sample.push(result);
        }
        return sample;
    }

    function calculateMean(data) {
        const sum = data.reduce((acc, value) => acc + value, 0);
        return sum / data.length;
    }

    function generateBootstrapMeanDistribution(n, p, iterations) {
        const means = [];
        for (let i = 0; i < iterations; i++) {
            const sample = generateBinomialSample(n, p);
            const mean = calculateMean(sample);
            means.push(mean);
        }
        return means;
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

        if (window.binomialChart) {
            window.binomialChart.destroy();
        }

        window.binomialChart = new Chart(binomialChartContainer, {
            type: 'bar',
            data: {
                labels,
                datasets: [{
                    label: 'Binomial Distribution',
                    data: values,
                    backgroundColor: 'green',
                    borderColor: 'green',
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
                        // beginAtZero: true,
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

    function plotBootstrapMeanDistribution(data, binCount) {
        if (window.bootstrapChart) {
            window.bootstrapChart.destroy();
        }

        // // Calculate the IQR (Interquartile Range) of the data
        // const sortedData = [...data].sort((a, b) => a - b);
        // const q1Index = Math.floor(sortedData.length * 0.25);
        // const q3Index = Math.floor(sortedData.length * 0.75);
        // const q1 = sortedData[q1Index];
        // const q3 = sortedData[q3Index];
        // const iqr = q3 - q1;

        // // Calculate the bin width using the Freedman-Diaconis rule
        // const binWidth = (2 * iqr) / (Math.pow(data.length, 1 / 3));

        // // Calculate the number of bins based on the bin width
        // const binCount = Math.ceil((Math.max(...data) - Math.min(...data)) / binWidth);

        // // Calculate the bin count for the histogram
        // const binCount = binCountValue.textContent;
        // console.log(binCount);
        // const binCount = 20;
        const binWidth = ((Math.max(...data) - Math.min(...data)) / binCount).toFixed(4);
        console.log(binWidth);

        // Generate histogram data
        const histogramData = new Array(binCount).fill(0);
        data.forEach(d => {
            const binIndex = Math.floor((d - Math.min(...data)) / binWidth);
            histogramData[binIndex]++;
        });
    
        // Calculate bin labels
        const binLabels = [];
        for (let i = 0; i < binCount; i++) {
            const binStart = Math.min(...data) + i * binWidth;
            const binEnd = binStart + binWidth;
            // binLabels.push(`${binStart.toFixed(2)} - ${binEnd.toFixed(2)}`);
            binLabels.push(`${binStart.toFixed(6)}`);

        }
    
        window.bootstrapChart = new Chart(bootstrapChartContainer, {
            type: 'bar',
            data: {
                labels: binLabels,
                datasets: [{
                    label: 'Bootstrap Mean Distribution',
                    data: histogramData,
                    backgroundColor: 'blue',
                    borderColor: 'blue',
                    borderWidth: 1,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: false,
                scales: {
                    x: {
                        type: 'category',
                        position: 'bottom',
                        title: {
                            display: true,
                            text: 'Mean Range'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        type: 'linear',
                        position: 'left',
                        title: {
                            display: true,
                            text: 'Frequency'
                        }
                    }
                }
            }
        });
    }

    function updateCharts() {
        const n = parseInt(nSlider.value);
        const p = parseFloat(pSlider.value);
        const iterations = parseInt(iterationsSlider.value);
        const binCount = parseInt(binCountSlider.value)

        nValue.textContent = n;
        pValue.textContent = p;
        iterationsValue.textContent = iterations;
        binCountValue.textContent = binCount;

        const bootstrapData = generateBootstrapMeanDistribution(n, p, iterations);
        const binomialData = generateBinomialDistribution(n, p);

        plotBootstrapMeanDistribution(bootstrapData, binCount);
        plotBinomialDistribution(binomialData);
    }

    // Initial chart rendering
    updateCharts();
});
