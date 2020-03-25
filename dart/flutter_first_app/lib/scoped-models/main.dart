import 'package:scoped_model/scoped_model.dart';
import './products.dart';
import './user.dart';

// merging the both models (UserModel and ProductModel) into single MainModel
// all the properties and methods will be merged
class MainModel extends Model with UserModel, ProductsModel {}