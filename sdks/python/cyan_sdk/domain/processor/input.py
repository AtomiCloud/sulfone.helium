from dataclasses import dataclass
from typing import List, Any

from cyan_sdk.domain.core.cyan import CyanGlob


@dataclass
class ProcessorInput:
    read_directory: str
    write_directory: str
    globs: List[CyanGlob]
    config: Any
