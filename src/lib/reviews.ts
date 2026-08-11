export interface Review {
  id: number;
  title: string;
  text: string;
  author: string;
  date: string;
  rating: number;
}

/** Extracted from Reviews.tsx unchanged so the copy has a single home. */
export const REVIEWS: Review[] = [
  {
    id: 1,
    title: "Übersichtlich & schick",
    text: "Sehr schöne & übersichtliche App. Macht damit genau was sie soll und das sehr gut und ohne Account-Zwang. Die neuen Features (Wasser-Zähler, eigene Rezepte) komplettieren und erweitern die App immer mehr. Freue mich über jedes Update😊",
    author: "ipfreaks",
    date: "23. Jan. 2026",
    rating: 5,
  },
  {
    id: 2,
    title: "Tolle App",
    text: "Simpel, übersichtlich und ohne Gamification. Die App konzentriert sich auf das wesentliche und kommt ohne teures Abo aus. Danke!",
    author: "Nico Sebastian",
    date: "23. Jan. 2026",
    rating: 5,
  },
  {
    id: 3,
    title: "Top App",
    text: "Tolle App zum Kalorienzählen – endlich ohne Abo! Sehr übersichtliche und gut durchdachte App zum Kalorien zählen – und das ganz ohne monatliche oder jährliche Zahlung. Genau das habe ich gesucht! Die Anbindung an Apple Health funktioniert zuverlässig und macht das Tracking besonders komfortabel. Auch die innovative Art der Eingabe gefällt mir richtig gut und hebt die App positiv von vielen Mitbewerbern ab. Insgesamt wirkt alles aufgeräumt, modern und intuitiv bedienbar. Fazit: Sehr empfehlenswert",
    author: "©pa.tric",
    date: "23. Jan. 2026",
    rating: 5,
  },
];

export const REVIEW_CLAMP_THRESHOLD = 200;
