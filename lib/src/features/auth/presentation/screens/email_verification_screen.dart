import 'package:flutter/material.dart';

import '../widgets/auth_scaffold.dart';
import '../widgets/primary_auth_button.dart';
import 'login_screen.dart';

class EmailVerificationScreen extends StatelessWidget {
  const EmailVerificationScreen({
    required this.email,
    super.key,
  });

  static const routeName = '/verify-email';

  final String email;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return AuthScaffold(
      title: 'Verify your email',
      subtitle:
          'We sent a verification link to your email address. Open it to activate your account.',
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: theme.colorScheme.primaryContainer.withValues(alpha: 0.45),
              borderRadius: BorderRadius.circular(18),
            ),
            child: Row(
              children: [
                Icon(
                  Icons.mark_email_read_outlined,
                  color: theme.colorScheme.primary,
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Text(
                    email.isEmpty ? 'Verification email sent.' : email,
                    style: theme.textTheme.titleMedium,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 20),
          Text(
            'After you verify the email, continue to login using your registered credentials.',
            style: theme.textTheme.bodyLarge,
          ),
          const SizedBox(height: 24),
          PrimaryAuthButton(
            label: 'I have verified my email',
            onPressed: () {
              Navigator.of(context).pushNamedAndRemoveUntil(
                LoginScreen.routeName,
                (route) => false,
              );
            },
          ),
          const SizedBox(height: 12),
          OutlinedButton(
            onPressed: () {
              final messenger = ScaffoldMessenger.of(context);
              messenger
                ..hideCurrentSnackBar()
                ..showSnackBar(
                  SnackBar(
                    content: Text(
                      email.isEmpty
                          ? 'Verification email sent again.'
                          : 'Verification email sent again to $email.',
                    ),
                  ),
                );
            },
            child: const Text('Resend verification email'),
          ),
          const SizedBox(height: 12),
          TextButton(
            onPressed: () {
              Navigator.of(context).pushNamedAndRemoveUntil(
                LoginScreen.routeName,
                (route) => false,
              );
            },
            child: const Text('Go to login page'),
          ),
        ],
      ),
    );
  }
}
