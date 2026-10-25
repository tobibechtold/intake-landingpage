---
id: health-connect-estimate
draft: true
title: "Warum Health Connect Kalorien als Schätzung zeigt"
short: "Fitness-Apps schreiben unterschiedliche Daten in Health Connect. Fehlen gemessene Aktivitätskalorien, schätzt Intake sie aus Gesamtkalorien oder Schritten und sagt das dazu, etwa „Aus Schritten geschätzt“."
related:
  - steps-workouts
  - health-read-write
steps:
  - text: "Steht in der Karte „Aktivität“ auf Heute „Aus Schritten geschätzt“ oder „Aus Gesamtkalorien geschätzt“, tippe daneben auf „Mehr dazu“."
    android:
      image: ./assets/de/android/1.webp
  - text: "Unter „So geht Intake damit um“ steht, woraus Intake die Kalorien an diesem Tag berechnet."
    android:
      image: ./assets/de/android/2.webp
---

## Woraus Intake schätzt

- **Aus Schritten geschätzt:** Health Connect hat für den Tag Schritte, aber keine Kalorien. Intake rechnet mit etwa 0,026 kcal pro Schritt bei 70 kg und passt das an dein Gewicht an.
- **Aus Gesamtkalorien geschätzt:** Deine App gibt nur die insgesamt verbrannten Kalorien weiter. Intake zieht deinen Grundumsatz ab, der Rest zählt als Aktivität.
- **Grundumsatz von Intake berechnet:** wie eben, aber Health Connect liefert keinen Grundumsatz. Intake berechnet ihn aus deinen Körperdaten.
- **Trainings plus Schätzung aus Schritten:** Deine App gibt Kalorien nur für Trainings weiter. Intake zählt die Trainings und schätzt den Rest des Tages aus deinen Schritten.
- **„Keine Kalorien von …“:** Deine App gibt Trainings weiter, aber weder Kalorien noch Schritte. Dann zählt Intake 0 kcal Aktivität; ein Training mit Kalorien kannst du selbst eintragen.

Gibt deine App aktive und gesamte Kalorien weiter, nimmt Intake den größeren Wert. Manche Apps schreiben aktive Kalorien nur für Trainings, die Gesamtkalorien abzüglich Grundumsatz zeigen dann den ganzen Tag.

## Musst du etwas tun?

Meist nicht. Fehlen Werte, prüfe:

- Deine Fitness-App steht in Health Connect unter „Daten und Zugriff“ > „Aktivität“ > „Datenquellen und Priorität“. Apps, die dort fehlen, zählen nicht mit.
- Deine Fitness-App darf in Health Connect Kalorien schreiben. Das legst du in ihren Health-Connect-Berechtigungen fest.
- Schreiben mehrere Apps, wählst du unter Einstellungen > „Health-Connect-Aktivität“ bei „Nur diese App verwenden“ die App, die zählt.
