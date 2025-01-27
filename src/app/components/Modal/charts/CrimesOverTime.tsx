import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ICrime } from '../../Map';

interface CrimesOverTimeProps {
  data: ICrime[];
}

export default function CrimesOverTime({ data }: CrimesOverTimeProps) {
  const processedData = useMemo(() => {
    const groupedByYear = new Map();
    data.forEach((crime) => {
      const year = new Date(crime.Date).getFullYear();
      groupedByYear.set(year, (groupedByYear.get(year) || 0) + 1);
    });

    return Array.from(groupedByYear, ([year, count]) => ({
      year,
      incidents: count,
    })).sort((a, b) => a.year - b.year);
  }, [data]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className='bg-gray-900 border border-gray-700 rounded-lg p-4 shadow-lg'>
          <p className='text-gray-300 font-medium'>{label}</p>
          <p className='text-indigo-400 font-bold'>{payload[0].value} incidents</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className='w-full h-full'>
      <div className='flex flex-col h-full'>
        <h3 className='text-white text-lg font-medium mb-4'>Incidents Over Time</h3>
        <div className='flex-1 min-h-[300px]'>
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart data={processedData} margin={{ top: 10, right: 30, left: 0, bottom: 30 }}>
              <defs>
                <linearGradient id='incidentsGradient' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor='#818cf8' stopOpacity={0.8} />
                  <stop offset='95%' stopColor='#818cf8' stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray='3 3' stroke='#374151' vertical={false} />
              <XAxis
                dataKey='year'
                stroke='#9ca3af'
                tick={{ fill: '#9ca3af' }}
                tickLine={{ stroke: '#4b5563' }}
                axisLine={{ stroke: '#4b5563' }}
                padding={{ left: 30, right: 30 }}
              />
              <YAxis
                stroke='#9ca3af'
                tick={{ fill: '#9ca3af' }}
                tickLine={{ stroke: '#4b5563' }}
                axisLine={{ stroke: '#4b5563' }}
                width={40}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign='top'
                height={36}
                formatter={(value) => <span className='text-gray-300'>{value}</span>}
              />
              <Line
                type='monotone'
                dataKey='incidents'
                name='Incidents'
                stroke='#818cf8'
                strokeWidth={3}
                dot={{ fill: '#818cf8', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: '#c7d2fe' }}
                fill='url(#incidentsGradient)'
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
