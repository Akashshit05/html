import net from 'node:net';
import { spawn } from 'node:child_process';

const preferredPort = Number(process.env.PORT) || 5185;
const apiPort = await findOpenPort(preferredPort);
const env = {
  ...process.env,
  PORT: String(apiPort)
};

console.log(`Using API port ${apiPort}`);

const children = [
  spawn('npm', ['run', 'server:dev'], {
    env,
    stdio: 'inherit',
    shell: process.platform === 'win32'
  }),
  spawn('npm', ['run', 'client:dev'], {
    env,
    stdio: 'inherit',
    shell: process.platform === 'win32'
  })
];

let shuttingDown = false;

for (const child of children) {
  child.on('exit', (code, signal) => {
    if (shuttingDown) return;
    shuttingDown = true;
    stopChildren();
    process.exit(code ?? (signal ? 1 : 0));
  });
}

process.on('SIGINT', () => {
  shuttingDown = true;
  stopChildren();
  process.exit(130);
});

process.on('SIGTERM', () => {
  shuttingDown = true;
  stopChildren();
  process.exit(143);
});

async function findOpenPort(startPort) {
  for (let port = startPort; port < startPort + 100; port += 1) {
    if (await canUsePort(port)) {
      return port;
    }
  }

  throw new Error(`No open API port found from ${startPort} to ${startPort + 99}.`);
}

function canUsePort(port) {
  return new Promise((resolve) => {
    const server = net.createServer();

    server.once('error', () => {
      resolve(false);
    });

    server.once('listening', () => {
      server.close(() => resolve(true));
    });

    server.listen(port, '0.0.0.0');
  });
}

function stopChildren() {
  for (const child of children) {
    if (!child.killed) {
      child.kill('SIGINT');
    }
  }
}
