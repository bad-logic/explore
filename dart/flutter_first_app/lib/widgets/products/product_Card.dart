import 'package:flutter/material.dart';
import './price_tag.dart';
import './../ui_elements/title_default.dart';
import './address_tag.dart';

class ProductCard extends StatelessWidget {
  final Map<String, dynamic> product;
  final int index;

  ProductCard(this.product, this.index);

  Widget _buildTitlePriceRow() {
    return Container(
      padding: EdgeInsets.only(top: 10.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          DefaultTitle(product['title']),
          SizedBox(
            width: 10.0,
          ),
          PriceTag(product['price'].toString()),
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
        IconButton(
            icon: Icon(
              Icons.favorite_border,
            ),
            color: Colors.red,
            tooltip: 'Favourite',
            onPressed: () => null),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return Card(
      child: Column(
        children: <Widget>[
          Image.asset(product['image']),
          _buildTitlePriceRow(),
          AddressTag('Kathmandu, Nepal'),
          _buildActionsButtons(context),
        ],
      ),
    );
  }
}
