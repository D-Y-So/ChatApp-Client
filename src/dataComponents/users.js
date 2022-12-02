import { useEffect, useState } from "react";
import { getAllRegisteredUsers } from "../Utilities/rest";
export function GetUsers()
{
    const [users, setUsers] = useState([]);
    const [newUsers, setnewUsers] = useState([]);
    const [lastUpdate, setLastUpdate] = useState();
    useEffect(()=>
    {
        async function init()
        {
            let usersFromApi=await getAllRegisteredUsers();
            console.log(usersFromApi);
            setUsers(usersFromApi);
            console.log(users)
            setLastUpdate(new Date());
        }
        init();
        const interval = setInterval(getUsers,5000);
        return () => clearInterval(interval);
    },[]);
    async function getUsers()
    {
        let usersFromApi=await getAllRegisteredUsers(lastUpdate);
        console.log(usersFromApi instanceof Array);
        if(usersFromApi.length>0) {
        setnewUsers(usersFromApi);
        console.log("new users: "+newUsers);
        setUsers((users) => [...users, usersFromApi]);
        }
    }
    
    return {users, newUsers};
}