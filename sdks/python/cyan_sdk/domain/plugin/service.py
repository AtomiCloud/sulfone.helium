from cyan_sdk.domain.core.cyan_script import ICyanPlugin
from cyan_sdk.domain.core.cyan_script_model import CyanPluginInput
from cyan_sdk.domain.plugin.input import PluginInput
from cyan_sdk.domain.plugin.output import PluginOutput


class PluginService:
    def __init__(self, plugin: ICyanPlugin):
        self._plugin = plugin  # Leading underscore indicates a "private" attribute

    async def plug(self, i: PluginInput) -> PluginOutput:
        directory = i.directory
        config = i.config
        return await self._plugin.plugin(CyanPluginInput(directory=directory, config=config))
