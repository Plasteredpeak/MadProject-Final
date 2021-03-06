import React, {useState, useEffect} from 'react';
import Typography from '../DesignSystem/Typography';
import {Colors} from '../DesignSystem/AppColors';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import Heading from '../Components/Heading';
import DropDown from '../assets/Icons/DropDown.svg';
import AnalyticsUp from '../assets/Icons/AnalyticsUp';
import AnalyticsDown from '../assets/Icons/AnalyticsDown';

import Options from '../assets/Icons/Options';

import Modal from 'react-native-modal';

import BottomModalOptions from '../Components/BottomModalOptions';

import TransactionCart from '../Components/TransactionCart';

const FinanceScreen = props => {
  const [visible, setVisible] = useState(false);
  const [transactionArray, setTransactionArray] = useState([]);
  let transactions = [];

  const renderItem = ({item}) => {
    return (
      <TransactionCart
        amount={item.amount}
        img={item.img}
        name={item.name}
        date={item.date}></TransactionCart>
    );
  };

  const getTrasactions = async () => {
    transactions = [];
    try {
      const response = await fetch(
        'https://raw.githubusercontent.com/MohammadHarisZia/MadProject/main/transactions.json',
      );
      const json = await response.json();

      Object.values(json.transactions).forEach(value => {
        transactions.push(value);
      });

      setTransactionArray(transactions);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTrasactions();
  }, []);

  return (
    <View>
      <Heading
        title="Finance"
        navigation={props.navigation}
        navigate="TextColors2"
        route={props.route}></Heading>
      <Text
        style={[
          Typography.Header_22pt,
          {color: Colors.MonochromeGreen1000, marginLeft: 40},
        ]}>
        Good Afternoon,
      </Text>
      <Text
        style={[
          Typography.Text_16pt,
          {color: Colors.MonochromeGreen1000, marginLeft: 40},
        ]}>
        Dr Drake Ramoray
      </Text>
      <View
        style={[
          {
            borderWidth: 1,
            borderRadius: 20,
            marginTop: 20,
            width: 350,
            height: 200,
            marginLeft: 20,
          },
        ]}>
        <TouchableOpacity>
          <Options
            width={50}
            height={50}
            fill={Colors.MonochromeBlue1000}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              marginRight: 20,
              marginTop: 20,
            }}
            onPress={() => setVisible(true)}></Options>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 35,
          }}>
          <Text
            style={[
              Typography.Header_14pt,
              {color: Colors.MonochromeGreen1000, marginLeft: 30},
            ]}>
            Total Balance
          </Text>
          <DropDown
            width={25}
            height={25}
            fill={Colors.MonochromeBlue1000}
            style={{marginRight: 15}}></DropDown>
        </View>

        <Text
          style={[
            Typography.Header_24pt,
            {color: Colors.MonochromeGreen1000, marginLeft: 35},
          ]}>
          PKR 252,365
        </Text>

        <View
          style={[
            styles.flex,
            {marginHorizontal: 5, marginVertical: 20, width: 320},
          ]}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={[
                  Typography.Text_14pt,
                  {color: Colors.MonochromeGreen1000, marginLeft: 35},
                ]}>
                Earned in July
              </Text>
              <AnalyticsUp
                width={20}
                height={20}
                fill={Colors.MonochromeBlue1000}
                style={{marginLeft: 5}}></AnalyticsUp>
            </View>
            <Text
              style={[
                Typography.Header_18pt,
                {color: Colors.MonochromeGreen1000, marginLeft: 35},
              ]}>
              PKR 52,365
            </Text>
          </View>

          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={[
                  Typography.Text_14pt,
                  {color: Colors.MonochromeGreen1000, marginLeft: 35},
                ]}>
                Average Earnings
              </Text>
              <AnalyticsDown
                width={20}
                height={20}
                fill={Colors.MonochromeBlue1000}
                style={{marginLeft: 5}}></AnalyticsDown>
            </View>
            <Text
              style={[
                Typography.Header_18pt,
                {color: Colors.MonochromeGreen1000, marginLeft: 35},
              ]}>
              PKR 126,765
            </Text>
          </View>
        </View>
      </View>

      <View
        style={[
          styles.flex,
          {marginLeft: 30, marginTop: 20, width: 330, alignItems: 'center'},
        ]}>
        <Text
          style={[Typography.Header_18pt, {color: Colors.MonochromeGreen1000}]}>
          Transaction History
        </Text>

        <TouchableOpacity>
          <Text
            style={[Typography.Text_14pt, {color: Colors.MonochromeGreen1000}]}>
            See All
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        style={{height: "50%"}}
        data={transactionArray}
        renderItem={renderItem}
      />

      <Modal
        isVisible={visible}
        onBackdropPress={() => {
          setVisible(false);
        }}
        style={{margin: 0, justifyContent: 'flex-end'}}>
        <View
          style={{
            height: 150,
            backgroundColor: 'white',
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
          }}>
          <BottomModalOptions
            title="Wallet Management"
            onPress={() => {
              props.navigation.navigate('WalletManagement');
            }}
          />
          <BottomModalOptions title="View Analytics" onPress={() => {}} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default FinanceScreen;
