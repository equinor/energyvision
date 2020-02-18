# EnergyVision Risk Management

Potential risks and steps on how to avoid them from the technical end. 

Some of this may seem obvious but it's good to be thorough.

---

- Data needs to be stored on secure servers, preferably located within Europe.
  - Countries that should be avoided due to laws and regulations concerning access to data, encryption, or privacy include at
  least the US, the UK, and Australia.
- Data needs to be stored and handled in compliance with the GDPR.
- Access to data should be restricted to approved internal Equinor users only
- User authentication for the backend should be handled by Equinor's Azure AD
- The frontend of the website could be hosted seperately on a different platform from the CMS in case of outtages.
- The content APIs should be as closed/restricted to the public as possible.
  - Endpoints that are not used for the frontend should not be publicly available.
  - APIs should not return any meta or identifying data unless said data is required or used on the frontend.
- Analytical tools on the frontend (such as Google Analytics) must be GDPR compliant. Any tracking must be made apparent and
  affirmative consent must be given by users **before** any data is tracked. Users must be able to retract their consent and opt 
  out of data tracking at any time.
- Any forms of input where data is sent from the public client side to the backend must be sanitized and secured to prevent
  malicious code injection or the retrieval of non-public data.
  - This includes any input forms such as newsletter signups, contact forms, or search fields as well as URL query parameters.
  - This should be secured both on the frontend as well as on the backend.
- The frontend should be served by a cdn/proxy to provide more efficient delivery and protect against potential DDOS attacks.
- The CMS editor(s) needs to have a sufficient access-control system to restrict/grant access to specific sections and content
  on an individual and/or role basis.
