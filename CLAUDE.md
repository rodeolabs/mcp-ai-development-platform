# AI-Enhanced Development Platform Guide

*Autonomous AI Agent Workflow with Multi-Agent Coordination*

## Project Context
**Tech Stack**: Full-Stack Development with AI-Enhanced Workflow
**Architecture**: MCP-Powered Development Platform with Autonomous Sub-Agents
**Quality Bar**: Clean code, comprehensive tests, security-first, performance-aware
**Status**: ✅ Production Ready - 5 Sub-Agents + 6 MCP Servers + Full Automation

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

## Autonomous Sub-Agent Framework

### 5 Specialized Sub-Agents (Active)

#### **@code-reviewer**
**Role**: Code quality analysis and security validation
**Capabilities**: Syntax checking, best practices, vulnerability detection
**Integration**: Automatic invocation on all code changes

#### **@security-scanner** 
**Role**: Comprehensive security assessment
**Capabilities**: OWASP compliance, dependency scanning, auth validation
**Integration**: Parallel execution with code review

#### **@performance-optimizer**
**Role**: Performance analysis and optimization
**Capabilities**: Bundle analysis, runtime optimization, memory profiling
**Integration**: Triggered on performance-critical changes

#### **@test-automator**
**Role**: Automated testing and validation
**Capabilities**: Unit tests, E2E tests, regression testing
**Integration**: Full test suite execution and reporting

#### **@documentation-writer**
**Role**: Technical documentation generation
**Capabilities**: API docs, code comments, README updates
**Integration**: Automatic documentation sync with code changes

### Orchestration Patterns

#### **Parallel Processing (Primary)**
```
Main Agent → [@code-reviewer + @security-scanner] → @performance-optimizer → @test-automator → @documentation-writer → Auto-Merge
```

#### **Conditional Routing**
- **Simple changes**: @code-reviewer + @documentation-writer
- **Security-sensitive**: All agents with enhanced @security-scanner
- **Performance-critical**: Focus on @performance-optimizer + @test-automator

## MCP Integration (All Operational ✅)

### Available Tools for All Agents
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

### Fully Automated AI Workflow Architecture

#### **Complete Automation Flow:**
```
👤 Human in IDE
    ↓ (Task Request)
🤖 Main Agent (Claude Code with all 6 MCP tools)
    ↓ (Task Analysis & Sub-Agent Orchestration)
📝 @code-reviewer     🔒 @security-scanner     ⚡ @performance-optimizer
🧪 @test-automator   📚 @documentation-writer
    ↓ (Results Synthesis)
🤖 Automated PR Creation + Code Review + Auto-Merge (GitHub Actions)
    ↓ (Success/Failure Report)
👤 Human (Final Report + Rollback Option)
```

#### **Sub-Agent Orchestration Patterns:**
- **Parallel Processing**: Multiple agents work simultaneously on different aspects
- **Sequential Validation**: Security → Performance → Testing → Documentation
- **Conditional Routing**: Task complexity determines agent selection
- **Assembly Line Efficiency**: Standardized handoffs between specialized agents

### Development Workflow Integration
- **Research**: Web intelligence for technology assessment and competitive analysis
- **Database**: Supabase for schema management, migrations, real-time features
- **Testing**: Playwright for E2E testing and UI validation
- **Deployment**: Docker containers and microservices orchestration
- **Version Control**: Fully automated GitHub workflow (create → review → merge → report)

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

## Sub-Agent Communication Protocols

### Automated Workflow (No Human Intervention)
```markdown
## Sub-Agent Execution Flow

### Input Processing
**Main Agent**: Receives task → Analyzes complexity → Routes to appropriate sub-agents

### Parallel Execution
**@code-reviewer + @security-scanner**: Simultaneous analysis
**@performance-optimizer**: Triggered if performance flags detected
**@test-automator**: Comprehensive validation
**@documentation-writer**: Final documentation sync

### Output Synthesis
**Main Agent**: Aggregates results → Creates PR → Triggers auto-merge
```

### Escalation Rules (Minimal Human Intervention)

#### **Auto-Proceed Scenarios (95% of cases)**
- Code quality checks pass
- Security scans clear
- Tests pass
- Performance within thresholds

#### **Human Escalation Required (5% of cases)**
- Security vulnerabilities detected
- Test failures above threshold
- Performance degradation > 20%
- Breaking changes identified

## MCP Tools & Agent Specialization

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

**For Sub-Agent Orchestration**:
1. **Main Agent**: Full MCP access + orchestration logic
2. **Code Quality**: @code-reviewer + @security-scanner (parallel)
3. **Performance**: @performance-optimizer + @test-automator (sequential)
4. **Documentation**: @documentation-writer (final step)
5. **GitHub Automation**: Auto-merge with branch protection rules

**Resource Management**:
- Always clean up Docker containers with `auto_remove=true`
- Use appropriate timeouts for long-running operations
- Batch operations when possible for efficiency
- Sub-agents operate in isolated contexts for optimal performance

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

## Fully Automated Workflow Implementation

### **GitHub Actions Auto-Merge Setup**

#### **Required Repository Settings:**
```bash
# Enable auto-merge and configure branch protection
gh repo edit --enable-auto-merge
gh api repos/:owner/:repo/branches/main/protection -X PUT -f required_status_checks='{}' -f enforce_admins=false -f required_pull_request_reviews='{}' -f restrictions='{}'
```

#### **Enhanced GitHub Actions Permissions:**
```yaml
# .github/workflows/claude.yml enhancement needed:
permissions:
  contents: write
  pull-requests: write 
  issues: write
  id-token: write
  actions: read
  repository-projects: write
  statuses: write
```

#### **Auto-Merge Workflow Pattern:**
1. **Branch Creation**: `claude/issue-{number}-{timestamp}`
2. **Sub-Agent Orchestration**: Parallel processing with specialized agents
3. **Quality Gates**: Automated validation (security, performance, tests)
4. **PR Creation**: Auto-generated with comprehensive description
5. **Auto-Merge**: Triggered after all checks pass
6. **Human Notification**: Final report with rollback option

### **Sub-Agent Configuration (Active)**
```bash
# Sub-agents operational in .claude/agents/:
# - code-reviewer.md      ✅ Quality & security analysis
# - security-scanner.md   ✅ Vulnerability assessment  
# - performance-optimizer.md ✅ Speed & efficiency optimization
# - test-automator.md     ✅ Comprehensive testing automation
# - documentation-writer.md ✅ Technical documentation generation
```

### **Resource Management & Progress Tracking**
```bash
# Always use auto_remove for temporary containers
mcp_docker_run_container(image="...", auto_remove=true)

# TodoWrite Integration for all agents:
# - Task planning and breakdown
# - Progress tracking and status updates 
# - Handoff coordination between agents
# - Human checkpoint preparation
```

### System Status
**Platform Status**: 🟢 PRODUCTION READY WITH FULL AUTOMATION
**Architecture**: Human-IDE + Main Agent + 5 Sub-Agents + 6 MCP Servers + GitHub Auto-Merge
**Repository**: Clean, consolidated, all obsolete branches and files removed
**Documentation**: Streamlined and current as of 2025-08-19

---

**Core Principle**: This platform provides **fully autonomous development lifecycle automation** with strategic human oversight only for rollback decisions. Sub-agents handle specialized tasks while the main agent orchestrates the complete workflow from requirements to production deployment.
