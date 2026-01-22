import React from 'react'
import UserForm from './users/components/UserForm'
import { useAuth } from './auth/AuthProvider';
import { register } from 'module';

function RegisterPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <UserForm isNew={true} title={"Register"} onConfirm={registerUser}/>
              
    </div>
  )
}

export default RegisterPage