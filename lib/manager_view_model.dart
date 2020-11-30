import 'package:aurore/services/database_service.dart';
import 'package:flutter/cupertino.dart';

import 'package:logger/logger.dart';
import 'package:couchbase_lite_dart/couchbase_lite_dart.dart';
import 'package:uuid/uuid.dart';
import 'package:aurore/base_model.dart';

import 'base_model.dart';
import 'locator.dart';
import 'logger.dart';
import 'models/user.dart';

class MainViewModel extends BaseModel {
  final Logger log = Logging.getLogger('data:');
  
  final DatabaseService _databaseService = locator<DatabaseService>();
  
  final List<User> _users = <User>[];

  List<User> get data => _users;

  Future<void> observe({@required String key}) async {
    final q = Query(_databaseService.db, 'SELECT * WHERE table=\$VALUE');

    q.parameters = {'VALUE': 'businesses'};

    // final results = q.execute();
    // if(results.isNotEmpty){

    //   for (Map map in results) {

    //     map.forEach((key,value){
    //        _users.add(User.fromMap(value));
    //     });
    //     notifyListeners();
    //   }
    // }
    q.addChangeListener((results) {
      for (Map map in results.allResults) {
        map.forEach((key, value) {
          if (!_users.contains(User.fromMap(value))) {
            _users.add(User.fromMap(value));
          }
        });
        notifyListeners();
      }
    });
  }

  

  void save({String name}) {
    final id = Uuid().v1();

String _name;
 
void setName({String name}){
   _name = name;
 }

assert(name !=null);
// NOTE: testing branch
log.d(name);
// NOTE: sync business. the schema should be like this.
    final Document business = _databaseService.insert(id: id, data: {
      'name': name,
      'id': id,
      'channels': ['15'],
      'active': true,
      'categoryId': 'id',
      'currency': 'RWF',
      'country': 'RWANDA',
      'businessUrl': 'url',
      'timeZone': 'cairo',
      'syncedOnline': true,
      'userId': 'd2f49b00-28f0-11eb-88e7-3f43ab5e8bc6',
      'typeId': 'any',
      'createdAt': '12222',
      'updatedAt': '2233',
      'table': 'businesses',
      'docId': 'string'
    });
    _databaseService.insert(id: id, data: {
      'id': id,
      'name': name,
      'active': true,
      'businessId': business.ID,
      'syncedOnline': true,
      // mapLatitude?: any;
      // mapLongitude?: any;
      'createdAt': '222',
      'updatedAt': '333',
      'table': 'branches',
      // docId?:string;
      'channels': ['15'],
      // channel?:string;
    });

    // print(doc.ID);
    // Document docs = _databaseService.getById(id: doc.ID);
    // docs.toMap();
    // print(docs);
    // Document mutdoc = doc.mutableCopy;

    // doc.properties['name']   = 'MURAGIJE' ;

    // _databaseService.saveDocument(doc:doc);
  }
}
