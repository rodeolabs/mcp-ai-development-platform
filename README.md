# MCP AI Development Platform

> **AI-Enhanced Development Platform** with 6 operational MCP servers, three-tier web intelligence, and production-ready foundation.

## 🚀 Overview

This platform demonstrates a complete **Model Context Protocol (MCP)** implementation for AI-enhanced software development workflows. Built with a security-first, performance-aware approach, it provides intelligent automation for the complete development lifecycle.

## 🏗️ Architecture

### **Tech Stack**
- **Full-Stack Development** with AI-Enhanced Workflow
- **MCP-Powered Platform** with 6 operational servers
- **Three-Tier Web Intelligence Strategy**
- **Production-Ready Foundation** with comprehensive testing

### **Core Components**

| Component | Purpose | Status |
|-----------|---------|--------|
| **GitHub MCP** | Repository management, PR automation, issue tracking | ✅ Operational |
| **Supabase MCP** | Database operations, migrations, type generation | ✅ Operational |
| **Playwright MCP** | Browser automation, testing, E2E validation | ✅ Operational |
| **Docker MCP** | Container management, microservices orchestration | ✅ Operational |
| **Context7 MCP** | Documentation lookup, API references | ✅ Operational |
| **Fetch MCP** | Web intelligence, API integration, content research | ✅ Operational |

## ⚡ Quick Start

### **Development Setup**
```bash
# Clone repository
git clone https://github.com/rodeolabs/mcp-ai-development-platform.git
cd mcp-ai-development-platform

# Install dependencies
npm install

# Start development server
npm run dev
```

### **Essential Commands**
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

## 🧠 Web Intelligence Strategy

### **Three-Tier Approach**

#### **Tier 1: Simple Content → Fetch MCP** *(< 1 second)*
```javascript
mcp_fetch_fetch(url="https://api.github.com/repos/owner/repo")
```
**Use for**: APIs, simple pages, JSON data, static content

#### **Tier 2: Complex JS Sites → Playwright MCP** *(5-15 seconds)*
```javascript
mcp_playwright_browser_navigate(url="https://spa-app.com")
mcp_playwright_browser_snapshot()
```
**Use for**: SPAs, JavaScript-heavy sites, dynamic content, user interactions

#### **Tier 3: AI Content Extraction → Docker + Crawl4AI** *(10-30 seconds)*
```javascript
mcp_docker_run_container({
  image: "unclecode/crawl4ai:latest",
  ports: {"11235": 11235},
  auto_remove: true
})
```
**Use for**: Technology research, competitive analysis, documentation extraction

## 🛠️ Development Workflow Integration

### **Research & Analysis**
- **Technology Assessment**: Framework comparisons, library evaluations
- **Competitive Intelligence**: Feature analysis, pricing research
- **API Documentation**: Automatic extraction and integration guides

### **Database & Backend**
- **Schema Management**: Supabase migrations and type generation
- **Real-time Features**: Live data synchronization
- **SQL Operations**: Direct database query execution

### **Testing & Quality**
- **E2E Testing**: Playwright browser automation
- **UI Validation**: Visual regression testing
- **Integration Testing**: Real external dependency testing

### **Deployment & Infrastructure**
- **Container Management**: Docker microservices orchestration
- **Environment Setup**: Automated development environments
- **Resource Management**: Auto-scaling and cleanup

## 🔒 Security & Quality Standards

### **Security Best Practices**
- Input validation on all inputs
- No secrets in code (environment variables only)
- Proper authentication/authorization patterns
- SQL injection prevention

### **Code Quality Standards**
- Follow existing patterns consistently
- Functions are small and focused  
- Clear variable and function names
- Comprehensive error handling
- No hardcoded values

## 📊 Advanced Features

### **RAG Implementation** *(No External APIs Required)*

```sql
-- 1. Enable pgvector in Supabase
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Create documents table with embeddings
CREATE TABLE documents (
  id SERIAL PRIMARY KEY,
  content TEXT,
  metadata JSONB,
  source_url TEXT,
  embedding VECTOR(384)  -- Local embedding models
);
```

**Workflow**:
1. **Content Extraction**: Three-tier web intelligence
2. **Local Embeddings**: sentence-transformers models via Docker
3. **Vector Storage**: Supabase pgvector for semantic search
4. **No External APIs**: Complete RAG without OpenAI costs

## 🔄 Common Development Patterns

### **Error Handling**
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

### **API Response Format**
```javascript
{
  success: boolean,
  data?: any,
  error?: string,
  metadata?: { pagination, etc }
}
```

## 🚨 Troubleshooting

### **GitHub API Issues**
See [`FETCHING_ISSUE_FIX.md`](./FETCHING_ISSUE_FIX.md) for comprehensive GitHub API authentication troubleshooting.

### **Common Issues**
- **401 Authentication Errors**: Check GitHub token configuration
- **MCP Server Connectivity**: Verify environment variables
- **Docker Container Issues**: Ensure proper cleanup with `auto_remove=true`

## 📋 Quick Reference

### **MCP Command Examples**
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

### **Decision Tree**
```
Content extraction needed?
├── API/JSON data? → Use Fetch MCP
├── JavaScript/SPA? → Use Playwright MCP  
└── Research/Analysis? → Use Crawl4AI via Docker MCP
```

## 🤝 Contributing

1. **Fork** the repository
2. **Create** feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** changes: `git commit -m 'feat: add amazing feature'`
4. **Push** to branch: `git push origin feature/amazing-feature`
5. **Open** Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🌟 Status

**Platform Status**: 🟢 **FULLY OPERATIONAL**  
**Foundation**: Web Intelligence + Database + Testing + Deployment + Version Control  
**Last Updated**: 2025-08-19

**Core Principle**: This platform provides intelligent automation for the complete development lifecycle. Use web intelligence to inform decisions, database tools for data management, and automation tools for efficient development.