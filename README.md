# Javier Nieves-Vazquez — Combined Portfolio

Combines the bold editorial colors, typography, animated geometric shapes, and skill filters of the expressive design with the polished coding illustration and professional skill-focused content of the original developer design. No reference mountain image.

Three pages: Home (`index.html`), Skills (`skills.html`), and Contact (`contact.html`). All CSS is external in `css/style.css`; JavaScript in `js/script.js`. Includes accessible table headers, input labels, form validation, mobile menu, theme switch, and filters.

Open `index.html` in a browser or VS Code Live Server. To publish, upload the *contents* of this folder to the root of a GitHub repository, then Settings → Pages → Deploy from a branch → main → /(root).

**For Deliverable 2:** After publishing, run Lighthouse accessibility audits on the live Skills and Contact pages, capture screenshots, and prepare the required 1–2 page PDF report. The contact form validates but does not send email.


## Enable real contact form delivery

1. Create a free account at https://formspree.io/ and verify your email.
2. Create a new form and select the email address that should receive messages.
3. Copy your Formspree endpoint, which looks like `https://formspree.io/f/abcdefgh`.
4. Open `contact.html` and use the configured endpoint `https://formspree.io/f/xljbrnnw` (already added).
5. Publish the site and submit a test message from `contact.html`. Check your Formspree dashboard and inbox.

The form does **not** deliver messages until the Formspree ID is configured. It uses JavaScript validation and an asynchronous POST request to Formspree, showing success only after the service accepts the submission. Formspree may require account verification and may apply spam protection and usage limits.
