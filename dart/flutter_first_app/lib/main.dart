import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget{
  // build method of StatelessWidget must be overriden
  // we write annotation @override that tells dart/flutter that we have
  // overriden the build method which is already defined in StatelessWidget
  @override // this annotation is optional
  Widget build(BuildContext context){ // returns a widget
    return MaterialApp(
      home:Scaffold( // Scaffold widget creates a page. Scaffold is built in
        // widget shipped with material package we imported in line 1
        appBar: AppBar( // creates an appBar. AppBar is also a built in widget
          // shipped with material package we imported in line 1
          title:Text('EasyList'), // adds text in the appBar
        ),
        body: Card(child: Column(children: <Widget>[
          Image.asset('assets/food.jpg'),
          Text('Food Paradise')
        ],),),// built in widget shipped with material package
        // we imported in line 1
      ),
    );
  }
}