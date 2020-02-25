import 'package:flutter/material.dart';
import './pages/auth.dart';
import './pages/products_admin.dart';
import './pages/product.dart';
import './pages/products.dart';

void main() {
//  debugPaintSizeEnabled = true; // for debugging the user interface
//  debugPaintBaselinesEnabled = true; // shows green lines for text
//  debugPaintPointersEnabled = true; // indicates where tap event occurred
  runApp(MyApp());
}

class MyApp extends StatefulWidget {

  MyApp() {
    print("[MyApp] constructor()");
  }

  @override
  State<StatefulWidget> createState() {
    // TODO: implement createState
    return _MyAppState();
  }
}
class _MyAppState extends State<MyApp>{

  List <Map<String,String>> _products = [];

  void _addProduct(Map<String, String> product) {
    setState(() {
      _products.add(product);
    });
  }

  void _deleteProduct(int index) {
    setState(() {
      _products.removeAt(index);
    });
  }
  @override
  Widget build(BuildContext context) {
    // returns a widget
    print("[MyApp] build()");

    return MaterialApp(
//      debugShowMaterialGrid: true,//shows grid
      theme: ThemeData(
          brightness: Brightness.light,
          primarySwatch: Colors.deepOrange,
          accentColor: Colors.deepPurple),
//      home: AuthPage(),
      routes:{// global registry of routes
        '/':(BuildContext context) => ProductsPage(_products,_addProduct,_deleteProduct),
          'admin':(BuildContext context) => ProductsAdminPage(),
      },
      onGenerateRoute: (RouteSettings settings){// this code runs for unregistered routes
        final List<String> pathElements = settings.name.split('/');
        if(pathElements[0] == 'product'){
          final int index = int.parse(pathElements[1]);
          return MaterialPageRoute<bool>(
            builder: (BuildContext context) => ProductPage(
                _products[index]['image'], _products[index]['title']),
          );
        }
        return null;
      },
      onUnknownRoute: (RouteSettings settings){// will execute whenever onGenerateRoute fails to generate routes
          return MaterialPageRoute(
            builder:(BuildContext context) => ProductsPage(_products,_addProduct,_deleteProduct),
          );
      },
    );
  }
}
