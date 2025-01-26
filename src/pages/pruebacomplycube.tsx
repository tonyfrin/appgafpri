import React from 'react';
import { GetServerSideProps } from "next";
import { VerificationPage } from '@/Abstract/SDKCumplyCube/VerificationPage';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token } = context.query;

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
    props: { token },
  };
};

interface PerfilProps {
  token: string;
}

export default function Perfil({ token }: PerfilProps) {
  return (
    <>
      <VerificationPage token={token} />
    </>
  );
}
