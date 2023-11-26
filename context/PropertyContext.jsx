import React, { useState } from 'react';

const PropertyContext = React.createContext();

export const PropertyProvider = (props) => {
  const [propertyContext, setPropertyContext] = useState()
  const [propertyIdContext, setPropertyIdContext] = useState()

  return (
    <PropertyContext.Provider value={{
      propertyContext,
      setPropertyContext,
      propertyIdContext,
      setPropertyIdContext
    }}>
      {props.children}
    </PropertyContext.Provider>
  )
}
export default PropertyContext;