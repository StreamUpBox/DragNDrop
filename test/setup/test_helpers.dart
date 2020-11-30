import 'package:aurore/locator.dart';
import 'package:aurore/services/database_service.dart';
import 'package:aurore/services/shared_preferences_service.dart';
import 'package:mockito/mockito.dart';
import 'package:stacked_services/stacked_services.dart';

class SharedPreferencesServiceMock extends Mock
    implements SharedPreferenceService {}

class DatabaseServiceMock extends Mock implements DatabaseService {}    

class NavigationServiceMock extends Mock implements NavigationService {}

Future<SharedPreferenceService> getAndRegisterSharedPreferencesMock(
    {bool hasUser = true}) async {
  _removeRegistrationIfExists<SharedPreferenceService>();
  var service = SharedPreferencesServiceMock();

  // stubbing
  when(await service.getUserId()).thenReturn('1');

  locator.registerSingleton<SharedPreferenceService>(service);
  return service;
}


NavigationService getAndRegisterNavigationServiceMock() {
  _removeRegistrationIfExists<NavigationService>();
  var service = NavigationServiceMock();
  locator.registerSingleton<NavigationService>(service);
  return service;
}

DatabaseService getAndRegisterDatabaseMock({bool returnAddress = true}) {
  _removeRegistrationIfExists<DatabaseService>();
  var database = DatabaseServiceMock();

  when(database.getById(id:'1')).thenAnswer((realInvocation) {
    // if (returnAddress) return Future.value({});
    return null;
  });

  locator.registerSingleton<DatabaseServiceMock>(database);
  return database;
}

void registerServices() {
  getAndRegisterSharedPreferencesMock();
}

void unregisterServices() {
  locator.unregister<SharedPreferenceService>();
  locator.unregister<NavigationService>();
  locator.unregister<DatabaseService>();
}

void _removeRegistrationIfExists<T>() {
  if (locator.isRegistered<T>()) {
    locator.unregister<T>();
  }
}