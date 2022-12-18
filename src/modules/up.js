import path from 'path';

import { promptUser } from './promptUser.js';

export function up() {
  this.cwd = path.resolve(this.cwd, '..');
  promptUser.call(this);
}
