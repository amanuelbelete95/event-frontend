import { useAuth } from '../../auth/AuthProvider';

function LogIn() {
    const context = useAuth();
    console.log("context", context)
  return (
    <div>LogIn</div>
  )
}

export default LogIn