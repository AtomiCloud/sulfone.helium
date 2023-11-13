from typing import Optional

from cyan_sdk.domain.core.cyan_script import ICyanExtension
from cyan_sdk.domain.core.cyan_script_model import CyanExtensionInput
from cyan_sdk.domain.core.question import Question
from cyan_sdk.domain.extension.input import ExtensionAnswerInput, ExtensionValidateInput
from cyan_sdk.domain.extension.output import ExtensionOutput, ExtensionFinalOutput, ExtensionQnAOutput
from cyan_sdk.domain.service.out_of_answer_error import OutOfAnswerException
from cyan_sdk.domain.service.stateless_determinism import StatelessDeterminism
from cyan_sdk.domain.service.stateless_inquirer import StatelessInquirer


class ExtensionService:
    def __init__(self, ext: ICyanExtension):
        self._ext = ext

    async def extend(self, answer: ExtensionAnswerInput) -> ExtensionOutput:
        pointer = -1
        i = StatelessInquirer(answer.answers, pointer)
        d = StatelessDeterminism(answer.deterministic_state, pointer)

        try:
            input_data = CyanExtensionInput(
                prev_answers=answer.prev_answers,
                prev_cyan=answer.prev_cyan,
                prev_extension_answers=answer.prev_extension_answers,
                prev_extension_cyans=answer.prev_extension_cyans,
            )
            r = await self._ext.extension(i, d, input_data)
            return ExtensionFinalOutput(data=r)
        except OutOfAnswerException as e:
            return ExtensionQnAOutput(deterministic_state=d.states, question=e.question)
        except Exception as e:
            raise e

    async def validate(self, answer: ExtensionValidateInput) -> Optional[str]:
        pointer = -1
        i = StatelessInquirer(answer.answers, pointer)
        d = StatelessDeterminism(answer.deterministic_state, pointer)

        try:
            input_data = CyanExtensionInput(
                prev_answers=answer.prev_answers,
                prev_cyan=answer.prev_cyan,
                prev_extension_answers=answer.prev_extension_answers,
                prev_extension_cyans=answer.prev_extension_cyans,
            )
            await self._ext.extension(i, d, input_data)
            raise RuntimeError("Not supposed to reach here for validation!")
        except OutOfAnswerException as e:
            q: Question = e.question
            if q.validate is None:
                return None
            return q.validate(answer.validate)
        except Exception as e:
            raise e

# In Python, no need to explicitly export classes
