---
version: "2.7.1"
publishedAt: "2026-09-19"
title: "Was ist neu in Intake 2.7.1"
summary: "Ein Update nur mit Fehlerbehebungen. Auf iOS: Die Wochenleiste über Heute bleibt auf der aktuellen Woche, in Garmin oder Health gelöschte Workouts verschwinden auch aus Intake, und der Scanner steht auf dem iPad im Querformat nicht mehr auf der Seite. Auf Android: Vorschläge bieten dieselben Portionen wie deine Favoriten, eine fehlgeschlagene Health-Connect-Synchronisierung verlangt keine Berechtigungen mehr, die du längst erteilt hast, und dein Alter springt am Geburtstag um"
coverImage: "./assets/cover.svg"
highlights:
  - "iOS: Die Wochenleiste über Heute startet auf der aktuellen Woche und rückt sich selbst zurecht"
  - "iOS: In Garmin oder Health gelöschte Workouts verschwinden auch aus Intake"
  - "iOS: Der Scanner folgt auf dem iPad der Haltung des Geräts"
  - "Android: Vorschläge bieten dieselben Portionen wie Favoriten und häufige Lebensmittel"
  - "Android: Health Connect verlangt keine Berechtigungen mehr, die längst erteilt sind"
  - "Android: Ein nicht lesbarer Health-Connect-Eintrag blockiert nicht mehr Schritte und Kalorien"
  - "Android: Dein Alter in den Einstellungen springt am Geburtstag um"
---

## Fehlerbehebungen

### iOS

- **Die Wochenleiste bleibt auf dieser Woche.** Die Tagesleiste über Heute konnte um ein paar Tage verschoben oder gleich auf der nächsten Woche starten und blieb dann so stehen. Betroffen war vor allem, wer „Zwischen Tagen wischen“ ausgeschaltet hat. Die Leiste startet jetzt auf der aktuellen Woche, und wenn sie doch einmal verrutscht, rückt sie sich selbst zurecht. Die Woche wechselt nur noch, wenn du selbst wischst oder auf „Heute“ tippst.
- **Gelöschte Workouts verschwinden.** Ein Workout, das du in Garmin, Apple Health oder einer anderen App gelöscht hast, blieb in Intake stehen und zählte weiter zu deinen verbrannten Kalorien, auch in der Statistik. Intake gleicht jetzt mit Health ab, welche Workouts es noch gibt, und entfernt die anderen. Workouts, die du in Intake selbst eingetragen hast, bleiben unberührt.
- **Scanner im Querformat auf dem iPad.** Im Querformat war das Kamerabild des Barcode-Scanners um 90 Grad gedreht. Es folgt jetzt der Haltung des Geräts, auch in Split View, und Fotos für Intake AI kommen aufrecht an.
- Nach dem Schließen der Einstellungen baut Intake die Heute-Seite nicht mehr jedes Mal neu auf, sondern nur noch, wenn du Akzentfarbe oder Design geändert hast.

### Android

- Ein Lebensmittel aus den Vorschlägen bot nur „Eigene Menge“ an, während dasselbe Lebensmittel aus den Favoriten oder unter Häufig seine Portionen zeigte. Vorschläge bieten jetzt dieselben Portionen, zum Beispiel einen kleinen, mittleren oder großen Apfel oder eine Scheibe Brot.
- Health Connect: Schlug eine Synchronisierung fehl, stand in den Einstellungen „Health Connect-Berechtigungen sind erforderlich“, obwohl alle Berechtigungen erteilt waren. Sie erneut zu vergeben änderte nichts. Intake sagt jetzt, dass die Synchronisierung fehlgeschlagen ist.
- Health Connect: Ein einzelner Eintrag, den Intake nicht lesen kann, etwa ein Workout aus einer anderen App, hielt die gesamte Synchronisierung an. Schritte, Kalorien und alles andere werden jetzt trotzdem übernommen.
- Hält das Problem an, enthält „Debug-Daten exportieren“ unter Health-Connect-Aktivität jetzt den letzten Fehler. Schick mir die Datei, dann sehe ich, woran es liegt.
- Das Alter in der Übersicht der Einstellungen sprang an deinem Geburtstag nicht um. Es wird jetzt wie deine Kalorienziele aus dem Geburtsdatum berechnet.

Das komplette Changelog findest du wie immer [hier](https://featurevoting.tobibechtold.dev/app/intake/changelog).

Vielen Dank, dass du Intake nutzt.

Tobi
