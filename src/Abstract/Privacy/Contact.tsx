import React from "react";

export const Contact: React.FC = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = "+18323145667";
    const url = `https://wa.me/${phoneNumber}`;
    window.open(url, "_blank");
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>{`Contáctanos`}</h1>
      <p>
        {`Si tienes alguna duda o necesitas asistencia, no dudes en ponerte en contacto con nosotros a través de los siguientes medios:`}
      </p>

      <ul style={{ lineHeight: "1.6" }}>
        <li>
          <strong>{`Correo electrónico:`}</strong>{" "}
          <a href="mailto:info@gafpristore.com" style={{ color: "#0070f3" }}>
            {`info@gafpristore.com`}
          </a>
        </li>
        <li>
          <strong>{`WhatsApp:`}</strong>{" "}
          <span onClick={handleWhatsAppClick} style={{ color: "#0070f3", cursor: "pointer" }}>
            {`+1 (832) 314-5667`}
          </span>
        </li>
      </ul>

      <p style={{ marginTop: "1.5rem" }}>
        {`Puedes contactarnos por correo electrónico para recibir respuestas a tus consultas o a través de WhatsApp para asistencia rápida.`}
      </p>

      <div
        style={{
          marginTop: "2rem",
          padding: "1.5rem",
          backgroundColor: "#f9f9f9",
          border: "1px solid #ddd",
        }}
      >
        <h2>{`Horario de atención`}</h2>
        <p>{`Lunes a Viernes: 9:00 AM - 6:00 PM`}</p>
        <p>{`Sábados: 10:00 AM - 2:00 PM`}</p>
        <p>{`Domingos y días festivos: Cerrado`}</p>
      </div>
    </div>
  );
};
