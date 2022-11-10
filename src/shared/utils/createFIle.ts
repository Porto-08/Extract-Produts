import fs from 'fs';

export function createFile(destination: string, pathFile: string) {
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  fs.createWriteStream(pathFile);
}
