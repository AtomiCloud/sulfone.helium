FROM python:3.11-slim
WORKDIR /app
LABEL cyanprint.dev=true
# hadolint ignore=DL3008
RUN apt-get update && apt-get install -y --no-install-recommends gcc && rm -rf /var/lib/apt/lists/*
COPY pyproject.toml poetry.lock* ./
RUN pip install --no-cache-dir poetry==1.8.5 && poetry config virtualenvs.in-project true && poetry install --no-root --only main --no-cache-dir
COPY . .
RUN useradd -m appuser && chown -R appuser:appuser /app
USER appuser
EXPOSE 5552
CMD ["poetry", "run", "python", "-c", "import asyncio; from cyanprintsdk.main import start_plugin; from cyanprintsdk.api.plugin.fn import LambdaPlugin; from cyanprintsdk.domain.plugin.output import PluginOutput; start_plugin(LambdaPlugin(lambda i: asyncio.sleep(0, result=PluginOutput(directory=i.directory))))"]
