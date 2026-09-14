import {
  Activity,
  Baby,
  CircleDot,
  Droplets,
  Eye,
  Gauge,
  Glasses,
  Layers,
  ScanFace,
  Sparkles,
  Target,
  type LucideIcon,
} from "lucide-react";

/* ── Navigation / routing types ─────────────────────────────── */
export type ViewName =
  | "home"
  | "treatments"
  | "treatment"
  | "doctor"
  | "appointment"
  | "about"
  | "doctors"
  | "facilities"
  | "resources"
  | "contact";

export interface RouteState {
  view: ViewName;
  treatmentId?: string;
  doctorId?: string;
  anchor?: string;
  prefill?: { department?: string; doctorId?: string };
}

/* ── Clinic constants (placeholders — to be confirmed by client) ── */
export const CLINIC = {
  name: "Shiv Netralay",
  tagline: "Advanced Eye Care",
  phoneDisplay: "+91 98XXX XXXXX",
  phoneHref: "tel:+919800000000",
  email: "care@shivnetralay.com",
  addressLines: ["Shiv Netralay, Main Road", "Your City, State — 000 000"],
  hours: [
    { days: "Monday — Saturday", time: "9:00 AM – 7:00 PM" },
    { days: "Sunday", time: "Closed (Emergency on call)" },
  ],
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Shiv+Netralay",
};

/* ── Treatments ─────────────────────────────────────────────── */
export interface TreatmentOption {
  title: string;
  description: string;
}

export interface Treatment {
  id: string;
  name: string;
  shortName: string;
  icon: LucideIcon;
  tagline: string;
  cardDescription: string;
  heroImage?: string;
  image?: string; // stock photo shown on treatment cards
  gradient: string; // tailwind gradient classes for icon covers
  overview: string[];
  symptoms: { title: string; items: string[] };
  candidates: { title: string; items: string[] };
  options: TreatmentOption[];
  approach: { title: string; description: string }[];
  aftercare: { title: string; description: string }[];
  faqs: { q: string; a: string }[];
}

export const TREATMENTS: Treatment[] = [
  {
    id: "cataract",
    name: "Cataract Surgery",
    shortName: "Cataract",
    icon: CircleDot,
    tagline: "Clearer vision begins with the right diagnosis and care.",
    cardDescription:
      "Micro-incision cataract surgery with premium intraocular lenses — from first diagnosis to guided recovery.",
    image: "/images/treatments/cataract.jpg",
    heroImage: "/images/surgery-microscope.jpg",
    gradient: "from-jade-500 to-brand-800",
    overview: [
      "A cataract is the natural clouding of the eye's lens — a part of normal ageing, but one that can quietly blur the world around you. Everyday tasks such as reading, driving at night or recognising faces gradually become harder.",
      "Cataract develops slowly and painlessly, which is why many people delay treatment until vision significantly interferes with daily life. The good news: cataract is highly treatable, and modern micro-incision surgery restores crisp, clear vision in a matter of minutes.",
      "At Shiv Netralay, every cataract journey begins with a detailed evaluation of your lens, retina and overall eye health so the surgical plan is tailored precisely to your eyes and lifestyle.",
    ],
    symptoms: {
      title: "Common signs of cataract",
      items: [
        "Cloudy, blurred or dim vision",
        "Increased sensitivity to light and glare",
        "Difficulty seeing at night",
        "Frequent changes in spectacle number",
        "Fading or yellowing of colours",
        "Halos around lights, especially while driving",
      ],
    },
    candidates: {
      title: "When should treatment be considered?",
      items: [
        "Vision interferes with reading, cooking or working",
        "Night driving has become difficult or unsafe",
        "Glare from lights or sunshine is troublesome",
        "Glasses no longer correct vision adequately",
        "Your doctor advises surgery for eye-health reasons",
      ],
    },
    options: [
      {
        title: "Micro-incision Phaco Surgery",
        description:
          "The standard of care — a 2–3 mm incision, ultrasound emulsification of the cloudy lens and implantation of a foldable IOL. Fast, sutureless and comfortable.",
      },
      {
        title: "Monofocal Lenses",
        description:
          "Reliable, proven lenses that give excellent distance vision. Most patients need light reading glasses afterwards.",
      },
      {
        title: "Toric Lenses (Astigmatism)",
        description:
          "Correct corneal astigmatism at the time of cataract surgery, reducing dependence on cylindrical glasses.",
      },
      {
        title: "Premium Multifocal / EDOF Lenses",
        description:
          "Designed to extend the range of clear vision — distance, intermediate and near — for greater freedom from spectacles.",
      },
    ],
    approach: [
      {
        title: "Precise measurement",
        description:
          "Biometry and corneal assessment calculate the ideal lens power for your eye.",
      },
      {
        title: "Tailored lens planning",
        description:
          "We match the IOL to your lifestyle — reading, driving, screens or outdoor work.",
      },
      {
        title: "Gentle micro-surgery",
        description:
          "Topical anaesthesia, micro-incision technique and careful tissue handling.",
      },
      {
        title: "Guided recovery",
        description:
          "Clear medication schedules and structured follow-ups protect your new vision.",
      },
    ],
    aftercare: [
      {
        title: "First 24 hours",
        description:
          "Rest, avoid rubbing the eye, and use drops exactly as prescribed. A protective shield is worn while sleeping.",
      },
      {
        title: "First week",
        description:
          "Keep water, dust and sweat out of the eye. Avoid heavy lifting and strenuous activity.",
      },
      {
        title: "Weeks 2–4",
        description:
          "Most patients resume normal routines including walking, office work and television. Swimming and make-up stay paused.",
      },
      {
        title: "Follow-ups",
        description:
          "Day 1, week 1 and week 4 reviews confirm healing. Final glasses, if needed, are prescribed after stabilisation.",
      },
    ],
    faqs: [
      {
        q: "Is cataract surgery painful?",
        a: "No. Numbing drops (topical anaesthesia) keep you comfortable, and the procedure typically takes 15–20 minutes. Most patients describe it as far easier than expected.",
      },
      {
        q: "How soon will I see clearly?",
        a: "Many patients notice brighter vision within 24–48 hours, with continued improvement over the first week as the eye settles.",
      },
      {
        q: "Can a cataract come back?",
        a: "No — the cloudy lens is removed permanently. Some patients develop a natural haze on the lens capsule months later, which is treated painlessly in the clinic with a laser.",
      },
    ],
  },
  {
    id: "lasik",
    name: "LASIK & Refractive Surgery",
    shortName: "LASIK",
    icon: Sparkles,
    tagline: "Freedom from glasses, engineered for your eyes.",
    cardDescription:
      "Vision correction solutions for eligible patients, with detailed screening and modern laser platforms.",
    image: "/images/treatments/lasik.jpg",
    gradient: "from-jade-400 to-brand-700",
    overview: [
      "LASIK reshapes the cornea with a cool, ultra-precise laser so light focuses correctly on the retina — reducing or eliminating the need for glasses and contact lenses.",
      "Suitability matters more than anything in refractive surgery. A thorough evaluation of corneal thickness, shape, prescription stability and eye health determines whether LASIK, PRK or an ICL is the safest choice for you.",
      "Our counselling is deliberately conservative: we recommend treatment only when we would choose it for our own family.",
    ],
    symptoms: {
      title: "You may be a candidate if you have",
      items: [
        "Myopia (near-sightedness)",
        "Hyperopia (far-sightedness)",
        "Astigmatism",
        "Dependence on glasses or contact lenses",
        "Prescription stable for 12+ months",
        "Age 18 years or above",
      ],
    },
    candidates: {
      title: "Who should consider evaluation?",
      items: [
        "Active lifestyles where glasses are a hindrance",
        "Sports, swimming or travel enthusiasts",
        "Contact-lens intolerance or discomfort",
        "Professions with vision requirements",
        "Realistic expectations discussed at counselling",
      ],
    },
    options: [
      {
        title: "Contoura / Topo-guided LASIK",
        description:
          "Corneal-mapping-guided treatment planned for your eye's unique topography, aiming for sharper quality of vision.",
      },
      {
        title: "Blade-free LASIK",
        description:
          "Femtosecond laser creates the corneal flap with micron precision — no blades involved.",
      },
      {
        title: "PRK / Surface Ablation",
        description:
          "A flap-free option ideal for thinner corneas or certain professional requirements.",
      },
      {
        title: "ICL (Implantable Collamer Lens)",
        description:
          "For high prescriptions or thin corneas, a biocompatible lens is placed inside the eye — reversible and UV-blocking.",
      },
    ],
    approach: [
      { title: "Deep screening", description: "Corneal topography, pachymetry, pupil and tear-film assessment across 20+ parameters." },
      { title: "Honest counselling", description: "A clear explanation of expected outcomes — and equally clear reasons to say no when needed." },
      { title: "Day-of-care", description: "The laser portion itself takes only minutes; the same-day protocol keeps you relaxed throughout." },
      { title: "Protected healing", description: "Structured drops, wrap-around shields and staged reviews through the first month." },
    ],
    aftercare: [
      { title: "First 24 hours", description: "Eyes may feel gritty or watery — rest with eyes closed as much as possible. Most read a phone screen the same evening." },
      { title: "Days 2–7", description: "Avoid rubbing, dust and splashing water. Screens in moderation with lubricating drops." },
      { title: "Weeks 2–4", description: "Light gym and outdoor activities resume with protective eyewear; swimming waits a month." },
      { title: "Reviews", description: "Day 1, week 1, month 1 and month 3 visits track your unaided vision and corneal healing." },
    ],
    faqs: [
      { q: "Is LASIK permanent?", a: "The corneal correction is permanent. Normal age-related reading changes (presbyopia) can still occur in the 40s and are discussed during counselling." },
      { q: "Does the laser hurt?", a: "Numbing drops make the treatment painless. You may feel brief pressure; the laser itself is sensation-free." },
      { q: "How quickly can I return to work?", a: "Most desk-work patients resume within 2–3 days once the first review confirms smooth healing." },
    ],
  },
  {
    id: "glaucoma",
    name: "Glaucoma Management",
    shortName: "Glaucoma",
    icon: Gauge,
    tagline: "Protecting your sight before symptoms ever appear.",
    cardDescription:
      "Diagnosis, monitoring and management of glaucoma to safeguard the optic nerve and preserve vision.",
    image: "/images/treatments/glaucoma.jpg",
    gradient: "from-jade-600 to-brand-900",
    overview: [
      "Glaucoma is a group of conditions that damage the optic nerve, most often related to raised pressure inside the eye. It is called the silent thief of sight because peripheral vision fades gradually and painlessly.",
      "Vision lost to glaucoma cannot be recovered — but with early detection, pressure control and regular monitoring, sight can be protected for a lifetime.",
      "Our glaucoma protocol combines pressure measurement, optic-nerve imaging and visual-field testing to detect change at its earliest, most treatable stage.",
    ],
    symptoms: {
      title: "Warning signs to watch for",
      items: [
        "Gradual loss of side (peripheral) vision",
        "Frequent change of glasses without benefit",
        "Halos around lights",
        "Eye ache with blurred vision and headache",
        "Family history of glaucoma",
        "Long-term steroid usage",
      ],
    },
    candidates: {
      title: "Who should be screened regularly?",
      items: [
        "Everyone above 40, at least once a year",
        "Blood relatives of glaucoma patients",
        "Diabetics and hypertensives",
        "Long-term steroid users",
        "Previous eye injury or surgery",
        "High myopia",
      ],
    },
    options: [
      {
        title: "Medical Therapy",
        description:
          "Daily pressure-lowering eye drops — the mainstay of treatment, tailored to effectiveness and tolerance.",
      },
      {
        title: "Laser Treatment",
        description:
          "Selective laser trabeculoplasty (SLT) improves fluid drainage and can reduce drop burden.",
      },
      {
        title: "Minimally Invasive Surgery",
        description:
          "MIGS procedures combine safety with effective pressure control for suitable candidates.",
      },
      {
        title: "Trabeculectomy",
        description:
          "The established filtration surgery for advanced or resistant glaucoma, performed with meticulous technique.",
      },
    ],
    approach: [
      { title: "Baseline mapping", description: "Pressure, gonioscopy, OCT nerve imaging and field tests create your personal reference." },
      { title: "Target pressure", description: "A treatment goal set for your nerve, tracked at every visit." },
      { title: "Structured monitoring", description: "Scheduled field tests and scans detect progression before you would notice it." },
      { title: "Escalation ladder", description: "Drops → laser → surgery, stepping up only when needed." },
    ],
    aftercare: [
      { title: "Drop discipline", description: "Correct technique and timing matter — we coach you until it is effortless." },
      { title: "Never stop silently", description: "Glaucoma medicines are long-term; any change happens with your doctor." },
      { title: "Life habits", description: "Normal exercise, hydration and sleep help pressure control; head-down yoga poses may need modification." },
      { title: "Family screening", description: "First-degree relatives are advised periodic screening." },
    ],
    faqs: [
      { q: "Can glaucoma be cured?", a: "Damage cannot be reversed, but progression can usually be halted. The goal of treatment is to preserve the vision you have for life." },
      { q: "I see fine — do I still need drops?", a: "Yes. Glaucoma has no symptoms until advanced. Drops work silently to keep pressure at a safe level." },
      { q: "Is surgery required for everyone?", a: "No. Most patients are controlled with drops or laser alone; surgery is reserved for specific situations." },
    ],
  },
  {
    id: "diabetic-retinopathy",
    name: "Diabetic Retinopathy",
    shortName: "Diabetic Eye",
    icon: Activity,
    tagline: "Protecting your sight against diabetes' quietest complication.",
    cardDescription:
      "Detection, laser and injection treatment of diabetic eye disease — timed before vision is ever threatened.",
    image: "/images/treatments/retina.jpg",
    heroImage: "/images/equip-oct-consult.jpg",
    gradient: "from-brand-600 to-brand-900",
    overview: [
      "Diabetic retinopathy is damage to the retina's fine blood vessels caused by years of raised blood sugar. It develops silently — vision stays normal while the damage quietly progresses in the background.",
      "The condition moves through stages: from mild background changes, to leaking and swelling at the macula, to proliferative retinopathy where fragile new vessels grow and bleed. Each stage has a different treatment threshold.",
      "The good news is that most vision loss from diabetes is preventable. With yearly dilated screening, timely laser or injection treatment and good sugar control, the overwhelming majority of patients keep useful sight for life.",
    ],
    symptoms: {
      title: "Warning signs of diabetic eye disease",
      items: [
        "Gradual or sudden blurred vision",
        "Vision that fluctuates as sugar levels swing",
        "Sudden floaters or a shower of black dots (bleeding)",
        "A dark curtain or shadow in the field of vision",
        "Distortion or a grey patch in central vision",
        "Difficulty seeing at night or reading in dim light",
      ],
    },
    candidates: {
      title: "Who needs regular retinal screening?",
      items: [
        "Type 1 diabetes — yearly from five years after diagnosis",
        "Type 2 diabetes — yearly from the time of diagnosis",
        "Diabetic women planning pregnancy or already pregnant",
        "Uncontrolled sugar or blood pressure",
        "Diabetes lasting more than 10 years",
        "Kidney disease or already mild retinopathy",
      ],
    },
    options: [
      {
        title: "Intravitreal Injections",
        description:
          "Anti-VEGF medicines delivered into the eye reduce macular swelling and shrink abnormal new vessels — the mainstay for sight-threatening retinopathy.",
      },
      {
        title: "Retinal Laser (PRP & Focal)",
        description:
          "Pan-retinal and focal laser stabilise proliferative disease and seal leaking vessels — done in the clinic, usually painless.",
      },
      {
        title: "OCT & Fundus Imaging",
        description:
          "Cross-sectional scans and retinal photographs document every stage objectively, so treatment is timed on facts, not feelings.",
      },
      {
        title: "Vitreoretinal Referral",
        description:
          "Advanced bleeding or detachment needing vitrectomy is coordinated directly with trusted vitreoretinal surgeons.",
      },
    ],
    approach: [
      { title: "Dilated examination", description: "A careful look at the entire retina, not just the centre — the only way to stage retinopathy accurately." },
      { title: "Objective staging", description: "OCT and fundus imaging grade your retinopathy against international scales for a clear treatment threshold." },
      { title: "Treat early", description: "Laser or injections timed before vision is ever threatened — early treatment is easy treatment." },
      { title: "Sugar & BP teamwork", description: "We work with your physician, because the most powerful retinopathy treatment happens outside the eye." },
    ],
    aftercare: [
      { title: "After injections", description: "Mild grittiness for a day is normal; report pain, redness or worsening vision immediately." },
      { title: "After laser", description: "Brief blur and dimmer side vision are expected; most activities resume the next day." },
      { title: "Review rhythm", description: "Every 3–6 months once stable, more often during active treatment — retinopathy is a marathon." },
      { title: "Daily control", description: "Sugar, blood pressure and cholesterol control, plus no-smoking — the treatment that protects both eyes." },
    ],
    faqs: [
      { q: "Will every diabetic get retinopathy?", a: "No. Good sugar and blood-pressure control dramatically lowers the risk — and yearly screening catches any change at its most treatable stage." },
      { q: "Can diabetic retinopathy be reversed?", a: "Early changes can stabilise and swelling can resolve with treatment, but lost vision is rarely recovered — which is why treatment is timed early." },
      { q: "My vision is fine — do I still need yearly exams?", a: "Yes. Retinopathy causes no symptoms until it is advanced. Screening finds the disease while it is still easy to halt." },
    ],
  },
  {
    id: "macular-degeneration",
    name: "Macular Degeneration",
    shortName: "Macular Care",
    icon: Target,
    tagline: "Early detection keeps the centre of your vision in your life.",
    cardDescription:
      "Diagnosis and treatment of age-related macular degeneration — from protective nutrition to injection therapy for wet AMD.",
    image: "/images/equip-oct-consult.jpg",
    gradient: "from-jade-600 to-brand-800",
    overview: [
      "Age-related macular degeneration (AMD) affects the macula — the small central zone of the retina responsible for reading, faces and fine detail. Peripheral vision is never affected, which is why it never causes total blindness but can take away independence.",
      "Dry AMD progresses slowly with waste build-up under the macula; wet AMD appears suddenly when abnormal vessels leak fluid and can destroy central vision within weeks. Roughly one in ten dry cases converts to wet — which is why monitoring matters.",
      "Shiv Netralay combines OCT scanning, fundus imaging and simple home Amsler-grid monitoring to catch conversion early, when anti-VEGF injections are most effective at protecting your central vision.",
    ],
    symptoms: {
      title: "Symptoms of macular degeneration",
      items: [
        "Straight lines appearing wavy or bent",
        "A blurred or grey patch in the centre of vision",
        "Words missing or fading when reading",
        "Faces harder to recognise",
        "Colours appearing less bright",
        "A dark or empty area in central vision (urgent)",
      ],
    },
    candidates: {
      title: "Who should be monitored for AMD?",
      items: [
        "Everyone above 50 — baseline macular check",
        "Smokers (the single biggest modifiable risk)",
        "Family history of macular degeneration",
        "Obesity, hypertension and heart disease",
        "Already diagnosed dry AMD in either eye",
        "Any sudden wavy lines or central blur — same week",
      ],
    },
    options: [
      {
        title: "Anti-VEGF Injection Therapy",
        description:
          "The gold standard for wet AMD — medicines injected into the eye block the leaking vessels and preserve central vision when started early.",
      },
      {
        title: "AREDS2 Nutritional Therapy",
        description:
          "Evidence-based vitamin and mineral formulations proven to slow the progression of intermediate dry AMD.",
      },
      {
        title: "OCT Macular Monitoring",
        description:
          "High-resolution cross-sectional scans detect fluid conversion weeks before symptoms would — the key to timely treatment.",
      },
      {
        title: "Low-Vision Support",
        description:
          "Magnifiers, lighting advice and referral pathways that keep reading and independence possible even in advanced stages.",
      },
    ],
    approach: [
      { title: "Baseline imaging", description: "OCT and fundus photography map your macula and grade the AMD stage." },
      { title: "Dry or wet classification", description: "The two forms behave differently — the plan depends on getting this right." },
      { title: "Rapid wet-AMD pathway", description: "Suspicious fluid gets same-week injection treatment — every week counts." },
      { title: "Home monitoring training", description: "We teach Amsler-grid self-checks so conversion is caught between visits." },
    ],
    aftercare: [
      { title: "After injections", description: "Mild grittiness for a day is expected; report any sharp pain, redness or further blur at once." },
      { title: "Between visits", description: "Amsler-grid checks twice weekly per eye — new waviness means call us, don't wait." },
      { title: "Lifestyle protection", description: "Stop smoking, leafy-green diet, UV protection, blood pressure and exercise — all slow progression." },
      { title: "Review rhythm", description: "Wet AMD: 4–8 weekly during treatment cycles. Dry AMD: every 3–6 months with OCT." },
    ],
    faqs: [
      { q: "What is the difference between dry and wet AMD?", a: "Dry AMD progresses slowly with thinning and waste deposits. Wet AMD leaks fluid from new vessels and can damage vision in weeks — but it now responds very well to injections." },
      { q: "Do injections cure macular degeneration?", a: "They control it rather than cure it. Most patients need repeat injections at intervals, but the majority keep useful central vision long-term." },
      { q: "Can AMD be prevented?", a: "It cannot be fully prevented, but not smoking, a green-leafy diet, UV protection and AREDS2 supplements (at the right stage) measurably lower the risk and slow progression." },
    ],
  },
  {
    id: "cornea",
    name: "Corneal Conditions",
    shortName: "Cornea",
    icon: Glasses,
    tagline: "Clarity starts at the surface — expert care for the eye's clear window.",
    cardDescription:
      "Specialised care for corneal infections, injuries, dystrophies and surface disorders.",
    image: "/images/treatments/cornea.jpg",
    gradient: "from-jade-400 to-brand-700",
    overview: [
      "The cornea is the transparent front window of the eye. Even a small scar, infection or swelling here can blur vision dramatically — the rest of the eye may be perfectly healthy.",
      "Corneal care demands precision: infections need culture-guided treatment, dryness and allergy need structured therapy, and dystrophies need long-term planning that may include advanced transplants.",
      "From a red painful eye after a foreign body to complex keratoconus management, we provide focused corneal evaluation and treatment under one roof.",
    ],
    symptoms: {
      title: "Cornea-related warning signs",
      items: [
        "Pain, redness and watering",
        "White spot or opacity on the cornea",
        "Light intolerance with blurred vision",
        "Repeated corneal erosions",
        "Progressive astigmatism (keratoconus)",
        "Foreign body sensation that persists",
      ],
    },
    candidates: {
      title: "Who should seek corneal care?",
      items: [
        "Contact-lens wearers with red or painful eyes",
        "Eye injury or chemical splash (emergency)",
        "Recurrent corneal infections",
        "Known keratoconus or family history",
        "Chronic severe dry eye",
        "Previous transplant needing follow-up",
      ],
    },
    options: [
      {
        title: "Infection Management",
        description:
          "Culture-guided fortified drops and disciplined review protocols for ulcers — the difference between a scar and clear vision.",
      },
      {
        title: "Keratoconus Care",
        description:
          "Topography-guided diagnosis, cross-linking to halt progression and specialty contact lenses for vision.",
      },
      {
        title: "Pterygium & Surface Surgery",
        description:
          "Conjunctival autograft technique with low recurrence rates for pterygium and surface growths.",
      },
      {
        title: "Corneal Transplants",
        description:
          "Lamellar procedures (DALK/DSEK/DSAEK) planned and coordinated with transplant-ready centres when indicated.",
      },
    ],
    approach: [
      { title: "Microscope-level detail", description: "Slit-lamp photography documents every finding for comparison over time." },
      { title: "Cause-first treatment", description: "Cultures and stains before drops — targeted therapy beats guesswork." },
      { title: "Contact-lens safety", description: "Fitting, hygiene training and annual reviews keep lens wear safe." },
      { title: "Long-term partnership", description: "Dystrophies and transplants need years of stewardship — we plan for that." },
    ],
    aftercare: [
      { title: "For ulcers", description: "Hourly drops demand discipline — our team structures the schedule so it is manageable." },
      { title: "After surface surgery", description: "Protective shell, lubrication and staged return to work over 1–2 weeks." },
      { title: "Cross-linking", description: "Mild grittiness settles in days; the stabilising effect protects vision for years." },
      { title: "Transplant care", description: "Lifetime drop schedules and rejection-warning education protect the graft." },
    ],
    faqs: [
      { q: "Is a corneal ulcer an emergency?", a: "Yes — delay of even a day can turn a treatable infection into a permanent scar. See an ophthalmologist the same day." },
      { q: "Can keratoconus be stopped?", a: "Cross-linking is designed to halt progression, especially when done early. Vision is then optimised with glasses or specialty lenses." },
      { q: "Will a transplant restore normal vision?", a: "Transplants replace scarred tissue with clear tissue; glasses or lenses are usually still needed for the sharpest vision." },
    ],
  },
  {
    id: "dry-eye",
    name: "Dry Eye Clinic",
    shortName: "Dry Eye",
    icon: Droplets,
    tagline: "Lasting relief for tired, gritty, watery eyes.",
    cardDescription:
      "Diagnosis and structured management of dry-eye disease, from lifestyle therapy to advanced treatments.",
    image: "/images/treatments/dry-eye.jpg",
    gradient: "from-jade-300 to-jade-600",
    overview: [
      "Dry eye is one of the most common — and most dismissed — eye conditions. Burning, grittiness, fluctuating blur and even watery eyes are all part of the same disrupted tear film.",
      "Screens, air-conditioning, contact lenses and certain medications steadily aggravate it. The result is eyes that feel tired by afternoon and unpredictable vision that interferes with work and reading.",
      "Our dry-eye clinic identifies your type of dryness — evaporative, aqueous-deficient or mixed — and builds a stepwise plan instead of a one-drop-fits-all approach.",
    ],
    symptoms: {
      title: "Typical dry-eye complaints",
      items: [
        "Burning, stinging or gritty sensation",
        "Stringy mucus around the eyes",
        "Eyes that water paradoxically",
        "Blurred vision that clears with blinks",
        "Heavy, tired eyes by evening",
        "Contact-lens intolerance",
      ],
    },
    candidates: {
      title: "Who is more prone?",
      items: [
        "Screen-heavy work (6+ hours daily)",
        "Age above 40, especially women",
        "Air-conditioned environments",
        "Diabetes, thyroid or autoimmune conditions",
        "Long-term antihistamine or antidepressant use",
        "Previous LASIK or cataract surgery",
      ],
    },
    options: [
      {
        title: "Tear-substitute Therapy",
        description:
          "Preservative-free lubricants selected for your tear film type, scheduled properly rather than used randomly.",
      },
      {
        title: "Lid-margin Therapy",
        description:
          "Warm compresses, lid hygiene and massage protocols that restore the oil layer — the root cause for most evaporative dryness.",
      },
      {
        title: "Anti-inflammatory Drops",
        description:
          "Short, supervised courses of cyclosporine or similar agents when inflammation drives the disease.",
      },
      {
        title: "Punctal Occlusion",
        description:
          "Tiny plugs that conserve your own tears — reversible, quick and highly effective for moderate–severe cases.",
      },
    ],
    approach: [
      { title: "Type the dryness", description: "Tear-break-up time, staining patterns and gland assessment classify your condition." },
      { title: "Fix the environment", description: "Screen height, blink habits, humidity and hydration — small changes, big relief." },
      { title: "Treat in steps", description: "Lubricants → lid therapy → anti-inflammatories → punctal plugs, reviewed at each stage." },
      { title: "Measure improvement", description: "Symptom scores and tear-film tests track progress objectively." },
    ],
    aftercare: [
      { title: "Daily habits", description: "20-20-20 screen rule, conscious blinking and night-time lubrication form the base." },
      { title: "Warm compresses", description: "A few minutes daily keeps the oil glands flowing — the most underused dry-eye treatment." },
      { title: "Review cycle", description: "Every 4–8 weeks until stable, then maintenance visits." },
      { title: "Set expectations", description: "Dry eye is managed, not cured — our goal is comfort you stop noticing." },
    ],
    faqs: [
      { q: "Can dry eye damage vision?", a: "Mild dryness mainly affects comfort, but severe untreated dryness can scar the cornea and blur vision — another reason to treat it properly." },
      { q: "Are eye drops addictive?", a: "No. Preservative-free lubricants can be used safely as advised; they support the tear film rather than suppress it." },
      { q: "Why do my watery eyes mean dryness?", a: "A poor-quality tear film triggers reflex watering. Treating the underlying dryness usually calms the reflex." },
    ],
  },
  {
    id: "pediatric",
    name: "Pediatric Ophthalmology",
    shortName: "Pediatric Care",
    icon: Baby,
    tagline: "Giving every child the clear start they deserve.",
    cardDescription:
      "Specialised eye care for children — vision screening, squint, lazy eye and developmental eye health.",
    image: "/images/treatments/pediatric.jpg",
    heroImage: "/images/hero-pediatric.jpg",
    gradient: "from-jade-400 to-jade-700",
    overview: [
      "Childhood eye problems are different from adult ones — many conditions, like lazy eye (amblyopia), can only be treated successfully while the visual system is still developing.",
      "Squint, refractive errors, congenital cataract and watering in infants all benefit from early recognition. Regular screening turns small corrections into lifelong good vision.",
      "Our pediatric approach is gentle and play-based: children feel examined while they feel explored. Parents leave understanding exactly what their child can and cannot see — and the plan to make it better.",
    ],
    symptoms: {
      title: "Signs parents should watch for",
      items: [
        "Eyes that appear crossed or drift outward",
        "Head tilt or unusual head posture",
        "Sitting too close to TV or holding books very near",
        "Frequent eye rubbing or light closing",
        "White reflex in photos or a dull red reflex",
        "Clumsiness, poor catching or avoiding fine work",
      ],
    },
    candidates: {
      title: "Recommended screening milestones",
      items: [
        "First complete exam by age 3 (earlier if concerns)",
        "Before starting school — around age 5",
        "Yearly checks during school years",
        "Premature babies (ROP screening protocol)",
        "Family history of squint or lazy eye",
        "Any sudden squint or eye deviation",
      ],
    },
    options: [
      {
        title: "Refraction & Glasses",
        description:
          "Accurate child-friendly refraction — including cycloplegic testing — with durable, well-fitted frames children actually keep on.",
      },
      {
        title: "Amblyopia (Lazy Eye) Therapy",
        description:
          "Patching and atropine regimens with structured follow-up during the critical treatment window.",
      },
      {
        title: "Squint Evaluation & Surgery",
        description:
          "Measurement of deviation and alignment surgery coordinated with experienced pediatric surgeons.",
      },
      {
        title: "Watering & Congenital Block",
        description:
          "Lacrimal system assessment and probing procedures for persistent infantile watering.",
      },
    ],
    approach: [
      { title: "Play-based exam", description: "Charts, lights and games that extract accurate answers from every age." },
      { title: "Parent partnership", description: "You see what we see — photos and explanations of your child's eyes." },
      { title: "Window-aware planning", description: "Time-sensitive conditions like amblyopia are prioritised deliberately." },
      { title: "School coordination", description: "Reports and seating/vision advice that teachers can actually use." },
    ],
    aftercare: [
      { title: "Patching discipline", description: "Stickers, calendars and review charts make lazy-eye therapy a game, not a battle." },
      { title: "Glasses care", description: "Spring hinges and straps for toddlers; we refit as your child grows." },
      { title: "Review rhythm", description: "Every 3–6 months in active treatment — children's prescriptions change fast." },
      { title: "Screen habits", description: "Age-appropriate screen time and outdoor play advice that protects developing eyes." },
    ],
    faqs: [
      { q: "My child is just 3 — can vision be tested?", a: "Absolutely. Age-appropriate charts, retinoscopy and objective techniques measure vision without needing the child to read letters." },
      { q: "Will squint go away on its own?", a: "No. True squint needs evaluation. Occasionally children 'grow out of' looking crossed-eyed (pseudostrabismus), but only an exam can tell the difference." },
      { q: "Is patching cruel?", a: "Patching is time-limited and reward-based; done correctly it is well tolerated and can permanently improve vision during the treatable years." },
    ],
  },
  {
    id: "general",
    name: "Comprehensive Eye Exam",
    shortName: "General Exam",
    icon: Eye,
    tagline: "A complete picture of your eye health — not just a number for glasses.",
    cardDescription:
      "Routine eye exams and complete eye-health check-ups for the whole family — vision, pressure, retina and counselling in one visit.",
    image: "/images/treatments/general.jpg",
    gradient: "from-jade-500 to-brand-700",
    overview: [
      "A comprehensive examination answers three questions: How well do you see? How healthy are your eyes? What should we watch in the future?",
      "We measure vision and refraction, check eye pressure, examine the front of the eye on the slit lamp and dilate to view the retina and optic nerve where needed.",
      "You leave with more than a prescription — a clear explanation, a glasses plan if needed, and a personalised screening schedule based on your age and risk factors.",
    ],
    symptoms: {
      title: "Reasons to book an exam",
      items: [
        "Blur at distance or near",
        "Headaches after reading or screens",
        "Difficulty changing focus between distances",
        "It has simply been over a year",
        "New floaters, redness or watering",
        "Before starting new work or driving licence",
      ],
    },
    candidates: {
      title: "How often should eyes be examined?",
      items: [
        "Children — every year during school",
        "Adults 20–39 — every 2 years",
        "Above 40 — yearly (glaucoma screening)",
        "Diabetics — yearly dilated exam",
        "Contact-lens users — yearly",
        "Any new eye symptom — without waiting",
      ],
    },
    options: [
      {
        title: "Vision & Refraction",
        description:
          "Subjective refraction plus cycloplegic testing when required — accurate numbers without overcorrection.",
      },
      {
        title: "Pressure & Glaucoma Screen",
        description:
          "Tonometry and optic-nerve assessment — quick, painless and potentially sight-saving after 40.",
      },
      {
        title: "Slit-lamp Examination",
        description:
          "Magnified evaluation of lids, tear film, cornea, lens and anterior chamber health.",
      },
      {
        title: "Dilated Fundus Exam",
        description:
          "A complete retinal check that catches diabetes, hypertension and retinal changes before symptoms begin.",
      },
    ],
    approach: [
      { title: "History first", description: "Your work, screens, driving and hobbies shape the exam and prescription." },
      { title: "Full evaluation", description: "Vision, pressure, anterior segment and retina — the complete circuit." },
      { title: "Explain everything", description: "Findings shown and explained; you see your own retina on screen." },
      { title: "Clear plan", description: "Glasses advice, treatment if needed and your next review date." },
    ],
    aftercare: [
      { title: "After dilation", description: "Blur and light sensitivity last 3–4 hours; sunglasses and a driver help." },
      { title: "Glasses adaptation", description: "New numbers may take a few days to feel natural — that is expected." },
      { title: "Record keeping", description: "Your pressures, numbers and retinal findings are archived for year-on-year comparison." },
      { title: "Stay on schedule", description: "We remind you when your next exam is due — healthy eyes are maintained, not assumed." },
    ],
    faqs: [
      { q: "How long does an exam take?", a: "Plan for 45–60 minutes. Dilation adds waiting time for drops to act, and we use it to examine the retina properly." },
      { q: "Can I drive after dilation?", a: "Many patients drive comfortably; if you are unsure, bring someone along or we will help you plan." },
      { q: "Do I need an exam if my vision is fine?", a: "Yes — glaucoma, early retina disease and slow prescription changes have no symptoms. Screening finds what silence hides." },
    ],
  },
  {
    id: "oculoplastics",
    name: "Oculoplastics",
    shortName: "Oculoplasty",
    icon: ScanFace,
    tagline: "Restoring comfort, protection and confidence around the eyes.",
    cardDescription:
      "Eyelid, tear-duct and orbital care — functional and cosmetic procedures around the eye, planned with precision.",
    image: "/images/surgery-suite.jpg",
    gradient: "from-jade-500 to-brand-900",
    overview: [
      "Oculoplastics covers the structures around the eye — eyelids, tear-drainage system and the orbit (eye socket). When eyelids droop, turn inward or drain poorly, they threaten comfort, clarity and the eye's surface itself.",
      "Many oculoplastic problems are functional, not just cosmetic: a droopy lid blocking the pupil, lashes rubbing the cornea, constant watering from a blocked duct or a lump that keeps returning. Fixing them protects sight as much as appearance.",
      "Every procedure starts with a function-first assessment and photography, so the surgical plan restores protection, comfort and a natural look — with scars hidden in the lid's natural creases wherever possible.",
    ],
    symptoms: {
      title: "Signs you may need oculoplastic care",
      items: [
        "A droopy upper lid covering the pupil",
        "Lid turning inward or outward with constant irritation",
        "Persistent watering or recurrent stickiness",
        "A lid lump or chalazion lasting over a month",
        "Bulging or retracted eyes, especially with thyroid disease",
        "Lid lesions, cysts or concerns about skin cancer",
      ],
    },
    candidates: {
      title: "Who benefits from an oculoplastic review?",
      items: [
        "Adults with ptosis affecting the visual axis",
        "Elderly lids turning in (entropion) or out (ectropion)",
        "Chronic watering from suspected duct blockage",
        "Recurrent or resistant chalazia",
        "Thyroid eye disease needing monitoring",
        "Cosmetic lid concerns — after honest counselling",
      ],
    },
    options: [
      {
        title: "Ptosis & Lid-Position Surgery",
        description:
          "Precise tightening and repositioning that lifts the visual axis, protects the cornea and restores a natural lid crease.",
      },
      {
        title: "Watering (Lacrimal) Treatment",
        description:
          "From probing and syringing to dacryocystorhinostomy (DCR) planning — restoring proper tear drainage step by step.",
      },
      {
        title: "Chalazion & Lid-Lump Care",
        description:
          "Conservative heat-and-massage protocols first; quick incision-and-curettage or steroid injection when a lump persists.",
      },
      {
        title: "Blepharoplasty (Functional & Cosmetic)",
        description:
          "Removal of excess lid skin and fat bags — performed for vision relief, appearance, or both, with conservative planning.",
      },
    ],
    approach: [
      { title: "Function-first assessment", description: "Lid measurements, surface health and photography decide what truly needs correcting." },
      { title: "Conservative planning", description: "We operate only when surgery clearly serves comfort, protection or vision — never on pressure." },
      { title: "Precise day-care surgery", description: "Most procedures take under an hour with local anaesthesia and meticulous, scar-conscious technique." },
      { title: "Guided aftercare", description: "Ointment schedules, suture review and staged return to normal routines." },
    ],
    aftercare: [
      { title: "After lid surgery", description: "Cold compresses and ointment for the first week; mild bruising settles in 7–10 days." },
      { title: "Sutures & healing", description: "Stitches usually come out at 5–7 days; the final lid contour settles over several weeks." },
      { title: "After chalazion removal", description: "A 24-hour patch, then drops — with lid-hygiene coaching to prevent recurrence." },
      { title: "Watering procedures", description: "Salty tears or a trace of bleeding is normal early; drainage improves progressively over weeks." },
    ],
    faqs: [
      { q: "Is eyelid surgery only cosmetic?", a: "No. Ptosis correction, entropion repair and watering procedures are functional — they restore vision, protect the cornea and stop chronic irritation." },
      { q: "Will eyelid surgery leave a visible scar?", a: "Eyelid skin heals remarkably well. Incisions are placed in natural creases, and any residual redness fades over weeks to months." },
      { q: "Does constant watering always mean surgery?", a: "Not always. Many blockages respond to probing, massage or drops; surgery such as DCR is reserved for ducts that truly need a new drainage pathway." },
    ],
  },
  {
    id: "contact-lenses",
    name: "Contact Lens Fittings",
    shortName: "Contact Lenses",
    icon: Layers,
    tagline: "Clear, comfortable lens wear built on precise fitting and safe habits.",
    cardDescription:
      "Professional contact-lens fitting, wearing training and aftercare — from daily disposables to specialty lenses.",
    image: "/images/equip-slitlamp.png",
    gradient: "from-jade-300 to-brand-700",
    overview: [
      "A contact lens is a medical device that sits directly on the cornea — which is why a proper fit matters more than a brand name. Lens shape, material and wearing pattern must match your corneal curves, tear film and daily routine.",
      "A poorly fitted lens can quietly starve the cornea of oxygen or scratch its surface, while a well-fitted one disappears on the eye and delivers vision glasses cannot always match — wider fields, no fogging, full freedom to move.",
      "Every fitting at Shiv Netralay includes corneal measurement, a supervised trial on the eye, insertion-and-removal training and a written wear-and-care plan — because safe lens wear is a habit, not a purchase.",
    ],
    symptoms: {
      title: "Signs your current lenses need review",
      items: [
        "Redness or irritation when lenses go in",
        "Blurred or fluctuating vision late in the day",
        "Eyes that feel dry after a few hours of wear",
        "Lens awareness, movement or foreign-body feeling",
        "Halos around lights or rising glare at night",
        "Repeated styes, allergies or deposits on lenses",
      ],
    },
    candidates: {
      title: "Contact lenses may suit you if",
      items: [
        "Glasses interfere with sport, work or comfort",
        "High prescriptions make spectacle lenses heavy or distorted",
        "Astigmatism needs toric lenses fitted properly",
        "Reading vision needs multifocal options after 40",
        "Keratoconus or corneal scars need specialty lenses",
        "You want occasional wear — events, travel, photos",
      ],
    },
    options: [
      {
        title: "Daily Disposable Lenses",
        description:
          "Fresh lenses every day — the healthiest, lowest-infection option, ideal for occasional wearers and sensitive eyes.",
      },
      {
        title: "Monthly Soft & Toric Lenses",
        description:
          "Economical regular wear with rotational-stability designs that keep astigmatism correction locked in place.",
      },
      {
        title: "Multifocal Lenses",
        description:
          "Distance and reading in the same lens, with fitting techniques that preserve clear intermediate vision for screens.",
      },
      {
        title: "Specialty & Therapeutic Fitting",
        description:
          "RGP, scleral and bandage lenses for keratoconus, post-graft corneas and surface disease — measured and fitted on the slit lamp.",
      },
    ],
    approach: [
      { title: "Measure, don't guess", description: "Corneal curvature, power and tear-film assessment define your ideal lens parameters." },
      { title: "Supervised trial", description: "The lens goes on your eye the same day — centration, movement and comfort checked under the slit lamp." },
      { title: "Hands-on training", description: "Insertion, removal and case hygiene practised with our team until you are fully confident." },
      { title: "Aftercare discipline", description: "A written wear schedule plus a mandatory annual review before every repeat prescription." },
    ],
    aftercare: [
      { title: "First week", description: "Build wearing hours gradually (4 → 8 per day); mild awareness settles as the eyes adapt." },
      { title: "Daily habits", description: "No tap water on lenses, case replaced every 3 months, solutions never topped up — only renewed." },
      { title: "Red eye rule", description: "A red, painful or light-sensitive eye means remove the lens and call us the same day — never wait it out." },
      { title: "Annual review", description: "Corneal health is checked under the slit lamp every year before prescriptions are renewed." },
    ],
    faqs: [
      { q: "Are contact lenses safe for long-term use?", a: "Yes — with correct fitting, disciplined hygiene and yearly check-ups. Most complications come from over-wear, sleeping in lenses or poor case hygiene, all of which are preventable habits." },
      { q: "Can I sleep in my contact lenses?", a: "Only lenses specifically certified for extended wear, and even then only as advised. Regular lenses starve the cornea of oxygen overnight and sharply raise infection risk." },
      { q: "Daily or monthly — which should I choose?", a: "It depends on how often you wear lenses. Daily disposables are the healthiest for occasional use; monthlies suit regular all-day wearers. We recommend based on your pattern, not the shelf." },
    ],
  },
];

export const getTreatment = (id?: string) =>
  TREATMENTS.find((t) => t.id === id) ?? TREATMENTS[0];

/* ── Doctors ────────────────────────────────────────────────── */
export interface Doctor {
  id: string;
  name: string;
  role: string;
  qualification: string;
  specialization: string;
  experience: string;
  experienceYears: number;
  expertise: string[];
  bio: string[];
  languages: string[];
  timings: { days: string; time: string }[];
  treatments: string[];
  reviews: { name: string; rating: number; text: string }[];
  image: string;
  departments: string[];
}

export const DOCTORS: Doctor[] = [
  {
    id: "dr-mehta",
    name: "Dr. Rajesh Mehta",
    role: "Senior Ophthalmologist & Cataract Surgeon",
    qualification: "MBBS, MS (Ophthalmology), FICO",
    specialization: "Cataract & Refractive Surgery",
    experience: "25+ years experience",
    experienceYears: 25,
    expertise: [
      "Micro-incision Phaco Cataract Surgery",
      "Premium IOL Planning (Multifocal / Toric / EDOF)",
      "LASIK & Refractive Evaluation",
      "Complex Cataract & Secondary IOLs",
    ],
    bio: [
      "Dr. Rajesh Mehta has spent over two decades restoring sight, with more than 20,000 cataract procedures to his name. His practice is built on a simple philosophy: measure meticulously, operate gently, and explain everything clearly.",
      "He trained in ophthalmology at a leading medical college and has kept pace with every generation of cataract technology — from manual SICS to micro-incision phaco and premium lens platforms.",
      "Patients know him for unhurried consultations, honest counselling about lens choices, and calm, reassuring surgical care.",
    ],
    languages: ["English", "Hindi", "Marathi"],
    timings: [
      { days: "Monday — Friday", time: "10:00 AM – 1:00 PM · 5:00 PM – 7:00 PM" },
      { days: "Saturday", time: "10:00 AM – 1:00 PM" },
    ],
    treatments: ["Cataract Care", "LASIK & Refractive Surgery", "Comprehensive Eye Exam"],
    reviews: [
      {
        name: "Sunita K.",
        rating: 5,
        text: "My mother's cataract surgery was seamless. Dr. Mehta explained the lens options patiently and the result is wonderful.",
      },
      {
        name: "Anil D.",
        rating: 5,
        text: "Very honest advice — he told me surgery could wait a year and to come back. That trust is rare.",
      },
    ],
    image: "/images/doctor-mehta.png",
    departments: ["cataract", "lasik", "general"],
  },
  {
    id: "dr-sharma",
    name: "Dr. Ananya Sharma",
    role: "Consultant Ophthalmologist",
    qualification: "MBBS, MS (Ophthalmology), FPOS",
    specialization: "Glaucoma & Medical Retina",
    experience: "15+ years experience",
    experienceYears: 15,
    expertise: [
      "Glaucoma Diagnosis & Laser Procedures",
      "Diabetic Retinopathy Screening & Injections",
      "OCT & Visual Field Interpretation",
      "Neuro-ophthalmic Evaluation",
    ],
    bio: [
      "Dr. Ananya Sharma leads the glaucoma and medical retina services at Shiv Netralay. Her focus is early detection — finding disease while it is still silent and treatable.",
      "She combines advanced imaging with careful clinical examination, and is known for explaining scans in a way patients genuinely understand.",
      "Her consultations are methodical and calm; her follow-up systems ensure that no patient's silent disease slips through the cracks.",
    ],
    languages: ["English", "Hindi"],
    timings: [
      { days: "Monday, Wednesday, Friday", time: "10:00 AM – 2:00 PM" },
      { days: "Tuesday, Thursday", time: "4:00 PM – 7:00 PM" },
    ],
    treatments: ["Glaucoma Management", "Retina Care", "Comprehensive Eye Exam"],
    reviews: [
      {
        name: "Mohan R.",
        rating: 5,
        text: "She caught my glaucoma at a very early stage during a routine check. Forever grateful for her thoroughness.",
      },
      {
        name: "Priya S.",
        rating: 5,
        text: "Explains my OCT scans line by line. For the first time I actually understand my eye condition.",
      },
    ],
    image: "/images/doctor-ananya.png",
    departments: ["glaucoma", "diabetic-retinopathy", "macular-degeneration", "general"],
  },
  {
    id: "dr-verma",
    name: "Dr. Arjun Verma",
    role: "Consultant Ophthalmologist",
    qualification: "MBBS, DNB (Ophthalmology), FAICO",
    specialization: "Cornea, Cataract & Dry Eye",
    experience: "12+ years experience",
    experienceYears: 12,
    expertise: [
      "Corneal Infection & Ulcer Management",
      "Keratoconus & Cross-linking",
      "Pterygium & Surface Surgery",
      "Advanced Dry-eye Therapy",
    ],
    bio: [
      "Dr. Arjun Verma manages the cornea and dry-eye clinics. He believes corneal care is about the details — the right culture, the right drop schedule, the right lens fit.",
      "Trained in cornea and external disease, he handles everything from emergency corneal ulcers to long-term keratoconus stewardship.",
      "His dry-eye protocols combine clinic treatment with practical lifestyle changes that fit real working lives.",
    ],
    languages: ["English", "Hindi"],
    timings: [
      { days: "Monday — Saturday", time: "11:00 AM – 2:00 PM" },
      { days: "Wednesday, Saturday", time: "5:00 PM – 7:00 PM" },
    ],
    treatments: ["Cornea Services", "Dry Eye Clinic", "Cataract Care"],
    reviews: [
      {
        name: "Kavita J.",
        rating: 5,
        text: "My dry eyes were dismissed for years. His step-by-step plan actually gave me my evenings back.",
      },
      {
        name: "Rohit P.",
        rating: 5,
        text: "Treated my corneal ulcer as an emergency and saved my vision. Extremely grateful.",
      },
    ],
    image: "/images/doctor-arjun.png",
    departments: ["cornea", "dry-eye", "cataract", "general"],
  },
  {
    id: "dr-iyer",
    name: "Dr. Priya Iyer",
    role: "Consultant Pediatric Ophthalmologist",
    qualification: "MBBS, MS (Ophthalmology), FPE",
    specialization: "Pediatric Ophthalmology & Squint",
    experience: "10+ years experience",
    experienceYears: 10,
    expertise: [
      "Child Vision Assessment & Glasses",
      "Amblyopia (Lazy Eye) Therapy",
      "Squint Evaluation & Surgical Planning",
      "Infant Watering & Lacrimal Care",
    ],
    bio: [
      "Dr. Priya Iyer specializes in children's eye care — from a baby's first watering eye to a teenager's first glasses. Her examination style is play-based, accurate and completely child-friendly.",
      "She is a strong advocate of early screening, believing that the few minutes it takes at age three can protect a lifetime of good vision.",
      "Parents value her clear explanations and practical, reward-based treatment plans that children genuinely follow.",
    ],
    languages: ["English", "Hindi", "Tamil"],
    timings: [
      { days: "Tuesday, Thursday, Saturday", time: "10:00 AM – 1:00 PM" },
      { days: "Friday", time: "4:00 PM – 7:00 PM" },
    ],
    treatments: ["Pediatric Ophthalmology", "Comprehensive Eye Exam"],
    reviews: [
      {
        name: "Deepa M.",
        rating: 5,
        text: "My 4-year-old actually enjoyed her eye test. The patching plan with reward stickers worked like magic.",
      },
      {
        name: "Suresh V.",
        rating: 5,
        text: "Very patient with special-needs children. She adapted the whole exam to my son's pace.",
      },
    ],
    image: "/images/doctor-priya.png",
    departments: ["pediatric", "general"],
  },
];

export const getDoctor = (id?: string) =>
  DOCTORS.find((d) => d.id === id) ?? DOCTORS[0];

/* ── Technology / Facilities (sample placeholders) ──────────── */
export interface TechItem {
  name: string;
  subtitle: string;
  description: string;
  image: string;
}

export const TECHNOLOGY: TechItem[] = [
  {
    name: "OCT",
    subtitle: "Optical Coherence Tomography",
    description:
      "Cross-sectional imaging of the retina and optic nerve in microns — essential for glaucoma, retina and macular care.",
    image: "/images/equip-oct.jpg",
  },
  {
    name: "Fundus Photography",
    subtitle: "Retinal Imaging",
    description:
      "Colour photographs of the retina that document diabetic and hypertensive eye disease for year-on-year comparison.",
    image: "/images/equip-fundus.png",
  },
  {
    name: "Visual Field Analysis",
    subtitle: "Perimetry",
    description:
      "Maps your complete field of vision to detect and track glaucoma and neurological visual loss.",
    image: "/images/equip-visualfield.png",
  },
  {
    name: "Slit Lamp Examination",
    subtitle: "Anterior Segment Microscopy",
    description:
      "Magnified, illuminated examination of the cornea, lens and anterior chamber — the workhorse of ophthalmology.",
    image: "/images/equip-slitlamp.png",
  },
  {
    name: "Ophthalmic Surgical Suite",
    subtitle: "Micro-surgical Equipment",
    description:
      "Operating microscope and phaco platforms designed for gentle, precise micro-incision cataract surgery.",
    image: "/images/surgery-suite.jpg",
  },
  {
    name: "Diagnostic Imaging",
    subtitle: "Retinal Assessment",
    description:
      "Integrated imaging workstation where scans are reviewed with you, so you see exactly what we see.",
    image: "/images/equip-oct-consult.jpg",
  },
];

/* ── Why choose us ──────────────────────────────────────────── */
export interface WhyItem {
  icon: "award" | "scan" | "layers" | "heart" | "building" | "calendar";
  title: string;
  description: string;
}

export const WHY_US: WhyItem[] = [
  {
    icon: "award",
    title: "Experienced Specialists",
    description:
      "Qualified ophthalmologists with subspecialty training providing focused eye care.",
  },
  {
    icon: "scan",
    title: "Advanced Technology",
    description:
      "Modern diagnostic and treatment equipment for precise, evidence-based decisions.",
  },
  {
    icon: "layers",
    title: "Comprehensive Eye Care",
    description:
      "Multiple eye-care services under one roof — from routine exams to complex surgery.",
  },
  {
    icon: "heart",
    title: "Patient-Centred Care",
    description:
      "Unhurried consultations, clear explanations and personalised treatment planning.",
  },
  {
    icon: "building",
    title: "Modern Facilities",
    description:
      "Comfortable, professionally designed clinical spaces built around patient flow.",
  },
  {
    icon: "calendar",
    title: "Convenient Appointments",
    description:
      "A simple appointment-request experience with minimal waiting and clear communication.",
  },
];

/* ── Find the right eye care ────────────────────────────────── */
export interface SymptomChip {
  label: string;
  treatmentId: string;
}

export const SYMPTOMS: SymptomChip[] = [
  { label: "Blurred Vision", treatmentId: "general" },
  { label: "Cloudy / Foggy Vision", treatmentId: "cataract" },
  { label: "Frequent Spectacle Change", treatmentId: "cataract" },
  { label: "Want Freedom from Glasses", treatmentId: "lasik" },
  { label: "Eye Pain / Redness", treatmentId: "cornea" },
  { label: "Gritty, Burning Eyes", treatmentId: "dry-eye" },
  { label: "Loss of Side Vision", treatmentId: "glaucoma" },
  { label: "Floaters / Flashes", treatmentId: "diabetic-retinopathy" },
  { label: "Diabetes & Eyes", treatmentId: "diabetic-retinopathy" },
  { label: "Wavy or Distorted Lines", treatmentId: "macular-degeneration" },
  { label: "Droopy Lid / Watering Eyes", treatmentId: "oculoplastics" },
  { label: "Squint / Eye Deviation", treatmentId: "pediatric" },
  { label: "Child Eye Problems", treatmentId: "pediatric" },
  { label: "Routine Full Check-up", treatmentId: "general" },
];

/* ── Patient journey ────────────────────────────────────────── */
export interface JourneyStep {
  step: string;
  icon: "calendar" | "doctor" | "scan" | "heart";
  title: string;
  description: string;
}

export const JOURNEY: JourneyStep[] = [
  {
    step: "01",
    icon: "calendar",
    title: "Book Appointment",
    description: "Choose a convenient time online or over a phone call.",
  },
  {
    step: "02",
    icon: "doctor",
    title: "Consultation",
    description: "Meet our specialist and discuss your concerns in detail.",
  },
  {
    step: "03",
    icon: "scan",
    title: "Diagnosis",
    description: "A thorough eye evaluation with modern diagnostic testing.",
  },
  {
    step: "04",
    icon: "heart",
    title: "Treatment Plan",
    description: "A personalised care plan with clear costs and timelines.",
  },
];

/* ── Testimonials (sample placeholders) ─────────────────────── */
export interface Testimonial {
  quote: string;
  name: string;
  treatment: string;
  rating: number;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Excellent experience from consultation to treatment. Everything was explained clearly and my vision after cataract surgery is better than it has been in years.",
    name: "Ramesh Kulkarni",
    treatment: "Cataract Surgery",
    rating: 5,
  },
  {
    quote:
      "The clinic feels calm and organised. My LASIK evaluation was thorough and honest — I was told exactly what to expect and the result matches perfectly.",
    name: "Neha Deshmukh",
    treatment: "LASIK Evaluation",
    rating: 5,
  },
  {
    quote:
      "Dr. Sharma detected my early glaucoma during a routine visit. The scans were explained patiently and my treatment keeps everything stable. Truly grateful.",
    name: "Mohan Rao",
    treatment: "Glaucoma Care",
    rating: 5,
  },
  {
    quote:
      "Took my daughter for her first eye check. The doctor made it feel like play, and we finally have a clear plan for her lazy eye treatment.",
    name: "Deepa Menon",
    treatment: "Pediatric Eye Care",
    rating: 5,
  },
  {
    quote:
      "Years of dry, tired eyes — treated with a proper plan instead of just drops. The difference in my workday comfort is remarkable.",
    name: "Kavita Joshi",
    treatment: "Dry Eye Clinic",
    rating: 5,
  },
];

/* ── Blog / Eye care insights ───────────────────────────────── */
export interface BlogPost {
  title: string;
  excerpt: string;
  readTime: string;
  category: string;
  icon: "eye" | "calendar" | "sparkles" | "shield" | "baby" | "droplets";
}

export const BLOG_POSTS: BlogPost[] = [
  {
    title: "Understanding Cataracts: Signs, Timing and Treatment",
    excerpt:
      "Cataract is the world's leading cause of treatable blindness. Learn how it develops, when surgery makes sense and what modern lens options offer.",
    readTime: "5 min read",
    category: "Cataract",
    icon: "eye",
  },
  {
    title: "When Should You Get Your Eyes Checked?",
    excerpt:
      "Eye exams do more than update your glasses. A practical age-wise screening guide for children, adults, diabetics and everyone above 40.",
    readTime: "4 min read",
    category: "Eye Health",
    icon: "calendar",
  },
  {
    title: "LASIK: What You Should Know Before You Decide",
    excerpt:
      "Corneal thickness, prescription stability and honest expectations — the three things that matter most in refractive surgery.",
    readTime: "6 min read",
    category: "Refractive",
    icon: "sparkles",
  },
  {
    title: "Understanding Glaucoma: The Silent Thief of Sight",
    excerpt:
      "It has no symptoms until vision is already lost. Here is who should be screened, how often, and what treatment really involves.",
    readTime: "5 min read",
    category: "Glaucoma",
    icon: "shield",
  },
];

/* ── FAQ ────────────────────────────────────────────────────── */
export interface FaqItem {
  q: string;
  a: string;
}

export const FAQS: FaqItem[] = [
  {
    q: "What happens during my first eye consultation?",
    a: "Your first visit includes a detailed history, vision testing, refraction, eye-pressure check, slit-lamp examination and — when indicated — a dilated retinal examination. Plan for about an hour so the evaluation is never rushed.",
  },
  {
    q: "How often should I get my eyes examined?",
    a: "Children during school years: yearly. Adults 20–39: every two years. Everyone above 40: yearly, because glaucoma screening becomes important. Diabetics and contact-lens users need yearly dilated exams regardless of age.",
  },
  {
    q: "When should cataract surgery be considered?",
    a: "When your vision starts interfering with daily life — reading, driving, cooking or working. Modern cataract surgery does not require the cataract to 'ripen'; the right time is simply when blur affects your lifestyle.",
  },
  {
    q: "Is LASIK suitable for everyone?",
    a: "No — and honest screening is what protects you. Suitability depends on corneal thickness and shape, prescription stability, age and eye health. A proper evaluation tells you which option (if any) is right for your eyes.",
  },
  {
    q: "Do I need an appointment, or can I walk in?",
    a: "Appointments keep waiting minimal and guarantee time with the right specialist. Walk-ins are accommodated whenever possible, but booked patients are always prioritised during busy hours.",
  },
  {
    q: "What should I bring to my eye consultation?",
    a: "Your current glasses or contact lenses (with box or prescription), previous eye records or reports, a list of current medicines, and sunglasses — dilation can blur near vision for a few hours.",
  },
  {
    q: "How long does an eye examination take?",
    a: "A comprehensive exam takes 45–60 minutes. If dilation is needed, allow an extra 30–45 minutes for the drops to act and the examination to complete.",
  },
  {
    q: "Do you provide pediatric eye care?",
    a: "Yes. Children are examined with age-appropriate, play-based techniques — from infant watering and squint to lazy-eye therapy and school vision screening.",
  },
];

/* ── Appointment departments ────────────────────────────────── */
export const DEPARTMENTS = TREATMENTS.map((t) => ({
  id: t.id,
  name: t.shortName,
  icon: t.icon,
}));
