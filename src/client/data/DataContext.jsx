import React, { createContext, useState } from 'react';

// passing in dataContext to the App to render them 
// then it gets triggle

const DataContext = createContext();

export const DataProvider = ({ data }) => {
  const [lent, setLent] = useState(0);
  const [borrowed, setBorrowed] = useState(0);

  console.log('data -->' , data)

  return (
    <DataContext.Provider value={{ lent, borrowed, setLent, setBorrowed }}>
      {data}
    </DataContext.Provider>
  );
};

export default DataContext;
