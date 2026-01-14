import React from 'react'

const Container = ({children, className}) => {
  return (
    <div className={`max-w-[1400px] px-7 lg:px-0 m-auto ${className}`}>
    {children}
    </div>
  )
}

export default Container
