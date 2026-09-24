/**
 * Abstract, schematic map of Dallas–Fort Worth. Lines draw in with CSS
 * when the figure enters the viewport (see .map-draw in globals.css).
 * Places are projected from real coordinates (approximate); highways and
 * the Trinity River are simplified. No map API or tiles required.
 */

const W = 600;
const H = 600;
const LON0 = -97.55;
const LAT0 = 33.22;
const PX_LON = 531; // px per degree longitude (≈ cos(32.8°) × PX_LAT)
const PX_LAT = 632; // px per degree latitude
const MILE = PX_LAT / 69;

const project = (lon: number, lat: number) => ({ x: (lon - LON0) * PX_LON, y: (LAT0 - lat) * PX_LAT });

type Place = {
  name: string;
  lon: number;
  lat: number;
  kind: "primary" | "registered" | "reference";
  anchor?: "start" | "end";
  dx?: number;
  dy?: number;
};

const places: Place[] = [
  { name: "Dallas", lon: -96.797, lat: 32.7767, kind: "primary", dx: 14, dy: -10 },
  { name: "Oak Cliff", lon: -96.84, lat: 32.73, kind: "primary", anchor: "end", dx: -14, dy: 18 },
  { name: "Richardson", lon: -96.7299, lat: 32.9483, kind: "primary", dx: 14, dy: 5 },
  { name: "Arlington", lon: -97.1081, lat: 32.7357, kind: "registered", anchor: "end", dx: -14, dy: 20 },
  { name: "Midlothian", lon: -96.9945, lat: 32.4824, kind: "registered", dx: 14, dy: 5 },
  { name: "Fort Worth", lon: -97.3308, lat: 32.7555, kind: "reference", dx: 0, dy: -16, anchor: undefined },
  { name: "Plano", lon: -96.6989, lat: 33.0198, kind: "reference", dx: 12, dy: 4 },
  { name: "Irving", lon: -96.9489, lat: 32.814, kind: "reference", anchor: "end", dx: -12, dy: -8 },
  { name: "Garland", lon: -96.6389, lat: 32.9126, kind: "reference", dx: 12, dy: 4 },
  { name: "Mesquite", lon: -96.5992, lat: 32.7668, kind: "reference", dx: 12, dy: 4 },
];

const toPath = (pts: [number, number][]) =>
  pts
    .map(([lon, lat], i) => {
      const { x, y } = project(lon, lat);
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");

const roads = [
  // I-35E
  toPath([
    [-97.13, 33.22],
    [-96.89, 32.98],
    [-96.8, 32.79],
    [-96.82, 32.64],
    [-96.84, 32.47],
    [-96.86, 32.27],
  ]),
  // I-30
  toPath([
    [-97.55, 32.76],
    [-97.33, 32.755],
    [-97.1, 32.76],
    [-96.95, 32.765],
    [-96.8, 32.775],
    [-96.6, 32.81],
    [-96.42, 32.9],
  ]),
  // I-20
  toPath([
    [-97.55, 32.68],
    [-97.33, 32.68],
    [-97.1, 32.67],
    [-96.95, 32.66],
    [-96.78, 32.66],
    [-96.58, 32.7],
    [-96.42, 32.72],
  ]),
  // I-635 / LBJ
  toPath([
    [-97.03, 32.86],
    [-96.97, 32.91],
    [-96.85, 32.925],
    [-96.73, 32.92],
    [-96.64, 32.87],
    [-96.61, 32.78],
    [-96.62, 32.7],
  ]),
  // US-75
  toPath([
    [-96.8, 32.79],
    [-96.77, 32.85],
    [-96.73, 32.95],
    [-96.7, 33.02],
    [-96.64, 33.22],
  ]),
  // I-35W
  toPath([
    [-97.33, 33.22],
    [-97.32, 32.95],
    [-97.32, 32.76],
    [-97.33, 32.55],
    [-97.35, 32.27],
  ]),
];

const trinity = (() => {
  const a = project(-97.55, 32.79);
  const b = project(-97.2, 32.8);
  const c = project(-96.98, 32.8);
  const d = project(-96.83, 32.77);
  const e = project(-96.72, 32.62);
  const f = project(-96.55, 32.35);
  return `M${a.x} ${a.y} C${a.x + 90} ${a.y - 30}, ${b.x - 40} ${b.y + 25}, ${b.x} ${b.y} S${c.x - 40} ${c.y - 25}, ${c.x} ${c.y} S${d.x - 30} ${d.y - 30}, ${d.x} ${d.y} S${e.x - 30} ${e.y - 40}, ${e.x} ${e.y} S${f.x - 20} ${f.y - 40}, ${f.x} ${f.y}`;
})();

export function DfwMap() {
  const dallas = project(-96.797, 32.7767);

  return (
    <figure className="relative" data-reveal="map">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-labelledby="dfw-map-title dfw-map-desc">
        <title id="dfw-map-title">Schematic map of the Dallas–Fort Worth area</title>
        <desc id="dfw-map-desc">
          Dallas, Oak Cliff, and Richardson are highlighted as the primary service area, with city registrations on
          record in Arlington and Midlothian. Rings mark 10, 20, and 30 miles from downtown Dallas.
        </desc>

        {/* Grid */}
        <g stroke="currentColor" className="text-ink/[0.07]" strokeWidth="1">
          {Array.from({ length: 13 }, (_, i) => (
            <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2={H} />
          ))}
          {Array.from({ length: 13 }, (_, i) => (
            <line key={`h${i}`} x1="0" y1={i * 50} x2={W} y2={i * 50} />
          ))}
        </g>

        {/* Distance rings */}
        {[10, 20, 30].map((miles, i) => (
          <g key={miles} className="map-fade" style={{ transitionDelay: `${0.2 + i * 0.15}s` }}>
            <circle
              cx={dallas.x}
              cy={dallas.y}
              r={miles * MILE}
              fill="none"
              stroke="currentColor"
              strokeDasharray="2 5"
              className="text-ink/35"
            />
            <text
              x={dallas.x + miles * MILE * Math.SQRT1_2 - 6}
              y={dallas.y + miles * MILE * Math.SQRT1_2 - 6}
              textAnchor="end"
              className="fill-muted font-mono text-[11px] tracking-[0.12em]"
            >
              {miles} MI
            </text>
          </g>
        ))}

        {/* Trinity River */}
        <path
          d={trinity}
          pathLength={1}
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          className="map-draw text-concrete/60"
          style={{ transitionDuration: "2.2s" }}
        />

        {/* Highways */}
        {roads.map((d, i) => (
          <path
            key={i}
            d={d}
            pathLength={1}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            className="map-draw text-ink/45"
            style={{ transitionDelay: `${0.1 + i * 0.1}s` }}
          />
        ))}

        {/* Places */}
        {places.map((p, i) => {
          const { x, y } = project(p.lon, p.lat);
          const isDallas = p.name === "Dallas";
          const size = p.kind === "reference" ? 5 : isDallas ? 14 : 10;
          return (
            <g key={p.name} className="map-fade" style={{ transitionDelay: `${0.7 + i * 0.06}s` }}>
              {p.kind === "reference" ? (
                <circle cx={x} cy={y} r={size / 2} className="fill-ink/40" />
              ) : (
                <rect
                  x={x - size / 2}
                  y={y - size / 2}
                  width={size}
                  height={size}
                  className={isDallas ? "fill-accent" : p.kind === "primary" ? "fill-ink" : "fill-bone stroke-ink"}
                  strokeWidth={p.kind === "registered" ? 1.5 : 0}
                />
              )}
              {isDallas && (
                <rect
                  x={x - 13}
                  y={y - 13}
                  width={26}
                  height={26}
                  fill="none"
                  stroke="currentColor"
                  className="text-accent"
                />
              )}
              <text
                x={x + (p.dx ?? 12)}
                y={y + (p.dy ?? 4)}
                textAnchor={p.anchor ?? (p.name === "Fort Worth" ? "middle" : "start")}
                className={
                  p.kind === "reference"
                    ? "hidden fill-muted font-mono text-[12px] tracking-[0.1em] sm:inline"
                    : isDallas
                      ? "fill-ink font-display text-[24px] font-semibold tracking-[-0.01em]"
                      : "fill-ink font-display text-[19px] font-medium tracking-[-0.01em]"
                }
              >
                {p.kind === "reference" ? p.name.toUpperCase() : p.name}
              </text>
            </g>
          );
        })}
      </svg>

      <figcaption className="mt-6 flex flex-wrap gap-x-7 gap-y-3 label-mono text-muted">
        <span className="flex items-center gap-2.5">
          <span aria-hidden="true" className="inline-block size-2.5 bg-ink" />
          Primary area
        </span>
        <span className="flex items-center gap-2.5">
          <span aria-hidden="true" className="inline-block size-2.5 border-[1.5px] border-ink" />
          City registration on record
        </span>
        <span className="flex items-center gap-2.5">
          <span aria-hidden="true" className="inline-block size-1.5 rounded-full bg-ink/40" />
          Reference
        </span>
        <span>Schematic · not to scale</span>
      </figcaption>
    </figure>
  );
}
