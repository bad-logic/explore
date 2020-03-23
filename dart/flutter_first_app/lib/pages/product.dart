import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'dart:async'; // future is imported from this library
import './../widgets/ui_elements/title_default.dart';
import './../models/product.dart';

class ProductPage extends StatelessWidget {
  final Product product;

  ProductPage(this.product);

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      // listens for the back button being pressed
      onWillPop: () {
        Navigator.pop(context,
            false); // here you can return any boolean value, true if you want to delete the product
        return Future.value(
            false); // returning true here will trigger another pop action which will try to pop home page
        // and the app crashes
      },
      child: Scaffold(
        // Scaffold widget creates a page. Scaffold is built in
        // widget shipped with material package we imported in line 1
        appBar: AppBar(
          // creates an appBar. AppBar is also a built in widget
          // shipped with material package we imported in line 1
          title: Text(product.title), // adds text in the appBar
        ),
        body: Column(
          // mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: <Widget>[
            Image.asset(product.imageUrl),
            Container(
              padding: EdgeInsets.all(10.0),
              child: DefaultTitle(product.title),
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                Text('Kathmandu, Nepal',style: TextStyle(fontFamily: 'Oswald',color:Colors.grey),),
                Container(
                  margin:EdgeInsets.symmetric(horizontal: 5.0),
                  child: Text('|',style:TextStyle(color: Colors.grey)),
                ),
                Text('\$'+product.price.toString(),style: TextStyle(fontFamily: 'Oswald',color:Colors.grey),),
              ],
            ),
            Container(
              padding: EdgeInsets.all(10.0),
              child: Text(product.description,textAlign: TextAlign.center,),
            ),
          ],
        ),
      ),
    );
  }
}
