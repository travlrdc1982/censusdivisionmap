import { useState } from 'react';
import { USCensusMap } from './components/USCensusMap';
import { SegmentCard } from './components/SegmentCard';

interface Segment {
  id: string;
  name: string;
  dominantRegions: Array<{ id: string; name: string }>;
  marketShare: number;
  growth: number;
}

export default function App() {
  const [selectedSegment, setSelectedSegment] = useState<string | null>('enterprise');

  // Mock segment data
  const segments: Segment[] = [
    {
      id: 'enterprise',
      name: 'Enterprise Software',
      dominantRegions: [
        { id: 'middle-atlantic', name: 'Middle Atlantic' },
        { id: 'pacific', name: 'Pacific' }
      ],
      marketShare: 42,
      growth: 12.5
    },
    {
      id: 'consumer',
      name: 'Consumer Electronics',
      dominantRegions: [
        { id: 'pacific', name: 'Pacific' },
        { id: 'south-atlantic', name: 'South Atlantic' }
      ],
      marketShare: 38,
      growth: 8.3
    },
    {
      id: 'healthcare',
      name: 'Healthcare Services',
      dominantRegions: [
        { id: 'new-england', name: 'New England' },
        { id: 'east-north-central', name: 'E. North Central' }
      ],
      marketShare: 28,
      growth: 15.7
    },
    {
      id: 'manufacturing',
      name: 'Manufacturing',
      dominantRegions: [
        { id: 'east-north-central', name: 'E. North Central' },
        { id: 'west-north-central', name: 'W. North Central' }
      ],
      marketShare: 35,
      growth: 4.2
    },
    {
      id: 'energy',
      name: 'Energy & Resources',
      dominantRegions: [
        { id: 'west-south-central', name: 'W. South Central' },
        { id: 'mountain', name: 'Mountain' }
      ],
      marketShare: 31,
      growth: -2.1
    },
    {
      id: 'financial',
      name: 'Financial Services',
      dominantRegions: [
        { id: 'middle-atlantic', name: 'Middle Atlantic' },
        { id: 'south-atlantic', name: 'South Atlantic' }
      ],
      marketShare: 45,
      growth: 6.8
    }
  ];

  const selectedSegmentData = segments.find((s) => s.id === selectedSegment);
  const highlightedRegions = selectedSegmentData
    ? selectedSegmentData.dominantRegions.map((r) => r.id)
    : [];

  return (
    <div className="size-full bg-gray-50">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <h1 className="text-2xl font-semibold text-gray-900">
            Regional Market Analysis
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            US Census Divisions - Dominant Regions by Market Segment
          </p>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex gap-6 p-6 overflow-hidden">
          {/* Left Sidebar - Segments */}
          <div className="w-80 flex flex-col">
            <div className="mb-4">
              <h2 className="font-semibold text-gray-900 mb-1">Market Segments</h2>
              <p className="text-xs text-gray-500">
                Click a segment to view its dominant regions
              </p>
            </div>
            <div className="flex-1 overflow-y-auto space-y-3 pr-2">
              {segments.map((segment) => (
                <SegmentCard
                  key={segment.id}
                  name={segment.name}
                  dominantRegions={segment.dominantRegions.map((r) => r.name)}
                  marketShare={segment.marketShare}
                  growth={segment.growth}
                  isSelected={selectedSegment === segment.id}
                  onClick={() => setSelectedSegment(segment.id)}
                />
              ))}
            </div>
          </div>

          {/* Center - Map */}
          <div className="flex-1 bg-white rounded-lg border border-gray-200 shadow-sm p-6 flex flex-col">
            <div className="mb-4">
              <h2 className="font-semibold text-gray-900">
                {selectedSegmentData ? selectedSegmentData.name : 'US Census Divisions'}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {selectedSegmentData
                  ? `Highlighting ${selectedSegmentData.dominantRegions.length} dominant region${
                      selectedSegmentData.dominantRegions.length > 1 ? 's' : ''
                    }`
                  : 'Select a segment to view dominant regions'}
              </p>
            </div>
            <div className="flex-1 min-h-0">
              <USCensusMap highlightedRegions={highlightedRegions} />
            </div>
          </div>

          {/* Right Sidebar - Stats */}
          <div className="w-72 space-y-4">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Census Divisions
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-gray-100">
                  <span className="text-gray-600">Total Divisions</span>
                  <span className="font-medium text-gray-900">9</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-gray-100">
                  <span className="text-gray-600">Highlighted</span>
                  <span className="font-medium text-blue-600">
                    {highlightedRegions.length}
                  </span>
                </div>
              </div>
            </div>

            {selectedSegmentData && (
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  Segment Details
                </h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Market Share</div>
                    <div className="text-2xl font-semibold text-gray-900">
                      {selectedSegmentData.marketShare}%
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">YoY Growth</div>
                    <div
                      className={`text-2xl font-semibold ${
                        selectedSegmentData.growth >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {selectedSegmentData.growth >= 0 ? '+' : ''}
                      {selectedSegmentData.growth}%
                    </div>
                  </div>
                  <div className="pt-2 border-t border-gray-100">
                    <div className="text-xs text-gray-500 mb-2">Dominant Regions</div>
                    <div className="space-y-1.5">
                      {selectedSegmentData.dominantRegions.map((region) => (
                        <div
                          key={region.id}
                          className="flex items-center gap-2 text-xs"
                        >
                          <div className="w-3 h-3 bg-blue-500 rounded-sm" />
                          <span className="text-gray-700">{region.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
              <div className="flex items-start gap-2">
                <svg
                  className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="text-xs text-blue-800">
                  <div className="font-medium mb-1">About Census Divisions</div>
                  <div className="text-blue-700">
                    The US Census Bureau divides the country into 9 geographic divisions for
                    statistical analysis and reporting.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
