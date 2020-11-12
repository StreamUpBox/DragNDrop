import 'package:aurore/services/bluethooth_service.dart';
import 'package:aurore/services/database_service.dart';
import 'package:aurore/services/mail_service.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:stacked/stacked.dart';
// import 'package:cblc_flutter/fleece.dart';
// import 'package:couchbase_lite_dart/couchbase_lite_dart.dart';

import 'couchbase.dart';
import 'locator.dart';
import 'manager_view_model.dart';
import 'services/bluethooth_service.dart';

Future<void> main() async {
  // Cbl.init();

  await DotEnv().load('.env');
  setupLocator();
  runApp(MyApp());
}

class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  final DatabaseService _service = locator<DatabaseService>();
  final BlueToothService _blue = locator<BlueToothService>();
  final MailService _mail = locator<MailService>();

  @override
  void initState() {
    super.initState();
    AppDatabase.instance.login();
    WidgetsBinding.instance.addPostFrameCallback((_) => _blue.initBluetooth());
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
          body: Center(
        child: OutlineButton(
          child: ViewModelBuilder<MainViewModel>.reactive(
            viewModelBuilder: () => MainViewModel(),
            onModelReady: (model) => model.listenData(),
            builder: (context, model, child) {
              return Container(child: Text('got it #'));
            },
          ),
          onPressed: () async {
            // _service.openCloseBusiness(businessId: '128', userId: '1697');
          },
        ),
      )),
    );
  }
}
