/**
 * Vasectomy Australia clinic locations, transcribed from the old
 * drgeoffcashion.com.au/vasectomy page.
 *
 * `doctor` matters on a GP-facing site: a referrer needs to know whether the
 * patient will be seen by Dr Cashion himself or by another Vasectomy
 * Australia doctor.
 *
 * Seed data only: the site renders this content from Sanity (see
 * src/sanity/queries.ts), and `npm run sanity:seed` exports it from here.
 * Edit the live content in the Studio, not in this file.
 */

export type Doctor = "cashion" | "valentine";

export interface Clinic {
  area: string;
  clinic: string;
  doctor: Doctor;
}

export interface StateGroup {
  code: string;
  name: string;
  clinics: Clinic[];
}

export const states: StateGroup[] = [
  {
    code: "NSW",
    name: "New South Wales",
    clinics: [
      { area: "Inner West / CBD", clinic: "Enmore Medical Practice", doctor: "cashion" },
      { area: "Eastern Suburbs", clinic: "Maroubra Medical and Dental Centre", doctor: "cashion" },
      { area: "North Shore", clinic: "Chatswood Medical & Dental Centre", doctor: "cashion" },
      { area: "Northern Beaches", clinic: "Warringah Medical & Dental Centre, Brookvale", doctor: "cashion" },
      { area: "The Hills District", clinic: "The Hills Medical and Dental Centre, Baulkham Hills", doctor: "cashion" },
      { area: "Blacktown", clinic: "Pacific Medical Centre Blacktown", doctor: "cashion" },
      { area: "Penrith / Blue Mountains", clinic: "Penrith Medical Centre", doctor: "cashion" },
      { area: "Sutherland Shire", clinic: "Kingsway Specialist Medical Centre, Miranda", doctor: "cashion" },
      { area: "Macarthur", clinic: "Campbelltown Medical and Dental Centre", doctor: "cashion" },
      { area: "Central Coast", clinic: "Wyoming Medical and Dental Centre", doctor: "cashion" },
      { area: "Newcastle / Hunter Valley", clinic: "Cooks Hill Health Hub, 235 Darby St", doctor: "cashion" },
      { area: "Wollongong / Illawarra", clinic: "Dapto Medical Centre", doctor: "cashion" },
      { area: "Orange", clinic: "Orange Family Medical Centre", doctor: "cashion" },
      { area: "Dubbo / Western Plains", clinic: "Western Plains Medical Centre", doctor: "cashion" },
      { area: "Port Macquarie / Mid North Coast", clinic: "Port Macquarie Medical and Dental Centre", doctor: "cashion" },
      { area: "Tamworth / New England", clinic: "Regional Medical Specialists Tamworth", doctor: "cashion" },
      { area: "Albury", clinic: "Elmwood Medical Centre", doctor: "cashion" },
      { area: "Wagga Wagga", clinic: "Wagga Wagga Medical Centre", doctor: "cashion" },
    ],
  },
  {
    code: "VIC",
    name: "Victoria",
    clinics: [
      { area: "Melbourne North", clinic: "Gladstone Park Superclinic", doctor: "cashion" },
      { area: "Wodonga", clinic: "Elmwood Medical Centre", doctor: "cashion" },
      { area: "Melbourne CBD", clinic: "Melbourne Vasectomy Centre", doctor: "valentine" },
      { area: "Casey / Mornington Peninsula", clinic: "Melbourne Vasectomy Centre", doctor: "valentine" },
      { area: "Geelong", clinic: "Vasectomy Australia Geelong", doctor: "valentine" },
      { area: "Ballarat", clinic: "Carn Brae Clinic", doctor: "valentine" },
      { area: "Bendigo", clinic: "Emu Creek Health Professionals", doctor: "valentine" },
    ],
  },
  {
    code: "QLD",
    name: "Queensland",
    clinics: [
      { area: "Brisbane", clinic: "Vasectomy Clinic Brisbane", doctor: "valentine" },
      { area: "Gold Coast", clinic: "Robina Medical and Dental Centre", doctor: "valentine" },
      { area: "Sunshine Coast", clinic: "Ochre Medical Centre Sippy Downs", doctor: "valentine" },
      { area: "Toowoomba", clinic: "Ochre Medical Centre Wyalla", doctor: "valentine" },
      { area: "Springfield", clinic: "Springfield Doctors", doctor: "valentine" },
      { area: "Hervey Bay", clinic: "Eli Waters Medical Centre", doctor: "valentine" },
      { area: "Gladstone", clinic: "Vitality Solutions", doctor: "valentine" },
      { area: "Rockhampton", clinic: "CQ Doctors, 24 Upper Dawson Rd", doctor: "valentine" },
      { area: "Townsville", clinic: "SmartClinics Annandale Medical Centre", doctor: "valentine" },
    ],
  },
  {
    code: "WA",
    name: "Western Australia",
    clinics: [
      { area: "Perth — Thornlie", clinic: "Westcare Medical Centre", doctor: "valentine" },
      { area: "Perth — Kiara", clinic: "Perth Vasectomy Centre", doctor: "valentine" },
      { area: "Perth — Hillarys / North", clinic: "Hillarys Plaza Medical Centre", doctor: "valentine" },
      { area: "Perth — Rockingham", clinic: "Rockingham Medical & Dental Centre", doctor: "valentine" },
      { area: "Perth — Nedlands", clinic: "Hollywood GP", doctor: "valentine" },
    ],
  },
  {
    code: "SA",
    name: "South Australia",
    clinics: [{ area: "Adelaide", clinic: "Trinity Gardens Medical Centre", doctor: "cashion" }],
  },
  {
    code: "TAS",
    name: "Tasmania",
    clinics: [
      { area: "Hobart", clinic: "Clarence GP Super Clinic", doctor: "cashion" },
      { area: "Launceston", clinic: "Family Planning Tasmania", doctor: "cashion" },
    ],
  },
];
