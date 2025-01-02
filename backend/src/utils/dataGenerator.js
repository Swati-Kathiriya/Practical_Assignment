const generateHistoricalData = (hours) => {
  try {
    const data = [];
    const now = Date.now();

    // Generate data points for each hour in the specified range
    for (let i = hours; i >= 0; i--) {
      data.push({
        timestamp: new Date(now - i * 60 * 60 * 1000), // Subtract hours to generate past timestamps
        temperature: (Math.random() * 30 + 10).toFixed(1), // Random temperature between 10 and 40
        humidity: (Math.random() * 50 + 30).toFixed(1), // Random humidity between 30 and 80
      });
    }

    return data;
  } catch (error) {
    console.error("Error generating historical data:", error);
    return [];
  }
};

module.exports = { generateHistoricalData };
