# ZKML 知識庫內容深化任務 - ZKP 證明系統組

## 專案背景

你正在協助深化一個 ZKML（零知識機器學習）技術知識庫。這是一個繁體中文的學術級技術文檔網站，目標讀者為研究生與專業開發者。

專案位置：C:\Dcopy\畢業論文\github知識庫架構\zkml-knowledge-base
GitHub：https://github.com/xuancheng307/zkml-knowledge-base

## 你的角色

你負責深化 **ZKP 證明系統與密碼學基礎** 部分，共 7 個頁面。

## 負責檔案清單

1. `zkp/proof-systems/groth16.html` （目標：800-1000 行）
2. `zkp/proof-systems/halo2.html` （目標：1000-1200 行）
3. `zkp/proof-systems/stark.html` （目標：800-1000 行）
4. `zkp/commitments/kzg.html` （目標：600-800 行）
5. `zkp/commitments/ipa.html` （目標：600-800 行）
6. `zkp/commitments/fri.html` （目標：600-800 行）
7. `zkp/arithmetization/plonkish.html` （目標：600-800 行）

## 深度標準參考

以 PLONK 技術報告為基準：https://xuancheng307.github.io/PLONK/
該報告具備：12 章節、50+ 形式化定義、完整演算法步驟、度數分析、安全性證明框架

## 每頁必須包含的結構

```
1. 概述與定位（150-200字）
   - 系統特色、歷史背景
   - 與其他系統的關係定位

2. 形式化定義區塊（10-20 個定義）
   使用 <div class="definition"> 標籤包裹
   包含：數學符號與形式化表述

3. 協議完整描述
   a) Setup 階段（若有 trusted setup）
      - 輸入參數
      - 輸出：CRS / SRS 結構

   b) Prover 演算法（逐步驟）
      - 每個步驟的輸入/輸出
      - 計算的數學表達式
      - 複雜度標註

   c) Verifier 演算法（逐步驟）
      - 驗證等式
      - 接受/拒絕條件

4. 複雜度分析表格
   | 指標 | Prover | Verifier | 證明大小 |
   |-----|--------|----------|---------|
   | 時間 | O(?) | O(?) | O(?) |
   | 空間 | O(?) | O(?) | - |

5. 安全性分析
   - 安全假設（DLP、DLOG、Random Oracle 等）
   - Soundness 論證框架
   - Zero-Knowledge 論證框架
   - 已知攻擊與防禦

6. 設計動機（Why 區塊）
   - 為什麼選擇這種多項式承諾？
   - 為什麼這樣設計協議輪次？
   - 與替代方案的取捨分析

7. 與 ZKML 的關聯
   - 在 ML 推理驗證中的適用性
   - 效能瓶頸與優化方向

8. 參考文獻（學術引用格式）
   使用 <section class="references"> 標籤
```

## 各頁面重點指引

### groth16.html
- **重點**：Trusted Setup、QAP 到 Pairing 的轉換
- **必須說明**：為何證明最小（3 個群元素）
- **安全性**：Knowledge-of-Exponent 假設
- **演算法**：完整的 Setup、Prove、Verify 三階段

### halo2.html
- **重點**：Accumulator Scheme、無 trusted setup
- **必須說明**：IPA 如何實現遞迴驗證
- **核心內容**：PLONKish 表格系統、Lookup Arguments
- **架構**：電路 API 設計（Region、Cell、Column）

### stark.html
- **重點**：透明設置、後量子安全
- **必須說明**：AIR（Algebraic Intermediate Representation）約束
- **核心內容**：FRI 協議整合、DEEP-ALI 方法
- **取捨**：Blow-up Factor 與證明大小的權衡

### kzg.html
- **重點**：Trusted Setup（Powers of Tau）
- **必須說明**：Batch Opening 優化
- **核心內容**：Degree Bound 證明、多項式除法
- **應用**：與 PLONK 的整合方式

### ipa.html
- **重點**：無 trusted setup、對數大小證明
- **必須說明**：內積論證（Inner Product Argument）核心原理
- **核心內容**：遞迴壓縮過程、Pedersen 承諾
- **關聯**：與 Bulletproofs 的關係

### fri.html
- **重點**：Reed-Solomon 碼摺疊
- **必須說明**：低度測試原理、Query 複雜度
- **核心內容**：Commit 與 Query 階段、Soundness 分析
- **應用**：與 STARK 的整合

### plonkish.html
- **重點**：Custom Gates、Copy Constraints
- **必須說明**：Selector 多項式如何切換閘類型
- **核心內容**：Lookup Arguments（Plookup 協議）
- **優勢**：相比 R1CS 的表達效率

## 技術規範

1. **HTML 結構**：保持現有 CSS class 命名（callout、callout-info、callout-warning、definition、table 等）
2. **數學公式**：使用 Unicode 數學符號（∑、∏、∈、⊕ 等）或 `<code>` 標籤
3. **交叉引用**：使用相對路徑，如 `href="../commitments/kzg.html"`
4. **語言**：繁體中文，技術術語可附英文原文（如「健全性 (Soundness)」）
5. **引用格式**：頁尾使用 `<section class="references">` 區塊，包含 `<ol>` 列表

## HTML 模板參考

```html
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[頁面標題] - ZKML 技術知識庫</title>

  <script>
    (function() {
      const theme = localStorage.getItem('zkml-theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      document.documentElement.setAttribute('data-theme', theme);
    })();
  </script>

  <link rel="stylesheet" href="/zkml-knowledge-base/assets/css/variables.css">
  <link rel="stylesheet" href="/zkml-knowledge-base/assets/css/layout.css">
  <link rel="stylesheet" href="/zkml-knowledge-base/assets/css/content.css">
</head>
<body data-page-id="[頁面ID]">
  <button id="mobile-menu-btn" aria-label="開啟選單">☰</button>
  <div id="sidebar-overlay"></div>
  <nav id="sidebar"></nav>

  <main>
    <nav id="breadcrumb" aria-label="麵包屑導覽"></nav>

    <article>
      <!-- 內容從這裡開始 -->
      <h1>[標題]</h1>

      <!-- 使用 callout 提示重點 -->
      <div class="callout callout-info">
        <div class="callout-title">核心概念</div>
        <p>...</p>
      </div>

      <!-- 定義區塊 -->
      <div class="definition">
        <strong>定義 1（名稱）</strong>
        <p>形式化定義內容...</p>
      </div>

      <!-- 演算法步驟 -->
      <h2>Prover 演算法</h2>
      <pre><code>輸入：...
輸出：...

步驟 1：...
步驟 2：...
      </code></pre>

      <!-- 複雜度表格 -->
      <table>
        <thead>
          <tr><th>指標</th><th>複雜度</th></tr>
        </thead>
        <tbody>
          <tr><td>時間</td><td>O(n log n)</td></tr>
        </tbody>
      </table>

      <!-- 參考文獻 -->
      <section class="references">
        <h2>參考文獻</h2>
        <ol>
          <li id="ref-1">
            <cite>作者. "標題." 會議/期刊, 年份.</cite>
            <a href="URL" target="_blank" rel="noopener">連結</a>
          </li>
        </ol>
      </section>

    </article>

    <nav id="prev-next" aria-label="前後頁導覽"></nav>
  </main>

  <button id="theme-toggle" aria-label="切換深色模式">🌙</button>
  <script type="module" src="/zkml-knowledge-base/assets/js/site.js"></script>
</body>
</html>
```

## 完成後步驟

1. 確認每個檔案都已正確修改並達到目標行數
2. 執行：
   ```bash
   cd C:\Dcopy\畢業論文\github知識庫架構\zkml-knowledge-base
   git add .
   git commit -m "深化 ZKP 證明系統內容：groth16, halo2, stark, kzg, ipa, fri, plonkish"
   git push
   ```
3. 回報完成狀態：
   - 修改了哪些檔案
   - 各檔案最終行數
   - 主要新增的內容摘要

## 注意事項

- **不要修改** nav.json 或其他非負責範圍的檔案
- **保持** 頁面 `<head>` 和 `<script>` 區塊不變
- **確保** 所有內部連結（href）仍然有效
- **保持** data-page-id 與 nav.json 中的 id 一致
- **避免** 使用 emoji（除非原本就有）

## 參考資源

- PLONK 技術報告：https://xuancheng307.github.io/PLONK/
- Halo2 官方文檔：https://zcash.github.io/halo2/
- STARK 論文：Ben-Sasson et al., "Scalable, transparent, and post-quantum secure computational integrity" (2018)
- KZG 論文：Kate, Zaverucha, Goldberg, "Constant-Size Commitments to Polynomials and Their Applications" (2010)
