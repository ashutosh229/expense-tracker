process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret';
process.env.DATABASE_URL ??=
  'postgresql://postgres:postgres@localhost:5433/expense_tracker_test?schema=public';
