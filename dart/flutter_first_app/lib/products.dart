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

  Widget _buildProductList(){

    Widget isProduct = Center(child:Text('No Products found, Click Button to Add some'),);
    if(_products.length > 0) {
      isProduct = ListView
          .builder( // returns the view while visible only no memory reserved for invisible items while scrolling
        itemBuilder: _buildProduct,
        itemCount: _products.length,
      );
    }
    return isProduct;

  }

  @override
  Widget build(BuildContext context){
    print("[Products] build()");
    return _buildProductList();
  }

}