import React, { useState } from "react";

import Container from "components/Common/Container";

import PariticipantForm from "./Form/PariticipantForm";

const Participant = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      logger.info(firstName, lastName, email);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };
  return (
    <Container>
      <PariticipantForm
        setFirstName={setFirstName}
        setLastName={setLastName}
        setEmail={setEmail}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </Container>
  );
};

export default Participant;
