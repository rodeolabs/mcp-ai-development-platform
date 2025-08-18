# Claude Code Comprehensive Reference Guide

## Table of Contents
1. [Installation & Setup](#installation--setup)
2. [Core Features & Capabilities](#core-features--capabilities)
3. [Configuration & Settings](#configuration--settings)
4. [Essential Commands](#essential-commands)
5. [MCP Integration](#mcp-integration)
6. [SDK Development](#sdk-development)
7. [GitHub Actions Integration](#github-actions-integration)
8. [Security & Monitoring](#security--monitoring)
9. [Best Practices](#best-practices)
10. [Troubleshooting](#troubleshooting)

## Installation & Setup

### Prerequisites
- Node.js 18 or newer
- npm (included with Node.js)

### Basic Installation
```bash
# Install Claude Code globally
npm install -g @anthropic-ai/claude-code

# Navigate to your project
cd your-awesome-project

# Start coding with Claude
claude
```

### Project Initialization
```bash
# Initialize project with CLAUDE.md guide
claude
/init
```

### Authentication & Account Management
```bash
# Login to Anthropic account
/login

# Switch accounts
/login

# Logout
/logout

# Check account status
/status
```

## Core Features & Capabilities

### 1. Feature Development
- **Natural Language Input**: "Build a user authentication system with JWT tokens"
- **Implementation Planning**: Creates step-by-step implementation plans
- **Code Generation**: Writes and validates code automatically
- **Integration**: Ensures new code works with existing codebase

### 2. Debugging & Analysis
- **Error Analysis**: Paste error messages for detailed diagnosis
- **Codebase Understanding**: Analyzes entire project structure
- **Problem Resolution**: Implements fixes with explanations
- **Performance Optimization**: Identifies and resolves performance issues

### 3. Project Navigation
- **Code Exploration**: Understands complex codebases
- **Documentation**: Answers questions about project structure
- **External Integration**: Connects with APIs and databases via MCP
- **Context Awareness**: Maintains understanding across conversations

### 4. Task Automation
- **Lint Fixing**: Automatically resolves code style issues
- **Merge Conflicts**: Intelligent conflict resolution
- **Release Notes**: Generates comprehensive release documentation
- **CI/CD Integration**: Supports automated workflows

### 5. Direct File Operations
- **File Editing**: Direct modification of project files
- **Command Execution**: Runs shell commands and scripts
- **Git Operations**: Creates commits, manages branches
- **Multi-file Changes**: Atomic operations across multiple files

## Configuration & Settings

### Settings Hierarchy
1. **User Settings**: `~/.claude/settings.json` (global)
2. **Project Settings**: `.claude/settings.json` (shared with team)
3. **Local Settings**: `.claude/settings.local.json` (personal, gitignored)

### Essential Configuration Options
```json
{
  "autoUpdates": true,
  "theme": "dark",
  "verbose": false,
  "permissions": {
    "allow": ["Read", "Write", "Bash"],
    "deny": ["NetworkAccess"],
    "ask": ["Edit"]
  }
}
```

### Environment Variables
```bash
# API Configuration
export ANTHROPIC_API_KEY="your-api-key"
export CLAUDE_MODEL="claude-3-5-sonnet-20241022"

# Proxy Settings
export HTTP_PROXY="http://proxy.company.com:8080"
export HTTPS_PROXY="https://proxy.company.com:8080"

# Telemetry Control
export CLAUDE_TELEMETRY_DISABLED=true
```

### Permission Management
```bash
# View current permissions
/permissions

# Configure in settings.json
{
  "permissions": {
    "allow": ["Read", "Write", "Edit", "Bash", "Glob", "Grep"],
    "deny": ["NetworkAccess"],
    "ask": ["MultiEdit", "NotebookEdit"]
  }
}
```

## Essential Commands

### Project Management
| Command | Description | Usage |
|---------|-------------|-------|
| `/init` | Initialize project with CLAUDE.md | `/init` |
| `/add-dir` | Add additional working directories | `/add-dir /path/to/dir` |
| `/memory` | Edit CLAUDE.md memory files | `/memory` |
| `/config` | View/modify configuration | `/config` |

### Workflow Commands
| Command | Description | Usage |
|---------|-------------|-------|
| `/clear` | Clear conversation history | `/clear` |
| `/compact` | Compact conversation with focus | `/compact <focus>` |
| `/review` | Request code review | `/review` |
| `/pr_comments` | View pull request comments | `/pr_comments` |

### System Commands
| Command | Description | Usage |
|---------|-------------|-------|
| `/doctor` | Check installation health | `/doctor` |
| `/cost` | Show token usage statistics | `/cost` |
| `/permissions` | View/update access permissions | `/permissions` |
| `/bug` | Report bugs to Anthropic | `/bug <description>` |

### Advanced Commands
| Command | Description | Usage |
|---------|-------------|-------|
| `/agents` | Manage custom AI subagents | `/agents` |
| `/mcp` | Manage MCP server connections | `/mcp` |
| `/model` | Select or change AI model | `/model` |
| `/vim` | Enter vim mode | `/vim` |
| `/terminal-setup` | Install key bindings | `/terminal-setup` |

### Custom Commands
Create custom commands in `.claude/commands/` or `~/.claude/commands/`:

```markdown
---
args: ["message"]
---
# Custom deploy command
Run deployment with message: $ARGUMENTS

```bash
git add .
git commit -m "$ARGUMENTS"
git push origin main
```
```

## MCP Integration

### Overview
Model Context Protocol (MCP) enables Claude Code to connect with external tools, databases, and APIs through an open-source integration standard.

### Connection Types
1. **Local stdio servers**: Direct local process communication
2. **Remote SSE servers**: Server-Sent Events for real-time data
3. **Remote HTTP servers**: Standard HTTP API integration

### Configuration Scopes
- **User**: `~/.claude/mcp.json` (cross-project utilities)
- **Project**: `.claude/mcp.json` (team-shared configurations)
- **Local**: `.claude/mcp.local.json` (personal, gitignored)

### Example Configuration
```json
{
  "servers": {
    "sentry": {
      "transport": "http",
      "url": "https://mcp.sentry.dev/mcp",
      "auth": {
        "type": "oauth2"
      }
    },
    "local-db": {
      "transport": "stdio",
      "command": "python",
      "args": ["db-mcp-server.py"]
    }
  }
}
```

### Management Commands
```bash
# Add MCP server
claude mcp add --transport http sentry https://mcp.sentry.dev/mcp

# List connected servers
/mcp

# Authenticate with OAuth
/mcp auth sentry

# Test connection
/mcp test sentry
```

### Use Cases
- **Database Integration**: Query databases directly from Claude
- **Monitoring**: Analyze application metrics and logs
- **Issue Tracking**: Implement features from issue tracker descriptions
- **Design Integration**: Import and implement design specifications
- **API Automation**: Automate workflows across multiple services

### Security Considerations
- Verify third-party MCP servers before integration
- Use OAuth 2.0 for secure authentication
- Review permissions for each MCP server
- Monitor network traffic for sensitive data

## SDK Development

### Python SDK

#### Installation
```bash
pip install claude-code-sdk
```

#### Basic Usage
```python
import anyio
from claude_code_sdk import query, ClaudeCodeOptions

async def main():
    async for message in query(prompt="What is 2 + 2?"):
        print(message)

anyio.run(main)
```

#### Advanced Configuration
```python
from claude_code_sdk import query, ClaudeCodeOptions, AssistantMessage, TextBlock

options = ClaudeCodeOptions(
    system_prompt="You are a senior software engineer",
    max_turns=10,
    allowed_tools=["Read", "Write", "Bash", "Edit"],
    permission_mode='acceptEdits',  # auto-accept file edits
    cwd="/path/to/project"
)

async for message in query(
    prompt="Implement user authentication system", 
    options=options
):
    if isinstance(message, AssistantMessage):
        for block in message.content:
            if isinstance(block, TextBlock):
                print(block.text)
```

#### Error Handling
```python
from claude_code_sdk import (
    ClaudeSDKError,      # Base error
    CLINotFoundError,    # Claude Code not installed
    CLIConnectionError,  # Connection issues
    ProcessError,        # Process failed
    CLIJSONDecodeError,  # JSON parsing issues
)

try:
    async for message in query(prompt="Hello"):
        pass
except CLINotFoundError:
    print("Please install Claude Code: npm install -g @anthropic-ai/claude-code")
except ProcessError as e:
    print(f"Process failed with exit code: {e.exit_code}")
```

### TypeScript SDK

#### Installation
```bash
npm install @anthropic-ai/claude-code-sdk
```

#### Basic Usage
```typescript
import { query, ClaudeCodeOptions } from '@anthropic-ai/claude-code-sdk';

async function main() {
  const options: ClaudeCodeOptions = {
    systemPrompt: "You are a helpful coding assistant",
    maxTurns: 5
  };

  for await (const message of query("Explain this error", options)) {
    console.log(message);
  }
}
```

### Agent Development

#### Coding Agents
- **SRE Incident Response**: Automated incident analysis and resolution
- **Security Code Review**: Vulnerability detection and remediation
- **Engineering Assistants**: Code generation and optimization
- **Code Review Enforcement**: Automated PR review and compliance

#### Business Agents
- **Legal Contract Review**: Contract analysis and risk assessment
- **Financial Analysis**: Financial data processing and reporting
- **Customer Support**: Automated customer query resolution
- **Content Creation**: Documentation and marketing content generation

#### Agent Configuration
```python
options = ClaudeCodeOptions(
    system_prompt="You are an SRE specialist focused on incident response",
    allowed_tools=["Bash", "Read", "Write", "MCP"],
    max_turns=20,
    plan_mode=True  # Enable planning phase for complex tasks
)
```

## GitHub Actions Integration

### Basic Setup
```yaml
name: Claude Code Review

permissions:
  pull-requests: write
  contents: read

on:
  pull_request:

jobs:
  claude-review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: anthropics/claude-code-action@main
        with:
          claude-api-key: ${{ secrets.CLAUDE_API_KEY }}
          comment-pr: true
```

### Advanced Configuration
```yaml
- uses: anthropics/claude-code-action@main
  with:
    claude-api-key: ${{ secrets.CLAUDE_API_KEY }}
    mode: "auto"
    custom_instructions: |
      Follow the project's coding standards:
      - Use TypeScript for all new code
      - Write comprehensive tests
      - Update documentation
    allowed_tools: "Read,Write,Bash,Edit"
    permission_mode: "ask"
```

### Cloud Provider Setup

#### AWS Bedrock
```yaml
- uses: anthropics/claude-code-action@main
  with:
    provider: "bedrock"
    aws-region: "us-west-2"
    aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
    aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

#### Google Vertex AI
```yaml
- uses: anthropics/claude-code-action@main
  with:
    provider: "vertex"
    gcp-project-id: "your-project-id"
    gcp-service-account-key: ${{ secrets.GCP_SERVICE_ACCOUNT_KEY }}
```

### Quick Setup Command
```bash
# Auto-configure GitHub app and secrets
claude
/install-github-app
```

## Security & Monitoring

### Security Review Action
```yaml
name: Security Review

on:
  pull_request:

jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 2
      
      - uses: anthropics/claude-code-security-review@main
        with:
          comment-pr: true
          claude-api-key: ${{ secrets.CLAUDE_API_KEY }}
          exclude-directories: "node_modules,dist,build"
```

### Built-in Security Commands
```bash
# Run security review on current changes
/security-review

# Review specific files
claude security-review src/auth.js src/database.js
```

### Monitoring & Analytics

#### Telemetry Setup
```yaml
# docker-compose.yml for monitoring
version: '3.8'
services:
  prometheus:
    image: prom/prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
  
  otel-collector:
    image: otel/opentelemetry-collector
    command: ["--config=/etc/otel-collector-config.yaml"]
    volumes:
      - ./otel-collector-config.yaml:/etc/otel-collector-config.yaml
```

#### Key Metrics
- **Cost Metrics**: Total spend, cost per session, cost by model
- **Token Usage**: Input/output tokens, cache efficiency
- **Productivity**: PR count, commit frequency, session duration
- **Team Analytics**: Usage by developer, adoption rates

#### Environment Configuration
```bash
# Enable telemetry
export CLAUDE_TELEMETRY_ENABLED=true
export OTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:4317"
export OTEL_SERVICE_NAME="claude-code"
```

## Best Practices

### Project Setup
1. **Initialize with CLAUDE.md**: Use `/init` to create project-specific guidance
2. **Configure Permissions**: Set appropriate tool access levels
3. **Set Up MCP**: Connect relevant external services
4. **GitHub Integration**: Install GitHub Actions for automated workflows

### Development Workflow
1. **Explore-Plan-Code-Commit**:
   - Explore: Read relevant files, understand codebase
   - Plan: Break down tasks, define success criteria
   - Code: Implement incrementally
   - Commit: Review changes, ensure tests pass

2. **Use Clear Targets**: Provide visual mocks, test cases, or specific outputs
3. **Incremental Development**: Make small, verifiable changes
4. **Context Management**: Use `/clear` when switching between unrelated tasks

### Performance Optimization
- **Strategic File Reading**: Only read relevant files to avoid context bloat
- **Focused Sessions**: Keep conversations on-topic
- **Early Course Correction**: Guide Claude immediately when off-track
- **Use Built-in Tools**: Leverage Bash, Edit, Glob/Grep, MultiEdit effectively

### Security Guidelines
- **Verify MCP Servers**: Check third-party integrations before use
- **Manage Permissions**: Use hierarchical permission system (allow/deny/ask)
- **Review Generated Code**: Always review AI-generated code for security issues
- **Protect Secrets**: Never commit API keys or sensitive data

### Team Collaboration
- **Shared Configuration**: Use `.claude/settings.json` for team standards
- **Documentation**: Maintain CLAUDE.md files for context
- **GitHub Integration**: Use claude-code-action for consistent PR reviews
- **Monitoring**: Track usage and ROI with telemetry

## Troubleshooting

### Common Issues

#### Installation Problems
```bash
# Check Node.js version (requires 18+)
node --version

# Clear npm cache
npm cache clean --force

# Reinstall Claude Code
npm uninstall -g @anthropic-ai/claude-code
npm install -g @anthropic-ai/claude-code
```

#### Authentication Issues
```bash
# Check authentication status
/status

# Re-authenticate
/logout
/login
```

#### Performance Issues
```bash
# Check system health
/doctor

# View token usage
/cost

# Clear conversation history
/clear
```

#### Permission Errors
```bash
# Check current permissions
/permissions

# Reset permissions
claude config reset-permissions
```

### Diagnostic Commands
```bash
# System health check
/doctor

# View configuration
/config

# Check MCP connections
/mcp

# View recent errors
claude logs --tail 50
```

### Getting Help
- **Built-in Help**: `/help`
- **Bug Reports**: `/bug <description>`
- **Documentation**: https://docs.anthropic.com/en/docs/claude-code
- **Community**: https://www.anthropic.com/discord
- **GitHub Issues**: https://github.com/anthropics/claude-code/issues

### Log Locations
- **User Logs**: `~/.claude/logs/`
- **System Logs**: Platform-specific locations
- **Debug Logs**: Enable with `CLAUDE_DEBUG=true`

This comprehensive reference provides everything needed to effectively use Claude Code in professional development environments, from basic setup to advanced enterprise deployments.