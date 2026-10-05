---
version: "2.7.3"
publishedAt: "2026-10-04"
title: "Was ist neu in Intake 2.7.3"
summary: "Auf iOS rechnen Rezepte mit dem Gewicht des fertigen Gerichts, und die Portionen stellst du frei ein. Die Gewichtskarte auf Heute zeigt deine gesamte Veränderung seit einem Startdatum, und die Statistik zeigt deinen Gewichtsverlauf über alle Jahre. Dazu sechs Fehlerbehebungen, unter anderem für Apple Health und die Statistik. Auf Android kommen dieselben Rezepte, die Gesamtveränderung und der Verlauf über alle Jahre, dazu ein Schalter für roh oder gekocht gewogene Grundnahrungsmittel und fünf Fehlerbehebungen"
coverImage: "./assets/cover.svg"
highlights:
  - "iOS: Rezepte mit Fertiggewicht, die Nährwerte verteilen sich auf das fertige Gericht"
  - "iOS: Portionen bei eigenem Gewicht frei einstellbar"
  - "iOS: Deine gesamte Gewichtsveränderung auf Heute, ab einem Startdatum deiner Wahl"
  - "iOS: Der ganze Gewichtsverlauf über alle Jahre in der Statistik"
  - "iOS: Apple Health bekommt alles, was es darf, auch mit einzelnen ausgeschalteten Nährwerten"
  - "iOS: Richtige Jahressummen und Durchschnitte bis heute in der Statistik"
  - "iOS: Der Scanner startet mit der Hauptkamera"
  - "Android: Rezepte mit Fertiggewicht und frei einstellbaren Portionen"
  - "Android: Deine gesamte Gewichtsveränderung auf Heute und der Gewichtsverlauf über alle Jahre"
  - "Android: Reis, Nudeln und Linsen roh oder gekocht abwiegen"
  - "Android: Richtige Jahressummen und Durchschnitte bis heute in der Statistik"
---

## Neu auf iOS: Rezepte nach Fertiggewicht

Brot wird beim Backen schwerer, Eintopf beim Kochen leichter. Rezepte rechnen deshalb jetzt mit dem Gewicht des fertigen Gerichts, wenn du es angibst.

Schalte im Rezept „Berechnetes Gewicht verwenden“ aus und trag unter „Fertiggewicht (gesamt)“ ein, was das fertige Gericht wiegt. Die Portionen stellst du unabhängig davon ein, so viele, wie du willst. Darunter siehst du, wie viel eine Portion wiegt.

Die Nährwerte der Zutaten verteilen sich auf dieses Gewicht. Ein Brot aus 1.077 g Zutaten mit 3.484 kcal, das gebacken 1.602 g wiegt, hat in vier Portionen 871 kcal und rund 400 g pro Portion, und 100 g Brot haben 217 kcal. So rechnet Intake überall: auf der Rezeptseite, in der Suche, beim Eintragen in Gramm oder Portionen und in der Nährwertaufschlüsselung auf Heute. Änderst du beim Eintragen die Menge einer Zutat, wächst oder schrumpft das Fertiggewicht mit.

Rezepte, bei denen du bisher ein eigenes Gewicht pro Portion angegeben hast, behalten ihre Werte. Öffnest du sie im Editor, weist dich ein Hinweis auf das neue Feld hin. Bereits eingetragene Einträge bleiben, wie sie sind.

Teilst du ein Rezept als Datei, kommt das Fertiggewicht mit, auch zwischen iOS und Android.

## Deine gesamte Gewichtsveränderung

Die Gewichtskarte auf Heute hat eine neue Zeile „Gesamt“, zum Beispiel „−8,3 kg seit 3. Jan.“. Sie zeigt, wie viel du seit deinem Startgewicht insgesamt ab- oder zugenommen hast, zusätzlich zum Trend gegenüber dem letzten Gewicht.

Das Startdatum legst du unter Einstellungen, Körperdaten, „Startgewicht“ fest. Ohne Auswahl beginnt Intake beim ersten Gewicht, das du eingetragen oder aus Apple Health übernommen hast. Dort siehst du auch, welches Gewicht als Start gilt, und mit „Zurücksetzen“ gehst du zurück zum ersten Gewicht. Das Startdatum gilt für das jeweilige Gerät.

## Dein ganzer Gewichtsverlauf

In der Statistik hat das Gewicht neben Woche, Monat und Jahr jetzt „Alle“. Dort siehst du deinen Verlauf über alle Jahre, mit einem Punkt pro Monat, dazu Start, aktuelles Gewicht, Änderung, Tiefst- und Höchstwert und die Zahl der erfassten Tage. Liegen deine Gewichte schon in Apple Health, holst du sie unter Einstellungen, Apple Health, „Gewichtsverlauf importieren“ in Intake.

## Neu auf Android

**Rezepte nach Fertiggewicht.** Auch auf Android rechnen Rezepte mit dem Gewicht des fertigen Gerichts, genau wie oben beschrieben: „Berechnetes Gewicht verwenden“ ausschalten, „Fertiggewicht (gesamt)“ eintragen, die Portionen frei einstellen. Das bisherige Feld „Gewicht pro Portion“ entfällt. Rezepte, bei denen du es genutzt hast, öffnen mit dem daraus berechneten Gesamtgewicht als Fertiggewicht, ihre Werte bleiben gleich, und ein Hinweis erklärt das neue Feld.

**Deine gesamte Gewichtsveränderung und dein ganzer Verlauf.** Die Gewichtskarte auf Heute zeigt die Zeile „Gesamt“, das Startdatum legst du unter Einstellungen, Körperdaten, „Startgewicht“ fest. Ohne Auswahl beginnt Intake beim ersten Gewicht, das du eingetragen oder aus Health Connect übernommen hast. In der Statistik hat das Gewicht jetzt „Alle“, mit einem Punkt pro Monat über alle Jahre.

**Roh oder gekocht.** Wiegst du Reis, Nudeln, Quinoa, Hirse, Buchweizen oder Linsen nach dem Kochen ab, obwohl auf der Packung die Werte für das trockene Produkt stehen, stellst du unter der Menge auf „Gekocht“. Intake rechnet mit einem festen Quellfaktor um, zum Beispiel 1 g roh ≈ 3 g gekocht bei Vollkornreis: 135 g gekochter Vollkornreis haben dann 163 kcal statt 490. Der Schalter erscheint bei diesen Grundnahrungsmitteln, wenn du eine eigene Menge in Gramm oder Unzen einträgst. Intake merkt sich deine Wahl pro Produkt, der Eintrag auf Heute heißt dann zum Beispiel „135 g · gekocht“, und beim Bearbeiten stellst du ihn wieder um. Steht im Produkt schon gekochter Reis, rechnet der Schalter in die andere Richtung.

## Fehlerbehebungen

### iOS

- **Jeder Eintrag bleibt in der Liste.** Was du hinzufügst, steht auf Heute und bleibt dort, auch während Intake im Hintergrund mit iCloud synchronisiert.
- **Apple Health mit einzelnen ausgeschalteten Daten.** Hast du für Intake in Apple Health einzelne Nährwerte ausgeschaltet, schreibt Intake alle anderen trotzdem: Kalorien, Makros und alles, was erlaubt ist.
- **Richtige Summen fürs Jahr.** Die Jahresansicht der Statistik zählt jeden Tag zusammen. Gesamtmengen, Wasser und die Kalorienbilanz passen jetzt zu Woche und Monat, und „Höchster Tag“ zeigt wirklich einen Tag.
- **Durchschnitte bis heute.** Die Statistik rechnet mit den Tagen bis heute. Ein Mittwoch zählt nicht die restliche Woche mit, und Mahlzeiten, die du schon für spätere Tage geplant hast, verändern deine Durchschnitte nicht.
- **Der Scanner startet mit der Hauptkamera.** Der Barcode-Scanner öffnet mit dem normalen Objektiv und stellt bei kurzem Abstand trotzdem scharf.
- **Gewichte löschen in der Statistik.** Ein Gewicht löschst du mit langem Druck in der Wochen- oder Monatsansicht, dort trifft es genau den Tag.

### Android

- **Richtige Summen fürs Jahr.** Gesamtmengen in der Jahresansicht der Statistik zählen jeden Tag zusammen statt der Monatsdurchschnitte, und „Maximum“ zeigt deinen höchsten einzelnen Tag.
- **Durchschnitte bis heute.** Tage nach heute zählen in der Statistik nicht mit, weder ihre Ziele noch Mahlzeiten, die du schon vorgeplant hast.
- **Rezepte teilen.** Eine geteilte Rezeptdatei enthält die Portionen, die du eingestellt hast, und die richtigen Mengen für Ballaststoffe, Zucker, gesättigte Fettsäuren und Salz.
- **Schnell hinzufügen nach einer Rezeptänderung.** Änderst du Fertiggewicht oder Portionen eines Rezepts, trägt „Schnell hinzufügen“ die neue Portion ein und nicht mehr die Menge vom letzten Mal.
- **Nährwertaufschlüsselung bei Rezepten.** Die Zutaten in der Aufschlüsselung auf Heute ergeben zusammen genau, was der Rezepteintrag verbucht hat.

Das komplette Changelog findest du wie immer [hier](https://featurevoting.tobibechtold.dev/app/intake/changelog).

Vielen Dank, dass du Intake nutzt.

Tobi
