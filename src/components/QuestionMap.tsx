import type { QuestionMapProps } from "./QuestionMap.types";
import { getTileClass } from "./QuestionMap.utils";

function QuestionMap({ statuses, currentIndex, open, onClose }: QuestionMapProps) {
  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-30 bg-black/30 transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed top-0 right-0 z-40 flex h-dvh w-72 max-w-[80vw] flex-col bg-white shadow-xl transition-transform ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className='flex items-center justify-between border-b border-gray-200 p-4'>
          <h2 className='text-sm font-semibold text-gray-700'>Pytania</h2>
          <button
            type='button'
            onClick={onClose}
            aria-label='Zamknij'
            className='cursor-pointer rounded-md p-1 text-gray-500 hover:bg-gray-100'
          >
            <svg
              className='h-5 w-5'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
            >
              <path d='M6 6l12 12M18 6L6 18' strokeLinecap='round' />
            </svg>
          </button>
        </div>

        <div className='flex flex-wrap gap-1.5 overflow-y-auto p-4'>
          {statuses.map((status, index) => (
            <div
              key={index}
              className={getTileClass(status, index === currentIndex)}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </aside>
    </>
  );
}

export default QuestionMap;
