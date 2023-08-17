import React, { Component } from 'react';
import { Oval } from 'react-loader-spinner';
import {LoaderContainer } from './Loader.styled';

const Loader = () => {
  return (
    <LoaderContainer>
      <Oval
        height={80}
        width={80}
        color="#4fa94d"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#4fa94d"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </LoaderContainer>
  );
};

export default Loader;
