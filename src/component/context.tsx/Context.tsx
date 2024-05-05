import React, {useContext, useState} from 'react';
import {createContext} from 'react';
// import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';

const CreateContex = createContext({});

const GlobelContex = (props: any) => {
  const [addToCartState, setAddToCartState] = useState<any>(0);

  const isAdd_To_Cart_State = (item: any) => {
    setAddToCartState(item);
  };

  //   const doLogOut = () => {
  //     AsyncStorage.clear()
  //     navigation.reset({
  //       index:0,
  //       routes: [
  //         {
  //           name: 'sign-in',
  //         },
  //       ],
  //     })
  //   };
  return (
    <CreateContex.Provider
      value={{
        isAdd_To_Cart_State,
        addToCartState,
      }}>
      {props.children}
    </CreateContex.Provider>
  );
};

const useGlobalContext = () => {
  const val = useContext(CreateContex);
  if (!val) {
    throw Error('Please use within context provider!');
  }
  return val;
};
export {GlobelContex, useGlobalContext};
