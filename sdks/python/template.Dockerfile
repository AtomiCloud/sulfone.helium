FROM python:3.11-slim

WORKDIR /app

# Install Poetry
RUN pip install --no-cache-dir poetry==1.7.1

# Copy Poetry configuration files
COPY pyproject.toml poetry.lock ./

# Configure Poetry to not create a virtual environment
RUN poetry config virtualenvs.create false && poetry install --no-dev

# Copy application code
COPY . .

# Default command to run the template test
CMD ["python", "template_test.py"] 