---
version: "2.6.1"
publishedAt: "2026-09-01"
title: "Was ist neu in Intake 2.6.1"
summary: "Fehlerbehebungen für das neue Essen hinzufügen aus 2.6.0, das Schnell-erfassen-Widget und den PDF-Export, und Zehntelgramm in den Gewichtsfeldern"
coverImage: "./assets/cover.svg"
highlights:
  - "iOS: Der leere Bildschirm nach dem Barcode-Scan ist behoben"
  - "iOS: Suchergebnisse springen nicht mehr genau dann, wenn du tippst"
  - "iOS: Der Schalter zwischen Barcode und Essen scannen reagiert auf seiner ganzen Fläche"
  - "iOS: Ein unbekannter Barcode öffnet sich als neues Produkt, nicht als Produkt bearbeiten"
  - "iOS: Gewichtsfelder akzeptieren Zehntelgramm, eine Prise Salz wird als 0,5 g geloggt"
  - "Android: Das Schnell-erfassen-Widget füllt seine Fläche, mit lesbarer Schrift"
  - "Android: Zum Prüfen einreichen bei Meine Produkte funktioniert wieder"
  - "Android: Getränke stehen im PDF-Export in Millilitern"
  - "Android: Das Suchfeld beim Essen hinzufügen ist im Dark Mode wieder gut sichtbar"
---

## Falls du 2.6.0 verpasst hast

2.6.1 ist ein kleines Update, aber 2.6.0 davor war das größte Release seit langem. Falls du direkt von 2.5 kommst, ist das der Grund, warum die App an ein paar Stellen anders aussieht.

Der Tab Rezepte heißt jetzt Bibliothek und enthält alles, was dir gehört: Favoriten, eigene Produkte, Rezepte, Routinen und deine Einreichungen, mit einer Suche über alle Listen, eigenen Schlagworten und Sortierung. Der Bildschirm zum Hinzufügen ist komplett neu aufgebaut: Er beginnt mit Vorschlägen für genau die Mahlzeit, die du gerade loggst, Routinen tragen ein ganzes Frühstück mit einem Tippen ein, Barcodes und Essen scannen teilen sich eine Vollbild-Kamera, und die Suche sitzt unten, wo dein Daumen ist. Und Gramm ist nicht mehr die einzige Einheit: Teelöffel, Esslöffel, Tassen, Gläser und Milliliter gibt es jetzt für jedes Lebensmittel.

Die ganze Geschichte mit Screenshots findest du unter [Was ist neu in Intake 2.6.0](/whats-new/2.6.0).

## Fehlerbehebungen

Ein Redesign dieser Größe hat ein paar Ecken, die erst im Alltag auffallen. Danke an alle, die sie gemeldet haben, die ersten sind hier behoben.

### iOS

- Nach dem Scannen eines Barcodes konnte sich ein komplett leerer Bildschirm öffnen. Das Scan-Ergebnis erscheint jetzt zuverlässig.
- Der Suchindikator schwebt jetzt über der Liste, statt sie zu verschieben. Ergebnisse springen nicht mehr genau dann, wenn du tippst.
- Der Schalter zwischen Barcode und Essen scannen reagiert auf seiner ganzen Fläche, statt die Kamera scharfzustellen.
- Ein gescannter Barcode ohne Datenbanktreffer öffnet sich jetzt als neues Produkt statt fälschlich als Produkt bearbeiten.
- Gewichtsfelder akzeptieren Zehntelgramm. Eine Prise Salz wird als 0,5 g geloggt statt als volles Gramm, in Einträgen und Rezeptzutaten.

### Android

- Das Widget „Mahlzeit schnell erfassen“ füllt jetzt seine ganze Fläche: Die Kacheln wachsen mit dem Widget mit, die Schrift wird größer statt winzig zu bleiben, und unter den Kacheln bleibt kein leerer Streifen mehr. So sieht es aus wie in der Vorschau.
- „Zum Prüfen einreichen“ bei Meine Produkte funktioniert wieder. Das Produkt öffnet sich ausgefüllt im Formular, mit eingeschalteter Einreichung, statt auf einem leeren Bildschirm zu landen.
- Im PDF-Export stehen als Getränk markierte Einträge jetzt in Millilitern statt in Gramm.
- Das Suchfeld unten auf dem Bildschirm Essen hinzufügen hebt sich im Dark Mode wieder deutlich vom Hintergrund ab.

Das komplette Changelog findest du wie immer [hier](https://featurevoting.tobibechtold.dev/app/intake/changelog).

Vielen Dank, dass du Intake nutzt. Ich hoffe, dir gefällt das neue Release.

Tobi
