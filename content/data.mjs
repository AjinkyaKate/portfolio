// All site content lives here. Edit this file, then run `node build.mjs`.
// Anything marked [[fill]] is a placeholder for Ajinkya to replace.

export const site = {
  name: "Ajinkya Kate",
  title: "Product Manager",
  description:
    "Portfolio of Ajinkya Kate, a product manager based in Pune, India. Shipping AI features, new revenue channels and integrations.",
  email: "ajinkyakate2001@gmail.com",
  lastUpdated: "October 2026",
  year: "2026",
  links: [
    { label: "Email", href: "mailto:ajinkyakate2001@gmail.com", icon: "mail" },
    { label: "GitHub", href: "https://github.com/AjinkyaKate", icon: "github" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/ajinkya-kate", icon: "linkedin" },
    { label: "X", href: "https://x.com/Ajinkya_Kate_", icon: "x" },
  ],
};

// Bio paragraphs. `html` is allowed for inline links and the underline span.
export const bio = [
  `Hi, I'm Ajinkya, a <span class="underline">product manager</span> based in Pune, India.`,
  `Most recently I was the AI PM at Modisoft, where I shipped a <a class="inline-link" href="/projects/invoice-reader/">document intelligence</a> feature that reads supplier invoices into the catalog, and took a <a class="inline-link" href="/projects/demand-forecasting/">demand forecasting</a> module from idea to pilot. Before that I spent a year and a half at D·engage launching an RCS channel across 150+ enterprise clients and a Snapchat audience sync that reached $6K MRR in two sprints.`,
  `I care about products that turn new channels into revenue, and I build small tools myself to stay close to how things actually work.`,
  `Want to work together? <a class="inline-link" target="_blank" rel="noopener noreferrer" href="https://cal.com/ajinkya-kate/30min">Book a call</a> or reach out on <a class="inline-link" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/ajinkya-kate">LinkedIn</a>.`, // [[fill]] real cal.com link
];

// Projects. The first `initialCount` show by default; the rest appear after "See more".
export const projectsInitialCount = 2;

export const projects = [
  {
    slug: "demand-forecasting",
    title: "Demand Forecasting",
    description: "Turning months of unused POS data into a weekly order decision for store owners.",
    category: "Product",
    year: "2026",
    media: { type: "video", src: "/projects/demand-forecast/walkthrough.mp4", poster: "/projects/demand-forecast/poster.png", thumb: "/projects/demand-forecast/hero-light.png", bg: true },
    links: [
      { label: "GitHub", href: "https://github.com/AjinkyaKate/demand-forecast-dashboard", icon: "github" },
      { label: "Visit site", href: "https://demand-forecast-dashboard-drab.vercel.app", icon: "globe" },
    ],
    sections: [
      {
        id: "usecase",
        title: "The use case",
        paragraphs: [
          "Convenience stores and gas stations order stock from habit. The owner knows roughly what sells and places the same order every week, then loses sales on the days that spike and throws out stock on the weeks that do not. Meanwhile months of sales history sit in the POS, unused.",
          "At Modisoft I was the AI product manager for this module. The opportunity was not building a model. It was turning data the store already had into a decision the owner would actually act on: how much of this do I order this week.",
        ],
      },
      {
        id: "data",
        title: "What the data could and could not say",
        paragraphs: [
          "Fuel and in-store items are two different problems under one name. Fuel moves with price, weather and what is happening nearby. Items move with the weekday, promotions and holidays. One model for both would have been mediocre for both, so they got separate views and separate signals from the start.",
          "History is thin for a lot of items and brand new for new stores. The spec had to say what happens then, because a confident forecast on three weeks of data is worse than an honest blank. Thin-history items fall back to simpler rules and say so.",
          "Local events and weather went in as inputs for fuel after it became clear that was where the big misses lived.",
        ],
      },
      {
        id: "method",
        title: "Choosing how to forecast",
        paragraphs: [
          "I did not want to pick a forecasting method in a meeting. So the prototype has a Model Lab: the same store's data run through several methods side by side, with their errors on past weeks. Where the methods agree, the forecast is safe. Where they disagree, that is the honest picture, and the owner should see it rather than one number pretending to be sure.",
          "That is also why every forecast is shown as a range with a one-line reason, not a point. A single number invites an argument. A range plus the reason it moved gets acted on, and when the owner disagrees they can see what the model missed.",
        ],
        figure: "/projects/demand-forecast/lab-light.png",
      },
      {
        id: "owner",
        title: "Designing for an owner, not an analyst",
        paragraphs: [
          "The person using this is standing behind a counter, not sitting at a desk. So the flow is short: drop a sales CSV, map the date, item and quantity columns once, pick a store, read the suggested order. The forecast is the reasoning behind that number, not the headline.",
          "A drivers panel says what moved each number in plain words. The suggestion can be overridden in one tap and the override is kept, because a forecast that fights the person using it gets switched off.",
          "Charts are built so the colours still read for colour-blind owners, and the sidebar folds away so the numbers get the screen.",
        ],
        figure: "/projects/demand-forecast/hero-light.png",
      },
      {
        id: "prototype",
        title: "Why I built the prototype myself",
        paragraphs: [
          "I wrote the requirements and the engineering team built the production models. But I wanted to put layouts and explanations in front of people before engineering committed, so I built this dashboard and iterated on it with real feedback. It changed my spec more than any meeting did.",
          "The dashboard above is live. Try it with your own sales CSV, switch to Fuel for the price-and-weather view, or open Model Lab to watch the methods disagree.",
        ],
        figure: "/projects/demand-forecast/data-light.png",
      },
      {
        id: "status",
        title: "Where it stands",
        paragraphs: [
          "The module is in pilot with customers. The pilot is judged on two numbers: stockouts avoided and expired stock reduced. Everything else is a vanity metric.",
          "Next is turning the suggested quantity into a one-click purchase order to the supplier, so the decision and the action are the same tap.",
        ],
        figure: "/projects/demand-forecast/fuel-light.png",
      },
      {
        id: "built",
        title: "Built with",
        tags: ["Time-series forecasting", "Event and weather signals", "Model comparison lab", "Next.js", "SQLite"],
        paragraphs: [],
      },
    ],
  },
  {
    slug: "invoice-reader",
    title: "Document Intelligence",
    description: "Getting store owners to trust an AI that changes their prices.",
    category: "AI feature",
    year: "2026",
    media: { type: "video", src: "/projects/invoice-reader/walkthrough.mp4", poster: "/projects/invoice-reader/poster.png", thumb: "/projects/invoice-reader/poster.png", bg: true },
    links: [
      { label: "GitHub", href: "https://github.com/AjinkyaKate/ocr-invoice-tester", icon: "github" },
      { label: "Visit site", href: "https://invoice-reader-bice.vercel.app", icon: "globe" },
    ],
    sections: [
      {
        id: "usecase",
        title: "The use case",
        paragraphs: [
          "A convenience store gets deliveries every day, and every delivery comes with a paper invoice. The supplier's prices on that paper are the truth about the store's cost, and almost none of it makes it into the system. On a busy day nobody types it in. So the catalog drifts: cost prices go stale, margins look better than they are, and reorders are decided on wrong numbers.",
          "At Modisoft this was the first AI feature I owned. On paper the ask was OCR. In practice the job was to get a store owner to let software change their prices and still feel in control.",
        ],
      },
      {
        id: "models",
        title: "Choosing the reading model",
        paragraphs: [
          "I did not want to write requirements for a model I had not seen fail. So before the spec, I took one real invoice in two forms, a clean scan and a phone photo, listed the 34 fields on it, and ran the candidate vision models against both.",
          "The scan was easy for everyone. The photo separated them. One model read all 34 fields on both but took 30 to 55 seconds per document. Another read 34 on the scan and 33 on the photo in about 9 seconds. A couple of others were either too slow to be usable or rate-limited before I could finish.",
          "That gave me the product shape. The slower, more accurate reader does the extraction. The faster reasoning model handles the conversation around it. And because free-tier models stall, each one gets 45 seconds before the next in line takes over, so a reading never hangs on one provider.",
          "For the live test build I added a plain OCR service underneath, because it returns the position of every word on the page. The language models read better, but the owner needs to see where a number came from, and that needs coordinates.",
        ],
      },
      {
        id: "nochat",
        title: "Why it is not a chatbot",
        paragraphs: [
          "My first prototype was a chat window: drop the invoice, ask questions, get answers. It worked and I dropped it. A chat box is the obvious shape for an AI feature and the wrong shape for this job. Nobody wants to talk to their invoices. They want them done.",
          "So the product became an inbox. Invoices arrive, sit in Reading while the model works, move to Needs you if anything is uncertain, and land in Done once approved. The owner's attention goes only where the model is not sure.",
        ],
      },
      {
        id: "review",
        title: "The review screen",
        paragraphs: [
          "The invoice image sits on the left, the extracted lines on the right. Hover a line and its source lights up on the image. Every number is traceable to a spot on the paper, which is what makes a wrong number forgivable: you can see why it happened and fix it in place.",
          "Clean lines pass through quietly. Only flagged lines ask for a decision: a value the model was unsure of, a product that did not match the catalog, a price that jumped. Review takes seconds instead of minutes, and the keyboard does most of it.",
          "Nothing writes to the catalog until the owner approves. That one rule did more for trust than any accuracy number, and the catalog keeps a change history so every price can be traced back to an invoice and a person.",
          "On the live build a receipt reads in about 8 seconds and a six-item invoice in about 13, with every value outlined on the image.",
        ],
      },
      {
        id: "intake",
        title: "Meeting the invoice where it is",
        paragraphs: [
          "Owners already photograph invoices on their phones to send to someone. So intake over WhatsApp sits next to upload and email: forward the photo, get a reply with Approve all, Review on web or Reject. The app should fit the habit, not create a new one.",
        ],
      },
      {
        id: "learned",
        title: "What it taught me",
        paragraphs: [
          "Test the model yourself before you write the spec. The 34-field checklist replaced a page of prose and settled most arguments about whether the model or the requirement was wrong.",
          "Design the correction path first. A model that is right most of the time with a two-second fix beats a slightly better model with no way to fix the rest.",
          "The reader above is my own test build and it is live at Modisoft's scale this feature runs with real customers. Next is learning from overrides so the same correction is never asked twice.",
        ],
      },
      {
        id: "built",
        title: "Built with",
        tags: ["Vision LLM extraction", "OCR word positions", "Model fallback chain", "Approve-first inbox", "WhatsApp intake"],
        paragraphs: [],
      },
    ],
  },
];

// Blog posts. Shown as a list on the homepage, each gets its own page at /blog/<slug>/.
export const posts = [
  {
    slug: "why-did-i-choose-to-become-a-pm",
    title: "Why did I choose to become a PM?",
    description: "The journey of how I got into product management",
    date: "2022-04-21",
    readTime: "2 min read",
    canonical: "https://medium.com/@Ajinkya_Kate/why-did-i-choose-to-become-a-pm-521868f74618",
    media: { type: "image", src: "/projects/why-pm.jpeg", fit: "contain" },
    sections: [
      {
        id: "story",
        paragraphs: [
          "Myself Ajinkya,",
          "I\u2019ll like to take you on the journey of how I got into PM.",
          "I began my journey into the field of Product Management (PM) after completing my high school education and enrolling in an engineering program at a well-known college in Pune. Being from a small town, the bustling city and its modern infrastructure fascinated me and left a lasting impression.",
          "Alongside my flatmate and close friend, I decided to pursue our shared dream of starting a technology-based startup that would provide solutions to real-world problems. We began by acquiring the necessary skills and knowledge to make this a reality. But as we progressed with our startup project, we began to realize that simply learning how to code and create prototypes would not be enough to ensure success.",
          "Through interactions with other startup owners, we were introduced to the concept of creating a valuable product that truly meets the needs and wants of customers. This sparked my interest in PM and I began to research the field more in-depth. The more I learned about PM, the more I appreciated the importance of product development and the role of PM in creating and managing successful products.",
          "Eventually, my passion for PM overtook my interest in coding, and I dedicated myself fully to becoming an expert in the field. Now, I am on a journey to build and deliver products that are not only technologically advanced but also user-centric and valuable to the end user.",
        ],
      },
    ],
  },
  // Draft by Claude, unpublished until Ajinkya rewrites it in his own words (the [[fill]] note keeps it off the site).
  {
    note: "[[fill]] rewrite in Ajinkya's voice before publishing",
    slug: "requirements-when-the-model-is-the-unknown",
    title: "Writing requirements when the model is the unknown",
    description: "What changed in my PRDs after shipping two AI features",
    date: "2026-10-30",
    readTime: "5 min read",
    media: { type: "image", src: "/projects/blog-requirements.svg" },
    sections: [
      {
        id: "intro",
        title: "The old way stopped working",
        paragraphs: [
          "For most features a requirements document describes behaviour. Given this input, show this output. The engineer builds it, QA checks it, done.",
          "AI features break that contract. The same invoice photo can come back with a different total on two runs. A forecast is never right, only close. If I wrote requirements the old way, every bug report became an argument about whether the model was wrong or the spec was.",
        ],
      },
      {
        id: "ranges",
        title: "Specify the acceptable range, not the answer",
        paragraphs: [
          "The first change was to stop writing expected outputs and start writing acceptable ones. For the invoice reader that meant a field-level accuracy target on a fixed set of real invoices, and a list of fields where a miss was unacceptable, like the supplier name and the total.",
          "For forecasting it meant defining the error band we could live with per category and agreeing on what happened when history was too thin to forecast at all.",
        ],
      },
      {
        id: "eval",
        title: "Bring the evaluation set, not just the user story",
        paragraphs: [
          "The most useful thing I added to any PRD this year was a folder of thirty real invoices with the correct values typed out by hand. It replaced a page of prose.",
          "Engineers tested against it. I tested candidate models against it before we chose one. When something regressed, the conversation was about invoice number 17, not about feelings.",
        ],
      },
      {
        id: "review",
        title: "Design the review step before the happy path",
        paragraphs: [
          "Both features shipped with a human approval step, and in both cases that step was what made customers trust the output. I now design the override flow first and treat the automated path as the thing that earns its way out of review.",
          "A model that is right 95 percent of the time with a two-second review beats one that is right 98 percent of the time with no way to fix the other two.",
        ],
      },
      {
        id: "close",
        title: "What stayed the same",
        paragraphs: [
          "The discovery did not change. Store owners still told me the real problem in stories, not in feature requests. The job was still to find the question they actually had, like how much should I order this week, and build toward that.",
          "The model is the unknown. The user never was.",
        ],
      },
    ],
  },
];
