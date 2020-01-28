import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: "100%"
  },
  container: {
    maxHeight: 200
  }
});

function StickyHeadTable(props) {
  const classes = useStyles();
  console.log(props);
  return (
    <>
        <h3 className="title">{props.title}</h3>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>0</TableCell>
                <TableCell>1</TableCell>
                <TableCell>2</TableCell>
                <TableCell>3</TableCell>
                <TableCell>4</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>0</TableCell>
                <TableCell>1</TableCell>
                <TableCell>2</TableCell>
                <TableCell>3</TableCell>
                <TableCell>4</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>0</TableCell>
                <TableCell>1</TableCell>
                <TableCell>2</TableCell>
                <TableCell>3</TableCell>
                <TableCell>4</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>0</TableCell>
                <TableCell>1</TableCell>
                <TableCell>2</TableCell>
                <TableCell>3</TableCell>
                <TableCell>4</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>0</TableCell>
                <TableCell>1</TableCell>
                <TableCell>2</TableCell>
                <TableCell>3</TableCell>
                <TableCell>4</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>0</TableCell>
                <TableCell>1</TableCell>
                <TableCell>2</TableCell>
                <TableCell>3</TableCell>
                <TableCell>4</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>0</TableCell>
                <TableCell>1</TableCell>
                <TableCell>
                  <TableRow>
                    <TableCell>0</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>4</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>0</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>4</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>0</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>4</TableCell>
                  </TableRow>
                </TableCell>
                <TableCell>3</TableCell>
                <TableCell>4</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>0</TableCell>
                <TableCell>1</TableCell>
                <TableCell>2</TableCell>
                <TableCell>3</TableCell>
                <TableCell>4</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>0</TableCell>
                <TableCell>1</TableCell>
                <TableCell>2</TableCell>
                <TableCell>3</TableCell>
                <TableCell>4</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>0</TableCell>
                <TableCell>1</TableCell>
                <TableCell>2</TableCell>
                <TableCell>3</TableCell>
                <TableCell>4</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>0</TableCell>
                <TableCell>1</TableCell>
                <TableCell>2</TableCell>
                <TableCell>3</TableCell>
                <TableCell>4</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>0</TableCell>
                <TableCell>1</TableCell>
                <TableCell>2</TableCell>
                <TableCell>3</TableCell>
                <TableCell>4</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>0</TableCell>
                <TableCell>1</TableCell>
                <TableCell>2</TableCell>
                <TableCell>3</TableCell>
                <TableCell>4</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>0</TableCell>
                <TableCell>1</TableCell>
                <TableCell>2</TableCell>
                <TableCell>3</TableCell>
                <TableCell>4</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>0</TableCell>
                <TableCell>1</TableCell>
                <TableCell>2</TableCell>
                <TableCell>3</TableCell>
                <TableCell>4</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination></TablePagination>
    </>
  );
}

export default StickyHeadTable;
