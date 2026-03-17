import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  ColumnDef,
  SortingState,
  PaginationState,
} from '@tanstack/react-table';
import { useState, useMemo } from 'react';
import {
  Box,
  Table as ChakraTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  Text,
  HStack,
  Button,
  Select,
  Input,
  InputGroup,
  InputLeftElement,
  Flex,
  IconButton,
} from '@chakra-ui/react';
import { SearchIcon, ChevronLeftIcon, ChevronRightIcon, ArrowUpIcon, ArrowDownIcon } from '@chakra-ui/icons';

interface ReactTableProps<T> {
  columns: ColumnDef<T, any>[];
  data: T[];
  searchPlaceholder?: string;
  showSearch?: boolean;
  showPagination?: boolean;
  pageSizeOptions?: number[];
  initialPageSize?: number;
}

export function ReactTable<T extends object>({
  columns,
  data,
  searchPlaceholder = 'Search...',
  showSearch = true,
  showPagination = true,
  pageSizeOptions = [5, 10, 25, 50],
  initialPageSize = 10,
}: ReactTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: initialPageSize,
  });

  const table = useReactTable({
    columns,
    data,
    state: {
      sorting,
      globalFilter,
      pagination,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const pageIndices = useMemo(() => {
    const total = table.getPageCount();
    const current = table.getState().pagination.pageIndex;
    const pages: number[] = [];
    
    let start = Math.max(0, current - 2);
    let end = Math.min(total - 1, current + 2);
    
    if (current < 3) {
      end = Math.min(4, total - 1);
    }
    if (current > total - 3) {
      start = Math.max(0, total - 5);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }, [table.getPageCount(), table.getState().pagination.pageIndex]);

  return (
    <Box overflowX="auto">
      {showSearch && (
        <Flex mb={4} justify="flex-end">
          <InputGroup maxW="300px">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder={searchPlaceholder}
              value={globalFilter ?? ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
            />
          </InputGroup>
        </Flex>
      )}

      <ChakraTable variant="simple" size="md">
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th
                  key={header.id}
                  cursor={header.column.getCanSort() ? 'pointer' : 'default'}
                  onClick={header.column.getToggleSortingHandler()}
                  _hover={{ bg: 'gray.50' }}
                  transition="background 0.2s"
                >
                  <HStack spacing={1}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getCanSort() && (
                      <Box as="span" pl={1}>
                        {{
                          asc: <ArrowUpIcon boxSize={3} />,
                          desc: <ArrowDownIcon boxSize={3} />,
                        }[header.column.getIsSorted() as string] ?? null}
                      </Box>
                    )}
                  </HStack>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.length === 0 ? (
            <Tr>
              <Td colSpan={columns.length} textAlign="center" py={8}>
                <Text color="gray.500">No data available</Text>
              </Td>
            </Tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <Tr key={row.id} _hover={{ bg: 'gray.50' }}>
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))
          )}
        </Tbody>
      </ChakraTable>

      {showPagination && (
        <Flex mt={4} align="center" justify="space-between" wrap="wrap" gap={2}>
          <HStack spacing={2}>
            <Text fontSize="sm" color="gray.600">
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </Text>
            <Select
              size="sm"
              w="auto"
              value={table.getState().pagination.pageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size} per page
                </option>
              ))}
            </Select>
          </HStack>

          <HStack spacing={1}>
            <IconButton
              aria-label="Previous page"
              icon={<ChevronLeftIcon />}
              size="sm"
              onClick={() => table.previousPage()}
              isDisabled={!table.getCanPreviousPage()}
              variant="outline"
            />
            {pageIndices.map((pageIndex) => (
              <Button
                key={pageIndex}
                size="sm"
                variant={table.getState().pagination.pageIndex === pageIndex ? 'solid' : 'outline'}
                onClick={() => table.setPageIndex(pageIndex)}
              >
                {pageIndex + 1}
              </Button>
            ))}
            <IconButton
              aria-label="Next page"
              icon={<ChevronRightIcon />}
              size="sm"
              onClick={() => table.nextPage()}
              isDisabled={!table.getCanNextPage()}
              variant="outline"
            />
          </HStack>
        </Flex>
      )}
    </Box>
  );
}

export default ReactTable;
export type { ColumnDef };
