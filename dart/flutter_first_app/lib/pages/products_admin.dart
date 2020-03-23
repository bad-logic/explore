import 'package:flutter/material.dart';
import './product_form.dart';
import './product_list.dart';
import './../models/product.dart';

class ProductsAdminPage extends StatelessWidget {
  final List<Product> _products;
  final Function _addProduct, _deleteProduct,_updateProduct;
  ProductsAdminPage(this._products, this._addProduct, this._updateProduct, this._deleteProduct);


  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
        length: 2,
        child: Scaffold(
          drawer: Drawer(
              child: Column(children: <Widget>[
            AppBar(
              automaticallyImplyLeading: false,
              title: Text('Choose'),
            ),
            ListTile(
              leading: Icon(Icons.shop),
              title: Text('All Products'),
              onTap: () {
                Navigator.pushReplacementNamed(context, '/products');
              },
            )
          ])),
          appBar: AppBar(
            title: Text('Manage Products'),
            bottom: TabBar(
              tabs: <Widget>[
                Tab(
                  icon: Icon(Icons.create),
                  text: 'Create Product',
                ),
                Tab(
                  icon: Icon(Icons.assignment),
                  text: 'My Products',
                ),
              ],
            ),
          ),
          body: TabBarView(
            children: <Widget>[
              ProductFormPage(addProduct: _addProduct),
              ProductListPage(_products,_updateProduct,_deleteProduct)
            ],
          ),
        ));
  }
}
