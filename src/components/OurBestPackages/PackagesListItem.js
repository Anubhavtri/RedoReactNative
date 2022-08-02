import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Screens, navigate } from '../../helpers/Screens';
import Actions from './BestPackageAction'
import { connect } from 'react-redux';

import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Pressable,
  ToastAndroid
} from 'react-native';
import Constants from '../../staticData/Constants';
import Configs from '../../Configs';
import DefaultPrimarySettings from '../../settings/styles/DefaultPrimarySettings';
import ShoppingCartWhite from '../../staticData/svg/shopping-cart_white.svg';
import ShoppingCartRed from '../../staticData/svg/shopping-cart_red.svg';

const PackageListItem = ({ item, index, setPackages, SelectedPackage, postPackageToCart, selectedPackageId, getCart,token }) => {
  

  return (
    <TouchableOpacity
      onPress={() => {
        navigate(Screens.PLAN_DETAIL, item);
      }}
      key={index}
      style={styles.item}>
      <View style={styles.heading}>
        <Text
          numberOfLines={2}
          style={[
            {
              fontSize: 14,
              color: DefaultPrimarySettings.textColor.tertiaryHeaderTextColor,
              maxWidth:'80%'
            },
            Constants.fontType.jBold,
          ]}>
          {item?.name}
        </Text>
        <TouchableOpacity onPress={() => {
            postPackageToCart(item.id,token),
            setTimeout(() => {
              getCart()
              ToastAndroid.show("Added to cart",ToastAndroid.SHORT);
            }, 700);

        }}>
          {selectedPackageId?.includes(item.id) ? <ShoppingCartRed /> : <ShoppingCartWhite />}
        </TouchableOpacity>
      </View>
      <View style={styles.separator} />
      <View style={styles.inclusions}>
        <Text
          style={[
            { color: '#707070', fontSize: 12, paddingBottom: 5 },
            Constants.fontType.jSemi_bold,
          ]}>
          Inclusion : {item?.parameter} Tests
        </Text>
        <Text
          numberOfLines={3}
          style={[
            { color: '#707070', fontSize: 12 },
            Constants.fontType.jRegular,
          ]}>
          {item?.description}
        </Text>
      </View>
      <View style={styles.separator} />
      <View style={styles.priceing}>
        <View style={styles.leftpriceing}>
          <Text
            style={[
              {
                fontSize: 12,
                color: '#E5184E',
                textDecorationLine: 'line-through',
              },
              Constants.fontType.jRegular,
            ]}>
            Rs{' '}
            {item?.package_city_prices
              ? item?.package_city_prices?.package_price
              : item?.package_price}
          </Text>
          <Text
            style={[
              {
                fontSize: 14,
                color: '#205072',
                marginLeft: '5%',
              },
              Constants.fontType.jSemi_bold,
            ]}>
            Rs{' '}
            {item?.package_city_prices
              ? item?.package_city_prices?.offer_price
              : item?.offer_price}
            /-
          </Text>
        </View>
        <View style={styles.rightpriceing}>
          <Text style={[styles.off, Constants.fontType.jMedium]}>
            Get{' '}
            {Math.floor(
              (((item.package_city_prices
                ? item.package_city_prices.package_price
                : item.package_price) -
                (item.package_city_prices
                  ? item.package_city_prices.offer_price
                  : item.offer_price)) /
                (item.package_city_prices
                  ? item.package_city_prices.package_price
                  : item.package_price)) *
              100,
            )}{' '}
            % OFF
          </Text>
          <Pressable
            onPress={() => {
              postPackageToCart(item.id,token),
              setTimeout(() => {
                getCart()
              }, 700);
              navigate(Screens.MY_CART, item);
            }}
            style={styles.button}>
            <Text style={[styles.booktext, Constants.fontType.jSemi_bold]}>
              BOOK
            </Text>
          </Pressable>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    
  },
  item: {
    borderWidth: 0.5,
    backgroundColor: 'white',
    borderColor: '#A2A2A2',
    marginVertical: 15,
    width: Configs.phoneWidth - 40,
    height: 200,
    borderRadius: 5,
  },
  title: {
    fontSize: 32,
  },
  heading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 5,
    marginHorizontal: 16,
  },
  priceing: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    alignItems: 'center',
  },
  inclusions: {
    height: 100,
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 8,
    marginHorizontal: 16,
  },
  leftpriceing: {
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  rightpriceing: {
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-evenly',
    minHeight: 30,
    alignItems: 'center',
  },
  off: {
    fontSize: 10,
    color: '#FFFFFF',
    backgroundColor: '#47CACC',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#E5184E',
    minHeight: 30,
    justifyContent: 'center',
    borderRadius: 5,
  },
  booktext: {
    color: '#FBFBFB',
    fontSize: 14,
    paddingHorizontal: 15,
  },
  separator: {
    backgroundColor: '#A2A2A2',
    height: 0.5,
  },
});


const mapStateToProps = state => ({

  token: state.user?.userData?.token,
  PackageCart : state?.packageData?.cartpackages

});

const mapDispatchToProps = dispatch => {
  return {
    setPackages: (item) => {
      dispatch(
        Actions.setPackages(item),
      );
    },
    postPackageToCart: (packageId, token) => {
      dispatch(Actions.postPackageToCart(packageId, token))
    }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(PackageListItem);
