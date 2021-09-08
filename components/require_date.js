export default function GetTime(a) {
    switch (a) {
        case 1:
            var date = new Date()
            var year = date.getDate()
            return year;
        case 2:
            var date2 = new Date()
            var day_week = date2.getDay()
            switch (day_week) {
                case 1:
                    day_week = "Понеділок"
                    break;
                case 2:
                    day_week = "Вівторок"
                    break;
                case 3:
                    day_week = "Середа"
                    break;
                case 4:
                    day_week = "Четверг"
                    break;
                case 5:
                    day_week = "Пятниця"
                    break;
                case 6:
                    day_week = "Субота"
                    break;
                case 0:
                    day_week = "Неділя"
                    break;
            }
            return day_week;
        case 3:
            var date = new Date()
            var month = date.getMonth();
            var year = date.getFullYear();
            switch (month) {
                case 0:
                    month = "Січень"
                    break;
                case 1:
                    month = "Лютий"
                    break;
                case 2:
                    month = "Березень"
                    break;
                case 3:
                    month = "Квітень"
                    break;
                case 4:
                    month = "Травень"
                    break;
                case 5:
                    month = "Червень"
                    break;
                case 6:
                    month = "Липень"
                    break;
                case 7:
                    month = "Серпень"
                    break;
                case 8:
                    month = "Вересень"
                    break;
                case 9:
                    month = "Жовтень"
                    break;
                case 10:
                    month = "Листопад"
                    break;
                case 11:
                    month = "Грудень"
                    break;
            }
            return month + " " + year;
    }
}