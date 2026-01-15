import LegalLayout from "@/components/LegalLayout";

const Privacy = () => {
  return (
    <LegalLayout title="Privacy Policy">
      <div className="space-y-6 text-muted-foreground">
        <p className="text-foreground font-medium">Last updated: January 2025</p>
        
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">Overview</h2>
          <p>
            Intake is designed with your privacy in mind. We believe your personal health data should stay personal. 
            This Privacy Policy explains how Intake handles your data.
          </p>
        </section>
        
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">Data Storage</h2>
          <p>
            <strong className="text-foreground">All your data stays on your device.</strong> Intake does not collect, 
            transmit, or store any of your personal information on external servers. Your calorie logs, body measurements, 
            goals, and food entries are stored locally on your iPhone.
          </p>
        </section>
        
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">iCloud Sync</h2>
          <p>
            If you enable iCloud sync, your data is stored in your personal iCloud account. This data is encrypted 
            and only accessible to you through your Apple ID. We do not have access to your iCloud data.
          </p>
        </section>
        
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">Apple Health Integration</h2>
          <p>
            Intake can read from and write to Apple Health with your permission. This integration is handled entirely 
            by iOS and we do not have access to your Apple Health data outside of the app.
          </p>
        </section>
        
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">No Account Required</h2>
          <p>
            Intake does not require you to create an account or provide any personal information to use the app. 
            You can start tracking immediately without signing up.
          </p>
        </section>
        
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">Analytics</h2>
          <p>
            Intake does not use any third-party analytics or tracking services. We do not collect usage data, 
            crash reports, or any other information about how you use the app.
          </p>
        </section>
        
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">Third-Party Services</h2>
          <p>
            Intake uses a food database to provide nutritional information. When you search for food items, 
            search queries may be sent to our database provider. These queries do not contain any personally 
            identifiable information.
          </p>
        </section>
        
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">Contact</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us through the App Store.
          </p>
        </section>
      </div>
    </LegalLayout>
  );
};

export default Privacy;
