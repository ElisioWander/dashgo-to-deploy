import { Box, Button, Stack, Text } from "@chakra-ui/react";
import { PaginationItem } from "./PaginationItem";

interface PaginationProps {
  totalCountOfRegisters: number;
  registersPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

const siblingsCount = 1

//pegar as páginas que estão ao centro
//ex: página 1 a 5, pegue a 2 3 4
function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from )]
      .map((_, index) => {
        return from + index + 1
      })
      .filter(page => page > 0)
}

export function Pagination({
  totalCountOfRegisters,
  registersPerPage = 10,
  currentPage = 1,
  onPageChange
}: PaginationProps) {
  
  //Saber qual é a última página
  //dividir o total de registros pelo número de registros por página, dessa forma
  //da para saber quantas páginas irão ter, ou seja, da para saber qual será a última página
  //Math.floor é para arredondar para baixo caso venha um número quebrado
  const lastPage = Math.ceil(totalCountOfRegisters / registersPerPage)

  //pegar a página anterior se ela existir, ou seja, se for maior que 1
  const previousPage = currentPage > 1
    ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
    : []

  //pegar a pŕoxima página, caso exeista uma última página
  //se página atual for menor que a última página, então existe uma próxima página
  const nextPage = currentPage < lastPage
    ? generatePagesArray(currentPage , Math.min(currentPage + siblingsCount, lastPage))
    : []

  return (
    <Stack 
      direction={["column", "row"]}
      spacing="6"
      mt="8"
      justify="space-between"
      align="center"
    >

    <Box>
      <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
    </Box>

    <Stack direction="row" spacing="2" >
      {currentPage > (1 + siblingsCount) && (
        <>
          <PaginationItem onPageChange={onPageChange} number={1} />
          {currentPage > (2 + siblingsCount) && (
            <Text color="gray.3000" w="8" textAlign="center" >...</Text>
          )}
        </>
      )}

      {/* Se existir página anterior, então percorra estas páginas, pegue a página e renderize o componente */}
      { previousPage.length > 0 && previousPage.map(page => {
        return <PaginationItem onPageChange={onPageChange} key={page} number={page} />
      }) }

      <PaginationItem onPageChange={onPageChange} number={currentPage} isCurrent />

      {/* Se existir uma pŕoxima página, então percorra estas páginas, pegue a página e renderize o componente */}
      {nextPage.length > 0 && nextPage.map(page => {
        return <PaginationItem onPageChange={onPageChange} key={page} number={page} />
      })}

      {(currentPage + siblingsCount) < lastPage && (
        <>
          {(currentPage + 1 + siblingsCount) < lastPage && (
            <Text color="gray.3000" w="8" textAlign="center" >...</Text>
          )}
          <PaginationItem onPageChange={onPageChange} number={1} />
        </>
      )}
    </Stack>
    </Stack>
  )
}