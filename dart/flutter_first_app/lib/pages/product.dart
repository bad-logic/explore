import 'package:flutter/material.dart';

class ProductPage extends StatelessWidget{

  Widget build(BuildContext context){
    return Scaffold( // Scaffold widget creates a page. Scaffold is built in
      // widget shipped with material package we imported in line 1
      appBar: AppBar( // creates an appBar. AppBar is also a built in widget
        // shipped with material package we imported in line 1
        title:Text('Product Detail'), // adds text in the appBar
      ),
      body:Column(children:<Widget>[
        Text('on the product page'),
        RaisedButton(
          child:Text('BACK'),
          onPressed: ()=>Navigator.pop(context),
        )
      ],
      ),
    );

  }
}