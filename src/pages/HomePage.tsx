import { Link } from "react-router-dom";

function HomePage() {
  return (
    <main className='flex min-h-dvh w-full flex-col items-center justify-center gap-4 bg-gray-50 px-4 py-6'>
      <h1 className='text-2xl font-bold text-gray-900'>PPL — egzamin</h1>

      <div className='flex flex-col gap-3'>
        <Link to='/review' className='text-blue-600 underline'>
          Tryb przeglądania
        </Link>
        <Link to='/exam' className='text-blue-600 underline'>
          Tryb egzaminu
        </Link>
      </div>
    </main>
  );
}

export default HomePage;
