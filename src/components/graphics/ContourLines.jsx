export default function ContourLines({ className = "", opacity = 0.12, color = "currentColor" }) {
  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${/\btext-/.test(className) ? "" : "text-brand-light"} ${className}`}
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden="true"
    >
      {[
        "M-50,620 C150,560 300,680 500,600 C700,520 850,640 1050,580 C1150,550 1200,570 1250,560",
        "M-50,560 C160,500 320,620 520,540 C720,460 860,580 1060,520 C1160,490 1200,510 1250,500",
        "M-50,500 C170,440 340,560 540,480 C740,400 870,520 1070,460 C1170,430 1200,450 1250,440",
        "M-50,440 C180,380 360,500 560,420 C760,340 880,460 1080,400 C1180,370 1200,390 1250,380",
        "M-50,380 C190,320 380,440 580,360 C780,280 890,400 1090,340 C1190,310 1200,330 1250,320",
        "M-50,320 C200,260 400,380 600,300 C800,220 900,340 1100,280 C1195,250 1200,270 1250,260",
      ].map((d, i) => (
        <path
          key={i}
          d={d}
          stroke={color}
          strokeWidth="1.25"
          opacity={opacity * (1 - i * 0.08)}
        />
      ))}
    </svg>
  );
}
