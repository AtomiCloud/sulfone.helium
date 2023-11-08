import type { Application, Request, Response } from "express";
import express from "express";
import type {
  ICyanExtension,
  ICyanPlugin,
  ICyanProcessor,
  ICyanTemplate,
} from "./domain/core/cyan_script.js";
import { LambdaPlugin, type LambdaPluginFn } from "./api/plugin/lambda.js";
import {
  LambdaProcessor,
  type LambdaProcessorFn,
} from "./api/processor/lambda.js";
import {
  LambdaExtension,
  type LambdaExtensionFn,
} from "./api/extension/lambda.js";
import {
  LambdaTemplate,
  type LambdaTemplateFn,
} from "./api/template/lambda.js";
import { PluginService } from "./domain/plugin/service.js";
import { ProcessorService } from "./domain/processor/service.js";
import { TemplateService } from "./domain/template/service.js";
import { ExtensionService } from "./domain/extension/service.js";
import { PluginMapper } from "./api/plugin/mapper.js";
import { ProcessorMapper } from "./api/processor/mapper.js";
import {
  TemplateInputMapper,
  TemplateOutputMapper,
} from "./api/template/mapper.js";
import type { TemplateValidRes } from "./api/template/res.js";
import type { ExtensionValidRes } from "./api/extension/res.js";
import {
  ExtensionMapper,
  ExtensionOutputMapper,
} from "./api/extension/mapper.js";
import type { IInquirer } from "./domain/core/inquirer.js";
import { CyanFileHelper } from "./domain/core/fs/cyan_fs_helper.js";
import type { IDeterminism } from "./domain/core/deterministic.js";
import type {
  CyanExtensionInput,
  CyanPluginInput,
  CyanProcessorInput,
} from "./domain/core/cyan_script_model.js";
import type { Cyan, CyanGlob } from "./domain/core/cyan.js";
import type { ProcessorOutput } from "./domain/processor/output.js";
import type { PluginOutput } from "./domain/plugin/output.js";
import type {
  CheckboxQ,
  ConfirmQ,
  DateQ,
  PasswordQ,
  SelectQ,
  TextQ,
} from "./domain/core/question.js";

function createApp(): Application {
  const app = express();

  app.use(express.json());

  app.get("/", (_: Request, res: Response) => {
    res.json({ Status: "OK", Message: "OK" });
  });
  return app;
}

function StartPlugin(plugin: ICyanPlugin): void {
  const app = createApp();
  const port = 5552;

  const pluginService = new PluginService(plugin);
  app.post("/api/plug", async (req: Request, res: Response) => {
    const result = await pluginService.plug(PluginMapper.ToDomain(req.body));
    res.json(PluginMapper.ToRes(result));
  });

  app.listen(port, () => {
    console.log(`Plugin listening on port ${port}`);
  });
}

function StartPluginWithLambda(f: LambdaPluginFn): void {
  const lambda = new LambdaPlugin(f);
  StartPlugin(lambda);
}

function StartProcessor(processor: ICyanProcessor): void {
  const app = createApp();
  const port = 5551;

  const processorService = new ProcessorService(processor);
  app.post("/api/process", async (req: Request, res: Response) => {
    const result = await processorService.process(
      ProcessorMapper.toDomain(req.body),
    );
    res.json(ProcessorMapper.toRes(result));
  });

  app.listen(port, () => {
    console.log(`Processor listening on port ${port}`);
  });
}

function StartProcessorWithLambda(f: LambdaProcessorFn): void {
  const lambda = new LambdaProcessor(f);
  StartProcessor(lambda);
}

function StartTemplate(template: ICyanTemplate): void {
  const port = 5550;
  const app = createApp();

  const templateService = new TemplateService(template);
  app.post("/api/template/init", async (req: Request, res: Response) => {
    const result = await templateService.template(
      TemplateInputMapper.answerToDomain(req.body),
    );
    res.json(TemplateOutputMapper.ToResp(result));
  });

  app.post("/api/template/validate", async (req: Request, res: Response) => {
    const result = await templateService.validate(
      TemplateInputMapper.validateToDomain(req.body),
    );
    const r = {
      valid: result,
    } satisfies TemplateValidRes;
    res.json(r);
  });

  app.listen(port, () => {
    console.log(`Template listening on port ${port}`);
  });
}

function StartTemplateWithLambda(f: LambdaTemplateFn): void {
  const lambda = new LambdaTemplate(f);
  StartTemplate(lambda);
}

function StartExtension(ext: ICyanExtension): void {
  const port = 5550;
  const app = createApp();

  const extService = new ExtensionService(ext);

  app.post("/api/extension/init", async (req: Request, res: Response) => {
    const result = await extService.extend(
      ExtensionMapper.extensionAnswerToDomain(req.body),
    );
    res.json(ExtensionOutputMapper.toResp(result));
  });

  app.post("/api/extension/validate", async (req: Request, res: Response) => {
    const result = await extService.validate(
      ExtensionMapper.extensionValidateToDomain(req.body),
    );
    const r = {
      valid: result,
    } satisfies ExtensionValidRes;
    res.json(r);
  });

  app.listen(port, () => {
    console.log(`Extension listening on port ${port}`);
  });
}

function StartExtensionWithLambda(f: LambdaExtensionFn): void {
  const lambda = new LambdaExtension(f);
  StartExtension(lambda);
}

// export all
export {
  StartProcessor,
  StartProcessorWithLambda,
  StartTemplate,
  StartTemplateWithLambda,
  StartExtension,
  StartExtensionWithLambda,
  StartPlugin,
  StartPluginWithLambda,
  CyanFileHelper,
};

export type {
  ICyanTemplate,
  ICyanExtension,
  ICyanProcessor,
  ICyanPlugin,
  LambdaExtensionFn,
  LambdaTemplateFn,
  LambdaPluginFn,
  LambdaExtension,
  IInquirer,
  IDeterminism,
  CyanExtensionInput,
  CyanPluginInput,
  CyanProcessorInput,
  Cyan,
  CyanGlob,
  ProcessorOutput,
  PluginOutput,
  CheckboxQ,
  ConfirmQ,
  DateQ,
  PasswordQ,
  SelectQ,
  TextQ,
};
