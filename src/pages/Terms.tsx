import LegalLayout from "@/components/LegalLayout";

const Terms = () => {
  return (
    <LegalLayout title="Terms of Use">
      <div className="space-y-6 text-muted-foreground">
        <p className="text-foreground font-medium">Last updated: January 2025</p>
        
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">Agreement to Terms</h2>
          <p>
            By downloading and using Intake, you agree to be bound by these Terms of Use. If you do not agree 
            to these terms, please do not use the app.
          </p>
        </section>
        
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">License</h2>
          <p>
            Intake grants you a limited, non-exclusive, non-transferable, revocable license to use the app 
            for your personal, non-commercial purposes. This license does not include the right to modify, 
            distribute, or create derivative works of the app.
          </p>
        </section>
        
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">One-Time Purchase</h2>
          <p>
            Intake is available as a one-time purchase through the App Store. There are no subscription fees 
            or recurring charges. All purchases are processed through Apple and are subject to Apple's terms and conditions.
          </p>
        </section>
        
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">Disclaimer</h2>
          <p>
            Intake is intended for informational purposes only and is not a substitute for professional medical advice, 
            diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with 
            any questions you may have regarding a medical condition or dietary changes.
          </p>
          <p>
            The nutritional information provided in the app comes from third-party sources and may not be 100% accurate. 
            Users should verify nutritional information independently when accuracy is critical.
          </p>
        </section>
        
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, Intake shall not be liable for any indirect, incidental, 
            special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred 
            directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting 
            from your use of the app.
          </p>
        </section>
        
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. We will notify users of any changes by 
            updating the "Last updated" date of these Terms of Use. Your continued use of the app after any 
            changes constitutes your acceptance of the new terms.
          </p>
        </section>
        
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">Contact</h2>
          <p>
            If you have any questions about these Terms of Use, please contact us through the App Store.
          </p>
        </section>
      </div>
    </LegalLayout>
  );
};

export default Terms;
