import React from 'react';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  background-color: #6495ed;
  flex: 1;
`;

export const CustomButton = styled.TouchableOpacity`
  height: 60px;
  background-color: #4169e1;
  margin-top: 160px;
  border-radius: 200px;
  margin-left: 30px;
  margin-right: 30px;
  justify-content: center;
  align-items: center;
`;

export const CustomButtonText = styled.Text`
  font-size: 18px;
  color: #fff;
`;
