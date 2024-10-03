import React from "react";

export const DeleteAccount: React.FC = () => {
  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>{`¿Cómo eliminar tu cuenta?`}</h1>
      <p>
        {`Si deseas eliminar tu cuenta y todos los datos asociados, sigue los pasos a continuación dentro de la aplicación:`}
      </p>

      <ol style={{ lineHeight: "1.6" }}>
        <li>{`Abre la aplicación e inicia sesión con tu cuenta.`}</li>
        <li>
          {`Ve a la sección `}
          <strong>{`"Perfil"`}</strong>
          {`, ubicada en la esquina inferior derecha de la pantalla.`}
        </li>
        <li>
          {`Selecciona `}
          <strong>{`"Configuración"`}</strong>.
        </li>
        <li>
          {`Desplázate hacia abajo y encontrarás la opción `}
          <strong>{`"Eliminar mi cuenta"`}</strong>.
        </li>
        <li>
          {`Confirma que deseas eliminar tu cuenta. Recuerda que este proceso es irreversible y todos tus datos se eliminarán permanentemente.`}
        </li>
      </ol>

      <p style={{ marginTop: "1.5rem" }}>
        {`Si tienes alguna pregunta o encuentras dificultades, por favor contáctanos a través de nuestro `}
        <a href="/contact" style={{ color: "#0070f3" }}>
          {`formulario de contacto`}
        </a>
        {`.`}
      </p>

      <div
        style={{
          marginTop: "2rem",
          padding: "1.5rem",
          backgroundColor: "#f9f9f9",
          border: "1px solid #ddd",
        }}
      >
        <h2>{`Preguntas frecuentes`}</h2>
        <p>
          <strong>{`¿Qué sucede después de eliminar mi cuenta?`}</strong>
        </p>
        <p>
          {`Al eliminar tu cuenta, se eliminarán permanentemente todos tus datos almacenados, incluidos tus preferencias,
          historial y cualquier otra información relacionada con tu cuenta. Este proceso es irreversible, por lo que si decides
          volver a usar la aplicación, tendrás que crear una nueva cuenta desde cero.`}
        </p>

        <p>
          <strong>{`¿Cuánto tiempo toma eliminar mi cuenta?`}</strong>
        </p>
        <p>
          {`El proceso de eliminación de tu cuenta es instantáneo, pero algunos datos pueden tardar hasta 30 días en ser eliminados completamente de nuestros sistemas.`}
        </p>
      </div>
    </div>
  );
};