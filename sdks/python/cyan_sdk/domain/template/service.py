from typing import Optional

from cyan_sdk.domain.core.cyan_script import ICyanTemplate
from cyan_sdk.domain.core.question import Question
from cyan_sdk.domain.service.out_of_answer_error import OutOfAnswerException
from cyan_sdk.domain.service.stateless_determinism import StatelessDeterminism
from cyan_sdk.domain.service.stateless_inquirer import StatelessInquirer
from cyan_sdk.domain.template.input import TemplateInput, TemplateValidateInput
from cyan_sdk.domain.template.output import TemplateQnAOutput, TemplateOutput, TemplateFinalOutput


class TemplateService:
    def __init__(self, template: ICyanTemplate):
        self._template = template

    async def template(self, answer: TemplateInput) -> TemplateOutput:
        pointer = -1
        i = StatelessInquirer(answer.answers, pointer)
        d = StatelessDeterminism(answer.deterministic_state, pointer)

        try:
            r = await self._template.template(i, d)
            return TemplateFinalOutput(data=r)
        except OutOfAnswerException as e:
            q: Question = e.question
            return TemplateQnAOutput(deterministic_state=d.states, question=q)
        except Exception as e:
            raise e

    async def validate(self, answer: TemplateValidateInput) -> Optional[str]:
        pointer = -1
        i = StatelessInquirer(answer.answers, pointer)
        d = StatelessDeterminism(answer.deterministic_state, pointer)

        try:
            await self._template.template(i, d)
            raise RuntimeError("Not supposed to reach here for validation!")
        except OutOfAnswerException as e:
            q: Question = e.question
            validate_result = q.validate(answer.validate) if q.validate else None
            return validate_result
        except Exception as e:
            raise e
