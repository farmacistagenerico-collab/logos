import type { CSSProperties, ReactNode } from 'react';
import type { Unicorn } from '../data';

const PART_COUNT = 8;
const ink = '#5b4774';

interface BlockUnicornProps {
  unicorn: Unicorn;
  blocks: number;
  totalBlocks: number;
  className?: string;
}

function Accessory({ unicorn }: { unicorn: Unicorn }) {
  if (unicorn.accessory === 'heart') {
    return <path d="M82 103c-20-12-20-27-9-29 6-1 9 3 9 3s3-4 9-3c11 2 11 17-9 29z" fill={unicorn.accent} />;
  }
  if (unicorn.accessory === 'crown') {
    return <path d="M62 79l8 8 12-13 12 13 8-8-4 25H66z" fill={unicorn.accent} />;
  }
  if (unicorn.accessory === 'moon') {
    return <path d="M93 75c-19-5-31 8-25 22 5 12 20 13 29 4-15 2-20-17-4-26z" fill={unicorn.accent} />;
  }
  return <path d="M82 73l7 12 14 2-10 10 3 14-14-7-13 7 2-14-10-10 14-2z" fill={unicorn.accent} />;
}

export default function BlockUnicorn({
  unicorn,
  blocks,
  totalBlocks,
  className = '',
}: BlockUnicornProps) {
  const visibleParts = blocks <= 0
    ? 0
    : blocks >= totalBlocks
      ? PART_COUNT
      : Math.max(1, Math.floor((blocks / totalBlocks) * PART_COUNT));

  const parts: ReactNode[] = [
    <>
      <path d="M53 107h25v40H49v-12h4zM111 107h25v40h-29v-12h4z" fill={unicorn.body} />
      <path d="M49 135h29v12H49zM107 135h29v12h-29z" fill={unicorn.accent} />
      <path d="M57 113h10M115 113h10" stroke={unicorn.bodyLight} strokeWidth="5" />
    </>,
    <>
      <path d="M42 65h94v59H42z" fill={unicorn.body} />
      <path d="M53 57h20v8H53zM94 57h20v8H94z" fill={unicorn.bodyLight} />
      <path d="M52 75h42v10H52z" fill={unicorn.bodyLight} opacity="0.55" />
      <path d="M49 115h80" stroke={unicorn.bodyLight} strokeWidth="4" opacity="0.5" />
    </>,
    <>
      <path d="M116 43h34v64h-34z" fill={unicorn.body} />
      <path d="M121 36h18v7h-18z" fill={unicorn.bodyLight} />
      <path d="M124 55h9v36h-9z" fill={unicorn.bodyLight} opacity="0.45" />
    </>,
    <>
      <path d="M128 23h49v46h-49z" fill={unicorn.body} />
      <path d="M165 43h25v26h-25z" fill={unicorn.bodyLight} />
      <path d="M137 16h18v7h-18z" fill={unicorn.bodyLight} />
      <rect x="153" y="36" width="7" height="9" rx="2" fill={ink} stroke="none" />
      <rect x="154" y="37" width="2" height="3" fill="white" stroke="none" />
      <path d="M174 56h7" fill="none" strokeWidth="3" />
      <rect x="166" y="51" width="5" height="4" rx="1" fill="#f092a6" stroke="none" />
    </>,
    <>
      <path d="M42 72H29V61H17v31h12v17h13V96h8V82h-8z" fill={unicorn.mane} />
      <path d="M21 68h13M24 91h13" stroke={unicorn.accent} strokeWidth="5" />
    </>,
    <>
      <path d="M121 31h14v17h-14zM114 48h15v17h-15zM108 65h15v17h-15zM102 82h15v17h-15z" fill={unicorn.mane} />
      <path d="M127 24h13v12h-13z" fill={unicorn.mane} />
      <path d="M115 52h6M109 69h6M103 86h6" stroke={unicorn.accent} strokeWidth="4" />
    </>,
    <>
      <path d="M145 23l9-21 11 21z" fill={unicorn.accent} />
      <path d="M151 13h10" stroke={unicorn.bodyLight} strokeWidth="3" />
    </>,
    <Accessory unicorn={unicorn} />,
  ];

  return (
    <svg
      className={`block-unicorn ${className}`}
      viewBox="0 0 210 170"
      role="img"
      aria-label={`${unicorn.name}: ${blocks} mattoncini su ${totalBlocks}`}
    >
      <g stroke={ink} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
        {parts.map((part, index) => (
          <g
            className={`unicorn-part${index < visibleParts ? ' is-built' : ' is-missing'}`}
            key={index}
            style={{ '--part-index': index } as CSSProperties}
          >
            {part}
          </g>
        ))}
      </g>
    </svg>
  );
}
