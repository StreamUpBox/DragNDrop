import 'dart:async';

import 'package:aurore/logger.dart';
import 'package:aurore/models/user.dart';
import 'package:flutter/material.dart';

import 'package:logger/logger.dart';


import 'package:couchbase_lite_dart/couchbase_lite_dart.dart';
import 'dart:io';
import 'package:uuid/uuid.dart';



import 'package:path_provider/path_provider.dart';



// this calss is about to replace AppDatabase class used for experimental
// query example: https://github.com/SaltechSystems/couchbase_lite/blob/master/example/lib/data/database.dart

class DatabaseService {
  final Logger log = Logging.getLogger('database');

  var db;
  Future login()async {
    Directory appDocDir = await getApplicationDocumentsDirectory();
    String appDocPath = appDocDir.path;
    db = Database("fff",directory:appDocPath);
  }


  Document insert({String id, Map data}){
    final id = Uuid().v1();
    final doc = Document(id ,data:data);
    return db.saveDocument(doc);
  }
  Future<Document> getById({@required String id}){
    return db.getMutableDocument(id);
  }
 
}
