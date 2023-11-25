import React, { useState } from 'react';

const QuotesContext = React.createContext();

export const QuotesProvider = (props) => {

  const [quotes, setQuotes] = useState([]);
  const [quotesAndVendorsByCategory, setquotesAndVendorsByCategory] = useState([]);
  const [verifiedQuotes, setVerifiedQuotes] = useState([]);
  const [provisionalQuotes, setProvisionalQuotes] = useState([])
  const [quotesByVendor, setQuotesByVendor] = useState([])


  return (
    <QuotesContext.Provider value={{
      quotes, setQuotes, quotesAndVendorsByCategory, setquotesAndVendorsByCategory, verifiedQuotes, setVerifiedQuotes, provisionalQuotes, setProvisionalQuotes, quotesByVendor, setQuotesByVendor
    }}>
      {props.children}
    </QuotesContext.Provider>
  )
}
export default QuotesContext;