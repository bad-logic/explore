import 'package:flutter/material.dart';
import './products.dart';
import './product_control.dart';

class ProductManager extends StatelessWidget {

  final Function _addProduct, _deleteProduct;
  final List <Map<String,String>> _products;

  ProductManager(this._products,this._addProduct,this._deleteProduct);

  @override
  Widget build(BuildContext context) {
    print("[ProductManager] build()");
    return Column(
      children: [
        Container(
            margin: EdgeInsets.all(10.0),
            child: ProductControl(
                this._addProduct) // passing the function reference to another widget
            // so that we can call this function to add products
            ),
        Expanded(
          // takes the remaining space
          child: Products(this._products, this._deleteProduct),
        )
      ],
    );
  }
}
