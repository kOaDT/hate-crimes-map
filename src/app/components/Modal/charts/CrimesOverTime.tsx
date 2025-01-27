import React, { useMemo } from 'react';
import * as d3 from 'd3';
import Chart from '../common/Chart';
import { ICrime } from '../../Map';

interface CrimesOverTimeProps {
  data: ICrime[];
}

export default function CrimesOverTime({ data }: CrimesOverTimeProps) {
  const processedData = useMemo(() => {
    const groupedByYear = d3.group(data, (d) => new Date(d.Date).getFullYear());
    return Array.from(groupedByYear, ([year, crimes]) => ({
      year: new Date(year, 0),
      count: crimes.length,
    }));
  }, [data]);

  const width = 500;
  const height = 200;

  const renderChart = (g: d3.Selection<SVGGElement, unknown, null, undefined>) => {
    const x = d3
      .scaleTime()
      .domain(d3.extent(processedData, (d) => d.year) as [Date, Date])
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(processedData, (d) => d.count) || 0])
      .range([height, 0]);

    const line = d3
      .line<{ year: Date; count: number }>()
      .x((d) => x(d.year))
      .y((d) => y(d.count));

    g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(5))
      .attr('class', 'text-white');

    g.append('g').call(d3.axisLeft(y)).attr('class', 'text-white');

    g.append('path')
      .datum(processedData)
      .attr('fill', 'none')
      .attr('stroke', '#4f46e5')
      .attr('stroke-width', 2)
      .attr('d', line);

    g.selectAll('circle')
      .data(processedData)
      .join('circle')
      .attr('cx', (d) => x(d.year))
      .attr('cy', (d) => y(d.count))
      .attr('r', 4)
      .attr('fill', '#4f46e5');
  };

  return (
    <div className='mt-6'>
      <h3 className='text-white text-lg mb-4'>Crimes over time</h3>
      <Chart width={width + 100} height={height + 100} margin={{ top: 20, right: 30, bottom: 30, left: 40 }}>
        {renderChart}
      </Chart>
    </div>
  );
}
