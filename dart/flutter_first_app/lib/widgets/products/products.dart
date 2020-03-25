import 'package:flutter/material.dart';
import './product_Card.dart';
import './../../models/product.dart';
import 'package:scoped_model/scoped_model.dart';
import './../../scoped-models/main.dart';

class Products extends StatelessWidget {


  Widget _buildProductList(List<Product> _products, MainModel model) {
    Widget isProduct = Center(
      child: Text(model.enableFavorite ? 'No Favourite Products':'No Products Available'),
    );
    if (_products.length > 0) {
      isProduct = ListView.builder(
        // returns the view while visible only no memory reserved for invisible items while scrolling
        itemBuilder: (BuildContext context, int index) {
          return ProductCard(_products[index], index);
        },
        itemCount: _products.length,
      );
    }
    return isProduct;
  }


  @override
  Widget build(BuildContext context) {
    print("[Products] build()");
    return ScopedModelDescendant<MainModel>(
      builder: (BuildContext context, Widget child, MainModel model) {
        // builder method executes whenever our ProductsModel changes
        return _buildProductList(model.displayProducts,model);
      },
    );
  }


}
