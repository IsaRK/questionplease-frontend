import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { PulseLoader } from "react-spinners";
import { spinnerStyle } from "./styles";

interface ISpinnerProps {
  label: string;
  isLoading: boolean;
}

export const Spinner: React.FunctionComponent<ISpinnerProps> = (props) => {
  const isLoading = props.isLoading;

  if (isLoading) {
    return (
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Typography variant="h6">{props.label}</Typography>
        </Grid>

        <Grid item>
          <PulseLoader
            color={"black"}
            loading={props.isLoading}
            css={spinnerStyle}
            size={10}
          />
        </Grid>
      </Grid>
    );
  }

  return <div />;
};

export default Spinner;
