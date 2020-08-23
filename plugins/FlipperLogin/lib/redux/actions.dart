import 'package:flipper_login/redux/action_login.dart';
import 'package:flutter/material.dart';

@immutable
class LoginAction {
  final ActionModelLogin loginModel;

  // ignore: sort_constructors_first
  const LoginAction({@required this.loginModel});
}
