import React, { useState } from 'react';
import Chart from '../../components/Chart';

const stocks = [
  { ticker: 'AAPL', name: 'Apple Inc.', price: '$189.42', change: '+1.2%', sector: 'Tech', trend: [170, 175, 172, 180, 185, 189] },
  { ticker: 'MSFT', name: 'Microsoft Corp.', price: '$415.20', change: '+0.8%', sector: 'Tech', trend: [390, 400, 395, 405, 410, 415] },
  { ticker: 'NVDA', name: 'NVIDIA Corp.', price: '$875.30', change: '+3.4%', sector: 'Tech', trend: [700, 740, 780, 820, 850, 875] },
  { ticker: 'TSLA', name: 'Tesla Inc.', price: '$175.10', change: '-1.5%', sector: 'Auto', trend: [195, 190, 185, 178, 180, 175] },
  { ticker: 'VUSA', name: 'Vanguard S&P 500', price: '$94.20', change: '+0.5%', sector: 'ETF', trend: [88, 90, 91, 92, 93, 94] },
  { ticker: 'GOOGL', name: 'Alphabet Inc.', price: '$173.80', change: '+1.1%', sector: 'Tech', trend: [160, 163, 166, 169, 171, 173] },
];

const sectorNews = [
  { sector: 'Technology', headline: 'AI chip demand pushes NVDA to record highs', sentiment: 'Bullish', time: '2h ago' },
  { sector: 'Energy', headline: 'Oil prices stabilise amid Middle East tensions', sentiment: 'Neutral', time: '4h ago' },
  { sector: 'Finance', headline: 'BoE holds rates at 5.25% for Q2', sentiment: 'Neutral', time: '6h ago' },
  { sector: 'Consumer', headline: 'UK retail sales beat expectations in April', sentiment: 'Bullish', time: 'Yesterday' },
  { sector: 'Automotive', headline: 'EV demand slows in European markets', sentiment: 'Bearish', time: 'Yesterday' },
];

const sentimentColor = { Bullish: 'var(--green)', Neutral: 'var(--yellow)', Bearish: 'var(--red)' };

const MarketAnalysis = () => {
  const [selectedStock, setSelectedStock] = useState(stocks[0]);
  const [watchlist, setWatchlist] = useState(['AAPL', 'NVDA']);

  const trendData = selectedStock.trend.map((v, i) => ({ name: `T-${5 - i}`, value: v }));
  const toggleWatchlist = (ticker) => {
    setWatchlist(prev =>
      prev.includes(ticker) ? prev.filter(t => t !== ticker) : [...prev, ticker]
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', height: '100%' }}>
      {/* Header */}
      <div style={{ backgroundColor: 'var(--bg-card)', borderRadius: '12px', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: '700' }}>Market Analysis</h2>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>Live data simulation · 13 May 2026</div>
        </div>
        <div style={{ display: 'flex', gap: '24px' }}>
          {[
            { label: 'FTSE 100', value: '8,412', change: '+0.6%' },
            { label: 'S&P 500', value: '5,234', change: '+0.4%' },
            { label: 'GBP/USD', value: '1.274', change: '-0.1%' },
          ].map(idx => (
            <div key={idx.label} style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{idx.label}</div>
              <div style={{ fontWeight: '700' }}>{idx.value} <span style={{ color: idx.change.startsWith('+') ? 'var(--green)' : 'var(--red)', fontSize: '12px' }}>{idx.change}</span></div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '24px', flex: 1, minHeight: 0 }}>
        {/* Left: Stocks */}
        <div style={{ width: '340px', backgroundColor: 'var(--bg-card)', borderRadius: '12px', padding: '24px', overflowY: 'auto' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '16px' }}>Equities</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {stocks.map(s => (
              <div
                key={s.ticker}
                onClick={() => setSelectedStock(s)}
                style={{
                  padding: '12px 16px', borderRadius: '8px', cursor: 'pointer',
                  backgroundColor: selectedStock.ticker === s.ticker ? 'color-mix(in srgb, var(--teal) 12%, transparent)' : 'var(--bg-card-lt)',
                  border: selectedStock.ticker === s.ticker ? '1px solid var(--teal)' : '1px solid transparent',
                  transition: 'all 0.15s'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: '700' }}>{s.ticker}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{s.name}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: '600' }}>{s.price}</div>
                    <div style={{ fontSize: '12px', color: s.change.startsWith('+') ? 'var(--green)' : 'var(--red)', fontWeight: '600' }}>{s.change}</div>
                  </div>
                  <button
                    onClick={e => { e.stopPropagation(); toggleWatchlist(s.ticker); }}
                    style={{ marginLeft: '12px', color: watchlist.includes(s.ticker) ? 'var(--gold)' : 'var(--text-muted)', fontSize: '18px', lineHeight: 1 }}
                  >
                    ★
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Middle: Chart + Detail */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px', minHeight: 0 }}>
          <div style={{ flex: 1, backgroundColor: 'var(--bg-card)', borderRadius: '12px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <div style={{ fontSize: '22px', fontWeight: '700' }}>{selectedStock.ticker}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{selectedStock.name}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '24px', fontWeight: '700' }}>{selectedStock.price}</div>
                <div style={{ color: selectedStock.change.startsWith('+') ? 'var(--green)' : 'var(--red)', fontWeight: '600' }}>{selectedStock.change} today</div>
              </div>
            </div>
            <Chart type="line" data={trendData} color={selectedStock.change.startsWith('+') ? 'var(--teal)' : 'var(--red)'} />
          </div>

          {/* Watchlist */}
          <div style={{ backgroundColor: 'var(--bg-card)', borderRadius: '12px', padding: '16px 24px' }}>
            <div style={{ fontSize: '13px', fontWeight: '600', marginBottom: '12px', color: 'var(--gold)' }}>★ Watchlist</div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {watchlist.length === 0
                ? <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Click ★ on a stock to add it here.</span>
                : watchlist.map(t => (
                  <div key={t} style={{ backgroundColor: 'color-mix(in srgb, var(--gold) 15%, transparent)', color: 'var(--gold)', padding: '6px 14px', borderRadius: '16px', fontSize: '13px', fontWeight: '600' }}>{t}</div>
                ))}
            </div>
          </div>
        </div>

        {/* Right: Sector News */}
        <div style={{ width: '280px', backgroundColor: 'var(--bg-card)', borderRadius: '12px', padding: '24px', overflowY: 'auto' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '16px' }}>Sector News</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {sectorNews.map((n, i) => (
              <div key={i} style={{ backgroundColor: 'var(--bg-card-lt)', padding: '14px', borderRadius: '8px', borderLeft: `3px solid ${sentimentColor[n.sentiment]}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '10px', fontWeight: '700', color: 'var(--teal)', textTransform: 'uppercase', letterSpacing: '1px' }}>{n.sector}</span>
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{n.time}</span>
                </div>
                <div style={{ fontSize: '12px', fontWeight: '600', marginBottom: '6px' }}>{n.headline}</div>
                <div style={{ fontSize: '10px', color: sentimentColor[n.sentiment], fontWeight: '700' }}>{n.sentiment}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketAnalysis;
