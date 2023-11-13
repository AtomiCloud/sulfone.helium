import pprint

from aiohttp import web
from pydantic import ValidationError

from cyan_sdk.api.extension.fn import LambdaExtensionFn, LambdaExtension
from cyan_sdk.api.extension.mapper import ExtensionInputMapper, ExtensionOutputMapper
from cyan_sdk.api.extension.req import ExtensionAnswerReq, ExtensionValidateReq
from cyan_sdk.api.extension.res import ExtensionRes, ExtensionValidRes
from cyan_sdk.api.plugin.fn import LambdaPluginFn, LambdaPlugin
from cyan_sdk.api.plugin.mapper import PluginMapper
from cyan_sdk.api.plugin.req import PluginReq
from cyan_sdk.api.plugin.res import PluginRes
from cyan_sdk.api.processor.fn import LambdaProcessorFn, LambdaProcessor
from cyan_sdk.api.processor.mapper import ProcessorMapper
from cyan_sdk.api.processor.req import ProcessorReq
from cyan_sdk.api.processor.res import ProcessorRes
from cyan_sdk.api.template.fn import LambdaTemplate, LambdaTemplateFn
from cyan_sdk.api.template.mapper import TemplateInputMapper, TemplateOutputMapper
from cyan_sdk.api.template.req import TemplateAnswerReq, TemplateValidateReq
from cyan_sdk.api.template.res import TemplateRes, TemplateValidRes
from cyan_sdk.domain.core.cyan_script import ICyanPlugin, ICyanProcessor, ICyanTemplate, ICyanExtension
from cyan_sdk.domain.core.cyan_script_model import CyanProcessorInput
from cyan_sdk.domain.core.fs.cyan_fs_helper import CyanFileHelper
from cyan_sdk.domain.extension.input import ExtensionAnswerInput, ExtensionValidateInput
from cyan_sdk.domain.extension.output import ExtensionOutput
from cyan_sdk.domain.extension.service import ExtensionService
from cyan_sdk.domain.plugin.input import PluginInput
from cyan_sdk.domain.plugin.output import PluginOutput
from cyan_sdk.domain.plugin.service import PluginService
from cyan_sdk.domain.processor.input import ProcessorInput
from cyan_sdk.domain.processor.output import ProcessorOutput
from cyan_sdk.domain.processor.service import ProcessorService
from cyan_sdk.domain.template.input import TemplateInput, TemplateValidateInput
from cyan_sdk.domain.template.output import TemplateOutput
from cyan_sdk.domain.template.service import TemplateService


def start_plugin_with_fn(f: LambdaPluginFn):
    start_plugin(LambdaPlugin(f))


def start_plugin(plugin: ICyanPlugin):
    app = web.Application()

    plugin_service = PluginService(plugin)

    async def plug(request):
        try:
            json = await request.json()
            req = PluginReq(**json)
            pprint.pprint(req)
        except ValidationError as e:
            print(e)
            return web.json_response({'error': str(e)}, status=400)

        # translate to domain
        i: PluginInput = PluginMapper.to_domain(req)
        o: PluginOutput = await plugin_service.plug(i)
        res: PluginRes = PluginMapper.to_res(o)

        return web.json_response(res.model_dump())

    app.add_routes([web.post('/api/plug', plug)])

    web.run_app(app, port=5552)


def start_processor_with_fn(f: LambdaProcessorFn):
    start_processor(LambdaProcessor(f))


def start_processor(processor: ICyanProcessor):
    app = web.Application()

    proc_service = ProcessorService(processor)

    async def process(request):
        try:
            json = await request.json()
            req = ProcessorReq(**json)
            pprint.pprint(req)
        except ValidationError as e:
            print(e)
            return web.json_response({'error': str(e)}, status=400)

        # translate to domain
        i: ProcessorInput = ProcessorMapper.to_domain(req)
        o: ProcessorOutput = await proc_service.process(i)
        res: ProcessorRes = ProcessorMapper.to_res(o)

        return web.json_response(res.model_dump())

    app.add_routes([web.post('/api/process', process)])

    web.run_app(app, port=5551)


def start_template_with_fn(f: LambdaTemplateFn):
    start_template(LambdaTemplate(f))


def start_template(template: ICyanTemplate):
    app = web.Application()

    template_service = TemplateService(template)

    async def template_answer(request):
        try:
            json = await request.json()
            print(json)
            req = TemplateAnswerReq(**json)
            pprint.pprint(req)
        except ValidationError as e:
            print(e)
            return web.json_response({'error': str(e)}, status=400)

        # translate to domain
        i: TemplateInput = TemplateInputMapper.answer_to_domain(req)
        o: TemplateOutput = await template_service.template(i)
        res: TemplateRes = TemplateOutputMapper.to_resp(o)

        res_model = res.model_dump(by_alias=True)

        return web.json_response(res_model)

    async def template_validate(request):
        try:
            json = await request.json()
            req = TemplateValidateReq(**json)
            pprint.pprint(req)
        except ValidationError as e:
            print(e)
            return web.json_response({'error': str(e)}, status=400)

        # translate to domain
        i: TemplateValidateInput = TemplateInputMapper.validate_to_domain(req)
        o: str = await template_service.validate(i)
        res: TemplateValidRes = TemplateValidRes(valid=o)

        res_model = res.model_dump(by_alias=True)

        return web.json_response(res_model)

    app.add_routes([web.post('/api/template/init', template_answer)])
    app.add_routes([web.post('/api/template/validate', template_validate)])

    web.run_app(app, port=5550)


def start_extension_with_fn(f: LambdaExtensionFn):
    start_extension(LambdaExtension(f))


def start_extension(extension: ICyanExtension):
    app = web.Application()

    ext_service = ExtensionService(extension)

    async def ext_answer(request):
        try:
            json = await request.json()
            req = ExtensionAnswerReq(**json)
            pprint.pprint(req)
        except ValidationError as e:
            print(e)
            return web.json_response({'error': str(e)}, status=400)

        # translate to domain
        i: ExtensionAnswerInput = ExtensionInputMapper.extension_answer_to_domain(req)
        o: ExtensionOutput = await ext_service.extend(i)
        res: ExtensionRes = ExtensionOutputMapper.to_resp(o)

        return web.json_response(res.model_dump())

    async def ext_validate(request):
        try:
            json = await request.json()
            req = ExtensionValidateReq(**json)
            pprint.pprint(req)
        except ValidationError as e:
            print(e)
            return web.json_response({'error': str(e)}, status=400)

        # translate to domain
        i: ExtensionValidateInput = ExtensionInputMapper.extension_validate_to_domain(req)
        o: str = await ext_service.validate(i)
        res: ExtensionValidRes = ExtensionValidRes(valid=o)

        return web.json_response(res.model_dump())

    app.add_routes([web.post('/api/extension/init', ext_answer)])
    app.add_routes([web.post('/api/extension/validate', ext_validate)])

    web.run_app(app, port=5550)


async def simple_output(i: CyanProcessorInput, fs: CyanFileHelper) -> ProcessorOutput:
    templates = fs.resolve_all()
    for t in templates:
        t.relative = t.relative + ".tpl"
        t.write_file()
    return ProcessorOutput(directory=i.write_dir)


start_processor_with_fn(simple_output)
