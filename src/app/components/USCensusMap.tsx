import { useState, useMemo, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Annotation,
} from "react-simple-maps";
import { mesh } from "topojson-client";
import type {
  Topology,
  GeometryCollection,
} from "topojson-specification";

interface USCensusMapProps {
  regionPercentMap: Record<string, number>;
  onRegionClick?: (regionId: string) => void;
}

const geoUrl =
  "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

// Mapping of state FIPS codes to census divisions
const stateToDivision: Record<string, string> = {
  "09": "new-england",
  "23": "new-england",
  "25": "new-england",
  "33": "new-england",
  "44": "new-england",
  "50": "new-england",
  "34": "middle-atlantic",
  "36": "middle-atlantic",
  "42": "middle-atlantic",
  "17": "east-north-central",
  "18": "east-north-central",
  "26": "east-north-central",
  "39": "east-north-central",
  "55": "east-north-central",
  "19": "west-north-central",
  "20": "west-north-central",
  "27": "west-north-central",
  "29": "west-north-central",
  "31": "west-north-central",
  "38": "west-north-central",
  "46": "west-north-central",
  "10": "south-atlantic",
  "11": "south-atlantic",
  "12": "south-atlantic",
  "13": "south-atlantic",
  "24": "south-atlantic",
  "37": "south-atlantic",
  "45": "south-atlantic",
  "51": "south-atlantic",
  "54": "south-atlantic",
  "01": "east-south-central",
  "21": "east-south-central",
  "28": "east-south-central",
  "47": "east-south-central",
  "05": "west-south-central",
  "22": "west-south-central",
  "40": "west-south-central",
  "48": "west-south-central",
  "04": "mountain",
  "08": "mountain",
  "16": "mountain",
  "30": "mountain",
  "32": "mountain",
  "35": "mountain",
  "49": "mountain",
  "56": "mountain",
  "02": "pacific",
  "06": "pacific",
  "15": "pacific",
  "41": "pacific",
  "53": "pacific",
};

const divisionNames: Record<string, string> = {
  "new-england": "New England",
  "middle-atlantic": "Middle Atlantic",
  "east-north-central": "E. North Central",
  "west-north-central": "W. North Central",
  "south-atlantic": "South Atlantic",
  "east-south-central": "E. South Central",
  "west-south-central": "W. South Central",
  mountain: "Mountain",
  pacific: "Pacific",
};

// Approximate label positions for each division (lon, lat)
const divisionLabelPositions: Record<string, [number, number]> = {
  "new-england": [-71.5, 43.5],
  "middle-atlantic": [-76, 41.5],
  "east-north-central": [-86, 42.5],
  "west-north-central": [-97, 44],
  "south-atlantic": [-80, 34],
  "east-south-central": [-87.5, 34],
  "west-south-central": [-96, 32],
  mountain: [-110, 42],
  pacific: [-121, 40],
};

export function USCensusMap({
  regionPercentMap,
  onRegionClick,
}: USCensusMapProps) {
  const [hoveredDivision, setHoveredDivision] = useState<
    string | null
  >(null);
  const [tooltipPos, setTooltipPos] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [topoData, setTopoData] = useState<Topology | null>(
    null,
  );

  const highlightedRegions = Object.keys(regionPercentMap);

  useEffect(() => {
    fetch(geoUrl)
      .then((res) => res.json())
      .then((data) => setTopoData(data as Topology));
  }, []);

  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPos({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const divisionBorders = useMemo(() => {
    if (!topoData?.objects?.states) return null;

    return mesh(
      topoData,
      topoData.objects.states as GeometryCollection,
      (a, b) => {
        const divA = stateToDivision[a.id as string];
        const divB = stateToDivision[b.id as string];
        return divA !== divB;
      },
    );
  }, [topoData]);

  return (
    <div
      className="relative w-full h-full"
      onMouseMove={handleMouseMove}
    >
      <ComposableMap
        projection="geoAlbersUsa"
        className="w-full h-full"
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) => (
            <>
              {geographies.map((geo) => {
                const fipsCode = geo.id as string;
                const division = stateToDivision[fipsCode];
                const isHighlighted =
                  division &&
                  highlightedRegions.includes(division);

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={isHighlighted ? "#0d9488" : "#e5e7eb"}
                    stroke="#ffffff"
                    strokeWidth={0.3}
                    style={{
                      default: {
                        outline: "none",
                        fill: isHighlighted
                          ? "#0d9488"
                          : "#e5e7eb",
                      },
                      hover: {
                        outline: "none",
                        fill: isHighlighted
                          ? "#0f766e"
                          : "#d1d5db",
                      },
                      pressed: { outline: "none" },
                    }}
                    onMouseEnter={() => {
                      if (division)
                        setHoveredDivision(division);
                    }}
                    onMouseLeave={() =>
                      setHoveredDivision(null)
                    }
                    onClick={() => {
                      if (division && onRegionClick)
                        onRegionClick(division);
                    }}
                    className="cursor-pointer"
                  />
                );
              })}

              {divisionBorders && (
                <Geography
                  geography={divisionBorders as any}
                  fill="none"
                  stroke="#9ca3af"
                  strokeWidth={1}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none" },
                    pressed: { outline: "none" },
                  }}
                  className="pointer-events-none"
                />
              )}

              {/* Percentage labels on highlighted divisions */}
              {highlightedRegions.map((divisionId) => {
                const pos = divisionLabelPositions[divisionId];
                if (!pos) return null;
                const percent = regionPercentMap[divisionId];
                return (
                  <Annotation
                    key={divisionId}
                    subject={pos}
                    connectorProps={{}}
                    dx={0}
                    dy={0}
                  >
                    <rect
                      x={-22}
                      y={-11}
                      width={44}
                      height={18}
                      rx={3}
                      fill="rgba(255,255,255,0.92)"
                      stroke="#0d9488"
                      strokeWidth={1}
                    />
                    <text
                      textAnchor="middle"
                      y={3}
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        fill: "#0f766e",
                        fontFamily: "system-ui, sans-serif",
                      }}
                    >
                      {percent}%
                    </text>
                  </Annotation>
                );
              })}
            </>
          )}
        </Geographies>
      </ComposableMap>

      {/* Tooltip */}
      {hoveredDivision && tooltipPos && (
        <div
          className="absolute bg-white border border-gray-200 rounded-lg shadow-lg px-3 py-2 pointer-events-none z-10"
          style={{
            left: `${tooltipPos.x + 15}px`,
            top: `${tooltipPos.y + 15}px`,
          }}
        >
          <div className="text-sm whitespace-nowrap">
            <div className="font-semibold text-gray-900">
              {divisionNames[hoveredDivision]}
            </div>
            {regionPercentMap[hoveredDivision] !== undefined && (
              <div className="text-xs text-teal-600 font-medium mt-0.5">
                {regionPercentMap[hoveredDivision]}%
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
