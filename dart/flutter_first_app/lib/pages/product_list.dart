import 'package:flutter/material.dart';
import './product_form.dart';
import './../models/product.dart';
import 'package:scoped_model/scoped_model.dart';
import './../scoped-models/main.dart';

class ProductListPage extends StatelessWidget {


  Widget _buildListTile(BuildContext context, int index, Product product,
      MainModel model) {
    return ListTile(
      leading: CircleAvatar(
        backgroundImage: AssetImage(product.imageUrl),
      ),
      title: Text(product.title),
      subtitle: Text('\$' + product.price.toString()),
      trailing: IconButton(
        icon: Icon(Icons.edit),
        onPressed: () {
          model.selectProduct(index);
          Navigator.of(context).push(
            MaterialPageRoute(
              builder: (BuildContext context) {
                return ProductFormPage();
              },
            ),
          ).then((value) => model.unselectProduct());
        },
      ),
    );
  }

  Widget _buildProductList(
      MainModel model) {
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
              // select the index of product on which dismiss action is triggered
              model.selectProduct(index);
              // delete that product
              model.deleteProduct();
              model.unselectProduct();
            }
          },
          child: Column(
            children: <Widget>[
              _buildListTile(context, index, model.products[index], model),
              Divider(),
            ],
          ),
        );
      },
      itemCount: model.products.length,
    );
  }

  @override
  Widget build(BuildContext context) {
    return ScopedModelDescendant<MainModel>(
      builder: (BuildContext context, Widget child, MainModel model) {
        return model.products.length > 0
            ? _buildProductList(
                model)
            : Center(
                child: Text('You don\'t have any products'),
              );
      },
    );
  }
}
