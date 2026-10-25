export function LogoMark({ small = false }: { small?: boolean }) {
  return (
    <svg
      className={small ? 'logo-mark logo-mark--small' : 'logo-mark'}
      viewBox="0 0 64 64"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="58" height="58" rx="20" fill="#a98ce8" />
      <path d="M19 28L16 12l14 9M41 18l5-12 5 16" fill="#fff7fc" stroke="#5c4778" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M37 17l6-14 5 16" fill="#f49ac1" stroke="#5c4778" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M18 30c0-10 8-17 18-17s17 7 17 17v12c0 8-6 13-14 13H27c-7 0-11-4-11-11V31z" fill="#fff7fc" stroke="#5c4778" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M19 27c-5 4-6 10-4 16 3-4 6-6 10-7" fill="#f49ac1" stroke="#5c4778" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="40" cy="32" r="2.4" fill="#5c4778" />
      <circle cx="41" cy="31" r="0.8" fill="#fff" />
      <path d="M39 44c3 2 6 2 8-1" fill="none" stroke="#5c4778" strokeWidth="2.3" strokeLinecap="round" />
      <circle cx="29" cy="41" r="3.5" fill="#ffc6de" />
    </svg>
  );
}
