import 'dart:async';

import 'package:bluetooth_print/bluetooth_print.dart';
import 'package:bluetooth_print/bluetooth_print_model.dart';

import 'package:rxdart/rxdart.dart';

class BlueThoothManager {
  PublishSubject blueConnected = PublishSubject();
  BluetoothPrint bluetoothPrint = BluetoothPrint.instance;
  
  BlueThoothManager() {
    connectToanyBlueThoothAvailable();
  }
  Future connectToanyBlueThoothAvailable() async {
   
   bluetoothPrint.scanResults.listen((List<BluetoothDevice> devices)async {
     if(devices[0].connected){
       await bluetoothPrint.connect(devices[0]);
     }
   });

    blueConnected?.listen((conncted) {
      print(conncted); // a simple toast to show a client that flipper found a bluethooth device to print to.
    });
  }

 
  Future<void> initBluetooth() async {
    //  start scanning the available bluetooth
    bluetoothPrint.startScan(timeout: Duration(seconds: 4));

    // bool isConnected=await bluetoothPrint.isConnected;
    bluetoothPrint.state.listen((state) {
      // print('cur device status: $state');
      switch (state) {
        case BluetoothPrint.CONNECTED:
          blueConnected.add(true);
          break;
        case BluetoothPrint.DISCONNECTED:
          blueConnected.add(false);
          break;
        default:
          break;
      }
    });

    // blueConnected.add(isConnected);
  }

   Future<void> printReceipt() async {
     Map<String, dynamic> config = Map();
      List<LineText> list = List();
      list.add(LineText(type: LineText.TYPE_TEXT, content: 'Your Business Name', weight: 1, align: LineText.ALIGN_CENTER,linefeed: 1,underline:1));
      list.add(LineText(type: LineText.TYPE_TEXT, content: 'Bill No. 1', weight: 0, align: LineText.ALIGN_LEFT,linefeed: 1));
      list.add(LineText(type: LineText.TYPE_TEXT, content: 'Cashier: admin', weight: 0, align: LineText.ALIGN_RIGHT,linefeed: 1));
      list.add(LineText(type: LineText.TYPE_TEXT, content: 'Sept 10,2020', weight: 0, align: LineText.ALIGN_LEFT,linefeed: 1));
      list.add(LineText(type: LineText.TYPE_TEXT, content: '01:49 PM', weight: 0, align: LineText.ALIGN_RIGHT,linefeed: 1));
      list.add(LineText(type: LineText.TYPE_TEXT, content: '----------------------', align: LineText.ALIGN_CENTER,linefeed: 1));

      list.add(LineText(type: LineText.TYPE_TEXT, content: 'ITEM', align: LineText.ALIGN_LEFT,linefeed: 1));
      list.add(LineText(type: LineText.TYPE_TEXT, content: 'Qty', align: LineText.ALIGN_RIGHT,linefeed: 1));
      list.add(LineText(type: LineText.TYPE_TEXT, content: 'RATE', align: LineText.ALIGN_LEFT,linefeed: 1));
      list.add(LineText(type: LineText.TYPE_TEXT, content: 'Total', align: LineText.ALIGN_CENTER,linefeed: 1));
      list.add(LineText(type: LineText.TYPE_TEXT, content: '----------------------', align: LineText.ALIGN_CENTER,linefeed: 1));

      list.add(LineText(type: LineText.TYPE_TEXT, content: 'Item 1', align: LineText.ALIGN_LEFT,linefeed: 1));
      list.add(LineText(type: LineText.TYPE_TEXT, content: '1', align: LineText.ALIGN_RIGHT,linefeed: 1));
      list.add(LineText(type: LineText.TYPE_TEXT, content: '100', align: LineText.ALIGN_CENTER,linefeed: 1));
      list.add(LineText(type: LineText.TYPE_TEXT, content: '1/1', align: LineText.ALIGN_LEFT,linefeed: 1));
      list.add(LineText(type: LineText.TYPE_TEXT, content: 'Grand Total = 100', align: LineText.ALIGN_RIGHT,linefeed: 1));
      list.add(LineText(linefeed: 1));

      await bluetoothPrint.printReceipt(config, list);
  }
}

final BlueThoothManager blueThoothManager = BlueThoothManager();
