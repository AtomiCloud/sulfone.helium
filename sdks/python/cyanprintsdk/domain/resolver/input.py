from dataclasses import dataclass
from typing import Any, Dict


@dataclass
class FileOrigin:
    template: str
    layer: int


@dataclass
class ResolvedFile:
    path: str
    content: str
    origin: FileOrigin


@dataclass
class ResolverInput:
    config: Dict[str, Any]
    files: list[ResolvedFile]
