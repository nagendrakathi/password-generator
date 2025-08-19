import Generator from "./Generator";

function App() {
  return (
    <>
      <div className="w-full h-screen flex flex-col items-center bg-neutral-900">
        <h1 className="text-center text-2xl text-neutral-100 my-6">
          Password Generator
        </h1>
        <Generator />
      </div>
    </>
  );
}

export default App;
