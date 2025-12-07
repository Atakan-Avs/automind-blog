# AutoMind – AI-Powered Auto-Generated Blog  
An auto-generated blog system built as a full-stack and DevOps technical challenge using **React**, **Node.js**, **PostgreSQL**, **Docker**, and **AWS (ECR + CodeBuild + EC2)**.

AutoMind automatically creates daily AI-generated articles through a scheduled backend job and serves them through a clean, modern React frontend.  
The project is fully containerized and prepared for deployment on AWS EC2 using best practices for real-world CI/CD and infrastructure workflows.

---

## 🚀 Tech Stack

### **Frontend**
- React  
- Axios (API client)  
- Responsive, minimal UI  

### **Backend**
- Node.js + Express  
- PostgreSQL  
- Scheduled cron job for daily article generation  
- AI text generation integration (HuggingFace / OpenAI or similar)  

### **DevOps / Infrastructure**
- Docker (frontend & backend)  
- Docker Compose  
- AWS ECR (container registry)  
- AWS CodeBuild (CI for building images and pushing to ECR)  
- AWS EC2 (deployment target)

---

## 🧠 Features

- **Daily AI-generated articles** produced automatically via a cron job  
- **REST API** for listing and retrieving posts  
- **Modular and clean backend architecture** (routes, services, models)  
- **Fully dockerized system** ready for production  
- **Optimized for AWS pipeline usage**  
- **Simple, modern frontend UI** suitable for a SaaS-style blog dashboard

---

## 📁 Project Structure

```plaintext
.
├── backend/
│   ├── src/
│   │   ├── index.js          # Express server entry
│   │   ├── routes/           # Article routes
│   │   ├── services/
│   │   │   ├── aiClient.js   # AI text generation service
│   │   │   └── articleJob.js # Scheduled job (cron)
│   │   └── models/           # PostgreSQL models
│   ├── Dockerfile
│   ├── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api/client.js     # Axios instance
│   │   └── App.jsx
│   ├── Dockerfile
│   ├── package.json
│
├── docker-compose.yml        # Local development compose
│
├── infra/
│   ├── buildspec-backend.yml # AWS CodeBuild config (backend)
│   ├── buildspec-frontend.yml# AWS CodeBuild config (frontend)
│
└── README.md


🐳 Running Locally with Docker
Prerequisites

Docker & Docker Compose installed

PostgreSQL connection string

AI API key (env variable)



Local URLs

Frontend → http://16.170.253.195/

Backend API → http://16.170.253.195/



☁️ Deployment Overview (AWS)

1)Build Docker images for frontend and backend

2)Push images to AWS ECR (via CodeBuild or manually)

3)CodeBuild:

  Fetches code from GitHub

  Builds & pushes Docker images

4)EC2 instance runs containers using:

  Docker

or docker-compose

5)Configure security groups & environment variables

6)Serve the frontend publicly + connect to backend API

This setup follows real-world DevOps practices for small SaaS applications.






📌 Notes

This project was developed as part of a timed full-stack + DevOps technical challenge.
The focus areas include:

Clean backend architecture

Containerization with Docker

CI/CD using AWS CodeBuild

Managing images with AWS ECR

Deploying a production-grade app on EC2

