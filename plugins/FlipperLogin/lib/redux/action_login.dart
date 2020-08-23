import 'package:built_value/built_value.dart';

part 'action_login.g.dart';

abstract class ActionModelLogin implements Built<ActionModelLogin, ActionModelLoginBuilder> {
  
  @nullable
  String get username;

  @nullable
  String get password;

  // ignore: sort_constructors_first
  ActionModelLogin._();
  factory ActionModelLogin([void Function(ActionModelLoginBuilder) updates]) = _$ActionModelLogin;
}
