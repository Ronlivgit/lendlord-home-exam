const USER_ROLES = {
  MANAGER: 'manager',
  WORKER: 'worker',
  DRIVER: 'driver'
}

function praseDate(dateStr) {
  const [day , month , year] = dateStr.split('.').map(Number)
  return new Date(year,month-1,day)
}

module.exports = { USER_ROLES , praseDate }
