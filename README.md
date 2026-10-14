# Suola Logistics

> **Official Website & Aviation Concierge Hub**  
> Operating from MM2 Local Airport (First Floor, Departure Hall), Ikeja, Lagos, Nigeria.  
> Led by Chief Executive Officer Dolapo Adeniyi.

---

## 🛫 Overview & Business Architecture

Suola Logistics operates as an **on-the-ground aviation & travel concierge and connector**:
- **Flights:** Domestic ticket comparison and issuance across major carriers (Air Peace, Ibom Air, United Nigeria, Overland, ValueJet, Arik Air). On-floor rebooking assistance during airline cancellations.
- **Express Air Cargo:** Direct parcel drop-off at our MM2 First Floor counter with same-day flight dispatch to Abuja, Port Harcourt, Kano, etc.
- **Airport Transfers:** Pre-screened private chauffeurs with executive sedans and SUVs waiting curbside at MM2 arrivals.
- **Hotels & Transit Stays:** Handpicked accommodations in the Ikeja GRA Airport Corridor (5 minutes from MM2) and across Lagos.
- **MM2 VIP Protocol:** Curbside greeting, luggage porterage, and check-in guidance.

### The Connector Model
Suola coordinates bookings, verifies quality, and advocates for travelers. Physical services (flights, rides, freight, accommodations) are provided by licensed, independent partners under their respective terms.

---

## 🛠️ Technical Stack & Architecture

- **Format:** Static HTML5 / Vanilla CSS / Vanilla JS.
- **Design Philosophy:** Radical simplicity, quiet luxury, generous whitespace, and focused utility. Single unified typeface (*Plus Jakarta Sans*).
- **Concierge Booking Engine:** Fast, lightweight 5-tab switcher (Flight, Cargo, Car Hire, Hotel, VIP Protocol) generating structured WhatsApp payloads directly to `+234 702 651 8719`.
- **Zero Build Step:** Directly deployable to GitHub Pages, Netlify, Cloudflare Pages, or any static host.
- **Structured Data:** Semantic HTML5 and Schema.org `TravelAgency` + `LocalBusiness` JSON-LD.

---

## 📂 Project Structure

```
├── .agents/
│   └── skills/
│       └── conversion-web-design/   # Design tokens & conversion guidelines
├── index.html                       # Clean, uncluttered semantic HTML5
├── styles.css                       # Minimalist luxury obsidian design system
├── app.js                           # Fast service switcher & WhatsApp deep links
├── logo.jpg                         # Official brand identity
├── airport.jpg                      # Visual asset: MM2 passenger concourse
├── cargo.jpg                        # Visual asset: Air cargo handling facility
├── hotel-car.jpg                    # Visual asset: Executive transfer vehicle
├── hotel.jpg                        # Visual asset: Executive hotel suite
├── protocol.jpg                     # Visual asset: VIP airport protocol officer
└── README.md                        # Documentation
```

---

## 🚀 Local Testing & Development

Serve using any local HTTP server:

```bash
# Python 3
python -m http.server 8080

# or Node npx
npx serve .
```

Open [http://localhost:8080](http://localhost:8080) in your browser.
