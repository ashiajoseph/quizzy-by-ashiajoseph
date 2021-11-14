import React, { useState } from "react";

import { useParams } from "react-router-dom";

import Container from "components/Common/Container";

import PariticipantForm from "./Form/PariticipantForm";

const Participant = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { slug } = useParams();

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

  const array = slug.split("-");
  const heading =
    array[array.length - 1] == "quiz"
      ? array.join(" ")
      : array.slice(0, -1).join(" ");

  return (
    <Container>
      <PariticipantForm
        heading={heading}
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
