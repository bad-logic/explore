import 'package:flutter/material.dart';
import 'package:flutter_app1/scoped-models/products.dart';
import './price_tag.dart';
import './../ui_elements/title_default.dart';
import './address_tag.dart';
import './../../models/product.dart';
import 'package:scoped_model/scoped_model.dart';

class ProductCard extends StatelessWidget {
  final Product product;
  final int index;

  ProductCard(this.product, this.index);

  Widget _buildTitlePriceRow() {
    return Container(
      padding: EdgeInsets.only(top: 10.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          DefaultTitle(product.title),
          SizedBox(
            width: 10.0,
          ),
          PriceTag(product.price.toString()),
        ],
      ),
    );
  }

  Widget _buildActionsButtons(BuildContext context) {
    return ButtonBar(
      alignment: MainAxisAlignment.center,
      children: <Widget>[
        IconButton(
          icon: Icon(Icons.info),
          color: Theme.of(context).accentColor,
          tooltip: 'Details',
          onPressed: () => Navigator.pushNamed<bool>(context, 'product/$index'),
        ),
        ScopedModelDescendant<ProductsModel>(
            builder: (BuildContext context, Widget child, ProductsModel model) {
          return IconButton(
              icon: Icon(
                product.isFavourite
                    ? Icons.favorite
                    : Icons.favorite_border,
              ),
              color: Colors.red,
              tooltip: 'Favourite',
              onPressed: () {
                model.selectProduct(index);
                model.toggleProductFavouriteStatus();
              });
        })
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return Card(
      child: Column(
        children: <Widget>[
          Image.asset(product.imageUrl),
          _buildTitlePriceRow(),
          AddressTag('Kathmandu, Nepal'),
          _buildActionsButtons(context),
        ],
      ),
    );
  }
}
