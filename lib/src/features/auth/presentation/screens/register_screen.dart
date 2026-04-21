import 'package:flutter/material.dart';

import '../validators/auth_validators.dart';
import '../widgets/auth_footer_link.dart';
import '../widgets/auth_scaffold.dart';
import '../widgets/auth_text_field.dart';
import '../widgets/primary_auth_button.dart';
import 'email_verification_screen.dart';
import 'login_screen.dart';

class RegisterScreen extends StatefulWidget {
  const RegisterScreen({super.key});

  static const routeName = '/register';

  @override
  State<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _confirmPasswordController = TextEditingController();

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    _confirmPasswordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AuthScaffold(
      title: 'Create your account',
      subtitle:
          'Start tracking income and expenses with a secure personal account.',
      child: Form(
        key: _formKey,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            AuthTextField(
              controller: _emailController,
              label: 'Email address',
              hintText: 'you@example.com',
              keyboardType: TextInputType.emailAddress,
              textInputAction: TextInputAction.next,
              validator: AuthValidators.email,
            ),
            const SizedBox(height: 16),
            AuthTextField(
              controller: _passwordController,
              label: 'Password',
              hintText: 'Enter a secure password',
              obscureText: true,
              textInputAction: TextInputAction.next,
              validator: AuthValidators.password,
            ),
            const SizedBox(height: 16),
            AuthTextField(
              controller: _confirmPasswordController,
              label: 'Confirm password',
              hintText: 'Re-enter your password',
              obscureText: true,
              textInputAction: TextInputAction.done,
              validator: (value) => AuthValidators.confirmPassword(
                value,
                _passwordController.text,
              ),
            ),
            const SizedBox(height: 24),
            PrimaryAuthButton(
              label: 'Create account',
              onPressed: () {
                FocusScope.of(context).unfocus();
                final isValid = _formKey.currentState?.validate() ?? false;

                if (!isValid) {
                  return;
                }

                Navigator.of(context).pushNamed(
                  EmailVerificationScreen.routeName,
                  arguments: _emailController.text.trim(),
                );
              },
            ),
            const SizedBox(height: 16),
            AuthFooterLink(
              label: 'Already registered?',
              actionLabel: 'Go to login page',
              onPressed: () {
                Navigator.of(context).pushReplacementNamed(
                  LoginScreen.routeName,
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}
