# PRISM Dental Digital Visiting Card

A responsive React and Vite digital visiting card for PRISM Dental. The card
uses the original `public/image.png` logo and verified clinic information.

## Run locally (Windows PowerShell)

```powershell
npm.cmd install
npm.cmd run dev
```

Open the local URL printed by Vite.

## Clinic configuration

Edit the `clinic` object near the top of `src/App.jsx` to update verified
business information. Leave optional values empty until they are confirmed:

- `phoneNumbers` controls the call actions and vCard telephone entries.
- `whatsappNumber` is configured independently and controls the WhatsApp link.
- `email` controls the email action and vCard email entry.
- `address`, `hours`, and `socialLinks` control the displayed clinic details.
- `qrDestination` can be set to the card's final public HTTPS URL after
  deployment. When it is blank, the QR code points to the official website;
  it never defaults to localhost.

Only publish contact details and accounts verified as belonging to the clinic.

## Lint and production build

```powershell
npm.cmd run lint
npm.cmd run build
```

Vite writes the production site to `dist/`. For a local production preview:

```powershell
npm.cmd run preview
```

For static hosting, build the project and publish the contents of `dist/`.
Configure the hosting provider to serve `index.html` for the site root. No
deployment or domain changes are performed by this project.
