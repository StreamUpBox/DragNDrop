import 'dart:io';


import 'dart:async';
import 'package:aurore/base_model.dart';
import 'package:flutter/services.dart';

import 'package:couchbase_lite_dart/couchbase_lite_dart.dart';

import 'package:path_provider/path_provider.dart';


class AppDatabase extends BaseModel {
  AppDatabase._internal();

  static final AppDatabase instance = AppDatabase._internal();
   Database db;
  String dbName = 'main';

  login(
      {String username, String password, List<String> channels}) async {

    Directory appDocDir = await getApplicationDocumentsDirectory();
    String appDocPath = appDocDir.path;
    db = Database("fff",directory:appDocPath);

    notifyListeners();

    // print(db.isOpen); 

    return db;
   
  }
}