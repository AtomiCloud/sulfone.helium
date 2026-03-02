from typing import Any, Dict, List

from cyanprintsdk.api.base_model import CyanBaseModel


class FileOriginReq(CyanBaseModel):
    template: str
    layer: int


class ResolvedFileReq(CyanBaseModel):
    path: str
    content: str
    origin: FileOriginReq


class ResolverReq(CyanBaseModel):
    config: Dict[str, Any]
    files: List[ResolvedFileReq]
