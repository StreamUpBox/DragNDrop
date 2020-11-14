import 'package:aurore/services/database_service.dart';
import 'package:flutter/cupertino.dart';

import 'package:logger/logger.dart';
import 'package:couchbase_lite_dart/couchbase_lite_dart.dart';
import 'dart:io';

import 'package:aurore/base_model.dart';

import 'package:couchbase_lite_dart/couchbase_lite_dart.dart';

import 'package:path_provider/path_provider.dart';

import 'base_model.dart';
import 'couchbase.dart';
import 'locator.dart';
import 'logger.dart';
import 'models/user.dart';

class MainViewModel extends BaseModel {
  final Logger log = Logging.getLogger('me:)');
  // ignore: unused_field
  final DatabaseService _databaseService = locator<DatabaseService>();
  dynamic _data;
  dynamic get data => _data;
  TextEditingController _name;
  var db;
  TextEditingController get name {
    return _name;
  }

  final List<User> _users = <User>[];

  observe() async {
     
    // db = await  AppDatabase.instance.login();
    Directory appDocDir = await getApplicationDocumentsDirectory();
    String appDocPath = appDocDir.path;
    db = Database("fff",directory:appDocPath);

     final doc = Document('wex12', data: {
      'id': '12',
      'name': 'richard M',
      'channels': ['1'],
      'table': 'users'
    });

    db.saveDocument(doc);

    // var doc1 = db.getMutableDocument('wer');
    // print(doc1);
    final q = Query(db, 'SELECT * WHERE table=\$VALUE');


    q.parameters = {'VALUE': 'users'};

    q.addChangeListener((List results) {
      print('New query results: ');
      print(results);
    });

    // q.execute();
  }

  void initFields() {
    _name = TextEditingController();
  }

  void save() async {

    final doc = Document('wer', data: {
      'id': '12',
      'name': 'richies',
      'channels': ['1'],
      'table': 'users'
    });
    db.saveDocument(doc);
  }

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
