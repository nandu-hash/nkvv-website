import { hashPassword, verifyPassword, signSessionToken, verifySessionToken, ROLES, SessionPayload } from '../src/lib/auth';

async function testAuth() {
  console.log('Testing Authentication and Session Security...');

  // 1. Password hashing
  const password = 'SuperSecretCompliancePassword2026!';
  const hash = hashPassword(password);
  if (!verifyPassword(password, hash)) {
    throw new Error('Password verification failed');
  }
  if (verifyPassword('WrongPassword', hash)) {
    throw new Error('Password verification gave false positive');
  }
  console.log('✓ Password hashing and timing-safe verification passed');

  // 2. Token signing & tampering protection
  const payload: SessionPayload = {
    userId: 'test-user-id',
    organizationId: 'test-org-id',
    role: ROLES.OWNER,
    email: 'test@nkvelora.co.in',
    name: 'Test Owner',
    orgName: 'NKVV Test Org',
    isDemo: false,
    exp: Date.now() + 100000,
  };

  const token = signSessionToken(payload);
  const verified = verifySessionToken(token);
  if (!verified || verified.userId !== 'test-user-id' || verified.role !== ROLES.OWNER) {
    throw new Error('Token verification failed');
  }

  // Test tampered token
  const tamperedToken = token.slice(0, -4) + 'abcd';
  const tamperedResult = verifySessionToken(tamperedToken);
  if (tamperedResult !== null) {
    throw new Error('Tampered token was accepted!');
  }
  console.log('✓ Token signing and tamper resistance passed');

  console.log('ALL AUTH TESTS PASSED SUCCESSFULLY!');
}

testAuth().catch((err) => {
  console.error(err);
  process.exit(1);
});
