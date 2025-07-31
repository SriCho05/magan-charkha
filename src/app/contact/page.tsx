
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold mb-2">
          Get in Touch
        </h1>
        <p className="text-lg text-muted-foreground">
          We'd love to hear from you. Reach out with any questions or just to say hello.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <Mail className="w-6 h-6 text-primary" />
              Contact Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 mt-1 text-primary" />
              <div>
                <h3 className="font-semibold text-foreground">Our Address</h3>
                <p>Magan Sangrahalaya, Kumarappa Rd, Collectors Colony, Wardha, Maharashtra 442001</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="w-5 h-5 mt-1 text-primary" />
              <div>
                <h3 className="font-semibold text-foreground">Email Us</h3>
                <p>contact@magancharkha.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="w-5 h-5 mt-1 text-primary" />
              <div>
                <h3 className="font-semibold text-foreground">Call Us</h3>
                <p>+91 123 456 7890</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14917.439066347167!2d78.58309194246837!3d20.73812242138986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd47f1374ad764f%3A0x550e2d862ef2c73!2sMagan%20Sangrahalaya%20Samiti!5e0!3m2!1sen!2sin!4v1721323315931!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Magan Sangrahalaya Location"
            ></iframe>
        </Card>
      </div>
    </div>
  );
}
