from typing import List, Any

from api.base_model import CyanBaseModel

from api.core.cyan_req import CyanGlobReq


class ProcessorReq(CyanBaseModel):
    read_dir: str
    write_dir: str
    globs: List[CyanGlobReq]
    config: Any
