# Claude Code Best Practices - AI Reference Guide

## Setup Optimization

### CLAUDE.md Configuration
Create `CLAUDE.md` files in repository directories to document:
- **Bash Commands**: Test runners, build scripts, deployment commands
- **Code Style**: Formatting preferences, naming conventions, architectural patterns
- **Testing Instructions**: How to run tests, test file locations, testing frameworks
- **Repository Etiquette**: PR requirements, commit message formats, review processes
- **Developer Environment**: Setup steps, required tools, configuration files

### Context and Permissions Management
- Use `/permissions` command to control tool access and security
- Install GitHub CLI (`gh`) for enhanced repository interactions
- Place `CLAUDE.md` files strategically in subdirectories for context-specific guidance
- Configure settings in `~/.claude/settings.json` (user) or `.claude/settings.json` (project)
- Use hierarchical permission system: allow, deny, ask for fine-grained control
- Set environment variables for API keys, model selection, and proxy settings

## Core Workflows

### 1. Explore-Plan-Code-Commit Workflow
```
Phase 1: EXPLORE
- Ask Claude to read relevant files and understand codebase structure
- Use keyword "think" to trigger extended thinking mode for complex analysis

Phase 2: PLAN
- Break down tasks into clear, actionable steps
- Define success criteria and validation methods

Phase 3: CODE
- Implement solution incrementally
- Verify reasonableness of approach during development

Phase 4: COMMIT
- Review changes comprehensively
- Ensure tests pass before committing
```

### 2. Test-Driven Development (TDD)
```
1. Write failing tests first
2. Confirm tests fail with expected error messages
3. Implement minimal code to pass tests
4. Use subagents to verify implementation correctness
5. Refactor while maintaining test coverage
```

### 3. Visual Iteration Workflow
```
1. Provide screenshots or design mockups as targets
2. Implement initial version
3. Take screenshots of current state
4. Compare against target and identify gaps
5. Iterate 2-3 times to refine implementation
```

## Advanced Techniques

### MCP (Model Context Protocol) Integration
- Configure MCP servers for external service interactions (local stdio, remote SSE, HTTP)
- Use MCP for database connections, API integrations, and tool extensions
- Leverage MCP for custom workflow automation
- Connect to hundreds of tools, databases, and APIs through open-source standard
- Use `/mcp` command to manage server connections and authentication
- Example: `claude mcp add --transport http sentry https://mcp.sentry.dev/mcp`
- Verify third-party MCP servers for security before integration

### Automation and Scaling
- **Headless Mode**: Run Claude Code in automated environments
- **Multiple Instances**: Use parallel Claude instances for complex multi-part tasks
- **Custom Slash Commands**: Create project-specific shortcuts and commands
- **Built-in Slash Commands**: Use `/add-dir`, `/agents`, `/bug`, `/clear`, `/compact`, `/config`, `/cost`, `/doctor`, `/help`, `/init`, `/login`, `/logout`, `/mcp`, `/memory`, `/model`, `/permissions`, `/pr_comments`, `/review`, `/status`, `/terminal-setup`, `/vim`
- **SDK Integration**: Use TypeScript/Python SDKs for production-ready AI agents
- **Agent Types**: Build coding agents (SRE, security review, engineering assistants) and business agents (legal, financial, customer support)

### Context Management
- Use `/clear` command to maintain focused context when switching topics
- Be specific in instructions to avoid ambiguity
- Course-correct early when Claude misunderstands requirements

## Performance Optimization Guidelines

### Input Quality
- **Be Specific**: Provide detailed requirements and constraints
- **Use Examples**: Show desired output format or behavior
- **Set Clear Targets**: Give Claude something concrete to iterate against

### Feedback Loops
- **Early Course Correction**: Guide Claude immediately when it goes off-track
- **Incremental Validation**: Check progress at each major step
- **Visual Verification**: Use screenshots for UI/UX validation

### Context Efficiency
- **Strategic File Reading**: Only read relevant files to avoid context bloat
- **Focused Sessions**: Use `/clear` when switching between unrelated tasks
- **Modular Approach**: Break large tasks into smaller, focused sessions

## Anti-Patterns to Avoid

### Context Management
- ❌ Reading entire large codebases without specific purpose
- ❌ Mixing unrelated tasks in single session
- ❌ Providing vague or ambiguous instructions

### Development Process
- ❌ Implementing without understanding existing codebase patterns
- ❌ Skipping test validation
- ❌ Making large changes without incremental verification

### Tool Usage
- ❌ Overusing permissions when simpler solutions exist
- ❌ Not leveraging CLAUDE.md for repeated instructions
- ❌ Ignoring available MCP integrations for external services
- ❌ Not utilizing available tools: Bash, Edit, Glob/Grep, MultiEdit, Notebook editing
- ❌ Missing configuration opportunities in settings.json files
- ❌ Not taking advantage of built-in slash commands for efficiency

## Success Metrics

### Effective Sessions
- Claude understands requirements on first attempt
- Implementation follows existing codebase conventions
- Tests pass and functionality works as expected
- Changes integrate cleanly with existing code

### Workflow Efficiency
- Minimal context switching and re-explanation
- Fast iteration cycles with clear progress
- Proactive identification and resolution of issues
- Consistent code quality across iterations

## Key Principle
> "Claude performs best when it has a clear target to iterate against—a visual mock, a test case, or another kind of output."

This principle should guide all interactions: always provide Claude with concrete, measurable targets rather than abstract goals.

## Essential Commands Reference

### Project Initialization
```bash
# Install Claude Code
npm install -g @anthropic-ai/claude-code

# Navigate to project and start
cd your-project
claude

# Initialize project with CLAUDE.md
/init
```

### Configuration Management
```bash
# View configuration
/config

# Manage permissions
/permissions

# Check system health
/doctor

# View token usage
/cost
```

### Workflow Commands
```bash
# Clear conversation history
/clear

# Compact conversation
/compact

# Request code review
/review

# Add working directories
/add-dir

# Manage memory files
/memory
```

### Advanced Features
```bash
# Manage MCP servers
/mcp

# Switch models
/model

# Manage subagents
/agents

# Install terminal keybindings
/terminal-setup
```

## Core Capabilities Summary

1. **Feature Development**: Build features from plain English descriptions
2. **Debugging**: Analyze codebases and implement fixes
3. **Project Navigation**: Understand entire project structure and answer questions
4. **Task Automation**: Fix lint issues, resolve merge conflicts, generate release notes
5. **Direct Action**: Edit files, run commands, create commits
6. **Enterprise Ready**: AWS/GCP hosting, security, compliance features