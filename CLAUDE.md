# AI-Enhanced Development Platform Guide

## Project Context
**Tech Stack**: Full-Stack Development with AI-Enhanced Workflow
**Architecture**: MCP-Powered Development Platform
**Quality Bar**: Clean code, comprehensive tests, security-first, performance-aware
**Status**: ✅ Production-ready foundation with 6 operational MCP servers

## Essential Commands
```bash
# Development
npm run dev          # Start development server
npm test            # Run tests
npm run build       # Production build
npm run lint        # Code quality check

# Git workflow
git checkout -b feature/name
git add . && git commit -m "type: description"
git push origin feature/name
```

## MCP Integration (All Operational ✅)

### Available Tools
- **GitHub**: Repository management, PR automation, issue tracking
- **Supabase**: Database operations, migrations, type generation
- **Playwright**: Browser automation, testing, E2E validation
- **Docker**: Container management, microservices, development environments
- **Context7**: Documentation lookup, API references
- **Fetch**: Web intelligence, API integration, content research

### Three-Tier Web Intelligence Strategy
```bash
# Tier 1: Simple Content → Fetch MCP (< 1 second)
mcp_fetch_fetch(url="https://api.github.com/repos/owner/repo")
# Use for: APIs, simple pages, JSON data

# Tier 2: Complex JS Sites → Playwright MCP (5-15 seconds)
mcp_playwright_browser_navigate(url="https://spa-app.com")
mcp_playwright_browser_snapshot()
# Use for: SPAs, JavaScript-heavy sites, dynamic content

# Tier 3: AI Content Extraction → Docker + Crawl4AI (10-30 seconds)
mcp_docker_run_container(
  image="unclecode/crawl4ai:latest",
  ports={"11235": 11235},
  auto_remove=true
)
# Use for: Technology research, competitive analysis, documentation extraction
```

### Development Workflow Integration
- **Research**: Web intelligence for technology assessment and competitive analysis
- **Database**: Supabase for schema management, migrations, real-time features
- **Testing**: Playwright for E2E testing and UI validation
- **Deployment**: Docker containers and microservices orchestration
- **Version Control**: GitHub automation for PRs, issues, code review

## Web Intelligence Applications

### Tool Selection
**Fetch MCP**: APIs, simple HTML, structured data
**Playwright MCP**: SPAs, JavaScript sites, user interactions
**Crawl4AI**: Technology research, API documentation, competitive intelligence

### Common Use Cases
- **Technology Research**: Framework comparisons, library assessments
- **API Integration**: Documentation extraction, endpoint specifications
- **Competitive Analysis**: Feature analysis, pricing research
- **Architecture Planning**: Best practices from successful implementations

## MCP Tools & Autonomous Usage

### Available MCP Servers

#### **Fetch MCP** - Web Content Retrieval
**Use for**: APIs, simple HTML, JSON data, static content
**Commands**: `mcp_fetch_fetch(url="...")`
**Autonomous patterns**:
- API data collection for research
- Simple content extraction
- JSON endpoint testing
- Static documentation retrieval

#### **Playwright MCP** - Browser Automation
**Use for**: SPAs, JavaScript sites, dynamic content, user interactions
**Commands**: `mcp_playwright_browser_navigate()`, `mcp_playwright_browser_snapshot()`, `mcp_playwright_browser_click()`
**Autonomous patterns**:
- Navigate complex web applications
- Take screenshots for verification
- Interact with dynamic elements
- Test user workflows

#### **Docker MCP** - Container Management
**Use for**: Service orchestration, Crawl4AI deployment, microservices
**Commands**: `mcp_docker_run_container()`, `mcp_docker_list_containers()`, `mcp_docker_stop_container()`
**Autonomous patterns**:
- Deploy services for specific tasks
- Run Crawl4AI for AI content extraction
- Manage development environments
- Clean up resources automatically

#### **GitHub MCP** - Version Control
**Use for**: Repository operations, PR management, issue tracking
**Commands**: `mcp_github_get_file_contents()`, `mcp_github_search_repositories()`, `mcp_github_create_pull_request()`
**Autonomous patterns**:
- Research codebases and implementations
- Analyze repository structures
- Manage development workflow
- Track project progress

#### **Supabase MCP** - Database Operations
**Use for**: Schema management, data operations, real-time features
**Commands**: `mcp_supabase_execute_sql()`, `mcp_supabase_list_tables()`, `mcp_supabase_generate_typescript_types()`
**Autonomous patterns**:
- Execute database queries
- Manage schema migrations
- Generate type definitions
- Handle real-time data

#### **Context7 MCP** - Documentation Lookup
**Use for**: API references, library documentation, integration guides
**Commands**: `mcp_context7_resolve_library_id()`, `mcp_context7_get_library_docs()`
**Autonomous patterns**:
- Research API documentation
- Find integration examples
- Lookup best practices
- Resolve technical questions

## Development Standards

### Code Quality
- Follow existing patterns consistently
- Functions are small and focused
- Clear variable and function names
- Comprehensive error handling
- No hardcoded values

### Testing
- E2E tests with Playwright for all user workflows
- Integration tests for APIs and database operations
- Test real external dependencies, not mocks
- Comprehensive error scenario testing

### Security
- Input validation on all inputs
- No secrets in code (use env vars)
- Proper authentication/authorization
- SQL injection prevention

## Common Patterns

### Error Handling
```javascript
try {
  const result = await operation();
  return { success: true, data: result };
} catch (error) {
  logger.error('Operation failed', { 
    error: error.message, 
    stack: error.stack,
    context: { operation: 'specific_operation' }
  });
  throw error; // Let caller handle, no silent failures
}
```

### API Response Format
```javascript
{
  success: boolean,
  data?: any,
  error?: string,
  metadata?: { pagination, etc }
}
```

## Quick Reference

### Common MCP Commands
```bash
# Web Intelligence
mcp_fetch_fetch(url="...")
mcp_playwright_browser_navigate(url="...")
mcp_docker_run_container(image="unclecode/crawl4ai:latest")

# Development Tools
mcp_github_get_file_contents(owner="...", repo="...", path="...")
mcp_supabase_execute_sql(query="...")
mcp_docker_list_containers()
```

### Decision Tree
```
Content extraction needed?
├── API/JSON data? → Use Fetch MCP
├── JavaScript/SPA? → Use Playwright MCP  
└── Research/Analysis? → Use Crawl4AI
```

### Autonomous Decision Making

**For Content Extraction**:
1. Simple/Static → Use Fetch MCP
2. Complex/Dynamic → Use Playwright MCP
3. AI Analysis → Use Docker MCP + Crawl4AI

**For Development Tasks**:
1. Code Research → Use GitHub MCP + Context7 MCP
2. Database Work → Use Supabase MCP
3. Testing → Use Playwright MCP
4. Infrastructure → Use Docker MCP

**Resource Management**:
- Always clean up Docker containers with `auto_remove=true`
- Use appropriate timeouts for long-running operations
- Batch operations when possible for efficiency

## Advanced Features

### RAG Implementation (No External APIs Required)

#### **OpenAI-Free RAG with Your Current Stack**
```bash
# 1. Enable pgvector in Supabase
mcp_supabase_execute_sql(query="CREATE EXTENSION IF NOT EXISTS vector;")

# 2. Create documents table
mcp_supabase_execute_sql(query="
  CREATE TABLE documents (
    id SERIAL PRIMARY KEY,
    content TEXT,
    metadata JSONB,
    source_url TEXT,
    embedding VECTOR(384)  -- Using local embedding models
  );
")

# 3. Extract content with Crawl4AI
mcp_docker_run_container(
  image="unclecode/crawl4ai:latest",
  ports={"11235": 11235},
  auto_remove=true
)
# POST to /crawl returns structured content ready for RAG

# 4. Use local embedding models (sentence-transformers)
# Docker container with embedding model:
mcp_docker_run_container(
  image="sentence-transformers/all-MiniLM-L6-v2",
  ports={"8080": 8080}
)

# 5. Semantic search without external APIs
mcp_supabase_execute_sql(query="
  SELECT content, metadata, source_url,
    1 - (embedding <=> $1) AS similarity
  FROM documents
  ORDER BY similarity DESC
  LIMIT 5;
")
```

#### **RAG Workflow with Your Tools**

**Content Collection**:
- **Tier 1**: `mcp_fetch_fetch()` for API documentation
- **Tier 2**: `mcp_playwright_browser_navigate()` for complex sites
- **Tier 3**: `mcp_docker_run_container(crawl4ai)` for AI-optimized extraction

**Storage & Retrieval**:
- **Store**: `mcp_supabase_execute_sql()` with pgvector embeddings
- **Search**: Semantic similarity without external API costs
- **Manage**: `mcp_docker_*()` for embedding service containers

**Practical Use Cases**:
- **Documentation RAG**: Store and search development docs
- **Competitive Intelligence**: Query competitor feature analysis
- **Code Examples**: Semantic search through GitHub repositories
- **API Integration**: Find relevant implementation examples

**Reference**: [coleam00/mcp-crawl4ai-rag](https://github.com/coleam00/mcp-crawl4ai-rag) for advanced features

### System Status
**Platform Status**: 🟢 FULLY OPERATIONAL
**Foundation**: Web Intelligence + Database + Testing + Deployment + Version Control
**Last Updated**: 2025-08-17

---

**Core Principle**: This platform provides intelligent automation for the complete development lifecycle. Use web intelligence to inform decisions, database tools for data management, and automation tools for efficient development.