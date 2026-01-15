import LegalLayout from "@/components/LegalLayout";

const Datenschutz = () => {
  return (
    <LegalLayout title="Datenschutzerklärung">
      <div className="space-y-6 text-muted-foreground">
        <p className="text-foreground font-medium">Stand: Januar 2025</p>
        
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">1. Verantwortlicher</h2>
          <p>
            Verantwortlich für die Datenverarbeitung im Rahmen der Intake App ist der App-Entwickler. 
            Kontaktaufnahme ist über den App Store möglich.
          </p>
        </section>
        
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">2. Grundsatz der Datenverarbeitung</h2>
          <p>
            <strong className="text-foreground">Intake wurde mit dem Grundsatz „Privacy by Design" entwickelt.</strong> Alle 
            Ihre personenbezogenen Daten wie Körperdaten, Kalorienziele und Ernährungsprotokolle werden ausschließlich 
            lokal auf Ihrem Gerät gespeichert. Es erfolgt keine Übertragung an externe Server.
          </p>
        </section>
        
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">3. Erhobene Daten</h2>
          <p>Die App verarbeitet folgende Daten, die Sie selbst eingeben:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Körperdaten (Gewicht, Größe, Alter, Geschlecht)</li>
            <li>Ernährungsziele (Gewicht verlieren, halten oder zunehmen)</li>
            <li>Nahrungsmitteleinträge und Kalorienprotokoll</li>
            <li>Selbst erstellte Nahrungsmittel</li>
          </ul>
        </section>
        
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">4. Datenspeicherung</h2>
          <p>
            Alle Daten werden ausschließlich lokal auf Ihrem iPhone gespeichert. Wir haben keinen Zugriff auf diese Daten. 
            Bei Deinstallation der App werden alle lokalen Daten gelöscht.
          </p>
        </section>
        
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">5. iCloud-Synchronisation</h2>
          <p>
            Wenn Sie die iCloud-Synchronisation aktivieren, werden Ihre Daten in Ihrem persönlichen iCloud-Konto 
            gespeichert. Diese Daten sind verschlüsselt und nur über Ihre Apple-ID zugänglich. Wir haben keinen 
            Zugriff auf Ihre iCloud-Daten. Die Datenverarbeitung erfolgt gemäß den Datenschutzrichtlinien von Apple.
          </p>
        </section>
        
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">6. Apple Health Integration</h2>
          <p>
            Mit Ihrer Zustimmung kann Intake Daten aus Apple Health lesen und dorthin schreiben. Diese Integration 
            wird vollständig von iOS verwaltet. Wir haben keinen Zugriff auf Ihre Apple Health Daten außerhalb der App. 
            Die Rechtsgrundlage hierfür ist Ihre ausdrückliche Einwilligung (Art. 6 Abs. 1 lit. a DSGVO).
          </p>
        </section>
        
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">7. Nahrungsmittel-Datenbank</h2>
          <p>
            Bei der Suche nach Nahrungsmitteln werden Suchanfragen an unseren Datenbank-Anbieter gesendet. 
            Diese Anfragen enthalten keine personenbezogenen Daten und können nicht mit Ihnen in Verbindung gebracht werden.
          </p>
        </section>
        
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">8. Keine Analyse- oder Tracking-Dienste</h2>
          <p>
            Intake verwendet keine Analyse- oder Tracking-Dienste von Drittanbietern. Wir erheben keine Nutzungsdaten, 
            Absturzberichte oder sonstige Informationen über Ihre Nutzung der App.
          </p>
        </section>
        
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">9. Keine Registrierung erforderlich</h2>
          <p>
            Für die Nutzung von Intake ist keine Registrierung oder Angabe persönlicher Daten erforderlich. 
            Sie können die App sofort ohne Anmeldung nutzen.
          </p>
        </section>
        
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">10. Ihre Rechte</h2>
          <p>Da alle Daten lokal auf Ihrem Gerät gespeichert werden, haben Sie die volle Kontrolle:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong className="text-foreground">Auskunftsrecht:</strong> Alle Ihre Daten sind jederzeit in der App einsehbar</li>
            <li><strong className="text-foreground">Berichtigungsrecht:</strong> Sie können alle Daten jederzeit in der App ändern</li>
            <li><strong className="text-foreground">Löschungsrecht:</strong> Sie können einzelne Einträge oder alle Daten durch Deinstallation löschen</li>
            <li><strong className="text-foreground">Datenübertragbarkeit:</strong> Ihre Daten können über iCloud auf andere Geräte übertragen werden</li>
          </ul>
        </section>
        
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">11. Änderungen dieser Datenschutzerklärung</h2>
          <p>
            Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf zu aktualisieren. Die aktuelle Version 
            ist stets auf dieser Website verfügbar.
          </p>
        </section>
        
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">12. Kontakt</h2>
          <p>
            Bei Fragen zur Datenschutzerklärung können Sie uns über den App Store kontaktieren.
          </p>
        </section>
      </div>
    </LegalLayout>
  );
};

export default Datenschutz;
