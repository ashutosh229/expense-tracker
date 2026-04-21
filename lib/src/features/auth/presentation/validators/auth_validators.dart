class AuthValidators {
  const AuthValidators._();

  static String? email(String? value) {
    final text = value?.trim() ?? '';

    if (text.isEmpty) {
      return 'Email address is required.';
    }

    final emailPattern = RegExp(r'^[^@\s]+@[^@\s]+\.[^@\s]+$');
    if (!emailPattern.hasMatch(text)) {
      return 'Enter a valid email address.';
    }

    return null;
  }

  static String? password(String? value) {
    final text = value ?? '';

    if (text.isEmpty) {
      return 'Password is required.';
    }

    if (text.length < 8) {
      return 'Password must be at least 8 characters.';
    }

    return null;
  }

  static String? confirmPassword(String? value, String password) {
    if ((value ?? '').isEmpty) {
      return 'Please confirm your password.';
    }

    if (value != password) {
      return 'Passwords do not match.';
    }

    return null;
  }
}
