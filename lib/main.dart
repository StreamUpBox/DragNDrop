
import 'package:aurore/bluethooth_manager.dart';
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  
  @override
  void initState() {
    super.initState();

    WidgetsBinding.instance
        .addPostFrameCallback((_) => blueThoothManager.initBluetooth());
  }
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(body:Center(
        child: OutlineButton(
          child: Text('print'),
          onPressed: () async {
            blueThoothManager.printReceipt();
          },
        ),
      )),
    );
  }
}
