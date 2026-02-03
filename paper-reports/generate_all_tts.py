"""
批次生成 TTS 音檔

使用前請先設定認證，以下三選一：
1. 設定環境變數: set GOOGLE_APPLICATION_CREDENTIALS=你的金鑰.json
2. 執行: gcloud auth application-default login
3. 在程式碼中指定金鑰路徑 (見下方)
"""

from google.cloud import texttospeech
import os
import sys

# 如果有服務帳戶金鑰，取消下面這行註解並設定路徑
# os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = r"C:\path\to\your-key.json"

def generate_speech(script_name):
    """
    為指定的講稿生成 TTS 音檔

    Args:
        script_name: 講稿名稱（不含副檔名），如 'zklora-script'
    """
    # 初始化客戶端
    client = texttospeech.TextToSpeechClient()

    # 讀取講稿
    script_path = os.path.join(os.path.dirname(__file__), f"{script_name}.txt")
    if not os.path.exists(script_path):
        print(f"找不到檔案: {script_path}")
        return False

    with open(script_path, "r", encoding="utf-8") as f:
        text = f.read()

    print(f"正在處理: {script_name}")
    print(f"講稿長度: {len(text)} 字元")

    # Google TTS 有 5000 bytes 限制，中文字佔 3 bytes，需要更小的分段
    # 按段落分割
    paragraphs = text.split("\n\n")

    audio_parts = []
    current_chunk = ""
    chunk_limit = 1500  # 中文約 1500 字 = 4500 bytes

    for para in paragraphs:
        # 檢查 bytes 長度
        if len((current_chunk + para).encode('utf-8')) + 6 < 4500:
            current_chunk += para + "\n\n"
        else:
            if current_chunk:
                audio_parts.append(current_chunk.strip())
            # 如果單一段落就超過限制，需要再分割
            if len(para.encode('utf-8')) > 4500:
                sentences = para.replace('。', '。\n').replace('！', '！\n').replace('？', '？\n').split('\n')
                sub_chunk = ""
                for sent in sentences:
                    if len((sub_chunk + sent).encode('utf-8')) < 4500:
                        sub_chunk += sent
                    else:
                        if sub_chunk:
                            audio_parts.append(sub_chunk.strip())
                        sub_chunk = sent
                if sub_chunk.strip():
                    current_chunk = sub_chunk + "\n\n"
                else:
                    current_chunk = ""
            else:
                current_chunk = para + "\n\n"

    if current_chunk.strip():
        audio_parts.append(current_chunk.strip())

    print(f"講稿分成 {len(audio_parts)} 個段落")

    # 設定語音參數 - 使用台灣中文 WaveNet 語音
    voice = texttospeech.VoiceSelectionParams(
        language_code="cmn-TW",  # 台灣中文
        name="cmn-TW-Wavenet-A",  # WaveNet 女聲
    )

    # 音訊設定
    audio_config = texttospeech.AudioConfig(
        audio_encoding=texttospeech.AudioEncoding.MP3,
        speaking_rate=0.95,  # 稍慢一點 (0.25-4.0)
        pitch=0,  # 音調 (-20 到 20)
    )

    # 生成每個段落的音訊
    all_audio = b""
    for i, chunk in enumerate(audio_parts):
        print(f"處理段落 {i+1}/{len(audio_parts)}...")

        synthesis_input = texttospeech.SynthesisInput(text=chunk)

        response = client.synthesize_speech(
            input=synthesis_input,
            voice=voice,
            audio_config=audio_config
        )

        all_audio += response.audio_content

    # 儲存音檔
    output_path = os.path.join(os.path.dirname(__file__), f"{script_name}.mp3")
    with open(output_path, "wb") as f:
        f.write(all_audio)

    file_size = os.path.getsize(output_path) / (1024 * 1024)
    print(f"完成！音檔已儲存至: {output_path}")
    print(f"檔案大小: {file_size:.2f} MB")
    print()
    return True

def main():
    # 要生成的講稿列表
    scripts = [
        "zklora-script",
        "zkdeepseek-script",
    ]

    # 如果有命令列參數，只處理指定的講稿
    if len(sys.argv) > 1:
        scripts = sys.argv[1:]

    print("=" * 50)
    print("批次 TTS 生成工具")
    print("=" * 50)
    print()

    success_count = 0
    for script in scripts:
        try:
            if generate_speech(script):
                success_count += 1
        except Exception as e:
            print(f"處理 {script} 時發生錯誤: {e}")
            print()

    print("=" * 50)
    print(f"完成！成功生成 {success_count}/{len(scripts)} 個音檔")
    print("=" * 50)

if __name__ == "__main__":
    main()
