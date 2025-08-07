import { toast } from 'react-toastify';

const Home = () => {
  return (
    <main className="flex w-full flex-col items-center justify-center">
      <div className="flex h-screen w-full flex-col items-center justify-center gap-5 text-center text-white">
        Welcome to the Home Page
        <button
          className="cursor-pointer rounded-md bg-white p-2 text-black"
          onClick={() => toast.success('Hello')}
        >
          Click me
        </button>
        <button
          className="cursor-pointer rounded-md bg-white p-2 text-black"
          onClick={() => toast.error('Error')}
        >
          Click me
        </button>
      </div>
    </main>
  );
};

export default Home;
