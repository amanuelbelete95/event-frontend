import { LoaderFunction } from 'react-router-dom';
import UserList from '../components/users/components/UserList';
import { getAllUsers } from '../components/users/api/getAllUsers';

export const loader: LoaderFunction = async () => {
  try {
    const users = await getAllUsers();
    return users;
  } catch (error) {
    return Promise.reject(error)
  }
};

const UsersAdminList = () => {
    return <UserList isAdmin={true}/>
}
export default UsersAdminList;