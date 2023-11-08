import type { CyanGlob } from "../cyan.js";
import { GlobType } from "../cyan.js";
import * as path from "path";
import * as fs from "fs";
import {
  VirtualFile,
  VirtualFileReference,
  VirtualFileStream,
} from "./virtual_file.js";
import { glob } from "glob";

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

  private copyFile(from: string, to: string): void {
    const parent = path.dirname(to);
    if (!fs.existsSync(parent)) fs.mkdirSync(parent, { recursive: true });
    fs.copyFileSync(from, to);
  }

  resolveAll(): VirtualFile[] {
    const copy = this.globs.filter((x) => x.type === GlobType.Copy);
    const template = this.globs.filter((x) => x.type === GlobType.Template);

    for (const c of copy) this.copy(c);

    return template.flatMap((x) => this.read(x));
  }

  readAsStream(g: CyanGlob): VirtualFileStream[] {
    const matched = glob
      .globSync(g.glob, { cwd: this.readDir, ignore: g.exclude })
      .map((x) => path.relative(this.readDir, x));

    return matched.map(
      (x) =>
        new VirtualFileStream(
          fs.createReadStream(path.join(this.readDir, x)),
          fs.createWriteStream(path.join(this.writeDir, x)),
        ),
    );
  }

  get(g: CyanGlob): VirtualFileReference[] {
    return glob
      .globSync(g.glob, { cwd: this.readDir, ignore: g.exclude })
      .map((x) => path.relative(this.readDir, x))
      .map((x) => new VirtualFileReference(this.readDir, this.writeDir, x));
  }

  read(g: CyanGlob): VirtualFile[] {
    return this.get(g).map((x) => x.readFile());
  }

  copy(copy: CyanGlob): void {
    const files = glob
      .globSync(copy.glob, { cwd: this.readDir, ignore: copy.exclude })
      .map((x) => path.relative(this.readDir, x))
      .map((x) => [path.join(this.readDir, x), path.join(this.writeDir, x)]);

    for (const [read, write] of files) {
      console.log(`copy: ${read} -> ${write}`);
      this.copyFile(read, write);
    }
  }
}
