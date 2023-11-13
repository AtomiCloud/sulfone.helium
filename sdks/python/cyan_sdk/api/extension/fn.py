from typing import Callable, Awaitable

from cyan_sdk.domain.core.cyan import Cyan
from cyan_sdk.domain.core.cyan_script import ICyanExtension
from cyan_sdk.domain.core.cyan_script_model import CyanExtensionInput
from cyan_sdk.domain.core.deterministic import IDeterminism
from cyan_sdk.domain.core.inquirer import IInquirer

LambdaExtensionFn = Callable[[IInquirer, IDeterminism, CyanExtensionInput], Awaitable[Cyan]]


class LambdaExtension(ICyanExtension):
    def __init__(self, f: LambdaExtensionFn):
        self._f: LambdaExtensionFn = f

    async def extension(self, inquirer: IInquirer, determinism: IDeterminism, prev: CyanExtensionInput) -> Cyan:
        return await self._f(inquirer, determinism, prev)
