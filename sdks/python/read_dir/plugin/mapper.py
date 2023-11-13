from api.plugin.req import PluginReq
from api.plugin.res import PluginRes
from domain.plugin.input import PluginInput
from domain.plugin.output import PluginOutput


class PluginMapper:
    @staticmethod
    def to_domain(req: PluginReq) -> PluginInput:
        return PluginInput(directory=req.directory, config=req.config)

    @staticmethod
    def to_res(res: PluginOutput) -> PluginRes:
        return PluginRes(output_dir=res.directory)
