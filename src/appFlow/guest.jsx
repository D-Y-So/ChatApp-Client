import { useState } from "react";
export function GuestLogin() {
    const [username, setUsername] = useState("");
    function handleSubmit(e)
    {

    }
    return (
        <div className="guest-login">
             <h2>login as a guest:</h2>
             <form className="login-form" onSubmit={handleSubmit}>
            <input class="form-inputs"></input>
            </form>
        </div>
    )

}