import path from 'path';

import { checkPathExistence } from './checkPathExistence.js';

export async function cd(pathToDirectory) {
  const newDirectory = path.resolve(this.cwd, pathToDirectory);

  if (!(await checkPathExistence(newDirectory)))
    throw new Error('Operation failed');

  this.cwd = newDirectory;
}
