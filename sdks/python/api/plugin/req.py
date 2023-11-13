from typing import Dict, Any

from api.base_model import CyanBaseModel


class PluginReq(CyanBaseModel):
    directory: str
    config: Dict[str, Any]
