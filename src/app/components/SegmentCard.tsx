interface SegmentCardProps {
  name: string;
  dominantRegions: string[];
  marketShare: number;
  growth: number;
  isSelected: boolean;
  onClick: () => void;
}

export function SegmentCard({
  name,
  dominantRegions,
  marketShare,
  growth,
  isSelected,
  onClick
}: SegmentCardProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
        isSelected
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-gray-900">{name}</h3>
        <div className="flex items-center gap-1">
          <span className={`text-sm ${growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {growth >= 0 ? '↑' : '↓'} {Math.abs(growth)}%
          </span>
        </div>
      </div>
      
      <div className="space-y-2">
        <div>
          <div className="text-xs text-gray-500 mb-1">Market Share</div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${marketShare}%` }}
              />
            </div>
            <span className="text-sm font-medium text-gray-700">{marketShare}%</span>
          </div>
        </div>
        
        <div>
          <div className="text-xs text-gray-500 mb-1">Dominant Regions</div>
          <div className="flex flex-wrap gap-1">
            {dominantRegions.map((region) => (
              <span
                key={region}
                className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full"
              >
                {region}
              </span>
            ))}
          </div>
        </div>
      </div>
    </button>
  );
}
