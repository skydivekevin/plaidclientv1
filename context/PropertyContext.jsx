import React, { useState } from 'react';

const PropertyContext = React.createContext();

export const PropertyProvider = (props)=> {
  const [property, setProperty] = useState()

  return(
    <PropertyContext.Provider value={{
      property, setProperty
    }}>
      {props.children}
    </PropertyContext.Provider>
  )
}
export default PropertyContext;