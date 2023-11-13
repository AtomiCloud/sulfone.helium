from typing import Dict, Any

from cyan_sdk.api.base_model import CyanBaseModel


class PluginReq(CyanBaseModel):
    directory: str
    config: Dict[str, Any]
