from cyanprintsdk.api.base_model import CyanBaseModel


class ResolverRes(CyanBaseModel):
    path: str
    content: str
