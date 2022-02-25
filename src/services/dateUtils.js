

export const formatAMPM = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

export const getName = (name) => {
    var match = name.match(/^(\w+)\..*\.(\w+)@/);
    var empname = match[1];
    var emplname = match[2];
    return empname 
}