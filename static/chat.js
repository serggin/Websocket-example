const ws_port = 8081;

const username = document.getElementById("name").value;

const socket = new WebSocket(`ws://localhost:${ws_port}`);

if (socket) {
  socket.onerror = () => {
    console.error;
  };

  socket.onopen = () => {
    socket.send(JSON.stringify({ type: "join", name: username }));
  };

  socket.onmessage = (message) => {
    //console.log("onmessage", message);
    const data = JSON.parse(message.data);

    switch (data.type) {
      case "join":
        document.querySelector("#users").innerHTML = "";
        data.names.forEach((name) => {
          const element = document.createElement("div");
          element.innerText = name;
          document.getElementById("users").appendChild(element);
        });
        break;
      case "msg":
        const element = document.createElement("div");
        element.innerText = `${data.name}: ${data.msg}`;
        document.getElementById("messages").appendChild(element);
        break;
    }
  };

  document.getElementById("sendBtn").addEventListener("click", (clickEvent) => {
    clickEvent.preventDefault();
    const msg = document.getElementById("msg").value;

    socket.send(`{"type": "msg", "name": "${username}", "msg": "${msg}"}`);
    document.getElementById("msg").value = "";
  });
}
