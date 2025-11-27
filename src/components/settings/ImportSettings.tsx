import { CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  Tooltip
} from "@chakra-ui/react";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { Form } from "react-router-dom";
import * as XLSX from "xlsx";




function ImportSettings() {
  const [excelFile, setExcelFile] = useState<null | ArrayBuffer>(null);
  const [excelData, setExcelData] = useState<any[]>([]);
  const [columns, setColumns] = useState<ColumnDef<any>[]>([]);
  const [typeError, setTypeError] = useState<string | null>(null)

  const Errors = [
    {
      Header: "VendorRef",
      Row: 1,
      Message: "VendorRef is not Found"
    },
    {
      Header: "FiscalBudgetID",
      Row: 2,
      Message: "FiscalBudgetID is not found"
    }
  ]


  const getErrorMessage = (row: any, column: any) => {
    const err = Errors.find(
      (e) =>
        e.Header === column.id &&
        e.Row === row.index + 1
    );
    return err ? err.Message : null;
  };  


  // --- Dynamic column generator with editable cells ---
  const generateColumns = (data: any[], setData: React.Dispatch<React.SetStateAction<any[]>>) => {
    if (!data?.length) return [];
    return Object.keys(data[0]).map((key) => ({
      header: key,
      accessorKey: key,
      cell: ({ getValue, row, column }) => {
      
      

        const onBlur = () => {
          setData((old) => {
            const newData = [...old];
            newData[row.index] = { ...newData[row.index], [column.id]: value };
            return newData;
          });
        };

        const errorMessage = getErrorMessage(row, column);
      
        return (
          <Tooltip
            label={errorMessage}
            isDisabled={!errorMessage}
            hasArrow
            placement="top"
            color={"red"}
          >
            <Input
              size="sm"
              value={value}
              border={errorMessage ? "2px solid red" : "2px solid gray"}
              onChange={(e) => setValue(e.target.value)}
              onBlur={onBlur}
              
            />
          </Tooltip>
        );
      },
    }));
  };



  console.log("exceldata", excelData)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    const fileTypesAllowed = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
      "application/vnd.ms-excel",
    ];

    if (selectedFile) {
      if (fileTypesAllowed.includes(selectedFile.type)) {
        setTypeError(null);
        const reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFile(e.target?.result as ArrayBuffer);
        };
      } else {
        setTypeError("Please select only Excel or CSV file types.");
        setExcelFile(null);
      }
    }
  };

  const handleFileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (excelFile) {
      const workBook = XLSX.read(excelFile, { type: "buffer" });
      const workSheetName = workBook.SheetNames[0];
      const workSheet = workBook.Sheets[workSheetName];
      const data = XLSX.utils.sheet_to_json(workSheet);
      setExcelData(data);
      setColumns(generateColumns(data, setExcelData));
    }
  };


  return (
    <Box>
      <Form onSubmit={handleFileSubmit}>
        <FormControl mb="40px">
          <Input
            type="file"
            id="file"
            value=""
            name="file"
            onChange={handleFileChange}
          />
          {excelFile && <IconButton icon={<CloseIcon />} onClick={() => {
            setExcelFile(null);
            setExcelData([]);
          }} aria-label={"close"} size={'xsm'} cursor={"pointer"} />}

        </FormControl>

        {typeError && <Box color="red.500">{typeError}</Box>}
        <Button
          variant="outline"
          size="lg"
          p="10px"
          fontSize="20px"
          borderRadius="md"
          type="submit"
        >
          Upload
        </Button>
      </Form>

      {excelData?.length > 0 ? (
        <Box mt={6}>
          <BasicTable data={excelData} columns={columns} />
          <Button
            mt={4}
            colorScheme="green"
            // onClick={handleSend}
          >
            Send to Backend
          </Button>
        </Box>
      ) : (
        <Box>No file uploaded yet</Box>
      )}
    </Box>
  );
}

export default ImportSettings;
