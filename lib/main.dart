

import 'package:aurore/couchbase.dart';
import 'package:aurore/services/database_service.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

import 'locator.dart';


Future<void> main() async {
  await DotEnv().load('.env');
   setupLocator();
  runApp(MyApp());
}


class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => _MyAppState();
}


class _MyAppState extends State<MyApp> {
  
  final DatabaseService _service  = locator<DatabaseService>();

  @override
  void initState() {
    super.initState();
    AppDatabase.instance.login();
  }
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(body:Center(
        child: OutlineButton(
          child: Text('print'),
          onPressed: () async {
            // blueThoothManager.printReceipt();
            _service.openCloseBusiness(businessId: '1',userId: '1');
          },
        ),
      )),
    );
  }
}
