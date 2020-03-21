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
  final GlobalKey <FormState> _formKey = GlobalKey<FormState>();

  Widget _buildTitleTextFormField() {
    return TextFormField(
      decoration: InputDecoration(labelText: 'Product Title'),
      validator: (String value){
        if(value.isEmpty || value.length<5){
            return 'Title is Required and contain at least five characters'; // error message
        }
        return null; // validation succeeded
      },
      onSaved: (String value) {
        setState(() {
          _product['title'] = value;
        });
      },
    );
  }

  Widget _buildPriceTextFormField() {
    return TextFormField(
      keyboardType: TextInputType.number,
      decoration: InputDecoration(labelText: 'Product Price'),
      validator: (String value){
        
        if( value.isEmpty || !RegExp(r'^(?:[1-9]\d*|0)?(?:[.,]\d+)?$').hasMatch(value)){ //also allows 9,99 numbers
          return 'Price is Required and must be a number'; // error message
        }
        return null; // validation succeeded
      },
      onSaved: (String value) {
        setState(() {
          _product['price'] = double.parse(value.replaceFirst(RegExp(r','),'.'));
        });
      },
    );
  }

  Widget _buildDescriptionTextFormField() {
    return TextFormField(
      maxLines: 5,
      decoration: InputDecoration(labelText: 'Product Description'),
      validator: (String value){
        if(value.isEmpty || value.length < 5){
          return 'Description is Required and contain at least five characters'; // error message
        }
        return null; // validation succeeded
      },
      onSaved: (String value) {
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

    final double finalDeviceWidth = deviceWidth > 768.0 ? 450.0 : deviceWidth * 0.95;
    final double finalPadding = deviceWidth - finalDeviceWidth;

    return Container(
      margin: EdgeInsets.all(10.0),
      child: Form(
        key: _formKey,
        child: ListView(
          // listview items always take the full available space by default
          padding: EdgeInsets.symmetric(
            horizontal: finalPadding / 2,
          ), // adding padding restricts the listView from using full width
          children: <Widget>[
            _buildTitleTextFormField(),
            _buildDescriptionTextFormField(),
            _buildPriceTextFormField(),
            SizedBox(
              height: 10.0,
            ), // doesnot render anything just occupies space
            RaisedButton(
              child: Text('Save'),
              textColor: Colors.white,
              onPressed: () {
                if(!_formKey.currentState.validate()){ //validator function runs at this point and then only shows error
                  return; // in case of false donot run below code
                }
                _formKey.currentState.save(); // when we call the save method on the state returned by the global key,
                // the onSaved() methods are fired on each Form Fields
                widget.addProduct(_product);
                Navigator.pushReplacementNamed(context,'/products'); // pressing back button will not navigate here
              },
            ),
//          Center(
//            child: GestureDetector(
//              onTap: (){
//                widget.addProduct(_product);
//              Navigator.pushReplacementNamed(context, '/products');
//              },
//              child: Container(
//                color: Colors.green,
//                padding: EdgeInsets.all(10.0),
//                child: Text('Save'),
//              ),
//            ),
//          ),
          ],
        ),
      ),
    );
  }
}
