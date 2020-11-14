import 'dart:convert';

import 'package:built_collection/built_collection.dart';
import 'package:built_value/built_value.dart';
import 'package:built_value/serializer.dart';

import 'serializers.dart';

part 'user.g.dart';

abstract class User implements Built<User, UserBuilder> {

  @BuiltValueField(wireName: 'id')
  String get id;

  String get name;
  
  BuiltList<String> get channels;

  // ignore: sort_constructors_first
  User._();

  factory User([void Function(UserBuilder) updates]) = _$User;

  String toJson() {
    return json.encode(toMap());
  }

  // ignore: always_specify_types
  Map toMap() {
    return standardSerializers.serializeWith(User.serializer, this);
  }

  User fromJson(String jsonString) {
    return fromMap(json.decode(jsonString));
  }

  static User fromMap(Map jsonMap) {
    return standardSerializers.deserializeWith(User.serializer, jsonMap);
  }

  static Serializer<User> get serializer => _$userSerializer;
}


