
import { initializeApp, getApps, App, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import 'dotenv/config'

const apps = getApps();

const ADMIN_APP_NAME = 'khadi-kraft-admin';

let adminApp: App;

if (!apps.find((app) => app.name === ADMIN_APP_NAME)) {
  const serviceAccountString = process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS;

  if (!serviceAccountString) {
    throw new Error('The GOOGLE_SERVICE_ACCOUNT_CREDENTIALS environment variable is not set. Please generate a service account key in the Firebase console and set it in your .env file.');
  }
  
  try {
    const serviceAccount = JSON.parse(serviceAccountString);
    adminApp = initializeApp(
      {
        credential: cert(serviceAccount),
      },
      ADMIN_APP_NAME
    );
  } catch(e) {
    console.error("Could not parse service account credentials. Make sure it's a valid JSON object in your .env file.")
    throw e;
  }

} else {
  adminApp = apps.find((app) => app.name === ADMIN_APP_NAME)!;
}

export const adminDb = getFirestore(adminApp);
