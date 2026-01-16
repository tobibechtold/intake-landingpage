import LegalLayout from "@/components/LegalLayout";
import { useLanguage } from "@/i18n/LanguageContext";

const Privacy = () => {
  const { language } = useLanguage();

  if (language === "de") {
    return (
      <LegalLayout title="Datenschutzerklärung">
        <div className="space-y-6 text-muted-foreground">
          <p className="text-foreground font-medium">Stand: Januar 2026</p>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">1. Verantwortlicher</h2>
            <p>
              Tobias Bechtold<br />
              In den Falzäckern 14<br />
              76307 Karlsbad<br />
              <a href="mailto:support@tobibechtold.dev" className="text-primary hover:underline">support@tobibechtold.dev</a>
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">2. Welche Daten verarbeitet Intake?</h2>
            
            <h3 className="text-lg font-medium text-foreground">a) Daten, die du eingibst</h3>
            <p>Je nach Nutzung können gespeichert werden:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Körperdaten (z.B. Größe, Gewicht, Ziel)</li>
              <li>Mahlzeiten & Lebensmittel-Einträge</li>
              <li>Tagesziele (z.B. Kalorien)</li>
              <li>Notizen oder App-Einstellungen</li>
            </ul>

            <h3 className="text-lg font-medium text-foreground">b) Apple Health Daten (nur mit Zustimmung)</h3>
            <p>Wenn du Apple Health aktivierst, kann Intake folgende Daten abrufen:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Aktivitätskalorien / Bewegungsdaten (je nach freigegebenen Kategorien)</li>
            </ul>
            <p>Die App greift nur auf Daten zu, die du explizit in iOS freigegeben hast.</p>

            <h3 className="text-lg font-medium text-foreground">c) iCloud (optional)</h3>
            <p>Wenn du iCloud Sync aktivierst, werden bestimmte App-Daten in deiner iCloud gespeichert und zwischen Geräten synchronisiert.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">3. Wofür werden Daten verwendet?</h2>
            <p>Die Daten werden verwendet, um:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>dein Kalorienziel und deinen Verlauf darzustellen</li>
              <li>die App-Funktionen bereitzustellen (Tracking, Berechnung, Synchronisation)</li>
            </ul>
            <p className="font-medium text-foreground">Intake verkauft keine Daten.</p>
            <p className="font-medium text-foreground">Intake nutzt keine Daten für Werbung.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">4. Wo werden Daten gespeichert?</h2>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Standardmäßig lokal auf deinem Gerät</li>
              <li>Optional in iCloud, wenn du Sync aktivierst</li>
              <li>Falls du Apple Health nutzt: Health-Daten liegen in iOS Health und werden nur nach Berechtigung verarbeitet</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">5. Weitergabe an Dritte</h2>
            <p>
              Intake gibt keine personenbezogenen Daten an Dritte weiter, außer wenn dies für die Funktion erforderlich ist (z.B. Apple iCloud) oder gesetzlich vorgeschrieben ist.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">6. Analyse/Tracking</h2>
            <p>Intake nutzt keine personalisierte Werbung.</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">7. Daten löschen</h2>
            <p>Du kannst Daten löschen durch:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Löschen von App-Einträgen in der App (falls angeboten)</li>
              <li>Deinstallation der App (lokale Daten)</li>
              <li>Deaktivieren von iCloud Sync (iCloud-Datenverwaltung über Apple)</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">8. Deine Rechte</h2>
            <p>
              Je nach Rechtsraum hast du Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung oder Widerspruch.<br />
              Kontaktiere dafür: <a href="mailto:support@tobibechtold.dev" className="text-primary hover:underline">support@tobibechtold.dev</a>
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">9. Änderungen</h2>
            <p>
              Diese Datenschutzerklärung kann aktualisiert werden. Änderungen werden in der App oder im App Store veröffentlicht.
            </p>
          </section>
        </div>
      </LegalLayout>
    );
  }

  return (
    <LegalLayout title="Privacy Policy">
      <div className="space-y-6 text-muted-foreground">
        <p className="text-foreground font-medium">Last updated: January 2026</p>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">1. Data Controller</h2>
          <p>
            Tobias Bechtold<br />
            Contact: <a href="mailto:support@tobibechtold.dev" className="text-primary hover:underline">support@tobibechtold.dev</a>
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">2. Data We Process</h2>
          
          <h3 className="text-lg font-medium text-foreground">a) Data you enter</h3>
          <p>Examples:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Body metrics (height, weight, goals)</li>
            <li>Food and meal logs</li>
            <li>App settings</li>
          </ul>

          <h3 className="text-lg font-medium text-foreground">b) Apple Health data (with permission)</h3>
          <p>If enabled, Intake may access selected Health data such as activity calories, depending on your permissions.</p>

          <h3 className="text-lg font-medium text-foreground">c) iCloud (optional)</h3>
          <p>If you enable iCloud Sync, your app data may be stored in iCloud to sync across devices.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">3. How We Use Data</h2>
          <p>We use data solely to provide app functionality (logging, calculations, syncing).</p>
          <p className="font-medium text-foreground">We do not sell personal data.</p>
          <p className="font-medium text-foreground">We do not use your data for advertising.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">4. Storage</h2>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Locally on your device by default</li>
            <li>Optionally in iCloud if enabled</li>
            <li>Apple Health data is managed by iOS Health and accessed only as permitted</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">5. Sharing</h2>
          <p>
            We do not share personal data with third parties except where required to provide the service (e.g. Apple iCloud) or required by law.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">6. Analytics</h2>
          <p>No personalized ads.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">7. Deleting Data</h2>
          <p>You can delete data by removing entries (if available), disabling iCloud Sync, or uninstalling the app.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">8. Changes</h2>
          <p>We may update this Privacy Policy from time to time.</p>
        </section>
      </div>
    </LegalLayout>
  );
};

export default Privacy;
