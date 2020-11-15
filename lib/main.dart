import 'package:aurore/services/bluethooth_service.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:stacked/stacked.dart';
// import 'package:cblc_flutter/fleece.dart';
// import 'package:couchbase_lite_dart/couchbase_lite_dart.dart';
import 'package:couchbase_lite_dart/couchbase_lite_dart.dart';

import 'locator.dart';
import 'manager_view_model.dart';
import 'services/bluethooth_service.dart';

Future<void> main() async {
  Cbl.init();
  WidgetsFlutterBinding.ensureInitialized();
  await DotEnv().load('.env');
  setupLocator();
  runApp(MyApp());
}

class MyApp extends StatefulWidget {
  @override
  _MyAppState createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  // final DatabaseService _service = locator<DatabaseService>();
  final BlueToothService _blue = locator<BlueToothService>();
  // final MailService _mail = locator<MailService>();

  @override
  void initState() {
    super.initState();
    
    WidgetsBinding.instance.addPostFrameCallback((_) => _blue.initBluetooth());
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: ViewModelBuilder.reactive(
          builder: (BuildContext context, MainViewModel model, Widget child) {
            return Scaffold(
              body: Padding(
                padding: const EdgeInsets.all(38.0),
                child: Column(
                  children: [
                    Form(
                        child: Row(
                      children: [
                        ConstrainedBox(
                          constraints:
                              BoxConstraints.tight(const Size(200, 50)),
                          child: TextFormField(
                            controller: model.name,
                          ),
                        ),
                        Container(
                          // color: Colors.blue,
                          child: RaisedButton(
                              onPressed: model.observe,
                              child: Text('Save',
                                  style: TextStyle(color: Colors.white))),
                        )
                      ],
                    )),
                    // ListView(children: [
                      
                    // ],)
                  ],
                ),
              ),
            );
          },
          onModelReady: (MainViewModel model){
            model.initFields();
            
          },
          viewModelBuilder: () => MainViewModel()),
    );
  }
}
