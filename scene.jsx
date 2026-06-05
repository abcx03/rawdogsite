/* global React, window */
const { useRef, useEffect, useState } = React;

// ---------- Pixel egg sprite (eggs have no photo asset) ----------
function EggSprite() {
  return (
    <div style={{ position: 'relative', width: 72, height: 58 }}>
      {/* nest */}
      <div style={{ position: 'absolute', left: 6, bottom: 2, width: 60, height: 22,
        background: 'repeating-linear-gradient(90deg,#a9772f 0 4px,#8a5f22 4px 7px)',
        border: '3px solid #2a1d12', borderRadius: '0 0 40% 40%' }} />
      {/* egg 1 */}
      <div style={{ position: 'absolute', left: 12, bottom: 12, width: 26, height: 34,
        background: 'radial-gradient(circle at 35% 30%, #fffdf6 0 40%, #f0e3c8 60%, #ddc9a4 100%)',
        border: '3px solid #2a1d12', borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%' }} />
      {/* egg 2 */}
      <div style={{ position: 'absolute', left: 32, bottom: 10, width: 28, height: 37,
        background: 'radial-gradient(circle at 35% 28%, #fffdf6 0 40%, #efe1c4 60%, #d6c099 100%)',
        border: '3px solid #2a1d12', borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%' }} />
      {/* speck */}
      <div style={{ position: 'absolute', left: 40, bottom: 26, width: 4, height: 4, background: '#b98a4a' }} />
    </div>
  );
}

function ProductArt({ farm, big }) {
  if (farm.id === 'eggs') {
    return (
      <div style={{ transform: big ? 'scale(1.55)' : 'scale(0.9)' }}>
        <EggSprite />
      </div>
    );
  }
  return <img src={farm.sprite} alt={farm.product} />;
}

// ---------- Decorations ----------
function Tree({ x, y, s = 1, crown = '#4a8a3a' }) {
  return (
    <div className="deco tree" style={{ left: x + '%', top: y + '%', transform: `scale(${s})`, '--tree-crown': crown }}>
      <div className="crown" />
      <div className="trunk" />
    </div>
  );
}
function Pine({ x, y, s = 1 }) {
  return (
    <div className="deco" style={{ left: x + '%', top: y + '%', transform: `scale(${s})` }}>
      <div style={{ width: 0, height: 0, borderLeft: '17px solid transparent', borderRight: '17px solid transparent', borderBottom: '30px solid #2e4a30', margin: '0 auto' }} />
      <div style={{ width: 0, height: 0, borderLeft: '22px solid transparent', borderRight: '22px solid transparent', borderBottom: '34px solid #355a3a', marginTop: -14 }} />
      <div style={{ width: 10, height: 12, background: '#5a3a1f', border: '2px solid #2a1d12', margin: '-2px auto 0' }} />
    </div>
  );
}
function Pond({ x, y, w = 130, h = 80 }) {
  return (
    <div className="deco pond" style={{ left: x + '%', top: y + '%', width: w, height: h }}>
      <div className="shine" />
    </div>
  );
}
function Fence({ x, y, posts = 4, s = 1 }) {
  return (
    <div className="deco fence" style={{ left: x + '%', top: y + '%', transform: `scale(${s})` }}>
      {Array.from({ length: posts }).map((_, i) => <div className="post" key={i} />)}
    </div>
  );
}
function Crops({ x, y, rows = 5, color = '#3f8f3a' }) {
  return (
    <div className="deco crops" style={{ left: x + '%', top: y + '%', '--crop': color }}>
      {Array.from({ length: rows }).map((_, i) => <div className="row" key={i} />)}
    </div>
  );
}
function Hay({ x, y }) { return <div className="deco hay" style={{ left: x + '%', top: y + '%' }} />; }
function Flower({ x, y, c }) { return <div className="deco flower" style={{ left: x + '%', top: y + '%', '--fc': c }} />; }
function Bush({ x, y, crown = '#3f8f3a' }) { return <div className="deco bush" style={{ left: x + '%', top: y + '%', '--tree-crown': crown }} />; }

// ---------- Stall ----------
function Stall({ farm, onOpen }) {
  return (
    <div className="stall" style={{ left: farm.x + '%', top: farm.y + '%', transform: `translate(-50%,-100%) scale(${farm.scale})` }}
      onClick={() => onOpen(farm)} role="button" tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpen(farm)}>
      <div className="clickcue">CLICK TO TRADE</div>
      <div className="stall-inner" style={{ '--awn': farm.awn, '--awn2': farm.awn2 }}>
        <div className="stall-name">{farm.product}</div>
        <div className="stall-price">{window.RAWDOG_DATA.fmt(farm.price)} <b>$RAWDOG</b></div>
        <div className="awning"><div className="scallop" /></div>
        <div className="posts">
          <div className="post-l" />
          <div className="product-board"><ProductArt farm={farm} /></div>
          <div className="post-r" />
          <div className="counter" />
        </div>
      </div>
      <div className="stall-base" />
    </div>
  );
}

// ---------- Welcome billboard (mascot portrait on a park board) ----------
function Billboard() {
  return (
    <div className="billboard" style={{ left: '50%', top: '33%', transform: 'translate(-50%,0)' }}>
      <div className="bb-header">RAWDOG VALLEY</div>
      <div className="bb-frame">
        <img src="mascot.png" alt="RAWDOG mascot" />
        <div className="bb-plate">EST. RAW · POP. 1 GOOD BOY</div>
      </div>
      <div className="bb-posts"><span /><span /></div>
      <div className="mascot-base" />
    </div>
  );
}

// ---------- Road ----------
function Road() {
  return (
    <svg className="road-svg" viewBox="0 0 1280 760" preserveAspectRatio="none">
      <path d="M620 760 C 600 660, 760 640, 770 560 C 778 500, 470 500, 460 430 C 452 380, 690 372, 700 320 C 706 300, 660 295, 640 290"
        fill="none" stroke="var(--road-dark)" strokeWidth="58" strokeLinecap="round" />
      <path d="M620 760 C 600 660, 760 640, 770 560 C 778 500, 470 500, 460 430 C 452 380, 690 372, 700 320 C 706 300, 660 295, 640 290"
        fill="none" stroke="var(--road)" strokeWidth="46" strokeLinecap="round" />
      <path d="M620 760 C 600 660, 760 640, 770 560 C 778 500, 470 500, 460 430 C 452 380, 690 372, 700 320 C 706 300, 660 295, 640 290"
        fill="none" stroke="var(--road-line)" strokeWidth="5" strokeLinecap="round" strokeDasharray="2 26" opacity="0.8" />
    </svg>
  );
}

// ---------- Scene ----------
function MapScene({ onOpen }) {
  const { FARMS } = window.RAWDOG_DATA;
  const scalerRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    function fit() {
      const el = scalerRef.current;
      if (!el) return;
      const w = el.clientWidth;
      const s = w / 1280;
      setScale(s);
    }
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  // stars for night
  const stars = Array.from({ length: 60 }).map((_, i) => ({
    left: (i * 137.5) % 100, top: (i * 53.3) % 100, d: (i % 5) * 0.4,
  }));
  const clouds = [
    { x: 14, y: 12, s: 1 }, { x: 64, y: 8, s: 1.3 }, { x: 40, y: 20, s: 0.8 }, { x: 86, y: 16, s: 1 },
  ];

  return (
    <div className="map-wrap">
      <div className="stage-scaler" ref={scalerRef} style={{ height: 760 * scale }}>
        <div className="stage" style={{ transform: `scale(${scale})` }}>
          {/* sky */}
          <div className="sky" />
          <div className="stars">
            {stars.map((s, i) => <div className="star" key={i} style={{ left: s.left + '%', top: s.top + '%', animationDelay: s.d + 's' }} />)}
          </div>
          <div className="sun" />
          {clouds.map((c, i) => (
            <div className="cloud" key={i} style={{ left: c.x + '%', top: c.y + '%', width: 30 * c.s, height: 12 * c.s,
              animation: `drift ${40 + i * 8}s linear infinite`, animationDelay: `${-i * 6}s` }} />
          ))}
          <div className="valley-headline">
            Buy real, raw, organic ingredients from real farms with <b>$RAWDOG</b>
          </div>
          {/* horizon */}
          <div className="mtns">
            <div className="mtn-layer mtn-far" />
            <div className="mtn-layer mtn-near" />
          </div>
          <div className="treeline">
            {Array.from({ length: 44 }).map((_, i) => <div className="pine" key={i} style={{ height: 0, marginBottom: (i % 3) * 4 }} />)}
          </div>

          {/* field */}
          <div className="field" />
          <Road />

          {/* back-row decorations */}
          <Pine x={8} y={44} s={0.9} />
          <Pine x={90} y={43} s={1.1} />
          <Tree x={5} y={62} s={0.9} crown="#3f7a34" />
          <Tree x={92} y={60} s={1} crown="#4a8a3a" />
          <Pond x={6} y={84} w={150} h={70} />
          <Pond x={78} y={90} w={140} h={64} />
          <Crops x={26} y={86} rows={6} color="#cf9a3a" />
          <Crops x={66} y={88} rows={6} color="#4a9a40" />
          <Fence x={42} y={64} posts={3} s={0.9} />
          <Hay x={14} y={56} />
          <Hay x={84} y={70} />
          <Bush x={46} y={86} />
          <Bush x={56} y={84} crown="#4a8a3a" />
          <Tree x={70} y={48} s={0.7} crown="#3f7a34" />
          <Tree x={28} y={47} s={0.7} crown="#4a8a3a" />
          {[[18, 92, '#e85d75'], [30, 94, '#f0c43a'], [70, 95, '#e85d75'], [60, 92, '#c879e0'], [88, 80, '#f0c43a'], [10, 74, '#e85d75']].map((f, i) =>
            <Flower key={i} x={f[0]} y={f[1]} c={f[2]} />)}

          {/* welcome billboard in plaza */}
          <Billboard />

          {/* stalls */}
          {FARMS.map((f) => <Stall key={f.id} farm={f} onOpen={onOpen} />)}
        </div>
      </div>
    </div>
  );
}

window.RAWDOG_SCENE = { MapScene, ProductArt, EggSprite };
