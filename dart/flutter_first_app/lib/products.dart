import 'package:flutter/material.dart';
import './pages/product.dart';

class Products extends StatelessWidget{

  final List<Map<String ,String >> _products;
  Products(this._products){
    print("[Products] constructor()");
  }

  Widget _buildProduct(BuildContext context, int index){

    return Card(
      child: Column(
        children: <Widget>[
          Image.asset(_products[index]['image']),
          Text(_products[index]['title']),
          ButtonBar(
            alignment: MainAxisAlignment.center,
            children:<Widget>[
            FlatButton(
              child:Text('Details'),
              onPressed: ()=>Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (BuildContext context)=>ProductPage(_products[index]['image'],_products[index]['title']),
                  ),
              ),
            )
          ]
        ,)
      ],
    ),
  );

  }

  Widget _buildProductList(){

    Widget isProduct = Center(child:Text('No Products found, Click Button to Add some'),);
    if(_products.length > 0) {
      isProduct = ListView
          .builder( // returns the view while visible only no memory reserved for invisible items while scrolling
        itemBuilder: _buildProduct,
        itemCount: _products.length,
      );
    }
    return isProduct;

  }

  @override
  Widget build(BuildContext context){
    print("[Products] build()");
    return _buildProductList();
  }

}