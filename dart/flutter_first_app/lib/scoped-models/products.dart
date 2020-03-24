import 'package:scoped_model/scoped_model.dart';
import './../models/product.dart';

class ProductsModel extends Model {
  // Model is provided by scoped-model package

  List<Product> _products = [];
  int _selectedProductIndex;
  bool _showFavourites = false;

  // getter for _products, can be accessed as ProductModel.products
  // returning new copy of products lists instead of memory reference to _products
  // thus editing products would not edit _products because products is just new list containing copy of _products
  // thus products can be added only through the addProduct method
  List<Product> get products { // us this to show list of products while editng
    List<Product> products = List.from(_products);
    return products;
  }

  List<Product> get displayProducts {
    List<Product> products = List.from(_products);
    if (_showFavourites) {
      products = products.where((element) => element.isFavourite).toList();
    }
    return products;
  }

  bool get enableFavorite => _showFavourites;

  int get selectedProductIndex => _selectedProductIndex;

  void toggleFavorite() {
    _showFavourites = !_showFavourites;
    notifyListeners();
  }

  void addProduct(Product product) {
    _products.add(product);
    notifyListeners(); // even though after adding product we move to new page we motify just to be sure
    // not necessary to notify since we redirect to new page after adding product
  }

  void updateProduct(Product product) {
    _products[_selectedProductIndex] = product;
    _selectedProductIndex = null; // unselecting the product after update
    notifyListeners();
  }

  void toggleProductFavouriteStatus() {
    Product selectedProduct = _products[_selectedProductIndex];
    final Product newProduct = Product(
        title: selectedProduct.title,
        price: selectedProduct.price,
        description: selectedProduct.description,
        imageUrl: selectedProduct.imageUrl,
        isFavourite: !selectedProduct.isFavourite);
    updateProduct(newProduct);
    // notify scoped model for change of data and it updates the view in real time
    // runs builder method for only widgets that are wrapped with ScopedModelDescendant
    notifyListeners(); // call if the change is happening in the same page and it must be reflected in real time
  }

  void deleteProduct() {
    _products.removeAt(_selectedProductIndex);
    _selectedProductIndex = null; // unselecting the product after delete
    notifyListeners();
  }

  void selectProduct(int index) {
    _selectedProductIndex = index;
    notifyListeners();
  }
}
