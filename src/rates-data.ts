export type RateEntry = { zip: string; destination: string; displayRate: string }
export type ParsedRate = { minRate: number | null; maxRate: number | null; note?: string }
export type EstimateAdjustment = { label: string; amount: number }
export type StaticEstimate = {
  matched: boolean
  priceLabel: string
  baseLabel?: string
  matchLabel?: string
  sourceRate?: string
  note?: string
  adjustments: EstimateAdjustment[]
  minRate?: number
  maxRate?: number
}

export const pricingRules = {
  basePassengers: 3,
  suvUpTo5: 20,
  suvUpTo7: 35,
  vanUpTo11SeattleArea: 90,
  gratuityPercent: 20,
  lateNightPickup: 20,
  lateNightStart: '23:00',
  lateNightEnd: '05:00',
  meetAndGreet: false,
} as const

export const specialRates = [
  { destination: 'Vancouver BC', vehicle: 'Base', passengers: 3, displayRate: '$500' },
  { destination: 'Vancouver BC', vehicle: 'SUV', passengers: 6, displayRate: '$600' },
  { destination: 'Vancouver BC', vehicle: 'Van', passengers: 10, displayRate: '$850' },
] as const

export const rates: readonly RateEntry[] = [
  { zip: '98001', destination: 'Auburn', displayRate: '$60' },
  { zip: '98002', destination: 'Auburn', displayRate: '$60' },
  { zip: '98003', destination: 'Federal Way', displayRate: '$60' },
  { zip: '98005', destination: 'Bellevue', displayRate: '$60' },
  { zip: '98010', destination: 'Black Diamond', displayRate: '$80' },
  { zip: '98011', destination: 'Bothell', displayRate: '$110' },
  { zip: '98012', destination: 'Bothell', displayRate: '$110' },
  { zip: '98014', destination: 'Carnation', displayRate: '$120' },
  { zip: '98015', destination: 'Bellevue', displayRate: '$60' },
  { zip: '98019', destination: 'Duvall', displayRate: '$125' },
  { zip: '98020', destination: 'Edmonds', displayRate: '$95' },
  { zip: '98021', destination: 'Bothell', displayRate: '$110' },
  { zip: '98022', destination: 'Enumclaw', displayRate: '$115' },
  { zip: '98023', destination: 'Federal Way', displayRate: '$60/70' },
  { zip: '98024', destination: 'Fall City', displayRate: '$110' },
  { zip: '98025', destination: 'Hobart', displayRate: '$85' },
  { zip: '98026', destination: 'North Edmonds', displayRate: '$110' },
  { zip: '98027', destination: 'Issaquah', displayRate: '$85' },
  { zip: '98028', destination: 'Kenmore', displayRate: '$90' },
  { zip: '98029', destination: 'Issaquah', displayRate: '$80' },
  { zip: '98030', destination: 'Kent', displayRate: '$60' },
  { zip: '98031', destination: 'Kent', displayRate: '$65' },
  { zip: '98032', destination: 'Kent', displayRate: '$60' },
  { zip: '98033', destination: 'Kirkland', displayRate: '$85' },
  { zip: '98034', destination: 'Kirkland', displayRate: '$90' },
  { zip: '98035', destination: 'Kent', displayRate: '$60' },
  { zip: '98036', destination: 'Lynnwood', displayRate: '$100' },
  { zip: '98037', destination: 'Lynnwood', displayRate: '$100' },
  { zip: '98038', destination: 'Maple Valley', displayRate: '$80' },
  { zip: '98039', destination: 'Medina', displayRate: '$70' },
  { zip: '98040', destination: 'Mercer Island', displayRate: '$65' },
  { zip: '98041', destination: 'Bothell', displayRate: '$85' },
  { zip: '98042', destination: 'Kent', displayRate: '$80' },
  { zip: '98043', destination: 'Mountlake Terrace', displayRate: '$90' },
  { zip: '98045', destination: 'North Bend', displayRate: '$130/140' },
  { zip: '98046', destination: 'Lynnwood', displayRate: '$95' },
  { zip: '98047', destination: 'Pacific', displayRate: '$75' },
  { zip: '98050', destination: 'Preston', displayRate: '$110' },
  { zip: '98051', destination: 'Ravensdale', displayRate: '$80 /85' },
  { zip: '98052', destination: 'Redmond', displayRate: '$90' },
  { zip: '98053', destination: 'Redmond', displayRate: '$90' },
  { zip: '98055', destination: 'Renton', displayRate: '$60' },
  { zip: '98056', destination: 'Renton', displayRate: '$55' },
  { zip: '98058', destination: 'Renton', displayRate: '$55' },
  { zip: '98059', destination: 'Renton', displayRate: '$55' },
  { zip: '98063', destination: 'Federal Way', displayRate: '$60' },
  { zip: '98064', destination: 'Kent', displayRate: '$55' },
  { zip: '98065', destination: 'Snoqualmie', displayRate: '$110' },
  { zip: '98068', destination: 'Snoqualmie Pass', displayRate: '$190' },
  { zip: '98071', destination: 'Auburn', displayRate: '$55' },
  { zip: '98072', destination: 'Woodinville', displayRate: '$100' },
  { zip: '98073', destination: 'Redmond', displayRate: '$75' },
  { zip: '98074', destination: 'Sammamish', displayRate: '$90' },
  { zip: '98075', destination: 'Sammamish', displayRate: '$90' },
  { zip: '98077', destination: 'Woodinville', displayRate: '$110' },
  { zip: '98082', destination: 'Mill Creek', displayRate: '$110' },
  { zip: '98083', destination: 'Kirkland', displayRate: '$80' },
  { zip: '98087', destination: 'Lynnwood', displayRate: '$100' },
  { zip: '98089', destination: 'Kent', displayRate: '$55' },
  { zip: '98092', destination: 'Auburn', displayRate: '$70' },
  { zip: '98093', destination: 'Federal Way', displayRate: '$60' },
  { zip: '98101', destination: 'Seattle', displayRate: '$60' },
  { zip: '98102', destination: 'Seattle', displayRate: '$65' },
  { zip: '98103', destination: 'Seattle', displayRate: '$70' },
  { zip: '98104', destination: 'Seattle', displayRate: '$60' },
  { zip: '98105', destination: 'Seattle', displayRate: '$75' },
  { zip: '98106', destination: 'Seattle', displayRate: '$60' },
  { zip: '98107', destination: 'Seattle', displayRate: '$75' },
  { zip: '98108', destination: 'Seattle', displayRate: '$60' },
  { zip: '98109', destination: 'Queen Anne', displayRate: '$65/70' },
  { zip: '98110', destination: 'Bainbridge Island', displayRate: '$240' },
  { zip: '98111', destination: 'Seattle', displayRate: '$60' },
  { zip: '98112', destination: 'Seattle', displayRate: '$65/75' },
  { zip: '98113', destination: 'Seattle', displayRate: '$60' },
  { zip: '98115', destination: 'Seattle', displayRate: '$80 /85' },
  { zip: '98116', destination: 'Seattle', displayRate: '$60' },
  { zip: '98117', destination: 'Seattle', displayRate: '$80/90 north 75 st' },
  { zip: '98118', destination: 'Seattle', displayRate: '$60' },
  { zip: '98119', destination: 'Seattle', displayRate: '$75' },
  { zip: '98121', destination: 'Seattle', displayRate: '$65' },
  { zip: '98122', destination: 'Seattle', displayRate: '$70/75' },
  { zip: '98125', destination: 'Seattle', displayRate: '$85' },
  { zip: '98126', destination: 'Seattle', displayRate: '$60' },
  { zip: '98129', destination: 'Seattle', displayRate: '$70' },
  { zip: '98133', destination: 'Shoreline', displayRate: '$80/90' },
  { zip: '98134', destination: 'Seattle', displayRate: '$60' },
  { zip: '98136', destination: 'Seattle', displayRate: '$60' },
  { zip: '98138', destination: 'Seattle', displayRate: '$60' },
  { zip: '98144', destination: 'Seattle', displayRate: '$50' },
  { zip: '98145', destination: 'Seattle', displayRate: '$65' },
  { zip: '98146', destination: 'Seattle', displayRate: '$50' },
  { zip: '98148', destination: 'Seattle', displayRate: '$45' },
  { zip: '98154', destination: 'Seattle', displayRate: '$55' },
  { zip: '98155', destination: 'Seattle', displayRate: '$85/90' },
  { zip: '98166', destination: 'Seattle', displayRate: '$50' },
  { zip: '98168', destination: 'Seattle', displayRate: '$50' },
  { zip: '98177', destination: 'Seattle', displayRate: '$85' },
  { zip: '98178', destination: 'Seattle', displayRate: '$50' },
  { zip: '98188', destination: 'SeaTac', displayRate: '$45' },
  { zip: '98199', destination: 'Seattle', displayRate: '$75' },
  { zip: '98201', destination: 'Everett', displayRate: '$130' },
  { zip: '98203', destination: 'Everett', displayRate: '$125' },
  { zip: '98204', destination: 'Everett', displayRate: '$125' },
  { zip: '98205', destination: 'Everett', displayRate: '$125' },
  { zip: '98206', destination: 'Everett', displayRate: '$125' },
  { zip: '98207', destination: 'Everett', displayRate: '$130' },
  { zip: '98208', destination: 'Everett', displayRate: '$125' },
  { zip: '98220', destination: 'Acme', displayRate: '$250' },
  { zip: '98221', destination: 'Anacortes', displayRate: '$300' },
  { zip: '98223', destination: 'Arlington', displayRate: '$170' },
  { zip: '98225', destination: 'Bellingham', displayRate: '$310' },
  { zip: '98226', destination: 'Bellingham', displayRate: '$340' },
  { zip: '98227', destination: 'Bellingham', displayRate: '$320' },
  { zip: '98228', destination: 'Bellingham', displayRate: '$320' },
  { zip: '98229', destination: 'Bellingham', displayRate: '$320' },
  { zip: '98230', destination: 'Blaine', displayRate: '$415' },
  { zip: '98232', destination: 'Bow', displayRate: '$280' },
  { zip: '98233', destination: 'Burlington', displayRate: '$270' },
  { zip: '98236', destination: 'Clinton', displayRate: '$220' },
  { zip: '98237', destination: 'Concrete', displayRate: '$260' },
  { zip: '98238', destination: 'Conway', displayRate: '$170' },
  { zip: '98239', destination: 'Coupeville', displayRate: '$240' },
  { zip: '98241', destination: 'Darrington', displayRate: '$280' },
  { zip: '98244', destination: 'Deming', displayRate: '$340' },
  { zip: '98247', destination: 'Everson', displayRate: '$340' },
  { zip: '98248', destination: 'Ferndale', displayRate: '$350' },
  { zip: '98249', destination: 'Freeland', displayRate: '$260' },
  { zip: '98251', destination: 'Gold Bar', displayRate: '$240' },
  { zip: '98252', destination: 'Granite Falls', displayRate: '$190' },
  { zip: '98256', destination: 'Index', displayRate: '$225' },
  { zip: '98257', destination: 'La Conner', displayRate: '$280' },
  { zip: '98258', destination: 'Lake Stevens', displayRate: '$155' },
  { zip: '98259', destination: 'North Lakewood', displayRate: '$195' },
  { zip: '98260', destination: 'Langley', displayRate: '$290' },
  { zip: '98264', destination: 'Lynden', displayRate: '$360' },
  { zip: '98266', destination: 'Maple Falls', displayRate: '$290' },
  { zip: '98270', destination: 'Marysville', displayRate: '$170' },
  { zip: '98271', destination: 'Marysville', displayRate: '$170' },
  { zip: '98272', destination: 'Monroe', displayRate: '$150' },
  { zip: '98273', destination: 'Mount Vernon', displayRate: '$260' },
  { zip: '98274', destination: 'Mount Vernon', displayRate: '$260' },
  { zip: '98275', destination: 'Mukilteo', displayRate: '$110/ferry $130' },
  { zip: '98277', destination: 'Oak Harbor', displayRate: '$290' },
  { zip: '98278', destination: 'Oak Harbor', displayRate: '$290' },
  { zip: '98282', destination: 'Camano Island', displayRate: '$250' },
  { zip: '98284', destination: 'Sedro Woolley', displayRate: '$225' },
  { zip: '98288', destination: 'Skykomish', displayRate: '$240' },
  { zip: '98290', destination: 'Snohomish', displayRate: '$150' },
  { zip: '98291', destination: 'Snohomish', displayRate: '$150' },
  { zip: '98292', destination: 'Stanwood', displayRate: '$170' },
  { zip: '98293', destination: 'Startup', displayRate: '$180' },
  { zip: '98294', destination: 'Sultan', displayRate: '$175' },
  { zip: '98295', destination: 'Sumas', displayRate: '$380' },
  { zip: '98296', destination: 'Snohomish', displayRate: '$125' },
  { zip: '98310', destination: 'Bremerton', displayRate: '$150' },
  { zip: '98311', destination: 'Bremerton', displayRate: '$150' },
  { zip: '98312', destination: 'Bremerton', displayRate: '$150' },
  { zip: '98314', destination: 'Bremerton', displayRate: '$150' },
  { zip: '98315', destination: 'Silverdale', displayRate: '$210' },
  { zip: '98321', destination: 'Buckley', displayRate: '$125' },
  { zip: '98322', destination: 'Burley', displayRate: '$95' },
  { zip: '98327', destination: 'Dupont', displayRate: '$140' },
  { zip: '98328', destination: 'Eatonville', displayRate: '$130' },
  { zip: '98329', destination: 'Gig Harbor', displayRate: '$125' },
  { zip: '98331', destination: 'Forks', displayRate: '$440' },
  { zip: '98332', destination: 'Gig Harbor', displayRate: '$125' },
  { zip: '98333', destination: 'Fox Island', displayRate: '$135' },
  { zip: '98335', destination: 'Gig Harbor', displayRate: '$120' },
  { zip: '98337', destination: 'Bremerton', displayRate: '$150' },
  { zip: '98338', destination: 'Graham', displayRate: '$120' },
  { zip: '98339', destination: 'Port Hadlock', displayRate: '$270' },
  { zip: '98340', destination: 'Hansville', displayRate: '$270' },
  { zip: '98352', destination: 'Sumner', displayRate: '$80' },
  { zip: '98354', destination: 'Milton', displayRate: '$70' },
  { zip: '98359', destination: 'Olalla', displayRate: '$140' },
  { zip: '98360', destination: 'Orting', displayRate: '$115' },
  { zip: '98361', destination: 'Packwood', displayRate: '$300' },
  { zip: '98362', destination: 'Port Angeles', displayRate: '$425' },
  { zip: '98363', destination: 'Port Angeles', displayRate: '$425' },
  { zip: '98364', destination: 'Port Gamble', displayRate: '$260' },
  { zip: '98365', destination: 'Port Ludlow', displayRate: '$250' },
  { zip: '98366', destination: 'Port Orchard', displayRate: '$150' },
  { zip: '98367', destination: 'Port Orchard', displayRate: '$150' },
  { zip: '98368', destination: 'Port Townsend', displayRate: '$290' },
  { zip: '98370', destination: 'Poulsbo', displayRate: '$210' },
  { zip: '98371', destination: 'Puyallup', displayRate: '$110' },
  { zip: '98372', destination: 'Puyallup', displayRate: '$110' },
  { zip: '98373', destination: 'Puyallup', displayRate: '$110' },
  { zip: '98374', destination: 'Puyallup', displayRate: '$110' },
  { zip: '98375', destination: 'Puyallup', displayRate: '$110' },
  { zip: '98382', destination: 'Sequim', displayRate: '$420' },
  { zip: '98383', destination: 'Silverdale', displayRate: '$210' },
  { zip: '98387', destination: 'Spanaway', displayRate: '$120' },
  { zip: '98388', destination: 'Steilacoom', displayRate: '$125' },
  { zip: '98390', destination: 'Sumner', displayRate: '$80' },
  { zip: '98391', destination: 'Bonney Lake', displayRate: '$120' },
  { zip: '98392', destination: 'Suquamish', displayRate: '$250' },
  { zip: '98401', destination: 'Tacoma', displayRate: '$115' },
  { zip: '98402', destination: 'Tacoma', displayRate: '$90' },
  { zip: '98403', destination: 'Tacoma', displayRate: '$90' },
  { zip: '98404', destination: 'Tacoma', displayRate: '$90' },
  { zip: '98405', destination: 'Tacoma', displayRate: '$90' },
  { zip: '98406', destination: 'Tacoma', displayRate: '$90' },
  { zip: '98407', destination: 'Tacoma', displayRate: '$90' },
  { zip: '98408', destination: 'Tacoma', displayRate: '$90' },
  { zip: '98409', destination: 'Tacoma', displayRate: '$90' },
  { zip: '98411', destination: 'Tacoma', displayRate: '$90' },
  { zip: '98412', destination: 'Tacoma', displayRate: '$90' },
  { zip: '98413', destination: 'Tacoma', displayRate: '$90' },
  { zip: '98415', destination: 'Tacoma', displayRate: '$90' },
  { zip: '98416', destination: 'Tacoma', displayRate: '$85' },
  { zip: '98417', destination: 'Tacoma', displayRate: '$85' },
  { zip: '98418', destination: 'Tacoma', displayRate: '$85' },
  { zip: '98419', destination: 'Tacoma', displayRate: '$85' },
  { zip: '98421', destination: 'Tacoma', displayRate: '$85' },
  { zip: '98422', destination: 'Tacoma', displayRate: '$85' },
  { zip: '98424', destination: 'Tacoma', displayRate: '$85' },
  { zip: '98430', destination: 'Camp Murray', displayRate: '$90' },
  { zip: '98431', destination: 'Tacoma', displayRate: '$90' },
  { zip: '98433', destination: 'Tacoma', displayRate: '$100' },
  { zip: '98438', destination: 'McChord AFB', displayRate: '$110' },
  { zip: '98439', destination: 'Lakewood', displayRate: '$95' },
  { zip: '98443', destination: 'Tacoma', displayRate: '$90' },
  { zip: '98444', destination: 'Tacoma', displayRate: '$90' },
  { zip: '98445', destination: 'Tacoma', displayRate: '$100' },
  { zip: '98446', destination: 'Tacoma', displayRate: '$95' },
  { zip: '98447', destination: 'Tacoma', displayRate: '$95' },
  { zip: '98448', destination: 'Tacoma', displayRate: '$95' },
  { zip: '98464', destination: 'Tacoma', displayRate: '$85' },
  { zip: '98465', destination: 'Tacoma', displayRate: '$95' },
  { zip: '98466', destination: 'Tacoma', displayRate: '$95' },
  { zip: '98467', destination: 'University Place', displayRate: '$95' },
  { zip: '98471', destination: 'Tacoma', displayRate: '$85' },
  { zip: '98481', destination: 'Tacoma', displayRate: '$85' },
  { zip: '98493', destination: 'Tacoma', displayRate: '$85' },
  { zip: '98496', destination: 'Lakewood', displayRate: '$95' },
  { zip: '98497', destination: 'Lakewood', displayRate: '$95' },
  { zip: '98498', destination: 'Lakewood', displayRate: '$95' },
  { zip: '98499', destination: 'Lakewood', displayRate: '$95' },
  { zip: '98501', destination: 'Olympia', displayRate: '$165' },
  { zip: '98502', destination: 'Olympia', displayRate: '$165' },
  { zip: '98503', destination: 'Lacey', displayRate: '$165' },
  { zip: '98504', destination: 'Olympia', displayRate: '$160' },
  { zip: '98505', destination: 'Olympia', displayRate: '$160' },
  { zip: '98506', destination: 'Olympia', displayRate: '$160' },
  { zip: '98507', destination: 'Olympia', displayRate: '$160' },
  { zip: '98508', destination: 'Olympia', displayRate: '$160' },
  { zip: '98509', destination: 'Lacey', displayRate: '$160' },
  { zip: '98511', destination: 'Tumwater', displayRate: '$160' },
  { zip: '98512', destination: 'Olympia', displayRate: '$160' },
  { zip: '98513', destination: 'Olympia', displayRate: '$160' },
  { zip: '98516', destination: 'Olympia', displayRate: '$160' },
  { zip: '98520', destination: 'Aberdeen', displayRate: '$320' },
  { zip: '98528', destination: 'Belfair', displayRate: '$210' },
  { zip: '98531', destination: 'Centralia', displayRate: '$270' },
  { zip: '98532', destination: 'Chehalis', displayRate: '$220' },
  { zip: '98550', destination: 'Hoquiam', displayRate: '$270' },
  { zip: '98569', destination: 'Ocean Shores', displayRate: '$470' },
  { zip: '98576', destination: 'Rainier', displayRate: '$275' },
  { zip: '98580', destination: 'Roy', displayRate: '$140' },
  { zip: '98584', destination: 'Shelton', displayRate: '$220' },
  { zip: '98591', destination: 'Toledo', displayRate: '$240' },
  { zip: '98592', destination: 'Union', displayRate: '$230' },
  { zip: '98597', destination: 'Yelm', displayRate: '$145' },
  { zip: '98599', destination: 'Olympia', displayRate: '$150' },
  { zip: '98660', destination: 'Vancouver', displayRate: '$390' },
  { zip: '98807', destination: 'Wenatchee', displayRate: '$430' },
  { zip: '98816', destination: 'Chelan', displayRate: '$550' },
  { zip: '98826', destination: 'Leavenworth', displayRate: '$480' },
  { zip: '98909', destination: 'Yakima', displayRate: '$420' },
  { zip: '98922', destination: 'Cle Elum', displayRate: '$300' },
  { zip: '98941', destination: 'Roslyn', displayRate: '$280' },
  { zip: '99163', destination: 'Pullman', displayRate: '$625' },
  { zip: '99201', destination: 'Spokane', displayRate: '$685' },
  { zip: '99302', destination: 'Pasco', displayRate: '$750' },
  { zip: '99352', destination: 'Richland', displayRate: '$660' },
  { zip: '99362', destination: 'Walla Walla', displayRate: '$570' },
]

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()

export function parseRate(displayRate: string): ParsedRate {
  const values = [...displayRate.matchAll(/\$(\d+)|\/\s*(\d+)/g)]
    .map(match => Number(match[1] ?? match[2]))
    .filter(Number.isFinite)
  if (!values.length) return { minRate: null, maxRate: null }
  const stripped = displayRate.replace(/\$\d+|\/\s*\d+/g, ' ').replace(/\//g, ' ').replace(/\s+/g, ' ').trim()
  return {
    minRate: Math.min(...values),
    maxRate: Math.max(...values),
    ...(stripped ? { note: stripped } : {}),
  }
}

export function searchRates(query: string): RateEntry[] {
  const term = normalize(query)
  if (!term) return [...rates]
  return rates.filter(rate => normalize(rate.zip).includes(term) || normalize(rate.destination).includes(term))
}

export function findRatesByLocation(location: string): RateEntry[] {
  const zip = location.match(/\b\d{5}\b/)?.[0]
  if (zip) return rates.filter(rate => rate.zip === zip)
  const term = normalize(location)
  if (!term) return []
  const cityMatches = rates.filter(rate => {
    const city = normalize(rate.destination)
    return term.includes(city) || city.includes(term)
  })
  if (!cityMatches.length) return []
  const longestName = Math.max(...cityMatches.map(rate => normalize(rate.destination).length))
  return cityMatches.filter(rate => normalize(rate.destination).length === longestName)
}

const isLateNight = (time: string) => {
  if (!/^\d{2}:\d{2}$/.test(time)) return false
  return time >= pricingRules.lateNightStart || time < pricingRules.lateNightEnd
}

const derivedUpperBound = (rate: number) => rate + Math.max(10, Math.ceil(rate * 0.1 / 5) * 5)
const formatRange = (minRate: number, maxRate: number) => `$${minRate}–$${maxRate}`

export function calculateStaticEstimate(input: {
  type: string
  pickup: string
  dropoff: string
  time: string
  passengers: number
  vehicle: string
}): StaticEstimate {
  if (input.type === 'hourly') return { matched: false, priceLabel: 'Custom quote required', adjustments: [] }

  const primaryLocation = input.type === 'airport-arrival'
    ? input.dropoff
    : input.type === 'airport-departure'
      ? input.pickup
      : input.dropoff || input.pickup
  const normalizedLocation = normalize(primaryLocation)

  const isVancouverBc = !/\b98660\b/.test(primaryLocation) && (
    normalizedLocation.includes('vancouver bc') ||
    normalizedLocation.includes('vancouver british columbia') ||
    normalizedLocation.includes('vancouver canada')
  )
  if (isVancouverBc) {
    const special = input.vehicle === 'van'
      ? specialRates[2]
      : input.vehicle === 'suv'
        ? specialRates[1]
        : specialRates[0]
    const parsed = parseRate(special.displayRate)
    if (parsed.minRate === null || parsed.maxRate === null) return { matched: false, priceLabel: 'Custom quote required', adjustments: [] }
    const adjustments: EstimateAdjustment[] = []
    if (isLateNight(input.time)) adjustments.push({ label: 'Late-night pickup', amount: pricingRules.lateNightPickup })
    const surcharge = adjustments.reduce((sum, adjustment) => sum + adjustment.amount, 0)
    const minRate = parsed.minRate + surcharge
    const maxRate = (parsed.minRate === parsed.maxRate ? derivedUpperBound(parsed.maxRate) : parsed.maxRate) + surcharge
    return {
      matched: true,
      priceLabel: formatRange(minRate, maxRate),
      baseLabel: special.displayRate,
      matchLabel: `${special.destination} · ${special.vehicle}`,
      sourceRate: special.displayRate,
      adjustments,
      minRate,
      maxRate,
    }
  }

  const matches = findRatesByLocation(primaryLocation)
  const parsedMatches = matches
    .map(rate => ({ rate, parsed: parseRate(rate.displayRate) }))
    .filter(result => result.parsed.minRate !== null && result.parsed.maxRate !== null)
  if (!parsedMatches.length) return { matched: false, priceLabel: 'Custom quote required', adjustments: [] }

  const baseMin = Math.min(...parsedMatches.map(result => result.parsed.minRate as number))
  const baseMax = Math.max(...parsedMatches.map(result => result.parsed.maxRate as number))
  const adjustments: EstimateAdjustment[] = []

  if (input.vehicle === 'suv') {
    if (input.passengers <= 5) adjustments.push({ label: 'SUV · up to 5 passengers', amount: pricingRules.suvUpTo5 })
    else if (input.passengers <= 7) adjustments.push({ label: 'SUV · up to 7 passengers', amount: pricingRules.suvUpTo7 })
  }
  const isSeattleArea = matches.some(rate => normalize(rate.destination) === 'seattle')
  if (input.vehicle === 'van' && input.passengers <= 11 && isSeattleArea) {
    adjustments.push({ label: 'Van · up to 11 passengers in Seattle area', amount: pricingRules.vanUpTo11SeattleArea })
  }
  if (isLateNight(input.time)) adjustments.push({ label: 'Late-night pickup', amount: pricingRules.lateNightPickup })

  const surcharge = adjustments.reduce((sum, adjustment) => sum + adjustment.amount, 0)
  const minRate = baseMin + surcharge
  const maxRate = (baseMin === baseMax ? derivedUpperBound(baseMax) : baseMax) + surcharge
  const sourceRate = parsedMatches.length === 1 ? parsedMatches[0].rate.displayRate : undefined
  const notes = [...new Set(parsedMatches.map(result => result.parsed.note).filter(Boolean))].join('; ')

  return {
    matched: true,
    priceLabel: formatRange(minRate, maxRate),
    baseLabel: baseMin === baseMax ? `$${baseMin}` : formatRange(baseMin, baseMax),
    matchLabel: parsedMatches.length === 1
      ? `${parsedMatches[0].rate.destination} · ${parsedMatches[0].rate.zip}`
      : `${parsedMatches[0].rate.destination} · ${parsedMatches.length} ZIP codes`,
    sourceRate,
    ...(notes ? { note: notes } : {}),
    adjustments,
    minRate,
    maxRate,
  }
}
