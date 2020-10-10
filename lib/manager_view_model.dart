import 'package:aurore/services/database_service.dart';
import 'package:flutter/foundation.dart';

import 'base_model.dart';
import 'locator.dart';

class MainViewModel extends BaseModel {
  final DatabaseService _databaseService = locator<DatabaseService>();
  dynamic _data;
  dynamic get data => _data;

  void listenData() {
    setBusy(true);

    //demo of listening on users table on every entry.
    _databaseService.observer(equator: 'users_1',property: 'tableName').stream.listen((event) {
      _data = event;
      notifyListeners();

      setBusy(false);
    });
  }
}
