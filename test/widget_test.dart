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
}
