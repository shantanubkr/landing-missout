/** Static UI copy for coded product mockups — lifted from marketing screenshots. */

export const EVENT_CREATE_FIXTURE = {
  title: 'Peak of Maharashtra',
  posterTitle: 'Kalsubai trek',
  posterSubtitle: 'Experience the highest peak of Maharashtra!',
  department: 'None',
  requireApproval: false,
  privateEvent: true,
  category: 'Adventure',
  datesTbd: true,
  startDate: 'dd/mm/yyyy',
  startTime: '--:-- --',
  endDate: 'dd/mm/yyyy',
  endTime: '--:-- --',
  timezone: 'GMT+5:30 Calcutta',
  location: 'CSMT Railway Station',
  mapsUrl: 'https://maps.app.goo.gl/z7qC1bR4R4aafy8j9',
  description: 'Experience the highest trek of Maharashtra',
} as const

export const EVENT_TYPE_PICKER_ACCENT = {
  label: 'Event type',
  options: [
    { label: 'Festival', selected: true },
    { label: 'Standalone', selected: false },
    { label: 'Workshop', selected: false },
  ],
} as const
