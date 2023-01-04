import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { serverAddress } from "../Utilities/constants";
import {getOtherProfileByUsername} from "../Utilities/rest";

export default function OtherProfile({user}){

    const [profile, setProfile] = useState([]);

    useEffect(() => {
        async function init() {
            let res = await getOtherProfileByUsername(user);
            setProfile(res)
            console.log(res);
        }
        init();      
    },[]); 

    return(
        <div>
            { profile !== null ? 
                <div>
                    <ul className="other-user-profile">
                        <li ><img className="other-profile-img" src={profile.imageUrl}></img></li>
                        <li>Username: {profile.username}</li>
                        <li>Email: {profile.email}</li>
                        <li>First Name: {profile.firstName}</li>
                        <li>Last Name: {profile.lastName}</li>
                        <li>Description: {profile.description}</li>
                        <li>Date Of Birth: {profile.dateOfBirth}</li>
                    </ul>
                </div> : <div> can not load profile</div>
            }
            
        </div>
    )
}