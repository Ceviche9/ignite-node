interface IDateProvider {
  compareDateInHours(start_date: Date, end_date: Date): number
  compareDateInDays(start_date: Date, end_date: Date): number
  dateFormatter(date: Date): string
  currentDate(): Date
}

export { IDateProvider }