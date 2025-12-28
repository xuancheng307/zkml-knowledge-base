# ZKML 技術知識庫

> AI × 密碼學 的交會點

畢業論文配套技術文獻站，涵蓋 Zero-Knowledge Machine Learning (ZKML) 相關知識。

## AI 內容生成規範

本知識庫的內容主要由 AI 協助生成。為確保學術嚴謹性與一致性，所有 AI agent 必須遵守 **[CLAUDE.md](./CLAUDE.md)** 中定義的規範。

### 核心要求

1. **權威文獻支撐**：所有技術內容必須引用學術論文、白皮書或官方文檔
2. **參考文獻區塊**：每個頁面底部必須包含完整的參考文獻列表
3. **禁止來源**：不可引用部落格、Medium、論壇等非權威來源
4. **術語一致**：遵循 CLAUDE.md 中定義的統一術語

### 參考文獻格式

```html
<section class="references">
  <h2>參考文獻</h2>
  <ol>
    <li id="ref-1">
      <cite>作者名. "論文標題." 會議/期刊名, 年份.</cite>
      <a href="https://arxiv.org/abs/xxxx.xxxxx" target="_blank">arXiv</a>
    </li>
  </ol>
</section>
```

詳細規範請參閱 [CLAUDE.md](./CLAUDE.md)。

## 快速開始

### 本機開發

由於使用了 `/zkml-knowledge-base` 作為 base URL，本機開發時需要從**父目錄**啟動 server：

```bash
# 進入父目錄
cd ..

# 啟動 HTTP server
python -m http.server 8000

# 或使用 Node.js
npx serve .
```

然後打開 `http://localhost:8000/zkml-knowledge-base/`

### 部署到 GitHub Pages

1. 在 GitHub 建立 repository `zkml-docs`
2. 推送程式碼
3. 設定 GitHub Pages 從 `main` branch 部署
4. 網站會在 `https://[username].github.io/zkml-knowledge-base/` 上線

## 專案結構

```
zkml-docs/
├── index.html              # 首頁
├── nav.json                # 導航結構（單一真相來源）
├── _template.html          # 新頁面模板
│
├── assets/
│   ├── css/
│   │   ├── variables.css   # 設計變數（顏色、字體等）
│   │   ├── layout.css      # 佈局樣式
│   │   └── content.css     # 內容樣式
│   └── js/
│       ├── site.js         # 入口腳本
│       ├── nav-store.js    # 導航資料管理
│       ├── sidebar.js      # 側邊欄渲染
│       ├── breadcrumb.js   # 麵包屑
│       ├── pager.js        # 上一頁/下一頁
│       ├── theme.js        # 深色模式
│       └── utils.js        # 工具函數
│
├── foundations/            # 基礎概念
├── crypto/                 # 密碼學
├── ml/                     # 機器學習
├── zkml/                   # ZKML（核心）
└── thesis/                 # 論文導讀
```

## 新增頁面 SOP

### 步驟 1：編輯 nav.json

在對應 section 的 `items` 陣列中加入新條目：

```json
{
  "id": "new-topic",
  "title": "新主題",
  "path": "/zkml/new-topic.html",
  "status": "placeholder"
}
```

### 步驟 2：建立 HTML 檔案

```bash
# 複製模板
cp _template.html zkml/new-topic.html
```

編輯檔案：
- 修改 `<title>` 標籤
- 修改 `data-page-id` 屬性
- 修改 `<h1>` 標題
- 撰寫內容

### 步驟 3：更新狀態

內容完成後，將 nav.json 中的 `status` 改為 `"done"`

## 頁面狀態說明

| 狀態 | 說明 | 側邊欄顯示 |
|------|------|-----------|
| `done` | 內容已完成 | 正常連結 |
| `draft` | 內容撰寫中 | 連結 + 🚧 |
| `placeholder` | 尚未開始 | 灰色 + (即將推出) |
| `hidden` | 隱藏不顯示 | 不渲染 |

## 功能特色

- ✅ 響應式設計（支援手機）
- ✅ 深色模式
- ✅ 自動側邊欄（從 nav.json 生成）
- ✅ 自動麵包屑導航
- ✅ 自動上一頁/下一頁
- ✅ MathJax 數學公式（按需載入）
- ✅ Mermaid 流程圖（按需載入）

## 授權

CC BY-NC-SA 4.0

## 作者

高璿程
