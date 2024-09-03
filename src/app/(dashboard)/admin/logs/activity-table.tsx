import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const ActivityTable = () => {
  return (
    <Table className="border-x border-border">
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Action</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(3)].map((_, index) => (
          <TableRow key={index}>
            <TableCell>User</TableCell>
            <TableCell>Action</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default ActivityTable
