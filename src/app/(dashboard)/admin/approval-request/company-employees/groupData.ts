const groupData = (data: any) => {
  const groupedData: any[] = []
  const batchIdMap: { [key: string]: any[] } = {}

  data.forEach((item: any) => {
    if (item.batch_id) {
      if (!batchIdMap[item.batch_id]) {
        batchIdMap[item.batch_id] = []
      }
      batchIdMap[item.batch_id].push(item)
    } else {
      groupedData.push(item)
    }
  })

  for (const batchId in batchIdMap) {
    if (batchIdMap[batchId].length > 1) {
      const firstItem = batchIdMap[batchId][0]
      groupedData.push({
        batch_id: batchId,
        items: batchIdMap[batchId],
        created_by: firstItem.created_by,
        account: firstItem.account,
        created_at: firstItem.created_at,
        operation_type: firstItem.operation_type,
        company_employee_id: firstItem.company_employee_id,
        first_name: '-',
        last_name: '-',
      })
    } else {
      groupedData.push(batchIdMap[batchId][0])
    }
  }

  return groupedData
}

export default groupData
