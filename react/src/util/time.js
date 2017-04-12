export function secondsToString(seconds) {
  var a = new Date(seconds * 1000),
      months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ],
      year = a.getFullYear(),
      month = months[a.getMonth()],
      date = a.getDate(),
      hour = a.getHours(),
      min = a.getMinutes(),
      sec = a.getSeconds(),
      time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;

  return time;
}