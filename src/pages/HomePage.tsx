import ModeCard from "../components/ModeCard";

function HomePage() {
  return (
    <main className='flex min-h-dvh w-full items-center justify-center bg-gray-50 px-4 py-6'>
      <div className='flex w-full max-w-md flex-col gap-6'>
        <header className='text-center'>
          <h1 className='text-2xl font-bold text-gray-900'>PPL — egzamin</h1>
          <p className='mt-1 text-sm text-gray-500'>Wybierz tryb</p>
        </header>

        <div className='flex flex-col gap-4'>
          <ModeCard
            to='/review'
            title='Tryb przeglądania'
            description='Pytania w losowej kolejności z natychmiastową informacją zwrotną.'
          />
          <ModeCard
            to='/exam'
            title='Tryb egzaminu'
            description='Sprawdź się w warunkach zbliżonych do egzaminu.'
          />
        </div>
      </div>
    </main>
  );
}

export default HomePage;
