import 'package:flutter/material.dart';

class AuthPage extends StatefulWidget{

  @override
  State<StatefulWidget> createState() {
    // TODO: implement createState
    return _AuthPage();
  }

}
class _AuthPage extends State<AuthPage> {

  final Map<String,dynamic> _user = {'email':'','password':''};
  bool _acceptTerms = false;

  @override
  Widget build(BuildContext context) {

    return Scaffold(
      appBar: AppBar(
        title: Text('Login'),
      ),
      body:
          Container(
            margin: EdgeInsets.all(10.0),
            child: ListView(
              children: <Widget>[
                TextField(
                  decoration: InputDecoration(labelText: 'E-Mail'),
                  onChanged: (String value) {
                    setState(() {
                      _user['email'] = value;
                    });
                  },
                ),
                TextField(
                  decoration: InputDecoration(labelText: 'Password'),
                  onChanged: (String value) {
                    setState(() {
                      _user['password'] = value;
                    });
                  },
                ),
                SwitchListTile(value: _acceptTerms,onChanged: (bool value){
                  setState(() {
                    _acceptTerms = value;
                  });
                },title: Text('Accept Terms'),),
                SizedBox(// doesnot render anything just occupies space
                  height: 10.0,
                ),
                RaisedButton(
                  child: Text('Login'),
                  color: Theme.of(context).accentColor,
                  textColor: Colors.white,
                  onPressed: () {
                    Navigator.pushReplacementNamed(context, '/'); // pressing back button will not navigate here
                  },
                ),
              ],
            ),
          ),
      );
  }
}
