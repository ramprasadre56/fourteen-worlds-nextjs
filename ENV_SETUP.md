# Environment Variables Setup

Create a `.env.local` file in the project root with these variables:

```bash
# Database
DATABASE_URL="file:./dev.db"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-change-in-production"

# OAuth - Google
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# OAuth - GitHub  
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""

# Razorpay
RAZORPAY_KEY_ID=""
RAZORPAY_KEY_SECRET=""

# SMTP (for magic link - optional)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER=""
SMTP_PASSWORD=""
```
