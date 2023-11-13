from typing import List, Any

from cyan_sdk.api.base_model import CyanBaseModel

from cyan_sdk.api.core.cyan_req import CyanGlobReq


class ProcessorReq(CyanBaseModel):
    read_dir: str
    write_dir: str
    globs: List[CyanGlobReq]
    config: Any
