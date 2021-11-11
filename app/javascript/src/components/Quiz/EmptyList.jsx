import React from "react";

import { Typography } from "@bigbinary/neetoui/v2";

const EmptyList = ({ content }) => {
  return (
    <Typography
      lineHeight="normal"
      style="h1"
      weight="light"
      className="text-center mt-32 py-10 text-gray-600	"
    >
      {content}
    </Typography>
  );
};

export default EmptyList;
