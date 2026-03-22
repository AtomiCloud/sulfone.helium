FROM python:3.11-slim
WORKDIR /app
LABEL cyanprint.dev=true
# hadolint ignore=DL3008
RUN apt-get update && apt-get install -y --no-install-recommends gcc && rm -rf /var/lib/apt/lists/*
COPY pyproject.toml poetry.lock* ./
RUN pip install --no-cache-dir poetry==1.8.5 && poetry config virtualenvs.in-project true && poetry install --no-root --only main
COPY . .
EXPOSE 5551
CMD ["poetry", "run", "python", "-c", "import asyncio; from cyanprintsdk.main import start_processor; from cyanprintsdk.api.processor.fn import LambdaProcessor; from cyanprintsdk.domain.processor.output import ProcessorOutput; import shutil; start_processor(LambdaProcessor(lambda i, f: asyncio.get_event_loop().run_in_executor(None, lambda: (shutil.copytree(i.read_dir, f.write_dir, dirs_exist_ok=True), ProcessorOutput(directory=f.write_dir))[1])))"]
