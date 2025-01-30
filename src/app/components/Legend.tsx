import React, { useState } from 'react';

interface LegendProps {
  thresholds: number[];
  colors: string[];
  biasMotivations: string[];
  selectedBiases: string[];
  onBiasChange: (biases: string[]) => void;
}

export default function Legend({ thresholds, colors, biasMotivations, selectedBiases, onBiasChange }: LegendProps) {
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
        <button className='legend-filter-button' onClick={() => setIsFilterOpen(!isFilterOpen)}>
          <span role='img' aria-label='filter'>
            ☰
          </span>
          {selectedBiases.length ? `${selectedBiases.length} bias filters` : 'Filter by bias'}
        </button>

        <div className={`legend-bias-list ${isFilterOpen ? 'open' : ''}`}>
          <div className='bias-list-header'>
            <button className='mobile-back-button' onClick={() => setIsFilterOpen(false)}>
              ← Back
            </button>
            <h4>Filter by bias motivation</h4>
            {selectedBiases.length > 0 && (
              <button className='clear-filters' onClick={() => onBiasChange([])}>
                Clear all
              </button>
            )}
          </div>

          <div className='bias-list-content'>
            {biasMotivations.map((bias) => (
              <label key={bias} className='bias-checkbox'>
                <input type='checkbox' checked={selectedBiases.includes(bias)} onChange={() => toggleBias(bias)} />
                <span className='checkbox-label'>{bias}</span>
              </label>
            ))}
          </div>
        </div>

        {!isFilterOpen && (
          <>
            <div className='legend-divider'></div>
            <h3>Number of crimes</h3>
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

            {thresholds.map((threshold, i) => (
              <div key={i} className='legend-item'>
                <div
                  className='legend-color'
                  style={{
                    backgroundColor: colors[i],
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    marginRight: '8px',
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
            ))}
          </>
        )}
      </div>
    </div>
  );
}
