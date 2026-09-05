---
version: "2.6.3"
publishedAt: "2026-09-06"
title: "Was ist neu in Intake 2.6.3"
summary: "Ein Produkt zur Prüfung einzureichen verlangt weniger: Name, Marke, Barcode und die vier Kern-Makros. Einreichungen aktualisieren sich beim Öffnen und beim Herunterziehen, abgeschlossene Prüfungen stehen in einem eigenen Abschnitt, und eine Ablehnung kommt mit Begründung. Auf beiden Plattformen"
coverImage: "./assets/cover.svg"
highlights:
  - "Beide: Ein Produkt zur Prüfung einzureichen braucht nur Name, Marke, Barcode und die vier Kern-Makros"
  - "iOS: Ein abgelehntes Produkt steht nicht mehr tagelang als in Prüfung unter Einreichungen"
  - "iOS: Einreichungen aktualisieren sich beim Öffnen und beim Herunterziehen"
  - "iOS: Abgeschlossene Prüfungen in einem eigenen Abschnitt, mit Begründung bei Ablehnung"
  - "iOS: Das Kalenderband sitzt auf iOS 27 richtig, auch mit ausgeschaltetem Wischen zwischen Tagen"
  - "Android: Ein abgelehntes Produkt steht nicht mehr tagelang als in Prüfung unter Einreichungen"
  - "Android: Einreichungen aktualisieren sich beim Öffnen und beim Herunterziehen"
  - "Android: Abgeschlossene Prüfungen in einem eigenen Abschnitt, mit Begründung bei Ablehnung"
---

## Einfachere Einreichungen

Die beiden Apps verlangten Unterschiedliches, bevor ein Produkt zur Prüfung gehen konnte: iOS gar keine Nährwerte, Android alle acht. Beides passte nicht zu dem, was die Prüfung tatsächlich bewertet. Jetzt gilt in beiden eine Regel: Ein neues Produkt braucht einen Namen, eine Marke, einen Barcode oder die Markierung „ohne Barcode“ sowie Kalorien, Fett, Kohlenhydrate und Protein pro 100 g. Null ist ein Wert, ein leeres Feld nicht. Alles andere ist optional. Eine Korrektur an einem gemeinsamen Produkt braucht einen Namen, eine Marke, sofern das gemeinsame Produkt eine hatte, und mindestens eine sichtbare Änderung; Nährwerte verlangt sie nie. Das Formular sagt dir Feld für Feld, was noch fehlt.

## Abgeschlossene Prüfungen

Bibliothek › Einreichungen hat einen neuen Abschnitt „Abgeschlossene Prüfungen“. Er listet jede entschiedene Prüfung, neueste zuerst, mit dem Ergebnis, dem Datum der Entscheidung und bei einer Ablehnung mit der Begründung der Prüfung. Offene Einreichungen bleiben oben. Ein Tipp auf eine abgeschlossene Prüfung tut nichts; sie ist ein Protokoll, kein Weg zurück ins Produkt.

## Fehlerbehebungen

### iOS

- Ein zur Prüfung eingereichtes Produkt konnte tagelang als in Prüfung stehen, obwohl es abgelehnt war. Das Ergebnis erreichte das Produkt nie, weil seine ID unter Beachtung der Groß- und Kleinschreibung verglichen wurde. Jetzt kommt es an.
- Einreichungen aktualisieren sich beim Öffnen, wenn die letzte Abfrage älter als fünf Minuten ist, und jederzeit beim Herunterziehen der Liste. Kann der Status nicht abgefragt werden, sagt die Liste das, statt so zu tun, als hätte sich nichts geändert.
- Ein abgelehntes Produkt behält die Begründung der Prüfung und zeigt sie unter „Begründung“.
- Die Zeile Einreichungen in der Bibliothek zählt nur noch, was noch in Prüfung ist. Sechs abgeschlossene Prüfungen sahen bisher aus wie sechs offene.
- Auf iOS 27 konnte das Kalenderband bei ausgeschaltetem Wischen zwischen Tagen um ein paar Tage verschoben erscheinen und nach einem Besuch der Einstellungen weiter wandern. Jetzt landet es jedes Mal auf der aktuellen Woche.

### Android

- Ein zur Prüfung eingereichtes Produkt konnte für immer als in Prüfung stehen bleiben. Die App meldete sich bei jedem Start als neuer anonymer Nutzer beim Katalog an und sah deshalb nicht mehr, was ihr früheres Ich eingereicht hatte. Sie behält ihre Identität jetzt, und das Ergebnis kommt an. Produkte, die vor diesem Update eingereicht wurden, gehören zu Identitäten, die die App nicht mehr hat, und bleiben als in Prüfung stehen; reiche sie erneut ein, wenn du sie noch prüfen lassen willst.
- Einreichungen aktualisieren sich beim Öffnen, wenn die letzte Abfrage älter als fünf Minuten ist, und jederzeit beim Herunterziehen der Liste, auch wenn sie leer ist. Kann der Status nicht abgefragt werden, sagt die Liste das, statt so zu tun, als hätte sich nichts geändert.
- Ein abgelehntes Produkt behält die Begründung der Prüfung und zeigt sie unter „Begründung“. Die Begründung ist Teil deines Google-Drive-Backups.

Das komplette Changelog findest du wie immer [hier](https://featurevoting.tobibechtold.dev/app/intake/changelog).

Vielen Dank, dass du Intake nutzt.

Tobi
