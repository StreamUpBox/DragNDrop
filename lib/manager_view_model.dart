import 'package:aurore/services/database_service.dart';
import 'package:flutter/cupertino.dart';

import 'package:logger/logger.dart';
import 'package:couchbase_lite_dart/couchbase_lite_dart.dart';
import 'package:uuid/uuid.dart';
import 'package:aurore/base_model.dart';

import 'package:couchbase_lite_dart/couchbase_lite_dart.dart';


import 'base_model.dart';
import 'locator.dart';
import 'logger.dart';
import 'models/user.dart';

class MainViewModel extends BaseModel {
  final Logger log = Logging.getLogger('data:');
  // ignore: unused_field
  final DatabaseService _databaseService = locator<DatabaseService>();
  
  TextEditingController _name;
   final List<User> _users = <User>[];

  List<User> get data => _users;

  TextEditingController get name {
    return _name;
  }
  
  Future<void> observe({@required String key}) async {

    final q = Query(_databaseService.db, 'SELECT * WHERE table=\$VALUE');

    q.parameters = {'VALUE': key};

    q.addChangeListener((List results) {
   
       for (Map map in results) {

        map.forEach((key,value){
           _users.add(User.fromMap(value));
        });
        notifyListeners();
      }
    });
  }

  void initFields() {
    _name = TextEditingController();
  }


  void save() {
    _databaseService.insert(data: {'name':name.text,'id':Uuid().v1(),'channels':['2'],'table':'users'});
  }
}
