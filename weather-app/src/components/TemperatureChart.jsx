import '../styles/TemperatureChart.css'
import React, { useState, useEffect } from 'react';
import { XYPlot, LineSeries, XAxis, YAxis, Hint } from 'react-vis';


const TemperatureChart = ({ chartData }) => {
  const [hoveredValue, setHoveredValue] = useState(null);

  useEffect(() => {
    if (chartData && chartData.length > 0) {
      // Opcionalmente, podrías realizar alguna transformación a los datos aquí si es necesario
    }
  }, [chartData]);

  return (
    <div className="chart-container">
      <h3>Temperatura a lo largo del día</h3>
      <XYPlot width={600} height={400} className="vis-plot">
        <LineSeries
          data={chartData}
          onNearestX={(value) => setHoveredValue(value)}
        />
        <XAxis />
        <YAxis />
        {hoveredValue && (
          <Hint value={hoveredValue}>
            <div className="hint-content">
              <p><strong>Hora:</strong> {hoveredValue.x}</p>
              <p><strong>Temperatura:</strong> {hoveredValue.y}°C</p>
            </div>
          </Hint>
        )}
      </XYPlot>
    </div>
  );
};

export default TemperatureChart;



