import 'package:aurore/services/database_service.dart';
import 'package:couchbase_lite/couchbase_lite.dart';
import 'package:flutter/foundation.dart';
import 'package:logger/logger.dart';

import 'base_model.dart';
import 'locator.dart';
import 'logger.dart';

class MainViewModel extends BaseModel {
  final Logger log = Logging.getLogger('me:)');
  final DatabaseService _databaseService = locator<DatabaseService>();
  dynamic _data;
  dynamic get data => _data;

  void listenData() {
    setBusy(true);

    
    // _databaseService
    //     .observer(equator: 'users_1', property: 'tableName')
    //     .stream
    //     .listen((event) {
     
    //   final List<Map<String, dynamic>> model = event.map((Result result) {
    //     return result.toMap();
    //   }).toList();
    //   final list = [];
     
    //   for (Map map in model) {
    //     map.forEach((key, value) {
    //       list.add(value);
    //     });
    //   }
     
      notifyListeners();

      setBusy(false);
    // });
  }
}
