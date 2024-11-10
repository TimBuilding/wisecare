import { format } from 'date-fns'
import { RawData } from 'react-spreadsheet-import/types/types'

const parseDate = (data: RawData[]): Promise<RawData[]> => {
  return new Promise((resolve) => {
    const formattedData = data.map((row) => {
      return row.map((cell) => {
        if (
          typeof cell === 'string' &&
          !/\d{1,2}\/\d{1,2}\/\d{4} to \d{1,2}\/\d{1,2}\/\d{4}/.test(cell) &&
          (/\d{1,2}\/\d{1,2}\/\d{4}/.test(cell) ||
            /\d{1,2} \w{3} \d{4}/.test(cell) ||
            /\d{1}\/\d{2}\/\d{4}/.test(cell))
        ) {
          return format(new Date(cell), 'MM/dd/yyyy')
        }
        return cell
      })
    })

    resolve(formattedData)
  })
}

export default parseDate
