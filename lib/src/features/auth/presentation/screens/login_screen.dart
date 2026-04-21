import 'package:flutter/material.dart';

import '../validators/auth_validators.dart';
import '../widgets/auth_footer_link.dart';
import '../widgets/auth_scaffold.dart';
import '../widgets/auth_text_field.dart';
import '../widgets/primary_auth_button.dart';
import 'register_screen.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  static const routeName = '/login';

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AuthScaffold(
      title: 'Welcome back',
      subtitle:
          'Log in with your registered email and password to continue.',
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
              hintText: 'Enter your password',
              obscureText: true,
              textInputAction: TextInputAction.done,
              validator: AuthValidators.password,
            ),
            const SizedBox(height: 24),
            PrimaryAuthButton(
              label: 'Log in',
              onPressed: () {
                FocusScope.of(context).unfocus();
                _formKey.currentState?.validate();
              },
            ),
            const SizedBox(height: 16),
            AuthFooterLink(
              label: 'Need an account?',
              actionLabel: 'Go to registration page',
              onPressed: () {
                Navigator.of(context).pushReplacementNamed(
                  RegisterScreen.routeName,
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}
