from dataclasses import dataclass
from typing import List, Dict

from cyan_sdk.domain.core.answer import Answer
from cyan_sdk.domain.core.cyan import Cyan


@dataclass
class ExtensionAnswerInput:
    answers: List[Answer]
    deterministic_state: List[Dict[str, str]]
    prev_answers: List[Answer]
    prev_cyan: Cyan
    prev_extension_answers: Dict[str, List[Answer]]
    prev_extension_cyans: Dict[str, Cyan]


@dataclass
class ExtensionValidateInput:
    answers: List[Answer]
    deterministic_state: List[Dict[str, str]]
    prev_answers: List[Answer]
    prev_cyan: Cyan
    prev_extension_answers: Dict[str, List[Answer]]
    prev_extension_cyans: Dict[str, Cyan]
    validate: str
