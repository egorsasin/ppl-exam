import type { QuestionMapProps } from "./QuestionMap.types";
import { getTileClass } from "./QuestionMap.utils";

function QuestionMap({ statuses, currentIndex }: QuestionMapProps) {
  return (
    <aside className='w-full shrink-0 lg:sticky lg:top-6 lg:w-72'>
      <div className='rounded-2xl border border-gray-200 bg-white p-4 shadow-sm'>
        <h2 className='mb-3 text-sm font-semibold text-gray-700'>Pytania</h2>

        <div className='p-2 flex max-h-[40vh] flex-wrap gap-1.5 overflow-y-auto lg:max-h-[calc(100dvh-9rem)]'>
          {statuses.map((status, index) => (
            <div
              key={index}
              className={getTileClass(status, index === currentIndex)}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default QuestionMap;
