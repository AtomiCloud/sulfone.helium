from cyanprintsdk.domain.core.cyan_script import ICyanResolver
from cyanprintsdk.domain.resolver.input import ResolverInput
from cyanprintsdk.domain.resolver.output import ResolverOutput


class ResolverService:
    def __init__(self, resolver: ICyanResolver):
        self._resolver = resolver

    async def resolve(self, i: ResolverInput) -> ResolverOutput:
        return await self._resolver.resolve(i)
