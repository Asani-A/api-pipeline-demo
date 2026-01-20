# TypeScript Express API (CI/CD Pipeline Demo)

![Build Status](https://github.com/Asani-A/api-pipeline-demo/actions/workflows/ci.yml/badge.svg)

A production-ready REST API boilerplate demonstrating Clean Architecture, Test-Driven Development (TDD), and Automated DevOps.

## Overview

This repository serves as a reference implementation for a modern backend service. It focuses on software design patterns that ensure scalability, maintainability, and reliability in a team environment.

## Key Features

* **Strict TypeScript:** Fully typed codebase for compile-time safety.
* **Layered Architecture:** strict separation of concerns (Controllers, Services, Models).
* **Automated Testing:** Jest and Supertest integration with endpoint coverage.
* **CI/CD Pipeline:** GitHub Actions workflow that automatically lints, tests, and builds on every push.
* **API Documentation:** Interactive OpenAPI/Swagger UI served at `/api-docs`.
* **Security:** Environment configuration management and strict type validation.

## Tech Stack

* **Runtime:** Node.js (v20)
* **Framework:** Express.js
* **Language:** TypeScript
* **Testing:** Jest, Supertest
* **DevOps:** GitHub Actions
* **Documentation:** Swagger UI / OpenAPI 3.0

## Architecture

This project follows a modular service-based pattern to decouple business logic from the HTTP transport layer:

```text
src/
├── controllers/  # Request validation and HTTP logic
├── services/     # Business logic and data manipulation
├── models/       # Data interfaces and schemas
├── routes/       # URL mapping
├── docs/         # OpenAPI/Swagger definitions
└── tests/        # Unit and Integration tests

## Getting Started

* Node.js (v18 or higher)
* npm

### Installation

1. Clone the repository:
```

git clone git@github.com:Asani-A/api-pipeline-demo.git

```

2. Install dependencies:
```

cd api-pipeline-demo
npm install

```

### Development
Start the server in watch mode (hot-reloading enabled):
```

npm run dev

```
* The API will start at http://localhost:3000
* The interactive documentation is available at http://localhost:3000/api-docs

### Testing
Run the full test suite using Jest:
```

npm test

```
Run the linter to check for code style issues:
```

npm run lint

```

## CI/CD Workflow

This repository uses GitHub Actions to enforce code quality. The pipeline definition is located in .github/workflows/ci.yml.

### Workflow Steps:

1. Trigger: Activates on any push to the main branch or creation of a Pull Request.

2. Install: Performs a clean installation of dependencies (npm ci) to ensure consistency.

3. Lint: Runs ESLint to verify code standards.

4. Test: Executes all unit and integration tests.

5. Build: Compiles the TypeScript code to ensure no type errors exist in the production build.

If any step fails, the merge is blocked to prevent broken code from reaching production.
