from typing import Callable, Awaitable

from domain.core.cyan import Cyan
from domain.core.cyan_script import ICyanExtension
from domain.core.cyan_script_model import CyanExtensionInput
from domain.core.deterministic import IDeterminism
from domain.core.inquirer import IInquirer

LambdaExtensionFn = Callable[[IInquirer, IDeterminism, CyanExtensionInput], Awaitable[Cyan]]


class LambdaExtension(ICyanExtension):
    def __init__(self, f: LambdaExtensionFn):
        self._f: LambdaExtensionFn = f

    async def extension(self, inquirer: IInquirer, determinism: IDeterminism, prev: CyanExtensionInput) -> Cyan:
        return await self._f(inquirer, determinism, prev)
