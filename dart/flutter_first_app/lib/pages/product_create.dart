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

  Widget _buildTitleTextField() {
    return TextField(
      decoration: InputDecoration(labelText: 'Product Title'),
      onChanged: (String value) {
        setState(() {
          _product['title'] = value;
        });
      },
    );
  }

  Widget _buildPriceTextField() {
    return TextField(
      keyboardType: TextInputType.number,
      decoration: InputDecoration(labelText: 'Product Price'),
      onChanged: (String value) {
        setState(() {
          _product['price'] = double.parse(value);
        });
      },
    );
  }

  Widget _buildDescriptionTextField() {
    return TextField(
      maxLines: 5,
      decoration: InputDecoration(labelText: 'Product Description'),
      onChanged: (String value) {
        setState(() {
          _product['description'] = value;
        });
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final double deviceWidth =
        MediaQuery.of(context).size.width; // getting the device current width

    final double finalDeviceWidth =
        deviceWidth > 768.0 ? 450.0 : deviceWidth * 0.95;
    final double finalPadding = deviceWidth - finalDeviceWidth;

    return Container(
      margin: EdgeInsets.all(10.0),
      child: ListView(
        // listview items always take the full available space by default
        padding: EdgeInsets.symmetric(
          horizontal: finalPadding / 2,
        ), // adding padding restricts the listView from using full width
        children: <Widget>[
          _buildTitleTextField(),
          _buildDescriptionTextField(),
          _buildPriceTextField(),
          SizedBox(
            height: 10.0,
          ), // doesnot render anything just occupies space
//          RaisedButton(
//            child: Text('Save'),
//            textColor: Colors.white,
//            onPressed: () {
//              widget.addProduct(_product);
//              Navigator.pushReplacementNamed(context, '/products'); // pressing back button will not navigate here
//             },
//          ),
          Center(
            child: GestureDetector(
              onTap: (){
                widget.addProduct(_product);
              Navigator.pushReplacementNamed(context, '/products');
              },
              child: Container(
                color: Colors.green,
                padding: EdgeInsets.all(10.0),
                child: Text('Save'),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
