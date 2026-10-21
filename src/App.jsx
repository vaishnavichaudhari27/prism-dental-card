import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import "./App.css";

const clinic = {
  name: "PRISM DENTAL",
  tagline: "IMPLANT & ALIGNER SPECIALITY",
  website: "https://prismdentalpune.com/",
  phoneLines: [
    {
      label: "Main line 1",
      number: "+917559370610",
      url: "tel:+917559370610",
    },
    {
      label: "Main line 2",
      number: "+919158182628",
      url: "tel:+919158182628",
    },
  ],
  whatsapp: {
    number: "919158182628",
    url: "https://wa.me/919158182628",
  },
  email: "",
  address:
    "Prism Dental, A1 Building Entrance, Ground Floor, Mangalmurti Complex, Sinhagad Road, Pune, Maharashtra 411030",
  location: "Pune, Maharashtra, India",
  hours: ["Monday – Saturday: 10:00 AM – 8:00 PM", "Sunday: By appointment only"],
  socialLinks: [
    { label: "Instagram", url: "https://instagram.com/prismdentalpune" },
  ],
  logo: "/image.png",
  qrDestination: "",
};

function getPhoneDigits(value) {
  const digits = value.replace(/\D/g, "");
  return /^[1-9]\d{7,14}$/.test(digits) ? digits : "";
}

function escapeVCard(value) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function Icon({ name }) {
  const common = {
    "aria-hidden": true,
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 1.7,
    viewBox: "0 0 24 24",
  };

  switch (name) {
    case "phone":
      return (
        <svg {...common}>
          <path d="M7 3.8h3l1.4 4-2 1.8a15 15 0 0 0 5 5l1.8-2 4 1.4v3a2 2 0 0 1-2.2 2A15.5 15.5 0 0 1 5 6a2 2 0 0 1 2-2.2Z" />
        </svg>
      );
    case "message":
      return (
        <svg {...common}>
          <path d="M20 11.5a7.5 7.5 0 0 1-7.8 7.2 8 8 0 0 1-3.2-.7L4 19l1.2-4.2a7 7 0 0 1-.9-3.3 7.5 7.5 0 0 1 7.8-7.2 7.5 7.5 0 0 1 7.9 7.2Z" />
          <path d="M9 10.5h6M9 13.5h4" />
        </svg>
      );
    case "external":
      return (
        <svg {...common}>
          <path d="M13 5h6v6M19 5l-9 9" />
          <path d="M18 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
        </svg>
      );
    case "download":
      return (
        <svg {...common}>
          <path d="M12 3v11m0 0 4-4m-4 4-4-4M5 16v4h14v-4" />
        </svg>
      );
    case "pin":
      return (
        <svg {...common}>
          <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
          <circle cx="12" cy="10" r="2.2" />
        </svg>
      );
    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7v5l3.5 2" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...common}>
          <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.7" cy="6.5" r=".8" fill="currentColor" stroke="none" />
        </svg>
      );
    default:
      return null;
  }
}

function ActionCopy({ icon, title, description }) {
  return (
    <>
      <span className="action-icon">
        <Icon name={icon} />
      </span>
      <span className="action-copy">
        <strong>{title}</strong>
        <small>{description}</small>
      </span>
    </>
  );
}

function App() {
  const [logoFailed, setLogoFailed] = useState(false);
  const phoneLines = clinic.phoneLines
    .map((phone) => ({ ...phone, digits: getPhoneDigits(phone.number) }))
    .filter((phone) => phone.digits);
  const whatsappDigits = getPhoneDigits(clinic.whatsapp.number);
  const qrDestination = clinic.qrDestination || clinic.website;
  const addressUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(clinic.address)}`;

  const saveContact = () => {
    const vCard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${escapeVCard(clinic.name)}`,
      `ORG:${escapeVCard(clinic.name)}`,
      ...phoneLines.map((phone) => `TEL;TYPE=WORK,VOICE:+${phone.digits}`),
      ...(clinic.email ? [`EMAIL;TYPE=WORK:${escapeVCard(clinic.email)}`] : []),
      `URL:${clinic.website}`,
      `ADR;TYPE=WORK:;;${escapeVCard(clinic.address)};;;;`,
      "END:VCARD",
    ].join("\r\n");
    const file = new Blob([vCard], { type: "text/vcard;charset=utf-8" });
    const fileUrl = URL.createObjectURL(file);
    const link = document.createElement("a");

    link.href = fileUrl;
    link.download = "PRISM-Dental.vcf";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(fileUrl), 1000);
  };

  return (
    <main className="page">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      <header className="topbar">
        <a
          className="brand"
          href={clinic.website}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="PRISM Dental official website"
        >
          {!logoFailed ? (
            <img
              src={clinic.logo}
              alt="PRISM Dental — Implant & Aligner Speciality"
              className="brand-logo"
              onError={() => setLogoFailed(true)}
            />
          ) : (
            <span className="brand-fallback">{clinic.name}</span>
          )}
        </a>
        <span className="card-label">DIGITAL VISITING CARD</span>
      </header>

      <section className="card" aria-labelledby="clinic-name">
        <div className="card-glow" aria-hidden="true" />
        <div className="card-content">
          <p className="eyebrow">A SPECIALIST DENTAL CLINIC IN PUNE</p>
          <h1 id="clinic-name">{clinic.name}</h1>
          <p className="subtitle">{clinic.tagline}</p>

          <div className="gold-line" aria-hidden="true" />

          <p className="location">
            <Icon name="pin" />
            <span>{clinic.location}</span>
          </p>

          <nav className="action-grid" aria-label="Clinic contact actions">
            {phoneLines[0] && (
              <a
                className="action-button primary"
                href={phoneLines[0].url}
              >
                <ActionCopy
                  icon="phone"
                  title="Call Main Line 1"
                  description={phoneLines[0].number}
                />
              </a>
            )}

            {whatsappDigits && (
              <a
                className="action-button"
                href={clinic.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ActionCopy
                  icon="message"
                  title="WhatsApp"
                  description="Message the clinic"
                />
              </a>
            )}

            <a
              className="action-button"
              href={clinic.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ActionCopy
                icon="external"
                title="Visit Website"
                description="Explore PRISM Dental"
              />
            </a>

            <button
              type="button"
              className="action-button"
              onClick={saveContact}
            >
              <ActionCopy
                icon="download"
                title="Save Contact"
                description="Download a vCard"
              />
            </button>
          </nav>

          <div className="details">
            <section className="detail-block" aria-labelledby="address-heading">
              <h2 id="address-heading">
                <Icon name="pin" />
                Visit the Clinic
              </h2>
              <a
                className="detail-link address-link"
                href={addressUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {clinic.address}
                <span className="directions">Get directions</span>
              </a>
            </section>

            {phoneLines.length > 0 && (
              <section className="detail-block" aria-labelledby="phone-heading">
                <h2 id="phone-heading">
                  <Icon name="phone" />
                  Main phone lines
                </h2>
                <ul className="phone-list">
                  {phoneLines.map((phone) => (
                    <li key={phone.digits}>
                      <a className="detail-link" href={phone.url}>
                        <span>{phone.label}: </span>
                        {phone.number}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section className="detail-block" aria-labelledby="hours-heading">
              <h2 id="hours-heading">
                <Icon name="clock" />
                Clinic Hours
              </h2>
              <ul className="hours-list">
                {clinic.hours.map((hours) => (
                  <li key={hours}>{hours}</li>
                ))}
              </ul>
            </section>

            {clinic.email && (
              <section className="detail-block" aria-labelledby="email-heading">
                <h2 id="email-heading">Email</h2>
                <a className="detail-link" href={`mailto:${clinic.email}`}>
                  {clinic.email}
                </a>
              </section>
            )}
          </div>

          <section className="qr-section" aria-labelledby="qr-heading">
            <div className="qr-box">
              <QRCodeSVG
                value={qrDestination}
                size={112}
                bgColor="#ffffff"
                fgColor="#101a2b"
                level="H"
                marginSize={2}
                title="QR code to visit the official PRISM Dental website"
              />
            </div>
            <div className="qr-copy">
              <h2 id="qr-heading">SCAN TO VISIT THE WEBSITE</h2>
              <p>
                This QR code opens the official PRISM Dental website.
              </p>
              <a href={qrDestination} target="_blank" rel="noopener noreferrer">
                prismdentalpune.com
                <Icon name="external" />
              </a>
            </div>
          </section>

          {clinic.socialLinks.length > 0 && (
            <nav className="social-links" aria-label="Official social accounts">
              {clinic.socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name={social.label.toLowerCase()} />
                  <span>{social.label}</span>
                </a>
              ))}
            </nav>
          )}
        </div>

        <div className="card-footer">
          <span>{clinic.name}</span>
          <span>{clinic.location.toUpperCase()}</span>
        </div>
      </section>

      <footer className="page-footer">
        <span>IMPLANT & ALIGNER SPECIALITY</span>
        <a href={clinic.website} target="_blank" rel="noopener noreferrer">
          prismdentalpune.com
        </a>
      </footer>
    </main>
  );
}

export default App;
