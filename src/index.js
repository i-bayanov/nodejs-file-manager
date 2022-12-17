import readline from 'readline';
import { homedir } from 'os';

import * as jsModules from './modules/index.js';

const userName =
  process.argv
    .slice(2)
    .find((arg) => arg.startsWith('--username='))
    ?.replace('--username=', '') || 'Anonche';

console.log(`Welcome to the File Manager, ${userName}!`);
console.log(`You are currently in ${homedir}`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (line) => {
  const [command, ...args] = line.split(' ');

  if (command === '.exit') jsModules.exit(userName);

  const fn = jsModules[command];

  if (!fn) {
    console.log(`Unknown command "${command}"`);
    return;
  }

  fn(...args);
}).on('SIGINT', jsModules.exit.bind(null, userName));
