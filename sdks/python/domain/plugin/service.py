from domain.core.cyan_script import ICyanPlugin
from domain.core.cyan_script_model import CyanPluginInput
from domain.plugin.input import PluginInput
from domain.plugin.output import PluginOutput


class PluginService:
    def __init__(self, plugin: ICyanPlugin):
        self._plugin = plugin  # Leading underscore indicates a "private" attribute

    async def plug(self, i: PluginInput) -> PluginOutput:
        directory = i.directory
        config = i.config
        return await self._plugin.plugin(CyanPluginInput(directory=directory, config=config))
