import { format } from 'date-fns'
import { Data } from 'react-spreadsheet-import/types/types'

const parseRow = (data: Data<any>) => {
  // Parse full name
  // Split into first and last name
  if (
    typeof data.full_name === 'string' &&
    data.full_name.includes(' ') &&
    data.full_name.includes(',')
  ) {
    return {
      ...data,
      first_name: data.full_name.split(',')[1],
      last_name: data.full_name.split(',')[0],
    }
  }

  // Parse birth date

  return {
    ...data,
  }
}

export default parseRow
