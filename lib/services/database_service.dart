import 'dart:async';

import 'package:aurore/logger.dart';

import 'package:logger/logger.dart';



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
  

  Future<bool> documentExist({String property, String equator}) async {
    // final Where query = QueryBuilder.select([SelectResult.all()])
    //     .from(AppDatabase.instance.dbName)
    //     .where(
    //         Expression.property(property).equalTo(Expression.string(equator)));
    // final ResultSet result = await query.execute();

    // final List<Map<String, dynamic>> model = result.map((result) {
    //   return result.toMap();
    // }).toList();

    //intrested in first result. FIXME(richard):should be one result.

    // log.d(model[0]);

    return false;
  }



  // ObservableResponse<ResultSet> observer({String property, String equator}) {
  //   final BehaviorSubject<ResultSet> stream = BehaviorSubject<ResultSet>();
  //   // Execute a query and then post results and all changes to the stream

  //   final Where query = QueryBuilder.select([SelectResult.all()])
  //       .from(AppDatabase.instance.dbName)
  //       .where(
  //           Expression.property(property).equalTo(Expression.string(equator)));

  //   final Null Function(ResultSet results) processResults =
  //       (ResultSet results) {
  //     if (!stream.isClosed) {
  //       stream.add(results);
  //     }
  //   };
  //   return _buildObservableQueryResponse(stream, query, processResults);
  // }

  // ObservableResponse<T> _buildObservableQueryResponse<T>(
  //     BehaviorSubject<T> subject,
  //     Query query,
  //     ResultSetCallback resultsCallback) {
  //   final Future<ListenerToken> futureToken =
  //       query.addChangeListener((QueryChange change) {
  //     if (change.results != null) {
  //       resultsCallback(change.results);
  //     }
  //   });

  //   final Null Function() removeListener = () {
  //     // ignore: always_specify_types
  //     final newFuture = futureToken.then((ListenerToken token) async {
  //       if (token != null) {
  //         await query.removeChangeListener(token);
  //       }
  //     });

  //     pendingListeners.add(newFuture);
  //     newFuture.whenComplete(() {
  //       pendingListeners.remove(newFuture);
  //     });
  //   };

  //   try {
  //     query.execute().then(resultsCallback);
  //   } on PlatformException {
  //     removeListener();
  //     rethrow;
  //   }

  //   return ObservableResponse<T>(subject, () {
  //     removeListener();
  //     subject.close();
  //   });
  // }
}
