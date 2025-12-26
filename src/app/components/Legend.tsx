import React, { useState } from 'react';

interface LegendProps {
  thresholds: number[];
  circleColor: string;
  biasMotivations: string[];
  selectedBiases: string[];
  onBiasChange: (biases: string[]) => void;
}

export default function Legend({
  thresholds,
  circleColor,
  biasMotivations,
  selectedBiases,
  onBiasChange,
}: LegendProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleBias = (bias: string) => {
    if (selectedBiases.includes(bias)) {
      onBiasChange(selectedBiases.filter((b) => b !== bias));
    } else {
      onBiasChange([...selectedBiases, bias]);
    }
  };

  return (
    <div className='legend'>
      <div className='legend-content'>
        <button className='legend-filter-button cursor-pointer' onClick={() => setIsFilterOpen(!isFilterOpen)}>
          <span role='img' aria-label='filter'>
            ☰
          </span>
          {selectedBiases.length ? `${selectedBiases.length} bias filters` : 'Filter by bias'}
        </button>

        <div className={`legend-bias-list ${isFilterOpen ? 'open' : ''}`}>
          <div className='bias-list-header'>
            <button className='mobile-back-button cursor-pointer' onClick={() => setIsFilterOpen(false)}>
              ← Back
            </button>
            <h4>Filter by bias motivation</h4>
            {selectedBiases.length > 0 && (
              <button className='clear-filters cursor-pointer' onClick={() => onBiasChange([])}>
                Clear all
              </button>
            )}
          </div>

          <div className='bias-list-content'>
            {biasMotivations.map((bias) => (
              <label key={bias} className='bias-checkbox cursor-pointer'>
                <input type='checkbox' checked={selectedBiases.includes(bias)} onChange={() => toggleBias(bias)} />
                <span className='checkbox-label'>{bias}</span>
              </label>
            ))}
          </div>
        </div>

        {!isFilterOpen && (
          <>
            <div className='legend-divider'></div>
            <h3>Number of reported crimes</h3>
            <h4>
              Since 2016
              {selectedBiases.length > 0 && (
                <span className='selected-biases-note'>
                  {selectedBiases.length === 1
                    ? ` - ${selectedBiases[0]}`
                    : ` - ${selectedBiases.length} selected biases`}
                </span>
              )}
            </h4>

            {thresholds.map((threshold, i) => {
              const size = i === 0 ? 8 : i === 1 ? 12 : i === 2 ? 16 : i === 3 ? 24 : i === 4 ? 32 : 48;
              return (
                <div key={i} className='legend-item'>
                  <div
                    className='legend-color'
                    style={{
                      backgroundColor: circleColor,
                      width: `${size}px`,
                      height: `${size}px`,
                      borderRadius: '50%',
                      marginRight: '8px',
                      border: '1.5px solid #FFFFFF',
                      opacity: 0.7,
                    }}
                  ></div>
                  <span className='legend-label'>
                    {i === 0
                      ? `< ${threshold}`
                      : i === thresholds.length - 1
                        ? `> ${thresholds[i - 1]}`
                        : `${thresholds[i - 1]} - ${threshold}`}
                  </span>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
