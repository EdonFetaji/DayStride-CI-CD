# DayStride 

A **modern habit & goal tracker**, deployable with **Docker Compose**, **Kubernetes (k3d)**, and **GitHub Actions CI/CD**.

---

## Features

-  Django REST Framework backend
-  React Vite frontend (Mantine UI) served with NGINX
-  MySQL database
-  JWT authentication (goals, habits, todos)
-  Dockerized & Kubernetes ready
-  GitHub Actions CI/CD with optional EC2 pipeline
-  Ingress support (NGINX / Traefik)
-  Secrets management with Kubernetes Secrets

---


## 🔐 Secrets & Environment Variables
```ini

DJANGO_SECRET

DB_NAME

DB_PASSWORD

DB_PORT (default: 3306)

FRONTEND_HOST (Kind of misleading name - used by backend container to allow cors headers from, k8s: ingress hostname rule, docker: frontend service name)

FRONTEND_PORT (default: 80)

DB_HOST (in K8s: mysql-0.mysql, docker: db service name)
```

## ⚙️ Continuous Integration (CI)

A **GitHub Actions pipeline** is implemented in `.github/workflows/ci.yml` to automate **testing and Docker image builds** on every push or pull request to the `main` branch.

---

### Pipeline Steps

- **Unit Testing**
  - Runs on `ubuntu-latest` with Python 3.12.
  - Installs backend dependencies from `requirements.txt`.
  - Executes Django unit tests using:
    ```bash
    python manage.py test
    ```

- **Docker Image Build & Push**
  - Executes after successful unit tests.
  - Uses Docker Buildx for multi-platform builds.
  - Builds and pushes:
    - `daystride-backend:latest` (from `./backend`)
    - `daystride-frontend:latest` (from `./frontend`)
  - Pushes images to Docker Hub using repository secrets:
    - `DOCKERHUB_USERNAME`
    - `DOCKERHUB_TOKEN`

---

This pipeline ensures all code changes on `main` are **tested and built into Docker images automatically and consistently**.

---

## 🚀 Continuous Deployment (CD)

A **GitHub Actions deployment pipeline** is implemented in `.github/workflows/cd-ec2-deploy.yml` to **deploy the application stack to an AWS EC2 instance using Docker Compose**.

---

### Pipeline Steps

- **Trigger**
  - Manual trigger using `workflow_dispatch` on the `main` branch.

- **EC2 Instance Preparation**
  - Configures AWS credentials using repository secrets.
  - Checks for an existing EC2 instance tagged `daystride-ec2`.
  - Launches a new EC2 instance using the `EC2_LAUNCH_TEMPLATE_ID` if not found.
  - Waits for the instance to pass health checks.
  - Retrieves and outputs the EC2 instance’s public IP.

- **Deployment**
  - Copies `docker-compose.yaml` to the EC2 instance using SSH.
  - Creates an `.env` file on the instance using the following secrets:
    ```ini
    DJANGO_SECRET
    DB_NAME
    DB_PORT
    DB_PASSWORD
    FRONTEND_HOST
    ```
  - Runs:
    ```bash
    docker-compose --env-file .env down
    docker-compose --env-file .env up -d
    ```
    ensuring the stack is **cleanly recreated and updated using the latest images from Docker Hub**.

---

## 🚦 Usage

- **CI** runs automatically on push or pull request to `main` for **testing and building Docker images**.
- **CD** is triggered manually when a **deployment to the EC2 instance** is required for staging or production.

---
## ☸️ Kubernetes

DayStride includes **Kubernetes manifests** for deploying the stack on a local or remote cluster.

---

## Structure

- **Namespace:** Creates an isolated `daystride` namespace.
- **Secrets:** Stores environment variables securely.
- **Database:** MySQL 8 StatefulSet with persistent volume.
- **Backend:** Django backend Deployment and Service.
- **Frontend:** React Vite frontend Deployment and Service.
- **Ingress:** Routes `daystride.web` to the frontend using Traefik or NGINX ingress.

---

## Features

- **Stateful MySQL database** with persistent volume and secret-based configuration.
- **Rolling updates** for frontend and backend deployments with controlled surges.
- **Ingress routing** with hostname-based access (`daystride.web`).
- **Environment variable injection** via Kubernetes Secrets.
- **Namespace isolation** for clean cluster management.

---

## Running on k3d

To create a local **k3d cluster** for DayStride:

```bash
k3d cluster create daystride-cluster -s 1 -a 1 -p "80:80@loadbalancer" --api-port 127.0.0.1:52552
```

## Applying Kubernetes Manifests
Apply the Kubernetes manifests in the following order:

1. db-namespace.yaml

2. mysql-secrets.yaml

3. Install mysql-operator (through helm)

4. innodb-cluster.yaml

5. init-db-job.yaml

6. namespace.yaml

7. secrets.yaml

8. backend.yaml

9. frontend.yaml

10. ingress.yaml

If helm (k8s packet manager) is uninstalled run:  
```bash
helm repo add mysql-operator https://mysql.github.io/mysql-operator/
helm repo update
```
Copy the code to run the cluster Immediately:
``` bash
kubectl apply -f db-namespace.yaml
kubectl apply -f mysql-secrets.yaml

helm install mysql-operator mysql-operator/mysql-operator -n db-daystride

kubectl apply -f innodb-cluster.yaml

kubectl apply -f namespace.yaml
kubectl apply -f secrets.yaml

kubectl apply -f init-db-job.yaml

kubectl apply -f backend.yaml
kubectl apply -f frontend.yaml

kubectl apply -f ingress.yaml
```
After applying, the frontend will be accessible at:

http://daystride.web

