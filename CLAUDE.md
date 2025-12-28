# ZKML 知識庫 - AI 內容生成規範

本文件定義 AI agent 在為此知識庫生成內容時必須遵守的規範。

## 核心原則

1. **學術嚴謹性**：所有技術內容必須有權威文獻支撐
2. **一致性**：遵循統一的設計風格與術語
3. **可追溯性**：每項聲明都應可追溯至原始來源
4. **專業完整性**：內容應盡可能專業，不遺漏重要細節
5. **符號一致性**：數學公式、變數命名必須與權威論文保持一致

---

## 參考文獻要求（強制）

### 允許的文獻來源

| 來源類型 | 範例 | 優先級 |
|---------|------|-------|
| 學術論文 | arXiv, IEEE, ACM, USENIX, NeurIPS, ICML, EuroSys | 最高 |
| 白皮書 | Ethereum Foundation, Protocol Labs, zkSync | 高 |
| 官方文檔 | EZKL docs, Circom docs, halo2 book | 中 |
| 技術規範 | EIP, RFC | 中 |

### 禁止的來源

- 部落格文章（除非是官方技術博客且有技術深度）
- Medium 文章
- 社群論壇討論
- 維基百科（可作為入口，但不可作為唯一來源）
- 無法驗證的來源

### 頁面底部參考文獻格式（強制）

每個內容頁面必須在 `</article>` 結束前包含參考文獻區塊：

```html
<section class="references">
  <h2>參考文獻</h2>
  <ol>
    <li id="ref-1">
      <cite>作者名. "論文標題." 會議/期刊名, 年份.</cite>
      <a href="https://arxiv.org/abs/xxxx.xxxxx" target="_blank" rel="noopener">arXiv</a> |
      <a href="https://doi.org/10.xxxx/xxxxx" target="_blank" rel="noopener">DOI</a>
    </li>
    <!-- 更多參考文獻 -->
  </ol>
</section>
```

### 內文引用格式

使用上標數字連結到參考文獻：

```html
<p>ZKML 系統使用 halo2 作為後端<sup><a href="#ref-1">[1]</a></sup>。</p>
```

---

## 設計風格規範

### HTML 結構

1. **頁面 ID**：`<body data-page-id="xxx">` 必須與 nav.json 中的 id 一致
2. **標題層級**：
   - `<h1>` - 頁面主標題（唯一）
   - `<h2>` - 主要章節
   - `<h3>` - 子章節
   - `<h4>` - 細項（少用）

3. **Callout 使用**：
```html
<!-- 資訊提示 -->
<div class="callout callout-info">
  <div class="callout-title">標題</div>
  <p>內容</p>
</div>

<!-- 警告 -->
<div class="callout callout-warning">
  <div class="callout-title">注意</div>
  <p>內容</p>
</div>

<!-- 論文章節對應 -->
<div class="callout callout-info">
  <div class="callout-title">論文章節</div>
  <p>本頁對應論文 §X.X「章節名稱」</p>
</div>
```

### 術語一致性

| 統一用語 | 避免使用 |
|---------|---------|
| 量化 (Quantization) | 量子化 |
| 證明 (Proof) | 憑證 |
| 驗證者 (Verifier) | 驗證方 |
| 證明者 (Prover) | 證明方 |
| 電路 (Circuit) | 線路 |
| 約束 (Constraint) | 限制 |
| 見證 (Witness) | 證人 |
| 健全性 (Soundness) | 可靠性 |
| 完備性 (Completeness) | 完整性 |
| 零知識 (Zero-Knowledge) | 零知識性 |

### 數學公式（重要）

使用 MathJax（LaTeX 語法），頁面會自動載入：

```html
<p>成本函數定義為：</p>
<p class="math">$$C = \alpha \cdot T_{prove} + \beta \cdot M_{RAM} + \gamma \cdot S_{proof}$$</p>
```

#### 符號一致性要求（強制）

數學符號必須與原始論文保持一致，不可自行創造符號：

| 概念 | 標準符號 | 來源論文 |
|-----|---------|---------|
| 公開輸入 | x | ZKP 通用慣例 |
| 私密見證 | w (witness) | ZKP 通用慣例 |
| 關係式 | R(x, w) | ZKP 通用慣例 |
| 證明 | π (pi) | ZKP 通用慣例 |
| 安全參數 | λ (lambda) | ZKP 通用慣例 |
| 有限域 | F_p 或 𝔽_p | ZKP 通用慣例 |
| 電路大小 | \|C\| | ZKML EuroSys 2024 |
| 證明時間 | T_prove | ZKML EuroSys 2024 |
| 記憶體使用 | M_RAM | ZKML EuroSys 2024 |
| 證明大小 | S_proof | ZKML EuroSys 2024 |
| logrows 參數 | k | halo2 / EZKL |
| lookup bits | lookup_bits | EZKL |
| 量化 scale | S 或 scale | Jacob et al. CVPR 2018 |
| 量化 zero-point | Z 或 zp | Jacob et al. CVPR 2018 |
| bit width | b 或 bit_width | ZKML EuroSys 2024 |

#### 公式呈現要求

1. **完整公式**：不可省略重要項，需呈現完整數學定義
2. **變數說明**：每個公式後需解釋所有變數含義
3. **單位標註**：涉及時間、記憶體等需標明單位
4. **來源標註**：公式來自特定論文時需加引用標註

範例：
```html
<p>FFT 複雜度估算<sup><a href="#ref-1">[1]</a></sup>：</p>
<p class="math">$$T_{FFT} = O(n \log n)$$</p>
<p>其中 n 為多項式係數數量。</p>
```

### 程式碼區塊

```html
<pre><code class="language-python">
# 範例程式碼
def example():
    pass
</code></pre>
```

### 表格

```html
<table>
  <thead>
    <tr><th>欄位1</th><th>欄位2</th></tr>
  </thead>
  <tbody>
    <tr><td>值1</td><td>值2</td></tr>
  </tbody>
</table>
```

---

## 內容結構規範

### 標準頁面結構

1. **論文章節對應**（如適用）- callout 標示對應論文章節
2. **概述** - 1-2 段簡介
3. **核心內容** - 使用 h2/h3 組織
4. **實務考量/應用**（如適用）
5. **相關頁面連結**（如適用）
6. **參考文獻**（強制）

### 專業深度要求（重要）

內容必須達到學術論文等級的專業性：

1. **形式化定義**：核心概念需提供形式化數學定義，不可只有口語描述
2. **完整推導**：重要公式需說明推導過程或來源
3. **細節不可省略**：
   - 演算法的完整步驟
   - 複雜度分析（時間、空間）
   - 參數的完整說明與合理範圍
   - 邊界條件與例外情況
4. **實驗數據**：引用論文數據時需標明實驗條件（硬體環境、模型規模等）
5. **比較分析**：涉及多種方法時需提供定量比較表格

範例 - 不可接受的描述：
> "halo2 比 Groth16 更有效率"

範例 - 可接受的描述：
> "halo2 無需可信設置 (trusted setup)，但證明大小為 O(log n)，相較 Groth16 的 O(1) 證明大小較大。根據 [1] 在 VGG-16 模型上的實驗，halo2 證明生成時間為 X 秒（使用 Y 硬體），驗證時間為 Z 毫秒。"

### 禁止事項

- ❌ 不可使用「可能」、「或許」等模糊語氣來掩蓋缺乏來源的問題
- ❌ 不可憑空創造數據或實驗結果
- ❌ 不可使用未經驗證的效能數據
- ❌ 不可省略參考文獻區塊
- ❌ 不可使用 emoji（除非是 callout 圖示或 placeholder 頁面）

### 允許事項

- ✅ 可以整合多篇論文的內容進行綜述
- ✅ 可以加入解釋性圖表（需標註來源或標明自製）
- ✅ 可以提供程式碼範例（需標註來源或標明自製）
- ✅ 可以使用「根據 [1]」、「如 [2] 所述」等引用語氣

---

## 關鍵論文參考清單

以下是本知識庫核心內容應引用的主要論文：

### ZKML 核心
1. **ZKML (2024)**: "ZKML: An Optimizing System for ML Inference in Zero-Knowledge Proofs" - EuroSys 2024
2. **ZKTorch (2025)**: "ZKTorch: Compiling ML Inference to Zero-Knowledge Proofs" - arXiv 2025

### ZK 基礎
3. **PLONK**: "PLONK: Permutations over Lagrange-bases for Oecumenical Noninteractive arguments of Knowledge" - IACR ePrint 2019
4. **halo2**: Zcash halo2 documentation

### 量化相關
5. 各類 Post-Training Quantization 論文
6. EZKL 官方文檔與論文

### 應用場景
7. zkLLM 相關論文
8. Blockchain AI 相關論文

---

## 新增頁面檢查清單

在提交新頁面前，確認：

- [ ] `data-page-id` 與 nav.json 一致
- [ ] 標題層級正確（h1 唯一）
- [ ] 包含參考文獻區塊
- [ ] 所有技術聲明有文獻支撐
- [ ] 術語使用符合規範
- [ ] 無拼寫錯誤
- [ ] 連結可正常運作

---

## 版本資訊

- 規範版本：1.0
- 最後更新：2024-12
- 維護者：高璿程
