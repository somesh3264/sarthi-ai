export default function ServiceEcosystem({ hub, items }) {
  const radius = 42;
  const count = items.length;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden="true">
        {items.map((_, i) => {
          const angle = (i / count) * 2 * Math.PI - Math.PI / 2;
          const x = 50 + radius * Math.cos(angle);
          const y = 50 + radius * Math.sin(angle);
          return (
            <line
              key={i}
              x1="50"
              y1="50"
              x2={x}
              y2={y}
              stroke="currentColor"
              className="text-brand-light"
              strokeWidth="0.4"
              opacity="0.4"
            />
          );
        })}
        <circle cx="50" cy="50" r="16" fill="currentColor" className="text-ink" />
      </svg>

      <div className="absolute left-1/2 top-1/2 flex h-[32%] w-[32%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ink px-3 text-center">
        <span className="font-heading text-xs font-semibold leading-tight text-white sm:text-sm">
          {hub}
        </span>
      </div>

      {items.map((item, i) => {
        const angle = (i / count) * 2 * Math.PI - Math.PI / 2;
        const x = 50 + radius * Math.cos(angle);
        const y = 50 + radius * Math.sin(angle);
        return (
          <div
            key={item}
            className="absolute flex w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 text-center sm:w-28"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <span className="h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-accent/15" />
            <span className="text-[11px] font-medium leading-snug text-graphite sm:text-xs">
              {item}
            </span>
          </div>
        );
      })}
    </div>
  );
}
