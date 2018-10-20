using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;

namespace WebApi.Helpers
{
    public static class ExtCulture
    {
        /// <summary>
        /// 3 Digit long
        /// </summary>
        /// <param name="yourNumber"></param>
        /// <returns></returns>
        public static string To3String(this long yourNumber)
        {
            string s = "";
            s = String.Format("{0:n0}", yourNumber);
            return s;
        }
        /// <summary>
        /// 3 Digit int
        /// </summary>
        /// <param name="yourNumber"></param>
        /// <returns></returns>
        public static string To3String(this int yourNumber)
        {
            string s = "";
            s = String.Format("{0:n0}", yourNumber);
            return s;
        }

        public static string ToPersianDate(this DateTime dt2)
        {
            PersianCalendar pc = new PersianCalendar();
            return pc.GetYear(dt2).ToString() + "/" + pc.GetMonth(dt2).ToString() + "/" + pc.GetDayOfMonth(dt2).ToString();
        }
        public static long ToPersianDateLongNumber(this DateTime dt2)
        {
            PersianCalendar pc = new PersianCalendar();
            return long.Parse(pc.GetYear(dt2).ToString() + pc.GetMonth(dt2).ToString().PadLeft(2, '0') + pc.GetDayOfMonth(dt2).ToString().PadLeft(2, '0'));
        }


        public static string ToPersianDateFull(this DateTime dt2)
        {
            PersianCalendar pc = new PersianCalendar();
            return pc.GetYear(dt2).ToString() + "/" + pc.GetMonth(dt2).ToString() + "/" + pc.GetDayOfMonth(dt2).ToString() +
                "-" + dt2.Hour.ToString() + ":" + dt2.Minute.ToString();
        }
        public static DateTime PersianStringToEnDate(this string date, char splitter)
        {
            string[] splits = date.Split(splitter);
            int year = int.Parse(splits[0]);
            int month = int.Parse(splits[1]);
            int day = int.Parse(splits[2]);
            PersianCalendar pc = new PersianCalendar();


            return pc.ToDateTime(year,month, day, 0, 0, 0, 0);
        }

        public static string ToSplitDate(this string date)
        {
            return date.Substring(0, 4) + "/" + date.Substring(4, 2) + "/" + date.Substring(6, 2);
        }

        public static string SplitDate(this long dt)
        {

            string d = dt.ToString();
            return d.Substring(0, 4) + "/" + d.Substring(4, 2) + "/" + d.Substring(6, 2);

        }
        public static string SplitDateTime(this long dt)
        {

            string d = dt.ToString();
            return d.Substring(0, 4) + "/" + d.Substring(4, 2) + "/" + d.Substring(6, 2) + " " + d.Substring(8, 2) + ":" + d.Substring(10, 2);

        }
        public static string GetEnglishUnicode(string mobile)
        {
            string buffer = "";
            // 
            for (int i = 0; i < mobile.Length; i++)
            {
                string ch = mobile.Substring(i, 1);
                if (
                    ch == "0" ||
                    ch == "1" ||
                    ch == "2" ||
                    ch == "3" ||
                    ch == "4" ||
                    ch == "5" ||
                    ch == "6" ||
                    ch == "7" ||
                    ch == "8" ||
                    ch == "9"
                    )
                {
                    buffer += ch;
                }
                switch (ch)
                {
                    case "۰":
                        buffer += "0";
                        break;
                    case "۱":
                        buffer += "1";
                        break;
                    case "۲":
                        buffer += "2";
                        break;
                    case "۳":
                        buffer += "3";
                        break;
                    case "۴":
                        buffer += "4";
                        break;
                    case "۵":
                        buffer += "5";
                        break;
                    case "۶":
                        buffer += "6";
                        break;
                    case "۷":
                        buffer += "7";
                        break;
                    case "۸":
                        buffer += "8";
                        break;
                    case "۹":
                        buffer += "9";
                        break;
                }
            }

            return buffer;
        }

        private static List<DateTime> GetWeekDays()
        {
            var startDate = DateTime.Today;
            var endDate = startDate.AddDays(7);
            var numDays = (int)((endDate - startDate).TotalDays);
            List<DateTime> myDates = Enumerable
                       .Range(0, numDays)
                       .Select(x => startDate.AddDays(x))
                       .ToList();
            return myDates;
        }
    }
}
