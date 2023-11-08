import * as fs from "fs";
import * as path from "path";

export class VirtualFileStream {
  constructor(
    public reader: fs.ReadStream,
    public writer: fs.WriteStream,
  ) {}
}

export class VirtualFileReference {
  constructor(
    private baseRead: string,
    private baseWrite: string,
    private relative: string,
  ) {}

  get read(): string {
    return path.join(this.baseRead, this.relative);
  }

  get write(): string {
    return path.join(this.baseWrite, this.relative);
  }

  readFile(): VirtualFile {
    const content = fs.readFileSync(this.read, "utf-8");
    return new VirtualFile(
      this.baseRead,
      this.baseWrite,
      this.relative,
      content,
    );
  }
}

export class VirtualFile {
  constructor(
    private baseRead: string,
    private baseWrite: string,
    private relative: string,
    private content: string,
  ) {}

  get read(): string {
    return path.join(this.baseRead, this.relative);
  }

  get write(): string {
    return path.join(this.baseWrite, this.relative);
  }

  writeFile(): void {
    const parent = path.dirname(this.write);
    if (!fs.existsSync(parent)) {
      fs.mkdirSync(parent, { recursive: true });
    }
    fs.writeFileSync(this.write, this.content, "utf-8");
  }
}
