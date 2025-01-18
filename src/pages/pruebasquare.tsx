import React from 'react';
import { PaymentPage } from '@/Abstract/SDKsquare/PaymentPage';
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { fromApp } = context.query;

  // Si no está el param o no es "true", rediriges a home ("/")
  if (fromApp !== "true") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // Si sí proviene de la app, dejas que renderice la página
  return {
    props: {},
  };
};


export default function Perfil() {
  return (
    <>
      <PaymentPage />
    </>
  );
}