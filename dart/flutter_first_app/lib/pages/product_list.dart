import 'package:flutter/material.dart';
import './product_form.dart';

class ProductListPage extends StatelessWidget {
  final List<Map<String, dynamic>> _products;
  final Function _updateProduct;
  ProductListPage(this._updateProduct, this._products);

  Widget _buildProductList() {
    Widget isProduct = Center(
      child: Text('All Available Products'),
    );
    if (_products.length > 0) {
      isProduct = ListView.builder(
        // returns the view while visible only no memory reserved for invisible items while scrolling
        itemBuilder: (BuildContext context, int index) {
          return ListTile(
            contentPadding: EdgeInsets.symmetric(horizontal:16.0,vertical: 10.0),
            leading: Image.asset(_products[index]['image']),
            title: Text(_products[index]['title']),
            trailing: IconButton(
              icon: Icon(Icons.edit),
              onPressed: () {
                Navigator.of(context).push(
                  MaterialPageRoute(
                    builder: (BuildContext context) {
                      return ProductFormPage(
                          updateProduct: _updateProduct,
                          product: _products[index],
                          index: index);
                    },
                  ),
                );
              },
            ),
          );
        },
        itemCount: _products.length,
      );
    }
    return isProduct;
  }

  @override
  Widget build(BuildContext context) {
    return _buildProductList();
  }
}
