import { useState } from 'react'
import chroma from 'chroma-js'
import { colorMixtures } from "./colorMixtures";
import './App.css'

function App() {
  const presetColors = [
    { name: '赤', color: '#FF0000'},
    { name: 'ピンク', color: '#FFC0CB' },
    { name: '青', color: '#0000FF' },
    { name: '水色', color: '#00FFFF' },
    { name: 'オレンジ', color: '#FFA500' },
    { name: '黄', color: '#FFFF00' },
    { name: '緑', color: '#00FF00' },
    { name: '黄緑', color: '#B2D235'},
    { name: '紫', color: '#8B52A1' },
    { name: '茶色', color: '#864A2B' },
    { name: '灰色', color: '#717375' },
    { name: '白', color: '#FFFFFB' },
    { name: '黒', color: '#00001C' },
  ]

  const [selectedColors, setSelectedColors] = useState([])
  const [ratio, setRatio] = useState(0.5)

  // カラーコードから色名を取得する関数
  const getPresetColorName = (colorCode) => {
    const preset = presetColors.find(p => p.color.toUpperCase() === colorCode.toUpperCase());
    return preset ? preset.name : colorCode;
  };

  // 色の名前を生成する関数
  const getMixedColorName = (color1, color2, ratio) => {
    const name1 = getPresetColorName(color1);  // getColorName → getPresetColorName
    const name2 = getPresetColorName(color2);  // getColorName → getPresetColorName

    // 混合色のキーを作成
    const mixKey = `${name1}-${name2}`;

    // 具体的な混合色があるかチェック
    if (colorMixtures[mixKey]) {
      return colorMixtures[mixKey];
    }

    // 定義されていない組み合わせの場合はデフォルト
    return `${name1}と${name2}の混合色`;
  };

  // 色を選択する関数
  const selectColor = (color) => {
    if ( selectedColors.length < 2 ) {
      setSelectedColors([...selectedColors, color])
    }
  }

  // 選択をリセットする関数
  const resetSelection = () => {
    setSelectedColors([])
  }

  // 色配合関数
  const mixTwoColors = (color1, color2, ratio) => {
    const hex1 = color1.replace('#','');
    const hex2 = color2.replace('#','');

    const r1 = parseInt(hex1.substr(0,2), 16);
    const g1 = parseInt(hex1.substr(2, 2), 16);
    const b1 = parseInt(hex1.substr(4, 2), 16);

    const r2 = parseInt(hex2.substr(0, 2), 16);
    const g2 = parseInt(hex2.substr(2, 2), 16);
    const b2 = parseInt(hex2.substr(4, 2), 16);

    const r = Math.round(r1 * (1 - ratio) + r2 * ratio);
    const g = Math.round(g1 * (1 - ratio) + g2 * ratio);
    const b = Math.round(b1 * (1 - ratio) + b2 * ratio);

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }

  // 配合結果を計算 2色選んでなければデフォルトは白
  const mixedColor = selectedColors.length === 2
    ? mixTwoColors(selectedColors[0], selectedColors[1], ratio)
    : '#FFFFFF'

  // 混合色の名前を計算
  const mixedColorName = selectedColors.length === 2
    ? getMixedColorName(selectedColors[0], selectedColors[1], ratio)
    : ''

  return (
    <div className="App">
      <h1>🎨 何色になるかな？？</h1>

      {/* プリセット色選択 */}
      <div className="preset-colors">
        <h2>🖍️ 色を選んでね（2色）</h2>
        <div className="color-grid">
          {presetColors.map((preset, index) => (
            <button
              key={index}
              className="color-button"
              style={{ backgroundColor: preset.color }}
              onClick={() => selectColor(preset.color)}
              disabled={selectedColors.length >= 2}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* 選択された色の表示 */}
    <div className="main-content">
      <div className="selected-colors">
        <h3>選んだ色</h3>
        <div className="selected-display">
          {selectedColors.map((color, index) => (
            <div key={index} className="selected-color">
              <div
                className="color-preview"
                style={{ backgroundColor: color }}
              ></div>
              <p className="color-name">{getPresetColorName(color)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 結果表示 */}
      {selectedColors.length === 2 && (
        <div className="result">
          <h2> 🎨 どんな色かな </h2>
          <div
            className="mixed-color"
            style={{ backgroundColor: mixedColor }}
          ></div>
          <p className="result-name">{mixedColorName}</p>
        </div>
      )}
    </div>
    <button onClick={resetSelection} className="reset-button">
      リセット
    </button>
  </div>
  )
}

export default App