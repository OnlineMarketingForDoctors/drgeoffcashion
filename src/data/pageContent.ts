/**
 * Seed data only: the page sections below are rendered from Sanity (see
 * src/sanity/queries.ts), and `npm run sanity:seed` exports them from here.
 * Edit the live content in the Studio, not in this file.
 *
 * Images are named by file in src/assets/generated/; the export turns each
 * into an uploaded Sanity image. `focus` is the hotspot, as fractions of the
 * width and height (what the old CSS object-position said).
 */

import { states } from "./locations.ts";
import { publications } from "./publications.ts";

export interface SeedImage {
  _seed: "image";
  file: string;
  alt: string;
  focus?: [x: number, y: number];
}

export interface SeedFile {
  _seed: "file";
  file: string;
}

/** A Portable Text paragraph list; `*word*` marks italics, `[text](url)` a link. */
export interface SeedRich {
  _seed: "rich";
  paragraphs: string[];
}

const img = (file: string, alt: string, focus?: [number, number]): SeedImage => ({
  _seed: "image",
  file,
  alt,
  focus,
});
const rich = (...paragraphs: string[]): SeedRich => ({ _seed: "rich", paragraphs });

/** Hero images for every page, keyed by slug. */
export const heroImages: Record<string, SeedImage> = {
  home: img("cashion-hero.webp", "Dr Geoff Cashion in navy scrubs in a consulting room"),
  about: img("cashion-desk.webp", "Dr Geoff Cashion at his desk in a consulting room", [0.7, 0.5]),
  vasectomy: img(
    "vasectomy-hero.webp",
    "A clinical procedure room with a stainless steel instrument trolley",
    [0.62, 0.5]
  ),
  research: img("journals.webp", "A stack of medical journals on a desk under a reading lamp", [0.65, 0.5]),
  contact: img("reception.webp", "An empty medical practice reception area in morning light", [0.6, 0.5]),
  refer: img("referral-desk.webp", "A referral letter and fountain pen on a doctor's desk", [0.6, 0.5]),
  "thank-you-refer": img(
    "referral-desk.webp",
    "A referral letter and fountain pen on a doctor's desk",
    [0.6, 0.5]
  ),
  "thank-you-contact": img(
    "reception.webp",
    "An empty medical practice reception area in morning light",
    [0.6, 0.5]
  ),
  sitemap: img("corridor.webp", "A calm, daylit medical suite corridor"),
};

export const offerImage = img("orchidometer.png", "A Prader orchidometer laid out on a surgical drape");

const drape = () => img("drape-texture.webp", "Close-up texture of a green surgical drape");

// ------------------------------------------------------------------ home
export const home = {
  heroImageMobile: img("cashion-hero-mobile.webp", "Dr Geoff Cashion in navy scrubs in a consulting room"),
  heroPrimary: { label: "Refer a patient", href: "/refer/" },
  heroSecondary: { label: "What your patient's day looks like", href: "#experience" },
  specs: [
    { figure: "25,000+", label: "Procedures performed" },
    { figure: "~3,500", label: "Every year" },
    { figure: "5–8 min", label: "Typical procedure" },
    { figure: "Under $600", label: "Out of pocket" },
    { figure: "24 hrs", label: "Post-procedure support" },
  ],
  volume: {
    background: drape(),
    eyebrow: "The case for sending him here",
    heading: "Nobody in the country has done this more times.",
    lede: "Dr Cashion trained in the United States under one of the world's leading vasectomists, learning the no-scalpel technique in the place it was refined. He has since performed over 25,000 procedures — and he is now one of Australia's busiest vasectomists, performing over 3,500 vasectomies per year.",
    body: "For a referring GP that number is not vanity. It is the reason the procedure takes five to eight minutes, the reason complications are rare, and the reason your patient tends to come back to you surprised at how little there was to it.",
  },
  about: {
    image: img("cashion-portrait.webp", "Studio portrait of Dr Geoff Cashion"),
    caption: "Dr Geoff Cashion · Specialist GP · AHPRA",
    eyebrow: "About",
    heading: "Trained in the United States, under one of the world's leading vasectomists.",
    body: rich(
      "I underwent expert training in the US under one of the world's leading vasectomists, learning the no-scalpel vasectomy technique to provide the best surgical procedure for those looking for a permanent means of birth control.",
      "I am also passionate about helping solo GPs and small practices reach their potential, in both career enjoyment and income."
    ),
    quote:
      "I look forward to partnering with you and your patients, helping them to achieve their family planning goals.",
    quoteCite: "Dr Geoffrey Cashion · AHPRA reg.",
  },
  why: {
    eyebrow: "Why GPs refer here",
    heading: "Six reasons, and none of them are marketing.",
    image: img("cashion-corridor.webp", "Dr Geoff Cashion standing in a clinic corridor"),
    reasons: [
      {
        lead: "He performs more vasectomies each year than any other doctor in Australia.",
        body: "Volume is the closest thing this procedure has to a proxy for competence. Roughly 3,500 a year, over 25,000 across his career.",
      },
      {
        lead: "No scalpel, and no stitches.",
        body: "A single small opening made with a ring-tipped fixation forceps rather than a blade, which is why the recovery your patient reports back is measured in days, not weeks.",
      },
      {
        lead: "Your patient drives himself home.",
        body: "Local anaesthetic only. No sedation, no general, no need to arrange a driver or a carer.",
      },
      {
        lead: "Support runs 24 hours a day afterwards.",
        body: "If something worries him at 11pm on a Saturday, he calls us — not you, and not the emergency department.",
      },
      {
        lead: "Under $600 out of pocket.",
        body: "A figure you can quote in the consult without hedging.",
      },
      {
        lead: "The patient comes back to you.",
        body: "We handle the procedure and the follow-up semen analysis, then he returns to your care. We are not trying to become his GP.",
      },
    ],
  },
  sequence: {
    eyebrow: "Your patient's day",
    heading: "What you are actually sending him into.",
    steps: [
      {
        when: "Day 0",
        title: "You send the referral.",
        body: "A standard referral by email or post. Our rooms contact him directly to book — you are not chasing anyone, and neither is he.",
        image: img("referral-desk.webp", "A referral letter and fountain pen on a doctor's desk"),
      },
      {
        when: "Before",
        title: "He arrives knowing what happens.",
        body: "Written instructions, reminders and an explainer video go out ahead of the appointment. Most of the anxiety in this procedure is about the unknown, so we remove the unknown.",
        image: img("corridor.webp", "A calm, daylit medical suite corridor"),
      },
      {
        when: "5–8 min",
        title: "No scalpel, no stitches.",
        body: "Local anaesthetic, then a single small opening made with a ring-tipped forceps rather than a blade. He is awake, and it is over in the time it takes to park the car.",
        image: img(
          "instruments.webp",
          "Ring-tipped fixation forceps and dissecting forceps on a surgical drape"
        ),
      },
      {
        when: "Same hour",
        title: "He drives himself home.",
        body: "No sedation and no general anaesthetic means no carer to arrange and no afternoon written off. Several patients have mentioned going out for dinner the same night.",
        image: img("procedure-room.webp", "An empty procedure room in morning light"),
      },
      {
        when: "Monday",
        title: "He is back at work.",
        body: "A quiet weekend, ibuprofen, and most men are back to normal duties by Monday. A follow-up semen analysis confirms clearance, then he returns to your care.",
        image: img("monday.webp", "A man at home in a sunlit kitchen on a weekend morning"),
      },
    ],
  },
  watch: {
    eyebrow: "The procedure",
    heading: "Watch it before you describe it.",
    lede: "The same explainer we send your patient before his appointment. Forty seconds, and worth it if you have ever tried to talk a hesitant man through what actually happens.",
    video: { _seed: "file", file: "how-it-works.mp4" } as SeedFile,
    poster: img("procedure-room.webp", "An empty procedure room in morning light"),
  },
  research: {
    image: img("conference.webp", "A medical conference auditorium during a presentation"),
    eyebrow: "Research & teaching",
    heading: "He presents the work, and he keeps learning it.",
    lede: "Dr Cashion regularly presents at national and international vasectomy conferences, demonstrating his dedication to lifelong learning — and bringing technique refinements back into a practice that performs them thousands of times a year.",
  },
};

// ----------------------------------------------------------------- about
export const about = {
  lead: {
    statement: rich(
      "Dr Geoff Cashion has dedicated his professional life to one question: how do you make a safe, effective, affordable vasectomy available to *every* Australian man, not just the ones who live near a capital city?"
    ),
    columns: [
      "He is the founder of Vasectomy Australia, the country's largest provider of no-scalpel vasectomy. What began as one doctor is now a practice with several full-time vasectomists and clinics across six states — built specifically so that a man in Dubbo or Rockhampton has the same access to an experienced vasectomist as a man in Sydney.",
      "For a referring GP, the practical consequence is simple. You are not sending your patient to someone who does a handful of these between other work. You are sending him to a doctor who has done the procedure more than twenty-five thousand times, and who does little else.",
    ],
  },
  scale: {
    eyebrow: "The practice",
    heading: "Built for distance.",
    stats: [
      { figure: "25,000+", label: "Vasectomies performed" },
      { figure: "~3,500", label: "Each year" },
      { figure: "6", label: "States with clinics" },
      { figure: "2017", label: "Full-time vasectomy practice since" },
    ],
  },
  rural: {
    image: img(
      "rockhampton.webp",
      "Open cattle country near Rockhampton, Central Queensland, at golden hour"
    ),
    eyebrow: "Rockhampton, Queensland",
    heading: "He grew up a long way from a specialist.",
    lede: "Dr Cashion was raised in Rockhampton, and that upbringing is the reason Vasectomy Australia is shaped the way it is. Rural and regional men have historically had two options: travel hundreds of kilometres, or go without. The clinic list exists to remove that choice.",
  },
  access: {
    eyebrow: "Access",
    heading: "The same procedure, the same price, wherever your patient lives.",
    body: rich(
      "A vasectomy performed in Tamworth is the same operation, by the same technique, at the same out-of-pocket cost as one performed in the inner west of Sydney. Regional clinics run to a schedule, so a patient in a country town is booked into a real list rather than waiting for a visiting doctor who may or may not come.",
      "For you, that means a referral does not have to come with an apology about travel."
    ),
    image: img("country-town.webp", "A quiet main street in a regional Australian town"),
  },
  quals: {
    eyebrow: "Qualifications & memberships",
    heading: "An unusual route in.",
    lede: "Accountancy first, then medicine, then rural and emergency fellowships. It is not the standard path to a procedural practice, and it shows in how the clinics are run.",
    image: img("university.webp", "A sandstone university building in Queensland"),
    registration: "Registered medical practitioner · AHPRA reg.",
    items: [
      { year: 1992, award: "Bachelor of Business (Accountancy)", institution: "Queensland University of Technology" },
      { year: 2002, award: "Bachelor of Medicine and Bachelor of Surgery", institution: "University of Queensland" },
      { year: 2011, award: "Fellowship", institution: "Australian College of Rural and Remote Medicine" },
      { year: 2013, award: "Fellowship", institution: "The Royal College of Emergency Medicine" },
    ],
  },
  teaching: {
    image: img("lectern.webp", "A speaker at a lectern addressing a darkened conference auditorium"),
    eyebrow: "Thought leadership",
    heading: "He presents the work, and publishes it.",
    lede: "Dr Cashion regularly attends and presents at national and international vasectomy conferences, and publishes on technique, complications and Australian vasectomy trends. Volume without scrutiny is just repetition; the publishing is what keeps the technique honest.",
    link: { label: "Read the publications", href: "/research/" },
  },
  quote: {
    image: img("cashion-portrait.webp", "Studio portrait of Dr Geoff Cashion"),
    quote:
      "I look forward to partnering with you and your patients, helping them to achieve their family planning goals.",
    cite: "Dr Geoffrey Cashion — Specialist GP, founder of Vasectomy Australia",
  },
};

// ------------------------------------------------------------- vasectomy
export const vasectomy = {
  facts: {
    registration:
      "Procedure information provided by Dr Geoffrey Cashion, registered medical practitioner · AHPRA reg.",
    items: [
      { figure: "5–10 min", label: "In the chair" },
      { figure: "Local", label: "Anaesthetic only" },
      { figure: "1", label: "Opening, no scalpel" },
      { figure: "0", label: "Stitches" },
      { figure: "$597", label: "Out of pocket" },
    ],
  },
  what: {
    eyebrow: "What it is",
    heading: "A refinement of the operation, not a different operation.",
    body: rich(
      "A vasectomy divides the vas deferens so that sperm cannot reach the ejaculate. That much is the same however it is done. What differs is how the surgeon gets to the vas.",
      "The conventional technique makes one or two incisions with a scalpel and closes them with sutures. The no-scalpel technique, developed in China in the 1970s and now the international standard, reaches the vas through a single small opening made by spreading tissue with sharp dissecting forceps rather than cutting it. The opening is small enough that it does not need a stitch.",
      "The distinction matters clinically rather than cosmetically. Comparative reviews of the two approaches consistently find less bleeding, less haematoma, less infection and less pain with the no-scalpel technique, with no loss of effectiveness."
    ),
    image: img(
      "instrument-set.webp",
      "A set of fine stainless steel surgical instruments on a surgical drape"
    ),
    caption: "Ring-tipped fixation forceps and sharp dissecting forceps — no blade",
  },
  compare: {
    eyebrow: "Side by side",
    heading: "Where the two techniques diverge.",
    oldLabel: "Conventional incisional",
    oldItems: [
      "One or two scalpel incisions",
      "Sutures required to close",
      "Larger wound, more tissue disturbed",
      "Higher rates of haematoma and infection",
      "Longer operating time",
    ],
    newLabel: "No-scalpel",
    newItems: [
      "A single small midline opening",
      "No sutures — it closes on its own",
      "Tissue spread rather than cut",
      "Lower rates of haematoma and infection",
      "Typically five to ten minutes",
    ],
    footnote:
      "Both techniques divide the vas. Only the route in is different — and it is the route in that produces most of the complications.",
  },
  technique: {
    eyebrow: "Technique",
    heading: "How the vas is occluded.",
    lede: "Dividing the vas is not enough on its own — the ends can find each other again. Two things prevent that, and doing both is what separates a low failure rate from a merely acceptable one.",
    steps: [
      {
        title: "The vas is isolated",
        body: "A ring-tipped fixation clamp secures the vas deferens through the skin. A single small opening is made in the midline with sharp dissecting forceps — spread, not cut — and the vas is lifted out through it.",
      },
      {
        title: "Divided, and the lumen sealed",
        body: "A short segment is removed and the lumen of the testicular end is sealed with cautery, rather than relying on a tie that can slip or cut through.",
      },
      {
        title: "Fascia interposed between the ends",
        body: "The fascial sheath is drawn over one cut end and secured, so the two ends sit in separate tissue planes. Cautery plus fascial interposition is what drives the failure rate down.",
      },
    ],
  },
  appointment: {
    eyebrow: "The appointment",
    heading: "Twenty minutes, start to finish.",
    intro:
      "Scroll the track. The times are typical rather than promised, but the order does not change.",
    steps: [
      {
        at: "On arrival",
        title: "Consent and questions",
        body: "Identity, indication and expectations are confirmed, and consent is taken. Any man who is uncertain is not booked on the day — this is the point at which that gets caught.",
      },
      {
        at: "Minute 1",
        title: "Local anaesthetic",
        body: "A fine needle raises a small bleb of local at the midline, then the anaesthetic is directed along each vas. This is the only part most men describe as uncomfortable, and it lasts seconds.",
      },
      {
        at: "Minute 3",
        title: "The vas is secured and lifted",
        body: "A ring-tipped fixation clamp holds the vas under the skin. Sharp dissecting forceps make a single small opening and spread the tissue rather than cutting it.",
      },
      {
        at: "Minute 5",
        title: "Divided, sealed, separated",
        body: "A short segment is removed, the lumen is sealed with cautery, and the fascial sheath is interposed between the two ends. The second side is done through the same opening.",
      },
      {
        at: "Minute 8",
        title: "Dressed, and up",
        body: "The opening is small enough to close without a suture. A dressing goes on, supportive underwear goes back on, and he sits up.",
      },
      {
        at: "Minute 15",
        title: "He drives himself home",
        body: "No sedation means no recovery bay, no carer and no taxi. Written aftercare and the 24-hour contact number go with him.",
      },
    ],
  },
  effectiveness: {
    image: img("lab.webp", "A microscope and specimen vials on a pathology laboratory bench"),
    eyebrow: "Effectiveness",
    heading: "It is not contraception until the test says so.",
    body: rich(
      "Vasectomy is among the most effective forms of contraception available — after documented clearance, failure sits at roughly one in two thousand. But it is not effective on the day, and this is the single most important thing for a patient to leave the consult understanding.",
      "Sperm remain downstream of the division for weeks. Clearance is confirmed by post-vasectomy semen analysis, generally at around twelve weeks and after roughly twenty ejaculations. Until that result is in hand, the couple must continue their existing contraception.",
      "Most unplanned pregnancies after vasectomy are not technical failures. They are couples who stopped using contraception before clearance was confirmed."
    ),
    flag: "Worth saying twice in the consult: no unprotected sex until the semen analysis is clear.",
  },
  recovery: {
    image: img("recovery.webp", "A man resting on a sofa at home on a weekend afternoon"),
    eyebrow: "Recovery",
    heading: "A quiet weekend, then back to it.",
    items: [
      { when: "Day 0", what: "Home within the hour. Ice, supportive underwear, simple analgesia." },
      { when: "Days 1–2", what: "Rest. Aching and bruising are normal. No lifting, no sport." },
      { when: "Day 3", what: "Most men are back to desk work. Manual work usually needs a few days more." },
      { when: "Week 1", what: "Normal activity resumes. Sex when comfortable — with contraception." },
      { when: "Week 12", what: "Semen analysis. Clearance confirmed, then he returns to your care." },
    ],
  },
  risks: {
    eyebrow: "Risks and complications",
    heading: "The honest list.",
    lede: "A page that only lists benefits is not much use to someone taking consent. These are the things that actually happen, at roughly the rates they happen.",
    image: img("procedure-room.webp", "An empty procedure room in morning light"),
    items: [
      {
        name: "Bruising and swelling",
        rate: "Common",
        body: "Expected rather than a complication. Settles over a week to ten days with support and simple analgesia.",
      },
      {
        name: "Haematoma",
        rate: "Uncommon",
        body: "A collection of blood in the scrotum. Usually managed conservatively; occasionally needs review. Rates are lower with the no-scalpel approach than with an incisional technique.",
      },
      {
        name: "Infection",
        rate: "Uncommon",
        body: "A small opening and no suture material means less to get infected. When it happens it is usually superficial and responds to oral antibiotics.",
      },
      {
        name: "Sperm granuloma",
        rate: "Uncommon",
        body: "A small firm nodule at the cut end from sperm leakage. Often asymptomatic and usually settles without intervention.",
      },
      {
        name: "Chronic scrotal pain",
        rate: "1–2%",
        body: "Post-vasectomy pain syndrome. The complication worth naming explicitly in the consent conversation, because it is the one that changes a man's mind.",
      },
      {
        name: "Failure",
        rate: "~1 in 2,000",
        body: "Early failure is picked up by post-vasectomy semen analysis. Late recanalisation after documented clearance is rarer again.",
      },
    ],
  },
  unchanged: {
    eyebrow: "What it does not change",
    heading: "The questions he will ask you, not us.",
    lede: "Most of the hesitation around vasectomy is about things the procedure does not touch. These come up in the GP consult far more often than in ours.",
    items: [
      {
        q: "Testosterone and hormones",
        a: "Unchanged. The vas carries sperm, not hormones. Testicular endocrine function is unaffected, so testosterone, body hair, muscle mass and mood are not altered by the procedure.",
      },
      {
        q: "Erections and libido",
        a: "Unchanged. Nothing in the erectile or neurological pathway is touched. Where men report a change, it is almost always psychological rather than physiological — which is worth surfacing before the procedure rather than after.",
      },
      {
        q: "Ejaculate",
        a: "Essentially unchanged. Sperm makes up only a few per cent of ejaculate volume; the rest comes from the seminal vesicles and prostate, which are untouched. Most men notice no difference at all.",
      },
      {
        q: "Long-term health risk",
        a: "Large cohort studies have not shown a causal association between vasectomy and prostate cancer or cardiovascular disease. This still comes up in the consult, so it is worth being able to answer it plainly.",
      },
      {
        q: "Protection from infection",
        a: "None. Vasectomy is contraception, not barrier protection. A man with a new or non-monogamous partner still needs condoms.",
      },
    ],
  },
  cost: {
    eyebrow: "Cost",
    heading: "$597 out of pocket.",
    body: rich(
      "That is the figure after the Medicare rebate, and it is the same in Enmore as it is in Tamworth. A vasectomy performed by a urologist in a private hospital can run to $5,000 once theatre and anaesthetic fees are counted.",
      "The difference is not the operation. It is that this one is done under local anaesthetic in a consulting room rather than under general anaesthetic in a theatre."
    ),
    bars: [
      { label: "With Dr Cashion", value: "$597", amount: 597 },
      { label: "Urologist, private hospital", value: "up to $5,000", amount: 5000 },
    ],
    image: img("cost.webp", "A statement and bank card on a desk"),
  },
  permanence: {
    background: drape(),
    eyebrow: "Permanence",
    heading: "Refer it as permanent, because that is how it should be chosen.",
    lede: "Reversal exists. It is microsurgery, it takes hours rather than minutes, it costs several thousand dollars, and restored patency does not reliably mean pregnancy — success falls the longer it has been since the vasectomy.",
    note: 'Which is why the useful screening question in your consult is not "are you sure" but "what would have to change for you to regret this". Men under thirty and men without children warrant a longer conversation.',
  },
  locations: {
    eyebrow: "Where to send him",
    heading: "Clinics across six states.",
    lede: "Select a state to filter, or narrow to the clinics Dr Cashion operates himself.",
    clinics: states.flatMap((s) =>
      s.clinics.map((c) => ({ _type: "clinic", clinic: c.clinic, area: c.area, state: s.code, doctor: c.doctor }))
    ),
  },
};

// -------------------------------------------------------------- research
export const research = {
  intro: {
    statement:
      "A practice doing three and a half thousand procedures a year generates a lot of data. Publishing it is how the technique gets tested rather than merely repeated.",
    note: rich(
      "Dr Cashion's recent work covers early-onset infection after no-scalpel vasectomy, the diagnostic problem of unilateral absence of the vas deferens, and a decade of change in who is choosing vasectomy in Australia. His earlier research, from emergency medicine, examined procedural sedation safety."
    ),
  },
  publications: {
    eyebrow: "Publications",
    heading: "Selected work.",
    author: "Dr Geoffrey Cashion · AHPRA reg.",
    items: publications.map((p) => ({ _type: "publication", ...p })),
  },
  conferences: {
    image: img("conference.webp", "A darkened conference auditorium during a presentation"),
    eyebrow: "Conferences",
    heading: "Presenting, and being corrected.",
    lede: "Dr Cashion regularly attends and presents at national and international vasectomy conferences — as much to learn from other leading practitioners as to share his own results. Technique refinements from those meetings come back into a practice performing thousands of procedures a year.",
  },
};

// --------------------------------------------------------------- contact
export const contact = {
  direct: {
    eyebrow: "Direct",
    heading: "Three ways through.",
    lede: "For anything clinical, the phone is fastest. For anything with a document attached, use email.",
    emailNote: "Referrals and patient questions",
    socialLabel: "facebook.com/vasectomyaustralia",
    socialNote: "Vasectomy Australia",
  },
  ask: {
    eyebrow: "Ask a question",
    heading: "Have a question about a patient?",
    lede: "Fill this out and Dr Cashion will contact you as soon as possible. Please keep patient identifiers out of the message — a description of the clinical question is enough to get a useful answer.",
    aside: rich(
      "Not a GP? Patients book directly through [Vasectomy Australia](https://vasectomyaustralia.com.au/) rather than through these rooms."
    ),
  },
  where: {
    eyebrow: "Clinics",
    heading: "{count} clinics, six states.",
    lede: 'If the question is simply "where is the nearest one", the full list is on the vasectomy page, filterable by state.',
    button: { label: "Find a clinic", href: "/vasectomy/#locations" },
  },
};

// ----------------------------------------------------------------- refer
export const refer = {
  aside: {
    eyebrow: "The referral",
    heading: "Refer a patient",
    note: "We need enough to contact your patient and enough to send the outcome back to you. Nothing else is required at this stage — anything clinical can follow in a letter.",
    altLabel: "Rather not use a form?",
  },
};

/** Section content for the pages with their own document type. */
export const pageContent = { home, about, vasectomy, research, contact, refer };

/** Sanity document type for each slug; everything else is `page`. */
export const pageTypes: Record<string, string> = {
  home: "homePage",
  about: "aboutPage",
  vasectomy: "vasectomyPage",
  research: "researchPage",
  contact: "contactPage",
  refer: "referPage",
};
