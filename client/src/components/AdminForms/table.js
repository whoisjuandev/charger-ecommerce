import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";


export default function NewTable({columns, data}) {
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col, index) => (<TableCell key={index}>{col}</TableCell>))}
          </TableRow>
        </TableHead>
    <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {row.map((col, index) => (
                <TableCell key={index}>{col}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
