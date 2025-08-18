# Anthropic Repositories Guide for Claude Code Development

## Repository Overview

This guide compiles useful information from Anthropic's GitHub repositories for developers working with Claude Code. Each repository offers unique insights, tools, and examples for enhanced Claude Code development workflows.

## Core Claude Code Repositories

### 1. claude-code (Main Repository)
**URL**: https://github.com/anthropics/claude-code  
**Stars**: 30,151 | **Language**: TypeScript

**Key Features**:
- Agentic coding tool that lives in your terminal
- Understands your codebase and helps code faster
- Executes routine tasks through natural language commands
- Handles git workflows automatically
- Works in terminal, IDE, or GitHub via @claude tag
- **Core Capabilities**: Feature development, debugging, project navigation, task automation
- **Direct Action**: Edits files, runs commands, creates commits
- **Enterprise Ready**: AWS/GCP hosting, security, compliance features

**Installation**:
```bash
npm install -g @anthropic-ai/claude-code
```

**Data Collection & Privacy**:
- Collects feedback and usage data for improvement
- Does NOT train generative models on user feedback
- 30-day retention for user feedback transcripts
- Limited access to user session data

### 2. claude-code-action (GitHub Actions Integration)
**URL**: https://github.com/anthropics/claude-code-action  
**Stars**: 2,667 | **Language**: TypeScript

**Key Capabilities**:
- Interactive code assistant for GitHub PRs and issues
- Code review analysis with improvement suggestions
- Code implementation (fixes, refactoring, new features)
- PR/Issue integration with GitHub comments
- Flexible tool access (GitHub APIs, file operations)
- Progress tracking with dynamic checkboxes
- Multiple authentication: Anthropic API, AWS Bedrock, Google Vertex AI

**Quick Setup**:
```bash
claude  # In terminal
/install-github-app  # Auto-configures GitHub app and secrets
```

**Essential Slash Commands**:
- `/add-dir`, `/agents`, `/bug`, `/clear`, `/compact`, `/config`, `/cost`
- `/doctor`, `/help`, `/init`, `/login`, `/logout`, `/mcp`, `/memory`
- `/model`, `/permissions`, `/pr_comments`, `/review`, `/status`, `/terminal-setup`, `/vim`

**Breaking Changes Warning**: v1.0 will significantly change configuration approach

### 3. claude-code-security-review (AI Security Analysis)
**URL**: https://github.com/anthropics/claude-code-security-review  
**Stars**: 2,066 | **Language**: Python

**Security Analysis Features**:
- AI-powered security vulnerability detection
- Diff-aware scanning (PR changes only)
- Automatic PR comments with findings
- Contextual understanding beyond pattern matching
- Language agnostic analysis
- Advanced false positive filtering

**Vulnerability Detection**:
- Injection attacks (SQL, command, LDAP, XPath, NoSQL, XXE)
- Authentication & authorization flaws
- Data exposure (hardcoded secrets, sensitive logging)
- Cryptographic issues
- Input validation problems
- Business logic flaws
- Configuration security
- Supply chain vulnerabilities
- Code execution risks
- Cross-site scripting (XSS)

**Usage Example**:
```yaml
# .github/workflows/security.yml
- uses: anthropics/claude-code-security-review@main
  with:
    comment-pr: true
    claude-api-key: ${{ secrets.CLAUDE_API_KEY }}
```

**Slash Command Integration**: `/security-review` available in Claude Code

### 4. claude-code-sdk-python (Python SDK)
**URL**: https://github.com/anthropics/claude-code-sdk-python  
**Stars**: 831 | **Language**: Python

**Requirements**:
- Python 3.10+
- Node.js
- Claude Code CLI installed globally

**Basic Usage**:
```python
import anyio
from claude_code_sdk import query, ClaudeCodeOptions

async def main():
    async for message in query(prompt="What is 2 + 2?"):
        print(message)

# With options
options = ClaudeCodeOptions(
    allowed_tools=["Read", "Write", "Bash"],
    permission_mode='acceptEdits',  # auto-accept file edits
    cwd="/path/to/project"
)

anyio.run(main)
```

**Error Handling**:
```python
from claude_code_sdk import (
    ClaudeSDKError, CLINotFoundError, 
    CLIConnectionError, ProcessError
)
```

**SDK Features**:
- Multi-turn conversations with custom system prompts
- Plan mode for code review
- Automatic prompt caching and built-in error handling
- JSON output for programmatic parsing
- MCP integration for custom tools
- Agent types: Coding (SRE, security, engineering) and Business (legal, financial, support)

### 5. devcontainer-features (Development Containers)
**URL**: https://github.com/anthropics/devcontainer-features  
**Stars**: 118 | **Language**: Shell

**Purpose**: Dev Container Features for Claude Code CLI installation

**Configuration**:
```json
{
  "features": {
    "ghcr.io/anthropics/devcontainer-features/claude-code:1.0": {}
  }
}
```

**Requirements**: Automatically installs Node.js dependency

### 6. claude-code-monitoring-guide (ROI & Analytics)
**URL**: https://github.com/anthropics/claude-code-monitoring-guide  
**Stars**: 22

**Monitoring Capabilities**:
- Complete telemetry setup with Prometheus and OpenTelemetry
- Cost analysis and usage pattern tracking
- Productivity metrics framework
- ROI calculation methodology
- Automated reporting integration with Linear

**Key Metrics**:
- **Cost**: Total spend, cost per session, cost by model
- **Token Usage**: Input/output tokens, cache efficiency
- **Productivity**: PR count, commit frequency, session duration
- **Team Analytics**: Usage by developer, adoption rates

**Components**:
- Docker Compose setup for metrics collection
- Prometheus configuration
- OpenTelemetry collector configuration
- Sample report templates
- Report generation prompts

## Supporting Repositories

### 7. anthropic-cookbook (Code Examples & Guides)
**URL**: https://github.com/anthropics/anthropic-cookbook  
**Stars**: 19,141 | **Language**: Jupyter Notebook

**Relevant Skills for Claude Code**:
- **Classification**: Text and data classification techniques
- **RAG**: Retrieval Augmented Generation for external knowledge
- **Summarization**: Effective text summarization methods
- **Tool Use**: External tool and function integration
- **Multimodal**: Vision and image processing capabilities

**Tool Integration Examples**:
- Customer service agent
- Calculator integration
- SQL query handling
- Vector databases (Pinecone)
- Wikipedia search
- Web page processing
- Internet search (Brave)

**Advanced Techniques**:
- Sub-agents (using Haiku with Opus)
- PDF upload and processing
- Automated evaluations
- JSON mode enforcement
- Content moderation filters
- Prompt caching optimization

### 8. claude-code-base-action (Base Action Components)
**URL**: https://github.com/anthropics/claude-code-base-action  
**Stars**: 451 | **Language**: TypeScript

**Purpose**: Mirror of base-action components from claude-code-action repository

### 9. homebrew-claude (Package Management)
**URL**: https://github.com/anthropics/homebrew-claude  
**Purpose**: Homebrew formulae for Claude Code installation

## Best Practices Derived from Repositories

### Development Workflow Integration
1. **GitHub Actions**: Use claude-code-action for automated PR reviews and code assistance
2. **Security**: Integrate claude-code-security-review for vulnerability detection
3. **Containers**: Use devcontainer-features for consistent development environments
4. **Monitoring**: Implement telemetry from monitoring-guide for ROI tracking

### Tool Configuration Examples
```yaml
# GitHub Action with Claude Code
- uses: anthropics/claude-code-action@main
  with:
    mode: "auto"
    custom_instructions: "Follow project coding standards"
    claude_api_key: ${{ secrets.CLAUDE_API_KEY }}
```

```python
# Python SDK Integration
from claude_code_sdk import query, ClaudeCodeOptions

options = ClaudeCodeOptions(
    allowed_tools=["Read", "Write", "Bash", "Edit"],
    system_prompt="You are a senior developer",
    max_turns=5
)
```

### Security Best Practices
- Enable automated security reviews on all PRs
- Configure false positive filtering for your codebase
- Use custom security scan instructions for organization-specific requirements
- Integrate `/security-review` slash command in development workflow

### Monitoring & Analytics Setup
1. **Metrics Collection**: Implement Prometheus + OpenTelemetry
2. **Cost Tracking**: Monitor token usage and API costs
3. **Productivity Measurement**: Track PR velocity and code quality
4. **Team Analytics**: Measure adoption and usage patterns

## Integration Patterns

### Multi-Repository Setup
```bash
# Install core tools
npm install -g @anthropic-ai/claude-code
pip install claude-code-sdk

# Configure GitHub Actions
# Add claude-code-action to .github/workflows/
# Add claude-code-security-review to security workflows

# Set up monitoring
# Use docker-compose.yml from monitoring-guide
# Configure Prometheus and OpenTelemetry
```

### Development Environment
```json
// devcontainer.json
{
  "features": {
    "ghcr.io/anthropics/devcontainer-features/claude-code:1.0": {}
  },
  "postCreateCommand": "claude --version"
}
```

## Key Takeaways

1. **Comprehensive Ecosystem**: Anthropic provides tools for CLI, GitHub Actions, security review, Python SDK, and monitoring
2. **Security Focus**: Built-in security analysis with advanced AI-powered vulnerability detection
3. **Developer Experience**: Strong focus on seamless integration with existing workflows
4. **Monitoring & ROI**: Complete framework for measuring productivity and return on investment
5. **Community Resources**: Extensive cookbook with practical examples and integration patterns

## Resources for Further Learning

- [Official Claude Code Documentation](https://docs.anthropic.com/en/docs/claude-code/overview)
- [Anthropic API Fundamentals Course](https://github.com/anthropics/courses/tree/master/anthropic_api_fundamentals)
- [Anthropic Discord Community](https://www.anthropic.com/discord)
- [Anthropic Developer Documentation](https://docs.anthropic.com/claude/docs/guide-to-anthropics-prompt-engineering-resources)

This guide provides a comprehensive overview of Anthropic's Claude Code ecosystem, enabling developers to leverage the full potential of AI-assisted development workflows.