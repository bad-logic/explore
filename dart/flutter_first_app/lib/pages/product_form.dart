import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import './../widgets/helpers/ensure_visible.dart';
import './../models/product.dart';
import 'package:scoped_model/scoped_model.dart';
import './../scoped-models/products.dart';

class ProductFormPage extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return _ProductFormPageState();
  }
}

class _ProductFormPageState extends State<ProductFormPage> {
  final Map<String, dynamic> _product = {'imageUrl': 'assets/food.jpg'};
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  final titleFocusNode = FocusNode();
  final descriptionFocusNode = FocusNode();
  final priceFocusNode = FocusNode();

  Widget _buildTitleTextFormField({String title}) {
    return EnsureVisibleWhenFocused(
      focusNode: titleFocusNode,
      child: TextFormField(
        focusNode: titleFocusNode, // also tell we are using our own focusNode
        decoration: InputDecoration(labelText: 'Product Title'),
        initialValue: title == null ? '' : title,
        validator: (String value) {
          if (value.isEmpty || value.length < 5) {
            return 'Title is Required and contain at least five characters'; // error message
          }
          return null; // validation succeeded
        },
        onSaved: (String value) {
          // no need to call setState because we don't need to re-render the component
          _product['title'] = value;
        },
      ),
    );
  }

  Widget _buildPriceTextFormField({double price}) {
    return EnsureVisibleWhenFocused(
      focusNode: priceFocusNode,
      child: TextFormField(
        focusNode: priceFocusNode,
        keyboardType: TextInputType.number,
        decoration: InputDecoration(labelText: 'Product Price'),
        initialValue: price == null ? '' : price.toString(),
        validator: (String value) {
          if (value.isEmpty ||
              !RegExp(r'^(?:[1-9]\d*|0)?(?:[.,]\d+)?$').hasMatch(value)) {
            //also allows 9,99 numbers
            return 'Price is Required and must be a number'; // error message
          }
          return null; // validation succeeded
        },
        onSaved: (String value) {
          _product['price'] =
              double.parse(value.replaceFirst(RegExp(r','), '.'));
        },
      ),
    );
  }

  Widget _buildDescriptionTextFormField({String description}) {
    return EnsureVisibleWhenFocused(
      focusNode: descriptionFocusNode,
      child: TextFormField(
        maxLines: 5,
        focusNode: descriptionFocusNode,
        decoration: InputDecoration(labelText: 'Product Description'),
        initialValue: description == null ? '' : description,
        validator: (String value) {
          if (value.isEmpty || value.length < 5) {
            return 'Description is Required and contain at least five characters'; // error message
          }
          return null; // validation succeeded
        },
        onSaved: (String value) {
          _product['description'] = value;
        },
      ),
    );
  }

  void _formSubmit(Function saveProduct) {
    if (!_formKey.currentState.validate()) {
      //validator function runs at this point and then only shows error
      return; // in case of false donot run below code
    }
    _formKey.currentState
        .save(); // when we call the save method on the state returned by the global key,
    // the onSaved() methods are fired on each Form Fields
    saveProduct(Product(
        title: _product['title'],
        description: _product['description'],
        price: _product['price'],
        imageUrl: _product['imageUrl']));
    Navigator.pushReplacementNamed(
        context, // pressing back button will not navigate to this page
        '/products');
  }

  Widget _buildPageContent({Product product, Function saveProduct}) {
    final double deviceWidth =
        MediaQuery.of(context).size.width; // getting the device current width

    final double finalDeviceWidth =
        deviceWidth > 768.0 ? 450.0 : deviceWidth * 0.95;
    final double finalPadding = deviceWidth - finalDeviceWidth;

    return GestureDetector(
      onTap: () {
        FocusScope.of(context).requestFocus(FocusNode());
      },
      child: Container(
        margin: EdgeInsets.all(10.0),
        child: Form(
          key: _formKey,
          child: ListView(
            // listview items always take the full available space by default
            padding: EdgeInsets.symmetric(
              horizontal: finalPadding / 2,
            ),
            // adding padding restricts the listView from using full width
            children: <Widget>[
              _buildTitleTextFormField(
                  title: product == null ? null : product.title),
              _buildDescriptionTextFormField(
                  description: product == null ? null : product.description),
              _buildPriceTextFormField(
                  price: product == null ? null : product.price),
              SizedBox(
                height: 10.0,
              ), // doesnot render anything just occupies space
              RaisedButton(
                child: Text('Save'),
                textColor: Colors.white,
                onPressed: () {
                  _formSubmit(saveProduct);
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
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return ScopedModelDescendant<ProductsModel>(
      builder: (BuildContext context, Widget child, ProductsModel model) {
        int index = model.selectedProductIndex;
        return model.selectedProductIndex == null // case while adding product
            ? _buildPageContent(saveProduct: model.addProduct)
            : Scaffold(
                // for editing product we need to return scaffold because adding product is inside the tab that already
                // is inside page but while editing we push to the new page but that page won't have body only the form fields
                // which won't load because it has no body. so return it inside the scaffold. so we are just reusing the form part
                appBar: AppBar(
                  title: Text('Edit Product'),
                ),
                body: _buildPageContent(
                    saveProduct: model.updateProduct,
                    product: model.products[index]), // for editing product
              );
      },
    );
  }
}
