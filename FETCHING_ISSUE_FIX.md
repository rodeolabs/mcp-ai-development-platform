# GitHub API Fetching Issue - Complete Fix Guide

## Problem Overview

**Issue**: GitHub API calls are failing with `401 authentication error` when using MCP servers.

**Root Cause**: Missing or incorrectly configured GitHub Personal Access Token in MCP configuration.

## Solution Steps

### 1. Generate GitHub Personal Access Token

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Set expiration (recommended: 90 days or custom)
4. Select required scopes:
   - `repo` - Full control of private repositories
   - `public_repo` - Access public repositories
   - `user` - Read user profile data
   - `read:org` - Read organization membership

### 2. Configure MCP Settings

**For Local Development:**

Create or update your MCP configuration file:

```json
{
  "mcpServers": {
    "github": {
      "command": "mcp-server-github",
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    },
    "fetch": {
      "command": "mcp-server-fetch",
      "env": {
        "USER_AGENT": "MCP-AI-Development-Platform/1.0"
      }
    }
  }
}
```

### 3. Set Environment Variables

**Linux/macOS:**
```bash
export GITHUB_TOKEN="your_personal_access_token_here"
```

**Windows:**
```cmd
set GITHUB_TOKEN=your_personal_access_token_here
```

**In .env file:**
```
GITHUB_TOKEN=your_personal_access_token_here
```

### 4. GitHub Actions Configuration

**For repository workflows:**

```yaml
name: MCP Workflow
on: [push, pull_request]

jobs:
  mcp-task:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run MCP Commands
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          # Your MCP commands here
```

### 5. Verification Steps

**Test the configuration:**

```javascript
// Test 1: Basic GitHub API access
mcp_github_get_me()
// Expected: Returns your GitHub user profile

// Test 2: Repository access  
mcp_github_get_file_contents(
  owner="rodeolabs",
  repo="mcp-ai-development-platform", 
  path="README.md"
)
// Expected: Returns file contents

// Test 3: Search functionality
mcp_github_search_repositories(query="MCP")
// Expected: Returns repository search results

// Test 4: Fetch API testing
mcp_fetch_fetch(url="https://api.github.com/user")
// Expected: Returns user data (requires authentication)
```

## Expected Results After Fix

✅ **No more 401 authentication errors**  
✅ **Full GitHub API access restored**  
✅ **MCP Fetch server fully operational**  
✅ **Three-tier web intelligence strategy working**  
✅ **All 6 MCP servers functional**: GitHub, Supabase, Playwright, Docker, Context7, Fetch

## Troubleshooting

### Common Issues

**Issue**: Still getting 401 errors after setting token
- **Solution**: Restart your MCP client/application after setting environment variables
- **Check**: Verify token has correct permissions and hasn't expired

**Issue**: Token works in curl but not in MCP
- **Solution**: Ensure environment variable name matches exactly (`GITHUB_TOKEN`)
- **Check**: Verify MCP configuration file syntax is correct

**Issue**: Works locally but fails in GitHub Actions
- **Solution**: Check that `GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}` is set in workflow env
- **Check**: Verify repository has necessary permissions for the actions

### Validation Commands

```bash
# Check if environment variable is set
echo $GITHUB_TOKEN

# Test GitHub API directly
curl -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/user

# Verify MCP server connectivity
mcp_github_get_me()
```

## Security Best Practices

1. **Never commit tokens to repository**
2. **Use environment variables or secure secrets management**
3. **Set appropriate token expiration dates**
4. **Regularly rotate access tokens**
5. **Use minimal required permissions**

## MCP Integration Context

This fix enables the full **Three-Tier Web Intelligence Strategy**:

- **Tier 1**: Fetch MCP for simple APIs and JSON data
- **Tier 2**: Playwright MCP for complex JavaScript sites  
- **Tier 3**: Docker MCP + Crawl4AI for AI content extraction

With GitHub API access restored, all 6 MCP servers are now fully operational for the AI-Enhanced Development Platform.