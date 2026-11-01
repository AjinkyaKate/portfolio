// All site content lives here. Edit this file, then run `node build.mjs`.
// Anything marked [[fill]] is a placeholder for Ajinkya to replace.

// Opens a Gmail compose window with the address, subject and a first line already filled in.
const gmailCompose = (to, subject, body) =>
  `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
const emailHref = gmailCompose(
  "ajinkyakate2001@gmail.com",
  "Hi Ajinkya, found you through your portfolio",
  "Hi Ajinkya,\n\nI came across your portfolio and wanted to talk about ",
);

export const site = {
  name: "Ajinkya Kate",
  title: "Product Manager",
  description:
    "Portfolio of Ajinkya Kate, a product manager based in Pune, India. Shipping AI features, new revenue channels and integrations.",
  email: "ajinkyakate2001@gmail.com",
  lastUpdated: "October 2026",
  year: "2026",
  links: [
    { label: "Email", href: emailHref, icon: "mail" },
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
  `Want to work together? <a class="inline-link" target="_blank" rel="noopener noreferrer" href="/call">Book a call</a>, <a class="inline-link" target="_blank" rel="noopener noreferrer" href="${emailHref}">send me an email</a> or reach out on <a class="inline-link" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/ajinkya-kate">LinkedIn</a>.`,
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
        id: "backtest",
        title: "Testing the models on five stores",
        paragraphs: [
          "Before writing a line of the spec, we took the sales history of five stores and backtested it. The idea is simple: give the model most of the history, hide the most recent weeks from it, ask it to forecast those weeks, then compare with what the store actually sold. We ran several time series models through the same test and looked at two numbers for each: how far off it was, and which way it was off.",
          "That second number, the bias percentage, taught me more than accuracy did. A model can look fine on average and still under-forecast every week, which for an owner means stockouts every week. Another model can be a little less accurate but swing both ways, which is far easier to live with. We spent most of our time on bringing bias down, not chasing a prettier accuracy figure.",
          "Doing this with real store data instead of a demo dataset is what made the later conversations with engineering concrete. We were not arguing about which model sounds better. We had the misses in front of us.",
        ],
        figure: "/projects/demand-forecast/lab-light.png",
      },
      {
        id: "external",
        title: "What the history could not explain",
        paragraphs: [
          "The backtest showed where the big misses lived, and most of them were things the sales history alone could never know. So the research turned into a list of outside factors and a question for each: can we get this data, and does it move the number?",
          "Zero-sales days were the first trap. A day with zero sold can mean nobody wanted it, or it can mean the shelf was empty. The model cannot tell the difference, and if you feed it stockouts as zero demand it learns to order less of exactly the items that ran out. Packaging changes were the second. When a product moves from one pack size to another, the POS sees a new item with no history and the old one with a dead tail, and the forecast for both goes wrong unless someone links them.",
          "Then the world outside the store. A sports match or a local event nearby changes a day completely. Fuel moves with price and weather. And nearby stores are a signal of their own: market data from similar stores in the area tells you something about an item that your own three weeks of history cannot. We also looked at where AI fits, which for me was mostly in explaining the number and in reading messy signals like events and packaging, not in replacing the forecasting itself.",
          "Fuel and in-store items ended up as two separate problems under one name. Fuel got price, weather and local events as inputs. Items got weekday, promotions and holidays. Thin-history items fall back to simpler rules and say so, because a confident forecast on three weeks of data is worse than an honest blank.",
        ],
      },
      {
        id: "prototype",
        title: "Why I built this project myself",
        paragraphs: [
          "I wrote the requirements and the engineering team built the production models. This dashboard is my own experience project from that work. I wanted a place where I could test the questions from the research with my own hands: how the history is actually used, how an outside factor gets added and whether it helps, and where AI earns its place.",
          "So the prototype has a Model Lab, which is the backtest from the five stores turned into a screen: the same store's data run through several methods side by side, with their errors on past weeks. Where the methods agree, the forecast is safe. Where they disagree, that is the honest picture, and the owner should see it rather than one number pretending to be sure.",
          "That is also why every forecast is shown as a range with a one-line reason, not a point. A single number invites an argument. A range plus the reason it moved gets acted on, and when the owner disagrees they can see what the model missed. Putting these layouts in front of people before engineering committed changed my spec more than any meeting did.",
        ],
        figure: "/projects/demand-forecast/data-light.png",
      },
      {
        id: "owner",
        title: "Designing for an owner, not an analyst",
        paragraphs: [
          "The person using this is standing behind a counter, not sitting at a desk. So the flow is short: drop a sales CSV, map the date, item and quantity columns once, pick a store, read the suggested order. The forecast is the reasoning behind that number, not the headline.",
          "A drivers panel says what moved each number in plain words. The suggestion can be overridden in one tap and the override is kept, because a forecast that fights the person using it gets switched off.",
          "The dashboard above is live. Try it with your own sales CSV, switch to Fuel for the price-and-weather view, or open Model Lab to watch the methods disagree.",
        ],
        figure: "/projects/demand-forecast/hero-light.png",
      },
      {
        id: "status",
        title: "Where it stands",
        paragraphs: [
          "The module is in pilot with customers. The pilot is judged on two numbers: stockouts avoided and expired stock reduced. Everything else is a vanity metric.",
          "On the research side, the open items are the ones that need data we do not own yet: event calendars, nearby store signals and a clean way to link an item across a packaging change. Next on the product side is turning the suggested quantity into a one-click purchase order to the supplier, so the decision and the action are the same tap.",
        ],
        figure: "/projects/demand-forecast/fuel-light.png",
      },
      {
        id: "built",
        title: "Built with",
        tags: ["Backtesting on store data", "Accuracy and bias tracking", "Time-series model comparison", "Event, weather and price signals", "Next.js", "SQLite"],
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
          "The reader above is my own test build, and it is live. At Modisoft the production feature runs with real customers. Next is learning from overrides so the same correction is never asked twice.",
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
    slug: "evals-for-product-managers",
    title: "Evals, explained for product managers",
    description: "How evals differ from QA testing, why every AI feature needs them, and what goes into a one-page evals document.",
    date: "2026-11-01",
    readTime: "5 min read",
    media: { type: "image", src: "/projects/evals-hero.svg", fit: "contain" },
    sections: [
      {
        id: "intro",
        paragraphs: [
          "The first AI feature I shipped taught me a word I had not needed before: evals. QA was filing bugs against the invoice reader that were not bugs. The same invoice photo gave a slightly different total on two runs, and our test cases, written the old way, could only say pass or fail. Nothing was broken. We just did not have a way to say how good the feature was. This post is the simple version of what I learned, for product managers who are about to write their first requirements for an AI feature.",
        ],
      },
      {
        id: "difference",
        title: "QA asks does it work. Evals ask how well, and where does it fail",
        paragraphs: [
          "QA testing is built for software that behaves the same way every time. One input, one expected output, pass or fail. That still matters for everything around the model: the upload button, the review screen, saving to the catalog, permissions.",
          "A model does not behave the same way every time. It can be right on most inputs and wrong on a few, and the few are not random. They cluster around handwriting, tilted photos, items with no sales history. So an eval does not ask whether the feature works. It runs the model over many real inputs where we already know the right answer, and gives back a score and a list of where it fell short. That is the number the product decision is made on.",
        ],
        figure: "/projects/evals-same-input.svg",
      },
      {
        id: "golden",
        title: "Start with real examples and the right answers",
        paragraphs: [
          "The most useful thing I bring to an AI feature is not a prompt. It is a folder of real inputs with the correct answers written down by hand. For the invoice reader it was real supplier invoices with the right supplier, total and line items typed out. For demand forecasting it was the sales history of five stores with the recent weeks hidden, so we could check the forecast against what actually sold.",
          "This set is called a golden set, and it does two jobs. Engineers test against it, and I test candidate models against it before we commit to one. When something regresses later, the conversation is about invoice number seven, not about feelings.",
        ],
      },
      {
        id: "metrics",
        title: "Pick the few numbers that matter, and set the bar before you look",
        paragraphs: [
          "One accuracy figure hides too much. For the invoice reader we tracked accuracy per field, because a wrong supplier name is an annoyance and a wrong total is a wrong payment. For forecasting the number that mattered was bias, whether the model was consistently under or over, because that is what causes stockouts.",
          "Then decide the bar before the results come in. What score is good enough to ship. Below what score a field must go to a human for review instead of being saved automatically. If you set the bar after seeing the number, you will set it wherever the number landed.",
        ],
      },
      {
        id: "document",
        title: "What goes into the evals document",
        paragraphs: [
          "Mine is one page and it sits next to the requirements. Purpose, in one line. The golden set, where it lives and how it was built. The metrics, the few numbers we track. The bar, decided up front. The failure buckets, so when something fails we can say which kind. And the cadence and owner: it runs on every model or prompt change, the product manager owns the set, engineering runs it.",
          "Writing this page before engineering starts changed how I write requirements more than anything else this year. The acceptable range replaced the expected output.",
        ],
        figure: "/projects/evals-document.svg",
      },
      {
        id: "loop",
        title: "Run it on every change, and let QA do its own job",
        paragraphs: [
          "Models get swapped, prompts get edited, data drifts. Each of those is a change, and the evals run again on the same golden set so we can compare with the last run. Above the bar ships. Below the bar, we fix first. New failures from production go into the golden set so the next run catches them.",
          "None of this replaces QA. QA still tests everything around the model, and that is most of the product. Evals test the behaviour of the model itself. An AI feature needs both, and the mistake I see teams make is using one to do the other's job.",
        ],
        figure: "/projects/evals-loop.svg",
      },
      {
        id: "close",
        paragraphs: [
          "If you are writing requirements for an AI feature for the first time, start with the folder of real examples. Everything else in this post follows from it.",
        ],
      },
    ],
  },
  {
    slug: "structure-is-how-small-teams-ship-valuable-products",
    title: "Structure is how a small team ships valuable products",
    description: "What I saw work in a scrum team: one owner per step, a grooming call everyone attends, and a loop that ends with the customer.",
    date: "2026-11-01",
    readTime: "6 min read",
    media: { type: "image", src: "/projects/delivery-cycle.svg", fit: "contain" },
    sections: [
      {
        id: "intro",
        paragraphs: [
          "I want to write about something unglamorous. In my recent teams we shipped features in short sprints with very few bugs reaching production, and when I think about why, the answer is not a clever tool or a brilliant engineer. It is structure. Every step had one owner, and everyone could see where a thing was. This is how that worked for us in B2B SaaS, and why I think it matters more now that development has become so fast.",
        ],
      },
      {
        id: "roadmap",
        title: "It starts before the sprint",
        paragraphs: [
          "Nothing reached the team as a vague idea. A feature sat on the roadmap first, and the product team did the discovery around it: what the customer actually asked for, what competitors already had, and where it fit against everything else waiting. Then we wrote it down properly, requirements, details, designs. Only after that did it go anywhere near an estimate.",
          "I have seen the other version, where a request goes from a customer call straight into a developer's inbox. It feels fast for a day and then it costs you a month.",
        ],
      },
      {
        id: "grooming",
        title: "The grooming call is where most bugs die",
        paragraphs: [
          "The Scrum Guide now calls it backlog refinement, but every team I have worked with still says grooming. Whatever the name, this call is the most important hour in the cycle, and the reason is who is in the room: QA, the developers, the architect or whoever owns the technical side, and the product manager.",
          "I explain the feature and the requirements, and then I stop talking. QA asks what happens on the edge cases. The architect says which part is harder than it looks. A developer points out that two requirements quietly contradict each other. If anyone needs time to think, they come back later with the question. Every one of those questions is a bug that did not get written. Finding it in a call costs ten minutes. Finding it in production costs a customer.",
          "There is a second reason I never skip it. Grooming happens every week, and the job each week is to make sure the stories for the next sprint are ready: understood, questioned, and clear enough to estimate. Engineering time is the most valuable thing in the company, and it is also the easiest thing to waste. A developer who starts a sprint with a half-clear story spends the first days asking questions that should have been answered already. Keeping the backlog ready one sprint ahead means when the sprint starts, they build.",
        ],
      },
      {
        id: "planning",
        title: "Sprint planning turns it into owned work",
        paragraphs: [
          "Once a story is groomed, sprint planning breaks it into tasks, front end and back end, as the requirements demand. The product manager or product owner adds the user stories and sometimes the epic. The developers add the tasks under them, because they know how the work actually splits. Then the team commits to a sprint goal.",
          "That commitment is the quiet trick in all of this. Nobody is told what they will deliver. They decided it, with the full picture, so they own it.",
        ],
      },
      {
        id: "daily",
        title: "Daily calls are for blockers, not status",
        paragraphs: [
          "Because the story was already understood and committed, the daily call does not need to re-explain anything. It is about what is in the way. A lot of real discussion happens there, a dependency, an API that behaves differently, a design detail nobody noticed, and it gets resolved the same day instead of surfacing at the end of the sprint.",
        ],
      },
      {
        id: "qa",
        title: "QA and the fix loop",
        paragraphs: [
          "When a developer marks something done, QA starts testing it against the same requirements everyone heard in grooming. Whatever they find goes back, the developer fixes it, QA checks again. The loop keeps going until the sprint goal is met, not until the time runs out. Having QA in the grooming call is what makes this fast. They are not learning the feature while testing it. They already know what right looks like.",
        ],
      },
      {
        id: "uat",
        title: "The product manager does UAT",
        paragraphs: [
          "Before anything is deployed, I use it the way the customer will use it. Not a checklist, the actual flow, with the customer's request open next to it. This is the last place to catch the gap between what was built and what was asked, and it is the product manager's job because we are the ones who heard the original ask.",
          "Then everything gets merged, there is a deployment date, and it goes to production together.",
        ],
      },
      {
        id: "retro",
        title: "The retro is where the process fixes itself",
        paragraphs: [
          "At the end of every sprint we sit down for a retro and everyone shares their thoughts: what went well, what slowed us down, what we want to change next sprint. It is the one call where the process itself is on the table. Everything I have described above was not handed to us as a template. It is the result of many retros, each one adjusting a small thing, a grooming call that ran too long, a story that reached QA too late, a handover that kept getting missed.",
        ],
      },
      {
        id: "stakeholders",
        title: "A stakeholder call so nobody is surprised",
        paragraphs: [
          "Alongside the team calls there is a regular call with the stakeholders. I give them a brief overview of what shipped, what is in the sprint and what is coming on the roadmap, and they tell me what they want and what their customers are asking for. Those asks do not jump straight into the sprint. They go into discovery and get prioritised with everything else. But because the stakeholders hear the plan every time and see their requests move, there are no surprises on either side, and that trust is what lets the team keep its sprint goal when a new request lands mid-sprint.",
        ],
      },
      {
        id: "cspo",
        title: "What the CSPO changed, and what agile means to me",
        paragraphs: [
          "Doing the Certified Scrum Product Owner course did not teach me a new process. It gave names and reasons to things we were already doing, and it made the product owner's job plain: own the backlog, own the value, and make sure the team is always working on the most valuable thing it can. That changed how I think about my own role in these calls. I am not there to manage people. I am there to make sure the next most important thing is ready and understood.",
          "It also settled what agile means to me. The word says it. Be agile. The ceremonies, the grooming, the planning, the retro, are tools for responding to change without losing structure, not rituals to be followed because the book says so. When a ceremony stops helping, the retro changes it. That is the principle working in real life, and it is the part that teams miss when they do scrum as a checklist.",
        ],
      },
      {
        id: "customer",
        title: "The loop ends with the customer, not the deploy",
        paragraphs: [
          "The feature is not done when it is live. It is done when the customer success team tells the customer who asked for it that it is there, and we ask them what they think. That feedback goes back into discovery, next to the competitor research and the other requests, and it shapes what moves up the roadmap. That is how the product grows, and it is why the roadmap has to be managed and prioritised as carefully as the sprint is.",
        ],
      },
      {
        id: "close",
        paragraphs: [
          "Different teams do this differently, and I am not saying this is the only way. But in B2B SaaS, where one bug can land in front of a hundred customers at once, this is what I have seen work. Development is faster than ever now, and speed without structure just means you ship your mistakes sooner. Structure is what lets a small team move fast and still trust what they put in front of a customer.",
        ],
      },
    ],
  },
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
