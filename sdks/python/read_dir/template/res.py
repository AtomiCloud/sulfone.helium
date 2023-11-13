from typing import Optional, List, Dict, Union

from api.base_model import CyanBaseModel
from api.core.cyan_res import CyanRes
from api.core.question_res import QuestionRes


class TemplateValidRes(CyanBaseModel):
    valid: Optional[str]


class TemplateFinalRes(CyanBaseModel):
    cyan: CyanRes
    type: str = "final"


class TemplateQnARes(CyanBaseModel):
    deterministic_state: List[Dict[str, str]]
    question: QuestionRes
    type: str = "questionnaire"


# Union type for TemplateRes
TemplateRes = Union[TemplateQnARes, TemplateFinalRes]
