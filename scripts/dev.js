import { spawn } from "node:child_process";

const webCommand = [
  process.execPath,
  ["node_modules/vite/bin/vite.js", "--host", "127.0.0.1"]
];

const processes = [
  spawn("node", ["server/index.js"], {
    stdio: "inherit"
  }),
  spawn(webCommand[0], webCommand[1], {
    stdio: "inherit"
  })
];

let stopping = false;

function stopAll(signal) {
  stopping = true;

  for (const child of processes) {
    if (!child.killed && child.exitCode === null) {
      child.kill(signal);
    }
  }
}

for (const child of processes) {
  child.on("exit", (code, signal) => {
    if (stopping) {
      return;
    }

    if (signal) {
      stopAll(signal);
      return;
    }

    stopAll("SIGTERM");
    process.exitCode = code ?? 0;
  });
}

process.on("SIGINT", () => {
  stopAll("SIGINT");
});

process.on("SIGTERM", () => {
  stopAll("SIGTERM");
});
