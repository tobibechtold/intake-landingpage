import LegalLayout from "@/components/LegalLayout";
import SeoHead from "@/components/SeoHead";
import { useLanguage } from "@/i18n/LanguageContext";

const Privacy = () => {
  const { language } = useLanguage();

  if (language === "de") {
    return (
      <>
        <SeoHead />
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

            <h3 className="text-lg font-medium text-foreground">b) Health-Integrationen (nur mit Zustimmung)</h3>
            <p>Wenn du Integrationen aktivierst, kann Intake folgende Daten abrufen:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>iOS: Daten aus Apple Health (z.B. Aktivitätskalorien), je nach freigegebenen Kategorien</li>
              <li>Android: Daten über Health Connect, je nach erteilten Berechtigungen</li>
            </ul>
            <p>Die App greift nur auf Daten zu, die du explizit im jeweiligen Betriebssystem freigegeben hast.</p>

            <h3 className="text-lg font-medium text-foreground">c) Cloud-Sync (optional)</h3>
            <p>Wenn du Sync aktivierst, können bestimmte App-Daten je nach Plattform in iCloud (iOS) oder Google Drive (Android) gespeichert und zwischen Geräten synchronisiert werden.</p>
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
              <li>Optional in iCloud (iOS) oder Google Drive (Android), wenn du Sync aktivierst</li>
              <li>Falls du Health-Integrationen nutzt: Daten in Apple Health (iOS) oder Health Connect (Android) werden nur nach Berechtigung verarbeitet</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">5. Weitergabe an Dritte</h2>
            <p>
              Intake gibt keine personenbezogenen Daten an Dritte weiter, außer wenn dies für die Funktion erforderlich ist (z.B. Apple iCloud, Google Drive oder Health-Plattformen) oder gesetzlich vorgeschrieben ist.
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
              <li>Deaktivieren von iCloud Sync oder Google-Drive-Sync (Cloud-Datenverwaltung über die jeweilige Plattform)</li>
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
              Diese Datenschutzerklärung kann aktualisiert werden. Änderungen werden in der App oder in den jeweiligen Stores (App Store / Google Play) veröffentlicht.
            </p>
          </section>
          </div>
        </LegalLayout>
      </>
    );
  }

  return (
    <>
      <SeoHead />
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

          <h3 className="text-lg font-medium text-foreground">b) Health integrations (with permission)</h3>
          <p>If enabled, Intake may access selected Health data based on your platform permissions:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>iOS: Apple Health data (e.g. activity calories)</li>
            <li>Android: Health Connect data (based on granted categories)</li>
          </ul>

          <h3 className="text-lg font-medium text-foreground">c) Cloud sync (optional)</h3>
          <p>If enabled, your app data may be stored in iCloud (iOS) or Google Drive (Android) to sync across devices.</p>
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
            <li>Optionally in iCloud (iOS) or Google Drive (Android) if enabled</li>
            <li>Health integration data is managed by Apple Health (iOS) or Health Connect (Android) and accessed only as permitted</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">5. Sharing</h2>
          <p>
            We do not share personal data with third parties except where required to provide the service (e.g. Apple iCloud, Google Drive, or health platform providers) or required by law.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">6. Analytics</h2>
          <p>No personalized ads.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">7. Deleting Data</h2>
          <p>You can delete data by removing entries (if available), disabling iCloud/Google Drive sync, or uninstalling the app.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">8. Changes</h2>
          <p>We may update this Privacy Policy from time to time.</p>
        </section>
        </div>
      </LegalLayout>
    </>
  );
};

export default Privacy;
