import 'package:flutter_test/flutter_test.dart';
import 'package:frontend/src/features/auth/presentation/validators/auth_validators.dart';

void main() {
  group('AuthValidators', () {
    test('email validator rejects empty values', () {
      expect(AuthValidators.email(''), 'Email address is required.');
    });

    test('password validator rejects short passwords', () {
      expect(
        AuthValidators.password('short'),
        'Password must be at least 8 characters.',
      );
    });

    test('confirm password validator rejects mismatched passwords', () {
      expect(
        AuthValidators.confirmPassword('password123', 'password456'),
        'Passwords do not match.',
      );
    });

    test('validators accept valid values', () {
      expect(AuthValidators.email('user@example.com'), isNull);
      expect(AuthValidators.password('password123'), isNull);
      expect(
        AuthValidators.confirmPassword('password123', 'password123'),
        isNull,
      );
    });
  });
}
