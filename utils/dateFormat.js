  module.exports = (
    timestamp = {}
  ) => {
    // Format month to name of month
    const months = {
      0: 'January',
      1: 'February',
      2: 'March',
      3: 'April',
      4: 'May',
      5: 'June',
      6: 'July',
      7: 'August',
      8: 'September',
      9: 'October',
      10:'November',
      11:'December',
    }
  
    const dateTime = new Date(timestamp)
    const monthName = months[dateTime.getMonth()]
  
    const dayOfMonth = dateTime.getDate()
  
    const year = dateTime.getFullYear()
    let hour =
      dateTime.getHours() > 12
        ? Math.floor(dateTime.getHours() - 12)
        : dateTime.getHours()    
  
    const minutes = (dateTime.getMinutes() < 10 ? '0' : '') + dateTime.getMinutes()
  
    const amPm = dateTime.getHours() >= 12 ? 'pm' : 'am'
    
    if (hour === 0) {
        hour = 12
      }

    const finalTimeStamp = `${monthName} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${amPm}`
  
    return finalTimeStamp
  }
  