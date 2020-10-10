import 'package:aurore/services/bluethooth_service.dart';
import 'package:aurore/services/database_service.dart';
import 'package:aurore/services/mail_service.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

import 'locator.dart';
import 'services/bluethooth_service.dart';

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
  final DatabaseService _service = locator<DatabaseService>();
  final BlueToothService _blue = locator<BlueToothService>();
  final MailService _mail = locator<MailService>();
  
  @override
  void initState() {
    super.initState();
    // AppDatabase.instance.login();
    WidgetsBinding.instance.addPostFrameCallback((_) => _blue.initBluetooth());
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
          body: Center(
        child: OutlineButton(
          child: Text('print'),
          onPressed: () async {
            // blueThoothManager.printReceipt();
            // _service.openCloseBusiness(businessId: '1',userId: '1');
            _blue.printReceipt(items: {'Beans':23.0,'Avocado':10.2});
            // _mail.sendEmail();
          },
        ),
      )),
    );
  }
}
