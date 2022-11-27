import $ from 'jquery'
import { createUser,sendPublicMessage} from './rest';
import { openConnection } from './sockets';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
$(() => {
  $(document).on('submit', () => {
    const user = {
      email: $('#emailInput').val(),
      name: $('#userInput').val(),
      password: $('#passwordInput').val()
    }
    createUser(user);
  })

  $("#send-btn").on("click", () => {
    console.log("send btn clicked");
    const message = $("#message-input").val();
    console.log(message);
    sendPublicMessage(1, message);
    console.log("message sent");
  })

})
openConnection();
