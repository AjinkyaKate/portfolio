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
    { label: "Email", href: "mailto:ajinkyakate2001@gmail.com" },
    { label: "GitHub", href: "https://github.com/AjinkyaKate" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/ajinkya-kate" },
    { label: "Twitter", href: "https://x.com/ajinkya_kate" }, // [[fill]] real handle
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
    description: "A forecasting module for convenience-store items and fuel, from idea to customer pilot.",
    category: "Product",
    year: "2026",
    media: { type: "image", src: "/projects/demand-forecasting.svg", bg: true },
    links: [],
    sections: [
      {
        id: "overview",
        title: "Overview",
        paragraphs: [
          "Role: AI Product Manager at Modisoft. I owned discovery, requirements and the pilot.",
          "Year: 2026. Status: In pilot with customers.",
          "Modisoft serves convenience stores and gas stations. Owners decide what to order mostly from memory, and get it wrong in both directions: empty shelves on busy days and expiring stock on quiet ones.",
        ],
      },
      {
        id: "problem",
        title: "The Problem",
        paragraphs: [
          "Store owners already had sales history in the POS, but nothing turned it into a buying decision.",
          "Fuel and in-store items behave differently. Fuel moves with price, weather and local events. Items move with weekday patterns, promotions and holidays.",
          "The question I kept hearing in discovery calls was simple: how much of this should I order this week?",
        ],
      },
      {
        id: "built",
        title: "What I Built",
        paragraphs: [
          "A forecasting module with two views: items and fuel. Each shows the next period's expected demand, the confidence range and the suggested order quantity.",
          "I wrote the requirements for the model inputs, the fallbacks when history is thin, and the explanation shown next to every number so an owner can trust it or override it.",
          "Local events and weather were added as signals after the first pilot showed holiday weeks were the biggest misses.",
        ],
      },
      {
        id: "design",
        title: "Design Decisions",
        paragraphs: [
          "Show a range, not a point. A single number invited arguments. A range with a suggested order got acted on.",
          "Every forecast says why in one line. Owners override forecasts they do not understand, so the explanation is part of the product, not a tooltip.",
          "Start with the top fifty items by revenue. Forecasting the long tail added noise and no money.",
        ],
      },
      {
        id: "tech",
        title: "Tech Stack",
        tags: ["Time-series models", "POS sales data", "Event and weather signals", "Next.js dashboard"],
        paragraphs: [
          "Engineering built the models. My job was the inputs, the outputs, the edge cases and the pilot plan.",
          "I also rebuilt the dashboard myself as a prototype to test layouts with owners before engineering committed.",
        ],
      },
      {
        id: "next",
        title: "What's Next",
        paragraphs: [
          "Turning the suggested quantity into a one-click purchase order to the supplier.",
          "Measuring the pilot on two numbers: stockouts avoided and expired stock reduced.",
        ],
      },
    ],
  },
  {
    slug: "invoice-reader",
    title: "Document Intelligence",
    description: "An invoice reader that turns supplier invoices into catalog updates, live with customers.",
    category: "AI feature",
    year: "2026",
    media: { type: "image", src: "/projects/invoice-reader.svg", bg: false },
    links: [],
    sections: [
      {
        id: "overview",
        title: "Overview",
        paragraphs: [
          "Role: AI Product Manager at Modisoft. I wrote the requirements and ran the rollout.",
          "Year: 2026. Status: Live with customers.",
          "Every delivery to a convenience store comes with a paper invoice. Someone types it into the system, or more often does not, and the catalog drifts away from reality.",
        ],
      },
      {
        id: "problem",
        title: "The Problem",
        paragraphs: [
          "Cost prices in the catalog were stale, so margins were wrong and reorder decisions were wrong.",
          "Manual entry took an hour a day for a busy store and was skipped on busy days, which were exactly the days it mattered.",
          "Invoices arrive as crumpled paper, phone photos and PDFs. Any solution had to handle all three.",
        ],
      },
      {
        id: "built",
        title: "What I Built",
        paragraphs: [
          "An invoice reader that takes a photo or PDF, extracts the line items with a vision model, and matches them to catalog products.",
          "Nothing writes to the catalog on its own. The owner sees a review screen with the invoice image and the proposed changes side by side, and only flagged lines need a decision.",
          "I tested candidate models on real invoices myself, with a 34-field checklist, before we picked one.",
        ],
      },
      {
        id: "design",
        title: "Design Decisions",
        paragraphs: [
          "Approve first, then apply. Trust came from the review step, not from accuracy claims.",
          "Highlight the source. Every extracted value links back to where it sits on the invoice image.",
          "Only show what needs a decision. Clean lines pass through quietly so review takes seconds, not minutes.",
        ],
      },
      {
        id: "tech",
        title: "Tech Stack",
        tags: ["Vision LLM OCR", "Product matching", "Review workflow", "WhatsApp intake"],
        paragraphs: [
          "Engineering built the pipeline. I owned the extraction schema, the matching rules, the review UX and the model evaluation.",
          "WhatsApp intake was added so owners can forward an invoice photo without opening the app.",
        ],
      },
      {
        id: "next",
        title: "What's Next",
        paragraphs: [
          "Learning from overrides so the same correction is never asked twice.",
          "Extending the same reader to credit notes and purchase orders.",
        ],
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
