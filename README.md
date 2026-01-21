# Event-Driven Microservices Demo

A polyglot microservices architecture demonstrating asynchronous communication between Node.js and Python services using RabbitMQ and Docker.

![Build Status](https://github.com/Asani-A/api-pipeline-demo/actions/workflows/ci.yml/badge.svg)

## Architecture

This project implements a **Producer-Consumer** pattern to decouple the API from background processing:

```
    A[Client] -- POST /users --> B(Node.js API)
    B -- Event: user_created --> C{RabbitMQ}
    C -- Queue --> D(Python Worker)
    D -- Action --> E[Send Welcome Email]
```

* Service A (Node.js): REST API that handles user requests and publishes events.
* Service B (Python): Background worker that consumes events and performs heavy tasks (simulated email sending).
* Broker (RabbitMQ): Message queue ensuring reliable delivery between services.

## Key Features
* Event-Driven Design: Asynchronous communication ensures the API remains fast and responsive.
* Polyglot Stack: Demonstrates interoperability between TypeScript/Node.js and Python.
* Resilience: Implements retry logic and durable queues to handle broker downtime or restarts.
* Containerization: Fully Dockerized environment using Docker Compose.
* CI/CD: Automated testing and build pipelines via GitHub Actions.

## Tech Stack
* Services: Node.js (Express), Python (Pika)
* Broker: RabbitMQ
* Infrastructure: Docker, Docker Compose
* Testing: Jest, Supertest

## Getting Started

### Prerequisites 
* Docker & Docker Compose
* Git

### Installation & Run 

1. Clone the repository:
```
git clone git@github.com:Asani-A/api-pipeline-demo.git
cd api-pipeline-demo
```

2. Start the Ecosystem:
```
docker compose up --build
```

3. Trigger an Event: Open a new terminal and send a request to the API:
```
curl -X POST http://localhost:3000/users \
   -H "Content-Type: application/json" \
   -d '{"name": "Microservice User", "email": "demo@example.com"}'
```

4. Observe the Result: Check the Docker logs. You will see the Node API publish the message and the Python Worker immediately pick it up:
```
api-1     | Message sent to queue: {"id":1,"name":"Microservice User"...}
worker-1  | [x] Received New User Event: {"id":1,"name":"Microservice User"...}
worker-1  | [x] Email sent!
```

## Project Structure
```
api-pipeline-demo/
├── src/               # Node.js API Source
│   ├── controllers/   # HTTP Handlers
│   ├── services/      # Business Logic & RabbitMQ Publisher
│   └── routes/        # Endpoint Definitions
├── python-worker/     # Python Background Service
│   ├── main.py        # Consumer Logic
│   └── Dockerfile     # Python Environment
├── docker-compose.yml # Orchestration Config
└── Dockerfile         # Node.js Environment
```
