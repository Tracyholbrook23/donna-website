// ─────────────────────────────────────────────
// Donna's — Custom Orders, About, Contact, Policies
// ─────────────────────────────────────────────

// ═══════════════════════════════════════════════
// CUSTOM ORDERS
// ═══════════════════════════════════════════════
function CustomPage() {
  window.useReveal();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: '',
    occasion: '',
    deadline: '',
    budget: '',
    description: '',
    name: '',
    email: '',
    phone: '',
    contact: 'email',
  });
  const [submitted, setSubmitted] = useState(false);

  const update = (k, v) => setFormData((d) => ({ ...d, [k]: v }));

  const types = [
    { id: 'corporate', label: 'Corporate / Bulk gifting', desc: '10+ matching pieces, branded or monogrammed.' },
    { id: 'wedding',   label: 'Wedding party set',       desc: 'Bridesmaids, groomsmen, parents, favors.' },
    { id: 'family',    label: 'Family heirloom',         desc: 'One-off piece. Family tree, crest, custom artwork.' },
    { id: 'logo',      label: 'Logo or brand engraving', desc: 'Your business mark on tumblers, boards, leather.' },
    { id: 'sketch',    label: 'From a sketch',            desc: 'You draw it, I engrave it. Kids\' art, signatures, handwriting.' },
    { id: 'other',     label: 'Something else',          desc: 'Describe it in the brief. Donna replies within 24 hours.' },
  ];

  return (
    <main className="page-enter">
      {/* HERO */}
      <Section padding="60px 0 40px">
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 60, alignItems: 'end' }} className="custom-hero">
          <div className="reveal">
            <Eyebrow>By commission</Eyebrow>
            <h1 className="display" style={{ fontSize: 'clamp(56px, 8vw, 120px)', margin: '20px 0 24px', fontWeight: 400 }}>
              Tell me what you&rsquo;re <em style={{ fontStyle: 'italic', color: 'var(--terracotta)' }}>picturing.</em>
            </h1>
            <p style={{ fontSize: 18, color: 'var(--muted)', lineHeight: 1.6, maxWidth: 540 }}>
              Single pieces, family heirlooms, wedding sets, corporate gifts, or something only you can describe. Briefs go straight to me. Quotes within 24 hours.
            </p>
          </div>
          <div className="reveal reveal-delay-1" style={{ position: 'relative' }}>
            <image-slot id="custom-hero" style={{ width: '100%', aspectRatio: '4/5', display: 'block' }} shape="rounded" radius="20" placeholder="Custom commission — engraved family tree board" src="https://images.unsplash.com/photo-1576020799627-aeac74d58064?w=700&q=80"></image-slot>
            <div style={{
              position: 'absolute', bottom: 16, left: 16,
              background: 'var(--cream)', padding: '12px 18px',
              borderRadius: 'var(--r-pill)', boxShadow: 'var(--shadow-md)',
              fontSize: 12, fontFamily: 'var(--font-display)', fontStyle: 'italic',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--forest)' }} />
              Currently accepting commissions through March 2026
            </div>
          </div>
        </div>
      </Section>

      {/* HOW IT WORKS */}
      <Section padding="80px 0">
        <div className="reveal" style={{ marginBottom: 56 }}>
          <Eyebrow>How it works</Eyebrow>
          <h2 className="display" style={{ fontSize: 'clamp(40px, 5vw, 64px)', margin: '12px 0 0', fontWeight: 400 }}>
            From brief to delivery, in <em style={{ fontStyle: 'italic', color: 'var(--terracotta)' }}>four steps.</em>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }} className="process-grid">
          {[
            { n: '01', t: 'Brief', d: 'Use the form below or email. Include the gift, the recipient, the deadline, and any imagery you want incorporated.', time: '5 min · you' },
            { n: '02', t: 'Quote', d: 'Within 24 hours I send a quote, a recommended material, and a realistic timeline. 50% deposit reserves your studio slot.', time: '24 hrs · Donna' },
            { n: '03', t: 'Proof', d: 'I sketch the engraving and send a digital proof. Two rounds of revisions included. I won\'t engrave until you sign off.', time: '48–72 hrs · together' },
            { n: '04', t: 'Engrave', d: 'I cut the piece, photograph it, ship it gift-ready in kraft and twine, with a hand-written card.', time: '1–3 wks · studio' },
          ].map((s) => (
            <div key={s.n} className="reveal" style={{
              background: 'var(--cream)', padding: 28,
              border: '1px solid var(--line)', borderRadius: 'var(--r-md)',
              position: 'relative',
            }}>
              <span className="display" style={{ fontSize: 56, color: 'var(--terracotta)', fontWeight: 400, fontStyle: 'italic', lineHeight: 1 }}>{s.n}</span>
              <h3 className="serif" style={{ fontSize: 22, margin: '16px 0 8px' }}>{s.t}</h3>
              <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6, margin: 0, marginBottom: 16 }}>{s.d}</p>
              <p style={{ fontSize: 11, color: 'var(--muted-soft)', letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>{s.time}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* GALLERY */}
      <Section bg="var(--cream-2)" padding="100px 0">
        <div className="reveal" style={{ marginBottom: 48, display: 'flex', justifyContent: 'space-between', alignItems: 'end', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <Eyebrow>Past commissions</Eyebrow>
            <h2 className="display" style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', margin: '12px 0 0', fontWeight: 400 }}>
              Pieces from the studio.
            </h2>
          </div>
          <p style={{ fontSize: 14, color: 'var(--muted)', fontStyle: 'italic', fontFamily: 'var(--font-display)', maxWidth: 360 }}>
            A small sample. With customer permission, of course.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gridAutoRows: '200px', gap: 16 }} className="gallery-grid">
          {[
            { id: 'cg-1', cap: 'Family tree board · Whitfield family · walnut · 2024', span: 'col 1 / span 5; row 1 / span 2', src: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=900&q=80' },
            { id: 'cg-2', cap: 'Wedding flute set · Sydney & Marcus · 24 pieces', span: 'col 6 / span 4; row 1 / span 1', src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=700&q=80' },
            { id: 'cg-3', cap: 'Corporate set · The Lawson Group · 80 tumblers', span: 'col 10 / span 3; row 1 / span 1', src: 'https://images.unsplash.com/photo-1592919505780-303950717480?w=600&q=80' },
            { id: 'cg-4', cap: 'Anniversary box · with first dance lyrics', span: 'col 6 / span 3; row 2 / span 1', src: 'https://images.unsplash.com/photo-1602773106960-ad7a85e8d6c4?w=600&q=80' },
            { id: 'cg-5', cap: "Father's Day decanter · monogram + birth date", span: 'col 9 / span 4; row 2 / span 1', src: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=700&q=80' },
            { id: 'cg-6', cap: "Logo set · Cierra's Boutique · 40 wallets", span: 'col 1 / span 4; row 3 / span 1', src: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80' },
            { id: 'cg-7', cap: "Kid's art engraved · daughter's drawing on dad's box", span: 'col 5 / span 3; row 3 / span 1', src: 'https://images.unsplash.com/photo-1574871786514-46e2cf28a4f7?w=500&q=80' },
            { id: 'cg-8', cap: 'Bridal party tumblers · matching monograms · 6 pieces', span: 'col 8 / span 5; row 3 / span 1', src: 'https://images.unsplash.com/photo-1591290619762-c5dac3a8347a?w=900&q=80' },
          ].map((g) => (
            <div key={g.id} className="reveal" style={{
              gridArea: g.span, borderRadius: 'var(--r-sm)', overflow: 'hidden',
              position: 'relative', cursor: 'pointer',
            }}>
              <image-slot id={g.id} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} shape="rect" src={g.src} placeholder={g.cap}></image-slot>
              <div style={{
                position: 'absolute', inset: 0, padding: 16,
                background: 'linear-gradient(180deg, transparent 50%, rgba(31,20,16,0.75) 100%)',
                display: 'flex', alignItems: 'flex-end',
              }}>
                <p style={{ color: 'var(--cream)', fontSize: 12, fontFamily: 'var(--font-display)', fontStyle: 'italic', margin: 0, lineHeight: 1.4 }}>
                  {g.cap}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* INQUIRY FORM */}
      <Section padding="100px 0 60px">
        <div style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: 80, alignItems: 'start' }} className="form-grid">
          <div className="reveal" style={{ position: 'sticky', top: 100 }}>
            <Eyebrow>Send a brief</Eyebrow>
            <h2 className="display" style={{ fontSize: 'clamp(40px, 5vw, 64px)', margin: '12px 0 24px', fontWeight: 400 }}>
              Walk me through your idea.
            </h2>
            <p style={{ fontSize: 16, color: 'var(--muted)', lineHeight: 1.6 }}>
              Don&rsquo;t overthink it. Even a rough idea is enough — I&rsquo;ll come back with options.
            </p>

            <div style={{ marginTop: 40, padding: '24px 0', borderTop: '1px solid var(--line)' }}>
              <p className="eyebrow" style={{ marginBottom: 12 }}>Or reach me directly</p>
              <a href="mailto:custom@donnas.co" style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 22, fontStyle: 'italic', color: 'var(--ink)', textDecoration: 'none', marginBottom: 6 }}>
                custom@donnas.co
              </a>
              <a href="#" style={{ display: 'block', fontSize: 13, color: 'var(--muted)', textDecoration: 'none' }}>DM @donnaandco on Instagram</a>
              <a href="#" style={{ display: 'block', fontSize: 13, color: 'var(--muted)', textDecoration: 'none' }}>WhatsApp · +1 (704) 555-0177</a>
            </div>
          </div>

          <div className="reveal reveal-delay-1" style={{
            background: 'var(--cream)',
            border: '1px solid var(--line)',
            borderRadius: 'var(--r-lg)',
            padding: 40,
          }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div className="display-italic" style={{ fontSize: 80, color: 'var(--terracotta)', margin: 0, lineHeight: 1 }}>✦</div>
                <h3 className="display" style={{ fontSize: 36, margin: '20px 0 12px', fontWeight: 400 }}>Brief received.</h3>
                <p style={{ color: 'var(--muted)', maxWidth: 360, margin: '0 auto', fontSize: 15, lineHeight: 1.6 }}>
                  You&rsquo;ll hear from me within 24 hours — usually faster. In the meantime, here&rsquo;s some reading on how commissions work.
                </p>
                <Link to="/policies/custom" className="btn btn-secondary" style={{ marginTop: 32 }}>Custom order policy</Link>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                {/* Step indicator */}
                <div style={{ display: 'flex', gap: 6, marginBottom: 32 }}>
                  {[1,2,3].map((s) => (
                    <div key={s} style={{ flex: 1, height: 4, borderRadius: 2, background: s <= step ? 'var(--ink)' : 'var(--cream-3)' }} />
                  ))}
                </div>

                {step === 1 && (
                  <div>
                    <p className="eyebrow" style={{ marginBottom: 6 }}>Step 01 of 03</p>
                    <h3 className="serif" style={{ fontSize: 24, margin: '0 0 24px' }}>What are you commissioning?</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                      {types.map((t) => (
                        <button key={t.id} type="button" onClick={() => update('type', t.id)} style={{
                          textAlign: 'left', padding: 18,
                          background: formData.type === t.id ? 'var(--ink)' : 'var(--cream)',
                          color: formData.type === t.id ? 'var(--cream)' : 'var(--ink)',
                          border: '1px solid ' + (formData.type === t.id ? 'var(--ink)' : 'var(--line)'),
                          borderRadius: 'var(--r-sm)', cursor: 'pointer',
                        }}>
                          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{t.label}</div>
                          <div style={{ fontSize: 12, opacity: 0.75, lineHeight: 1.5 }}>{t.desc}</div>
                        </button>
                      ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 32 }}>
                      <button type="button" disabled={!formData.type} onClick={() => setStep(2)} className="btn btn-primary" style={{ opacity: formData.type ? 1 : 0.5 }}>
                        Continue <ArrowIcon size={14} />
                      </button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <p className="eyebrow" style={{ marginBottom: 6 }}>Step 02 of 03</p>
                    <h3 className="serif" style={{ fontSize: 24, margin: '0 0 24px' }}>The details.</h3>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                      <div>
                        <label className="field-label">Occasion</label>
                        <select className="field" value={formData.occasion} onChange={(e) => update('occasion', e.target.value)}>
                          <option value="">Choose…</option>
                          <option>Wedding</option><option>Anniversary</option><option>Birthday</option>
                          <option>Graduation</option><option>Father's Day</option><option>Mother's Day</option>
                          <option>Corporate / branding</option><option>Just because</option>
                        </select>
                      </div>
                      <div>
                        <label className="field-label">When do you need it?</label>
                        <input type="date" className="field" value={formData.deadline} onChange={(e) => update('deadline', e.target.value)} />
                      </div>
                    </div>

                    <div style={{ marginBottom: 16 }}>
                      <label className="field-label">Budget (rough is fine)</label>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        {['Under $100', '$100–$300', '$300–$700', '$700–$1500', '$1500+', 'Open / advise me'].map((b) => (
                          <button key={b} type="button" onClick={() => update('budget', b)} style={{
                            padding: '10px 16px', fontSize: 13,
                            borderRadius: 'var(--r-pill)',
                            background: formData.budget === b ? 'var(--ink)' : 'transparent',
                            color: formData.budget === b ? 'var(--cream)' : 'var(--ink)',
                            border: '1px solid ' + (formData.budget === b ? 'var(--ink)' : 'var(--line)'),
                            cursor: 'pointer',
                          }}>{b}</button>
                        ))}
                      </div>
                    </div>

                    <div style={{ marginBottom: 16 }}>
                      <label className="field-label">Describe the piece, recipient, and what you want engraved</label>
                      <textarea
                        className="field"
                        value={formData.description}
                        onChange={(e) => update('description', e.target.value)}
                        placeholder="The more detail, the better. Names, dates, materials you love, references, sketches…"
                        style={{ minHeight: 160, resize: 'vertical', fontFamily: 'var(--font-body)' }}
                      />
                    </div>

                    <div style={{
                      background: 'var(--cream-2)', borderRadius: 'var(--r-sm)',
                      padding: 16, display: 'flex', gap: 14, alignItems: 'center',
                    }}>
                      <span style={{ fontSize: 22 }}>📎</span>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 500 }}>Have an image, sketch, or logo?</div>
                        <div style={{ fontSize: 12, color: 'var(--muted)' }}>Drop files here, or attach in the email I&rsquo;ll send you to confirm.</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32 }}>
                      <button type="button" onClick={() => setStep(1)} className="btn btn-ghost">← Back</button>
                      <button type="button" onClick={() => setStep(3)} className="btn btn-primary">Continue <ArrowIcon size={14} /></button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <p className="eyebrow" style={{ marginBottom: 6 }}>Step 03 of 03</p>
                    <h3 className="serif" style={{ fontSize: 24, margin: '0 0 24px' }}>How should I reach you?</h3>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                      <div>
                        <label className="field-label">Name</label>
                        <input className="field" value={formData.name} onChange={(e) => update('name', e.target.value)} placeholder="Your name" />
                      </div>
                      <div>
                        <label className="field-label">Email</label>
                        <input className="field" type="email" value={formData.email} onChange={(e) => update('email', e.target.value)} placeholder="you@email.com" />
                      </div>
                    </div>

                    <div style={{ marginBottom: 16 }}>
                      <label className="field-label">Phone (optional)</label>
                      <input className="field" value={formData.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+1 (___) ___-____" />
                    </div>

                    <div style={{ marginBottom: 24 }}>
                      <label className="field-label">Preferred contact</label>
                      <div style={{ display: 'flex', gap: 8 }}>
                        {['email', 'phone', 'instagram', 'whatsapp'].map((c) => (
                          <button key={c} type="button" onClick={() => update('contact', c)} style={{
                            flex: 1, padding: '12px',
                            fontSize: 13, textTransform: 'capitalize',
                            background: formData.contact === c ? 'var(--ink)' : 'transparent',
                            color: formData.contact === c ? 'var(--cream)' : 'var(--ink)',
                            border: '1px solid ' + (formData.contact === c ? 'var(--ink)' : 'var(--line)'),
                            borderRadius: 'var(--r-sm)', cursor: 'pointer',
                          }}>{c}</button>
                        ))}
                      </div>
                    </div>

                    <p style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6, marginBottom: 24 }}>
                      I respond within 24 hours, usually faster. By submitting, you agree to our <Link to="/policies/custom" style={{ borderBottom: '1px solid currentColor', color: 'inherit' }}>custom order policy</Link>.
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <button type="button" onClick={() => setStep(2)} className="btn btn-ghost">← Back</button>
                      <button type="submit" className="btn btn-primary">Send the brief <ArrowIcon size={14} /></button>
                    </div>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </Section>

      {/* QUICK FAQ */}
      <Section bg="var(--cream-2)" padding="80px 0">
        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 60 }} className="custom-faq">
          <div>
            <Eyebrow>Common questions</Eyebrow>
            <h2 className="display" style={{ fontSize: 'clamp(32px, 4vw, 48px)', margin: '12px 0 24px', fontWeight: 400 }}>Quick answers before you write.</h2>
            <Link to="/policies/faq" className="btn btn-secondary">All FAQ →</Link>
          </div>
          <div>
            {window.DONNA.faqs.slice(0, 4).map((f, i) => <FaqRow key={i} q={f.q} a={f.a} />)}
          </div>
        </div>
      </Section>
    </main>
  );
}

function FaqRow({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderTop: '1px solid var(--line)' }}>
      <button onClick={() => setOpen((v) => !v)} style={{
        width: '100%', background: 'none', border: 0, cursor: 'pointer',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '24px 0', textAlign: 'left', color: 'var(--ink)',
      }}>
        <span className="serif" style={{ fontSize: 19, fontWeight: 500 }}>{q}</span>
        <span style={{ fontSize: 20, transform: open ? 'rotate(45deg)' : 'none', transition: 'transform .3s var(--ease)', flexShrink: 0, marginLeft: 16 }}>+</span>
      </button>
      <div style={{
        overflow: 'hidden',
        maxHeight: open ? 400 : 0,
        opacity: open ? 1 : 0,
        transition: 'max-height .4s var(--ease-out), opacity .3s var(--ease)',
      }}>
        <p style={{ fontSize: 15, color: 'var(--ink-soft)', lineHeight: 1.7, margin: 0, paddingBottom: 24, maxWidth: 700 }}>
          {a}
        </p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════
// ABOUT
// ═══════════════════════════════════════════════
function AboutPage() {
  window.useReveal();
  return (
    <main className="page-enter">
      {/* HERO */}
      <Section padding="60px 0 60px">
        <div className="reveal" style={{ textAlign: 'center', maxWidth: 980, margin: '0 auto' }}>
          <Eyebrow>About Donna &amp; Co.</Eyebrow>
          <h1 className="display" style={{ fontSize: 'clamp(56px, 8vw, 132px)', margin: '20px 0 24px', fontWeight: 400 }}>
            A studio built by <em style={{ fontStyle: 'italic', color: 'var(--terracotta)' }}>one woman</em>,
            <br />
            for the people you love.
          </h1>
        </div>

        <div className="reveal reveal-delay-1" style={{ marginTop: 64 }}>
          <image-slot id="about-hero" style={{ width: '100%', aspectRatio: '21/9', display: 'block' }} shape="rounded" radius="24" placeholder="Donna in the studio · wide editorial shot" src="https://images.unsplash.com/photo-1521498542256-5aeb47ba2b36?w=1400&q=80"></image-slot>
        </div>
      </Section>

      {/* THE LETTER */}
      <Section padding="60px 0 100px">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 80, alignItems: 'start' }} className="letter-grid">
          <div className="reveal" style={{ position: 'sticky', top: 100 }}>
            <p className="eyebrow" style={{ marginBottom: 16 }}>A letter from Donna</p>
            <p className="display-italic" style={{ fontSize: 80, lineHeight: 0.9, color: 'var(--terracotta)', margin: 0 }}>“</p>
            <p style={{ fontSize: 14, color: 'var(--muted)', fontFamily: 'var(--font-display)', fontStyle: 'italic', marginTop: 24 }}>
              — Donna Whitfield, founder &amp; engraver
            </p>
            <div style={{ marginTop: 32, padding: '20px 0', borderTop: '1px solid var(--line)' }}>
              <Stat label="Year founded" value="2020" />
            </div>
            <div style={{ padding: '20px 0', borderTop: '1px solid var(--line)' }}>
              <Stat label="Pieces engraved" value="14,200+" />
            </div>
            <div style={{ padding: '20px 0', borderTop: '1px solid var(--line)' }}>
              <Stat label="Studio" value="Charlotte, NC" />
            </div>
          </div>
          <div className="reveal reveal-delay-1">
            <div style={{ fontSize: 19, lineHeight: 1.75, color: 'var(--ink-soft)', fontFamily: 'var(--font-body)' }}>
              <p style={{ marginTop: 0 }}>
                The first piece I ever engraved was a walnut box for my baby sister Jasmine&rsquo;s high school graduation. I bought a small laser engraver off a Black-woman maker in Atlanta, watched her run through three boards with me on a Saturday, and brought it home that night.
              </p>
              <p>
                I burned three boards in two weeks figuring out feed rates. The fourth one was the box. It said <em style={{ color: 'var(--terracotta)' }}>Jasmine · May 2020</em> and on the underside I etched a single line my grandmother used to say to us before bed.
              </p>
              <p>
                She still has it. So do the next forty people who saw it on Instagram and asked me to make them one too.
              </p>
              <p>
                <strong style={{ color: 'var(--ink)' }}>Donna &amp; Co. exists for a simple reason:</strong> a gift with your name on it is different. A gift made by a person who knows what your mom calls you, what your grandfather used to drive, what your wedding date is, the lyrics of the song you danced to — that gift outlasts the holiday it was given for.
              </p>
              <p>
                The studio is bigger now. Two engravers I trained personally — Maya and Renee — work alongside me. We ship pieces to all 50 states and ten countries. Some weeks we engrave eighty pieces, some weeks we engrave eight. Every single one of them passes through my hands or theirs.
              </p>
              <p>
                I&rsquo;m a Black woman who built something for the people I came from and the people I&rsquo;ve met since. I am proud of every piece that leaves the studio.
              </p>
              <p>
                I hope your gift is here for a long time.
              </p>
              <p className="display-italic" style={{ fontSize: 36, color: 'var(--ink)', margin: '32px 0 0', lineHeight: 1 }}>— Donna</p>
            </div>
          </div>
        </div>
      </Section>

      {/* VALUES */}
      <Section bg="var(--ink)" padding="120px 0" style={{ color: 'var(--cream)' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 64 }}>
          <Eyebrow style={{ color: 'var(--brass-light)' }}>What we believe</Eyebrow>
          <h2 className="display" style={{ fontSize: 'clamp(40px, 5vw, 72px)', margin: '20px auto 0', fontWeight: 400, maxWidth: 880 }}>
            Six things we&rsquo;ll never compromise on.
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.08)' }} className="values-grid">
          {[
            { n: '01', t: 'The maker matters.', d: 'Every piece is engraved by Donna, Maya, or Renee. Their initials live on the bottom — you know who made yours.' },
            { n: '02', t: 'Slow is the speed.', d: 'We cap how many orders I take a week so each one gets full attention. Sometimes that means waitlists. Sometimes that means saying no.' },
            { n: '03', t: 'The community owns this.', d: 'A portion of every order funds engraver apprenticeships for Black women — three new makers trained so far.' },
            { n: '04', t: 'Local before global.', d: 'Walnut from the Carolinas, leather from Tennessee, glass from Pennsylvania, packaging from a recycler in Atlanta. Small chains, on purpose.' },
            { n: '05', t: 'Honest pricing.', d: 'No fake sales, no urgency timers. Materials cost what they cost. My time is worth what it&rsquo;s worth. The price you see is the price.' },
            { n: '06', t: 'Heirloom over hype.', d: 'I&rsquo;d rather make one thing you keep for thirty years than ten things you replace in three.' },
          ].map((v) => (
            <div key={v.n} className="reveal" style={{ background: 'var(--ink)', padding: 40 }}>
              <span style={{ fontSize: 11, color: 'var(--brass)', fontWeight: 600, letterSpacing: '0.16em' }}>{v.n}</span>
              <h3 className="display" style={{ fontSize: 28, margin: '16px 0 12px', fontWeight: 400 }}>{v.t}</h3>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, margin: 0 }}>{v.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* THE TEAM */}
      <Section padding="120px 0">
        <div className="reveal" style={{ marginBottom: 56 }}>
          <Eyebrow>The studio</Eyebrow>
          <h2 className="display" style={{ fontSize: 'clamp(40px, 5vw, 72px)', margin: '20px 0 0', fontWeight: 400 }}>
            Three women, one bench, every piece.
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }} className="team-grid">
          {[
            { id: 't-donna',  name: 'Donna Whitfield', role: 'Founder · lead engraver · custom commissions', bio: 'Started the studio in 2020. Trained on a borrowed engraver in her sister&rsquo;s garage. Now runs intake, design, and every custom commission. Charlotte, NC.', img: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&q=80' },
            { id: 't-maya',   name: 'Maya R.',          role: 'Engraver · weddings &amp; corporate sets',         bio: 'Joined in 2022. Specializes in bulk and bridal sets. Has engraved 4,000+ tumblers without a single typo (she insists I include that detail).', img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80' },
            { id: 't-renee',  name: 'Renee J.',         role: 'Engraver · boards &amp; leather',                   bio: 'Joined in 2024. Runs the woodshop side. Picks every walnut blank by hand. Has strong opinions about leather grain.',                          img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80' },
          ].map((t) => (
            <div key={t.id} className="reveal">
              <image-slot id={t.id} style={{ width: '100%', aspectRatio: '4/5', display: 'block' }} shape="rounded" radius="16" placeholder={t.name + ' — studio portrait'} src={t.img}></image-slot>
              <h3 className="display" style={{ fontSize: 28, margin: '20px 0 4px', fontWeight: 400 }}>{t.name}</h3>
              <p style={{ fontSize: 13, color: 'var(--terracotta)', fontWeight: 500, margin: 0, letterSpacing: '0.03em' }} dangerouslySetInnerHTML={{ __html: t.role }} />
              <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.6, marginTop: 12 }} dangerouslySetInnerHTML={{ __html: t.bio }} />
            </div>
          ))}
        </div>
      </Section>

      {/* PRESS */}
      <Section bg="var(--cream-2)" padding="80px 0">
        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 60, alignItems: 'center' }} className="press-grid">
          <div>
            <Eyebrow>Press &amp; stockists</Eyebrow>
            <h3 className="display" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', margin: '12px 0 0', fontWeight: 400 }}>Seen here.</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, alignItems: 'center' }}>
            {['Essence', 'Black Enterprise', 'House Beautiful', 'Apartment Therapy', 'Refinery29', 'Goop', 'The Cut', 'Domino'].map((p) => (
              <span key={p} className="display-italic" style={{ fontSize: 22, color: 'var(--muted)', textAlign: 'center', fontWeight: 400 }}>{p}</span>
            ))}
          </div>
        </div>
      </Section>
    </main>
  );
}

// ═══════════════════════════════════════════════
// CONTACT
// ═══════════════════════════════════════════════
function ContactPage() {
  window.useReveal();
  const [sent, setSent] = useState(false);

  return (
    <main className="page-enter">
      <Section padding="60px 0 40px">
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 60, alignItems: 'end' }} className="contact-hero">
          <div className="reveal">
            <Eyebrow>Say hello</Eyebrow>
            <h1 className="display" style={{ fontSize: 'clamp(56px, 8vw, 120px)', margin: '20px 0 24px', fontWeight: 400 }}>
              Let&rsquo;s <em style={{ fontStyle: 'italic', color: 'var(--terracotta)' }}>talk.</em>
            </h1>
            <p style={{ fontSize: 18, color: 'var(--muted)', lineHeight: 1.6, maxWidth: 540 }}>
              For orders, custom briefs, press, wholesale, or just to say hi — pick the channel that&rsquo;s easiest. I answer within 24 hours, often faster.
            </p>
          </div>
        </div>
      </Section>

      <Section padding="40px 0 80px">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 64 }} className="contact-tiles">
          {[
            { t: 'Email', v: 'hello@donnas.co', sub: 'For everything', icon: '✉', accent: 'var(--terracotta)' },
            { t: 'Instagram DM', v: '@donnaandco', sub: 'Fastest reply', icon: '◉', accent: 'var(--brass)' },
            { t: 'WhatsApp', v: '+1 (704) 555-0177', sub: 'Mon–Fri · 9–5 EST', icon: '✱', accent: 'var(--forest)' },
            { t: 'Custom orders', v: 'custom@donnas.co', sub: 'Direct line to Donna', icon: '✦', accent: 'var(--terracotta)' },
            { t: 'Press', v: 'press@donnas.co', sub: 'Media kit on request', icon: '⊕', accent: 'var(--brass)' },
            { t: 'Wholesale', v: 'wholesale@donnas.co', sub: 'Stockists, partnerships', icon: '◆', accent: 'var(--forest)' },
          ].map((c) => (
            <a key={c.t} href="#" className="reveal" style={{
              background: 'var(--cream)', border: '1px solid var(--line)',
              borderRadius: 'var(--r-md)', padding: 24, textDecoration: 'none', color: 'var(--ink)',
              display: 'flex', gap: 16, alignItems: 'flex-start',
              transition: 'transform .35s var(--ease-out), box-shadow .35s var(--ease-out)',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
            >
              <span style={{
                width: 44, height: 44, borderRadius: 'var(--r-sm)',
                background: c.accent, color: 'var(--cream)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18,
              }}>{c.icon}</span>
              <div>
                <p className="eyebrow" style={{ color: c.accent, marginBottom: 4, fontSize: 10 }}>{c.t}</p>
                <div className="serif" style={{ fontSize: 18, fontWeight: 500 }}>{c.v}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{c.sub}</div>
              </div>
            </a>
          ))}
        </div>

        {/* Form */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }} className="contact-form-grid">
          <div className="reveal">
            <Eyebrow>Or write a note</Eyebrow>
            <h2 className="display" style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', margin: '12px 0 24px', fontWeight: 400 }}>
              Use the form if it&rsquo;s easier.
            </h2>
            <p style={{ fontSize: 16, color: 'var(--muted)', lineHeight: 1.6, maxWidth: 460 }}>
              For order issues, include your order number. For custom commissions, the <Link to="/custom" style={{ color: 'var(--terracotta)', borderBottom: '1px solid currentColor' }}>custom request form</Link> works better.
            </p>

            <div style={{ marginTop: 48, padding: 24, background: 'var(--cream-2)', borderRadius: 'var(--r-md)' }}>
              <p className="eyebrow" style={{ marginBottom: 12 }}>Studio location</p>
              <p className="serif" style={{ fontSize: 18, margin: 0, fontWeight: 500 }}>
                2204 Camden Rd, Studio 4<br />
                Charlotte, NC 28203
              </p>
              <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 12 }}>
                <strong style={{ color: 'var(--ink)' }}>Mon–Fri</strong> · 9:00–5:00 EST<br />
                <strong style={{ color: 'var(--ink)' }}>Sat</strong> · 10:00–2:00 by appointment<br />
                Visits welcome — email first.
              </p>
            </div>
          </div>

          <div className="reveal reveal-delay-1" style={{ background: 'var(--cream)', border: '1px solid var(--line)', borderRadius: 'var(--r-lg)', padding: 40 }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div className="display-italic" style={{ fontSize: 80, color: 'var(--terracotta)', margin: 0, lineHeight: 1 }}>✦</div>
                <h3 className="display" style={{ fontSize: 32, margin: '20px 0 12px', fontWeight: 400 }}>Got it.</h3>
                <p style={{ color: 'var(--muted)', maxWidth: 360, margin: '0 auto', fontSize: 15, lineHeight: 1.6 }}>
                  Reply incoming within 24 hours. Thank you for writing.
                </p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                  <div>
                    <label className="field-label">Name</label>
                    <input className="field" placeholder="Your name" required />
                  </div>
                  <div>
                    <label className="field-label">Email</label>
                    <input className="field" type="email" placeholder="you@email.com" required />
                  </div>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label className="field-label">What's this about?</label>
                  <select className="field">
                    <option>An order I placed</option>
                    <option>A custom commission</option>
                    <option>Wholesale / stockists</option>
                    <option>Press / media</option>
                    <option>Just saying hi</option>
                  </select>
                </div>
                <div style={{ marginBottom: 24 }}>
                  <label className="field-label">Your message</label>
                  <textarea className="field" rows="6" placeholder="Tell me what you need…" required style={{ resize: 'vertical' }} />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  Send the note <ArrowIcon size={14} />
                </button>
              </form>
            )}
          </div>
        </div>
      </Section>
    </main>
  );
}

// ═══════════════════════════════════════════════
// POLICIES
// ═══════════════════════════════════════════════
function PoliciesPage({ tab = 'shipping' }) {
  window.useReveal();
  const { navigate } = useRouter();
  const tabs = [
    ...window.DONNA.policies.map((p) => ({ id: p.id, label: p.title })),
    { id: 'faq', label: 'FAQ' },
  ];

  return (
    <main className="page-enter">
      <Section padding="60px 0 40px">
        <div className="reveal">
          <Eyebrow>Policies</Eyebrow>
          <h1 className="display" style={{ fontSize: 'clamp(56px, 8vw, 116px)', margin: '20px 0 24px', fontWeight: 400 }}>
            The <em style={{ fontStyle: 'italic', color: 'var(--terracotta)' }}>fine print,&nbsp;</em>
            in plain words.
          </h1>
          <p style={{ fontSize: 17, color: 'var(--muted)', lineHeight: 1.6, maxWidth: 620 }}>
            Shipping, returns, custom orders, frequently asked. Read what you need, skip the rest. If something&rsquo;s missing, email me.
          </p>
        </div>
      </Section>

      <Section padding="20px 0 100px">
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 80, alignItems: 'start' }} className="policy-grid">
          <aside style={{ position: 'sticky', top: 100 }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {tabs.map((t) => (
                <li key={t.id}>
                  <button onClick={() => navigate(`/policies/${t.id}`)} style={{
                    width: '100%', textAlign: 'left',
                    background: tab === t.id ? 'var(--ink)' : 'transparent',
                    color: tab === t.id ? 'var(--cream)' : 'var(--ink)',
                    border: '1px solid ' + (tab === t.id ? 'var(--ink)' : 'var(--line)'),
                    borderRadius: 'var(--r-sm)',
                    padding: '14px 16px',
                    marginBottom: 8,
                    cursor: 'pointer', fontSize: 14, fontWeight: 500,
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  }}>
                    <span>{t.label}</span>
                    {tab === t.id && <ArrowIcon size={14} />}
                  </button>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: 32, padding: 20, background: 'var(--cream-2)', borderRadius: 'var(--r-sm)' }}>
              <p className="eyebrow" style={{ marginBottom: 8 }}>Still stuck?</p>
              <p style={{ fontSize: 13, color: 'var(--muted)', margin: '0 0 14px', lineHeight: 1.6 }}>
                Email <a href="mailto:hello@donnas.co" style={{ color: 'var(--terracotta)' }}>hello@donnas.co</a> — answers within 24 hours.
              </p>
              <Link to="/contact" className="btn btn-secondary" style={{ fontSize: 12, padding: '10px 16px' }}>Contact →</Link>
            </div>
          </aside>

          <article className="reveal">
            {tab === 'faq' ? (
              <div>
                <h2 className="display" style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', margin: '0 0 16px', fontWeight: 400 }}>
                  Frequently asked.
                </h2>
                <p style={{ fontSize: 16, color: 'var(--muted)', marginBottom: 40 }}>
                  Most answers people need before reaching out.
                </p>
                <div>
                  {window.DONNA.faqs.map((f, i) => <FaqRow key={i} q={f.q} a={f.a} />)}
                </div>
              </div>
            ) : (
              <PolicySection p={window.DONNA.policies.find((x) => x.id === tab) || window.DONNA.policies[0]} />
            )}
          </article>
        </div>
      </Section>
    </main>
  );
}

function PolicySection({ p }) {
  return (
    <div>
      <h2 className="display" style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', margin: '0 0 16px', fontWeight: 400 }}>{p.title}</h2>
      <p style={{ fontSize: 16, color: 'var(--muted)', marginBottom: 40 }}>{p.intro}</p>
      <div style={{ borderTop: '1px solid var(--line)' }}>
        {p.sections.map((s, i) => (
          <div key={i} style={{ padding: '32px 0', borderBottom: '1px solid var(--line-soft)' }}>
            <h3 className="serif" style={{ fontSize: 22, margin: '0 0 12px' }}>{s.h}</h3>
            <p style={{ fontSize: 16, color: 'var(--ink-soft)', lineHeight: 1.75, margin: 0, maxWidth: 720 }}>{s.p}</p>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 48, padding: 28, background: 'var(--cream-2)', borderRadius: 'var(--r-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <div>
          <p className="eyebrow" style={{ marginBottom: 6 }}>Question not answered?</p>
          <p style={{ fontSize: 15, margin: 0 }}>Reach out — I&rsquo;ll get you a real human answer.</p>
        </div>
        <Link to="/contact" className="btn btn-primary">Contact us</Link>
      </div>
    </div>
  );
}

Object.assign(window, { CustomPage, AboutPage, ContactPage, PoliciesPage });
