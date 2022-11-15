import $ from 'jquery'
import { createUser } from './rest';
import { openConnection, sendPlainMessage } from './sockets';
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
    sendPlainMessage("MyUser", $('#message-input').val())
  })


  var input = $('#message-input');
  input.on("keydown mousedown", ()=> {
    console.log("Current position: " + input.prop("selectionStart"));
    console.log("Current position: " + input.prop("selectionEnd"));

  });
  input.on('keydown', (event) => {
    var key = event.keyCode || event.charCode;

    if (key == 8 || key == 46) {
      console.log("deleting: " + input.val().substring(input.prop("selectionStart"),
      input.prop("selectionEnd")));
    }
  });
})
openConnection();
