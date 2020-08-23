import 'dart:async';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:meta/meta.dart';

// Authentication
class VerifyAuthenticationState {}

class AfterLoginAction {}

class LogIn {
  final String username;
  final String password;
  // ignore: always_specify_types
  final Completer completer;

  // ignore: sort_constructors_first
  LogIn({this.username, this.password, completer})
      // ignore: always_specify_types
      : completer = completer ?? Completer();
}

@immutable
class OnAuthenticated {
  final User user;

  // ignore: sort_constructors_first
  const OnAuthenticated({@required this.user});

  @override
  String toString() {
    // ignore: prefer_single_quotes
    return "OnAuthenticated{user: $user}";
  }
}

class LogOutAction {}

class OnLogoutSuccess {
  OnLogoutSuccess();

  @override
  String toString() {
    return 'LogOut{user: null}';
  }
}



class Unauthenticated {
  final dynamic error;

  // ignore: sort_constructors_first
  Unauthenticated(this.error);

  @override
  String toString() {
    // ignore: prefer_single_quotes
    return "OnLogoutFail{There was an error logging in: $error}";
  }
}

class OnLogoutFail {
  final dynamic error;

  // ignore: sort_constructors_first
  OnLogoutFail(this.error);

  @override
  String toString() {
    // ignore: prefer_single_quotes
    return "OnLogoutFail{There was an error logging in: $error}";
  }
}
