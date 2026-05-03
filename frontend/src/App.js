import React, { useState } from 'react';
import activitiesData from './activities.json';
import './App.css';
import { QRCodeSVG } from 'qrcode.react';

function App() {
  const [ratings, setRatings] = useState({});
  const [notes, setNotes] = useState({});
  const [submittedResults, setSubmittedResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [qrData, setQrData] = useState('');

  const handleRating = (activity, value) => {
    setRatings(prev => ({
      ...prev,
      [activity]: value
    }));
  };

  const handleNoteChange = (activity, value) => {
    setNotes(prev => ({
      ...prev,
      [activity]: value
    }));
  };

  const generateShareText = (results) => {
    const loveActivities = results.filter(r => r.rating === 2).map(r => r.activity);
    const likeActivities = results.filter(r => r.rating === 1).map(r => r.activity);
    const hateActivities = results.filter(r => r.rating === -2).map(r => r.activity);

    let text = '🌟 我的情绪活动评分结果\n\n';

    if (loveActivities.length > 0) {
      text += `😍 最喜欢 (${loveActivities.length}项):\n${loveActivities.join('、')}\n\n`;
    }
    if (likeActivities.length > 0) {
      text += `🙂 喜欢 (${likeActivities.length}项):\n${likeActivities.join('、')}\n\n`;
    }
    if (hateActivities.length > 0) {
      text += `😡 不喜欢 (${hateActivities.length}项):\n${hateActivities.join('、')}\n\n`;
    }

    text += `📊 共评分 ${results.filter(r => r.rating !== 0).length} 项活动\n`;
    text += '📝 来自：情绪活动打分小程序';

    return text;
  };

  const handleSubmit = async () => {
    setLoading(true);

    // 转换为数组结构
    const resultArray = activitiesData.map(activity => ({
      activity,
      rating: ratings[activity] ?? 0,
      note: notes[activity] ?? ''
    }));

    // 按评分从高到低排序（最喜欢 → 最不喜欢）
    const sortedResults = [...resultArray].sort(
      (a, b) => b.rating - a.rating
    );

    // 模拟 AI 分析（占位）
    await new Promise(res => setTimeout(res, 1000));

    // 生成分享文本用于二维码
    const shareText = generateShareText(sortedResults);
    setQrData(shareText);
    setShowQRCode(false);

    setSubmittedResults(sortedResults);
    setLoading(false);
  };

  const ratingLabels = {
    2: '😍 很喜欢',
    1: '🙂 喜欢',
    0: '😐 一般',
    '-1': '🙁 不喜欢',
    '-2': '😡 讨厌'
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>情绪活动打分</h1>
        <p>请根据你对每项活动的感受进行评分</p>
      </header>

      <main>
        <h2>活动列表（-2 讨厌 → +2 很喜欢）</h2>

        {activitiesData.map(activity => (
          <div key={activity} className="activity-card">
            <h3>{activity}</h3>

            <div className="rating-buttons">
  <button
    className={ratings[activity] === -2 ? "rating-btn selected hate" : "rating-btn"}
    onClick={() => handleRating(activity, -2)}
  >
    😡 讨厌
  </button>

  <button
    className={ratings[activity] === -1 ? "rating-btn selected dislike" : "rating-btn"}
    onClick={() => handleRating(activity, -1)}
  >
    🙁 不喜欢
  </button>

  <button
    className={ratings[activity] === 0 ? "rating-btn selected neutral" : "rating-btn"}
    onClick={() => handleRating(activity, 0)}
  >
    😐 一般
  </button>

  <button
    className={ratings[activity] === 1 ? "rating-btn selected like" : "rating-btn"}
    onClick={() => handleRating(activity, 1)}
  >
    🙂 喜欢
  </button>

  <button
    className={ratings[activity] === 2 ? "rating-btn selected love" : "rating-btn"}
    onClick={() => handleRating(activity, 2)}
  >
    😍 很喜欢
  </button>
</div>


            <input
              type="text"
              placeholder="可选备注（例如：为什么这样打分）"
              value={notes[activity] || ''}
              onChange={e =>
                handleNoteChange(activity, e.target.value)
              }
            />
          </div>
        ))}

        <button className="submit-btn" onClick={handleSubmit}>
          {loading ? '正在分析中...' : '提交并查看排序结果'}
        </button>

        {submittedResults.length > 0 && (
          <section className="results-section">
            <h2>结果（按 喜欢 → 不喜欢 排序）</h2>

            {submittedResults.map(item => (
              <div key={item.activity} className="result-row">
                <strong>{item.activity}</strong>
                <span>
                  ：{ratingLabels[item.rating]}
                </span>
                {item.note && (
                  <div className="note">
                    备注：{item.note}
                  </div>
                )}
              </div>
            ))}

            <div className="qr-section">
              <button
                className="qr-toggle-btn"
                onClick={() => setShowQRCode(!showQRCode)}
              >
                {showQRCode ? '隐藏二维码' : '📱 生成分享二维码'}
              </button>

              {showQRCode && (
                <div className="qr-display">
                  <p className="qr-hint">截图保存或分享给朋友</p>
                  <QRCodeSVG
                    value={qrData}
                    size={200}
                    level="M"
                    includeMargin={true}
                    imageSettings={{
                      src: '',
                      height: 24,
                      width: 24,
                      excavate: true,
                    }}
                  />
                  <pre className="qr-text-preview">{qrData}</pre>
                </div>
              )}
            </div>
          </section>
        )}
      </main>

      <footer className="app-footer">
        <p>数据仅保存在本地浏览器</p>
      </footer>
    </div>
  );
}

export default App;
