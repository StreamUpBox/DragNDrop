import 'package:aurore/services/bluethooth_service.dart';
import 'package:aurore/services/database_service.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:stacked/stacked.dart';
// import 'package:cblc_flutter/fleece.dart';
// import 'package:couchbase_lite_dart/couchbase_lite_dart.dart';
import 'package:couchbase_lite_dart/couchbase_lite_dart.dart';

import 'locator.dart';
import 'manager_view_model.dart';


Future<void> main() async {
  Cbl.init();
  WidgetsFlutterBinding.ensureInitialized();
  await DotEnv().load('.env');
  setupLocator();
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
 
  // final DatabaseService _service = locator<DatabaseService>();
  // final BlueToothService _blue = locator<BlueToothService>();
  // final MailService _mail = locator<MailService>();
  final _name = TextEditingController();
  // @override
  // void initState() {
  //   super.initState();

  //   WidgetsBinding.instance.addPostFrameCallback((_) => _blue.initBluetooth());
  // }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: ViewModelBuilder.reactive(
          builder: (BuildContext context, MainViewModel model, Widget child) {
            return Scaffold(
              body: Padding(
                padding: const EdgeInsets.all(38.0),
                child: ListView(
                  children: [
                    Column(
                      children: [
                        Form(
                            child: Row(
                          children: [
                            ConstrainedBox(
                              constraints:
                                  BoxConstraints.tight(const Size(200, 50)),
                              child: TextFormField(
                                controller: _name,
                                onChanged:(value){
                                  model.setName(name:value);
                                }
                              ),
                            ),
                            Container(
                              // color: Colors.blue,
                              child: RaisedButton(
                                  onPressed: (){
                                    model.save(name:_name.text);
                                  },
                                  child: Text('Save',
                                      style: TextStyle(color: Colors.white))),
                            )
                          ],
                        )),
                        Container(
                          child: Column(
                            children: [
                              ...model.data.map(
                                (object) => Container(
                                  margin: EdgeInsets.only(bottom: 22),
                                  child: Text(object.name),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    )
                  ],
                ),
              ),
            );
          },
          onModelReady: (MainViewModel model) async {
            // model.initFields();
            final databaseService = locator<DatabaseService>();
            await databaseService.login();

            model.observe(key: 'users');
          },
          viewModelBuilder: () => MainViewModel()),
    );
  }
}
