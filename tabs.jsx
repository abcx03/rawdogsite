/* global React, window */

// ---------- Meme Gallery ----------
function GalleryTab() {
  // span: 1 | 2 | 'full'  ·  ar = true aspect ratio so cover shows the whole image
  const memes = [
    { src: 'hero.jpg', cap: 'FEED RAW. LIVE STRONG.', span: 2, ar: '3 / 2' },
    { src: 'mascot.png', cap: 'HE LIFTS. RAW ONLY.', span: 1, ar: '1 / 1' },
    { src: 'raw-comic.jpg', cap: 'STRONG DOGS EAT RAW.', span: 2, ar: '1280 / 1024' },
    { src: 'poster-pack.jpg', cap: 'CHOOSE YOUR PATH.', span: 2, ar: '1280 / 1024' },
    { src: 'banner.png', cap: 'THE FULL RAW MENU.', span: 'full', ar: '1280 / 426' },
  ];
  const spanCss = (s) => (s === 'full' ? '1 / -1' : s === 2 ? 'span 2' : 'auto');
  return (
    <div className="tab-page">
      <div className="tab-head">
        <h1>MEME VAULT</h1>
        <p>Pixel propaganda from the pack. Right-click, save, post, repeat.</p>
      </div>
      <div className="gallery-grid">
        {memes.map((m, i) => (
          <div className="frame" key={i} style={{ gridColumn: spanCss(m.span) }}>
            <div className="img" style={{ aspectRatio: m.ar }}><img src={m.src} alt={m.cap} /></div>
            <div className="cap">{m.cap}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- How To Buy ----------
function HowToBuyTab() {
  const { CONTRACT_ADDR, PUMP_URL } = window.RAWDOG_DATA;
  const { CopyField } = window.RAWDOG_MODALS;
  const steps = [
    { t: 'GET A SOLANA WALLET', b: <>Install <a href="#" onClick={(e) => e.preventDefault()}>Phantom</a> or Solflare on your phone or browser. Guard your seed phrase like raw liver — never share it.</> },
    { t: 'FUND IT WITH SOL', b: <>Buy SOL on any exchange and send it to your wallet address. A little goes a long way; keep some spare for gas.</> },
    { t: 'OPEN PUMP.FUN', b: <>Head to pump.fun and paste the official $RAWDOG contract address below. Always double-check it matches — beware of imposters.</> },
    { t: 'SWAP SOL → $RAWDOG', b: <>Enter how much SOL to spend, confirm the swap, and the muscle hits your wallet. Welcome to the pack.</> },
    { t: 'SPEND IT AT THE FARMS', b: <>Head back to the Farm Map, pick a stall, and trade $RAWDOG for real organic goods from local farms. Eat raw. Live strong.</> },
  ];
  return (
    <div className="tab-page">
      <div className="tab-head">
        <h1>HOW TO BUY</h1>
        <p>Five-step quest from zero to fully raw-fueled.</p>
      </div>
      <div className="quest-list">
        {steps.map((s, i) => (
          <div className="quest panel" key={i}>
            <div className="num">{i + 1}</div>
            <div className="qbody">
              <h3>{s.t}</h3>
              <p>{s.b}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="ca-box panel">
        <div className="lbl">$RAWDOG CONTRACT ADDRESS</div>
        <div className="ca">{CONTRACT_ADDR}</div>
        <div className="pump">
          <a className="btn btn-green" href={PUMP_URL} onClick={(e) => PUMP_URL === '#' && e.preventDefault()}>BUY ON PUMP.FUN ▸</a>
        </div>
        <p style={{ fontFamily: 'VT323', fontSize: 18, color: 'var(--wood)', marginTop: 12 }}>
          Token not launched yet — address goes live on launch day. Follow <a href="https://x.com/RawDogFun" target="_blank" rel="noreferrer" style={{ color: 'var(--gold-dark)' }}>@RawDogFun</a> for the drop.
        </p>
      </div>

      <div className="stat-strip">
        <div className="stat"><span className="heart">♥</span> STRENGTH
          <span className="bar">{Array.from({ length: 8 }).map((_, i) => <i key={i} className={i < 7 ? 'on-r' : ''} />)}</span></div>
        <div className="stat">ENERGY
          <span className="bar">{Array.from({ length: 8 }).map((_, i) => <i key={i} className={i < 6 ? 'on-g' : ''} />)}</span></div>
        <div className="stat">HEALTH
          <span className="bar">{Array.from({ length: 8 }).map((_, i) => <i key={i} className={i < 8 ? 'on-h' : ''} />)}</span></div>
      </div>
    </div>
  );
}

window.RAWDOG_TABS = { GalleryTab, HowToBuyTab };
