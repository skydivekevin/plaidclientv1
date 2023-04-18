import React, { useState } from 'react';

const QuotesContext = React.createContext();

export const QuotesProvider = (props)=> {
  const [quotes, setQuotes] = useState([])

  return(
    <QuotesContext.Provider value={{
      quotes, setQuotes
    }}>
      {props.children}
    </QuotesContext.Provider>
  )
}
export default QuotesContext;