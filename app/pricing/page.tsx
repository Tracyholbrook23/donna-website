import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./pricing.module.css";

export const metadata: Metadata = {
  title: "Signature Pieces & Pricing | Out of Jersey Creations",
  description: "Explore starting prices for custom engraved boards, decanter sets, leather goods, keepsake boxes and tumblers from Out of Jersey Creations.",
};

const pieces = [
  { name: "Cutting & Serving Boards", price: "$55", image: "cutting-boards-family.jpg", alt: "Two engraved acacia paddle boards with family names", description: "Bamboo, rubberwood, American maple or walnut. Add a family name, wedding date or a recipe in Grandma’s handwriting.", tags: ["Wedding", "Housewarming", "Realtor gifts", "Charcuterie"], href: "/shop?collection=cutting-boards", link: "View boards" },
  { name: "Decanters & Whiskey Glasses", price: "$28", image: "prod-whiskey-gift-set-box.jpg", alt: "Engraved whiskey gift set", description: "Single rocks glasses to full four-glass decanter sets, engraved deep enough to catch the light.", tags: ["Gifts for him", "Groomsmen", "Retirement", "Boxed sets"], href: "/shop?collection=decanters-sets", link: "View decanter sets" },
  { name: "Laserette Leather Goods", price: "$18", image: "prod-passport-wallet.jpg", alt: "Engraved leather passport wallet", description: "Keychains, luggage tags, bifold and passport wallets, and journals. Easy to gift and ideal for bulk orders.", tags: ["Stocking stuffers", "Corporate gifts", "Travel", "Father’s Day"], href: "/shop?collection=laserette", link: "View leather" },
  { name: "Memory & Valet Boxes", price: "$40", image: "large-valet-box.jpg", alt: "Large wooden valet box with lid", description: "Keepsake boxes for weddings, new babies, memorials and watch collections, with an engraved lid.", tags: ["Wedding", "Baby keepsake", "Memorial", "Cigar & watch"], href: "/shop?collection=wood-boxes", link: "View boxes" },
  { name: "Everyday Tumblers", price: "$26", image: "bff-tumblers.jpg", alt: "Two friends toasting with engraved tumblers", description: "A curated range from can coolers to 40oz handled tumblers. Engraved to the steel so the design never peels.", tags: ["Birthdays", "Teams & teachers", "Bridal party", "Bulk friendly"], href: "/shop?collection=powder-coated-tumblers", link: "View tumblers" },
];

const groups = [
  { title: "Boards", subtitle: "Kitchen & table", items: [["Bamboo cutting board", "from $55"], ["Rubberwood board with juice groove", "from $65"], ["Maple board · Made in USA", "from $85"], ["Walnut board", "from $95"], ["3-piece heart serving board set", "from $75"], ["11-piece charcuterie set", "from $145"]] },
  { title: "Decanters", subtitle: "Bar & glassware", items: [["8oz engraved rocks glass", "$28 · 2 for $50"], ["650mL triangle or 750mL decanter", "from $75"], ["2-glass decanter set", "from $95"], ["4-glass decanter set", "from $130"], ["Boxed decanter gift set", "from $175"]] },
  { title: "Leather", subtitle: "Laserette goods", items: [["Motel keychain", "from $18"], ["Luggage tag", "$22"], ["Magnetic bottle-opener coaster", "$24"], ["Passport wallet", "from $42"], ["Bifold wallet", "from $45"], ["Journal notebook", "from $48"]] },
  { title: "Boxes", subtitle: "Keepsake & valet", items: [["Medium box", "from $40"], ["Medium valet box", "from $50"], ["Large valet box", "from $65"], ["Large memory box", "from $75"], ["Cigar box", "from $85"], ["XL memory box", "from $95"]] },
  { title: "Tumblers", subtitle: "The short menu", items: [["Universal can cooler", "from $26"], ["12oz wine tumbler", "from $30"], ["20oz skinny tumbler", "from $36"], ["30oz tumbler", "from $40"], ["20oz cooler & cocktail shaker", "from $42"], ["40oz tumbler with handle", "from $45"]] },
  { title: "Add-ons", subtitle: "Make it yours", items: [["Design fee (proof + 2 revisions)", "$20"], ["Your logo or custom artwork", "quoted"], ["Second-side or wraparound engraving", "from $10"], ["Handwriting or signature engraving", "from $15"], ["Rush (under 7 days)", "from $25"]] },
];

export default function PricingPage() {
  return <main className={styles.page}>
    <section className={styles.hero}>
      <div className={`${styles.wrap} ${styles.heroGrid}`}>
        <div>
          <p className={styles.eyebrow}>Signature pieces · Priced to order</p>
          <h1>Five gifts we make <em>better than anyone.</em></h1>
          <p className={styles.heroLede}>After 14,200 engraved pieces, these are the ones people come back for — boards for the kitchen, decanters for the bar, leather for the pocket, boxes for memories, and tumblers for every day. Real starting prices help you plan before you ask.</p>
          <div className={styles.actions}><a className={styles.terraButton} href="#prices">See starting prices</a><Link className={styles.lightOutlineButton} href="/custom">Request a quote</Link></div>
          <div className={styles.stats}><div><b>1,840+</b><span>5-star reviews</span></div><div><b>14,200+</b><span>pieces engraved</span></div><div><b>24 hr</b><span>quote turnaround</span></div></div>
        </div>
        <div className={styles.heroArt}>
          {[["prod-cutting-board-wedding.jpg", "Newlyweds holding an engraved cutting board", "Wedding boards", "from $55"], ["decanter-set-gift.jpg", "Engraved whiskey decanter and glasses", "Decanter sets", "from $95"], ["prod-leather-wallet.jpg", "Engraved leather wallets", "Leather", "from $18"]].map(([src, alt, label, price], i) => <figure className={i === 0 ? styles.tall : ""} key={src}><Image src={`/photos/${src}`} alt={alt} fill sizes="(max-width: 900px) 50vw, 25vw"/><figcaption>{label} <small>{price}</small></figcaption></figure>)}
        </div>
      </div>
    </section>

    <section id="signature" className={styles.section}><div className={styles.wrap}>
      <div className={styles.sectionHead}><div><p className={styles.eyebrow}>The signature five</p><h2>Start here. <em>Everything else</em> is a conversation.</h2></div><p>Each piece is engraved to order, proofed before it’s cut, and shipped gift-ready. These are starting prices; your written quote will confirm the final total.</p></div>
      <div className={styles.pieceGrid}>{pieces.map((piece, i) => <article className={styles.piece} key={piece.name}><div className={styles.pieceImage}><Image src={`/photos/${piece.image}`} alt={piece.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 980px) 50vw, 33vw"/><span className={styles.rank}>{String(i + 1).padStart(2, "0")}</span></div><div className={styles.pieceBody}><div className={styles.pieceTitle}><h3>{piece.name}</h3><div className={styles.from}><small>from</small><b>{piece.price}</b></div></div><p>{piece.description}</p><div className={styles.tags}>{piece.tags.map(tag => <span key={tag}>{tag}</span>)}</div><Link className={styles.textLink} href={piece.href}>{piece.link} →</Link></div></article>)}</div>
    </div></section>

    <section id="prices" className={`${styles.section} ${styles.pricing}`}><div className={styles.wrap}>
      <div className={styles.sectionHead}><div><p className={styles.eyebrow}>Transparent pricing</p><h2>Starting prices, <em>no surprises.</em></h2></div><p>Choose the piece and personalization you want. A digital proof and two revisions are covered by the $20 design fee. Logos, photos, and complex artwork receive a custom quote.</p></div>
      <div className={styles.priceGrid}>{groups.map(group => <div className={styles.priceTable} key={group.title}><h3>{group.title}<small>{group.subtitle}</small></h3><ul>{group.items.map(([name, price]) => <li key={name}><span>{name}</span><b>{price}</b></li>)}</ul></div>)}</div>
      <div className={styles.fine}><div><b>$20 design fee</b><p>Covers your digital proof and two rounds of revisions. Nothing is cut until you approve it.</p></div><div><b>Free US shipping over $125</b><p>Local pickup in Moreno Valley is always free.</p></div><div><b>Quotes in 24 hours</b><p>Share the piece, wording and date you need it.</p></div><div><b>Gift-ready</b><p>Kraft wrap, twine and a handwritten card are included.</p></div></div>
      <p className={styles.disclaimer}>Starting prices reflect standard single-side text engraving on in-stock blanks. Final pricing depends on artwork complexity, quantity and material availability. Prices are subject to change; your written quote is what counts.</p>
    </div></section>

    <section className={styles.section}><div className={`${styles.wrap} ${styles.bulk}`}><div className={styles.bulkImage}><Image src="/photos/keychain-business.jpg" alt="Branded leather keychains for a company" fill sizes="(max-width: 860px) 100vw, 50vw"/></div><div><p className={styles.eyebrow}>Corporate, teams & events</p><h2>Buy in bulk, <em>save on every piece.</em></h2><p className={styles.lede}>Closing gifts, branded glassware, company holiday gifts and wedding favors. One logo setup, one proof, one invoice.</p><ul className={styles.tiers}><li><b>10–24</b><span>pieces, same design</span><strong>Save 10%</strong></li><li><b>25–49</b><span>pieces, same design</span><strong>Save 15%</strong></li><li><b>50+</b><span>pieces — logo setup waived</span><strong>Save 20%</strong></li></ul><div className={styles.actions}><Link className={styles.darkButton} href="/custom">Request a bulk quote</Link><Link className={styles.outlineButton} href="/contact">Ask a question</Link></div></div></div></section>

    <section className={`${styles.section} ${styles.stepsSection}`}><div className={styles.wrap}><p className={styles.eyebrow}>How ordering works</p><h2>From idea to <em>gift-wrapped</em> in four steps.</h2><div className={styles.steps}>{[["Pick a piece", "Choose from the signature five, or send a photo of what you have in mind."], ["Tell us the words", "Names, dates, a quote, a logo or handwriting sample. We’ll send a quote within 24 hours."], ["Approve your proof", "A digital mockup with two rounds of revisions, covered by the $20 design fee."], ["We engrave & ship", "Most single pieces ship in 5–7 business days. Bulk orders are scheduled on approval."]].map(([title, description], i) => <div className={styles.step} key={title}><b>{String(i + 1).padStart(2, "0")}</b><h3>{title}</h3><p>{description}</p></div>)}</div></div></section>

    <section className={`${styles.section} ${styles.maker}`}><div className={`${styles.wrap} ${styles.makerGrid}`}><div className={styles.makerImage}><Image src="/photos/donna-headshot.jpg" alt="Donna, owner of Out of Jersey Creations" fill sizes="(max-width: 860px) 100vw, 40vw"/></div><div><p className={styles.eyebrow}>From the maker</p><blockquote>“I publish my prices because a gift shouldn’t start with a guessing game. Tell me who it’s for — I’ll take it from there.”</blockquote><cite>Donna · Owner & engraver, Out of Jersey Creations · Moreno Valley, California</cite><p>Every order is proofed, engraved and packed by hand in my California studio. Woman owned and operated since day one.</p></div></div></section>

    <section className={`${styles.section} ${styles.cta}`}><div className={styles.wrap}><p className={styles.eyebrow}>Ready when you are</p><h2>Tell me what you’re <em>picturing.</em></h2><p>Share your idea and the date you need it. Donna will reply with a quote.</p><div className={styles.actions}><Link className={styles.darkButton} href="/custom">Start Your Custom Order</Link><a className={styles.outlineButton} href="https://www.instagram.com/outofjerseycreations" target="_blank" rel="noopener noreferrer">See recent work on Instagram</a></div></div></section>
  </main>;
}
