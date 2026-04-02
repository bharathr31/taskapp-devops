# ✅ Fully Containerized Cloud‑Native Task Management Application (DevOps Project)

## 📌 Overview

This project is a **production‑grade, cloud‑native full‑stack task management application** built with a strong **DevOps focus**.  
It demonstrates how to design, deploy, secure, and operate a scalable system using **containers, managed cloud services, and CI/CD automation**.

The application supports:
- User authentication with JWT
- Task management (CRUD operations)
- Persistent data storage
- Secure access via an API Gateway
- Fully automated deployments
- Zero local runtime dependencies in production

All components run on **Microsoft Azure**, following **real‑world DevOps best practices**.

---

## 🧩 Application Features

- ✅ User signup & login using JWT authentication
- ✅ Create, read, update, and delete tasks
- ✅ Persistent storage across sessions
- ✅ Stateless and scalable backend
- ✅ Secure API routing via Nginx Gateway
- ✅ Fully automated CI/CD pipeline
- ✅ Cloud‑native architecture (no local dependencies)

---

## 🏗️ High‑Level Architecture


```
Browser
   │
   ▼
Nginx API Gateway (Azure Container App – External)
   │
   ▼
Backend API (Node.js / Express – Internal)
   │
   ▼
Azure Cosmos DB (MongoDB API)
```

### Architecture Characteristics

- Single external entry point (API Gateway)
- Backend and frontend are internal services
- Reverse proxy routing using Nginx
- Stateless containers
- Managed database in the cloud
- Environment‑agnostic configuration

---

## 🛠️ Technology Stack

### Frontend
- React
- Nginx (serving production build)
- Docker

### Backend
- Node.js
- Express.js
- JWT authentication
- REST APIs for task management

### Database
- MongoDB (local development)
- Azure Cosmos DB (MongoDB API) for cloud deployment

### DevOps & Cloud
- Azure Container Apps (ACA)
- Azure Container Registry (ACR)
- Azure Key Vault
- GitHub Actions (CI/CD)
- Azure Managed Identities and RBAC

---

## 🔀 Networking & Request Flow


### Request Lifecycle

1. User accesses the application via browser
2. Request hits the **Nginx API Gateway**
3. Gateway routes traffic:
   - `/` → Frontend container
   - `/api/*` → Backend container
4. Backend handles authentication and task logic
5. Backend reads/writes data in Azure Cosmos DB
6. Response flows back through the Gateway

### Networking Decisions

- Backend is **not publicly exposed**
- Gateway is the **only ingress**
- Clean separation of concerns
- Simplified security and routing

---

## 🔐 Security & Secrets Management


Secrets are **never stored** in:
- Source code
- GitHub repository
- Container images

### Secrets Stored in Azure Key Vault

| Purpose | Key Vault Secret | Runtime Variable |
|------|----------------|----------------|
| Database connection | `mongo-uri` | `MONGO_URI` |
| JWT signing key | `jwt-secret` | `JWT_SECRET` |

### Security Model

- Backend Container App uses **System‑Assigned Managed Identity**
- Azure RBAC grants **read‑only** access to secrets
- Secrets are injected **at runtime**
- No plaintext secrets anywhere in the pipeline

---

## 🐳 Containerization Strategy

Each component runs as an independent container:

| Component | Responsibility |
|--------|--------------|
| Frontend | React build served via Nginx |
| Backend | Express API for auth & tasks |
| Gateway | Reverse proxy and routing |

### Benefits

- Independent deployments
- Fault isolation
- Horizontal scalability
- Clear responsibility boundaries

---

## ⚙️ CI/CD Pipeline (GitHub Actions)


### Pipeline Overview

Every push to the `main` branch triggers:

1. Checkout source code
2. Login to Azure using Service Principal
3. Build Docker images for:
   - Frontend
   - Backend
   - Gateway
4. Push images to Azure Container Registry
5. Deploy updated images to Azure Container Apps

### CI/CD Characteristics

- Fully automated
- Zero manual Azure Portal steps
- Immutable image updates
- Production‑grade deployment flow

Workflow location:
```
.github/workflows/deploy.yml
```


---

## 📈 Scaling & Reliability

- Backend configured with minimum replicas to avoid cold starts
- Stateless services allow safe scaling
- Azure Container Apps manages restarts and health checks
- Cosmos DB provides built‑in high availability

---

## 🖼️ Application Screenshots

### Frontend UI
<img width="1880" height="934" alt="image" src="https://github.com/user-attachments/assets/87a90b7c-405c-4bd3-b983-47652dec91ae" />
<img width="1919" height="858" alt="image" src="https://github.com/user-attachments/assets/baec614d-4244-43db-a52f-0f4ddec850b3" />
### All Resources Used

<img width="1861" height="772" alt="image" src="https://github.com/user-attachments/assets/16ad3cc1-fbd7-4023-8960-86c402496213" />
<img width="1873" height="794" alt="image" src="https://github.com/user-attachments/assets/1892e174-8356-4555-b6bc-92de1602b273" />


### Azure Container Apps
<img width="1895" height="621" alt="image" src="https://github.com/user-attachments/assets/c228541c-cee5-46be-9915-698b8f833529" />


---

## 🧠 Key DevOps Decisions

### Why Azure Container Apps?
- Serverless container platform
- No Kubernetes cluster management
- Built‑in HTTPS and scaling

### Why API Gateway Pattern?
- Centralized ingress control
- Strong security boundary
- Clean frontend configuration using `/api/*`

### Why Azure Cosmos DB?
- Fully managed database
- High availability
- No operational overhead

### Why GitHub Actions?
- Native GitHub integration
- Simple and transparent automation
- Strong DevOps signaling

---

## ✅ Current Project Status

- ✅ Fully deployed and functional on Azure
- ✅ Secure secrets via Azure Key Vault
- ✅ Automated CI/CD pipeline
- ✅ Persistent cloud database
- ✅ Production‑ready cloud architecture

---


## 🌱 Future Enhancements

- Infrastructure as Code (Terraform / Bicep)
- Advanced autoscaling policies
- Centralized observability and alerting
- Blue‑green deployments

---

## 🏁 Final Notes

This project represents a **real‑world DevOps implementation**, emphasizing automation, security, and scalability over manual configuration.  
All architectural decisions align with **cloud‑native production best practices**.
