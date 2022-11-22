import { serverAddress } from "./constants"

const createUser = (user) => {
    fetch(serverAddress + "/user", {
      method: 'POST',
      body: JSON.stringify({ name: user.name, email: user.email, password: user.password }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
  const sendPublicMessage = (userid, message) => {
  fetch(serverAddress + "/MainRoom/Send", {
    method: 'POST',
    body: message,
    headers: {
      'Content-Type': 'text/plain',
      'from': userid
    }})
}

export{createUser, sendPublicMessage as sendPlainMessage}