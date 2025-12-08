AutoMind Blog
AI-Powered Automated Content Platform

AutoMind Blog is a fully containerized, cloud-ready content platform that automatically generates and publishes articles using AI.
The system includes a React-based frontend, a Node.js backend with PostgreSQL, and an automated daily content generator powered by HuggingFace models.
Deployment is optimized for AWS using Docker, ECR, CodeBuild, and EC2.

✨ Key Features

Automated Daily Content Generation via AI text models

Responsive React Frontend for browsing and reading articles

RESTful API for article creation, retrieval, and AI generation

PostgreSQL-backed persistent storage

Dockerized architecture for streamlined deployment

AWS-based infrastructure (ECR + CodeBuild + EC2)

Seeded initial dataset on first run

Production-ready environment configuration

🌐 Live Application

http://16.170.253.195/

(Frontend + Backend served via Nginx/Node containers)

⚙️ Architecture Overview
┌──────────────────────────────────────────────┐
│                   Frontend                   │
│        React (Vite) – Axios – TypeScript     │
└──────────────────────────────────────────────┘
                  ▲               │
                  │ API Calls     │
                  ▼               │
┌──────────────────────────────────────────────┐
│                   Backend                    │
│   Node.js – Express – node-cron – HuggingFace │
└──────────────────────────────────────────────┘
                  │
                  ▼
┌──────────────────────────────────────────────┐
│                 PostgreSQL                   │
└──────────────────────────────────────────────┘

Deployed on:
AWS EC2 • AWS ECR • AWS CodeBuild • Docker Compose

📁 Repository Structure
.
├── backend/
│   ├── src/
│   │   ├── index.js
│   │   ├── routes/
│   │   ├── services/
│   │   ├── models/
│   │   ├── jobs/
│   │   └── seed.js
│   ├── Dockerfile
│   └── package.json
│
├── frontend/
│   ├── src/
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml
└── README.md

🛠 Local Development (Docker)
1. Requirements

Docker & Docker Compose

PostgreSQL connection string

HuggingFace API key

2. Backend Environment Variables

Create backend/.env:

DATABASE_URL=postgres://USER:PASSWORD@HOST:5432/DBNAME
HF_API_TOKEN=your_huggingface_api_token
HF_MODEL_ID=tiiuae/falcon-7b-instruct
ARTICLE_CRON_SCHEDULE=0 8 * * *    # Daily at 08:00

3. Start the Stack
docker-compose up --build


Access locally:

Frontend: http://localhost:5173

Backend: http://localhost:4000

🚀 Production Deployment (AWS)

AutoMind Blog is prepared for cloud deployment using AWS services:

ECR

Docker images are built and stored in AWS Elastic Container Registry.

CodeBuild

Automated build pipeline that:

Installs dependencies

Builds frontend & backend images

Pushes updated images to ECR

EC2

Production environment runs via:

docker-compose pull
docker-compose up -d


The EC2 instance pulls the latest images and orchestrates the frontend/backend containers.

🤖 Automated Article Generation

A scheduled cron job executes daily and performs:

Sends a generation prompt to a HuggingFace model

Receives AI-generated text

Saves the article to PostgreSQL

Makes the content available immediately through the API and UI

Manual Trigger Endpoint
POST /api/articles/run-daily-test

📡 REST API Reference
Method	Endpoint	Description
GET	/api/articles	Retrieve all articles
GET	/api/articles/:id	Retrieve a single article
POST	/api/articles	Create article manually
POST	/api/articles/generate	Generate new article via AI
POST	/api/articles/run-daily-test	Trigger daily job manually
GET	/health	Health check
🖥 Frontend Overview

Clean and minimal UI

Article list (left panel)

Article details (right panel)

Fully responsive layout

Integrated with backend API

🗄 Initial Seed Data

On first initialization, the system seeds a base dataset:

Welcome to AutoMind Blog

AI-powered content generation

Daily auto-generated articles

🔧 Future Enhancements

Planned future developments include:

Admin dashboard with authentication

Full-text search & filtering

Logging and monitoring dashboards (CloudWatch / Grafana)

Caching layer for API performance

Support for multiple AI models

Advanced writing styles & topic categories

📞 Contact

Atakan Avsever
GitHub: https://github.com/Atakan-Avs

LinkedIn: https://linkedin.com/in/atakanavsever
