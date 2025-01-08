import type { CyanGlob } from '../cyan.js';
import { GlobType } from '../cyan.js';
import * as path from 'path';
import * as fs from 'fs';
import { VirtualFile, VirtualFileReference, VirtualFileStream } from './virtual_file.js';
import { glob } from 'glob';

export class CyanFileHelper {
  constructor(
    private readonly _readDir: string,
    private readonly _writeDir: string,
    private readonly globs: CyanGlob[],
  ) {}

  get readDir(): string {
    return path.resolve(this._readDir);
  }

  get writeDir(): string {
    return path.resolve(this._writeDir);
  }

  private globDir(g: CyanGlob): string {
    return path.resolve(this.readDir, g.root ?? '.');
  }

  private copyFile(from: string, to: string): void {
    const parent = path.dirname(to);
    if (!fs.existsSync(parent)) fs.mkdirSync(parent, { recursive: true });
    fs.copyFileSync(from, to);
  }

  resolveAll(): VirtualFile[] {
    const copy = this.globs.filter(x => x.type === GlobType.Copy);
    const template = this.globs.filter(x => x.type === GlobType.Template);

    for (const c of copy) this.copy(c);

    return template.flatMap(x => this.read(x));
  }

  readAsStream(g: CyanGlob): VirtualFileStream[] {
    const globRoot = this.globDir(g);
    const matched = glob.globSync(g.glob, {
      cwd: globRoot,
      ignore: g.exclude,
      dot: true,
      nodir: true,
    });

    return matched.map(
      x =>
        new VirtualFileStream(
          fs.createReadStream(path.join(globRoot, x)),
          fs.createWriteStream(path.join(this.writeDir, x)),
        ),
    );
  }

  get(g: CyanGlob): VirtualFileReference[] {
    const globRoot = this.globDir(g);

    return glob
      .globSync(g.glob, {
        cwd: globRoot,
        ignore: g.exclude,
        dot: true,
        nodir: true,
      })
      .map(x => new VirtualFileReference(globRoot, this.writeDir, x));
  }

  read(g: CyanGlob): VirtualFile[] {
    return this.get(g).map(x => x.readFile());
  }

  copy(copy: CyanGlob): void {
    const globRoot = this.globDir(copy);

    const files = glob
      .globSync(copy.glob, {
        cwd: globRoot,
        ignore: copy.exclude,
        dot: true,
        nodir: true,
      })
      .map(x => [path.join(globRoot, x), path.join(this.writeDir, x)]);

    for (const [read, write] of files) {
      console.log(`copy: ${read} -> ${write}`);
      this.copyFile(read, write);
    }
  }
}
