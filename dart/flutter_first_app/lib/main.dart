import 'package:flutter/material.dart';

import './product_manager.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget{

  MyApp(){
    print("[MyApp] constructor()");
  }

  @override
  Widget build(BuildContext context){ // returns a widget
    print("[MyApp] build()");

    return MaterialApp(
      theme:ThemeData(
        brightness: Brightness.dark,
        primarySwatch: Colors.deepOrange,
        accentColor: Colors.deepPurple
      ),
      home:Scaffold( // Scaffold widget creates a page. Scaffold is built in
        // widget shipped with material package we imported in line 1
        appBar: AppBar( // creates an appBar. AppBar is also a built in widget
          // shipped with material package we imported in line 1
          title:Text('EasyList'), // adds text in the appBar
        ),
        body:ProductManager('Food Tester'),
        ),
      );
  }

}
