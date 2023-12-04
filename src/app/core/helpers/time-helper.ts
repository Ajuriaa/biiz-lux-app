export function convertUtcToGmtMinus6(utcString: string): string {
  const utcDate = new Date(utcString);

  const gmtMinus6Time = utcDate.toLocaleTimeString('en-US', {
    timeZone: 'America/Belize', // GMT-6 timezone
    hour12: true, // Use 12-hour clock format
    hour: 'numeric',
    minute: 'numeric',
  });

  return gmtMinus6Time;
}
