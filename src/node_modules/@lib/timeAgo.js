import { DateTime } from 'luxon'

// const timeAgo = (date) => {
//   const now = DateTime.local();
//   const past = DateTime.fromISO(date);
//   const diff = now.diff(past, 'hours');
//   if(Math.floor(diff.hours) === 0){
//     return 'a moment ago'
//   }
//   if(Math.floor(diff.hours) >= 24){
//     return DateTime.fromISO(date).toFormat('LLL dd, yyyy')
//   }
//   return `${Math.floor(diff.hours)} hours ago`
// }
//
// export default timeAgo

const units = [
  'year',
  'month',
  'week',
  'day',
  'hour',
  'minute',
  'second',
];

const timeAgo = (date) => {
  let dateTime = DateTime.fromISO(date)
  const diff = dateTime.diffNow().shiftTo(...units);
  const unit = units.find((unit) => diff.get(unit) !== 0) || 'second';

  const relativeFormatter = new Intl.RelativeTimeFormat('en', {
    numeric: 'auto',
  });
  return relativeFormatter.format(Math.trunc(diff.as(unit)), unit);
};

export default timeAgo