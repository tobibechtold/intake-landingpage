import LegalLayout from "@/components/LegalLayout";
import { useLanguage } from "@/i18n/LanguageContext";

const Terms = () => {
  const { language } = useLanguage();

  if (language === "de") {
    return (
      <LegalLayout title="Nutzungsbedingungen">
        <div className="space-y-6 text-muted-foreground">
          <p className="text-foreground font-medium">Stand: Januar 2026</p>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">1. Anbieter</h2>
            <p>
              Intake wird bereitgestellt von:
              <br />
              Tobias Bechtold
              <br />
              In den Falzäckern 14
              <br />
              76307 Karlsbad
              <br />
              <a href="mailto:support@tobibechtold.dev" className="text-primary hover:underline">
                support@tobibechtold.dev
              </a>
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">2. Zweck der App</h2>
            <p>
              Intake ist eine App zum Protokollieren von Lebensmitteln, Mahlzeiten und geschätzten Nährwerten (z.B.
              Kalorien und Makronährstoffe). Die App dient ausschließlich der persönlichen Orientierung.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">3. Kein medizinischer Rat / keine Garantie</h2>
            <p>
              Intake ist kein Medizinprodukt und ersetzt keine ärztliche oder ernährungsmedizinische Beratung. Alle
              Berechnungen, Zielwerte und Schätzungen (z.B. Grundumsatz, Kalorienziel, Defizit) können ungenau sein und
              sind nicht als verbindliche Empfehlung zu verstehen. Ergebnisse können variieren. Es wird keine Garantie
              für Gewichtsverlust, Gewichtszunahme oder andere Ergebnisse übernommen.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">4. Apple Health</h2>
            <p>
              Wenn du Apple Health verbindest, kann Intake – nur mit deiner Zustimmung – ausgewählte Gesundheitsdaten
              lesen oder schreiben (z.B. Aktivitätskalorien). Du kannst diese Berechtigungen jederzeit in iOS unter
              Einstellungen → Datenschutz & Sicherheit → Health ändern.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">5. iCloud Synchronisation (optional)</h2>
            <p>
              Wenn du die iCloud-Synchronisation aktivierst, können von dir eingegebene Daten (z.B. Mahlzeiten, Ziele,
              Verläufe) in deiner iCloud gespeichert und zwischen deinen Geräten synchronisiert werden. Die Nutzung ist
              optional.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">6. Inhalte und Datenbankquellen</h2>
            <p>
              Intake kann Daten aus externen Quellen verwenden (z.B. Open Food Facts oder ähnliche Datenbanken). Für
              Richtigkeit, Vollständigkeit und Aktualität dieser Daten übernimmt der Anbieter keine Gewähr.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">7. Verantwortlichkeiten der Nutzer:innen</h2>
            <p>
              Du bist dafür verantwortlich, die App nur im Rahmen der geltenden Gesetze und dieser Bedingungen zu
              nutzen. Wenn du gesundheitliche Einschränkungen hast oder zu Essstörungen neigst, nutze die App bitte nur
              nach Rücksprache mit medizinischem Fachpersonal.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">8. Verfügbarkeit</h2>
            <p>
              Der Anbieter bemüht sich um eine hohe Verfügbarkeit, kann jedoch keine unterbrechungsfreie Nutzung
              garantieren. Wartungen oder technische Störungen können auftreten.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">9. Haftung</h2>
            <p>
              Soweit gesetzlich zulässig, haftet der Anbieter nicht für Schäden, die aus der Nutzung oder
              Nichtverfügbarkeit der App entstehen, insbesondere nicht für mittelbare Schäden, entgangenen Gewinn oder
              gesundheitliche Folgen.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">10. Änderungen</h2>
            <p>
              Der Anbieter kann diese Nutzungsbedingungen anpassen. Wesentliche Änderungen werden in der App oder über
              den App Store angezeigt.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">11. Kontakt</h2>
            <p>
              Bei Fragen:{" "}
              <a href="mailto:support@tobibechtold.dev" className="text-primary hover:underline">
                support@tobibechtold.dev
              </a>
            </p>
          </section>
        </div>
      </LegalLayout>
    );
  }

  return (
    <LegalLayout title="Terms of Use">
      <div className="space-y-6 text-muted-foreground">
        <p className="text-foreground font-medium">Last updated: January 2026</p>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">1. Provider</h2>
          <p>
            Provided by: <br />
            Tobias Bechtold
            <br />
            In den Falzäckern 14
            <br />
            76307 Karlsbad
            <br />
            Contact:{" "}
            <a href="mailto:support@tobibechtold.dev" className="text-primary hover:underline">
              support@tobibechtold.dev
            </a>
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">2. Purpose</h2>
          <p>
            Intake is a food and nutrition logging app providing estimated calories and macro information for personal
            reference only.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">3. No Medical Advice / No Guaranteed Results</h2>
          <p>
            Intake is not a medical device and does not provide medical advice. Any calculations or targets (e.g.
            calorie goals, deficit suggestions) are estimates and may be inaccurate. Results may vary. No guarantee of
            weight loss, weight gain, or any outcome is provided.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">4. Apple Health</h2>
          <p>
            If you connect Apple Health, Intake may read (and/or write) selected Health data only with your permission.
            You can change permissions at any time in iOS settings.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">5. iCloud Sync (optional)</h2>
          <p>
            If enabled, your app data may be stored in iCloud and synced across your devices. This feature is optional.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">6. External Databases</h2>
          <p>
            Intake may use external food databases. We do not guarantee the accuracy or completeness of third-party
            data.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">7. Availability</h2>
          <p>We aim for high availability but cannot guarantee uninterrupted service.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">8. Liability</h2>
          <p>
            To the maximum extent permitted by law, we are not liable for damages resulting from your use or inability
            to use the app.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">9. Changes</h2>
          <p>We may update these Terms from time to time.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">10. Contact</h2>
          <p>
            Support:{" "}
            <a href="mailto:support@tobibechtold.dev" className="text-primary hover:underline">
              support@tobibechtold.dev
            </a>
          </p>
        </section>
      </div>
    </LegalLayout>
  );
};

export default Terms;
