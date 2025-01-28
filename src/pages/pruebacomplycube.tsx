import React from 'react';
import { GetServerSideProps } from "next";
import { VerificationPage } from '@/Abstract/SDKCumplyCube/VerificationPage';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token, language } = context.query;

  // Si no está el param, rediriges a home ("/")
  if (!token || typeof token !== 'string') {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // Si sí existe, pasas el token como prop
  return {
    props: { token, language },
  };
};

interface PerfilProps {
  token: string;
  language: 'es' | 'en';
}

export default function Perfil({ token, language }: PerfilProps) {
  return (
    <>
      <VerificationPage token={token} language={language} />
    </>
  );
}
