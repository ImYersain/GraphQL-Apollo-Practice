import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import './App.css';
import { CREATE_USER } from './mutations/user';
import { GET_ALL_USERS, GET_ONE_USER } from './query/user';

function App() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [age, setAge] = useState(0);

  const {data, loading, error , refetch} = useQuery(GET_ALL_USERS);
  // const {data: oneUser, loading: oneUserLoading} = useQuery(GET_ONE_USER, {    ------get oneUser by id---------
  //   variables: {
  //     id: 1
  //   }
  // });
  
  const [newUser] = useMutation(CREATE_USER);

  const addUser = async (e) => {
    e.preventDefault();
    try {
      const {data} = await newUser({
        variables: {
          input: {
            username, age
          }
        }
      })
      //setUsers([...users, data.createUser])
      
      setUsername('');
      setAge(0);
    } catch (error) {
      console.error(error);
    }
  }

  const getAll = (e) => {
    e.preventDefault();
    refetch();
  }

  useEffect(() => {
    if(!loading) {
      setUsers(data.getAllUsers) 
    }
    if(error) {
      alert('Error with request')
    }
  }, [data, loading, error]);

  if(loading) {
    return <h1>Loading...</h1>
  }

  return (
    <div>
      <form>
        <input type='text' value={username} onChange={e => setUsername(e.target.value)} />
        <input type='number' value={age} onChange={e => setAge(+e.target.value)} />
          <div className='btns'>
            <button onClick={(e) => addUser(e)}>Create</button>
            <button onClick={(e) => getAll(e)}>Get</button>
          </div>
      </form>

      <div>
        {users.map((user) => <div className='user'>{user.id}. {user.username} {user.age}</div>
          )}
      </div>
    </div>
  );
}

export default App;
