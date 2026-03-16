import { useState, useMemo, useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
import { mesh } from "topojson-client";
import type {
  Topology,
  GeometryCollection,
} from "topojson-specification";

interface USCensusMapProps {
  highlightedRegions: string[];
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
  "east-north-central": "East North Central",
  "west-north-central": "West North Central",
  "south-atlantic": "South Atlantic",
  "east-south-central": "East South Central",
  "west-south-central": "West South Central",
  mountain: "Mountain",
  pacific: "Pacific",
};

export function USCensusMap({
  highlightedRegions,
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

  // Load topology data
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

  // Generate division borders using topojson mesh
  const divisionBorders = useMemo(() => {
    if (!topoData?.objects?.states) return null;

    // Create mesh that only shows borders between different divisions
    const borders = mesh(
      topoData,
      topoData.objects.states as GeometryCollection,
      (a, b) => {
        // a and b are adjacent geometries
        // Return true to draw a border between them
        const divA = stateToDivision[a.id as string];
        const divB = stateToDivision[b.id as string];
        // Draw border only if they belong to different divisions
        return divA !== divB;
      },
    );

    return borders;
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
              {/* Render state fills */}
              {geographies.map((geo) => {
                const fipsCode = geo.id as string;
                const division = stateToDivision[fipsCode];
                const isHighlighted =
                  division &&
                  highlightedRegions.includes(division);
                const isHovered = division === hoveredDivision;

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={isHighlighted ? "#3b82f6" : "#e5e7eb"}
                    stroke="#ffffff"
                    strokeWidth={0.2}
                    style={{
                      default: {
                        outline: "none",
                        fill: isHighlighted
                          ? "#3b82f6"
                          : "#e5e7eb",
                      },
                      hover: {
                        outline: "none",
                        fill: isHighlighted
                          ? "#2563eb"
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
                    className="cursor-pointer transition-colors duration-150"
                  />
                );
              })}

              {/* Render division borders */}
              {divisionBorders && (
                <Geography
                  geography={divisionBorders as any}
                  fill="none"
                  stroke="#d1d5db"
                  strokeWidth={1.5}
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
            </>
          )}
        </Geographies>
      </ComposableMap>

      {/* Tooltip */}
      {hoveredDivision && tooltipPos && (
        <div
          className="absolute bg-white border border-gray-200 rounded-lg shadow-lg p-3 pointer-events-none z-10"
          style={{
            left: `${tooltipPos.x + 15}px`,
            top: `${tooltipPos.y + 15}px`,
          }}
        >
          <div className="text-sm whitespace-nowrap">
            <div className="font-semibold text-gray-900">
              {divisionNames[hoveredDivision]}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {highlightedRegions.includes(hoveredDivision)
                ? "Dominant Region"
                : "Census Division"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}