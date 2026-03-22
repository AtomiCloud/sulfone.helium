FROM python:3.11-slim
WORKDIR /app
LABEL cyanprint.dev=true
# hadolint ignore=DL3008
RUN apt-get update && apt-get install -y --no-install-recommends gcc && rm -rf /var/lib/apt/lists/*
COPY pyproject.toml poetry.lock* ./
RUN pip install --no-cache-dir poetry==1.8.5 && poetry config virtualenvs.in-project true && poetry install --no-root --only main
COPY . .
RUN useradd -m appuser && chown -R appuser:appuser /app
USER appuser
EXPOSE 5553
CMD ["poetry", "run", "python", "-c", "import asyncio; from cyanprintsdk.main import start_resolver; from cyanprintsdk.api.resolver.fn import LambdaResolver; from cyanprintsdk.domain.resolver.output import ResolverOutput; start_resolver(LambdaResolver(lambda i: asyncio.sleep(0, result=ResolverOutput(path='output.txt', content=i.files[0].content if i.files else ''))))"]
