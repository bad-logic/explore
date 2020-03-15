import 'package:flutter/material.dart';

class Products extends StatelessWidget {
  final List<Map<String, dynamic>> _products;

  Products(this._products) {
    print("[Products] constructor()");
  }

  Widget _buildProduct(BuildContext context, int index) {
    return Card(
      child: Column(
        children: <Widget>[
          Image.asset(_products[index]['image']),
          Container(
            padding: EdgeInsets.only(top: 10.0),
            child: Text(
              _products[index]['title'],
              style: TextStyle(fontSize: 26.0, fontWeight: FontWeight.bold, fontFamily: 'Oswald'),
            ),
          ),
          ButtonBar(
            alignment: MainAxisAlignment.center,
            children: <Widget>[
              FlatButton(
                  child: Text('Details'),
                  onPressed: () =>
                      Navigator.pushNamed<bool>(context, 'product/$index'))
            ],
          )
        ],
      ),
    );
  }

  Widget _buildProductList() {
    Widget isProduct = Center(
      child: Text('No Products Available!!!!'),
    );
    if (_products.length > 0) {
      isProduct = ListView.builder(
        // returns the view while visible only no memory reserved for invisible items while scrolling
        itemBuilder: _buildProduct,
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
