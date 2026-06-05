/* global React, window */
const { useState } = React;

function Modal({ children, onClose, wide }) {
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal panel" style={wide ? { width: 'min(560px,94vw)' } : null} onClick={(e) => e.stopPropagation()}>
        <button className="modal-x" onClick={onClose} aria-label="close">✕</button>
        {children}
      </div>
    </div>
  );
}

function CopyField({ value, className }) {
  const [copied, setCopied] = useState(false);
  function copy() {
    navigator.clipboard?.writeText(value).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  }
  return (
    <div className="addr-row">
      <div className={className || 'addr'}>{value}</div>
      <button className="btn btn-gold btn-sm copy-btn" onClick={copy}>{copied ? 'COPIED!' : 'COPY'}</button>
    </div>
  );
}

// ---------- Product card ----------
function ProductModal({ farm, onClose, onOrder }) {
  const { ProductArt } = window.RAWDOG_SCENE;
  const fmt = window.RAWDOG_DATA.fmt;
  const [qty, setQty] = useState(1);
  const total = farm.price * qty;
  return (
    <Modal onClose={onClose} wide>
      <h2>{farm.farm}</h2>
      <div className="sub">{farm.location}</div>
      <div className="product-hero">
        <div className="pic"><ProductArt farm={farm} big /></div>
        <div className="meta">
          <span className="tag">{farm.tag}</span>
          <div className="product-desc">{farm.desc}</div>
        </div>
        {farm.photo && (
          <figure className="farm-photo">
            <img src={farm.photo} alt={farm.location} />
            <figcaption>{farm.location}</figcaption>
          </figure>
        )}
      </div>
      <div className="price-row">
        <div>
          <div className="lbl">{farm.product}</div>
          <div style={{ fontFamily: 'VT323', fontSize: 19, color: 'var(--wood)' }}>per {farm.unit}</div>
        </div>
        <div className="amt"><b>{fmt(farm.price)}</b> $RAWDOG</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
        <div className="lbl" style={{ fontFamily: 'Press Start 2P', fontSize: 9, color: 'var(--wood)' }}>QUANTITY</div>
        <div className="stepper">
          <button onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
          <div className="qty">{qty}</div>
          <button onClick={() => setQty((q) => Math.min(99, q + 1))}>+</button>
        </div>
      </div>
      <div className="total-row">
        <div className="lbl">TOTAL</div>
        <div className="val">{fmt(total)} $RAWDOG</div>
      </div>
      <div className="btn-row">
        <button className="btn btn-ghost" onClick={onClose}>BACK</button>
        <button className="btn btn-green" onClick={() => onOrder(farm, qty)}>ORDER NOW ▸</button>
      </div>
    </Modal>
  );
}

// ---------- Order / deposit flow ----------
function OrderModal({ farm, qty: initialQty, onClose }) {
  const { DEPOSIT_WALLET, ProductArt, fmt } = { ...window.RAWDOG_DATA, ...window.RAWDOG_SCENE };
  const [step, setStep] = useState(1);
  const [qty, setQty] = useState(initialQty);
  const [form, setForm] = useState({ email: '', wallet: '', name: '', address: '', fulfillment: 'ship', notes: '' });
  const [errs, setErrs] = useState({});
  const total = farm.price * qty;
  const orderId = 'RD-' + Math.random().toString(36).slice(2, 7).toUpperCase();

  function set(k, v) { setForm((f) => ({ ...f, [k]: v })); }

  function validate() {
    const e = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (form.wallet.trim().length < 25) e.wallet = 'Paste the wallet you sent from';
    if (!form.name.trim()) e.name = 'Required';
    if (form.fulfillment === 'ship' && form.address.trim().length < 6) e.address = 'Enter a delivery address';
    setErrs(e);
    return Object.keys(e).length === 0;
  }

  return (
    <Modal onClose={onClose} wide>
      <h2>{step < 3 ? 'Place Your Order' : 'Order Received'}</h2>
      <div className="sub">{farm.product} · {farm.farm}</div>
      <div className="steps">
        <div className={'s ' + (step >= 1 ? 'on' : '')} />
        <div className={'s ' + (step >= 2 ? 'on' : '')} />
        <div className={'s ' + (step >= 3 ? 'on' : '')} />
      </div>

      {step === 1 && (
        <div>
          <div className="deposit">
            <span className="lbl">STEP 1 — SEND PAYMENT</span>
            <div style={{ fontFamily: 'VT323', fontSize: 22, marginBottom: 10, color: 'var(--ink-soft)' }}>
              Send exactly <b style={{ color: 'var(--gold-dark)' }}>{fmt(total)} $RAWDOG</b> to the farm wallet below:
            </div>
            <CopyField value={DEPOSIT_WALLET} />
            <div className="warn">⚠ <b>Placeholder address</b> — the live deposit wallet drops at launch. Don't send real funds yet.</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div className="lbl" style={{ fontFamily: 'Press Start 2P', fontSize: 9, color: 'var(--wood)' }}>QUANTITY</div>
            <div className="stepper">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
              <div className="qty">{qty}</div>
              <button onClick={() => setQty((q) => Math.min(99, q + 1))}>+</button>
            </div>
          </div>
          <div className="btn-row">
            <button className="btn btn-ghost" onClick={onClose}>CANCEL</button>
            <button className="btn btn-green" onClick={() => setStep(2)}>I'VE SENT IT ▸</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <p style={{ fontFamily: 'VT323', fontSize: 21, color: 'var(--wood)', marginBottom: 14 }}>
            Step 2 — tell us where to send your goods and which wallet you paid from, so we can match your deposit.
          </p>
          <div className="field-group">
            <label>EMAIL <span className="req">*</span></label>
            <input className={'input' + (errs.email ? ' bad' : '')} type="email" placeholder="you@example.com"
              value={form.email} onChange={(e) => set('email', e.target.value)} />
            {errs.email && <div className="err">{errs.email}</div>}
          </div>
          <div className="field-group">
            <label>WALLET YOU SENT FROM <span className="req">*</span></label>
            <input className={'input' + (errs.wallet ? ' bad' : '')} placeholder="Your Solana address"
              value={form.wallet} onChange={(e) => set('wallet', e.target.value)} />
            {errs.wallet && <div className="err">{errs.wallet}</div>}
          </div>
          <div className="two-col">
            <div className="field-group">
              <label>FULL NAME <span className="req">*</span></label>
              <input className={'input' + (errs.name ? ' bad' : '')} placeholder="Raw Dogger"
                value={form.name} onChange={(e) => set('name', e.target.value)} />
              {errs.name && <div className="err">{errs.name}</div>}
            </div>
            <div className="field-group">
              <label>FULFILLMENT</label>
              <select className="input" value={form.fulfillment} onChange={(e) => set('fulfillment', e.target.value)}>
                <option value="ship">Ship to me</option>
                <option value="pickup">Local farm pickup</option>
              </select>
            </div>
          </div>
          {form.fulfillment === 'ship' && (
            <div className="field-group">
              <label>DELIVERY ADDRESS <span className="req">*</span></label>
              <textarea className={'textarea' + (errs.address ? ' bad' : '')} placeholder="Street, city, state, zip"
                value={form.address} onChange={(e) => set('address', e.target.value)} />
              {errs.address && <div className="err">{errs.address}</div>}
            </div>
          )}
          <div className="field-group">
            <label>NOTES <span style={{ color: 'var(--wood)' }}>(optional)</span></label>
            <textarea className="textarea" placeholder="Allergies, delivery window, hello from the pack…"
              value={form.notes} onChange={(e) => set('notes', e.target.value)} />
          </div>
          <div className="summary">
            <div className="line"><span>{farm.product} × {qty}</span><span>{fmt(total)} $RAWDOG</span></div>
            <div className="line tot"><span>TOTAL</span><b>{fmt(total)}</b></div>
          </div>
          <div className="btn-row">
            <button className="btn btn-ghost" onClick={() => setStep(1)}>◂ BACK</button>
            <button className="btn btn-green" onClick={() => validate() && setStep(3)}>SUBMIT ORDER</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="confirm">
          <div className="coinpop">🪙</div>
          <div className="big">YOU'RE IN THE PACK!</div>
          <p style={{ fontFamily: 'VT323', fontSize: 21, color: 'var(--ink-soft)', lineHeight: 1.3, maxWidth: 380, margin: '0 auto' }}>
            We'll verify your <b>{fmt(total)} $RAWDOG</b> deposit on-chain and email <b>{form.email}</b> once
            {form.fulfillment === 'ship' ? ' your ' : ' your pickup for '} {qty}× {farm.product} from {farm.farm} is confirmed.
          </p>
          <div className="order-id">ORDER {orderId}</div>
          <div className="summary" style={{ textAlign: 'left', marginTop: 14 }}>
            <div className="line"><span>Item</span><span>{farm.product} × {qty}</span></div>
            <div className="line"><span>Farm</span><span>{farm.farm}</span></div>
            <div className="line"><span>Paid from</span><span style={{ fontSize: 15 }}>{form.wallet.slice(0, 10)}…</span></div>
            <div className="line tot"><span>TOTAL</span><b>{fmt(total)}</b></div>
          </div>
          <button className="btn btn-gold" style={{ marginTop: 16, width: '100%' }} onClick={onClose}>BACK TO THE VALLEY</button>
        </div>
      )}
    </Modal>
  );
}

window.RAWDOG_MODALS = { ProductModal, OrderModal, Modal, CopyField };
