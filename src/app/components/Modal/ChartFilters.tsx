interface ChartFiltersProps {
  filters: {
    crimesOverTime: boolean;
    biasMotivations: boolean;
    attackTypes: boolean;
    sources: boolean;
    biasMotivationsOverTime: boolean;
  };
  onChange: (key: keyof ChartFiltersProps['filters']) => void;
}

interface FilterButtonProps {
  active: boolean;
  onClick: () => void;
  label: string;
}

const FilterButton = ({ active, onClick, label }: FilterButtonProps) => (
  <button
    onClick={onClick}
    className={`
      px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer
      ${
        active
          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 hover:bg-indigo-700'
          : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
      }
    `}
  >
    {label}
  </button>
);

export default function ChartFilters({ filters, onChange }: ChartFiltersProps) {
  return (
    <div className='w-full'>
      <h3 className='text-white text-sm font-medium mb-3 px-1'>Visible charts</h3>
      <div className='flex flex-wrap gap-2 pb-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent'>
        <FilterButton
          active={filters.crimesOverTime}
          onClick={() => onChange('crimesOverTime')}
          label='Crimes Over Time'
        />
        <FilterButton
          active={filters.biasMotivations}
          onClick={() => onChange('biasMotivations')}
          label='Bias Motivations'
        />
        <FilterButton active={filters.attackTypes} onClick={() => onChange('attackTypes')} label='Type of incident' />
        <FilterButton active={filters.sources} onClick={() => onChange('sources')} label='Sources' />
        <FilterButton
          active={filters.biasMotivationsOverTime}
          onClick={() => onChange('biasMotivationsOverTime')}
          label='Bias Motivations Over Time'
        />
      </div>
    </div>
  );
}
