import 'package:scoped_model/scoped_model.dart';
import 'package:flutter/material.dart';
import './../models/user.dart';
import './../models/product.dart';

class  ConnectedProductsModel extends Model{
  // Model is provided by scoped-model package

  List<Product> _products = [];
  User _authenticatedUser;

  void addProduct(String title, double price, String description, String imageUrl) {
    final Product newProduct = Product(title: title,
        description: description,
        price: price,
        imageUrl: imageUrl,
        userEmail: _authenticatedUser.email,
        userId:_authenticatedUser.id );
    _products.add(newProduct);
    notifyListeners(); // even though after adding product we move to new page we motify just to be sure
    // not necessary to notify since we redirect to new page after adding product

  }

}

class ProductsModel extends ConnectedProductsModel {


  int _selectedProductIndex;
  bool _showFavourites = false;

  // getter for _products, can be accessed as ProductModel.products
  // returning new copy of products lists instead of memory reference to _products
  // thus editing products would not edit _products because products is just new list containing copy of _products
  // thus products can be added only through the addProduct method
  List<Product> get products { // us this to show list of products while editng
    List<Product> prodList = List.from(_products);
    return prodList;
  }

  List<Product> get displayProducts {
    List<Product> prodList = List.from(_products);
    if (_showFavourites) {
      prodList = prodList.where((element) => element.isFavourite).toList();
    }
    return prodList;
  }

  bool get enableFavorite => _showFavourites;

  int get selectedProductIndex => _selectedProductIndex;

  void toggleFavorite() {
    _showFavourites = !_showFavourites;
    notifyListeners();
  }


  void updateProduct(String title, double price, String description, String imageUrl) {
    final Product selectedProduct = _products[_selectedProductIndex];
    final Product newProduct = Product(title: title,
        description: description,
        price: price,
        imageUrl: imageUrl,
        userEmail:selectedProduct.userEmail ,
        userId:selectedProduct.userId,
        isFavourite:selectedProduct.isFavourite);
    _products[_selectedProductIndex] = newProduct;
    notifyListeners();
  }

  void toggleProductFavouriteStatus() {
    final Product selectedProduct = _products[_selectedProductIndex];
    final Product newProduct = Product(
        title: selectedProduct.title,
        price: selectedProduct.price,
        description: selectedProduct.description,
        imageUrl: selectedProduct.imageUrl,
        userEmail:selectedProduct.userEmail ,
        userId:selectedProduct.userId,
        isFavourite: !selectedProduct.isFavourite);
    _products[_selectedProductIndex] = newProduct;
    notifyListeners();
  }

  void deleteProduct() {
    _products.removeAt(_selectedProductIndex);
    notifyListeners();
  }

  void selectProduct(int index) {
    _selectedProductIndex = index;
    notifyListeners();
  }

  void unselectProduct(){
    _selectedProductIndex = null;
  }
}


class UserModel extends ConnectedProductsModel{

  void login({@required String email, @required String password}){
    _authenticatedUser =  User(id: 'dsfk76#',email: email,password: password);
  }


}