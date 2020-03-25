import 'package:scoped_model/scoped_model.dart';
import './connected_products.dart';


// merging the both models (UserModel and ProductModel) into single MainModel using mixins
// all the properties and methods will be merged
class MainModel extends Model with ConnectedProductsModel, UserModel, ProductsModel {}

