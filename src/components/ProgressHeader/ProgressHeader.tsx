import type { ProgressHeaderProps } from "./ProgressHeader.types";

function ProgressHeader({ current, total, correct }: ProgressHeaderProps) {
  const percent = Math.round((current / total) * 100);

  return (
    <header className='flex flex-col gap-2'>
      <div className='flex items-center justify-between text-sm text-gray-500'>
        <span>
          Pytanie {current} / {total}
        </span>
        <span>Poprawne: {correct}</span>
      </div>

      <div className='h-1.5 w-full overflow-hidden rounded-full bg-gray-200'>
        <div
          className='h-full rounded-full bg-blue-600 transition-all'
          style={{ width: `${percent}%` }}
        />
      </div>
    </header>
  );
}

export default ProgressHeader;
