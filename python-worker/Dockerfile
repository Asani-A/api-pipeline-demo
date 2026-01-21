FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Python buffers stdout, so we need to flush it to see logs in Docker immediately
CMD ["python", "-u", "main.py"]
