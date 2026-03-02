from typing import Callable, Awaitable

from cyanprintsdk.domain.core.cyan_script import ICyanResolver
from cyanprintsdk.domain.resolver.input import ResolverInput
from cyanprintsdk.domain.resolver.output import ResolverOutput

LambdaResolverFn = Callable[[ResolverInput], Awaitable[ResolverOutput]]


class LambdaResolver(ICyanResolver):
    def __init__(self, f: LambdaResolverFn):
        self._f: LambdaResolverFn = f

    async def resolve(self, i: ResolverInput) -> ResolverOutput:
        return await self._f(i)
