
import { initializeApp, getApps, App, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const apps = getApps();

const BOGO_APP_NAME = 'bogo-admin-app';

let adminApp: App;

if (!apps.find((app) => app.name === BOGO_APP_NAME)) {
  adminApp = initializeApp(
    {
      // Using App Default Credentials, so no need to specify credentials here
      // projectId is also inferred from the environment
    },
    BOGO_APP_NAME
  );
} else {
  adminApp = apps.find((app) => app.name === BOGO_APP_NAME)!;
}

export const adminDb = getFirestore(adminApp);
