import React, { useState } from 'react';

const QuotesContext = React.createContext();

export const QuotesProvider = (props)=> {
  const [quotes, setQuotes] = useState([])
  const [provisionalQuotesContext, setProvisionalQuotesContext] = useState([])

  return(
    <QuotesContext.Provider value={{
      quotes, setQuotes, provisionalQuotesContext, setProvisionalQuotesContext
    }}>
      {props.children}
    </QuotesContext.Provider>
  )
}
export default QuotesContext;