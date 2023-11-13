from abc import abstractmethod, ABC

from cyan_sdk.domain.core.cyan import Cyan
from cyan_sdk.domain.core.cyan_script_model import CyanExtensionInput, CyanProcessorInput, CyanPluginInput
from cyan_sdk.domain.core.deterministic import IDeterminism
from cyan_sdk.domain.core.fs.cyan_fs_helper import CyanFileHelper
from cyan_sdk.domain.core.inquirer import IInquirer
from cyan_sdk.domain.plugin.output import PluginOutput
from cyan_sdk.domain.processor.output import ProcessorOutput


class ICyanTemplate(ABC):
    @abstractmethod
    async def template(self, inquirer: IInquirer, determinism: IDeterminism) -> Cyan:
        pass


class ICyanExtension(ABC):
    @abstractmethod
    async def extension(self, inquirer: IInquirer, determinism: IDeterminism, i: CyanExtensionInput) -> Cyan:
        pass


class ICyanProcessor(ABC):
    @abstractmethod
    async def process(self, i: CyanProcessorInput, file_helper: CyanFileHelper) -> ProcessorOutput:
        pass


class ICyanPlugin(ABC):
    @abstractmethod
    async def plugin(self, i: CyanPluginInput) -> PluginOutput:
        pass
