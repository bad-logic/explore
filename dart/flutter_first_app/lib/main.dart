import 'package:flutter/material.dart';
import 'package:flutter_app1/scoped-models/products.dart';
//import 'package:flutter/rendering.dart';
import './pages/products_admin.dart';
import './pages/product.dart';
import './pages/products.dart';
import './pages/auth.dart';
import 'package:scoped_model/scoped_model.dart';

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

class _MyAppState extends State<MyApp> {

  @override
  Widget build(BuildContext context) {
    // returns a widget
    print("[MyApp] build()");
    return ScopedModel <ProductsModel> (
      model: ProductsModel(),// provide the instance of Products model for entire application
      // same instance of that scoped model must be used for the entire app because we work on the same lists
      // one instance is created while starting the app and that instance is passed down to the
      // materialApp and all its child widgets
      child: MaterialApp(
//      debugShowMaterialGrid: true,//shows grid
        theme: ThemeData(
          brightness: Brightness.light,
          primarySwatch: Colors.deepOrange,
          accentColor: Colors.deepPurple,
          buttonColor: Colors.deepPurple,
        ),
//      home: AuthPage(),
        routes: {
          // global registry of routes
          '/': (BuildContext context) => AuthPage(),
          '/products': (BuildContext context) => ProductsPage(),
          '/admin': (BuildContext context) => ProductsAdminPage(),
        },
        onGenerateRoute: (RouteSettings settings) {
          // this code runs for unregistered routes
          final List<String> pathElements = settings.name.split('/');
          if (pathElements[0] == 'product') {
            final int index = int.parse(pathElements[1]);
            return MaterialPageRoute<bool>(
              builder: (BuildContext context) => ProductPage(index),
            );
          }
          return null;
        },
        onUnknownRoute: (RouteSettings settings) {
          // will execute whenever onGenerateRoute fails to generate routes
          return MaterialPageRoute(
            builder: (BuildContext context) => ProductsPage(),
          );
        },
      ),
    );
  }

}
