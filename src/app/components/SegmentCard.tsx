interface DominantRegion {
  id: string;
  name: string;
  percent: number;
}

interface SegmentCardProps {
  name: string;
  dominantRegions: DominantRegion[];
  isSelected: boolean;
  onClick: () => void;
}

export function SegmentCard({
  name,
  dominantRegions,
  isSelected,
  onClick,
}: SegmentCardProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-3 py-2.5 rounded-lg border transition-all duration-200 ${
        isSelected
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
      }`}
    >
      <h3 className="font-medium text-sm text-gray-900">{name}</h3>
      <div className="flex flex-wrap gap-1 mt-1.5">
        {dominantRegions.map((region) => (
          <span
            key={region.id}
            className="px-1.5 py-0.5 bg-blue-100 text-blue-700 text-xs rounded"
          >
            {region.name} {region.percent}%
          </span>
        ))}
      </div>
    </button>
  );
}
