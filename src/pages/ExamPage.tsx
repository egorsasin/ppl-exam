import { Link } from "react-router-dom";

function ExamPage() {
  return (
    <main className='flex min-h-dvh w-full flex-col items-center justify-center gap-4 bg-gray-50 px-4 py-6'>
      <h1 className='text-2xl font-bold text-gray-900'>Tryb egzaminu</h1>
      <p className='text-gray-600'>Wkrótce dostępny.</p>

      <Link to='/' className='text-blue-600 underline'>
        Powrót
      </Link>
    </main>
  );
}

export default ExamPage;
