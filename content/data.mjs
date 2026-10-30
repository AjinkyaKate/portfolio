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
        id: "start",
        title: "Where this started",
        paragraphs: [
          "At Modisoft I was the AI product manager for convenience stores and gas stations. Every store had months of sales history sitting in the POS, and almost nobody used it to decide what to order. Ordering was done from habit and memory.",
          "That gap was the whole opportunity. The data was already there. Nothing turned it into a decision.",
        ],
      },
      {
        id: "found",
        title: "What I found",
        paragraphs: [
          "The mistake runs in both directions. Empty shelves on a busy day lose the sale and the customer. Over-ordering on a quiet week means expired stock in the bin. Owners felt both, and had no way to see which one was costing them more.",
          "Fuel and in-store items are different problems wearing the same name. Fuel moves with price, weather and what is happening nearby. Items move with the day of the week, promotions and holidays. One model for both would have been wrong for both.",
          "The real question an owner has is not \"what is my forecast\". It is \"how much of this should I order this week\". If the product did not answer that, the forecast was trivia.",
        ],
      },
      {
        id: "calls",
        title: "The calls I made",
        paragraphs: [
          "Answer the order question, not the forecast question. Every screen ends in a suggested order quantity. The forecast is the reasoning behind it, not the headline.",
          "Show a range with a reason, not a single number. A point forecast invites an argument. A range plus one line on what moved it gets acted on, and when the owner disagrees they can see what the model missed.",
          "Keep the owner in control. The suggestion can be overridden in one tap, and the override is kept. A forecast that fights the person using it will be switched off.",
          "Split fuel and items into separate views from day one, with their own signals. Local events and weather were specified as inputs for fuel because that is where the misses were.",
          "I wrote the requirements and the engineering team built the production models. To test the layouts and the explanations before they committed, I built this dashboard myself and put it in front of people.",
        ],
        figure: "/projects/demand-forecast/lab-light.png",
      },
      {
        id: "shipped",
        title: "What shipped",
        paragraphs: [
          "The module is in pilot with customers. The prototype above is live: drop in a sales CSV, map the date, item and quantity columns once, and you get a per-store forecast with a suggested order and a drivers panel that says why.",
          "Switch to Fuel for the price-and-weather view, or open Model Lab to see how different forecasting methods disagree on the same data. That disagreement is the honest picture, and I wanted owners to see it.",
        ],
        figure: "/projects/demand-forecast/hero-light.png",
      },
      {
        id: "learned",
        title: "What I learned",
        paragraphs: [
          "Explanations are the product. The accuracy work mattered, but trust came from the one line that said why the number moved.",
          "A PM who can put a rough prototype in front of a user gets better requirements than one who only writes documents. The dashboard changed my spec more than any meeting did.",
          "The pilot will be judged on two numbers: stockouts avoided and expired stock reduced. Everything else is a vanity metric.",
        ],
        figure: "/projects/demand-forecast/fuel-light.png",
      },
      {
        id: "built",
        title: "Built with",
        tags: ["Time-series forecasting", "Event and weather signals", "Next.js", "SQLite", "Vercel"],
        paragraphs: [],
        figure: "/projects/demand-forecast/data-light.png",
      },
    ],
  },
  {
    slug: "invoice-reader",
    title: "Document Intelligence",
    description: "Getting store owners to trust an AI that changes their prices.",
    category: "AI feature",
    year: "2026",
    media: { type: "image", src: "/projects/invoice-reader.svg", bg: false },
    links: [],
    sections: [
      {
        id: "start",
        title: "Where this started",
        paragraphs: [
          "Every delivery to a convenience store arrives with a paper invoice. Someone is supposed to key it into the system. On busy days nobody does, so the catalog slowly stops matching reality: cost prices go stale, margins look better than they are, and reorder decisions are made on wrong numbers.",
          "At Modisoft this was the first AI feature I owned. The ask sounded like OCR. The problem was trust.",
        ],
      },
      {
        id: "found",
        title: "What I found",
        paragraphs: [
          "Invoices come in three shapes: crumpled paper, phone photos and PDFs. Any solution that only handled the clean case would be ignored on the day it mattered.",
          "The owner does not want to read a chatbot's summary of an invoice. They want the catalog updated correctly, and they want to be sure nothing was changed behind their back. A wrong price written silently is worse than no automation at all.",
          "Before writing the requirements I tested candidate vision models myself on a real invoice, one clean scan and one phone photo, against a 34-field checklist. The gap between models was small on the scan and large on the photo. That told me where the review step had to be.",
        ],
      },
      {
        id: "calls",
        title: "The calls I made",
        paragraphs: [
          "Approve first, then apply. Nothing writes to the catalog on its own. The owner sees the invoice image and the proposed changes side by side and confirms. Trust came from this step, not from any accuracy claim.",
          "Only show what needs a decision. Clean lines pass through quietly. Flagged lines, where the model was unsure or the price moved a lot, are the only ones that ask for attention. Review takes seconds instead of minutes.",
          "Every extracted value points back to where it sits on the invoice. If the owner cannot see where a number came from, they will not accept it.",
          "No chat interface. I had a chat prototype and dropped it. A chatbot is the obvious shape for an AI feature and the wrong shape for this job. An inbox with Reading, Needs you and Done fits how the work actually happens.",
          "Meet the invoice where it is. Owners already photograph invoices on their phones, so intake over WhatsApp was specified alongside upload, with reply buttons to approve or open the review.",
        ],
      },
      {
        id: "shipped",
        title: "What shipped",
        paragraphs: [
          "The invoice reader is live with Modisoft customers. A photo or PDF goes in, line items come out matched to catalog products, and the owner approves the changes from a review screen.",
          "The catalog keeps a change history, so every price that moved can be traced back to the invoice and the person who approved it.",
        ],
      },
      {
        id: "learned",
        title: "What I learned",
        paragraphs: [
          "A model that is right most of the time with a two-second review beats a slightly better model with no way to fix the rest. Design the override before the happy path.",
          "Testing the models myself, on real invoices, made the requirements concrete. The field-level checklist replaced a page of prose and ended most arguments about whether the model or the spec was wrong.",
          "Next is learning from overrides, so the same correction is never asked twice.",
        ],
      },
      {
        id: "built",
        title: "Built with",
        tags: ["Vision LLM extraction", "Product matching", "Approve-first review flow", "WhatsApp intake"],
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
