import React from "react";
import { Typography } from "@mui/material";

import { JournalLayout } from "../layout/JournalLayout";

export const JournalPage: React.FC = () => {
  return (
    <JournalLayout>
      <Typography>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. A vitae sint
        omnis soluta necessitatibus blanditiis autem sit beatae dicta nihil id
        fugit non suscipit quo architecto, qui odit similique ut.
      </Typography>

      {/* NothingSelected */}
    </JournalLayout>
  );
};
