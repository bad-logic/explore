import 'package:flutter/material.dart';

class Product {
  final String title, description, imageUrl;
  final double price;
  final bool isFavourite;

  Product(
      {@required this.title,
      @required this.description,
      @required this.price,
      @required this.imageUrl,
      this.isFavourite = false});
}
