import { createReadStream, createWriteStream } from 'fs';
import { resolve, basename } from 'path';

import { checkPathExistence } from './checkPathExistence.js';

export async function cp(pathToFile, pathToNewDirectory) {
  const absolutePathToFile = resolve(this.cwd, pathToFile);
  const fileName = basename(absolutePathToFile);
  const absolutePathToNewFile = resolve(this.cwd, pathToNewDirectory, fileName);
  const isFileAlreadyExists = await checkPathExistence(absolutePathToNewFile);

  if (!pathToFile || !pathToNewDirectory || isFileAlreadyExists)
    throw new Error('Invalid input');

  try {
    await new Promise((resolve, reject) => {
      const readStream = createReadStream(absolutePathToFile);
      readStream
        .on('error', (error) => reject(error))
        .on('close', () => resolve());
      const writeStream = createWriteStream(absolutePathToNewFile);
      writeStream
        .on('error', (error) => reject(error))
        .on('close', () => resolve());
    });
  } catch (error) {
    if (error instanceof Error) {
      const isInputInvalid =
        error.message.startsWith('ENOENT: no such file or directory') ||
        error.message === 'EISDIR: illegal operation on a directory, read';

      if (isInputInvalid) throw new Error('Invalid input');

      throw new Error('Operation failed');
    }
  }
}
