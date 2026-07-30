// DNS Servers Database — All Jordan ISP DNS servers with metadata
export interface DnsServer {
  ip: string;
  isp: string;
  ispFull: string;
  country: string;
  countryCode: string;
  city: string;
  type: "primary" | "secondary" | "backup";
  protocol: "UDP" | "TCP" | "DoH" | "DoT";
  estimatedUsers: string;
  asn: string;
  notes: string;
}

export interface DnsGroup {
  id: string;
  isp: string;
  ispFull: string;
  icon: string;
  color: string;
  country: string;
  countryCode: string;
  servers: DnsServer[];
}

function s(
  ip: string, isp: string, ispFull: string, country: string, countryCode: string,
  city: string, type: DnsServer["type"], asn: string, notes: string, estimatedUsers: string
): DnsServer {
  return { ip, isp, ispFull, country, countryCode, city, type, protocol: "UDP", asn, notes, estimatedUsers };
}

export const DNS_GROUPS: DnsGroup[] = [
  {
    id: "orange", isp: "Orange", ispFull: "Orange Jordan (formerly MobileCom)",
    icon: "🟠", color: "from-orange-500 to-orange-700",
    country: "Jordan", countryCode: "JO",
    servers: [
      s("212.118.0.1", "Orange", "Orange Jordan", "Jordan", "JO", "Amman", "primary", "AS8376", "DNS الرئيسي لأورانج الأردن", "~2.5M"),
      s("212.118.0.2", "Orange", "Orange Jordan", "Jordan", "JO", "Amman", "secondary", "AS8376", "DNS الثانوي لأورانج", "~2.5M"),
    ],
  },
  {
    id: "zain", isp: "Zain", ispFull: "Zain Jordan (formerly Fastlink)",
    icon: "💜", color: "from-purple-500 to-purple-700",
    country: "Jordan", countryCode: "JO",
    servers: [
      s("86.108.8.157", "Zain", "Zain Jordan", "Jordan", "JO", "Amman", "primary", "AS48832", "DNS رئيسي Zain", "~3M"),
      s("86.108.11.3", "Zain", "Zain Jordan", "Jordan", "JO", "Amman", "secondary", "AS48832", "DNS ثانوي Zain", "~3M"),
      s("86.108.14.2", "Zain", "Zain Jordan", "Jordan", "JO", "Amman", "backup", "AS48832", "نسخة احتياطية", "~3M"),
      s("86.108.14.128", "Zain", "Zain Jordan", "Jordan", "JO", "Amman", "backup", "AS48832", "نسخة احتياطية", "~3M"),
      s("86.108.44.12", "Zain", "Zain Jordan", "Jordan", "JO", "Amman", "backup", "AS48832", "DNS فرعي", "~3M"),
      s("86.108.45.170", "Zain", "Zain Jordan", "Jordan", "JO", "Amman", "backup", "AS48832", "DNS فرعي", "~3M"),
    ],
  },
  {
    id: "umniah", isp: "Umniah", ispFull: "Umniah Mobile Company",
    icon: "🔵", color: "from-blue-500 to-blue-700",
    country: "Jordan", countryCode: "JO",
    servers: [
      s("46.185.129.77", "Umniah", "Umniah Mobile", "Jordan", "JO", "Amman", "primary", "AS47887", "DNS رئيسي Umniah", "~1.8M"),
      s("46.185.129.130", "Umniah", "Umniah Mobile", "Jordan", "JO", "Amman", "secondary", "AS47887", "DNS ثانوي", "~1.8M"),
      s("46.185.138.166", "Umniah", "Umniah Mobile", "Jordan", "JO", "Amman", "backup", "AS47887", "DNS فرعي", "~1.8M"),
      s("46.185.139.160", "Umniah", "Umniah Mobile", "Jordan", "JO", "Amman", "backup", "AS47887", "DNS فرعي", "~1.8M"),
      s("46.185.161.76", "Umniah", "Umniah Mobile", "Jordan", "JO", "Amman", "backup", "AS47887", "DNS فرعي", "~1.8M"),
      s("46.185.162.241", "Umniah", "Umniah Mobile", "Jordan", "JO", "Amman", "backup", "AS47887", "DNS فرعي", "~1.8M"),
    ],
  },
  {
    id: "jt", isp: "Jordan Telecom", ispFull: "Jordan Telecommunications (JTC)",
    icon: "🟢", color: "from-green-500 to-emerald-700",
    country: "Jordan", countryCode: "JO",
    servers: [
      s("77.245.2.219", "JTC", "Jordan Telecom", "Jordan", "JO", "Amman", "primary", "AS8697", "DNS رئيسي JTC", "~1.5M"),
      s("77.245.2.220", "JTC", "Jordan Telecom", "Jordan", "JO", "Amman", "secondary", "AS8697", "DNS ثانوي", "~1.5M"),
      s("77.245.2.216", "JTC", "Jordan Telecom", "Jordan", "JO", "Amman", "backup", "AS8697", "DNS فرعي", "~1.5M"),
      s("77.245.2.218", "JTC", "Jordan Telecom", "Jordan", "JO", "Amman", "backup", "AS8697", "DNS فرعي", "~1.5M"),
      s("77.245.2.221", "JTC", "Jordan Telecom", "Jordan", "JO", "Amman", "backup", "AS8697", "DNS فرعي", "~1.5M"),
      s("77.245.2.222", "JTC", "Jordan Telecom", "Jordan", "JO", "Amman", "backup", "AS8697", "DNS فرعي", "~1.5M"),
      s("77.245.3.158", "JTC", "Jordan Telecom", "Jordan", "JO", "Amman", "backup", "AS8697", "DNS فرعي", "~1.5M"),
      s("77.245.10.30", "JTC", "Jordan Telecom", "Jordan", "JO", "Amman", "backup", "AS8697", "DNS فرعي", "~1.5M"),
      s("77.245.12.169", "JTC", "Jordan Telecom", "Jordan", "JO", "Amman", "backup", "AS8697", "DNS فرعي", "~1.5M"),
      s("77.245.13.191", "JTC", "Jordan Telecom", "Jordan", "JO", "Amman", "backup", "AS8697", "DNS فرعي", "~1.5M"),
    ],
  },
  {
    id: "vtel", isp: "Vtel", ispFull: "Vtel Jordan / Vi Networks",
    icon: "🌐", color: "from-cyan-500 to-teal-700",
    country: "Jordan", countryCode: "JO",
    servers: [
      s("94.142.40.39", "Vtel", "Vtel Jordan", "Jordan", "JO", "Amman", "primary", "AS50710", "DNS رئيسي Vtel", "~500K"),
      s("94.142.38.213", "Vtel", "Vtel Jordan", "Jordan", "JO", "Amman", "secondary", "AS50710", "DNS ثانوي", "~500K"),
      s("94.142.38.212", "Vtel", "Vtel Jordan", "Jordan", "JO", "Amman", "backup", "AS50710", "DNS فرعي", "~500K"),
      s("94.142.37.179", "Vtel", "Vtel Jordan", "Jordan", "JO", "Amman", "backup", "AS50710", "DNS فرعي", "~500K"),
      s("94.142.53.34", "Vtel", "Vtel Jordan", "Jordan", "JO", "Amman", "backup", "AS50710", "DNS فرعي", "~500K"),
    ],
  },
  {
    id: "batelco", isp: "Batelco", ispFull: "Batelco Jordan",
    icon: "🔴", color: "from-red-500 to-rose-700",
    country: "Jordan", countryCode: "JO",
    servers: [
      s("37.202.67.44", "Batelco", "Batelco Jordan", "Jordan", "JO", "Amman", "primary", "AS197335", "DNS رئيسي Batelco", "~200K"),
      s("37.202.127.139", "Batelco", "Batelco Jordan", "Jordan", "JO", "Amman", "secondary", "AS197335", "DNS ثانوي", "~200K"),
    ],
  },
  {
    id: "damamax", isp: "Damamax", ispFull: "Damamax / Mada",
    icon: "⚡", color: "from-amber-500 to-yellow-700",
    country: "Jordan", countryCode: "JO",
    servers: [
      s("92.253.13.100", "Damamax", "Damamax Jordan", "Jordan", "JO", "Amman", "primary", "AS47302", "DNS رئيسي", "~400K"),
      s("92.253.19.31", "Damamax", "Damamax Jordan", "Jordan", "JO", "Amman", "secondary", "AS47302", "DNS ثانوي", "~400K"),
      s("92.253.19.65", "Damamax", "Damamax Jordan", "Jordan", "JO", "Amman", "backup", "AS47302", "DNS فرعي", "~400K"),
      s("92.253.23.85", "Damamax", "Damamax Jordan", "Jordan", "JO", "Amman", "backup", "AS47302", "DNS فرعي", "~400K"),
      s("92.253.48.187", "Damamax", "Damamax Jordan", "Jordan", "JO", "Amman", "backup", "AS47302", "DNS فرعي", "~400K"),
      s("92.253.92.116", "Damamax", "Damamax Jordan", "Jordan", "JO", "Amman", "backup", "AS47302", "DNS فرعي", "~400K"),
      s("92.253.92.117", "Damamax", "Damamax Jordan", "Jordan", "JO", "Amman", "backup", "AS47302", "DNS فرعي", "~400K"),
      s("92.253.101.9", "Damamax", "Damamax Jordan", "Jordan", "JO", "Amman", "backup", "AS47302", "DNS فرعي", "~400K"),
      s("92.253.101.67", "Damamax", "Damamax Jordan", "Jordan", "JO", "Amman", "backup", "AS47302", "DNS فرعي", "~400K"),
      s("92.253.101.217", "Damamax", "Damamax Jordan", "Jordan", "JO", "Amman", "backup", "AS47302", "DNS فرعي", "~400K"),
      s("92.253.102.6", "Damamax", "Damamax Jordan", "Jordan", "JO", "Amman", "backup", "AS47302", "DNS فرعي", "~400K"),
      s("92.253.120.32", "Damamax", "Damamax Jordan", "Jordan", "JO", "Amman", "backup", "AS47302", "DNS فرعي", "~400K"),
      s("92.253.121.179", "Damamax", "Damamax Jordan", "Jordan", "JO", "Amman", "backup", "AS47302", "DNS فرعي", "~400K"),
      s("92.253.122.255", "Damamax", "Damamax Jordan", "Jordan", "JO", "Amman", "backup", "AS47302", "DNS فرعي", "~400K"),
      s("92.253.123.145", "Damamax", "Damamax Jordan", "Jordan", "JO", "Amman", "backup", "AS47302", "DNS فرعي", "~400K"),
      s("92.253.123.214", "Damamax", "Damamax Jordan", "Jordan", "JO", "Amman", "backup", "AS47302", "DNS فرعي", "~400K"),
      s("92.253.125.74", "Damamax", "Damamax Jordan", "Jordan", "JO", "Amman", "backup", "AS47302", "DNS فرعي", "~400K"),
      s("92.253.127.139", "Damamax", "Damamax Jordan", "Jordan", "JO", "Amman", "backup", "AS47302", "DNS فرعي", "~400K"),
    ],
  },
  {
    id: "wi-tribe", isp: "Wi-Tribe", ispFull: "Wi-Tribe Jordan",
    icon: "📶", color: "from-sky-500 to-blue-700",
    country: "Jordan", countryCode: "JO",
    servers: [
      s("91.106.99.238", "Wi-Tribe", "Wi-Tribe Jordan", "Jordan", "JO", "Amman", "primary", "AS51684", "DNS رئيسي", "~300K"),
      s("91.106.99.239", "Wi-Tribe", "Wi-Tribe Jordan", "Jordan", "JO", "Amman", "secondary", "AS51684", "DNS ثانوي", "~300K"),
      s("91.106.99.244", "Wi-Tribe", "Wi-Tribe Jordan", "Jordan", "JO", "Amman", "backup", "AS51684", "DNS فرعي", "~300K"),
      s("91.106.99.245", "Wi-Tribe", "Wi-Tribe Jordan", "Jordan", "JO", "Amman", "backup", "AS51684", "DNS فرعي", "~300K"),
      s("91.106.106.138", "Wi-Tribe", "Wi-Tribe Jordan", "Jordan", "JO", "Amman", "backup", "AS51684", "DNS فرعي", "~300K"),
      s("91.106.111.75", "Wi-Tribe", "Wi-Tribe Jordan", "Jordan", "JO", "Amman", "backup", "AS51684", "DNS فرعي", "~300K"),
    ],
  },
  {
    id: "kulacom", isp: "KulaCom", ispFull: "KulaCom / Aqaba Digital",
    icon: "🏖️", color: "from-emerald-500 to-green-700",
    country: "Jordan", countryCode: "JO",
    servers: [
      s("82.212.70.66", "KulaCom", "KulaCom Jordan", "Jordan", "JO", "Aqaba", "primary", "AS50405", "DNS رئيسي العقبة", "~100K"),
      s("82.212.72.18", "KulaCom", "KulaCom Jordan", "Jordan", "JO", "Aqaba", "secondary", "AS50405", "DNS ثانوي", "~100K"),
      s("82.212.79.115", "KulaCom", "KulaCom Jordan", "Jordan", "JO", "Aqaba", "backup", "AS50405", "DNS فرعي", "~100K"),
      s("82.212.82.198", "KulaCom", "KulaCom Jordan", "Jordan", "JO", "Aqaba", "backup", "AS50405", "DNS فرعي", "~100K"),
      s("82.212.84.109", "KulaCom", "KulaCom Jordan", "Jordan", "JO", "Aqaba", "backup", "AS50405", "DNS فرعي", "~100K"),
      s("82.212.84.139", "KulaCom", "KulaCom Jordan", "Jordan", "JO", "Aqaba", "backup", "AS50405", "DNS فرعي", "~100K"),
    ],
  },
  {
    id: "tedata", isp: "TeData", ispFull: "TeData Jordan / Mada",
    icon: "🌍", color: "from-indigo-500 to-violet-700",
    country: "Jordan", countryCode: "JO",
    servers: [
      s("176.29.114.132", "TeData", "TeData Jordan", "Jordan", "JO", "Amman", "primary", "AS8376", "DNS رئيسي TeData", "~600K"),
      s("176.29.114.141", "TeData", "TeData Jordan", "Jordan", "JO", "Amman", "secondary", "AS8376", "DNS ثانوي", "~600K"),
      s("176.29.114.149", "TeData", "TeData Jordan", "Jordan", "JO", "Amman", "backup", "AS8376", "DNS فرعي", "~600K"),
      s("176.29.114.159", "TeData", "TeData Jordan", "Jordan", "JO", "Amman", "backup", "AS8376", "DNS فرعي", "~600K"),
      s("176.29.114.180", "TeData", "TeData Jordan", "Jordan", "JO", "Amman", "backup", "AS8376", "DNS فرعي", "~600K"),
      s("176.29.114.181", "TeData", "TeData Jordan", "Jordan", "JO", "Amman", "backup", "AS8376", "DNS فرعي", "~600K"),
      s("176.29.114.182", "TeData", "TeData Jordan", "Jordan", "JO", "Amman", "backup", "AS8376", "DNS فرعي", "~600K"),
      s("176.29.114.183", "TeData", "TeData Jordan", "Jordan", "JO", "Amman", "backup", "AS8376", "DNS فرعي", "~600K"),
      s("176.29.114.188", "TeData", "TeData Jordan", "Jordan", "JO", "Amman", "backup", "AS8376", "DNS فرعي", "~600K"),
      s("176.29.114.190", "TeData", "TeData Jordan", "Jordan", "JO", "Amman", "backup", "AS8376", "DNS فرعي", "~600K"),
      s("176.29.114.198", "TeData", "TeData Jordan", "Jordan", "JO", "Amman", "backup", "AS8376", "DNS فرعي", "~600K"),
      s("176.29.151.152", "TeData", "TeData Jordan", "Jordan", "JO", "Amman", "backup", "AS8376", "DNS فرعي", "~600K"),
      s("176.29.153.215", "TeData", "TeData Jordan", "Jordan", "JO", "Amman", "backup", "AS8376", "DNS فرعي", "~600K"),
      s("176.29.154.115", "TeData", "TeData Jordan", "Jordan", "JO", "Amman", "backup", "AS8376", "DNS فرعي", "~600K"),
      s("176.29.174.7", "TeData", "TeData Jordan", "Jordan", "JO", "Amman", "backup", "AS8376", "DNS فرعي", "~600K"),
      s("176.29.176.230", "TeData", "TeData Jordan", "Jordan", "JO", "Amman", "backup", "AS8376", "DNS فرعي", "~600K"),
      s("176.29.199.51", "TeData", "TeData Jordan", "Jordan", "JO", "Amman", "backup", "AS8376", "DNS فرعي", "~600K"),
      s("176.29.199.164", "TeData", "TeData Jordan", "Jordan", "JO", "Amman", "backup", "AS8376", "DNS فرعي", "~600K"),
      s("176.29.200.50", "TeData", "TeData Jordan", "Jordan", "JO", "Amman", "backup", "AS8376", "DNS فرعي", "~600K"),
    ],
  },
  {
    id: "ncc", isp: "NCC", ispFull: "National Cable & Communications",
    icon: "📡", color: "from-rose-500 to-pink-700",
    country: "Jordan", countryCode: "JO",
    servers: [
      s("109.237.193.178", "NCC", "National Cable Jordan", "Jordan", "JO", "Amman", "primary", "AS198735", "DNS رئيسي NCC", "~150K"),
      s("109.237.197.6", "NCC", "National Cable Jordan", "Jordan", "JO", "Amman", "secondary", "AS198735", "DNS ثانوي", "~150K"),
      s("109.237.197.95", "NCC", "National Cable Jordan", "Jordan", "JO", "Amman", "backup", "AS198735", "DNS فرعي", "~150K"),
      s("109.237.197.195", "NCC", "National Cable Jordan", "Jordan", "JO", "Amman", "backup", "AS198735", "DNS فرعي", "~150K"),
      s("109.237.198.252", "NCC", "National Cable Jordan", "Jordan", "JO", "Amman", "backup", "AS198735", "DNS فرعي", "~150K"),
      s("109.237.201.32", "NCC", "National Cable Jordan", "Jordan", "JO", "Amman", "backup", "AS198735", "DNS فرعي", "~150K"),
      s("109.237.205.149", "NCC", "National Cable Jordan", "Jordan", "JO", "Amman", "backup", "AS198735", "DNS فرعي", "~150K"),
      s("109.237.205.167", "NCC", "National Cable Jordan", "Jordan", "JO", "Amman", "backup", "AS198735", "DNS فرعي", "~150K"),
    ],
  },
  {
    id: "misc-jo", isp: "Others JO", ispFull: "مزودين آخرين في الأردن",
    icon: "🇯🇴", color: "from-slate-500 to-gray-700",
    country: "Jordan", countryCode: "JO",
    servers: [
      s("217.23.37.74", "JO-ISP", "Jordan ISP", "Jordan", "JO", "Amman", "primary", "AS-JO", "DNS أردني عام", "~100K"),
      s("37.220.123.91", "JO-ISP", "Jordan ISP", "Jordan", "JO", "Amman", "primary", "AS-JO", "DNS أردني عام", "~50K"),
      s("37.152.6.11", "JO-ISP", "Jordan ISP", "Jordan", "JO", "Amman", "primary", "AS-JO", "DNS أردني", "~50K"),
      s("81.28.112.8", "JO-ISP", "Jordan ISP", "Jordan", "JO", "Amman", "primary", "AS-JO", "DNS أردني", "~50K"),
      s("46.32.96.18", "JO-ISP", "Jordan ISP", "Jordan", "JO", "Amman", "backup", "AS-JO", "DNS فرعي", "~50K"),
      s("46.32.100.238", "JO-ISP", "Jordan ISP", "Jordan", "JO", "Amman", "backup", "AS-JO", "DNS فرعي", "~50K"),
      s("46.32.113.204", "JO-ISP", "Jordan ISP", "Jordan", "JO", "Amman", "backup", "AS-JO", "DNS فرعي", "~50K"),
      s("46.32.114.40", "JO-ISP", "Jordan ISP", "Jordan", "JO", "Amman", "backup", "AS-JO", "DNS فرعي", "~50K"),
      s("46.32.114.242", "JO-ISP", "Jordan ISP", "Jordan", "JO", "Amman", "backup", "AS-JO", "DNS فرعي", "~50K"),
      s("46.32.114.248", "JO-ISP", "Jordan ISP", "Jordan", "JO", "Amman", "backup", "AS-JO", "DNS فرعي", "~50K"),
      s("85.159.216.2", "JO-ISP", "Jordan ISP", "Jordan", "JO", "Amman", "backup", "AS-JO", "DNS فرعي", "~50K"),
      s("85.159.217.82", "JO-ISP", "Jordan ISP", "Jordan", "JO", "Amman", "backup", "AS-JO", "DNS فرعي", "~50K"),
      s("85.159.217.98", "JO-ISP", "Jordan ISP", "Jordan", "JO", "Amman", "backup", "AS-JO", "DNS فرعي", "~50K"),
      s("85.159.217.195", "JO-ISP", "Jordan ISP", "Jordan", "JO", "Amman", "backup", "AS-JO", "DNS فرعي", "~50K"),
      s("85.159.220.226", "JO-ISP", "Jordan ISP", "Jordan", "JO", "Amman", "backup", "AS-JO", "DNS فرعي", "~50K"),
      s("85.159.222.82", "JO-ISP", "Jordan ISP", "Jordan", "JO", "Amman", "backup", "AS-JO", "DNS فرعي", "~50K"),
      s("213.186.163.115", "JO-ISP", "Jordan ISP", "Jordan", "JO", "Amman", "backup", "AS-JO", "DNS فرعي", "~50K"),
      s("213.186.163.116", "JO-ISP", "Jordan ISP", "Jordan", "JO", "Amman", "backup", "AS-JO", "DNS فرعي", "~50K"),
      s("213.186.174.123", "JO-ISP", "Jordan ISP", "Jordan", "JO", "Amman", "backup", "AS-JO", "DNS فرعي", "~50K"),
      s("213.186.174.202", "JO-ISP", "Jordan ISP", "Jordan", "JO", "Amman", "backup", "AS-JO", "DNS فرعي", "~50K"),
      s("37.75.144.35", "JO-ISP", "Jordan ISP", "Jordan", "JO", "Amman", "backup", "AS-JO", "DNS فرعي", "~50K"),
      s("37.75.144.135", "JO-ISP", "Jordan ISP", "Jordan", "JO", "Amman", "backup", "AS-JO", "DNS فرعي", "~50K"),
      s("37.75.144.136", "JO-ISP", "Jordan ISP", "Jordan", "JO", "Amman", "backup", "AS-JO", "DNS فرعي", "~50K"),
      s("37.75.146.35", "JO-ISP", "Jordan ISP", "Jordan", "JO", "Amman", "backup", "AS-JO", "DNS فرعي", "~50K"),
      s("37.75.147.135", "JO-ISP", "Jordan ISP", "Jordan", "JO", "Amman", "backup", "AS-JO", "DNS فرعي", "~50K"),
      s("80.90.160.54", "JO-ISP", "Jordan ISP", "Jordan", "JO", "Amman", "backup", "AS-JO", "DNS فرعي", "~50K"),
      s("80.90.160.58", "JO-ISP", "Jordan ISP", "Jordan", "JO", "Amman", "backup", "AS-JO", "DNS فرعي", "~50K"),
      s("80.90.160.131", "JO-ISP", "Jordan ISP", "Jordan", "JO", "Amman", "backup", "AS-JO", "DNS فرعي", "~50K"),
      s("80.90.160.130", "JO-ISP", "Jordan ISP", "Jordan", "JO", "Amman", "backup", "AS-JO", "DNS فرعي", "~50K"),
      s("80.90.161.242", "JO-ISP", "Jordan ISP", "Jordan", "JO", "Amman", "backup", "AS-JO", "DNS فرعي", "~50K"),
      s("80.90.164.61", "JO-ISP", "Jordan ISP", "Jordan", "JO", "Amman", "backup", "AS-JO", "DNS فرعي", "~50K"),
      s("80.90.164.164", "JO-ISP", "Jordan ISP", "Jordan", "JO", "Amman", "backup", "AS-JO", "DNS فرعي", "~50K"),
      s("80.90.164.245", "JO-ISP", "Jordan ISP", "Jordan", "JO", "Amman", "backup", "AS-JO", "DNS فرعي", "~50K"),
      s("80.90.172.146", "JO-ISP", "Jordan ISP", "Jordan", "JO", "Amman", "backup", "AS-JO", "DNS فرعي", "~50K"),
    ],
  },
];

export function getAllServers(): DnsServer[] {
  return DNS_GROUPS.flatMap((g) => g.servers);
}

export function getTotalServers(): number {
  return getAllServers().length;
}
