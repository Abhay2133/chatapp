const { roomName } = window;
const chatSocket = new WebSocket(
  `ws://${window.location.host}/ws/chat/${roomName}/`
);

chatSocket.onmessage = function (e) {
  const data = JSON.parse(e.data);
  const chatLog = document.getElementById('chat-log');
  chatLog.innerHTML += `<div>${data.message}</div>`;
};

chatSocket.onclose = function (e) {
  console.error('Chat socket closed unexpectedly');
};

document.getElementById('chat-message-input').focus();
document.getElementById('chat-message-input').onkeyup = function (e) {
  if (e.keyCode === 13) {
    document.getElementById('chat-message-submit').click();
  }
};

document.getElementById('chat-message-submit').onclick = function (e) {
  const messageInputDom = document.getElementById('chat-message-input');
  const message = messageInputDom.value;
  chatSocket.send(JSON.stringify({
    'message': message
  }));
  messageInputDom.value = '';
};

let sidebarOpen = true;
const sidebar = document.getElementById("sidebar")
const sidebarTrigger = document.getElementById("sidebar-trigger")
sidebarTrigger.addEventListener('click', e => {
  if (sidebarOpen) {
    sidebarOpen = false;
    sidebar.style.width = 0;
  } else {
    sidebar.style.width = "350px";
    sidebarOpen = true;
  }
})

const userlist = document.getElementById("user-list")
userlist.style.maxHeight = window.innerHeight - 55 + "px"


// for ui overflow testing

// for (let i = 0; i < 500; i++) {
//   const a = document.getElementById('chat-log')
//   a.append(a.children[0].cloneNode(true))
// }

