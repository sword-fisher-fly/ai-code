
https://gitee.com/oschina/mcp-gitee

git clone https://gitee.com/oschina/mcp-gitee.git
cd mcp-gitee

make build

mv bin/mcp-gitee /usr/bin

mcp-gitee -h
Usage of mcp-gitee:
  -address string
        The host and port to start the sse/http server on (default "localhost:8000")
  -api-base string
        Gitee API base URL (default: https://gitee.com/api/v5)
  -disabled-toolsets string
        Comma-separated list of tools to disable
  -enabled-toolsets string
        Comma-separated list of tools to enable (if specified, only these tools will be available)
  -token string
        Gitee access token
  -transport string
        Transport type (stdio or sse) (default "stdio")
  -version
        Show version information

## 可执行文件启动
~/.claude.json

{
  "mcpServers": {
    "gitee": {
      "command": "mcp-gitee",
      "env": {
        "GITEE_API_BASE": "https://gitee.com/api/v5",
        "GITEE_ACCESS_TOKEN": "52552b38ff4fda5e2bc94dbac4791f59"
      }
    }
  }
}

## gitee-mcp-demo创建issue
```
1. 用react框架实现一个黑白五子棋，如一方胜出，则用红色闪电弹窗显示获胜方信息，棋盘为15*15
2. 页面左右分栏，比例为1:3, 左分栏显示双方的计时器，超时时间5分钟，右分栏显示棋盘，黄色背景
```


❯ /mcp list 

──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
 Manage MCP servers
 1 server

   User MCPs (/home/chery-alert/.claude.json)
 ❯ gitee · ✔ connected

 https://code.claude.com/docs/en/mcp for help

 ❯ /mcp list 
╭────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
│ Tools for gitee (27 tools)                                                                                             │
│                                                                                                                        │
│ ↑ 5.  create_org_repo   destructive, open-world                                                                        │
│ ❯ 6.  create_pull       destructive, open-world                                                                        │
│   7.  create_release    destructive, open-world                                                                        │
│   8.  create_user_repo  destructive, open-world                                                                        │
│ ↓ 9.  fork_repository   destructive, open-world   


===================================================
提示词: 获取gitee-mcp-demo的issue
  ┌────────┬────────────┬──────┬─────────────────────┬───────────────────────────────────────────────────────────┐
  │  编号  │    标题    │ 状态 │      创建时间       │                           链接                            │
  ├────────┼────────────┼──────┼─────────────────────┼───────────────────────────────────────────────────────────┤
  │ IDQEJ1 │ 黑白五子棋 │ open │ 2026-02-11 17:06:46 │ https://gitee.com/open-sword/gitee-mcp-demo/issues/IDQEJ1 │
  └────────┴────────────┴──────┴─────────────────────┴───────────────────────────────────────────────────────────┘
  Issue 详情：
  - 标题：黑白五子棋
  - 状态：open
  - 创建者：coolboo
  - 类型：任务

  内容：
  1. 用react框架实现一个黑白五子棋，如一方胜出，则用红色闪电弹窗显示获胜方信息，棋盘为15*15
  2. 页面左右分栏，比例为1:3, 左分栏显示双方的计时器，超时时间5分钟，右分栏显示棋盘，黄色背景

2. 提示词: 请按照该issue要求在当前目录实现issue描述的功能


3. 提示词: 回到上层目录将代码提交到gitee.com/open-sword/ai-code仓库的master分支，上层目录已经是gitee.com/open-sword/ai-code仓库

4. 提示词: 关闭issue IDQEJ