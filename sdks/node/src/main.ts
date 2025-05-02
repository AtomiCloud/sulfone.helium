import type { Application, Request, Response } from 'express';
import type http from 'node:http';
import express from 'express';
import type { ICyanPlugin, ICyanProcessor, ICyanTemplate } from './domain/core/cyan_script.js';
import { LambdaPlugin, type LambdaPluginFn } from './api/plugin/lambda.js';
import { LambdaProcessor, type LambdaProcessorFn } from './api/processor/lambda.js';
import { LambdaTemplate, type LambdaTemplateFn } from './api/template/lambda.js';
import { PluginService } from './domain/plugin/service.js';
import { ProcessorService } from './domain/processor/service.js';
import { TemplateService } from './domain/template/service.js';
import { PluginMapper } from './api/plugin/mapper.js';
import { ProcessorMapper } from './api/processor/mapper.js';
import { TemplateInputMapper, TemplateOutputMapper } from './api/template/mapper.js';
import type { TemplateValidRes } from './api/template/res.js';
import type { IInquirer } from './domain/core/inquirer.js';
import { CyanFileHelper } from './domain/core/fs/cyan_fs_helper.js';
import type { IDeterminism } from './domain/core/deterministic.js';
import type { CyanPluginInput, CyanProcessorInput } from './domain/core/cyan_script_model.js';
import type { Cyan, CyanGlob } from './domain/core/cyan.js';
import { GlobType } from './domain/core/cyan.js';
import type { ProcessorOutput } from './domain/processor/output.js';
import type { PluginOutput } from './domain/plugin/output.js';
import type { CheckboxQ, ConfirmQ, DateQ, PasswordQ, SelectQ, TextQ } from './domain/core/question.js';
import { QuestionType } from './domain/core/question.js';

function createApp(): Application {
  const app = express();

  app.use(express.json());

  app.get('/', (_: Request, res: Response) => {
    res.json({ Status: 'OK', Message: 'OK' });
  });
  return app;
}

// Helper function to set up signal handling for server
function setupGracefulShutdown(server: http.Server, serviceName: string): void {
  // Handle SIGTERM and SIGINT
  const signals = ['SIGTERM', 'SIGINT'];

  for (const signal of signals) {
    process.on(signal, () => {
      console.log(`${signal} received, shutting down ${serviceName} gracefully...`);

      server.close((err?: Error) => {
        if (err) {
          console.error(`Error during ${serviceName} shutdown:`, err);
          process.exit(1);
        }
        console.log(`${serviceName} shutdown complete`);
        process.exit(0);
      });
    });
  }
}

function StartPlugin(plugin: ICyanPlugin): void {
  const app = createApp();
  const port = 5552;

  const pluginService = new PluginService(plugin);
  app.post('/api/plug', async (req: Request, res: Response) => {
    console.log(req.body);
    const result = await pluginService.plug(PluginMapper.ToDomain(req.body));
    res.json(PluginMapper.ToRes(result));
    res.end();
  });

  const server = app.listen(port, '0.0.0.0', () => {
    console.log(`Plugin listening on port ${port}`);
  });

  setupGracefulShutdown(server, 'Plugin Server');
}

function StartPluginWithLambda(f: LambdaPluginFn): void {
  const lambda = new LambdaPlugin(f);
  StartPlugin(lambda);
}

function StartProcessor(processor: ICyanProcessor): void {
  const app = createApp();
  const port = 5551;

  const processorService = new ProcessorService(processor);
  app.post('/api/process', async (req: Request, res: Response) => {
    console.log(req.body);
    const result = await processorService.process(ProcessorMapper.toDomain(req.body));
    res.json(ProcessorMapper.toRes(result));
    res.end();
  });

  const server = app.listen(port, '0.0.0.0', () => {
    console.log(`Processor listening on port ${port}`);
  });

  setupGracefulShutdown(server, 'Processor Server');
}

function StartProcessorWithLambda(f: LambdaProcessorFn): void {
  const lambda = new LambdaProcessor(f);
  StartProcessor(lambda);
}

function StartTemplate(template: ICyanTemplate): void {
  const port = 5550;
  const app = createApp();

  const templateService = new TemplateService(template);
  app.post('/api/template/init', async (req: Request, res: Response) => {
    console.log(req.body);
    const result = await templateService.template(TemplateInputMapper.answerToDomain(req.body));
    res.json(TemplateOutputMapper.ToResp(result));
    res.end();
  });

  app.post('/api/template/validate', async (req: Request, res: Response) => {
    console.log(req.body);
    const result = await templateService.validate(TemplateInputMapper.validateToDomain(req.body));
    const r = {
      valid: result,
    } satisfies TemplateValidRes;
    res.json(r);
    res.end();
  });

  const server = app.listen(port, '0.0.0.0', () => {
    console.log(`Template listening on port ${port}`);
  });

  setupGracefulShutdown(server, 'Template Server');
}

function StartTemplateWithLambda(f: LambdaTemplateFn): void {
  const lambda = new LambdaTemplate(f);
  StartTemplate(lambda);
}

// export all
export {
  StartProcessor,
  StartProcessorWithLambda,
  StartTemplate,
  StartTemplateWithLambda,
  StartPlugin,
  StartPluginWithLambda,
  CyanFileHelper,
  GlobType,
  QuestionType,
};

export type {
  ICyanTemplate,
  ICyanProcessor,
  ICyanPlugin,
  LambdaTemplateFn,
  LambdaPluginFn,
  IInquirer,
  IDeterminism,
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
