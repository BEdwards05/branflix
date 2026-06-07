#!/usr/bin/env node

import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const lockPath = path.join(root, '.next/dev/lock');

const killPid = (pid) => {
  if (!pid || Number.isNaN(pid)) {
    return;
  }

  try {
    execSync(`kill -9 ${pid}`, { stdio: 'ignore' });
  } catch {
    // Process may already be gone.
  }
};

const killPort = (port) => {
  try {
    execSync(`lsof -ti :${port} | xargs kill -9`, { stdio: 'ignore' });
  } catch {
    // Nothing listening on the port.
  }
};

if (fs.existsSync(lockPath)) {
  try {
    const lock = JSON.parse(fs.readFileSync(lockPath, 'utf8'));
    killPid(Number(lock.pid));
  } catch {
    // Ignore malformed lock files.
  }

  fs.rmSync(lockPath, { force: true });
}

killPort(5055);
killPort(3000);

console.log('Stopped BranFlix dev server (if it was running).');
