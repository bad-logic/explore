import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'dart:async'; // future is imported from this library

class ProductPage extends StatelessWidget{

  final String _imageUrl,_title;

  ProductPage(this._imageUrl,this._title);

  @override
  Widget build(BuildContext context){
    return WillPopScope(// listens for the back button being pressed
        onWillPop: (){
          Navigator.pop(context,false);// here you can return any boolean value, true if you want to delete the product 
          return Future.value(false);// returning true here will trigger another pop action which will try to pop home page
          // and the app crashes
        },
        child:Scaffold( // Scaffold widget creates a page. Scaffold is built in
              // widget shipped with material package we imported in line 1
              appBar: AppBar( // creates an appBar. AppBar is also a built in widget
                // shipped with material package we imported in line 1
                title:Text(_title), // adds text in the appBar
              ),
              body:Column(
                 // mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children:<Widget>[
                      Image.asset(_imageUrl),
                      Container(
                        padding: EdgeInsets.all(10.0),
                        child:Text(_title),
                      ),
                      Container(
                        padding: EdgeInsets.all(10.0),
                        child:RaisedButton(
                                color: Theme.of(context).accentColor,
                                child:Text('DELETE'),
                                onPressed: ()=>Navigator.pop(context, true),
                      ),
                      ),
                  ],
              ),
            ),
    );

  }
}