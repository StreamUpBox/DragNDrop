import 'package:aurore/couchbase.dart';
import 'package:aurore/logger.dart';
import 'package:couchbase_lite/couchbase_lite.dart';

import 'package:flutter/services.dart';
import 'package:logger/logger.dart';

import 'package:uuid/uuid.dart';

// this calss is about to replace AppDatabase class used for experimental
// query example: https://github.com/SaltechSystems/couchbase_lite/blob/master/example/lib/data/database.dart
class DatabaseService {
  final Logger log = Logging.getLogger('Firestore service ....');

  Future<void> saveDrawerHistory({
    double openingFloat,
    double closingFloat,
    String businessId,
    String userId,
  }) async {
    final MutableDocument mutableDoc = MutableDocument()
        .setDouble('openingFloat', openingFloat)
        .setDouble('closingFloat', closingFloat)
        .setString('businessId', businessId)
        .setString('userId', userId)
        // ignore: always_specify_types
        .setList('channels', [userId])
        .setString('uid', Uuid().v1())
        .setString('_id', userId)
        .setString('tableName', 'drawer_history_' + businessId);
    try {
      await AppDatabase.instance.database.saveDocument(mutableDoc);
    } on PlatformException {
      return 'Error saving document';
    }
  }

  Future<void> openCloseBusiness({
    String userId,
    String name,
    bool isSocial = false,
    String businessId,
    bool isClosed = true,
  }) async {
    //update the document set to open a business to true

    final MutableDocument newDoc =
        MutableDocument(id: userId, data: {'name': ['richie']});
    
    await AppDatabase.instance.database.saveDocument(newDoc);

    final Document document =
        await AppDatabase.instance.database.document(userId);
    log.d(document);

    // documentExist(property:'tableName',equator:'switcher_'+userId);

    // if (document == null) {
    //   final MutableDocument mutableDoc = MutableDocument()
    //       .setString('userId', userId)
    //       .setString('name', name)
    //       .setString('businessId', businessId)
    //       .setString('tableName', 'switcher_' + userId)
    //       .setBoolean('isClosed', isClosed)
    //       .setBoolean('isSocial', isSocial)
    //       // ignore: always_specify_types
    //       .setList('channels', [userId])
    //       .setString('uid', Uuid().v1());
    //   try {
    //     await AppDatabase.instance.database.saveDocument(mutableDoc);
    //   } on PlatformException {
    //     return 'Error saving document';
    //   }
    // } else {
    //   log.d('doucument is not null therefore is updated!');
    //   log.d(document);
    //   final MutableDocument mutableDoc =
    //       document.toMutable().setBoolean('isClosed', isClosed);
    //   AppDatabase.instance.database.saveDocument(mutableDoc);
    // }
  }

  Future<bool> documentExist({String property, String equator}) async {
    final Where query = QueryBuilder.select([SelectResult.all()])
        .from(AppDatabase.instance.dbName)
        .where(
            Expression.property(property).equalTo(Expression.string(equator)));
    final ResultSet result = await query.execute();

    final List<Map<String, dynamic>> model = result.map((result) {
      return result.toMap();
    }).toList();

    //intrested in first result. FIXME(richard):should be one result.

    log.d(model[0]);

    return result.allResults().isNotEmpty;
  }
}
