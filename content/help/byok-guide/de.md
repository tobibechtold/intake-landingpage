---
id: byok-guide
title: "Eigener API-Schlüssel"
short: "Wähle OpenAI, Claude oder Gemini, hinterlege einmal deinen Schlüssel und erfasse Mahlzeiten per Text oder Foto mit KI, ohne Intake-AI-Abo."
related:
  - set-up-intake-ai
  - intake-ai-subscription
  - intake-ai-text
steps:
  - text: "Öffne in Intake die Einstellungen."
    ios:
      text: "Tippe auf Heute oben auf das Zahnrad."
      image: ./assets/de/ios/1.webp
  - text: "Tippe auf Intake AI und wähle „Meinen API-Schlüssel verwenden“."
    ios:
      text: "Tippe in den Einstellungen unter Integrationen auf Intake AI und wähle „Eigenen API-Schlüssel nutzen“."
      image: ./assets/de/ios/2.webp
  - text: "Wähle denselben Anbieter, bei dem du den Schlüssel erstellt hast. Ein Schlüssel eines Anbieters funktioniert nicht bei einem anderen."
    ios:
      image: ./assets/de/ios/3.webp
  - text: "Behalte das Standardmodell. Ändere den Modellnamen nur, wenn du den exakten Namen eines unterstützten Modells kennst."
    ios:
      image: ./assets/de/ios/4.webp
  - text: "Füge den vollständigen Schlüssel ohne zusätzliche Leerzeichen ein, speichere und sende eine kurze Mahlzeitenbeschreibung zum Testen."
    ios:
      image: ./assets/de/ios/5.webp
draft: true
---

Mit Bring Your Own Key (BYOK) nutzt Intake ein KI-Anbieterkonto, das dir gehört. Nur die Korrekturansicht und das Scannen von Nährwertlabels brauchen Intake AI. Anbieter, optionaler Modellname, API-Schlüssel: Mehr braucht Intake nicht.

## Was ist ein API-Schlüssel?

Ein API-Schlüssel ist wie ein privates Passwort zwischen einer App und einem Onlinedienst. Er zeigt dem Anbieter, über welches Konto eine Anfrage gestellt wird, damit sie verarbeitet und die Nutzung diesem Konto zugeordnet werden kann.

KI-Anbieter messen die Nutzung in Tokens: kleine Textbausteine, die an ein Modell gesendet und von ihm zurückgegeben werden. Eine kurze Mahlzeitenbeschreibung benötigt weniger Tokens als ein langer Chat oder eine ausführliche Fotoanalyse.

Ein API-Konto ist von Abos wie ChatGPT Plus oder Claude Pro getrennt. Folge den Abrechnungshinweisen deines Anbieters, falls du Guthaben oder eine Zahlungsmethode hinterlegen musst.

## Schlüssel erstellen

Öffne die offizielle Schlüssel-Seite deines Anbieters, melde dich an oder erstelle ein Konto und lege einen neuen geheimen Schlüssel an. Kopiere ihn direkt, denn manche Anbieter zeigen den vollständigen Schlüssel nur einmal.

## OpenAI

Nutzt dein OpenAI-API-Konto und dessen aktuelle Nutzungspreise. [API-Schlüssel bei OpenAI erstellen](https://platform.openai.com/api-keys)

## Claude

Nutzt dein Claude-API-Konto und dessen aktuelle Nutzungspreise. [API-Schlüssel bei Claude erstellen](https://platform.claude.com/settings/keys)

## Gemini

Google bietet derzeit eine begrenzte kostenlose Stufe für bestimmte Modelle und Regionen. Sie besitzt Nutzungslimits und kann von Google künftig geändert oder eingestellt werden. [API-Schlüssel bei Gemini erstellen](https://aistudio.google.com/apikey)

## Schlüssel in Intake hinterlegen

Du musst das nur einmal einrichten. Anbieter, Modell oder Schlüssel kannst du später jederzeit in den Einstellungen ändern.

<!-- steps -->

## Dein Schlüssel bleibt auf deinem Gerät

Dein API-Schlüssel wird sicher nur auf deinem Gerät gespeichert. Der Schlüssel selbst verlässt dein Gerät nicht und wird weder an Intake gesendet noch von Intake gespeichert.

Bei BYOK sendet Intake deine Essensanfrage direkt von deinem Gerät an den gewählten Anbieter. Der Anbieter verarbeitet sie nach seinen eigenen Bedingungen und Datenschutzregeln.

## Kosten

Für BYOK fällt kein Intake-AI-Abo an. Dein Anbieter kann die verarbeitete API-Nutzung berechnen, meist anhand von Eingabe- und Ausgabe-Tokens. Manche Anbieter verlangen Guthaben oder eine eingerichtete Abrechnung, prüfe deshalb ihre aktuellen Bedingungen und Preise.

## Wenn es nicht funktioniert

- **Der Schlüssel wird als ungültig gemeldet:** Erstelle einen neuen Schlüssel, kopiere ihn vollständig und prüfe, ob der ausgewählte Anbieter dazu passt.
- **Der Anbieter meldet ein Abrechnungs- oder Guthabenproblem:** Öffne die Abrechnungsseite des Anbieters. Dein API-Konto benötigt möglicherweise Guthaben, eine Zahlungsmethode oder ein aktives Abrechnungsprojekt.
- **Das Modell wird nicht gefunden:** Leere das eigene Modellfeld, um Intakes Standard zu verwenden, oder prüfe den exakten aktuellen Modellnamen in der Dokumentation des Anbieters.
- **Gemini antwortet nicht mehr:** Möglicherweise wurde ein Anfrage- oder Tokenlimit der kostenlosen Stufe erreicht. Warte auf das Zurücksetzen oder prüfe das aktuelle Kontingent in Google AI Studio.

Beginne mit einer einfachen Anfrage, prüfe die KI-Schätzung und korrigiere unplausible Angaben vor dem Speichern.
