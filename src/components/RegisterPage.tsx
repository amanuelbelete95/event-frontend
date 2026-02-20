import UserForm from './users/components/UserForm';

function RegisterPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <UserForm isNew={true} title={"Register"} onConfirm={undefined} />
    </div>
  )
}

export default RegisterPage