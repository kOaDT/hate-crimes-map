import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ICrime } from '../../Map';

interface AttackTypesProps {
  data: ICrime[];
}

export default function AttackTypesChart({ data }: AttackTypesProps) {
  const processedData = useMemo(() => {
    const groupedByType = data.reduce(
      (acc, crime) => {
        const type = crime['Type of incident'] || 'Unknown';
        acc[type] = (acc[type] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    return Object.entries(groupedByType)
      .map(([type, value]) => ({
        name: type,
        value,
        percentage: ((value / data.length) * 100).toFixed(1),
      }))
      .sort((a, b) => b.value - a.value);
  }, [data]);

  const COLORS = [
    '#818cf8',
    '#60a5fa',
    '#34d399',
    '#f472b6',
    '#fbbf24',
    '#a78bfa',
    '#f87171',
    '#2dd4bf',
    '#fb923c',
    '#4ade80',
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className='bg-gray-900 border border-gray-700 rounded-lg p-4 shadow-lg'>
          <p className='text-gray-300 font-medium mb-1'>{data.name}</p>
          <p className='text-indigo-400 font-bold'>
            {data.value} incidents ({data.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value, name, percentage }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 1.2;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    // Only show label if percentage is greater than 3%
    if (parseFloat(percentage) < 3) return null;

    return (
      <text
        x={x}
        y={y}
        fill='#9ca3af'
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline='central'
        className='text-xs'
      >
        {`${name} (${percentage}%)`}
      </text>
    );
  };

  return (
    <div className='w-full h-full'>
      <div className='flex flex-col h-full'>
        <h3 className='text-white text-lg font-medium mb-4'>Type of incident</h3>
        <div className='flex-1 min-h-[400px] md:min-h-[350px]'>
          <ResponsiveContainer width='100%' height='100%'>
            <PieChart>
              <Pie
                data={processedData}
                cx='50%'
                cy='50%'
                labelLine={false}
                label={CustomLabel}
                outerRadius='80%'
                innerRadius='50%'
                paddingAngle={1}
                dataKey='value'
              >
                {processedData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    className='transition-all hover:opacity-80 hover:scale-105'
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
