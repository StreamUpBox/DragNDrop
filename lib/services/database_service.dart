import 'dart:async';

import 'package:aurore/couchbase.dart';
import 'package:aurore/logger.dart';
import 'package:aurore/observable_response.dart';
import 'package:couchbase_lite/couchbase_lite.dart';

import 'package:flutter/services.dart';
import 'package:logger/logger.dart';
import 'package:rxdart/rxdart.dart';



// this calss is about to replace AppDatabase class used for experimental
// query example: https://github.com/SaltechSystems/couchbase_lite/blob/master/example/lib/data/database.dart
class DatabaseService {
  final Logger log = Logging.getLogger('me');
  List<Future> pendingListeners = List();
  final StreamController<dynamic> _stream =
      StreamController.broadcast();

  final Stream<dynamic> stream =
      // ignore: always_specify_types
      Stream.empty();
  
  Future<void> openCloseBusiness({
    String userId,
    String name,
    bool isSocial = false,
    String businessId,
    bool isClosed = true,
  }) async {
    //update the document set to open a business to true

    final MutableDocument newDoc =
        MutableDocument(id: userId, data: {'name': ['richiezol'],'tableName':'users_1'});
    
    await AppDatabase.instance.database.saveDocument(newDoc);

    // final Document document =
    //     await AppDatabase.instance.database.document(userId);
    log.d(newDoc.id);

     final Document document =
        await AppDatabase.instance.database.document(newDoc.id);

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


  ObservableResponse<ResultSet> observer({String property, String equator}) {
    final BehaviorSubject<ResultSet> stream = BehaviorSubject<ResultSet>();
    // Execute a query and then post results and all changes to the stream

    final Where query = QueryBuilder.select([SelectResult.all()])
        .from(AppDatabase.instance.dbName)
        .where(
            Expression.property(property).equalTo(Expression.string(equator)));

    final Null Function(ResultSet results) processResults =
        (ResultSet results) {
      if (!stream.isClosed) {
        stream.add(results);
      }
    };
    return _buildObservableQueryResponse(stream, query, processResults);
  }

  ObservableResponse<T> _buildObservableQueryResponse<T>(
      BehaviorSubject<T> subject,
      Query query,
      ResultSetCallback resultsCallback) {
    final Future<ListenerToken> futureToken =
        query.addChangeListener((QueryChange change) {
      if (change.results != null) {
        resultsCallback(change.results);
      }
    });

    final Null Function() removeListener = () {
      // ignore: always_specify_types
      final newFuture = futureToken.then((ListenerToken token) async {
        if (token != null) {
          await query.removeChangeListener(token);
        }
      });

      pendingListeners.add(newFuture);
      newFuture.whenComplete(() {
        pendingListeners.remove(newFuture);
      });
    };

    try {
      query.execute().then(resultsCallback);
    } on PlatformException {
      removeListener();
      rethrow;
    }

    return ObservableResponse<T>(subject, () {
      removeListener();
      subject.close();
    });
  }
}
