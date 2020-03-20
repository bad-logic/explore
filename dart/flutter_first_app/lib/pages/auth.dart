import 'package:flutter/material.dart';

class AuthPage extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    // TODO: implement createState
    return _AuthPage();
  }
}

class _AuthPage extends State<AuthPage> {
  final Map<String, dynamic> _user = {'email': '', 'password': ''};
  bool _acceptTerms = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Login'),
      ),
      body: Container(
        decoration: BoxDecoration(
            image: DecorationImage(
                fit: BoxFit.cover,
                colorFilter: ColorFilter.mode(
                    Colors.black.withOpacity(0.5), BlendMode.dstATop),
                image: AssetImage('assets/background.jpg'))),
        padding: EdgeInsets.all(10.0),
        child: Center(
          child: SingleChildScrollView(
            child: Column(
            children: <Widget>[
              TextField(
                decoration: InputDecoration(labelText: 'E-Mail', filled: true, fillColor: Colors.white),
                onChanged: (String value) {
                  setState(() {
                    _user['email'] = value;
                  });
                },
              ),
              SizedBox(height:10.0),
              TextField(
                decoration: InputDecoration(labelText: 'Password', filled:true,fillColor: Colors.white),
                onChanged: (String value) {
                  setState(() {
                    _user['password'] = value;
                  });
                },
              ),
              SwitchListTile(
                value: _acceptTerms,
                onChanged: (bool value) {
                  setState(() {
                    _acceptTerms = value;
                  });
                },
                title: Text('Accept Terms'),
              ),
              SizedBox(
                // doesnot render anything just occupies space
                height: 10.0,
              ),
              RaisedButton(
                child: Text('Login'),
                color: Theme.of(context).primaryColor,
                textColor: Colors.white,
                onPressed: () {
                  Navigator.pushReplacementNamed(context,
                      '/products'); // pressing back button will not navigate here
                },
              ),
            ],
            ),
          ),
        ),
      ),
    );
  }
}
