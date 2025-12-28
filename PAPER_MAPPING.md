# 論文與知識庫頁面對照表

本文件將 21 篇已下載論文對應到知識庫各頁面，方便系統性填充內容。

## 論文清單總覽

| 編號 | 檔案名稱 | 主要適用頁面 |
|------|----------|--------------|
| 01 | ZKML_EuroSys2024 | zkml-2024, model-to-circuit, config-space |
| 02 | ZKTorch_arXiv2025 | zktorch, model-to-circuit |
| 03 | ZKML_Survey_arXiv2025 | zkml-index, foundations-index |
| 04 | OnChain_ZKML_ScienceDirect2024 | blockchain-ai, zk-rollup |
| 05 | zkCNN_CCS2021 | model-to-circuit, verifiable-inference |
| 06 | ezDPS_PoPETs2023 | ezkl, private-inference |
| 07 | Jacob_Quantization_CVPR2018 | quantization, quant-for-zk |
| 08 | Hubara_PTQ_ICML2021 | quantization, fixed-point |
| 09 | Bergstra_TPE_NeurIPS2011 | config-space, cost-function |
| 10 | cTPE_IJCAI2023 | config-space |
| 11 | Hyperband_JMLR2018 | config-space |
| 12 | MOBO_Pareto_ICML2020 | cost-metrics, cost-function |
| 13 | Scaling_Trustless_DNN_NeurIPS2023 | zkml-index, benchmarks |
| 14 | MTZK_NDSS2025 | private-inference, threat-model |
| 15 | Halo_Recursive_Proof_2019 | halo2, ipa |
| 16 | STARK_Whitepaper_2018 | stark, fri |
| 17 | ezkl_Verifiable_ML_2024 | ezkl, lookup-tables |
| 18 | zkLLM_Transformer_CCS2024 | zkllm, transformers |
| 19 | zkPyTorch_Compiler_2025 | model-to-circuit, framework-comparison |
| 20 | Efficient_ZKP_NN_2024 | model-to-circuit, benchmarks |
| 21 | zkDL_Training_2023 | zkml-index, neural-networks |

---

## 知識庫頁面詳細對照

### 1. 基礎概念 (foundations)

#### foundations-index: 總覽：什麼是 ZKML
- **主要來源**: 03_ZKML_Survey_arXiv2025
- **補充來源**: 01_ZKML_EuroSys2024 (Section 1-2)
- **內容方向**: ZKML 定義、動機、核心問題、發展歷史

#### threat-model: 威脅模型與安全目標
- **主要來源**: 14_MTZK_NDSS2025
- **補充來源**: 03_ZKML_Survey (Security Analysis)
- **內容方向**: 攻擊者能力、安全假設、可驗證性 vs 隱私

#### glossary: 術語表
- **來源**: 整合所有論文的術語
- **內容方向**: ZKP、ML、ZKML 專用術語定義

#### reading-paths: 推薦閱讀路徑
- **來源**: 自製內容
- **內容方向**: 依背景推薦閱讀順序

---

### 2. 密碼學 (crypto)

#### crypto-index: 密碼學總覽
- **主要來源**: 03_ZKML_Survey (Preliminaries)
- **內容方向**: ZKP、承諾方案、算術化概述

#### zkp-basics: ZKP 基礎概念
- **主要來源**: 03_ZKML_Survey (Section 2)
- **補充來源**: 16_STARK_Whitepaper (Introduction)
- **內容方向**: 交互式證明、NP、P 關係

#### zkp-properties: 完備性、可靠性、零知識
- **主要來源**: 03_ZKML_Survey
- **補充來源**: 15_Halo (Definitions)
- **內容方向**: 三大性質的形式化定義與直觀解釋

#### kzg: KZG 多項式承諾
- **主要來源**: 01_ZKML_EuroSys2024 (Background)
- **補充來源**: PLONK 論文 (已有外部連結)
- **內容方向**: 雙線性配對、Setup、Commit、Open

#### ipa: IPA 內積論證
- **主要來源**: 15_Halo_Recursive_Proof_2019
- **內容方向**: 無需 trusted setup 的替代方案

#### fri: FRI（STARK 用）
- **主要來源**: 16_STARK_Whitepaper_2018
- **內容方向**: Low-degree testing、Merkle tree

#### r1cs: R1CS
- **主要來源**: 03_ZKML_Survey (Arithmetization)
- **內容方向**: Rank-1 Constraint System 定義

#### plonkish: PLONKish / AIR
- **主要來源**: 01_ZKML_EuroSys2024
- **補充來源**: PLONK 論文
- **內容方向**: Copy constraints、Custom gates

#### groth16: Groth16
- **主要來源**: 03_ZKML_Survey
- **內容方向**: Trusted setup、證明大小、驗證速度

#### halo2: Halo2
- **主要來源**: 15_Halo_Recursive_Proof_2019
- **補充來源**: 01_ZKML_EuroSys2024, 17_ezkl
- **內容方向**: PLONKish + IPA、Zcash 實作

#### stark: STARK
- **主要來源**: 16_STARK_Whitepaper_2018
- **內容方向**: Transparent setup、Post-quantum、證明大小

---

### 3. 機器學習 (ml)

#### ml-index: 機器學習總覽
- **來源**: 整合各論文 ML 背景章節
- **內容方向**: 監督學習、神經網路、推理

#### neural-networks: 神經網路基礎
- **主要來源**: 21_zkDL_Training_2023
- **補充來源**: 05_zkCNN_CCS2021
- **內容方向**: 前向傳播、反向傳播、層類型

#### activations: 激活函數
- **主要來源**: 01_ZKML_EuroSys2024 (Section 4)
- **補充來源**: 17_ezkl
- **內容方向**: ReLU、GELU、SiLU 及 ZK-friendly 替代

#### transformers: Transformer 架構
- **主要來源**: 18_zkLLM_Transformer_CCS2024
- **內容方向**: Self-attention、FFN、Positional encoding

#### quantization: 量化（Quantization）
- **主要來源**: 07_Jacob_Quantization_CVPR2018
- **補充來源**: 08_Hubara_PTQ_ICML2021
- **內容方向**: 均勻量化、非對稱/對稱、scale/zero-point

#### pruning: 剪枝（Pruning）
- **主要來源**: 03_ZKML_Survey
- **內容方向**: 結構化剪枝、稀疏性

#### onnx: ONNX 模型表示
- **主要來源**: 01_ZKML_EuroSys2024
- **補充來源**: 02_ZKTorch
- **內容方向**: 運算符、計算圖、互通性

---

### 4. ZKML 核心 (zkml)

#### zkml-index: ZKML 總覽
- **主要來源**: 03_ZKML_Survey_arXiv2025
- **補充來源**: 01_ZKML_EuroSys2024
- **內容方向**: 問題定義、系統分類、發展時間線

#### problem-statement: 問題定義與場景
- **主要來源**: 01_ZKML_EuroSys2024 (Section 1)
- **補充來源**: 03_ZKML_Survey
- **內容方向**: 為何需要 ZKML、典型場景

#### verifiable-inference: 可驗證推理
- **主要來源**: 05_zkCNN_CCS2021
- **補充來源**: 01_ZKML_EuroSys2024
- **內容方向**: 公開模型、驗證輸出正確性

#### private-inference: 隱私推理
- **主要來源**: 06_ezDPS_PoPETs2023
- **補充來源**: 14_MTZK_NDSS2025
- **內容方向**: 私有模型/輸入、MPC+ZKP 組合

#### quant-for-zk: ZK 專用量化
- **主要來源**: 01_ZKML_EuroSys2024 (Section 4)
- **補充來源**: 07_Jacob, 08_Hubara
- **內容方向**: bit_width 選擇、per_channel 效果

#### config-space: 配置空間與調參
- **主要來源**: 01_ZKML_EuroSys2024 (Section 5)
- **補充來源**: 09_Bergstra_TPE, 10_cTPE, 11_Hyperband
- **內容方向**: logrows、lookup_bits、搜索策略

#### cost-metrics: ZK 成本指標
- **主要來源**: 01_ZKML_EuroSys2024
- **補充來源**: 02_ZKTorch
- **內容方向**: 證明時間、記憶體、證明大小

#### cost-function: Cost Function 設計
- **主要來源**: 12_MOBO_Pareto_ICML2020
- **補充來源**: 01_ZKML_EuroSys2024
- **內容方向**: 多目標優化、Pareto 前沿

#### model-to-circuit: 模型 → 電路
- **主要來源**: 01_ZKML_EuroSys2024 (Section 3)
- **補充來源**: 02_ZKTorch, 05_zkCNN, 19_zkPyTorch, 20_Efficient_ZKP_NN
- **內容方向**: 算符分解、約束生成

#### fixed-point: 定點數與精度
- **主要來源**: 01_ZKML_EuroSys2024
- **補充來源**: 08_Hubara_PTQ
- **內容方向**: Scale factor、溢位處理

#### lookup-tables: 查表優化
- **主要來源**: 17_ezkl_Verifiable_ML_2024
- **補充來源**: 01_ZKML_EuroSys2024
- **內容方向**: 非線性函數查表、lookup_bits

#### zkml-2024: ZKML (EuroSys 2024)
- **主要來源**: 01_ZKML_EuroSys2024
- **內容方向**: 系統架構、量化流程、實驗結果

#### zktorch: ZKTorch (2025)
- **主要來源**: 02_ZKTorch_arXiv2025
- **內容方向**: 編譯器架構、優化技術

#### ezkl: EZKL
- **主要來源**: 17_ezkl_Verifiable_ML_2024
- **補充來源**: 06_ezDPS
- **內容方向**: 工具使用、設計理念

#### zkllm: zkLLM
- **主要來源**: 18_zkLLM_Transformer_CCS2024
- **內容方向**: LLM 專用 ZKP 技術

#### opml: OPML
- **主要來源**: 03_ZKML_Survey
- **內容方向**: 樂觀執行 + 欺詐證明

#### risc-zero: RISC Zero
- **主要來源**: 03_ZKML_Survey
- **內容方向**: zkVM 方法、RISC-V 模擬

#### framework-comparison: 框架橫向比較
- **主要來源**: 03_ZKML_Survey
- **補充來源**: 01, 02, 17, 18, 19, 20
- **內容方向**: 功能對比、效能對比

#### blockchain-ai: 區塊鏈可驗證 AI
- **主要來源**: 04_OnChain_ZKML_ScienceDirect2024
- **內容方向**: DeFi、DAO、NFT 應用

#### cloud-verify: 雲端 ML 第三方驗證
- **主要來源**: 01_ZKML_EuroSys2024
- **內容方向**: 雲端 AI 正確性驗證

#### zk-rollup: ZK Rollup / L2 決策
- **主要來源**: 04_OnChain_ZKML
- **內容方向**: Layer 2 整合、Gas 成本

#### zk-relation: ZK Relation 定義
- **主要來源**: 03_ZKML_Survey
- **內容方向**: R(x, w) 形式化

#### soundness: 量化與 Soundness
- **主要來源**: 01_ZKML_EuroSys2024
- **補充來源**: 14_MTZK
- **內容方向**: 量化誤差與安全性關係

#### overflow: Overflow 與 Wrap-around
- **主要來源**: 01_ZKML_EuroSys2024
- **內容方向**: 有限域溢位問題

#### benchmarks: 效能比較
- **主要來源**: 01_ZKML, 02_ZKTorch, 13_Scaling_Trustless
- **內容方向**: 模型效能數據彙整

#### open-problems: 開放問題
- **主要來源**: 03_ZKML_Survey
- **補充來源**: 13_Scaling_Trustless
- **內容方向**: 未解決挑戰、研究方向

---

### 5. 論文導讀 (thesis)

#### thesis-index: 論文概覽
- **來源**: 畢業論文本身
- **內容方向**: 論文摘要、架構導覽

#### contributions: 研究貢獻
- **來源**: 畢業論文 Chapter 1, 9
- **內容方向**: 五大貢獻詳述

#### chapter-map: 章節對照表
- **來源**: 自製對照表
- **內容方向**: 知識庫頁面 ↔ 論文章節

#### references: 參考文獻
- **來源**: 21 篇論文 + 畢業論文 bibliography
- **內容方向**: 完整參考文獻列表

---

## 建議填充順序

### 第一優先（核心內容）
1. zkml-index → 使用 Survey 論文
2. zkml-2024 → 使用 EuroSys 2024 論文
3. quant-for-zk → 量化核心內容
4. config-space → 配置空間核心內容
5. model-to-circuit → 轉換流程

### 第二優先（密碼學基礎）
1. zkp-basics → ZKP 入門
2. halo2 → 後端說明
3. plonkish → 算術化
4. kzg, ipa, fri → 承諾方案

### 第三優先（ML 背景）
1. quantization → 量化背景
2. transformers → 處理 LLM
3. neural-networks → 基礎架構

### 第四優先（框架與應用）
1. ezkl, zktorch, zkllm → 各框架詳述
2. blockchain-ai → 應用場景
3. benchmarks → 效能數據

---

## 論文存放位置

所有論文存放於：
```
C:\Dcopy\畢業論文\畢業論文V2\相關資料\
├── 01_ZKML_EuroSys2024.pdf
├── 02_ZKTorch_arXiv2025.pdf
├── ... (共 21 篇)
└── 21_zkDL_Training_2023.pdf
```

---

更新日期：2024-12
維護者：高璿程
