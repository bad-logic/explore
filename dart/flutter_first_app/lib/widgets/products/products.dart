import 'package:flutter/material.dart';
import './product_Card.dart';

class Products extends StatelessWidget {
  final List<Map<String, dynamic>> _products;

  Products(this._products) {
    print("[Products] constructor()");
  }
  
  Widget _buildProductList() {
    Widget isProduct = Center(
      child: Text('No Products Available!!!!'),
    );
    if (_products.length > 0) {
      isProduct = ListView.builder(
        // returns the view while visible only no memory reserved for invisible items while scrolling
        itemBuilder: (BuildContext context,int index)=>ProductCard(_products[index],index),
        itemCount: _products.length,
      );
    }
    return isProduct;
  }

  @override
  Widget build(BuildContext context) {
    print("[Products] build()");
    return _buildProductList();
  }

}
