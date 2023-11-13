from abc import abstractmethod, ABC

from domain.core.cyan import Cyan
from domain.core.cyan_script_model import CyanExtensionInput, CyanProcessorInput, CyanPluginInput
from domain.core.deterministic import IDeterminism
from domain.core.fs.cyan_fs_helper import CyanFileHelper
from domain.core.inquirer import IInquirer
from domain.plugin.output import PluginOutput
from domain.processor.output import ProcessorOutput


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
