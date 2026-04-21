import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:frontend/src/app/expense_tracker_app.dart';

void main() {
  testWidgets('registration screen is shown first', (tester) async {
    await tester.pumpWidget(const ExpenseTrackerApp());

    expect(find.text('Create your account'), findsOneWidget);
    expect(find.text('Go to login page'), findsOneWidget);
  });

  testWidgets('user can navigate between registration and login screens',
      (tester) async {
    await tester.pumpWidget(const ExpenseTrackerApp());

    await tester.tap(find.text('Go to login page'));
    await tester.pumpAndSettle();

    expect(find.text('Welcome back'), findsOneWidget);
    expect(find.text('Go to registration page'), findsOneWidget);

    await tester.tap(find.text('Go to registration page'));
    await tester.pumpAndSettle();

    expect(find.text('Create your account'), findsOneWidget);
  });

  testWidgets('valid registration opens verification screen', (tester) async {
    await tester.pumpWidget(const ExpenseTrackerApp());

    await tester.enterText(
      find.widgetWithText(TextFormField, 'Email address'),
      'user@example.com',
    );
    await tester.enterText(
      find.widgetWithText(TextFormField, 'Password'),
      'password123',
    );
    await tester.enterText(
      find.widgetWithText(TextFormField, 'Confirm password'),
      'password123',
    );

    await tester.tap(find.text('Create account'));
    await tester.pumpAndSettle();

    expect(find.text('Verify your email'), findsOneWidget);
    expect(find.text('I have verified my email'), findsOneWidget);
  });

  testWidgets('verified user can continue to login from verification screen',
      (tester) async {
    await tester.pumpWidget(const ExpenseTrackerApp());

    await tester.enterText(
      find.widgetWithText(TextFormField, 'Email address'),
      'user@example.com',
    );
    await tester.enterText(
      find.widgetWithText(TextFormField, 'Password'),
      'password123',
    );
    await tester.enterText(
      find.widgetWithText(TextFormField, 'Confirm password'),
      'password123',
    );

    await tester.tap(find.text('Create account'));
    await tester.pumpAndSettle();

    await tester.tap(find.text('I have verified my email'));
    await tester.pumpAndSettle();

    expect(find.text('Welcome back'), findsOneWidget);
  });
}
