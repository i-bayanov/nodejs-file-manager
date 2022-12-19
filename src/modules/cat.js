import fsPromises from 'fs/promises';
import path from 'path';

export async function cat(pathToFile) {
  if (!pathToFile) throw new Error('Invalid input');

  try {
    const absolutePathToFile = path.resolve(this.cwd, pathToFile);
    const fileContent = await fsPromises.readFile(absolutePathToFile, 'utf8');
    console.log(fileContent);
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
