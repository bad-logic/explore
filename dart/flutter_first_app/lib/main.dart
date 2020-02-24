import 'package:flutter/material.dart';
import './pages/auth.dart';

void main() {
//  debugPaintSizeEnabled = true; // for debugging the user interface
//  debugPaintBaselinesEnabled = true; // shows green lines for text
//  debugPaintPointersEnabled = true; // indicates where tap event occurred
  runApp(MyApp());
}
class MyApp extends StatelessWidget{

  MyApp(){
    print("[MyApp] constructor()");
  }

  @override
  Widget build(BuildContext context){ // returns a widget
    print("[MyApp] build()");

    return MaterialApp(
//      debugShowMaterialGrid: true,//shows grid
      theme:ThemeData(
        brightness: Brightness.dark,
        primarySwatch: Colors.deepOrange,
        accentColor: Colors.deepPurple
      ),
      home: AuthPage(),
    );

  }

}
