import React from 'react';
import { useNavigate } from 'react-router-dom';

function Request() {
  const navigate = useNavigate();
  return (
    <div>
      <div className='conformation-container'>
        <h2>Thank you!</h2>
        <p> We have recieved your request!</p>
        <p>
          In mean time our team will look at your request get back to you soon
          with a response!
        </p>

        <div>
          <button onClick={() => navigate(-1)}>GetBack </button>
        </div>
      </div>
    </div>
  );
}

export default Request;
