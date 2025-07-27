
import { initializeApp, getApps, App, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const apps = getApps();

const ADMIN_APP_NAME = 'khadi-kraft-admin';

let adminApp: App;

if (!apps.find((app) => app.name === ADMIN_APP_NAME)) {
  const serviceAccount = {
    "type": "service_account",
    "project_id": "khadi-kraft",
    "private_key_id": "3b04b871af9393401397e0b907ff6a7289e5fde3",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQD9Q/u8h5NNVbSb\nAdVuaUkdEhU6KBEJZ1tsw/oa0GEUopNgQJOiA8niVxHEL804GKYHsiduG8R9LT9B\n7B1yCd9NNd8ZdniOEDteUoovKuiVcXF6mn2yIfC/GQFWCNH4O+I8pyED8wZzFzV+\nNTPtMRfmuYkt3AovHpUfGK9ml/bS/8h2rRvpLVf9ZYJCRBeahFtwsosB3U822HnS\nvIaWS3JQpDoaRcCj8uEvF3cgbk5y9IulXQ6s5jqTCiArb65qzFTNjHhfSQSe4KWM\nuiS/YrKHvy1acmS/f7MaNHibgPr9MdMivQPAQ1W2dmfWpTDTQ4UKlVdFKtH514RL\naun1rRtDAgMBAAECggEAJ+cNovsDUMRnk6J6044ACHYAZSzJ3l7r7xuDbLUXDo68\nxIX4HKcXKDOKp4vWe/eaNQ0zHCyAzS4TUNoYG48FoR8TOupI/Sz+hZJgliTfByib\n9fKgSjABw8H3TWxPVJpuvxqf34TrJ7fo5C0StNSuzNm/jLul2R2q5f7YJ8RajYyR\n9vPQVZk7x3Il77ZPvzgtWLAfFw0hKyQ/HKOKbM+gIO9/+jMgaHg2w65xU7OWE9xr\n6Y1VUKnHYapUFVh+oaIZy3d+bQFX9O5eSDU2/ng22whf07uVQwH+Q5qeVAGH3Oe+\nrOwXal+CahdR7Hrnf909r4Fk8rvfxXSSOHFOuRSoCQKBgQD/Pc7EvoKFJBy6TGc/\nnMzMNfWYCMD2K53GOoL1itG4kF8QWYfOl/sqQsaIPBADw8N5lmswv/uCDA27LpAp\n7R88fMmbK/4vaANjESuIOWKZlho0KdFKyrgrNJA244bup7u9f/AVSdGSnu1zMCKA\nVoMh1mS+cI4lCJJGL4dI59t+mwKBgQD+BKwgqVU9w5rJbTjtBvRM+TkxOVgLPJtN\nF0Km0RY1QXzv5L0jFbuo/favvaGlubqNo8I0psNGKJsv+d8I3rKgJ5KoIYiq4siA\nr7WOYwl/kYEAk1tyFKHQYH5pckMqe9NkE6n6NyZVrZBeT4p8wAV1pMwvwTDs02lG\nXbq3120MeQKBgGkhmjMrjTMt5q9NnRF0kl5is2AF6wT6figSHbLplOyCesWPOwL7\nUrbbfk7K/oWucqt4K3qO+Rddw6If0b2TL9SISboiarY4D30Uq2uWx2gfjXeC6fP2\nf9k781LIcOGIMSoisk7ycuIDmCZj4zIdcDHVzvUqA0J5v1YtaXm8FoqVAoGBAOtq\n5SO4C9ocKJ45baKu6UdVSt4F6UUwvDWsMwdrjAt7UBD8ixWzFKLADBo/w0pWYUDX\n3irxytSA2aKTD1OnISEwy8iqm4DUgUJSlg8KVkk2Trp71ypZWMZIR5/uV7VN4VJE\nrynIZuzM2JmvWgfX5rdrLhmsEG3MWSrvZh4vt07xAoGATlveh9GXzU0MRPtFB8J6\nMEg1xXLVtdgwoxK2Cs0R4rINI/+fhuJIpup/ZF3UBJboaNghPM2rxW55SuXb8/Gy\nuzuF4YKsrY1KaQMdbBT+l+6NH6EvF3wlRbKwo16JlkUqGSYu5fXMeChIITDnymKQ\nRwJ5md9QoAsyio2KR3dP0ag=\n-----END PRIVATE KEY-----\n".replace(/\\n/g, '\n'),
    "client_email": "firebase-adminsdk-fbsvc@khadi-kraft.iam.gserviceaccount.com",
    "client_id": "116290133593362334788",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40khadi-kraft.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  };

  adminApp = initializeApp(
    {
      credential: cert(serviceAccount),
    },
    ADMIN_APP_NAME
  );

} else {
  adminApp = apps.find((app) => app.name === ADMIN_APP_NAME)!;
}

export const adminDb = getFirestore(adminApp);
