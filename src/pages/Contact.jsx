import React from 'react'

const Contact = () => {
    useEffect(() => {
  throw new Error('Test error from Home page!');
}, []);
  return (
    <div>
      <h1>I am contact page</h1>
       
    </div>
  )
}

export default Contact
