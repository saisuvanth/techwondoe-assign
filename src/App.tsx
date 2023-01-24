import React from 'react';
import './App.css';
import Home from './components/Home';

const headers = ['General', 'Users', 'Plan', 'Billing', 'Integrations'];

function App() {
  return (
    <div className="w-full flex flex-col items-center pt-4 px-16">
      <h1 className="text-2xl font-semibold text-left w-full">
        Company Settings
      </h1>
      <div className="flex py-8 w-full">
        {headers.map((head, ind) => (
          <div key={ind}>
            <div
              className={
                'border bg-white-500 p-1 px-2 shadow hover:cursor-pointer ' +
                (ind === 0
                  ? 'rounded-l-md'
                  : ind === headers.length - 1
                  ? 'rounded-r-md'
                  : '')
              }
            >
              {head}
            </div>
          </div>
        ))}
      </div>
      <Home />
    </div>
  );
}

export default App;
