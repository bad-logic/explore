import 'package:flutter/material.dart';
import './products.dart';
class AuthPage extends StatelessWidget{

  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return Scaffold(
      appBar: AppBar(
        title:Text('Login'),
      ),
      body:Center(
          child:RaisedButton(
            child:Text('Login'),
            onPressed: () => Navigator.pushReplacement(context, MaterialPageRoute(// will completely replace the current page no back button
                builder: (BuildContext context)=>ProductsPage(),
              ),
              ),
          ),
      ),
    );
  }

}