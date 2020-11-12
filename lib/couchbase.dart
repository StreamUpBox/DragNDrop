import 'dart:io';


import 'dart:async';
import 'package:flutter/services.dart';

import 'package:couchbase_lite_dart/couchbase_lite_dart.dart';

import 'package:path_provider/path_provider.dart';


class AppDatabase {
  AppDatabase._internal();

  static final AppDatabase instance = AppDatabase._internal();
 
  String dbName = 'main';

  Future<bool> login(
      {String username, String password, List<String> channels}) async {

    //  final Directory dbFolder = await getApplicationDocumentsDirectory();
    //   final File file = File(p.join(dbFolder.path, 'db.sqlite'));        

    Directory appDocDir = await getApplicationDocumentsDirectory();
    String appDocPath = appDocDir.path;
    var db = Database("fff",directory:appDocPath);

    print(db.isOpen); 

    return db.isOpen;
    // try {
    //   database = await lite.Database.initWithName(dbName);
     
    //   final String gatewayUrl = DotEnv().env['GATEWAY_URL'];
    //   final lite.ReplicatorConfiguration config =
    //       lite.ReplicatorConfiguration(database, 'ws://$gatewayUrl/main');

    //   config.replicatorType = lite.ReplicatorType.pushAndPull;
    //   config.continuous = true;
    //   config.channels = channels;

    //    final String username = DotEnv().env['PASSWORD'];
    //    final String password = DotEnv().env['USERNAME'];
     
      
    //   replicator = lite.Replicator(config);

    //   replicator.addChangeListener((lite.ReplicatorChange event) {
    //     if (event.status.error != null) {
    //       print('Error: ' + event.status.error);
    //     }
       
    //   });

    //   await replicator.start();

    //   const String indexName = 'TypeNameIndex';
    //   final List<String> indices = await database.indexes;
    //   if (!indices.contains(indexName)) {
    //     final lite.ValueIndex index = lite.IndexBuilder.valueIndex(items: [
    //       lite.ValueIndexItem.property('type'),
    //       lite.ValueIndexItem.expression(lite.Expression.property('name'))
    //     ]);
    //     await database.createIndex(index, withName: indexName);
    //   } else {
        
    //     print('explanation:');
       
    //   }

    //   final lite.Document pref =
    //       await createDocumentIfNotExists('MyPreference', {'theme': 'dark'});
    //   _docListenerToken = database.addDocumentChangeListener(pref.id,
    //       (lite.DocumentChange change) {
    //     print('Document change ${change.documentID}');
    //   });

    //   _dbListenerToken = database.addChangeListener((dbChange) {
    //     for (String change in dbChange.documentIDs) {
    //       print('change in id: $change');
    //     }
    //   });

    //   return true;
    // } on PlatformException {      
    // }
  }
}