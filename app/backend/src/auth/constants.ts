export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'pec-tracking-portal-super-secret-jwt-key-change-in-production',
  expiresIn: '7d',
};

