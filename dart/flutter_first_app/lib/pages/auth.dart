import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class AuthPage extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    // TODO: implement createState
    return _AuthPage();
  }
}

class _AuthPage extends State<AuthPage> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  final Map<String, dynamic> _user = {'email': '', 'password': ''};
  bool _acceptTerms = false;

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
      validator: (String value) {
        if (value.isEmpty) {
          return 'Email is Required';
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
      validator: (String value) {
        if (value.isEmpty) {
          return 'Password is required';
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
      value: _acceptTerms,
      onChanged: (bool value) {
        setState(() {
          _acceptTerms = value;
        });
      },
      title: Text('Accept Terms'),
    );
  }

  _submitForm(){
    if (!_formKey.currentState.validate()) {// returns true if all validator function of forms fields are true
      //validator function runs at this point and then only shows error
      return; // in case of false donot run below code
    }
    _formKey.currentState
        .save();
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
                      RaisedButton(
                        child: Text('Login'),
                        textColor: Colors.white,
                        onPressed: () {
                          _submitForm();
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
