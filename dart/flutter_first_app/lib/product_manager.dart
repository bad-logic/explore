import 'package:flutter/material.dart';

import './products.dart';


class ProductManager extends StatefulWidget{

  final String startingProduct;
  ProductManager(this.startingProduct){
    print("[ProductManager] constructor()");
  }

  @override
  State<StatefulWidget> createState() {
    print("[ProductManager] createState()");
    return _ProductManagerState();
  }

}

class _ProductManagerState extends State<ProductManager>{

  List <String> _products = [];

  @override
  void initState() {
    print("[ProductManager] initState()");
    super.initState();
    _products.add(widget.startingProduct);
  }

  @override
  void didUpdateWidget(ProductManager oldWidget) {
    // TODO: implement didUpdateWidget
    print("[ProductManager] didUpdateWidget()");
    super.didUpdateWidget(oldWidget);
  }

  @override
  Widget build(BuildContext context) {
    print("[ProductManager] build()");
    return  Column(children:
        [Container(
            margin: EdgeInsets.all(10.0),
            child:RaisedButton(
              color: Theme.of(context).primaryColor,
              onPressed: (){
                setState((){// function to tell flutter that we are changing the state so it re-renders
                  _products.add('Advanced Food Tester');
                });
              },
              child: Text('Add Product'),
            ),
          ),
          Products(_products)
        ],
    );
  }
}