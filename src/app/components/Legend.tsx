interface LegendProps {
  thresholds: number[];
  colors: string[];
}

export default function Legend({ thresholds, colors }: LegendProps) {
  return (
    <div className='legend'>
      <h3>Number of crimes</h3>
      <h4>Since 2016</h4>
      {thresholds.map((threshold, i) => (
        <div key={i} className='legend-item'>
          <span className='legend-color' style={{ backgroundColor: colors[i] }}></span>
          <span className='legend-label'>
            {i === 0
              ? `< ${threshold}`
              : i === thresholds.length - 1
                ? `> ${thresholds[i - 1]}`
                : `${thresholds[i - 1]} - ${threshold}`}
          </span>
        </div>
      ))}
    </div>
  );
}
