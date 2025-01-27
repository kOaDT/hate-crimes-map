import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

interface ChartProps {
  width?: number;
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  children: (selection: d3.Selection<SVGGElement, unknown, null, undefined>) => void;
}

export default function Chart({
  width = 600,
  height = 400,
  margin = { top: 20, right: 30, bottom: 30, left: 40 },
  children,
}: ChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current);
    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    children(g);
  }, [margin, children]);

  return <svg ref={svgRef} width={width} height={height} viewBox={`0 0 ${width} ${height}`} />;
}
