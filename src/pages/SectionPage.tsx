import { Link, Navigate, useParams } from "react-router-dom";

import ModeCard from "../components/ModeCard";
import { getSectionById } from "../config/sections";

function SectionPage() {
  const { sectionId } = useParams<{ sectionId: string }>();
  const section = getSectionById(sectionId ?? "");

  if (!section) {
    return <Navigate to='/' replace />;
  }

  return (
    <main className='flex min-h-dvh w-full items-center justify-center bg-gray-50 px-4 py-6'>
      <div className='flex w-full max-w-md flex-col gap-6'>
        <div className='self-start'>
          <Link
            to='/'
            aria-label='Strona główna'
            className='inline-flex cursor-pointer rounded-xl border border-gray-200 bg-white p-2.5 text-gray-700 shadow-sm hover:bg-gray-50'
          >
            <svg
              className='h-5 w-5'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
            >
              <path
                d='M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </Link>
        </div>

        <header className='text-center'>
          <h1 className='text-2xl font-bold text-gray-900'>{section.title}</h1>
          <p className='mt-1 text-sm text-gray-500'>Wybierz tryb</p>
        </header>

        <div className='flex flex-col gap-4'>
          <ModeCard
            to={`/${section.id}/review`}
            title='Tryb przeglądania'
            description='Pytania w losowej kolejności z natychmiastową informacją zwrotną.'
          />
          <ModeCard
            to={`/${section.id}/exam`}
            title='Tryb egzaminu'
            description='Sprawdź się w warunkach zbliżonych do egzaminu.'
          />
        </div>
      </div>
    </main>
  );
}

export default SectionPage;
