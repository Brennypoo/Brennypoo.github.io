function dropdown() {
    let day_list = [' ']
    for (let i = 1; i <= 31; i++) {day_list.push(i.toString())}

    let month_list = [' ', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September','October', 'November', 'December']

    let year_list = [' '];
    for (let i = 1970; i <= 2010; i++) {year_list.push(i.toString())}

    let year_choice = document.getElementById('birth_year');
    let month_choice = document.getElementById('birth_month');
    let day_choice = document.getElementById("birth_day");

    for (index in year_list) {year_choice.options[year_choice.options.length] = new Option(year_list[index])}
    for (index in month_list) {month_choice.options[month_choice.options.length] = new Option(month_list[index])}
    for (index in day_list) {day_choice.options[day_choice.options.length] = new Option(day_list[index])}

    console.log("TODO: regex")
}