const { execSync } = require('child_process');

const envs = {
  NEXT_PUBLIC_FIREBASE_API_KEY: 'AIzaSyA5MctsqnAz--NwyZFZJ1ujkZCTWJScKnI',
  NEXT_PUBLIC_FIREBASE_APP_ID: '1:253748789803:web:b98eb23186e1b4a521606e',
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: 'fourteen-worlds-auth.firebaseapp.com',
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: '253748789803',
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: 'fourteen-worlds-auth',
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: 'fourteen-worlds-auth.firebasestorage.app'
};

for (const [key, value] of Object.entries(envs)) {
  console.log(`Removing ${key}...`);
  try {
    execSync(`vercel env rm ${key} production -y`, { stdio: 'inherit' });
  } catch (e) {
    console.error(`Failed to remove ${key}: ${e.message}`);
  }
}

for (const [key, value] of Object.entries(envs)) {
  console.log(`Adding ${key}...`);
  try {
    execSync(`vercel env add ${key} production`, { input: value, stdio: ['pipe', 'inherit', 'inherit'] });
  } catch (e) {
    console.error(`Failed to add ${key}: ${e.message}`);
  }
}
