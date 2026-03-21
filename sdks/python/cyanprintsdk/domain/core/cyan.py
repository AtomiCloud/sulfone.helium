from dataclasses import dataclass
from enum import Enum
from typing import Optional, List, Any


@dataclass
class GlobType(Enum):
    Template = 1
    Copy = 2


@dataclass
class CyanGlob:
    glob: str
    type: GlobType
    root: Optional[str] = None
    exclude: Optional[List[str]] = None


@dataclass
class CyanPlugin:
    name: str
    config: Any


@dataclass
class CyanProcessor:
    name: str
    files: List[CyanGlob]
    config: Any


@dataclass
class Cyan:
    processors: List[CyanProcessor]
    plugins: List[CyanPlugin]
