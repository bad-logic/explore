import 'package:flutter/material.dart';
import './product_form.dart';
import './../models/product.dart';

class ProductListPage extends StatelessWidget {
  final List<Product> _products;
  final Function _updateProduct, _deleteProduct;
  ProductListPage(this._products, this._updateProduct, this._deleteProduct);

  Widget _buildListTile(BuildContext context, int index) {
    return ListTile(
      leading: CircleAvatar(
        backgroundImage: AssetImage(_products[index].imageUrl),
      ),
      title: Text(_products[index].title),
      subtitle: Text('\$' + _products[index].price.toString()),
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
  }

  Widget _buildProductList() {

    return ListView.builder(
      // returns the view while visible only no memory reserved for invisible items while scrolling
      itemBuilder: (BuildContext context, int index) {
        return Dismissible(
          key: Key(index.toString()),
          // key for flutter to recognise which element to dismiss from widget
          // key must be unique
          background: Container(color: Colors.red),
          direction: DismissDirection.endToStart,
          onDismissed: (DismissDirection direction) {
            if (direction == DismissDirection.endToStart) {
              _deleteProduct(index);
            }
          },
          child: Column(
            children: <Widget>[
              _buildListTile(context, index),
              Divider(),
            ],
          ),
        );
      },
      itemCount: _products.length,
    );

  }

  @override
  Widget build(BuildContext context) {
    return _products.length > 0
        ? _buildProductList()
        : Center(
            child: Text('All Available Products'),
          );
  }
}
