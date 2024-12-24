// If you want to use Phoenix channels, run `mix help phx.gen.channel`
// to get started and then uncomment the line below.
// import "./user_socket.js"

// You can include dependencies in two ways.
//
// The simplest option is to put them in assets/vendor and
// import them using relative paths:
//
//     import "../vendor/some-package.js"
//
// Alternatively, you can `npm install some-package --prefix assets` and import
// them using a path starting with the package name:
//
//     import "some-package"
//

// Include phoenix_html to handle method=PUT/DELETE in forms and buttons.
import "phoenix_html"
// Establish Phoenix Socket and LiveView configuration.
import { Socket } from "phoenix"
import { LiveSocket } from "phoenix_live_view"
import topbar from "../vendor/topbar"

let Hooks = {}
Hooks.StreamPageContent = {
  mounted() {
    this.prevCommands = [];
    this.prevCommandsIndex = 0;
    this.prevContent = "";
    this.timeoutId = null;
    this.streamContent();
  },
  updated() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.streamContent();
  },
  streamContent() {
    window.removeEventListener("keydown", this.handleKey);
    this.handleKey = this.handleKey.bind(this);
    let content = this.el.textContent;
    this.el.innerHTML = "";
    this.el.style.display = "block";
    let index = 0;

    this.el.innerHTML = this.prevContent || "";

    if (this.prevContent.length > 0) {
      content = "\n \n" + content;
    }

    const revealNextChar = () => {
      if (index < content.length - 21) {
        if (content[index] === '\n') {
          this.el.innerHTML += '<br>';
          this.prevContent += '<br>';
        } else {
          this.el.innerHTML += content[index];
          this.prevContent += content[index];
        }
        index++;
        this.timeoutId = setTimeout(revealNextChar, Math.random() * (50 - content.length / 8));
      } else {
        this.handleFinish();
      }
    };

    revealNextChar();
  },

  handleKey(e) {
    const key = e.key;

    if (key === "Backspace") {
      if (this.maxBackspace == 0) {
        return;
      }

      this.prevContent = this.prevContent.slice(0, -1);
      this.el.innerHTML = this.prevContent;
      this.maxBackspace--;
      return;
    }

    if (key === "Enter") {
      const command = this.prevContent.slice(this.prevContent.length - this.maxBackspace, this.prevContent.length);
      if (command.length === 0) {
        return;
      }

      this.prevCommands.push(command)
      this.prevCommandsIndex = 0;
      this.pushEvent("submit_command", { command: command });
    }

    if (key === "ArrowUp") {
      if (this.prevCommands.length === 0) {
        return;

      }

      if (this.prevCommandsIndex >= this.prevCommands.length) {
        return;
      }

      this.prevCommandsIndex++;
      this.prevContent = this.prevContent.slice(0, this.prevContent.length - this.maxBackspace);
      this.prevContent += this.prevCommands[this.prevCommands.length - this.prevCommandsIndex];
      this.maxBackspace = this.prevCommands[this.prevCommands.length - this.prevCommandsIndex].length;
      this.el.innerHTML = this.prevContent;
      return;
    }

    if (key === "ArrowDown") {
      if (this.prevCommands.length === 0) {
        return;
      }

      if (this.prevCommandsIndex <= 1) {
        this.prevCommandsIndex = 0;
        this.prevContent = this.prevContent.slice(0, this.prevContent.length - this.maxBackspace);
        this.el.innerHTML = this.prevContent;
        this.maxBackspace = 0;
        return;
      }

      this.prevCommandsIndex--;
      this.prevContent = this.prevContent.slice(0, this.prevContent.length - this.maxBackspace);
      this.prevContent += this.prevCommands[this.prevCommands.length - this.prevCommandsIndex];
      this.maxBackspace = this.prevCommands[this.prevCommands.length - this.prevCommandsIndex].length;
      this.el.innerHTML = this.prevContent;

      return;
    }

    if (key.length > 1) {
      return;
    }

    this.maxBackspace++;
    this.el.innerHTML += key;
    this.prevContent += key;
  },

  handleFinish() {
    window.addEventListener("keydown", this.handleKey);
    this.maxBackspace = 0;

    setTimeout(() => {
      let newcontent = `
      
      klve > 
      `

      this.el.innerHTML += newcontent;
      this.prevContent += newcontent;
    }, 100);
  },

};

let csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content")
let liveSocket = new LiveSocket("/live", Socket, {
  longPollFallbackMs: 2500,
  params: { _csrf_token: csrfToken },
  hooks: Hooks
})

// Show progress bar on live navigation and form submits
topbar.config({ barColors: { 0: "#29d" }, shadowColor: "rgba(0, 0, 0, .3)" })
window.addEventListener("phx:page-loading-start", _info => topbar.show(300))
window.addEventListener("phx:page-loading-stop", _info => topbar.hide())

// connect if there are any LiveViews on the page
liveSocket.connect()

// expose liveSocket on window for web console debug logs and latency simulation:
// >> liveSocket.enableDebug()
// >> liveSocket.enableLatencySim(1000)  // enabled for duration of browser session
// >> liveSocket.disableLatencySim()
window.liveSocket = liveSocket

