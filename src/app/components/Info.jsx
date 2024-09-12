import React from 'react'

const Info = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center" role="alert">
        <h2 className="display-3">
          An email has been sent to your email address
        </h2>
        <p className="mb-4 lead fs-3">Please check your inbox for further instructions</p>
      </div>
    </div>
  )
}

export default Info;
