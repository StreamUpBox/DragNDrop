
import 'package:observable_ish/observable_ish.dart';
import 'package:stacked/stacked.dart';
//the entire app action no more actions! since we may reject redux fully!

class SharedStateService with ReactiveServiceMixin {
  SharedStateService() {
    listenToReactiveValues(
        [_blueConnected,_bluethoothDevices]);
  }

  final RxValue<bool> _blueConnected = RxValue<bool>(initial: false);

  final RxValue<List<dynamic>> _bluethoothDevices = RxValue<List<dynamic>>(initial: null);


   bool get blueConnected => _blueConnected.value;

   List<dynamic> get bluethioothDevices => _bluethoothDevices.value;

  // setters
  void setBluethoothConnected({bool connected}) {
    _blueConnected.value = connected;
  }

  void setBluethoothDevices({List<dynamic> devices}) {
    _bluethoothDevices.value = devices;
  }

}
