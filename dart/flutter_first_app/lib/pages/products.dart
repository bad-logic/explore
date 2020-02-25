import 'package:flutter/material.dart';
import '../product_manager.dart';

class ProductsPage extends StatelessWidget {

  final List<Map<String,String>> products;
  final Function _addProduct, _deleteProduct;

  ProductsPage(this.products,this._addProduct,this._deleteProduct);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: Drawer(
        child: Column(
          children: <Widget>[
            AppBar(
              automaticallyImplyLeading: false,
              title: Text('Choose'),
            ),
            ListTile(
              title: Text('Manage Products'),
              onTap: () {
                Navigator.pushReplacementNamed(context, 'admin');
              },
            ),
          ],
        ),
      ),
      appBar: AppBar(
        title: Text('EasyList'),
      ),
      body: ProductManager(this.products,this._addProduct,this._deleteProduct),
    );
  }
}
