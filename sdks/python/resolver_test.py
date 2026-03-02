from cyanprintsdk.domain.resolver.input import ResolverInput
from cyanprintsdk.domain.resolver.output import ResolverOutput
from cyanprintsdk.main import start_resolver_with_fn


async def resolver(i: ResolverInput) -> ResolverOutput:
    print("Config:", i.config)
    print("Files:", len(i.files))

    # Simple merge: just return the first file's content as-is (placeholder implementation)
    if not i.files:
        return ResolverOutput(path="", content="")

    first_file = i.files[0]
    return ResolverOutput(path=first_file.path, content=first_file.content)


start_resolver_with_fn(resolver)
