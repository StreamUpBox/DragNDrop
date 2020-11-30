

import 'package:aurore/services/bluethooth_service.dart';
import 'package:aurore/services/database_service.dart';
import 'package:aurore/services/shared_state_service.dart';
import 'package:get_it/get_it.dart';
import 'package:stacked_services/stacked_services.dart';

import 'services/mail_service.dart';

GetIt locator = GetIt.instance;

void setupLocator() { 
  locator.registerLazySingleton(() => DatabaseService());
  locator.registerLazySingleton(() => SnackbarService());
  locator.registerLazySingleton(() => BlueToothService());
  locator.registerLazySingleton(() => SharedStateService());
  locator.registerLazySingleton(() => MailService());
}
