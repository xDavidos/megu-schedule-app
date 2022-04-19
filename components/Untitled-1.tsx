/* function setindexday() {
  let i = 0;

  while (i++ < 21){
    if (moment(generatedayslist[i]).date() == moment().date())
      break;
  }
  
  return i
}

const generatedayslist = useMemo(() => {
  let date = []
  let day = startday.clone()
  let i = 0;

  while (i++ < 21){
    date.push(day.clone())
    day.add(1, 'day')
  }
  
  return date
}, [startday])

function updatestartday() {
  console.log('Update Start Week Day');
  return moment().subtract(1, 'week').startOf('week');
}

useEffect(() => {
  const interval = setInterval(() => setstartday(updatestartday()), 60000);
  return () => clearInterval(interval);
}, []); */