---
name: chrome-devtools-mcp
description: How to use Chrome DevTools MCP server for browser automation and web scraping
---

# Chrome DevTools MCP Server Skill

This skill documents how to use the Chrome DevTools MCP server for browser automation, web scraping, and testing.

## Prerequisites

Chrome must be running with remote debugging enabled before using any Chrome DevTools MCP tools.

## Starting Chrome with Remote Debugging

// turbo-all

### Windows (PowerShell)
```powershell
# Must kill all Chrome processes first, then start with temp profile
Get-Process chrome -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 2
Start-Process -FilePath "C:\Program Files\Google\Chrome\Application\chrome.exe" -ArgumentList "--remote-debugging-port=9222", "--user-data-dir=C:\temp\chrome-debug", "https://example.com"
```

> **IMPORTANT**: The `--user-data-dir` flag is required for remote debugging to work properly when Chrome is already installed with a regular profile.

### macOS/Linux
```bash
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222
```

## Verifying Connection

After starting Chrome, verify the connection works:
```powershell
Invoke-WebRequest -Uri "http://127.0.0.1:9222/json/version" -UseBasicParsing | Select-Object -ExpandProperty Content
```

## Common MCP Tools

### Navigation
- `mcp_chrome-devtools_navigate_page` - Navigate to URLs or reload
- `mcp_chrome-devtools_list_pages` - List open browser tabs
- `mcp_chrome-devtools_select_page` - Select a specific tab
- `mcp_chrome-devtools_new_page` - Open a new tab with URL

### Taking Snapshots
- `mcp_chrome-devtools_take_snapshot` - Get accessibility tree (preferred for understanding page structure)
- `mcp_chrome-devtools_take_screenshot` - Capture visual screenshot

### Interactions
- `mcp_chrome-devtools_click` - Click on elements by uid
- `mcp_chrome-devtools_fill` - Fill input fields
- `mcp_chrome-devtools_press_key` - Press keyboard keys
- `mcp_chrome-devtools_hover` - Hover over elements

### JavaScript Execution
- `mcp_chrome-devtools_evaluate_script` - Run JavaScript in the page context

### Network & Console
- `mcp_chrome-devtools_list_network_requests` - View network requests
- `mcp_chrome-devtools_list_console_messages` - View console logs

## Example Workflow

1. Start Chrome with remote debugging
2. Use `mcp_chrome-devtools_navigate_page` to go to URL
3. Use `mcp_chrome-devtools_take_snapshot` to understand page structure
4. Use `mcp_chrome-devtools_evaluate_script` to extract data or interact with page
5. Use `mcp_chrome-devtools_take_screenshot` to capture results

## Important Notes

- Always start Chrome with `--remote-debugging-port=9222` first
- Check connection with `mcp_chrome-devtools_list_pages` before other operations
- Use `take_snapshot` over `take_screenshot` for understanding page content
- Close DevTools if open in browser window to avoid conflicts
