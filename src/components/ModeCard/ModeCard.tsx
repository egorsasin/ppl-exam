import { Link } from "react-router-dom";

import type { ModeCardProps } from "./ModeCard.types";

function ModeCard({ to, title, description }: ModeCardProps) {
  return (
    <Link
      to={to}
      className='group flex items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-blue-400 hover:shadow-md'
    >
      <span className='flex flex-col gap-1'>
        <span className='text-lg font-semibold text-gray-900'>{title}</span>
        <span className='text-sm text-gray-500'>{description}</span>
      </span>

      <svg
        className='h-5 w-5 shrink-0 text-gray-400 transition group-hover:text-blue-500'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
      >
        <path d='M9 6l6 6-6 6' strokeLinecap='round' strokeLinejoin='round' />
      </svg>
    </Link>
  );
}

export default ModeCard;
