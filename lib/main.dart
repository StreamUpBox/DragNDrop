
import 'package:aurore/locator.dart';
import 'package:aurore/manager_view_model.dart';
import 'package:flutter/material.dart';
import 'package:stacked/stacked.dart';


void main() {
  setupLocator();
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
 
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: ViewModelBuilder.reactive(builder: (BuildContext context,MainViewModel model, Widget child){
        return Scaffold(
        appBar: AppBar(
          title: const Text('Bluetooth Thermal Printer Demo'),
        ),
        body: Container(
          padding: EdgeInsets.all(20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text("Search Paired Bluetooth"),
              OutlineButton(
                onPressed: () {
                  model.getBluetooth();
                },
                child: Text("Search"),
              ),
              Container(
                height: 200,
                child: ListView.builder(
                  itemCount: model.state.bluethioothDevices !=null && model.state.bluethioothDevices.length > 0
                      ? model.state.bluethioothDevices.length
                      : 0,
                  itemBuilder: (context, index) {
                    return ListTile(
                      onTap: () {
                        String select = model.state.bluethioothDevices[index];
                        List list = select.split("#");
                        // String name = list[0];
                        String mac = list[1];
                        model.setConnect(mac);
                      },
                      title: Text('${model.state.bluethioothDevices[index]}'),
                      subtitle: Text("Click to connect"),
                    );
                  },
                ),
              ),
              SizedBox(
                height: 30,
              ),
              OutlineButton(
                onPressed: model.state.blueConnected ? model.blue.printGraphics : null,
                child: Text("Print"),
              ),
              OutlineButton(
                onPressed: model.state.blueConnected ? model.blue.printTicket : null,
                child: Text("Print Ticket"),
              ),
            ],
          ),
        ),
      );
      }, viewModelBuilder: ()=>MainViewModel()),
    );
  }
}
