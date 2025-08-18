## Project Overview
<!-- Customize this section for your specific project -->
- **Purpose**: Brief description of what this project does
- **Tech Stack**: Primary languages, frameworks, and tools
- **Architecture**: High-level system design (e.g., microservices, monolith, JAMstack)
- **Key Dependencies**: Critical libraries and services

## Essential Commands

### Development Workflow
DESCRIBE MCPs
Avoid GitHub Error
1. **Default Parameters**: Always start with `perPage: 5` or lower
2. **Filter First**: Use specific query filters before pagination
3. **Batch Calls**: Group related searches in parallel

## Development Workflow

### Git Branch Strategy
- **main/master**: Production-ready code only
- **develop**: Integration branch for features
- **feature/***: Feature development (`feature/user-authentication`)
- **bugfix/***: Bug fixes (`bugfix/login-validation`)
- **hotfix/***: Critical production fixes

### Commit Standards
Follow [Conventional Commits](https://conventionalcommits.org/):
```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Examples:
- `feat(auth): add JWT token validation`
- `fix(ui): resolve button alignment issue`
- `docs(api): update authentication endpoints`

### Code Review Process
1. Create feature branch from develop
2. Implement changes with comprehensive tests
3. Run full test suite locally (`npm run ci:test`)
4. Create pull request with descriptive title and description
5. Request review from appropriate team members
6. Address feedback and ensure CI passes
7. Squash merge after approval

### Quality Gates
Before committing, always verify:
- [ ] `npm run typecheck` passes without errors
- [ ] `npm run test` passes with good coverage
- [ ] `npm run lint` shows no violations
- [ ] `npm run build` succeeds
- [ ] Manual testing of new functionality

## Claude Code Optimization

### Effective Interaction Patterns
1. **Be Specific**: Provide detailed requirements and constraints
2. **Use Examples**: Show desired output format or behavior  
3. **Set Clear Targets**: Give concrete goals to iterate against
4. **Incremental Development**: Make small, verifiable changes
5. **Early Course Correction**: Guide immediately when off-track

### Context Management
- Use `/clear` when switching between unrelated tasks
- Provide relevant file context for complex changes
- Reference existing patterns in the codebase
- Specify which files should be modified vs. created

### Workflow Phases
```
Phase 1: EXPLORE
- Understand existing codebase structure
- Identify relevant files and patterns
- Clarify requirements and constraints

Phase 2: PLAN  
- Break down tasks into actionable steps
- Define success criteria and validation methods
- Identify potential risks or dependencies

Phase 3: IMPLEMENT
- Code incrementally with frequent validation
- Follow established patterns and conventions
- Write tests alongside implementation

Phase 4: VALIDATE
- Run comprehensive test suite
- Verify functionality meets requirements  
- Ensure code quality standards are met
```

## Tool Integration

### MCP (Model Context Protocol) Servers
Configure external service integrations in `.claude/mcp.json`:
```json
{
  "servers": {
    "database": {
      "transport": "stdio",
      "command": "python",
      "args": ["db-mcp-server.py"]
    },
    "github": {
      "transport": "http",
      "url": "https://api.github.com/mcp"
    }
  }
}
```

### Sub-Agents Configuration
Create specialized agents in `.claude/agents/`:
- `code-reviewer.md`: Code quality and security analysis
- `test-runner.md`: Automated testing workflows
- `performance-auditor.md`: Performance optimization
- `security-scanner.md`: Security vulnerability detection
- `documentation-writer.md`: Technical documentation

### Custom Commands
Define project-specific shortcuts in `.claude/commands/`:
```markdown
---
args: ["environment"]
---
# Deploy command
Deploy to specified environment with safety checks

```bash
npm run test
npm run build
npm run deploy:$ARGUMENTS
```
```

## Anti-Patterns to Avoid

### Code Generation Issues
- ❌ Accepting placeholder implementations without proper logic
- ❌ Skipping TypeScript compilation before testing
- ❌ Ignoring linting errors in generated code
- ❌ Not following existing architectural patterns
- ❌ Generating code without corresponding tests

### Development Process Problems
- ❌ Making large changes without incremental validation
- ❌ Skipping manual testing of critical functionality
- ❌ Not running full test suite before committing
- ❌ Implementing without understanding existing codebase
- ❌ Missing error handling and edge case considerations

### Context Management Issues
- ❌ Reading entire large codebases without specific purpose
- ❌ Mixing unrelated tasks in single conversation
- ❌ Providing vague or ambiguous requirements
- ❌ Not leveraging CLAUDE.md for repeated instructions
- ❌ Forgetting to update documentation after changes

## Security & Best Practices

### Security Checklist
- [ ] Input validation on all user inputs
- [ ] Proper authentication and authorization
- [ ] Secure handling of sensitive data
- [ ] Protection against common vulnerabilities (XSS, CSRF, SQL injection)
- [ ] Regular dependency updates and vulnerability scans
- [ ] Environment variables for secrets (never commit sensitive data)

### Performance Considerations
- [ ] Optimize database queries and indexes
- [ ] Implement caching where appropriate
- [ ] Minimize bundle size and loading times
- [ ] Use lazy loading for large components
- [ ] Monitor and optimize Core Web Vitals

### Accessibility Standards
- [ ] Semantic HTML structure
- [ ] Proper ARIA labels and roles
- [ ] Keyboard navigation support
- [ ] Color contrast compliance (WCAG 2.1 AA)
- [ ] Screen reader compatibility

## Environment Configuration

### Required Environment Variables
```bash
# Application
NODE_ENV=development|staging|production
APP_URL=http://localhost:3000

# Database (example)
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# Authentication (example)
JWT_SECRET=your-jwt-secret
AUTH_PROVIDER_CLIENT_ID=your-client-id
AUTH_PROVIDER_CLIENT_SECRET=your-client-secret

# External Services (example)
API_KEY=your-api-key
THIRD_PARTY_SERVICE_URL=https://api.example.com
```

### Configuration Files
- `.env.local`: Local development overrides (gitignored)
- `.env.example`: Template for required environment variables
- `.env.staging`: Staging environment configuration
- `.env.production`: Production environment configuration

## Documentation Standards

### Code Documentation
- Use JSDoc for functions and classes
- Document complex business logic
- Explain non-obvious implementation decisions
- Include usage examples for utilities

### README Requirements
- Clear installation instructions
- Development setup guide
- Available commands and scripts
- Contributing guidelines
- License information

### API Documentation
- Document all endpoints with examples
- Include request/response schemas
- Specify authentication requirements
- Provide error code explanations

## Troubleshooting

### Common Issues
1. **Build Failures**: Check TypeScript errors and dependency conflicts
2. **Test Failures**: Verify test environment setup and mock configurations
3. **Performance Issues**: Profile bundle size and runtime performance
4. **Authentication Problems**: Validate tokens and API configurations

### Debug Commands
```bash
# View detailed error logs
npm run logs

# Check dependency conflicts
npm ls --depth=0

# Analyze bundle size
npm run bundle-analyzer

# Run security audit
npm audit

# Clear caches
npm run clean
rm -rf node_modules package-lock.json
npm install
```

## Success Metrics

### Code Quality Indicators
- TypeScript compilation without errors
- 80%+ test coverage on critical paths
- Zero high-severity security vulnerabilities
- Consistent code style (no linting errors)
- Passing CI/CD pipeline

### Performance Benchmarks
- Build time under acceptable limits
- Bundle size within target thresholds
- Core Web Vitals in green ranges
- API response times under SLA requirements

### Team Collaboration
- Clear, descriptive commit messages
- Comprehensive pull request descriptions
- Timely code review completion
- Updated documentation with changes

---

## Customization Notes

This template should be customized for your specific project:

1. **Update Commands**: Replace example commands with your actual scripts
2. **Modify Structure**: Adjust file organization to match your architecture
3. **Add Dependencies**: Include project-specific tools and frameworks
4. **Configure Integrations**: Set up relevant MCP servers and sub-agents
5. **Define Standards**: Establish team-specific coding conventions
6. **Update Environment**: Add required environment variables and configurations

Remember: CLAUDE.md files are most effective when they reflect your actual project needs and team workflows. Start with this template and evolve it based on your experience and requirements.