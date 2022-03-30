import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"

import { IDateProvider } from "@shared/providers/IDateProvider";

dayjs.extend(utc)

class DayjsDateProvider implements IDateProvider {
  dateFormatter(date: string): Date {
    return new Date(date)
  }
  
  currentDate(): Date {
    return dayjs().toDate()
  }

  compareDateInHours(start_date: Date, end_date: string): number {
    const end_date_formatted = this.dateFormatter(end_date)
    const end_date_utc = this.dateFormatterUTC(end_date_formatted)

    const start_date_utc = this.dateFormatterUTC(start_date)

    return dayjs(end_date_utc).diff(start_date_utc, "hours");
  }

  compareDateInDays(start_date: Date, end_date: Date): number {
    const end_date_utc = this.dateFormatterUTC(end_date)

    const start_date_utc = this.dateFormatterUTC(start_date)

    return dayjs(end_date_utc).diff(start_date_utc, "days");
  }

  dateFormatterUTC(date: Date): string {
    return dayjs(date).utc().local().format()
  }
}


export { DayjsDateProvider }