import { GetFormWithSubmissions } from "@/actions/Form";
import React, { ReactNode } from "react";
import { ElementsType, FormElementInstance } from "./FormElements";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { format, formatDistance } from "date-fns";
import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";

const SubmissionsTable = async ({ id }: { id: number }) => {
  const form = await GetFormWithSubmissions(id);
  if (!form) {
    throw new Error("FormNot Found");
  }

  type Row = { [key: string]: string } & {
    submittedAt: Date;
  };
  const formElement = JSON.parse(form.content) as FormElementInstance[];
  const columns: {
    id: string;
    label: string;
    required: boolean;
    type: ElementsType;
  }[] = [];

  const rows: Row[] = [];
  form.FormSubmission.forEach((submission) => {
    const content = JSON.parse(submission.content);
    rows.push({
      ...content,
      submittedAt: submission.createdAt,
    });
  });

  formElement.forEach((element) => {
    switch (element.type) {
      case "TextField":
      case "CheckboxField":
      case "DateField":
      case "NumberField":
      case "SelectField":
      case "TextAreaField":
        columns.push({
          id: element.id,
          label: element.extraAttributes?.label,
          required: element.extraAttributes?.required,
          type: element.type,
        });
        break;

      default:
        break;
    }
  });
  return (
    <div className="w-full py-2 flex flex-col">
      <h1 className="text-2xl font-bold my-4">Submissions</h1>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => {
                return (
                  <TableHead className="uppercase" key={column.id}>
                    {column.label}
                  </TableHead>
                );
              })}
              <TableHead className="uppercase  text-muted-foreground text-right">
                Submitted at
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, i) => {
              return (
                <TableRow key={i}>
                  {columns.map((col, i) => {
                    return (
                      <RowCell key={i} type={col.type} value={row[col.id]} />
                    );
                  })}
                  <TableCell className="text-muted-foreground text-right">
                    {formatDistance(row.submittedAt, new Date(), {
                      addSuffix: true,
                    })}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

function RowCell({ type, value }: { type: ElementsType; value: string }) {
  let node: ReactNode = value;
  switch (type) {
    case "DateField":
      if (!value) {
        break;
      }
      const date = new Date(value);
      node = <Badge variant={"outline"}>{format(date, "dd/MM/yyyy")}</Badge>;
      break;
    case "CheckboxField":
        const checked=value==="true"

        node = <Checkbox checked={checked} disabled/>;
        break;

    default:
      break;
  }
  return <TableCell>{node}</TableCell>;
}

export default SubmissionsTable;
