import React, { useState } from 'react';

const QuotesContext = React.createContext();

export const QuotesProvider = (props) => {

  const [quotes, setQuotes] = useState([]);
  const [quotesAndVendorsByCategory, setquotesAndVendorsByCategory] = useState([]);
  const [verifiedQuotes, setVerifiedQuotes] = useState([]);


  return (
    <QuotesContext.Provider value={{
      quotes, setQuotes, quotesAndVendorsByCategory, setquotesAndVendorsByCategory, verifiedQuotes, setVerifiedQuotes
    }}>
      {props.children}
    </QuotesContext.Provider>
  )
}
export default QuotesContext;