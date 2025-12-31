# Payment Gateway Integration Guide

**To:** Bank Technical Team / Payment Gateway Developers
**From:** Magan Charkha Development Team
**Date:** 2025-12-31

## 1. System Overview
We are using a modern web technology stack for our e-commerce platform:
*   **Frontend/Backend Framework:** Next.js 15 (React / Node.js runtime)
*   **Database:** Supabase (PostgreSQL)
*   **Hosting:** Vercel / Custom Node Server

## 2. Integration Readiness

### A. Webhook / Callback URL
We have prepared a dedicated server-side endpoint to receive server-to-server notifications (S2S) for payment statuses.

*   **Endpoint URL:** `https://[YOUR_PRODUCTION_DOMAIN]/api/webhooks/payment`
*   **Method:** POST
*   **Content-Type:** `application/json`

**Current Status:**
The endpoint is currently set up to:
1.  Receive `POST` requests.
2.  Parse the JSON body.
3.  Log the payload for debugging.
4.  Return `200 OK` to acknowledge receipt.

**Code Location:**
The handler logic is located in: `src/app/api/webhooks/payment/route.ts`

### B. Security & Verification
We are ready to implement specific security measures as per your documentation:
*   **Checksum / Hash Verification:** We can verify `X-Signature` or equivalent headers.
*   **IP Whitelisting:** If required, we can whitelist your callback server IPs.

### C. Compliance Pages
All mandatory policy pages require for merchant account approval are live and linked in the footer:
*   **Privacy Policy:** `/legal/privacy-policy`
*   **Terms & Conditions:** `/legal/terms-and-conditions`
*   **Refund Policy:** `/legal/refund-policy`
*   **Shipping Policy:** `/legal/shipping-policy`

## 3. What We Need From You
To finalize the integration, please provide:
1.  **API Documentation** (Integration Kit).
2.  **Test/Sandbox Credentials** (Merchant ID, Secret Key, Salt).
3.  **Webhook/Callback Payload Structure** (Sample JSON).
4.  **Checksum Generation Logic** (for verifying transaction integrity).

## 4. Contact
For any technical queries regarding integration, please contact our lead developer or this email alias.
