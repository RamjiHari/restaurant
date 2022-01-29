import moment from 'moment';
export function format_time(date, incl_time = false, year_digits = 4, str_date_format = "YYYY-MM-DD h:mm a"){

    var out_format = "DD MMM"

   if(year_digits == 2){
       out_format = "DD MMM";
   }
   if(incl_time){
       out_format =  "h:mm a"
   }

   if(date instanceof moment){
       return date.format(out_format);
   }
   else if(date == null){
       return "";
   }
   else{
    return moment(date, str_date_format).format(out_format);
   }
  }