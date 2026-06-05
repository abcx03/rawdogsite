/* global React, ReactDOM, window */
const { useState, useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "golden",
  "ticker": "$RAWDOG"
}/*EDITMODE-END*/;

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.9 2H22l-7.6 8.7L23 22h-6.8l-5-6.5L5.4 22H2.3l8-9.3L1.6 2h6.9l4.5 6 5.9-6Zm-1.2 18h1.9L7.2 4H5.2l12.5 16Z" /></svg>
  );
}

function TopBar({ tab, setTab, ticker }) {
  const { X_URL } = window.RAWDOG_DATA;
  const tabs = [['map', 'FARM MAP'], ['gallery', 'MEME VAULT'], ['buy', 'HOW TO BUY']];
  return (
    <header className="topbar">
      <div className="brand">
        <img className="brand-head" src="doghead.png" alt="" />
        <div className="brand-name">RAW<span className="x">DOG</span></div>
      </div>
      <nav className="nav">
        {tabs.map(([id, label]) => (
          <button key={id} className={'nav-tab' + (tab === id ? ' active' : '')} onClick={() => setTab(id)}>{label}</button>
        ))}
      </nav>
      <div className="topbar-spacer" />
      <div className="topbar-right">
        <div className="ticker-pill"><span className="dot" />{ticker}</div>
        <a className="x-link" href={X_URL} target="_blank" rel="noreferrer" aria-label="X / Twitter"><XIcon /></a>
        <button className="btn btn-gold btn-sm" onClick={() => setTab('buy')} style={{ whiteSpace: 'nowrap' }}>BUY ▸</button>
      </div>
    </header>
  );
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [tab, setTab] = useState('map');
  const [productFarm, setProductFarm] = useState(null);   // ProductModal
  const [order, setOrder] = useState(null);               // {farm, qty} OrderModal

  const { MapScene } = window.RAWDOG_SCENE;
  const { GalleryTab, HowToBuyTab } = window.RAWDOG_TABS;
  const { ProductModal, OrderModal } = window.RAWDOG_MODALS;

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', t.theme || 'golden');
  }, [t.theme]);

  return (
    <div className="shell">
      <TopBar tab={tab} setTab={setTab} ticker={t.ticker} />

      <main className="page">
        {tab === 'map' && (
          <>
            <MapScene onOpen={(f) => setProductFarm(f)} />
            <div className="map-foot">
              <span><span className="coin" /> Walk the valley — <b>click any stall</b> to trade <b>$RAWDOG</b> for real organic goods from local farms.</span>
            </div>
          </>
        )}
        {tab === 'gallery' && <GalleryTab />}
        {tab === 'buy' && <HowToBuyTab />}
      </main>

      {productFarm && (
        <ProductModal
          farm={productFarm}
          onClose={() => setProductFarm(null)}
          onOrder={(farm, qty) => { setProductFarm(null); setOrder({ farm, qty }); }}
        />
      )}
      {order && (
        <OrderModal farm={order.farm} qty={order.qty} onClose={() => setOrder(null)} />
      )}

      <TweaksPanel>
        <TweakSection label="World" />
        <TweakRadio label="Time of day" value={t.theme}
          options={[{ value: 'golden', label: 'Golden' }, { value: 'meadow', label: 'Day' }, { value: 'night', label: 'Night' }]}
          onChange={(v) => setTweak('theme', v)} />
        <TweakSection label="Brand" />
        <TweakText label="Ticker" value={t.ticker} onChange={(v) => setTweak('ticker', v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
