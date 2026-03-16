import { useState } from 'react';
import { USCensusMap } from './components/USCensusMap';
import { SegmentCard } from './components/SegmentCard';

interface DominantRegion {
  id: string;
  name: string;
  percent: number;
}

interface Segment {
  id: string;
  name: string;
  dominantRegions: DominantRegion[];
}

const segments: Segment[] = [
  {
    id: 'trust-science',
    name: 'Trust the Science Pragmatists',
    dominantRegions: [
      { id: 'pacific', name: 'Pacific', percent: 17.3 },
    ],
  },
  {
    id: 'consumer-empowerment',
    name: 'Consumer Empowerment Champions',
    dominantRegions: [
      { id: 'east-north-central', name: 'E. North Central', percent: 19.7 },
    ],
  },
  {
    id: 'traditional-conservatives',
    name: 'Traditional Conservatives',
    dominantRegions: [
      { id: 'east-south-central', name: 'E. South Central', percent: 12.1 },
      { id: 'west-south-central', name: 'W. South Central', percent: 29.4 },
    ],
  },
  {
    id: 'wellness-evangelists',
    name: 'Wellness Evangelists',
    dominantRegions: [
      { id: 'east-south-central', name: 'E. South Central', percent: 8.3 },
      { id: 'west-south-central', name: 'W. South Central', percent: 16.7 },
    ],
  },
  {
    id: 'price-populists',
    name: 'Price Populists',
    dominantRegions: [
      { id: 'middle-atlantic', name: 'Middle Atlantic', percent: 15.1 },
      { id: 'mountain', name: 'Mountain', percent: 12.6 },
    ],
  },
  {
    id: 'health-futurists',
    name: 'Health Futurists',
    dominantRegions: [
      { id: 'east-north-central', name: 'E. North Central', percent: 17.0 },
      { id: 'pacific', name: 'Pacific', percent: 16.4 },
    ],
  },
  {
    id: 'paleo-freedom',
    name: 'Paleo Freedom Fighters',
    dominantRegions: [
      { id: 'east-north-central', name: 'E. North Central', percent: 17.6 },
      { id: 'west-north-central', name: 'W. North Central', percent: 7.6 },
      { id: 'mountain', name: 'Mountain', percent: 12.0 },
    ],
  },
  {
    id: 'holistic-naturalists',
    name: 'Holistic Natural Naturalists',
    dominantRegions: [
      { id: 'south-atlantic', name: 'South Atlantic', percent: 28.8 },
      { id: 'east-south-central', name: 'E. South Central', percent: 8.4 },
    ],
  },
  {
    id: 'libertarians',
    name: 'Libertarians',
    dominantRegions: [
      { id: 'new-england', name: 'New England', percent: 5.4 },
      { id: 'south-atlantic', name: 'South Atlantic', percent: 27.1 },
      { id: 'mountain', name: 'Mountain', percent: 14.6 },
      { id: 'pacific', name: 'Pacific', percent: 26.6 },
    ],
  },
  {
    id: 'anti-vax',
    name: 'Anti-Vax',
    dominantRegions: [
      { id: 'pacific', name: 'Pacific', percent: 15.4 },
    ],
  },
  {
    id: 'universal-care',
    name: 'Universal Care Progressives',
    dominantRegions: [
      { id: 'south-atlantic', name: 'South Atlantic', percent: 31.2 },
      { id: 'west-south-central', name: 'W. South Central', percent: 12.4 },
    ],
  },
  {
    id: 'faith-justice',
    name: 'Faith & Justice Progressives',
    dominantRegions: [
      { id: 'pacific', name: 'Pacific', percent: 24.3 },
    ],
  },
  {
    id: 'health-care-protectionists',
    name: 'Health Care Protectionists',
    dominantRegions: [
      { id: 'new-england', name: 'New England', percent: 5.8 },
      { id: 'middle-atlantic', name: 'Middle Atlantic', percent: 14.6 },
    ],
  },
  {
    id: 'health-abundance',
    name: 'Health Abundance Dems',
    dominantRegions: [
      { id: 'east-north-central', name: 'E. North Central', percent: 15.7 },
    ],
  },
  {
    id: 'incrementalists',
    name: 'Incrementalists',
    dominantRegions: [
      { id: 'pacific', name: 'Pacific', percent: 32.8 },
    ],
  },
  {
    id: 'gh-institutionalists',
    name: 'GH Institutionalists',
    dominantRegions: [
      { id: 'middle-atlantic', name: 'Middle Atlantic', percent: 15.7 },
    ],
  },
];

export default function App() {
  const [selectedSegment, setSelectedSegment] = useState<string | null>('trust-science');

  const selectedSegmentData = segments.find((s) => s.id === selectedSegment);
  const regionPercentMap: Record<string, number> = {};
  if (selectedSegmentData) {
    for (const r of selectedSegmentData.dominantRegions) {
      regionPercentMap[r.id] = r.percent;
    }
  }

  return (
    <div className="size-full bg-gray-50">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <h1 className="text-2xl font-semibold text-gray-900">
            Division Demographics
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Overindexed Census Divisions by Consumer Segment
          </p>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex gap-6 p-6 overflow-hidden">
          {/* Left Sidebar - Segments */}
          <div className="w-72 flex flex-col">
            <div className="mb-4">
              <h2 className="font-semibold text-gray-900 mb-1">Segments</h2>
              <p className="text-xs text-gray-500">
                Click a segment to view overindexed divisions
              </p>
            </div>
            <div className="flex-1 overflow-y-auto space-y-2 pr-2">
              {segments.map((segment) => (
                <SegmentCard
                  key={segment.id}
                  name={segment.name}
                  dominantRegions={segment.dominantRegions}
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
                  ? `${selectedSegmentData.dominantRegions.length} overindexed division${
                      selectedSegmentData.dominantRegions.length > 1 ? 's' : ''
                    }`
                  : 'Select a segment to view overindexed divisions'}
              </p>
            </div>
            <div className="flex-1 min-h-0">
              <USCensusMap regionPercentMap={regionPercentMap} />
            </div>
          </div>

          {/* Right Sidebar - Details */}
          <div className="w-64 space-y-4">
            {selectedSegmentData && (
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  Overindexed Divisions
                </h3>
                <div className="space-y-3">
                  {selectedSegmentData.dominantRegions.map((region) => (
                    <div
                      key={region.id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2 text-sm">
                        <div className="w-3 h-3 bg-blue-500 rounded-sm" />
                        <span className="text-gray-700">{region.name}</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">
                        {region.percent}%
                      </span>
                    </div>
                  ))}
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
                  <div className="font-medium mb-1">About This View</div>
                  <div className="text-blue-700">
                    Highlighted divisions show where each consumer segment
                    overindexes relative to the national average.
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
