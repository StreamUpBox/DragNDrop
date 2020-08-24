import 'package:flutter/material.dart';
import 'package:sms_autofill/sms_autofill.dart';


class OtpPage extends StatefulWidget {
  OtpPage({Key key}) : super(key: key);

  @override
  _OtpPageState createState() => _OtpPageState();
}

class _OtpPageState extends State<OtpPage>  with CodeAutoFill {
  String _code;
  String signature = "{{ app signature }}";

  @override
  void dispose() {
    SmsAutoFill().unregisterListener();
    super.dispose();
    cancel();
  }
  @override
  void initState() {
    super.initState(); 
    listenForCode();

    SmsAutoFill().getAppSignature.then((signature) {
    });
  }


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body:   Padding(
          padding: const EdgeInsets.all(8.0),
          child: Column(
            mainAxisSize: MainAxisSize.max,
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: <Widget>[
              
              PinFieldAutoFill(
                decoration: UnderlineDecoration(
                    textStyle: TextStyle(fontSize: 20, color: Colors.black)),
                currentCode: _code,
                onCodeSubmitted: (code) {
                  print('code submitted$code');
                },
                onCodeChanged: (code) {
                  if (code.length == 6) {
                    FocusScope.of(context).requestFocus(FocusNode());
                  }
                },
              ),
            ],
          ),
        ),
    );
  }

  @override
  void codeUpdated() {
     setState(() {
      _code  = code;
    });
  }
}
