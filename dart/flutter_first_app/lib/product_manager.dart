import 'package:flutter/material.dart';
import './products.dart';

class ProductManager extends StatelessWidget {

  final List <Map<String,dynamic>> _products;

  ProductManager(this._products);

  @override
  Widget build(BuildContext context) {
    print("[ProductManager] build()");
    return Column(
      children: [
        Expanded(
          // takes the remaining space
          child: Products(this._products),
        )
      ],
    );
  }
}
