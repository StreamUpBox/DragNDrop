import 'package:built_value/built_value.dart';
import 'package:firebase_auth/firebase_auth.dart';

part 'app_state.g.dart';


abstract class AppState implements Built<AppState, AppStateBuilder> {
  @nullable
  User get user;

  // ActionModelLogin get loginModel;
  // ignore: sort_constructors_first
  AppState._();
  // ignore: sort_constructors_first
  // ignore: sort_unnamed_constructors_first
  factory AppState([void Function(AppStateBuilder) updates]) = _$AppState;

  // ignore: sort_constructors_first
  factory AppState.init() => AppState((AppStateBuilder a) => {});
}
