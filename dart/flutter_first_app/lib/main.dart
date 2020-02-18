import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatefulWidget{

  @override
  State<StatefulWidget> createState() {
    // TODO: implement createState
    return _MyAppState();
  }

}

class _MyAppState extends State<MyApp>{

  List <String> _products = ['Food Tester'];

  @override
  Widget build(BuildContext context){ // returns a widget
    return MaterialApp(
      home:Scaffold( // Scaffold widget creates a page. Scaffold is built in
        // widget shipped with material package we imported in line 1
        appBar: AppBar( // creates an appBar. AppBar is also a built in widget
          // shipped with material package we imported in line 1
          title:Text('EasyList'), // adds text in the appBar
        ),
        body:Column(
          children: [
            Container(
              margin: EdgeInsets.all(10.0),
              child:RaisedButton(
                onPressed: (){
                  setState((){// function to tell flutter that we are changing the state so it re-renders
                    _products.add('Advanced Food Tester');
                  });
                },
                child: Text('Add Product'),
              ),
            ),
            Column(children: _products
                .map(
                    (element) => Card(
                      child: Column(
                        children: <Widget>[
                          Image.asset('assets/food.jpg'),
                          Text(element)
                        ],
                      ),
                    )).toList(),
                  ),
          ],
        ),
      ),
    );
  }

}


//class MyApp extends StatelessWidget{
//
//  // build method of StatelessWidget must be overriden
//  // stateless widget is called only once and does not gets called when the data is changed
//  // we write annotation @override that tells dart/flutter that we have
//  // overriden the build method which is already defined in StatelessWidget
//
//  @override // this annotation is optional
//  Widget build(BuildContext context){ // returns a widget
//    return MaterialApp(
//      home:Scaffold( // Scaffold widget creates a page. Scaffold is built in
//        // widget shipped with material package we imported in line 1
//        appBar: AppBar( // creates an appBar. AppBar is also a built in widget
//          // shipped with material package we imported in line 1
//          title:Text('EasyList'), // adds text in the appBar
//        ),
//        body:Column(
//          children: [
//            Container(
//              margin: EdgeInsets.all(10.0),
//              child:RaisedButton(
//                onPressed: (){
//
//                },
//                child: Text('Add Product'),
//              ),
//            ),
//            Card(// built in widget shipped with material package we imported in line 1
//              child: Column(
//                children: <Widget>[
//          Image.asset('assets/food.jpg'),
//          Text('Food Paradise')
//        ],
//        ),
//        ),],
//      ),
//      ),
//    );
//  }
//}