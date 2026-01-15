import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-card/30">
      <div className="container py-12">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Intake" className="w-8 h-8" />
            <span className="text-lg font-semibold text-foreground">Intake</span>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 md:gap-12">
            <div className="flex flex-col gap-3">
              <span className="text-sm font-semibold text-foreground">Legal</span>
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Use
              </Link>
              <Link to="/datenschutz" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Datenschutzerklärung
              </Link>
            </div>
            
            <div className="flex flex-col gap-3">
              <span className="text-sm font-semibold text-foreground">App</span>
              <a 
                href="https://apps.apple.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                App Store
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-border/50">
          <p className="text-xs text-muted-foreground text-center">
            © {new Date().getFullYear()} Intake. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
