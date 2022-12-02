import { useEffect, useState } from "react";
import { getAllRegisteredUsers } from "../Utilities/rest";
export function GetUsers()
{
    const [users, setUsers] = useState([]);
    const [newUsers, setnewUsers] = useState([]);
    const [lastUpdate, setLastUpdate] = useState('');
    useEffect(()=>
    {
        async function init()
        {
            let usersFromApi=await getAllRegisteredUsers();
            setUsers(usersFromApi);
            setLastUpdate(Date());
        }
        const interval = setInterval(getUsers,1000);
        return () => clearInterval(interval);
    },[]);
    async function getUsers()
    {
        let usersFromApi=await getAllRegisteredUsers(lastUpdate);
        console.log(usersFromApi instanceof Array);
        usersFromApi.forEach(element => {
           if(!users.includes(element))
           {
               setnewUsers((users) => [...users, element]);
           }
        });
        setUsers(usersFromApi);
    }
    
    return {users, newUsers};
}