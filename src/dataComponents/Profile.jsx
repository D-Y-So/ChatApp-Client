import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { serverAddress } from "./../Utilities/constants";

// import { useAuth } from "../../contexts/AuthContext";
// import { generateAvatar } from "../../utils/GenerateAvatar";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Profile() {
  const navigate = useNavigate();

  //const [username, setUsername] = useState("");
  //const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState(""); //check if i should upload the image or not

  //const { currentUser, updateUserProfile, setError } = useAuth();

//   useEffect(() => {
//     const fetchData = () => {
//       const res = generateAvatar();
//       setAvatars(res);
//     };

//     fetchData();
//   }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // if (selectedAvatar === undefined) {
    //   return setError("Please select an avatar");
    // }
    // need to fix this - maybe first load the profile and then update
    try {

      let token = localStorage.getItem("token");
      let res = await fetch(serverAddress + "/auth/profile/edit", {
          method:'PUT',
          body: JSON.stringify({
              firstName: firstName,
              lastName: lastName,
              dateOfBirth: dateOfBirth,
              description: description, 
              imageUrl: imageUrl
          }),
          headers:{
              'Content-Type': 'application/json',
              'Authorization' : token
          }
      });
      let resJson = await res.text();
      console.log(resJson);

      //setError("");
      //setUsername("");
      //setEmail("");
      setFirstName("");
      setLastName("");
      setDateOfBirth("");
      setDescription("");
      setImageUrl("");
      //setLoading(true);
      if(res.ok){
        console.log("ok");
        // need to switch form 
    } else {
        window.alert("could not update profile " + resJson);
    }
    //   const user = currentUser;
    //   const profile = {
    //     displayName: username,
    //     photoURL: avatars[selectedAvatar],
    //   };
    //   await updateUserProfile(user, profile);
    //   navigate("/");
    } catch (e) {
      //setError("Failed to update profile");
    }

    //setLoading(false);
  };

  return (
    // <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    //   <div className="max-w-md w-full space-y-8">
    //     <div className="text-center">
    //       <h2 className="mt-4 text-3xl text-center tracking-tight font-light dark:text-white">
    //         Pick an avatar
    //       </h2>
    //     </div>
        <form className="space-y-6" onSubmit={handleFormSubmit}>
          {/* <div className="flex flex-wrap -m-1 md:-m-2">
            {avatars.map((avatar, index) => (
              <div key={index} className="flex flex-wrap w-1/3">
                <div className="w-full p-1 md:p-2">
                  <img
                    alt="gallery"
                    className={classNames(
                      index === selectedAvatar
                        ? "border-4  border-blue-700 dark:border-blue-700"
                        : "cursor-pointer hover:border-4 hover:border-blue-700",
                      "block object-cover object-center w-36 h-36 rounded-full"
                    )}
                    src={avatar}
                    onClick={() => setSelectedAvatar(index)}
                  />
                </div>
              </div>
            ))} */}
          {/* </div> */}

          <div className="rounded-md shadow-sm -space-y-px">
            {/* <input
              id="username"
              name="username"
              type="text"
              //autoComplete="username"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 placeholder-gray-500 rounded-t-md bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Enter a Display Name"
              // defaultValue={currentUser.displayName && currentUser.displayName} add that the default value will be loaded from the current user profile 
              onChange={(e) => setUsername(e.target.value)}
            /> */}
            {/* <input
              id="email"
              name="email"
              type="text"
              //autoComplete="email"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 placeholder-gray-500 rounded-t-md bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Enter an email"
              // defaultValue={currentUser.displayName && currentUser.displayName} add that the default value will be loaded from the current user profile 
              onChange={(e) => setEmail(e.target.value)}
            /> */}
            <input
              id="firstName"
              name="firstName"
              type="text"
              //autoComplete="firstName"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 placeholder-gray-500 rounded-t-md bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Enter an first name"
              // defaultValue={currentUser.displayName && currentUser.displayName} add that the default value will be loaded from the current user profile 
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              id="lastName"
              name="lastName"
              type="text"
              //autoComplete="lastName"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 placeholder-gray-500 rounded-t-md bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Enter an last name"
              // defaultValue={currentUser.displayName && currentUser.displayName} add that the default value will be loaded from the current user profile 
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              id="dateOfBirth"
              name="dateOfBirth"
              type="date"
              //autoComplete="dateOfBirth"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 placeholder-gray-500 rounded-t-md bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Enter date of birth"
              // defaultValue={currentUser.displayName && currentUser.displayName} add that the default value will be loaded from the current user profile 
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
            <input
              id="description"
              name="description"
              type="text"
              autoComplete="description"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 placeholder-gray-500 rounded-t-md bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Enter description"
              // defaultValue={currentUser.displayName && currentUser.displayName} add that the default value will be loaded from the current user profile 
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              id="imageUrl"
              name="imageUrl"
              type="text"
              //autoComplete="imageUrl"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 placeholder-gray-500 rounded-t-md bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Enter image url"
              // defaultValue={currentUser.displayName && currentUser.displayName} add that the default value will be loaded from the current user profile 
              onChange={(e) => setDescription(e.target.value)}
            />


          </div>
          <div>
            <button
              type="submit"
              //disabled={loading}
              className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Update Profile
            </button>
          </div>
        </form>
    //   </div>
    // </div>
  );
}