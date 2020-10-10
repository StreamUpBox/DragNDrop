import 'dart:async';

import 'package:aurore/locator.dart';
import 'package:aurore/logger.dart';
import 'package:bluetooth_print/bluetooth_print.dart';
import 'package:bluetooth_print/bluetooth_print_model.dart';

import 'package:rxdart/rxdart.dart';

import 'package:logger/logger.dart';
import 'package:stacked_services/stacked_services.dart';

class BlueToothService {
  // ignore: always_specify_types

  PublishSubject blueConnected = PublishSubject();
  bool _isConnected = false;
  final SnackbarService _snackBarService = locator<SnackbarService>();

  BluetoothPrint bluetoothPrint = BluetoothPrint.instance;
  final Logger log = Logging.getLogger('Bluetooth service ....');

  Future<void> connectToanyBlueThoothAvailable() async {
    bluetoothPrint.scanResults.listen((List<BluetoothDevice> devices) async {
      try {
        if (devices.isNotEmpty) {
          log.i('connected a device ready to print');
          await bluetoothPrint.connect(devices[0]);
        }
      } catch (e) {}
    });

    // ignore: always_specify_types
    blueConnected?.listen((connected) {
      if (connected) {
        _isConnected = true;
        // _snackBarService.showCustomSnackBar(
        //     message: 'Bluetooth connected', variant: 'variant');
      } else {
        //keep trying to connect to any available device.
        connectToanyBlueThoothAvailable();
      }
    });
  }

  Future<void> initBluetooth() async {
    await bluetoothPrint.startScan(timeout: const Duration(seconds: 10));
    connectToanyBlueThoothAvailable();

    final bool connected = await bluetoothPrint.isConnected;

    bluetoothPrint.state.listen((int state) {
      log.i('cur device status: $state');
      switch (state) {
        case BluetoothPrint.CONNECTED:
          _isConnected = true;
          blueConnected.add(true);
          break;
        case BluetoothPrint.DISCONNECTED:
          _isConnected = false;
          blueConnected.add(false);
          break;
        default:
          break;
      }
    });

    blueConnected.add(connected);
  }

  Future<void> printReceipt(
      {String businessName, Map<String, double> items}) async {
    Map<String, dynamic> config = Map();
    // config['width'] = 40; // 标签宽度，单位mm
    // config['height'] = 70; // 标签高度，单位mm
    // config['gap'] = 2; // 标签间隔，单位mm
    final List<LineText> list = [];
    double total = 0;

    list.add(
      LineText(
        type: LineText.TYPE_TEXT,
        content: businessName,
        weight: 1,
        align: LineText.ALIGN_CENTER,
        linefeed: 1,
        underline: 1,
      ),
    );
    list.add(
      LineText(
        type: LineText.TYPE_TEXT,
        content: 'bill no',
        weight: 0,
        align: LineText.ALIGN_LEFT,
        linefeed: 1,
      ),
    );

    list.add(
      LineText(
        type: LineText.TYPE_TEXT,
        content: 'Sept 10,2020',
        weight: 0,
        align: LineText.ALIGN_LEFT,
        linefeed: 1,
      ),
    );
    String hour =
        DateTime.now().hour.toString() + ':' + DateTime.now().minute.toString();
    list.add(
      LineText(
        type: LineText.TYPE_TEXT,
        content: hour,
        weight: 0,
        align: LineText.ALIGN_RIGHT,
        linefeed: 1,
      ),
    );
    list.add(
      LineText(
        type: LineText.TYPE_TEXT,
        content: 'ITEM',
        align: LineText.ALIGN_LEFT,
        linefeed: 1,
      ),
    );
    list.add(
      LineText(
        type: LineText.TYPE_TEXT,
        content: 'QTY',
        align: LineText.ALIGN_RIGHT,
        linefeed: 1,
      ),
    );
    // 
    list.add(
      LineText(
        type: LineText.TYPE_TEXT,
        content: '----------------------',
        align: LineText.ALIGN_CENTER,
        linefeed: 1,
      ),
    );
    list.add(
      LineText(
        type: LineText.TYPE_TEXT,
        content: total.toString(),
        align: LineText.ALIGN_RIGHT,
        linefeed: 1,
      ),
    );
    // 
    items.forEach((k, v) => {
          total += v,
          list.add(
            LineText(
              type: LineText.TYPE_TEXT,
              content: k,
              align: LineText.ALIGN_LEFT,
              linefeed: 1,
            ),
          ),
          list.add(
            LineText(
              type: LineText.TYPE_TEXT,
              content: v.toString(),
              align: LineText.ALIGN_RIGHT,
              linefeed: 1,
            ),
          )
        });

    try {
       log.d('start printing');
      await bluetoothPrint.printReceipt({}, list);
      log.d('reach heres');
    } catch (e) {
      //todo: add this to analytics so we know who is failing to print
    }
  }
}
