// ============================================================
// Firebase configuration for the BBS Observation App
// ============================================================
// This file holds your Firebase project's connection details.
// These values are NOT secret — they identify your project to
// Firebase, the same way a website address identifies a site.
// Real security comes from Firestore Rules (see firestore.rules),
// not from hiding these values.
// ============================================================

window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyDe2Wp1H6Nou8VFC3Xl20HdKyj88nTitHE",
  authDomain: "bbs-observation.firebaseapp.com",
  projectId: "bbs-observation",
  storageBucket: "bbs-observation.firebasestorage.app",
  messagingSenderId: "353732410201",
  appId: "1:353732410201:web:ad03116002c38e77e4aa48"
};

// ============================================================
// ADMIN EMAILS
// ============================================================
// List every email address that should have ADMIN rights here.
// Admins can:
//   - Add / rename / delete departments
//   - (Everyone can still add observations & action plans as before)
//
// Everyone else only SEES the departments admins have set up —
// they cannot add, rename, or delete them.
//
// IMPORTANT: this list must also be copied into firestore.rules
// (the isAdmin() function there) for the restriction to be
// actually enforced on the server, not just hidden in the UI.
// If you add or remove an admin, update BOTH files and re-publish
// the Firestore rules in the Firebase console.
// ============================================================

window.ADMIN_EMAILS = [
  "naowadee.k@gmail.com"
  // "another.admin@example.com",
];
