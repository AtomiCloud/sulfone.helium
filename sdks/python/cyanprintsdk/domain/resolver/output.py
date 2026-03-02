from dataclasses import dataclass


@dataclass
class ResolverOutput:
    path: str
    content: str
