# Snippet Vault

A minimalist web application for saving, tagging, and searching text snippets, links, and terminal commands. Built with NestJS (Backend) and Next.js (Frontend).

## Features

- **Snippet Management:** Create, read, update, and delete snippets. Types include `note`, `link`, and `command`.
- **Search & Filtering:** Partial text-based search across titles and content, alongside exact-match tag filtering.
- **Pagination:** URL-driven pagination with configurable page sizes.
- **Responsive UI:** A modern, clean, responsive interface powered by Tailwind CSS with dark mode support.
- **OpenAPI Documentation:** Auto-generated Swagger docs for the backend API.

## Live Demo

- **Frontend:** [https://snippet-vault-web.onrender.com/](https://snippet-vault-web.onrender.com/)
- **Backend (Swagger):** [https://snippet-vault-api.onrender.com/api](https://snippet-vault-api.onrender.com/api#/)

> [!NOTE]
> These services are hosted on Render's free tier. Because of this, the first request after some inactivity may take up to 50 seconds or more to respond while the service "wakes up." If the app doesn't load immediately or shows an error, please wait a minute and refresh.

## Prerequisites

- **Node.js** (v18+)
- **MongoDB** — local instance, Docker container, or cloud-hosted (e.g., MongoDB Atlas)

---

## Getting Started

### 1. Database Setup

You need a running MongoDB instance. Choose one of the following options:

#### Option A: Docker Compose (recommended for local development)

A `docker-compose.yml` is included in the project root:

```bash
docker compose up -d
```

This starts a MongoDB container on port `27017`. Use the following connection string in your backend `.env`:

```text
MONGODB_URI=mongodb://admin:password@localhost:27017/snippet_vault?authSource=admin
```

#### Option B: Local MongoDB

If you have MongoDB installed locally, make sure the `mongod` service is running. Default connection string:

```text
MONGODB_URI=mongodb://localhost:27017/snippet_vault
```

#### Option C: MongoDB Atlas (Cloud)

Create a free cluster at [mongodb.com](https://www.mongodb.com/cloud/atlas) and use the provided connection string:

```text
MONGODB_URI=mongodb+srv://username:password@clustername/snippet_vault?retryWrites=true&w=majority&appName=Cluster0
```

---

### 2. Backend Setup (NestJS)

1. Navigate to the `backend` directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file (a `.env.example` is provided):

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and fill in your values. **All variables are required:**

   | Variable       | Description                        | Example                                     |
   | -------------- | ---------------------------------- | ------------------------------------------- |
   | `PORT`         | Port the backend server listens on | `3001`                                      |
   | `MONGODB_URI`  | MongoDB connection string          | `mongodb://localhost:27017/snippet_vault`   |
   | `FRONTEND_URL` | Frontend origin for CORS           | `http://localhost:3000`                     |

4. Start the server:

   - For development (with hot-reload):
     ```bash
     npm run start:dev
     ```
   - For production:
     ```bash
     npm run build
     npm run start:prod
     ```

The backend will be running at [http://localhost:3001](http://localhost:3001) (if `PORT=3001`).

Visit the **Swagger API documentation** at [http://localhost:3001/api](http://localhost:3001/api).

---

### 3. Frontend Setup (Next.js)

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file (a `.env.example` is provided):
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` and fill in your values. **All variables are required:**

   | Variable              | Description                      | Example                                |
   | --------------------- | -------------------------------- | -------------------------------------- |
   | `NEXT_PUBLIC_API_URL` | Full URL to the backend API      | `http://localhost:3001/snippets`       |

4. Start the server:
   - For development:
     ```bash
     npm run dev
     ```
   - For production:
     ```bash
     npm run build
     npm run start
     ```

The frontend will be running at [http://localhost:3000](http://localhost:3000) (default Next.js port).
