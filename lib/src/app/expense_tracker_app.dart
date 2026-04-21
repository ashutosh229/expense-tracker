import 'package:flutter/material.dart';

import '../core/theme/app_theme.dart';
import '../features/auth/presentation/screens/login_screen.dart';
import '../features/auth/presentation/screens/register_screen.dart';

class ExpenseTrackerApp extends StatelessWidget {
  const ExpenseTrackerApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Expense Tracker',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.light(),
      initialRoute: RegisterScreen.routeName,
      routes: {
        RegisterScreen.routeName: (_) => const RegisterScreen(),
        LoginScreen.routeName: (_) => const LoginScreen(),
      },
    );
  }
}
