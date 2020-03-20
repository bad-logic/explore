import 'package:flutter/material.dart';
import './price_tag.dart';

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
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                Text(
                  _products[index]['title'],
                  style: TextStyle(
                      fontSize: 26.0,
                      fontWeight: FontWeight.bold,
                      fontFamily: 'Oswald'),
                ),
                SizedBox(
                  width: 10.0,
                ),
                PriceTag(_products[index]['price'].toString()),
              ],
            ),
          ),
          Container(
            padding: EdgeInsets.symmetric(vertical: 2.5, horizontal: 6.0),
            decoration: BoxDecoration(
              border: Border.all(color: Colors.grey, width: 1.0),
              borderRadius: BorderRadius.circular(5.0),
            ),
            child: Text('Kathmandu, Nepal'),
          ),
          ButtonBar(
            alignment: MainAxisAlignment.center,
            children: <Widget>[
              IconButton(
                icon: Icon(Icons.info),
                color: Theme.of(context).accentColor,
                tooltip: 'Details',
                onPressed: () =>
                    Navigator.pushNamed<bool>(context, 'product/$index'),
              ),
              IconButton(
                  icon: Icon(
                    Icons.favorite_border,
                  ),
                  color: Colors.red,
                  tooltip: 'Favourite',
                  onPressed: () => null),
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
