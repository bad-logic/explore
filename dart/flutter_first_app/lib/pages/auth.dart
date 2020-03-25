import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:scoped_model/scoped_model.dart';
import './../scoped-models/main.dart';


class AuthPage extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    // TODO: implement createState
    return _AuthPage();
  }
}

class _AuthPage extends State<AuthPage> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  final Map<String, dynamic> _user = {'email': null, 'password': null,'acceptTerms': false};

  DecorationImage _buildBackgroundImage() {
    return DecorationImage(
        fit: BoxFit.cover,
        colorFilter:
            ColorFilter.mode(Colors.black.withOpacity(0.5), BlendMode.dstATop),
        image: AssetImage('assets/background.jpg'));
  }

  Widget _buildEmailTextField() {
    return TextFormField(
      decoration: InputDecoration(
          labelText: 'E-Mail', filled: true, fillColor: Colors.white),
      keyboardType: TextInputType.emailAddress,
      validator: (String value) {
        if (value.isEmpty ||
            !RegExp(r"[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
                .hasMatch(value)) {
          return 'Please enter a valid email';
        }
        return null;
      },
      onSaved: (String value) {
        setState(() {
          _user['email'] = value;
        });
      },
    );
  }

  Widget _buildPasswordTextField() {
    return TextFormField(
      decoration: InputDecoration(
          labelText: 'Password', filled: true, fillColor: Colors.white),
      obscureText: true,
      validator: (String value) {
        if (value.isEmpty || value.length < 6) {
          return 'Password invalid';
        }
        return null;
      },
      onSaved: (String value) {
        setState(() {
          _user['password'] = value;
        });
      },
    );
  }

  Widget _buildAcceptTerms() {
    return SwitchListTile(
      value: _user['acceptTerms'],
      onChanged: (bool value) {
        setState(() {
          _user['acceptTerms'] = value;
        });
      },
      title: Text('Accept Terms'),
    );
  }

  _submitForm(Function login){
    if (!_formKey.currentState.validate() || !_user['acceptTerms']) {// returns true if all validator function of forms fields are true
      //validator function runs at this point and then only shows error
      return; // in case of false donot run below code
    }
    _formKey.currentState
        .save();
    login(email:_user['email'],password:_user['password']);
    Navigator.pushReplacementNamed(context,
        '/products'); // pressing back button will not navigate here
  }

  @override
  Widget build(BuildContext context) {
    final double deviceWidth = MediaQuery.of(context).size.width;
    // 768 px is the break point for the device width
    final double targetDeviceWidth =
        deviceWidth > 768.0 ? 450.0 : deviceWidth * 0.95;

    return Scaffold(
      appBar: AppBar(
        title: Text('Login'),
      ),
      body: Container(
          decoration: BoxDecoration(
            image: _buildBackgroundImage(),
          ),
          padding: EdgeInsets.all(10.0),
          child: Form(
            key: _formKey,
            child: Center(
              child: SingleChildScrollView(
                child: Container(
                  width: targetDeviceWidth,
                  child: Column(
                    children: <Widget>[
                      _buildEmailTextField(),
                      SizedBox(height: 10.0),
                      _buildPasswordTextField(),
                      _buildAcceptTerms(),
                      SizedBox(
                        // doesnot render anything just occupies space
                        height: 10.0,
                      ),
                      ScopedModelDescendant<MainModel>(
                        builder: (BuildContext context, Widget child, MainModel model){
                          return RaisedButton(
                            child: Text('Login'),
                            textColor: Colors.white,
                            onPressed: () {
                              _submitForm(model.login);
                            },
                          );
                        },
                      ),
                    ],
                  ),
                ),
              ),
            ),
          )),
    );
  }
}
