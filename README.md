# AI Backend

### ai-backend/.python-version  
Specifies the Python runtime version for the AI backend.  
- Contains a single line: `3.11`  
- Used by tools like pyenv to lock the interpreter version.

### ai-backend/README.md  
Describes setup and purpose of the AI microservice.  
- Explains installation of dependencies via `pip`.  
- Shows how to configure environment variables in `.env`.  
- Details how to run the FastAPI server with Uvicorn.

### ai-backend/central_schemes.txt  
Plain‐text dump of scraped government scheme data.  
- Contains raw sections for each scheme: name, ministry, eligibility, benefits, etc.  
- Serves as input to embedding and RAG pipelines.

### ai-backend/json_to_txt.ipynb  
Jupyter notebook to convert JSON records into plain text.  
- Loads `schemes_structured_documents.json`.  
- Transforms each JSON object into a continuous text block.  
- Useful for preparing data for embedding.

### ai-backend/main.py  
FastAPI application exposing RAG and health endpoints.  
- Loads environment variables with `python-dotenv`.  
- Registers three routes:  
  - `GET /test` returns a success message.  
  - `GET /rag/{query}` calls `final_answer(query)`.  
  - `GET /roadmap` calls `final_roadmap_answer(query)`.  
- Integrates with RAG logic in `rag.py`.  

```python
from fastapi import FastAPI
import json
from dotenv import load_dotenv
from rag import final_answer, final_roadmap_answer

load_dotenv()
app = FastAPI()

@app.get("/test")
def initialTest():
    return {"status": "success", "message": "AI backend is working 🚀"}

@app.get("/rag/{query}")
async def get_rag_response(query: str):
    response = await final_answer(query)
    return {"status": "success", "query": query, "response": response}

@app.get("/roadmap/")
async def get_roadmap_response(query: str):
    query = query.replace("%20", " ")
    response = await final_roadmap_answer(query)
    return {"status": "success", "query": query, "response": response}
```

### ai-backend/mongo.py  
Configures MongoDB connection for vector store.  
- Reads `CONNECTION_URI` from environment.  
- Connects to `rag_db.schemes` collection.  
- Pings database to verify connectivity.

### ai-backend/pyproject.toml  
Metadata and dependency manifest for Poetry.  
- Defines project name, version, description.  
- Requires Python ≥3.11.  
- Lists dependencies: FastAPI, LangChain, pymongo, python-dotenv, Uvicorn.

```toml
[project]
name = "ai-backend"
version = "0.1.0"
requires-python = ">=3.11"
dependencies = [
  "fastapi>=0.128.0",
  "langchain>=1.2.3",
  "langchain-google-genai>=4.1.3",
  "pymongo[srv]>=4.16.0",
  "python-dotenv>=1.2.1",
  "uvicorn>=0.40.0",
]
```

### ai-backend/rag.ipynb  
Interactive notebook exploring RAG pipeline.  
- Loads LangChain’s Google Generative AI and embeddings.  
- Demonstrates text splitting, embedding, and vector search.  
- Contains experiments for prompt templates and output parsing.

### ai-backend/rag.py  
Implements core RAG functions.  
- **`generate_embedding(text)`**: embeds text via GoogleEmbeddings.  
- **`get_query_results(query)`**: runs MongoDB vector search.  
- **`final_answer(query)`**: builds prompt from retrieved docs and calls LLM.  
- **`final_roadmap_answer(query)`**: similar flow tailored for roadmap generation.  

### ai-backend/requirements.txt  
Pin‐file for pip installations.  
- Extensive list including FastAPI, httpx, LangChain, pydantic, etc.  
- Ensures reproducible install via `pip install -r requirements.txt`.

### ai-backend/schemes_structured_documents.json  
Structured JSON array of scraped schemes.  
- Each object has keys: `scheme_name`, `ministry`, `department`, `key_sectors`, `brief`, `eligibility`, `benefits`, `benefit_tags`, `tenure`, `application_link`.

### ai-backend/scraper.py  
Scrapes government portal HTML and outputs JSON.  
- Uses BeautifulSoup to parse `<div class="card-box">`.  
- Extracts fields by header labels (e.g., “Eligibility”, “Benefits”).  
- Writes results to `schemes_structured_documents.json`.

---

# Backend (Flask API)

### backend/.python-version  
Locks Python to version `3.11`.

### backend/README.md  
Instructions for setting up the Flask API.  
- Install dependencies via Poetry.  
- Set environment variables in `.env`.  
- Run with `flask run` or `python main.py`.

### backend/db.py  
Provides a helper to connect to PostgreSQL.  
- Reads `DB_HOST`, `DB_USER`, `DB_PASSWORD` from environment.  
- Returns a `psycopg2` connection with SSL mode `require`.

```python
import psycopg2, os

def get_db_connection():
    return psycopg2.connect(
        host=os.getenv("DB_HOST"),
        database="postgres",
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        port=5432,
        sslmode="require"
    )
```

### backend/main.py  
Flask server defining user auth, roadmap, and chat endpoints.  
- Configures CORS, bcrypt, JWT.  
- Routes include:  
  - `POST /signup` for registration.  
  - `POST /login` returns JWT.  
  - `POST /roadmap_genration_form` stores form data in `startup_forms`.  
  - `POST /generate_roadmap` fetches AI roadmap and saves to `roadmaps` table.  
  - `GET /my-roadmap` retrieves latest roadmap for user.

### backend/pyproject.toml  
Project definition and dependencies for Poetry.  
- Requires Flask, flask-bcrypt, flask-cors, psycopg2, pyjwt, requests.

### backend/Data/schemes_structured_documents.json  
Duplicate of AI backend’s JSON data, used for any direct backend consumption or testing.

### backend/schema/startup_form.sql  
Defines the `startup_forms` table.

```sql
CREATE TABLE startup_forms (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  startup_idea TEXT NOT NULL,
  age INTEGER CHECK (age > 0),
  gender VARCHAR(20),
  category VARCHAR(50),
  location VARCHAR(100),
  funding_status VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### backend/schema/user.sql  
Defines the `users` table (typical structure):

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

# Frontend (React + TypeScript)

### frontend/README.md  
Setup guide using Node.js & npm (or bun).  
- Clone repo, install dependencies (`npm i`), run dev server (`npm run dev`).  
- Lists technologies: Vite, React, TypeScript, shadcn-UI, Tailwind CSS.

### frontend/public/robots.txt  
Standard robots exclusion to allow all.

### frontend/index.html  
Base HTML template injecting React app root.

### frontend/package.json  
Metadata and scripts for frontend:  
- Dependencies: React, Radix UI, Tailwind, axios, React Router, etc.  
- Scripts: `dev`, `build`, `preview`.

### frontend/vite.config.ts  
Configures Vite: React plugin, alias for `@/` to `src/`, environment variables.

### frontend/postcss.config.js  
Sets up PostCSS with Tailwind CSS and autoprefixer.

### frontend/tailwind.config.ts  
Tailwind CSS configuration: custom themes, content paths.

### frontend/tsconfig.json & tsconfig.app.json & tsconfig.node.json  
TypeScript configuration for the app and tooling.

---

## React Components

### Layout  
- **Header.tsx** — site navigation, logo, menu.  
- **Footer.tsx** — site footer, links, copyright.

### Home  
- **HeroSection.tsx** — landing hero with headline and CTA.  
- **FeaturesSection.tsx** — feature highlights grid.  
- **SchemesPreview.tsx** — preview of schemes catalog.  
- **KnowledgeBankPreview.tsx** — teaser of knowledge resources.

### Dashboard  
- **OnboardingModal.tsx** — modal guiding user through initial profile steps.  
- **ProfileCompletion.tsx** — progress bar / prompts to complete profile.  
- **QuickActions.tsx** — shortcuts to primary features.  
- **UserOverview.tsx** — user stats (schemes saved, AI interactions).  
- **JourneyInsights.tsx** — charts showing user progress and roadmap.

### Schemes & Knowledge  
- **Schemes.tsx** — full scheme listing with filters, search, pagination.  
- **Knowledge.tsx** — curated resources listing.  

### Auth & Routing  
- **Auth.tsx** — login/signup form and flow.  
- **ProtectRoutes.tsx** — higher-order component to guard protected pages.  
- **App.tsx** — main router setup combining public and protected routes.  
- **main.tsx** — React app entrypoint.

---

## UI Primitives (`src/components/ui`)  
Reusable building blocks wrapping Radix UI primitives and styled with Tailwind:  
- Accordion, Alert, Badge, Breadcrumb, Button, Card, Checkbox, Dialog, DropdownMenu, Input, Label, Popover, Progress, RadioGroup, ScrollArea, Select, Separator, Sheet, Skeleton, Slider, Switch, Table, Tabs, Textarea, Tooltip, etc.  
- Pattern: each file exports a single component with consistent styling API.

---

## Hooks & Contexts

### src/hooks/use-mobile.tsx  
Detects mobile device viewport to toggle responsive layouts.

### src/hooks/use-toast.ts  
Wraps Sonner toast notifications for global use.

### src/contexts/UserProfileContext.tsx  
Provides user profile state, update functions, and onboarding modal control via React Context. Persists to `localStorage`.

---

## Utilities

### src/lib/utils.ts  
Common helpers (e.g., formatting dates, URLs, string transformations).

### src/components/NavLink.tsx  
Custom wrapper for React Router’s `NavLink` to apply active styles.

---

# Project Context

### PROJECT_CONTEXT.txt  
Narrative of project goals, scope, data sources, roadmap, security considerations, and team focus. Guides future development and feature prioritization.

---


This documentation should guide you through each code file’s purpose, how they interconnect, and where to extend or modify functionality.
