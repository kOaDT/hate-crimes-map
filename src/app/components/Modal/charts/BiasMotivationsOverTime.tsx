import { ICrime } from '../../Map';
import { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Props {
  data: ICrime[];
}

export default function BiasMotivationsOverTime({ data }: Props) {
  const { chartData, biasTypes } = useMemo(() => {
    // Limit to top 5 bias types for better readability
    const biasCount = new Map<string, number>();
    data.forEach((crime) => {
      const bias = crime['Bias motivations'] || 'Unknown';
      biasCount.set(bias, (biasCount.get(bias) || 0) + 1);
    });

    const topBiasTypes = Array.from(biasCount.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([bias]) => bias);

    // Process data for these top types only
    const groupedByYear = data.reduce(
      (acc, crime) => {
        const year = new Date(crime.Date).getFullYear();
        if (!acc[year]) {
          acc[year] = {};
          topBiasTypes.forEach((bias) => (acc[year][bias] = 0));
        }
        const bias = crime['Bias motivations'] || 'Unknown';
        if (topBiasTypes.includes(bias)) {
          acc[year][bias] = (acc[year][bias] || 0) + 1;
        }
        return acc;
      },
      {} as Record<number, Record<string, number>>
    );

    return {
      chartData: Object.entries(groupedByYear)
        .map(([year, counts]) => ({
          year: Number(year),
          ...counts,
        }))
        .sort((a, b) => a.year - b.year),
      biasTypes: topBiasTypes,
    };
  }, [data]);

  const colors = ['#818cf8', '#f472b6', '#34d399', '#fbbf24', '#60a5fa'];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className='bg-gray-900 border border-gray-700 rounded-lg p-4 shadow-lg'>
          <p className='text-gray-300 font-medium mb-2'>{label}</p>
          <div className='space-y-1'>
            {payload
              .filter((p: any) => p.value > 0)
              .sort((a: any, b: any) => b.value - a.value)
              .map((p: any, index: number) => (
                <p key={index} className='flex items-center gap-2'>
                  <span className='w-3 h-3 rounded-full' style={{ backgroundColor: p.color }} />
                  <span className='text-gray-300'>{p.name}:</span>
                  <span className='text-indigo-400 font-bold'>{p.value}</span>
                </p>
              ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className='w-full bg-gray-800/50 rounded-lg p-6'>
      <h3 className='text-white text-lg font-medium mb-6'>Evolution of Top Bias Motivations</h3>
      <div className='h-[400px]'>
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 30 }}>
            <CartesianGrid strokeDasharray='3 3' stroke='#374151' vertical={false} />
            <XAxis
              dataKey='year'
              stroke='#9ca3af'
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              tickLine={{ stroke: '#4b5563' }}
              axisLine={{ stroke: '#4b5563' }}
            />
            <YAxis
              stroke='#9ca3af'
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              tickLine={{ stroke: '#4b5563' }}
              axisLine={{ stroke: '#4b5563' }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#9ca3af', strokeWidth: 1 }} />
            {biasTypes.map((bias, index) => (
              <Line
                key={bias}
                type='monotone'
                dataKey={bias}
                stroke={colors[index]}
                strokeWidth={2}
                dot={{ fill: colors[index], strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: colors[index] }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
