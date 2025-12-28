# ZKML 知識庫架構重整計畫

## 目標
建立一個深度、完整、邏輯清晰的 ZKML 知識庫，讓不同背景的讀者都能有效學習。

---

## 一、新架構設計

### 資料夾結構

```
zkml-knowledge-base/
├── index.html                    # 首頁
├── nav.json                      # 導航配置
├── assets/                       # 靜態資源（維持不變）
│
├── intro/                        # 📐 快速入門
│   ├── index.html               # 什麼是 ZKML
│   ├── glossary.html            # 術語表
│   └── reading-paths.html       # 閱讀路徑
│
├── zkp/                          # 🔐 零知識證明基礎
│   ├── index.html               # ZKP 總覽
│   ├── basics.html              # 基礎定義
│   ├── properties.html          # 三大性質
│   ├── arithmetization/         # 算術化
│   │   ├── r1cs.html
│   │   └── plonkish.html
│   ├── commitments/             # 多項式承諾
│   │   ├── kzg.html
│   │   ├── ipa.html
│   │   └── fri.html
│   └── proof-systems/           # 證明系統
│       ├── groth16.html
│       ├── halo2.html           # 從 crypto/ 移入
│       └── stark.html
│
├── ml/                           # 🧠 機器學習背景
│   ├── index.html               # ML 與 ZKML 的關係
│   ├── inference.html           # 推理流程（新增）
│   ├── quantization.html        # 量化技術（新增）
│   └── onnx.html                # ONNX 表示（新增）
│
├── zkml/                         # ⚡ ZKML 核心理論
│   ├── index.html               # ZKML 總覽
│   │
│   ├── problem/                 # 問題定義
│   │   ├── index.html           # ← problem-statement.html
│   │   ├── threat-model.html    # ← foundations/threat-model.html
│   │   ├── verifiable.html      # ← verifiable-inference.html
│   │   └── private.html         # ← private-inference.html
│   │
│   ├── circuit/                 # 模型轉電路
│   │   ├── index.html           # ← model-to-circuit.html
│   │   ├── fixed-point.html     # 維持
│   │   └── lookup-tables.html   # 維持
│   │
│   ├── quantization/            # ZK 專用量化
│   │   └── index.html           # ← quantization-for-zk.html
│   │
│   ├── optimization/            # 配置空間優化
│   │   ├── config-space.html    # 維持
│   │   ├── cost-metrics.html    # 維持
│   │   └── cost-function.html   # 維持
│   │
│   └── security/                # 安全性分析（維持）
│       ├── zk-relation.html
│       ├── soundness.html
│       └── overflow.html
│
├── frameworks/                   # 🛠️ 框架與工具
│   ├── index.html               # 框架比較總覽
│   ├── academic/                # 學術系統
│   │   ├── zkml-2024.html
│   │   ├── zktorch.html
│   │   └── zkllm.html
│   ├── tools/                   # 產業工具
│   │   ├── ezkl.html
│   │   └── risc-zero.html
│   └── others/                  # 其他方法
│       └── opml.html
│
├── applications/                 # 🌐 應用場景
│   ├── index.html               # 應用總覽（新增）
│   ├── blockchain-ai.html
│   ├── cloud-verification.html
│   └── zk-rollup.html
│
├── research/                     # 📊 效能與未來
│   ├── benchmarks.html          # 新增
│   └── open-problems.html       # 新增
│
└── thesis/                       # 📖 論文導讀
    ├── index.html
    ├── contributions.html       # 新增
    └── chapter-map.html         # 新增
```

---

## 二、檔案遷移對照表

### 需要移動的檔案

| 原位置 | 新位置 | 說明 |
|--------|--------|------|
| foundations/index.html | intro/index.html | 重新定位為快速入門 |
| foundations/glossary.html | intro/glossary.html | 移動 |
| foundations/reading-paths.html | intro/reading-paths.html | 移動 |
| foundations/threat-model.html | zkml/problem/threat-model.html | 移入 ZKML 核心 |
| crypto/index.html | zkp/index.html | 重命名資料夾 |
| crypto/zkp-basics.html | zkp/basics.html | 簡化名稱 |
| crypto/zkp-properties.html | zkp/properties.html | 簡化名稱 |
| crypto/arithmetization/* | zkp/arithmetization/* | 移動 |
| crypto/commitments/* | zkp/commitments/* | 移動 |
| crypto/proof-systems/* | zkp/proof-systems/* | 移動 |
| crypto/halo2.html | zkp/proof-systems/halo2.html | 移入子目錄 |
| zkml/problem-statement.html | zkml/problem/index.html | 重組 |
| zkml/verifiable-inference.html | zkml/problem/verifiable.html | 重組 |
| zkml/private-inference.html | zkml/problem/private.html | 重組 |
| zkml/model-to-circuit.html | zkml/circuit/index.html | 重組 |
| zkml/fixed-point.html | zkml/circuit/fixed-point.html | 移動 |
| zkml/lookup-tables.html | zkml/circuit/lookup-tables.html | 移動 |
| zkml/quantization-for-zk.html | zkml/quantization/index.html | 重組 |
| zkml/configuration-space.html | zkml/optimization/config-space.html | 移動 |
| zkml/cost-metrics.html | zkml/optimization/cost-metrics.html | 移動 |
| zkml/cost-function.html | zkml/optimization/cost-function.html | 移動 |
| zkml/frameworks/comparison.html | frameworks/index.html | 升級為總覽 |
| zkml/frameworks/zkml-2024.html | frameworks/academic/zkml-2024.html | 分類 |
| zkml/frameworks/zktorch.html | frameworks/academic/zktorch.html | 分類 |
| zkml/frameworks/zkllm.html | frameworks/academic/zkllm.html | 分類 |
| zkml/frameworks/ezkl.html | frameworks/tools/ezkl.html | 分類 |
| zkml/frameworks/risc-zero.html | frameworks/tools/risc-zero.html | 分類 |
| zkml/frameworks/opml.html | frameworks/others/opml.html | 分類 |
| zkml/applications/*.html | applications/*.html | 提升層級 |

### 需要刪除的資料夾（移動後）

- foundations/（內容移至 intro/ 和 zkml/problem/）
- crypto/（重命名為 zkp/）
- zkml/frameworks/（移至 frameworks/）
- zkml/applications/（移至 applications/）

---

## 三、需要新增的內容

### 高優先（完整知識庫必要）

| 頁面 | 內容說明 | 參考來源 |
|------|----------|----------|
| ml/inference.html | 神經網路推理流程、前向傳播 | 論文 05, 21 |
| ml/quantization.html | 通用量化背景（非 ZK 專用） | 論文 07, 08 |
| ml/onnx.html | ONNX 格式、計算圖表示 | 論文 01, 02 |
| applications/index.html | 應用場景總覽頁 | 自製 |
| research/benchmarks.html | 各框架效能數據彙整 | 論文 01, 02, 13 |
| research/open-problems.html | 未解決挑戰、研究方向 | 論文 03, 13 |
| thesis/contributions.html | 論文五大貢獻 | 畢業論文 |
| thesis/chapter-map.html | 知識庫 ↔ 論文章節對照 | 自製 |

### 中優先（深化內容）

| 頁面 | 內容說明 |
|------|----------|
| zkml/quantization/strategies.html | 量化策略詳解（per-layer vs per-channel） |
| zkml/quantization/precision.html | 精度與準確度權衡分析 |
| zkml/circuit/operators.html | 各算子的電路實作細節 |
| frameworks/academic/comparison.html | 學術系統深度比較 |

---

## 四、nav.json 新結構

```json
{
  "config": {
    "siteName": "ZKML 技術知識庫",
    "siteSubtitle": "零知識證明 × 機器學習",
    "baseUrl": "/zkml-knowledge-base"
  },

  "sections": [
    {
      "id": "intro",
      "title": "快速入門",
      "icon": "📐",
      "items": [
        { "id": "what-is-zkml", "title": "什麼是 ZKML", "path": "/intro/index.html" },
        { "id": "glossary", "title": "術語表", "path": "/intro/glossary.html" },
        { "id": "reading-paths", "title": "閱讀路徑", "path": "/intro/reading-paths.html" }
      ]
    },

    {
      "id": "zkp",
      "title": "零知識證明",
      "icon": "🔐",
      "items": [
        { "id": "zkp-index", "title": "ZKP 總覽", "path": "/zkp/index.html" },
        { "id": "zkp-basics", "title": "基礎定義", "path": "/zkp/basics.html" },
        { "id": "zkp-properties", "title": "三大性質", "path": "/zkp/properties.html" },
        {
          "id": "arithmetization",
          "title": "算術化",
          "items": [
            { "id": "r1cs", "title": "R1CS", "path": "/zkp/arithmetization/r1cs.html" },
            { "id": "plonkish", "title": "PLONKish", "path": "/zkp/arithmetization/plonkish.html" }
          ]
        },
        {
          "id": "commitments",
          "title": "多項式承諾",
          "items": [
            { "id": "kzg", "title": "KZG", "path": "/zkp/commitments/kzg.html" },
            { "id": "ipa", "title": "IPA", "path": "/zkp/commitments/ipa.html" },
            { "id": "fri", "title": "FRI", "path": "/zkp/commitments/fri.html" }
          ]
        },
        {
          "id": "proof-systems",
          "title": "證明系統",
          "items": [
            { "id": "groth16", "title": "Groth16", "path": "/zkp/proof-systems/groth16.html" },
            { "id": "plonk", "title": "PLONK", "external": "https://xuancheng307.github.io/PLONK/" },
            { "id": "halo2", "title": "Halo2", "path": "/zkp/proof-systems/halo2.html" },
            { "id": "stark", "title": "STARK", "path": "/zkp/proof-systems/stark.html" }
          ]
        }
      ]
    },

    {
      "id": "ml",
      "title": "機器學習背景",
      "icon": "🧠",
      "items": [
        { "id": "ml-index", "title": "ML 與 ZKML", "path": "/ml/index.html" },
        { "id": "inference", "title": "推理流程", "path": "/ml/inference.html" },
        { "id": "quantization-bg", "title": "量化技術", "path": "/ml/quantization.html" },
        { "id": "onnx", "title": "ONNX 表示", "path": "/ml/onnx.html" }
      ]
    },

    {
      "id": "zkml",
      "title": "ZKML 核心",
      "icon": "⚡",
      "badge": "論文核心",
      "items": [
        { "id": "zkml-index", "title": "ZKML 總覽", "path": "/zkml/index.html" },
        {
          "id": "problem",
          "title": "問題定義",
          "items": [
            { "id": "problem-index", "title": "問題與場景", "path": "/zkml/problem/index.html" },
            { "id": "threat-model", "title": "威脅模型", "path": "/zkml/problem/threat-model.html" },
            { "id": "verifiable", "title": "可驗證推理", "path": "/zkml/problem/verifiable.html" },
            { "id": "private", "title": "隱私推理", "path": "/zkml/problem/private.html" }
          ]
        },
        {
          "id": "circuit",
          "title": "模型轉電路",
          "items": [
            { "id": "circuit-index", "title": "轉換流程", "path": "/zkml/circuit/index.html" },
            { "id": "fixed-point", "title": "定點數表示", "path": "/zkml/circuit/fixed-point.html" },
            { "id": "lookup-tables", "title": "查表優化", "path": "/zkml/circuit/lookup-tables.html" }
          ]
        },
        {
          "id": "quantization",
          "title": "ZK 專用量化",
          "items": [
            { "id": "quant-index", "title": "量化策略", "path": "/zkml/quantization/index.html" }
          ]
        },
        {
          "id": "optimization",
          "title": "配置優化",
          "badge": "論文核心",
          "items": [
            { "id": "config-space", "title": "配置空間", "path": "/zkml/optimization/config-space.html" },
            { "id": "cost-metrics", "title": "成本指標", "path": "/zkml/optimization/cost-metrics.html" },
            { "id": "cost-function", "title": "成本函數", "path": "/zkml/optimization/cost-function.html" }
          ]
        },
        {
          "id": "security",
          "title": "安全性分析",
          "items": [
            { "id": "zk-relation", "title": "ZK 關係式", "path": "/zkml/security/zk-relation.html" },
            { "id": "soundness", "title": "Soundness", "path": "/zkml/security/soundness.html" },
            { "id": "overflow", "title": "溢位風險", "path": "/zkml/security/overflow.html" }
          ]
        }
      ]
    },

    {
      "id": "frameworks",
      "title": "框架與工具",
      "icon": "🛠️",
      "items": [
        { "id": "frameworks-index", "title": "框架比較", "path": "/frameworks/index.html" },
        {
          "id": "academic",
          "title": "學術系統",
          "items": [
            { "id": "zkml-2024", "title": "ZKML (EuroSys'24)", "path": "/frameworks/academic/zkml-2024.html" },
            { "id": "zktorch", "title": "ZKTorch", "path": "/frameworks/academic/zktorch.html" },
            { "id": "zkllm", "title": "zkLLM", "path": "/frameworks/academic/zkllm.html" }
          ]
        },
        {
          "id": "tools",
          "title": "產業工具",
          "items": [
            { "id": "ezkl", "title": "EZKL", "path": "/frameworks/tools/ezkl.html" },
            { "id": "risc-zero", "title": "RISC Zero", "path": "/frameworks/tools/risc-zero.html" }
          ]
        },
        {
          "id": "others",
          "title": "其他方法",
          "items": [
            { "id": "opml", "title": "OPML", "path": "/frameworks/others/opml.html" }
          ]
        }
      ]
    },

    {
      "id": "applications",
      "title": "應用場景",
      "icon": "🌐",
      "items": [
        { "id": "apps-index", "title": "應用總覽", "path": "/applications/index.html" },
        { "id": "blockchain-ai", "title": "區塊鏈 AI", "path": "/applications/blockchain-ai.html" },
        { "id": "cloud-verify", "title": "雲端驗證", "path": "/applications/cloud-verification.html" },
        { "id": "zk-rollup", "title": "ZK Rollup", "path": "/applications/zk-rollup.html" }
      ]
    },

    {
      "id": "research",
      "title": "效能與未來",
      "icon": "📊",
      "items": [
        { "id": "benchmarks", "title": "效能比較", "path": "/research/benchmarks.html" },
        { "id": "open-problems", "title": "開放問題", "path": "/research/open-problems.html" }
      ]
    },

    {
      "id": "thesis",
      "title": "論文導讀",
      "icon": "📖",
      "items": [
        { "id": "thesis-index", "title": "論文概覽", "path": "/thesis/index.html" },
        { "id": "contributions", "title": "研究貢獻", "path": "/thesis/contributions.html" },
        { "id": "chapter-map", "title": "章節對照", "path": "/thesis/chapter-map.html" }
      ]
    }
  ]
}
```

---

## 五、執行步驟

### 階段 1：基礎架構（優先）
1. 建立新資料夾結構
2. 移動/重命名檔案
3. 更新所有頁面的內部連結
4. 更新 nav.json

### 階段 2：內容補齊
1. 新增 ml/ 區塊的三個頁面
2. 新增 applications/index.html
3. 新增 research/ 兩個頁面
4. 新增 thesis/ 兩個頁面

### 階段 3：深化內容
1. 審核所有現有頁面的深度
2. 補充缺失的技術細節
3. 統一引用格式與術語

### 階段 4：品質保證
1. 檢查所有連結是否正常
2. 驗證 nav.json 與實際檔案一致
3. 測試本地與 GitHub Pages 部署

---

## 六、風險與注意事項

1. **大量檔案移動**：需要一次性完成，避免中間狀態
2. **內部連結更新**：每個頁面的相對/絕對路徑都需要檢查
3. **Git 歷史**：使用 `git mv` 保留檔案歷史
4. **快取問題**：GitHub Pages 部署後需清除瀏覽器快取

---

## 七、預估工作量

| 階段 | 任務 | 複雜度 |
|------|------|--------|
| 階段 1 | 架構重整 | 高（技術性操作） |
| 階段 2 | 新增 8 個頁面 | 中（需撰寫內容） |
| 階段 3 | 深化現有 42 頁 | 高（需審核每頁） |
| 階段 4 | 品質保證 | 低（自動化可輔助） |

---

建立日期：2024-12-28
維護者：統籌對話框
