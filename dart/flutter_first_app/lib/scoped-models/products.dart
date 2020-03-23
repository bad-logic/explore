import 'package:scoped_model/scoped_model.dart';
import './../models/product.dart';

class ProductsModel extends Model {
  // Model is provided by scoped-model package

  List<Product> _products = [];
  int _selectedProductIndex;

  // getter for _products, can be accessed as ProductModel.products
  // returning new copy of products lists instead of memory reference to _products
  // thus editing products would not edit _products because products is just new list containing copy of _products
  // thus products can be added only through the addProduct method
  List<Product> get products => List.from(_products);

  int get selectedProductIndex => _selectedProductIndex;

  void addProduct(Product product) {
    _products.add(product);
  }

  void updateProduct(Product product) {
    _products[_selectedProductIndex] = product;
    _selectedProductIndex = null; // unselecting the product after update
  }

  void deleteProduct() {
    _products.removeAt(_selectedProductIndex);
    _selectedProductIndex = null; // unselecting the product after delete
  }

  void selectProduct(int index) {
    _selectedProductIndex = index;
  }
}
