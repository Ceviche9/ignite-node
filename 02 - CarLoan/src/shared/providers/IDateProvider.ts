interface IDateProvider {
  compareDateInHours(start_date: Date, end_date: string): number
  compareDateInDays(start_date: Date, end_date: Date): number
  dateFormatter(date: string): Date 
  dateFormatterUTC(date: Date): string
  currentDate(): Date
}

export { IDateProvider }