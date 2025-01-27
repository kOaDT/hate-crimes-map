import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ICrime } from '../../Map';

interface BiasMotivationsProps {
  data: ICrime[];
}

export default function BiasMotivationsChart({ data }: BiasMotivationsProps) {
  const processedData = useMemo(() => {
    const biasMap = new Map();
    data.forEach((crime) => {
      const bias = crime['Bias motivations'] || 'Unknown';
      biasMap.set(bias, (biasMap.get(bias) || 0) + 1);
    });

    return Array.from(biasMap, ([bias, count]) => ({
      bias,
      fullBias: bias, // Keep original for tooltip
      count,
    }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)
      .map((item) => ({
        ...item,
        bias: item.bias.length > 25 ? item.bias.slice(0, 25) + '...' : item.bias,
      }));
  }, [data]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const { fullBias, count } = payload[0].payload;
      return (
        <div className='bg-gray-900 border border-gray-700 rounded-lg p-4 shadow-lg'>
          <p className='text-gray-300 font-medium mb-1 max-w-[300px] break-words'>{fullBias}</p>
          <p className='text-indigo-400 font-bold'>{count} incidents</p>
        </div>
      );
    }
    return null;
  };

  const getBarColor = (index: number) => {
    const colors = ['#818cf8', '#6366f1', '#4f46e5', '#4338ca'];
    return colors[index % colors.length];
  };

  return (
    <div className='w-full h-full'>
      <div className='flex flex-col h-full'>
        <h3 className='text-white text-lg font-medium mb-4'>Top Bias Motivations</h3>
        <div className='flex-1' style={{ minHeight: Math.max(350, processedData.length * 40) }}>
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart data={processedData} layout='vertical' margin={{ top: 5, right: 30, left: 5, bottom: 5 }}>
              <XAxis
                type='number'
                stroke='#9ca3af'
                tickLine={false}
                axisLine={{ stroke: '#4b5563' }}
                tick={{ fill: '#9ca3af', fontSize: 12 }}
              />
              <YAxis
                dataKey='bias'
                type='category'
                stroke='#9ca3af'
                tickLine={false}
                axisLine={{ stroke: '#4b5563' }}
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                width={150}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }} />
              <Bar dataKey='count' radius={[0, 4, 4, 0]}>
                {processedData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(index)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
