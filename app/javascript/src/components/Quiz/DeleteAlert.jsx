import React from "react";

import { Alert } from "@bigbinary/neetoui/v2";

const DeleteAlert = ({
  quizid,
  title,
  showAlert,
  setShowAlert,
  deleteQuiz,
}) => {
  return (
    <Alert
      isOpen={showAlert}
      message={`Are you sure you want to delete ${title} Quiz ? All the related data will be lost.`}
      onClose={() => setShowAlert(false)}
      onSubmit={() => deleteQuiz(quizid)}
      title="Deletion Alert"
    />
  );
};

export default DeleteAlert;
