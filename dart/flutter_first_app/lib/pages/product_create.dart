import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class ProductCreatePage extends StatefulWidget {
  final Function addProduct;
  ProductCreatePage(this.addProduct);

  @override
  State<StatefulWidget> createState() {
    return _ProductCreatePageState();
  }
}

class _ProductCreatePageState extends State<ProductCreatePage> {
  final Map<String, dynamic> _product = {'image': 'assets/food.jpg'};

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.all(10.0),
      child: ListView(
        children: <Widget>[
          TextField(
            decoration: InputDecoration(labelText: 'Product Title'),
            onChanged: (String value) {
              setState(() {
                _product['title'] = value;
              });
            },
          ),
          TextField(
            keyboardType: TextInputType.number,
            decoration: InputDecoration(labelText: 'Product Price'),
            onChanged: (String value) {
              setState(() {
                _product['price'] = double.parse(value);
              });
            },
          ),
          TextField(
            maxLines: 5,
            decoration: InputDecoration(labelText: 'Product Description'),
            onChanged: (String value) {
              setState(() {
                _product['description'] = value;
              });
            },
          ),
          SizedBox(
            height: 10.0,
          ), // doesnot render anything just occupies space
          RaisedButton(
            child: Text('Save'),
            color: Theme.of(context).accentColor,
            textColor: Colors.white,
            onPressed: () {
              widget.addProduct(_product);
              Navigator.pushReplacementNamed(context, '/'); // pressing back button will not navigate here
             },
          ),
        ],
      ),
    );
  }
}
