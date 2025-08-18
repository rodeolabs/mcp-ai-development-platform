# GitHub MCP Server Pagination Solution

## Problem
The `search_repositories` MCP tool was failing with "response exceeds maximum allowed tokens (25,000)" when searching Anthropic repositories, even with parameters like `perPage: 20` returning ~36,361 tokens.

## Solution Implementation
Successfully implemented pagination and filtering using the guidance provided. Here's the proven approach:

### 1. Use Small Limit Parameters
**Successful Configuration**:
```javascript
// TypeScript repositories (7 results)
mcp__github__search_repositories({
  query: "org:anthropics language:TypeScript",
  perPage: 5,
  page: 1
})

// Python repositories (10 results) 
mcp__github__search_repositories({
  query: "org:anthropics language:Python", 
  perPage: 5,
  page: 1
})

// High-star repositories (11 results)
mcp__github__search_repositories({
  query: "org:anthropics stars:>1000",
  perPage: 3,
  page: 1
})
```

### 2. Apply Specific Filtering
**Effective Query Patterns**:
- `org:anthropics language:TypeScript` - Language-specific filtering
- `org:anthropics language:Python` - Language-specific filtering  
- `org:anthropics stars:>1000` - Popularity filtering
- `org:anthropics mcp` - Topic-specific filtering
- `org:anthropics created:>2024-01-01` - Date filtering

### 3. Implement Pagination Strategy
**Multi-call Approach**:
```javascript
// Batch multiple filtered searches in parallel
Promise.all([
  searchRepos("org:anthropics language:TypeScript", 5, 1),
  searchRepos("org:anthropics language:Python", 5, 1), 
  searchRepos("org:anthropics stars:>1000", 3, 1),
  searchRepos("org:anthropics mcp", 3, 1)
])
```

## Results
The pagination approach successfully retrieved comprehensive repository information:

### Discovered Repositories
1. **claude-code** (30,151 stars) - Main CLI tool
2. **anthropic-cookbook** (19,141 stars) - Code examples
3. **prompt-eng-interactive-tutorial** (17,534 stars) - Training materials
4. **courses** (16,826 stars) - Educational content
5. **anthropic-quickstarts** (9,647 stars) - Quick start projects
6. **claude-code-action** (2,667 stars) - GitHub Actions integration
7. **anthropic-sdk-python** (2,194 stars) - Python SDK
8. **claude-code-security-review** (2,067 stars) - Security analysis
9. **dxt** (1,242 stars) - Desktop Extensions for MCP
10. **anthropic-sdk-typescript** (1,158 stars) - TypeScript SDK
11. **claude-code-sdk-python** (831 stars) - Claude Code Python SDK

### Key Findings

#### New Claude Code Repositories
- **dxt (Desktop Extensions)**: One-click local MCP server installation
- **anthropic-quickstarts**: Deployable application examples
- **anthropic-sdk-typescript/python**: Core API SDKs

#### DXT (Desktop Extensions) - Major Discovery
- **Purpose**: Single-click MCP server installation for desktop apps
- **Format**: `.dxt` files (zip archives with manifest.json)
- **CLI Tool**: `npm install -g @anthropic-ai/dxt`
- **Integration**: Used by Claude for macOS/Windows
- **Bundling**: Supports Node.js, Python, and binary servers

#### AI Prompt Template for DXT Development
The DXT repository provides a comprehensive prompt template for AI tools like Claude Code to build extensions:

```
I want to build this as a Desktop Extension, abbreviated as "DXT". Please follow these steps:

1. Read the specifications thoroughly:
   - README.md - DXT architecture overview
   - MANIFEST.md - Extension manifest structure  
   - examples/ - Reference implementations

2. Create proper extension structure:
   - Generate valid manifest.json
   - Implement MCP server with @modelcontextprotocol/sdk
   - Include error handling and security measures

3. Follow best practices:
   - Implement MCP protocol via stdio transport
   - Structure tools with clear schemas and validation
   - Add logging and debugging capabilities

4. Test considerations:
   - Validate tool call responses
   - Verify manifest loads and host integration
```

## Token Analysis
**Successful Response Sizes**:
- 5 repos with language filter: ~8,000-12,000 tokens
- 3 repos with star filter: ~6,000-8,000 tokens
- MCP-specific search: ~2,000-4,000 tokens

**Original Failure**:
- 20 repos without filtering: ~36,361 tokens (exceeded 25,000 limit)

## Best Practices Derived

### 1. Query Optimization
- Use specific filters (language, stars, topics, dates)
- Combine multiple narrow searches vs. one broad search
- Start with perPage: 3-5 for unknown result sets

### 2. Parallel Processing
- Make multiple filtered calls simultaneously
- Combine results programmatically
- Avoid sequential pagination when possible

### 3. Error Handling
- Implement fallback with smaller page sizes
- Use exponential backoff for retries
- Log token usage for optimization

### 4. Tool Integration
- Claude Code can use DXT for rapid MCP server development
- GitHub Actions integration enables automated workflows
- Python/TypeScript SDKs provide programmatic access

## Recommendations for Future Use

1. **Default Parameters**: Always start with `perPage: 5` or lower
2. **Filter First**: Use specific query filters before pagination
3. **Batch Calls**: Group related searches in parallel
4. **Monitor Tokens**: Track response sizes for optimization
5. **DXT Integration**: Use Desktop Extensions for local MCP servers

This solution demonstrates how proper pagination and filtering can overcome MCP tool limitations while discovering valuable new repositories and capabilities for Claude Code development.