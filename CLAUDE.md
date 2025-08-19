# AI-Enhanced Development Platform

*Production-Ready Autonomous Workflow with MCP Integration*

## Quick Reference
```bash
# Development
npm run dev          # Start development server
npm test            # Run tests
npm run build       # Production build
npm run lint        # Code quality check

# Repository Cleanup (when needed)
git push origin main                    # Sync changes
git push origin --delete branch-name   # Delete remote branches
gh issue close 2 -c "completion message" # Close resolved issues
```

## Autonomous Sub-Agents (Active)
- **@code-reviewer**: Code quality analysis and security validation
- **@security-scanner**: OWASP compliance, dependency scanning 
- **@performance-optimizer**: Bundle analysis, runtime optimization
- **@test-automator**: Unit tests, E2E tests, regression testing
- **@documentation-writer**: API docs, code comments, README updates

## MCP Servers (6 Operational)
- **GitHub**: Repository operations, PR management, issue tracking
- **Supabase**: Database operations, schema management, types
- **Playwright**: Browser automation, E2E testing, screenshots
- **Docker**: Container management, service orchestration
- **Context7**: Documentation lookup, API references
- **Fetch**: Web content retrieval, API data collection

## Workflow Pattern
```
Human Request → Main Agent → [Sub-Agents Parallel] → PR Creation → Auto-Merge → Report
```

## Three-Tier Web Intelligence
```bash
# Tier 1: Simple/API → Fetch MCP (< 1 second)
mcp_fetch_fetch(url="https://api.example.com")

# Tier 2: Complex JS → Playwright MCP (5-15 seconds) 
mcp_playwright_browser_navigate(url="https://spa-app.com")

# Tier 3: AI Analysis → Docker + Crawl4AI (10-30 seconds)
mcp_docker_run_container(image="unclecode/crawl4ai:latest", auto_remove=true)
```

## Essential Commands
```bash
# MCP Quick Commands
mcp_github_get_file_contents(owner="...", repo="...", path="...")
mcp_supabase_execute_sql(query="...")
mcp_playwright_browser_snapshot()
mcp_docker_list_containers()

# Autonomous Decision Rules
# Auto-proceed: Code quality ✅, Security ✅, Tests ✅, Performance ✅
# Human escalation: Security issues, test failures, breaking changes
```

## Repository Maintenance
```bash
# Complete Cleanup Process (reference for future)
1. git add . && git commit -m "consolidation message"
2. git push origin main
3. git push origin --delete branch1 branch2 branch3  # Remove obsolete branches
4. gh issue close 2 -c "completion message"          # Close resolved issues
5. rm unnecessary-files.md                           # Remove obsolete files
6. Update CLAUDE.md with current status
```

## Quick Setup
```bash
# Enable GitHub auto-merge
gh repo edit --enable-auto-merge

# Create sub-agents directory (already exists)
ls .claude/agents/  # code-reviewer.md, security-scanner.md, etc.
```

## Error Handling
```javascript
try {
  const result = await operation();
  return { success: true, data: result };
} catch (error) {
  logger.error('Operation failed', { error: error.message, context: 'operation_name' });
  throw error;
}
```

## System Status
**Status**: 🟢 PRODUCTION READY - FULL AUTOMATION ACTIVE  
**Architecture**: 5 Sub-Agents + 6 MCP Servers + GitHub Auto-Merge  
**Repository**: Clean, 0 open issues, all branches consolidated  
**Last Updated**: 2025-08-19

---

**Core Principle**: Fully autonomous development lifecycle with human oversight only for rollback decisions. Sub-agents handle specialized tasks while main agent orchestrates complete workflow.