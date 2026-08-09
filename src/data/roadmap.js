export const ROADMAP = [
  {
    id: 'fase-0',
    no: '00',
    title: 'Fondasi Konsep',
    duration: '1–2 minggu',
    goal: 'Ngerti "bahasa" dasar jaringan dulu, sebelum pegang perangkat beneran.',
    items: [
      {
        id: 'f0-osi',
        topik: 'Lapisan OSI & TCP/IP',
        deskripsi: 'Bongkar model OSI dan TCP/IP layer-by-layer, paham data ngikutin jalur yang mana pas kirim antar perangkat.',
      },
      {
        id: 'f0-ip',
        topik: 'IP addressing & subnetting',
        deskripsi: 'Hitung IP, mask, subnet, paham IP public vs private, dan konsep CIDR tanpa kalkulator dulu.',
      },
      {
        id: 'f0-linux',
        topik: 'Linux dasar & terminal',
        deskripsi: 'Navigasi folder, permission, manajemen paket, dan SSH — modal buat ngeurusin perangkat jaringan.',
      },
      {
        id: 'f0-dok',
        topik: 'Baca dokumentasi & manual',
        deskripsi: 'Paham cara baca manual resmi, opsi command, dan log error — bukan tebak-tebakan.',
      },
    ],
    checkpoint: 'Bisa jelasin kenapa dua komputer di subnet yang beda butuh router buat kirim data.',
  },
  {
    id: 'fase-1',
    no: '01',
    title: 'Networking Dasar Hands-on',
    duration: '3–4 minggu',
    goal: 'Rakit jaringan lokal dari nol biar teorinya kepraktek langsung.',
    items: [
      {
        id: 'f1-route',
        topik: 'Static routing',
        deskripsi: 'Tambah route manual, paham tabel routing, dan bikin antar-subnet saling nyambung.',
      },
      {
        id: 'f1-vlan',
        topik: 'VLAN',
        deskripsi: 'Pisah jaringan dalam satu switch, ngerti tagged vs untagged, dan praktek di managed switch.',
      },
      {
        id: 'f1-dhcp',
        topik: 'DHCP & DNS',
        deskripsi: 'Set DHCP server pake scope, mapping IP, dan paham cara DNS me-resolve nama.',
      },
      {
        id: 'f1-nat',
        topik: 'NAT, firewall & port forward',
        deskripsi: 'Masquerade, port forwarding, dan aturan firewall dasar biar akses ke luar rapi dan aman.',
      },
      {
        id: 'f1-wifi',
        topik: 'Wireless / Wi-Fi',
        deskripsi: 'SSID, keamanan WPA, pemilihan channel, dan trik sederhana soal jangkauan sinyal.',
      },
      {
        id: 'f1-stp',
        topik: 'STP & anti loop',
        deskripsi: 'Kenapa loop broadcast bikin jaringan macet, dan gimana STP mencegahnya.',
      },
      {
        id: 'f1-diag',
        topik: 'Diagnostik koneksi',
        deskripsi: 'Ping, traceroute, arp, netstat, dan nslookup — alat wajib pas handling masalah.',
      },
    ],
    checkpoint: 'Bisa bangun lab dua subnet + VLAN dan buat dua-duanya saling berkomunikasi.',
  },
  {
    id: 'fase-2',
    no: '02',
    title: 'FTTH & Infrastruktur Fisik ISP',
    duration: '3–4 minggu',
    goal: 'Ini bekal kerja NOC ISP beneran: tahu jalur fiber dari hulu sampai ke rumah pelanggan.',
    items: [
      {
        id: 'f2-rute',
        topik: 'Jalur & topologi FTTH',
        deskripsi: 'Ngikut alur OLT → ODC/ODP → ONT/ONU, ngerti istilah titik dan optical path.',
      },
      {
        id: 'f2-gpon',
        topik: 'GPON vs EPON',
        deskripsi: 'Beda teknologi optical yang sering dipakai ISP, kelebihan dan batasnya masing-masing.',
      },
      {
        id: 'f2-olt',
        topik: 'OLT & perangkat PON',
        deskripsi: 'Peran OLT, cara registrasi ONT, dan monitoring perangkat di sisi hulu.',
      },
      {
        id: 'f2-tools',
        topik: 'Alat ukur fiber',
        deskripsi: 'OTDR, power meter, dan sumber cahaya — cara pakai dan cara baca hasilnya.',
      },
      {
        id: 'f2-loss',
        topik: 'Redaman & loss budget',
        deskripsi: 'Hitung loss budget, artikan kenapa sinyal drop, dan titik mana yang paling mungkin rusak.',
      },
      {
        id: 'f2-safe',
        topik: 'Penanganan fisik fiber',
        deskripsi: 'Bersihkan konektor, hindari tekukan tajam, dan cara kerja yang nggak ngerusak jalur.',
      },
    ],
    checkpoint: 'Bisa baca hasil pengukuran OTDR dan jelasin dugaan lokasi gangguannya.',
  },
  {
    id: 'fase-3',
    no: '03',
    title: 'Monitoring & Troubleshooting',
    duration: '3–4 minggu',
    goal: 'Jaringan nggak buta — ada angka & data biar tinggal nyari penyebab, bukan nebak.',
    items: [
      {
        id: 'f3-snmp',
        topik: 'SNMP & status perangkat',
        deskripsi: 'Baca health, utilisasi, dan status lewat SNMP: community string, v2/v3.',
      },
      {
        id: 'f3-nms',
        topik: 'Cacti / LibreNMS / Zabbix',
        deskripsi: 'Rakit sistem monitoring: graf trafik, uptime, dan notifikasi alert.',
      },
      {
        id: 'f3-flow',
        topik: 'NetFlow & analisa trafik',
        deskripsi: 'Ungkap siapa boros bandwidth lewat flow, dan temukan top talker.',
      },
      {
        id: 'f3-tcpdump',
        topik: 'Packet capture',
        deskripsi: 'tcpdump & Wireshark, filter dasar, dan baca handshake pas koneksi bermasalah.',
      },
      {
        id: 'f3-syslog',
        topik: 'Syslog & log terpusat',
        deskripsi: 'Kumpulin log semua perangkat ke satu tempat, baca pola error, atur retensi.',
      },
      {
        id: 'f3-til',
        topik: 'Troubleshooting bernot',
        deskripsi: 'Urut scope: fisik → layer → routing → aplikasi; dan catat tiap temuan.',
      },
    ],
    checkpoint: 'Bisa bedah satu kasus "pelanggan down" dari alert sampai akar masalahnya ketemu.',
  },
  {
    id: 'fase-4',
    no: '04',
    title: 'Routing & Teknologi Level ISP',
    duration: '4–5 minggu',
    goal: 'Naik level: routing dinamis & layanan yang emang dipakai ISP beneran.',
    items: [
      {
        id: 'f4-ospf',
        topik: 'OSPF dasar',
        deskripsi: 'Adjacency, area, dan cara dynamic routing nyepakati jalur terbaik.',
      },
      {
        id: 'f4-bgp',
        topik: 'BGP dasar',
        deskripsi: 'BGP peering, ASN, prefix announcement, dan kenapa internet butuh BGP.',
      },
      {
        id: 'f4-pppoe',
        topik: 'PPPoE & user session',
        deskripsi: 'Cara ISP ngontak pelanggan: session, user, dan billing reference.',
      },
      {
        id: 'f4-qos',
        topik: 'Queue & bandwidth',
        deskripsi: 'Simple queue, prioritas trafik, buat limit customer dan jaga kualitas link.',
      },
      {
        id: 'f4-vpn',
        topik: 'VPN site-to-site',
        deskripsi: 'Tunnel antar kantor, biar data aman lewat infrastruktur bersama.',
      },
      {
        id: 'f4-edge',
        topik: 'Routing edge & redundancy',
        deskripsi: 'Path cadangan & failover, biar kalau satu link turun trafik nggak putus total.',
      },
    ],
    checkpoint: 'Bisa komunikasi antar dua lokasi via VPN site-to-site di atas dynamic routing.',
  },
  {
    id: 'fase-5',
    no: '05',
    title: 'Security Dasar untuk NOC',
    duration: '2–3 minggu',
    goal: 'Aman itu bukan sekadar "bisa nyalain" — tapi tahu cara jaga-jaga.',
    items: [
      {
        id: 'f5-hard',
        topik: 'Hardening perangkat',
        deskripsi: 'Matikan servis yang nganggur, ganti default password, dan terapkan kebijakan akses.',
      },
      {
        id: 'f5-acl',
        topik: 'ACL & filtering',
        deskripsi: 'Batasi akses management, dan buat rule yang preventif — bukan cuma korektif.',
      },
      {
        id: 'f5-threat',
        topik: 'Ancaman umum & mitigasi',
        deskripsi: 'Kenali brute force, port scan, DDoS, dan mitigasi simpel yang bisa langsung diterapin.',
      },
      {
        id: 'f5-rpki',
        topik: 'RPKI & validasi routing',
        deskripsi: 'Bonus/opsional: validasi prefix dan anti route hijacking di BGP.',
      },
      {
        id: 'f5-inc',
        topik: 'Incident response',
        deskripsi: 'Verifikasi, isolate, escalate, dokumentasi — bukan panik duluan.',
      },
    ],
    checkpoint: 'Lancar jawab "langkah pertama kalau ada indikasi serangan?" dengan urutan yang jelas.',
  },
  {
    id: 'fase-6',
    no: '06',
    title: 'Sertifikasi & Simulasi Kerja NOC',
    duration: '4–6 minggu',
    goal: 'Dari teori ke "kerja": bukti kompetensi + simulasi shift beneran.',
    items: [
      {
        id: 'f6-mtc',
        topik: 'MTCNA (MikroTik)',
        deskripsi: 'Sertifikasi fundamental RouterOS buat fondasi yang diakui industri.',
      },
      {
        id: 'f6-ccna',
        topik: 'CCNA (opsional)',
        deskripsi: 'Investasi karir yang lebih besar; ambil kalau waktunya cocok.',
      },
      {
        id: 'f6-shift',
        topik: 'Simulasi shift NOC',
        deskripsi: 'Samain ritme kerja: cek dashboard, handle alert, catat, dan handoff.',
      },
      {
        id: 'f6-sop',
        topik: 'SOP & ticketing',
        deskripsi: 'Kenal langkah prosedur dan cara nulis ticket yang bisa dibaca tim.',
      },
      {
        id: 'f6-kb',
        topik: 'Knowledge base pribadi',
        deskripsi: 'Kumpulin case + penyelesaian, jadi acuan yang bisa dicomot cepat.',
      },
    ],
    checkpoint: 'Selesai satu simulasi shift penuh dari monitoring sampai closing ticket.',
  },
  {
    id: 'fase-7',
    no: '07',
    title: 'Portofolio & Persiapan Magang',
    duration: '2–3 minggu',
    goal: 'Semua hasil belajar disulap jadi kepercayaan diri di hadapan HR dan mentor.',
    items: [
      {
        id: 'f7-gh',
        topik: 'Rapikan GitHub',
        deskripsi: 'Satu repo tiap lab, README yang jelas, dokumentasi config dan hasil.',
      },
      {
        id: 'f7-cv',
        topik: 'CV & surat lamaran',
        deskripsi: 'Tulis pengalaman + ketrampilan yang nyambung sama keyword kerja NOC.',
      },
      {
        id: 'f7-interview',
        topik: 'Latihan interview teknis',
        deskripsi: 'Simulasi tanya-jawab, dan perkuat cara cerita pengalaman lab.',
      },
      {
        id: 'f7-mentor',
        topik: 'Mentor & apply',
        deskripsi: 'Reconnect ke mentor, minta feedback, dan mulai lamar ke lowongan NOC ISP.',
      },
    ],
    checkpoint: 'Punya repo rapi, CV final, dan daftar lowongan yang mau diapply.',
  },
]
