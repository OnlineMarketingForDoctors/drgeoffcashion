/**
 * Patient reviews, transcribed from Google. Shown to referring GPs as
 * evidence of what their patient experiences, not as a consumer testimonial
 * wall — the framing on the page is deliberate.
 */

export interface Review {
  name: string;
  meta: string;
  when: string;
  /** The line that matters to a referring GP. */
  pull: string;
  body: string[];
}

export const reviews: Review[] = [
  {
    name: "Bill Faraj",
    meta: "Local Guide · 22 reviews",
    when: "6 months ago",
    pull: "The procedure itself took about five minutes.",
    body: [
      "I had my vasectomy with Dr Geoff Cashion at the Sydney Vasectomy Centre (Enmore Medical Practice) and the entire experience was outstanding from start to finish.",
      "The communication leading up to the procedure was excellent — clear instructions, helpful reminders, and detailed information that genuinely put me at ease. On the day, I arrived on time, was greeted by the nurse, and everything ran efficiently and professionally.",
      "The procedure itself took about five minutes. It was incredibly smooth, completely pain-free, and far less daunting than I had imagined. Dr Geoff was calm, confident and reassuring throughout, which made a big difference. I was able to drive myself home immediately afterwards without any issues.",
      "If you're considering a vasectomy and feeling unsure, I can honestly say the process was seamless and far easier than expected.",
    ],
  },
  {
    name: "Jason Sibarani",
    meta: "8 reviews",
    when: "8 months ago",
    pull: "The entire procedure took roughly eight minutes.",
    body: [
      "I had my vasectomy done at the Port Macquarie centre, and Dr. Cashion was calming, friendly, and very efficient. The entire procedure took roughly eight minutes. With the help of ibuprofen, the recovery was very manageable. Thank you.",
    ],
  },
  {
    name: "Tina Efthymiou",
    meta: "11 reviews · 2 photos",
    when: "3 years ago",
    pull: "I was surprised at how quickly he finished.",
    body: [
      "My husband done the procedure last week and he couldn't be happier. Dr Cashion and his team make you feel very comfortable. Leading up to the day we were sent lots of information about the procedure including videos.",
      "I went along with my husband but waited outside with the kids and was surprised at how quickly he finished. Straight after the procedure I asked how he was and he was fine to go for dinner.",
    ],
  },
  {
    name: "Lorralee Thompson",
    meta: "3 reviews",
    when: "3 weeks ago",
    pull: "No pain, only discomfort for 2 seconds with the needle.",
    body: [
      "Dr Geoff Cashion was an awesome bloke, made the procedure an easy experience. The procedure itself was awkward to begin with but no pain only the discomfort for 2 seconds with the needle the rest was painless easy and fast.",
    ],
  },
  {
    name: "EIF 1",
    meta: "1 review",
    when: "6 months ago",
    pull: "Dr Geoff made space for me, saving all the hassle.",
    body: [
      "Awesome work, arrived 1 month early to my appointment but instead of having to wait 1 month and do the 3 hour drive home without getting it done Dr Geoff made space for me saving all the hassle.",
      "Thanks heaps guys!!",
    ],
  },
  {
    name: "Antonio Castillo",
    meta: "6 reviews",
    when: "5 months ago",
    pull: "They were fantastic and caring.",
    body: [
      "Today I had my vasectomy. It was performed by Dr Geoff Cashion and his assistant. They were fantastic and caring. Anyone considering a vasectomy, they are the medical professionals to see.",
    ],
  },
  {
    name: "Luke Jacobz",
    meta: "11 reviews · 3 photos",
    when: "3 months ago",
    pull: "Calm, friendly and comforting.",
    body: [
      "Fabulous experience. Dr Cashion was calm, friendly and comforting. I was so impressed, that would easily go through that multiple times.. clearly not necessary..",
    ],
  },
];
