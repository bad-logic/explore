import 'package:flutter/material.dart';

import './products.dart';
import './product_control.dart';

class ProductManager extends StatefulWidget {
  final Map<String, String> startingProduct;

  ProductManager({this.startingProduct}) {
    print("[ProductManager] constructor()");
  }

  @override
  State<StatefulWidget> createState() {
    print("[ProductManager] createState()");
    return _ProductManagerState();
  }
}

class _ProductManagerState extends State<ProductManager> {
  final List<Map<String, String>> _products = [];

  @override
  void initState() {
    print("[ProductManager] initState()");
    super.initState();
    if (widget.startingProduct != null) {
      _products.add(widget.startingProduct);
    }
  }

  @override
  void didUpdateWidget(ProductManager oldWidget) {
    print("[ProductManager] didUpdateWidget()");
    super.didUpdateWidget(oldWidget);
  }

  void _addProduct(Map<String, String> product) {
    setState(() {
      _products.add(product);
    });
  }

  void _deleteProduct(int index) {
    setState(() {
      _products.removeAt(index);
    });
  }

  @override
  Widget build(BuildContext context) {
    print("[ProductManager] build()");
    return Column(
      children: [
        Container(
            margin: EdgeInsets.all(10.0),
            child: ProductControl(
                _addProduct) // passing the function reference to another widget
            // so that we can call this function to add products
            ),
        Expanded(
          // takes the remaining space
          child: Products(_products, _deleteProduct),
        )
      ],
    );
  }
}
