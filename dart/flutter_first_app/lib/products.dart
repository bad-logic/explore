import 'package:flutter/material.dart';

class Products extends StatelessWidget{

  final List<String> _products;
  Products(this._products){
    print("[Products] constructor()");
  }

  Widget _buildProduct(BuildContext context, int index){
    return Card(
      child: Column(
        children: <Widget>[
          Image.asset('assets/food.jpg'),
          Text(_products[index])
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context){
    print("[Products] build()");
    return ListView.builder( // returns the view while visible only no memory reserved for invisible items while scrolling
      itemBuilder: _buildProduct,
      itemCount: _products.length,
    );
  }

}