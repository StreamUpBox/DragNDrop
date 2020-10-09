import 'package:couchbase_lite/couchbase_lite.dart' as lite;
import 'dart:async';
import 'package:flutter/services.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

typedef ResultSetCallback = void Function(lite.ResultSet results);

class AppDatabase {
  AppDatabase._internal();

  static final AppDatabase instance = AppDatabase._internal();
 
  String dbName = 'main';
  // ignore: always_specify_types
  List<Future> pendingListeners = [];
  lite.ListenerToken _replicatorListenerToken;
  lite.Database database;
  lite.Replicator replicator;
  lite.ListenerToken _docListenerToken;
  lite.ListenerToken _dbListenerToken;


  Future<lite.Document> createDocumentIfNotExists(
      String id, Map<String, dynamic> map) async {
    try {
      final lite.Document oldDoc = await database.document(id);
      if (oldDoc != null) {
        return oldDoc;
      }

      final lite.MutableDocument newDoc =
          lite.MutableDocument(id: id, data: map);
      if (await database.saveDocument(newDoc)) {
        return newDoc;
      } else {
        return null;
      }
    } on PlatformException {
      return null;
    }
  }

  Future<bool> login(
      {String username, String password, List<String> channels}) async {
    try {
      database = await lite.Database.initWithName(dbName);
      // Note wss://10.0.2.2:4984/main is for the android simulator on your local machine's couchbase database
      final String gatewayUrl = DotEnv().env['GATEWAY_URL'];
      final lite.ReplicatorConfiguration config =
          lite.ReplicatorConfiguration(database, 'ws://$gatewayUrl/main');

      config.replicatorType = lite.ReplicatorType.pushAndPull;
      config.continuous = true;
      config.channels = channels;

       final String username = DotEnv().env['PASSWORD'];
       final String password = DotEnv().env['USERNAME'];
     
      // Using self signed certificate
      //config.pinnedServerCertificate = 'assets/cert-android.cer';
      // config.authenticator = lite.BasicAuthenticator(username, password);
      replicator = lite.Replicator(config);

      replicator.addChangeListener((lite.ReplicatorChange event) {
        if (event.status.error != null) {
          print('Error: ' + event.status.error);
        }
        print(event.status.activity.toString());
      });

      await replicator.start();

      const String indexName = 'TypeNameIndex';
      final List<String> indices = await database.indexes;
      if (!indices.contains(indexName)) {
        final lite.ValueIndex index = lite.IndexBuilder.valueIndex(items: [
          lite.ValueIndexItem.property('type'),
          lite.ValueIndexItem.expression(lite.Expression.property('name'))
        ]);
        await database.createIndex(index, withName: indexName);
      } else {
        // var query = _buildBeerQuery(100, 0, false);
        print('explanation:');
        // print(await query.explain());
      }

      final lite.Document pref =
          await createDocumentIfNotExists('MyPreference', {'theme': 'dark'});
      _docListenerToken = database.addDocumentChangeListener(pref.id,
          (lite.DocumentChange change) {
        print('Document change ${change.documentID}');
      });

      _dbListenerToken = database.addChangeListener((dbChange) {
        for (String change in dbChange.documentIDs) {
          print('change in id: $change');
        }
      });

      return true;
    } on PlatformException {      
    }
  }

  Future<void> logout() async {
    await Future.wait(pendingListeners);

    await database.removeChangeListener(_docListenerToken);
    await database.removeChangeListener(_dbListenerToken);
    _docListenerToken = null;
    _dbListenerToken = null;

    await replicator.removeChangeListener(_replicatorListenerToken);
    _replicatorListenerToken =
        replicator.addChangeListener((lite.ReplicatorChange event) async {
      if (event.status.activity == lite.ReplicatorActivityLevel.stopped) {
        await database.close();
        await replicator.removeChangeListener(_replicatorListenerToken);
        await replicator.dispose();
        _replicatorListenerToken = null;
      }
    });
    await replicator.stop();
  }

}