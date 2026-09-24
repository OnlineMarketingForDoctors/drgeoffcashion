/**
 * Patient reviews, transcribed from Google. Shown to referring GPs as
 * evidence of what their patient experiences.
 *
 * `initial` and `tint` reproduce Google's default avatar treatment for
 * reviewers without a profile photo — we deliberately do not lift the real
 * profile pictures out of the screenshots.
 *
 * Seed data only: the site renders this content from Sanity (see
 * src/sanity/queries.ts), and `npm run sanity:seed` exports it from here.
 * Edit the live content in the Studio, not in this file.
 */

export interface Review {
  name: string;
  initial: string;
  /** Avatar background, matching the colours Google assigns. */
  tint: string;
  reviews: string;
  localGuide?: boolean;
  photos?: string;
  when: string;
  rating: number;
  body: string[];
}

export const reviews: Review[] = [
  {
    name: "Bill Faraj",
    initial: "B",
    tint: "#3d7f8c",
    reviews: "22 reviews",
    localGuide: true,
    photos: "5 photos",
    when: "6 months ago",
    rating: 5,
    body: [
      "I had my vasectomy with Dr Geoff Cashion at the Sydney Vasectomy Centre (Enmore Medical Practice) and the entire experience was outstanding from start to finish.",
      "The communication leading up to the procedure was excellent — clear instructions, helpful reminders, and detailed information that genuinely put me at ease. On the day, I arrived on time, was greeted by the nurse, and everything ran efficiently and professionally.",
      "The procedure itself took about five minutes. It was incredibly smooth, completely pain-free, and far less daunting than I had imagined. Dr Geoff was calm, confident and reassuring throughout, which made a big difference. I was able to drive myself home immediately afterwards without any issues.",
      "If you're considering a vasectomy and feeling unsure, I can honestly say the process was seamless and far easier than expected. Highly recommend Dr Geoff and the team at Vasectomy Australia.",
    ],
  },
  {
    name: "Jason Sibarani",
    initial: "J",
    tint: "#6b5b95",
    reviews: "8 reviews",
    when: "8 months ago",
    rating: 5,
    body: [
      "I had my vasectomy done at the Port Macquarie centre, and Dr. Cashion was calming, friendly, and very efficient. The entire procedure took roughly eight minutes. With the help of ibuprofen, the recovery was very manageable. Thank you.",
    ],
  },
  {
    name: "Tina Efthymiou",
    initial: "T",
    tint: "#a5325f",
    reviews: "11 reviews",
    photos: "2 photos",
    when: "3 years ago",
    rating: 5,
    body: [
      "My husband done the procedure last week and he couldn't be happier. Dr Cashion and his team make you feel very comfortable. Leading up to the day we were sent lots of information about the procedure including videos.",
      "I went along with my husband but waited outside with the kids and was surprised at how quickly he finished. Straight after the procedure I asked how he was and he was fine to go for dinner. I hope you enjoyed the muffins I left you guys 😊",
    ],
  },
  {
    name: "Lorralee Thompson",
    initial: "L",
    tint: "#6d4c41",
    reviews: "3 reviews",
    when: "3 weeks ago",
    rating: 5,
    body: [
      "Dr Geoff Cashion was an awesome bloke, made the procedure an easy experience. The procedure itself was awkward to begin with but no pain only the discomfort for 2 seconds with the needle the rest was painless easy and fast.",
    ],
  },
  {
    name: "EIF 1",
    initial: "E",
    tint: "#1a73e8",
    reviews: "1 review",
    when: "6 months ago",
    rating: 5,
    body: [
      "Awesome work, arrived 1 month early to my appointment but instead of having to wait 1 month and do the 3 hour drive home without getting it done Dr Geoff made space for me saving all the hassle.",
      "Thanks heaps guys!!",
    ],
  },
  {
    name: "Antonio Castillo",
    initial: "A",
    tint: "#0b8043",
    reviews: "6 reviews",
    when: "5 months ago",
    rating: 5,
    body: [
      "Today I had my vasectomy. It was performed by Dr Geoff Cashion and his assistant. They were fantastic and caring. Anyone considering a vasectomy, they are the medical professionals to see.",
    ],
  },
  {
    name: "Luke Jacobz",
    initial: "L",
    tint: "#3949ab",
    reviews: "11 reviews",
    photos: "3 photos",
    when: "3 months ago",
    rating: 5,
    body: [
      "Fabulous experience. Dr Cashion was calm, friendly and comforting. I was so impressed, that would easily go through that multiple times.. clearly not necessary..",
    ],
  },
];
