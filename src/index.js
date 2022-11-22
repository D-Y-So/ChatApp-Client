import $ from 'jquery'
import { createUser,sendPlainMessage } from './rest';
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
    sendPlainMessage(1, $('#message-input').val())
  })

})
openConnection();
