import { useState } from 'react';
import { USCensusMap } from './components/USCensusMap';

interface DominantRegion {
  id: string;
  name: string;
  percent: number;
}

interface Segment {
  id: string;
  abbr: string;
  name: string;
  dominantRegions: DominantRegion[];
}

const segments: Segment[] = [
  {
    id: 'trust-science',
    abbr: 'TSP',
    name: 'Trust the Science Pragmatists',
    dominantRegions: [
      { id: 'pacific', name: 'Pacific', percent: 17.3 },
    ],
  },
  {
    id: 'consumer-empowerment',
    abbr: 'CEC',
    name: 'Consumer Empowerment Champions',
    dominantRegions: [
      { id: 'east-north-central', name: 'E. North Central', percent: 19.7 },
    ],
  },
  {
    id: 'traditional-conservatives',
    abbr: 'TC',
    name: 'Traditional Conservatives',
    dominantRegions: [
      { id: 'east-south-central', name: 'E. South Central', percent: 12.1 },
      { id: 'west-south-central', name: 'W. South Central', percent: 29.4 },
    ],
  },
  {
    id: 'health-futurists',
    abbr: 'HF',
    name: 'Health Futurists',
    dominantRegions: [
      { id: 'east-north-central', name: 'E. North Central', percent: 17.0 },
      { id: 'pacific', name: 'Pacific', percent: 16.4 },
    ],
  },
  {
    id: 'price-populists',
    abbr: 'PP',
    name: 'Price Populists',
    dominantRegions: [
      { id: 'middle-atlantic', name: 'Middle Atlantic', percent: 15.1 },
      { id: 'mountain', name: 'Mountain', percent: 12.6 },
    ],
  },
  {
    id: 'wellness-evangelists',
    abbr: 'WE',
    name: 'Wellness Evangelists',
    dominantRegions: [
      { id: 'east-south-central', name: 'E. South Central', percent: 8.3 },
      { id: 'west-south-central', name: 'W. South Central', percent: 16.7 },
    ],
  },
  {
    id: 'paleo-freedom',
    abbr: 'PFF',
    name: 'Paleo Freedom Fighters',
    dominantRegions: [
      { id: 'east-north-central', name: 'E. North Central', percent: 17.6 },
      { id: 'west-north-central', name: 'W. North Central', percent: 7.6 },
      { id: 'mountain', name: 'Mountain', percent: 12.0 },
    ],
  },
  {
    id: 'holistic-naturalists',
    abbr: 'HHN',
    name: 'Holistic Health Naturalists',
    dominantRegions: [
      { id: 'south-atlantic', name: 'South Atlantic', percent: 28.8 },
      { id: 'east-south-central', name: 'E. South Central', percent: 8.4 },
    ],
  },
  {
    id: 'medical-freedom-libertarians',
    abbr: 'MFL',
    name: 'Medical Freedom Libertarians',
    dominantRegions: [
      { id: 'new-england', name: 'New England', percent: 5.4 },
      { id: 'south-atlantic', name: 'South Atlantic', percent: 27.1 },
      { id: 'mountain', name: 'Mountain', percent: 14.6 },
      { id: 'pacific', name: 'Pacific', percent: 26.6 },
    ],
  },
  {
    id: 'vaccine-skeptics',
    abbr: 'VS',
    name: 'Vaccine Skeptics',
    dominantRegions: [
      { id: 'pacific', name: 'Pacific', percent: 15.4 },
    ],
  },
  {
    id: 'universal-care',
    abbr: 'UCP',
    name: 'Universal Care Progressives',
    dominantRegions: [
      { id: 'south-atlantic', name: 'South Atlantic', percent: 31.2 },
      { id: 'west-south-central', name: 'W. South Central', percent: 12.4 },
    ],
  },
  {
    id: 'faith-justice',
    abbr: 'FJP',
    name: 'Faith & Justice Progressives',
    dominantRegions: [
      { id: 'pacific', name: 'Pacific', percent: 24.3 },
    ],
  },
  {
    id: 'health-care-protectionists',
    abbr: 'HCP',
    name: 'Health Care Protectionists',
    dominantRegions: [
      { id: 'middle-atlantic', name: 'Middle Atlantic', percent: 14.6 },
    ],
  },
  {
    id: 'health-abundance',
    abbr: 'HAD',
    name: 'Health Abundance Democrats',
    dominantRegions: [
      { id: 'east-north-central', name: 'E. North Central', percent: 15.7 },
    ],
  },
  {
    id: 'health-care-incrementalists',
    abbr: 'HCI',
    name: 'Health Care Incrementalists',
    dominantRegions: [
      { id: 'pacific', name: 'Pacific', percent: 32.8 },
    ],
  },
  {
    id: 'global-health-institutionalists',
    abbr: 'GHI',
    name: 'Global Health Institutionalists',
    dominantRegions: [
      { id: 'new-england', name: 'New England', percent: 5.8 },
    ],
  },
];

export default function App() {
  const [selectedSegment, setSelectedSegment] = useState<string>('trust-science');

  const selectedSegmentData = segments.find((s) => s.id === selectedSegment)!;
  const regionPercentMap: Record<string, number> = {};
  for (const r of selectedSegmentData.dominantRegions) {
    regionPercentMap[r.id] = r.percent;
  }

  return (
    <div className="size-full bg-white">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="text-xs text-gray-400 uppercase tracking-wider">Reservoir Health PRISM</div>
          <h1 className="text-2xl font-bold text-gray-900">Persona Profile</h1>
          <div className="text-sm text-red-500 font-medium">PRISM Audience Intelligence</div>
        </div>

        {/* Segment Selector */}
        <div className="px-6 pt-5 pb-4">
          <div className="text-xs text-gray-500 uppercase tracking-wider mb-3">Segment:</div>
          <div className="flex gap-4 flex-wrap">
            {segments.map((segment) => {
              const isSelected = selectedSegment === segment.id;
              return (
                <button
                  key={segment.id}
                  onClick={() => setSelectedSegment(segment.id)}
                  className="flex flex-col items-center gap-1.5 group"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold transition-all ${
                      isSelected
                        ? 'bg-red-600 ring-2 ring-red-600 ring-offset-2'
                        : 'bg-red-500 hover:bg-red-600'
                    }`}
                  >
                    {segment.abbr}
                  </div>
                  <span className={`text-[10px] text-center leading-tight max-w-[60px] ${
                    isSelected ? 'text-gray-900 font-medium' : 'text-gray-500'
                  }`}>
                    {segment.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Segment Header */}
        <div className="mx-6 bg-gray-100 rounded-lg px-5 py-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold">
            {selectedSegmentData.abbr}
          </div>
          <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wide">
            {selectedSegmentData.name}
          </h2>
        </div>

        {/* Geography Section */}
        <div className="flex-1 px-6 py-5 flex flex-col min-h-0">
          <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-3">Geography</div>
          <div className="flex-1 bg-white rounded-lg border border-gray-200 p-4 flex flex-col min-h-0">
            <div className="flex-1 min-h-0">
              <USCensusMap regionPercentMap={regionPercentMap} />
            </div>
            {/* Division legend below map */}
            <div className="flex flex-wrap gap-x-5 gap-y-2 mt-4 pt-3 border-t border-gray-100">
              {selectedSegmentData.dominantRegions.map((region) => (
                <div key={region.id} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-teal-500" />
                  <span className="text-sm text-gray-700">{region.name}</span>
                  <span className="text-xs bg-teal-100 text-teal-700 px-1.5 py-0.5 rounded font-medium">
                    Dominant
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
