"use cliend";
import { useEffect, useState } from "react";
import { StatusDef } from "@/util/types";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { statusConvertToString, stringConvertToStatus } from "@/util/tools";

interface Props {
  initialStatus: StatusDef;
  onSelect: (newStatus: StatusDef) => void;
  index: number;
}

const Dropdown = ({ onSelect, initialStatus, index }: Props) => {
  const [status, setStatus] = useState(initialStatus);
  const labelId = `label-id-${index}`;
  const selectId = `select-id-${index}`;
  const lavelValue = "ステータス";

  useEffect(() => {
    setStatus(initialStatus);
  }, [initialStatus]);

  const handleChange = (event: SelectChangeEvent) => {
    const newStatus = stringConvertToStatus(event.target.value);

    setStatus(newStatus);
    onSelect(newStatus);
  };

  return (
    <FormControl className="w-32">
      <InputLabel id={labelId} />
      <Select
        sx={{ height: "40px" }}
        labelId={labelId}
        id={selectId}
        value={status.toString()}
        label={lavelValue}
        onChange={handleChange}
      >
        <MenuItem value={StatusDef.notStarted}>
          {statusConvertToString(StatusDef.notStarted)}
        </MenuItem>
        <MenuItem value={StatusDef.inProgress}>
          {statusConvertToString(StatusDef.inProgress)}
        </MenuItem>
        <MenuItem value={StatusDef.completed}>
          {statusConvertToString(StatusDef.completed)}
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default Dropdown;
