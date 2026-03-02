from cyanprintsdk.api.resolver.req import ResolverReq, ResolvedFileReq, FileOriginReq
from cyanprintsdk.api.resolver.res import ResolverRes
from cyanprintsdk.domain.resolver.input import ResolverInput, ResolvedFile, FileOrigin
from cyanprintsdk.domain.resolver.output import ResolverOutput


class ResolverMapper:
    @staticmethod
    def _to_file_origin(req: FileOriginReq) -> FileOrigin:
        return FileOrigin(
            template=req.template,
            layer=req.layer,
        )

    @staticmethod
    def _to_resolved_file(req: ResolvedFileReq) -> ResolvedFile:
        return ResolvedFile(
            path=req.path,
            content=req.content,
            origin=ResolverMapper._to_file_origin(req.origin),
        )

    @staticmethod
    def to_domain(req: ResolverReq) -> ResolverInput:
        files = [ResolverMapper._to_resolved_file(x) for x in req.files]
        return ResolverInput(
            config=req.config,
            files=files,
        )

    @staticmethod
    def to_res(res: ResolverOutput) -> ResolverRes:
        return ResolverRes(path=res.path, content=res.content)
