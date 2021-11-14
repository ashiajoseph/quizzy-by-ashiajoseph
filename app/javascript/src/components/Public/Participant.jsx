import React, { useState, useEffect } from "react";

import { PageLoader } from "@bigbinary/neetoui/v2";
import Error from "images/error.png";
import { useParams, useHistory } from "react-router-dom";

import quizzesApi from "apis/quizzes";

const Participant = () => {
  const [loading, setLoading] = useState(true);
  const [quizId, setQuizId] = useState(null);
  const { slug } = useParams();
  const history = useHistory();
  const checkSlugPresence = async () => {
    try {
      const response = await quizzesApi.check_slug(slug);
      const data = response.data;
      setQuizId(data.id);
      setLoading(false);
      if (data.id) history.push(`/public/${slug}/new/attempts`);
    } catch (error) {
      logger.error(error);
    }
  };
  useEffect(() => {
    checkSlugPresence();
  }, []);

  if (loading) {
    return (
      <div className="py-10 mt-4">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="h-screen flex items-center justify-center">
      {!quizId && (
        <div>
          <img src={Error} className="mx-auto" />
          <h2 className="text-center font-mono text-4xl mt-3">
            {" "}
            Quiz Not Found
          </h2>
        </div>
      )}
    </div>
  );
};

export default Participant;
