from typing import List, Optional, Any

from cyanprintsdk.api.base_model import CyanBaseModel


class CyanGlobReq(CyanBaseModel):
    root: Optional[str] = None
    glob: str
    exclude: Optional[List[str]] = None
    type: str


class CyanPluginReq(CyanBaseModel):
    name: str
    config: Any


class CyanProcessorReq(CyanBaseModel):
    name: str
    config: Any
    files: List[CyanGlobReq]


class CyanReq(CyanBaseModel):
    processors: List[CyanProcessorReq]
    plugins: List[CyanPluginReq]
