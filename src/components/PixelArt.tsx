export function LogoMark({ small = false }: { small?: boolean }) {
  return (
    <svg
      className={small ? 'logo-mark logo-mark--small' : 'logo-mark'}
      viewBox="0 0 64 64"
      aria-hidden="true"
      shapeRendering="crispEdges"
    >
      <rect x="3" y="3" width="58" height="58" rx="13" fill="#ffd84d" stroke="#17324d" strokeWidth="4" />
      <path
        d="M29 9h8v10h9v8h10v10H46v8h-9v10h-8V45h-9v-8H9V27h11v-8h9z"
        fill="#fffaf0"
        stroke="#17324d"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <rect x="24" y="27" width="5" height="7" rx="1" fill="#17324d" />
      <rect x="36" y="27" width="5" height="7" rx="1" fill="#17324d" />
      <path d="M28 38h9" stroke="#17324d" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function PixelBuddy() {
  return (
    <svg
      className="pixel-buddy"
      viewBox="0 0 140 126"
      aria-hidden="true"
      shapeRendering="crispEdges"
    >
      <g stroke="#17324d" strokeWidth="4" strokeLinejoin="round">
        <path d="M57 6h26v12h12v12h12v12h18v26h-18v12H95v12H83v20H57V92H45V80H33V68H15V42h18V30h12V18h12z" fill="#ffd84d" />
        <path d="M57 6h26v12H57z" fill="#fff2a6" stroke="none" />
        <path d="M23 43h20v17H23zM97 43h20v17H97z" fill="#ffc83d" stroke="none" />
        <path d="M46 100h20v16H42v-8h4zM75 100h20v8h4v8H75z" fill="#4d91df" />
      </g>
      <rect x="49" y="47" width="9" height="13" rx="2" fill="#17324d" />
      <rect x="82" y="47" width="9" height="13" rx="2" fill="#17324d" />
      <rect x="51" y="48" width="3" height="4" fill="white" />
      <rect x="84" y="48" width="3" height="4" fill="white" />
      <path d="M60 70h7v5h7v-5h7" fill="none" stroke="#17324d" strokeWidth="4" strokeLinecap="square" />
      <rect x="36" y="63" width="10" height="6" rx="2" fill="#f49a75" />
      <rect x="94" y="63" width="10" height="6" rx="2" fill="#f49a75" />
      <path d="M17 21h8v8h-8zM113 15h6v6h-6zM121 91h8v8h-8z" fill="#fff9df" />
    </svg>
  );
}

export function PixelTrophy() {
  return (
    <svg
      className="pixel-trophy"
      viewBox="0 0 120 116"
      aria-hidden="true"
      shapeRendering="crispEdges"
    >
      <g stroke="#17324d" strokeWidth="4" strokeLinejoin="round">
        <path d="M30 10h60v48H78v16H66v12h24v20H30V86h24V74H42V58H30z" fill="#ffd84d" />
        <path d="M30 22H12v28h8v12h22V50H30zM90 22h18v28h-8v12H78V50h12z" fill="#ffbf3f" />
        <path d="M42 18h36v10H42z" fill="#fff2a6" stroke="none" />
        <path d="M30 96h60v10H30z" fill="#f29c38" />
      </g>
      <path d="M60 25l6 11 12 2-9 9 2 12-11-6-11 6 2-12-9-9 12-2z" fill="#fff9e9" stroke="#17324d" strokeWidth="3" strokeLinejoin="round" />
    </svg>
  );
}
