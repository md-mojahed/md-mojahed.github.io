<div align="center">

<a href="https://md-mojahed.github.io"><img src=".github/readme/banner.svg" alt="Md Mojahedul Islam: CTO & Lead Software Engineer at Light Technologies" width="100%"></a>

<img src=".github/readme/typing.svg" alt="Architecting Eduplus · Modelling ERPs · Writing Go · Hardening Linux · Building Flutter apps" width="760">

<br>

<a href="https://md-mojahed.github.io"><img src="https://img.shields.io/badge/Portfolio-md--mojahed.github.io-003366?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Portfolio"></a>
<a href="https://www.upwork.com/freelancers/~017a04691e484ba543"><img src="https://img.shields.io/badge/Upwork-Top%20Rated-6fda44?style=for-the-badge&logo=upwork&logoColor=white" alt="Top Rated on Upwork"></a>
<a href="https://www.linkedin.com/in/md-mojahed"><img src="https://img.shields.io/badge/LinkedIn-md--mojahed-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"></a>
<a href="mailto:dev.mojahedul@gmail.com"><img src="https://img.shields.io/badge/Email-dev.mojahedul-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Email"></a>
<a href="https://wa.me/8801861583588"><img src="https://img.shields.io/badge/WhatsApp-Chat-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" alt="WhatsApp"></a>
<a href="https://md-mojahed.github.io/game/"><img src="https://img.shields.io/badge/🦆_Take_a_breather-Duck_Drift-2a2560?style=for-the-badge" alt="Play Duck Drift"></a>

<a href="https://github.com/md-mojahed"><img src="https://komarev.com/ghpvc/?username=md-mojahed&label=Profile%20views&color=0284c7&style=flat" alt="Profile views"></a>
<br><br>

<img src=".github/readme/stats.svg" alt="4+ years · 50+ websites · 37+ Upwork projects · 100+ schools · 21 tools" width="100%">

</div>

## 👨‍💻 About me

I'm the **CTO & Lead Software Engineer at [Light Technologies](https://lighttechnologiesbd.com)**, a BASIS-member software company in Dhaka. I lead the technical vision and every product we ship, including **Eduplus**, a school platform used by schools, colleges and madrasas across Bangladesh.

I work across the whole stack. I'll model a double-entry ledger in the morning, write a WebSocket server in Go after lunch, and harden the Linux server it deploys to before I go home. I'm also a **Top Rated freelancer on Upwork**, with 37+ projects and a 100% job success rate.

| | |
|:--|:--|
| 🏢 **Now** | CTO & Lead Software Engineer · Light Technologies |
| 🎓 **Education** | B.Sc. in Computer Science & Engineering · Bangladesh University (2019–2023) |
| 🌍 **Location** | Dhaka, Bangladesh (GMT+6) · replies within 2–4 hours |
| 🔓 **Open source** | Contributor to [HestiaCP](https://github.com/hestiacp/hestiacp) · 12 packages on Packagist |
| 💬 **Ask me about** | Laravel architecture, multi-tenancy, Go tooling, Linux servers, security |

<img src=".github/readme/divider.svg" width="100%" alt="">

## 🧩 What I'm building: the Eduplus ecosystem

Eduplus isn't one app. It's an ecosystem of products and shared services I designed to fit together: an ERP at the core, apps and websites where people meet it, shared services for payments, SMS, meetings, storage and real-time messaging, and dashboards watching over all of it.

<p align="center"><img src=".github/readme/ecosystem.svg" alt="Eduplus ecosystem map" width="88%"></p>

## 📚 A book's journey through my ERP

I built a **208-model ERP for a book publisher**. It follows a book from the author's manuscript, through costing, paper purchasing, the printing press, the bindery, the warehouse and sales, to the author's royalty, posting a balanced double-entry journal at every step. Payroll, provident fund, fixed assets and rentals run on it too.

<p align="center"><img src=".github/readme/journey.svg" alt="Stages: Author, Costing, Paper, Press, Bindery, Stock, Sales, Royalty" width="100%"></p>

## ☁️ Cloud & infrastructure

I've run production on **AWS**, **Hetzner**, **Linode**, **DigitalOcean** and **Google Cloud**, plus a fleet of WHM/cPanel servers for school and client sites.

<p align="center">
  <img src="https://img.shields.io/badge/AWS-EC2-FF9900?style=for-the-badge&labelColor=232F3E" alt="AWS EC2">
  <img src="https://img.shields.io/badge/AWS-RDS-527FFF?style=for-the-badge&labelColor=232F3E" alt="AWS RDS">
  <img src="https://img.shields.io/badge/AWS-Load_Balancer-8C4FFF?style=for-the-badge&labelColor=232F3E" alt="Elastic Load Balancing">
  <img src="https://img.shields.io/badge/AWS-S3-569A31?style=for-the-badge&labelColor=232F3E" alt="AWS S3">
  <img src="https://img.shields.io/badge/AWS-Route_53-8C4FFF?style=for-the-badge&labelColor=232F3E" alt="Route 53"><br>
  <img src="https://img.shields.io/badge/Hetzner-D50C2D?style=for-the-badge&logo=hetzner&logoColor=white" alt="Hetzner">
  <img src="https://img.shields.io/badge/Linode-00A95C?style=for-the-badge&logo=akamai&logoColor=white" alt="Linode">
  <img src="https://img.shields.io/badge/DigitalOcean-0080FF?style=for-the-badge&logo=digitalocean&logoColor=white" alt="DigitalOcean">
  <img src="https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=googlecloud&logoColor=white" alt="Google Cloud">
  <img src="https://img.shields.io/badge/WHM_/_cPanel-FF6C2C?style=for-the-badge&logo=cpanel&logoColor=white" alt="WHM / cPanel">
</p>

**Off-site backups I built:** every night, Bash jobs on each WHM server dump every MySQL database and collect the media assets (plus any file a site marks with `.backupme`), zip the day, and push it to S3-compatible object storage (Hetzner Object Storage, AWS S3) with the AWS CLI. A grandfather-father-son rotation keeps **10 daily** backups and promotes the last one of each month to **12 monthly** backups.

<p align="center"><img src=".github/readme/backups.svg" alt="Nightly backups from WHM servers to object storage, 10 daily and 12 monthly" width="100%"></p>

<img src=".github/readme/divider.svg" width="100%" alt="">

## 🛠️ Tech stack

<p align="center">
  <img src="https://skillicons.dev/icons?i=php,laravel,go,js,python,dart,flutter,vue,nuxtjs,alpinejs&perline=10" alt="Languages and frameworks"><br>
  <img src="https://skillicons.dev/icons?i=mysql,redis,sqlite,bootstrap,tailwind,html,css,nodejs,git,github&perline=10" alt="Data and web"><br>
  <img src="https://skillicons.dev/icons?i=linux,ubuntu,bash,nginx,apache,docker,kubernetes,aws,gcp,githubactions&perline=10" alt="Ops and cloud">
</p>

**Also:** Pest · WebSockets · WebRTC · Web Push · SSLCommerz · WHM/cPanel · HestiaCP · Hetzner · Linode · DigitalOcean · Let's Encrypt · Bash automation · penetration testing · hardening · LLM APIs & RAG

## 💼 Experience

| Role | Where | When |
|:--|:--|:--:|
| **CTO & Lead Software Engineer**: Eduplus platform, ERPs, shared services, servers and security | [Light Technologies](https://lighttechnologiesbd.com) | 2021 – now |
| **Top Rated Freelancer**: backend systems, APIs, server administration · 37+ projects, 100% JSS | [Upwork](https://www.upwork.com/freelancers/~017a04691e484ba543) | 2019 – now |
| **System Administrator**: AWS (EC2, RDS, load balancers, S3, Route 53), Hetzner, Linode, DigitalOcean, Google Cloud and WHM/cPanel, including WithImpact.com · off-site S3 backups | Light Technologies & clients | 2020 – now |

## 🚀 Featured work

<details open>
<summary><b>🏗️ Systems I've architected</b></summary>
<br>

| System | Highlights |
|:--|:--|
| **Eduplus ERP & Lite** | Admissions, exams, results, fees, HR and SMS · multi-tenant · Laravel 13 + Pest |
| **Eduplus Attendance Hub** | One normalized pipeline for 100+ schools across many device vendors · Go workers |
| **Eduplus CDN** | Self-hosted, S3-style storage · Laravel control plane, Go data plane on NVMe |
| **Publication ERP** | 208 models · press, bindery, warehouse, sales, royalties with TDS, payroll, general ledger |
| **Light Tech Monitor** | File integrity, malware detections, health, disk, logs, backups and traffic for every hosted domain |
| **Eduplus Messenger** | Chat, groups, read receipts, presence, web push, WebRTC calls |
| **Eduplus Teacher & Student apps** | Flutter apps for attendance, routines, marks and online classes |
| **TravelPlus · MediFind BD · Rahma Organics** | Hajj/Umrah agency SaaS · healthcare directory · e-commerce |

</details>

<details open>
<summary><b>📦 Packages on Packagist</b></summary>
<br>

| Package | Description |
|:--|:--|
| [`mojahed/aiapi`](https://packagist.org/packages/mojahed/aiapi) | One Laravel interface for OpenAI, Claude, Gemini, Ollama, Groq, DeepSeek and more |
| [`mojahed/spa`](https://packagist.org/packages/mojahed/spa) | SPA feel for Laravel with Alpine.js + Axios. No build step |
| [`mojahed/webpush`](https://packagist.org/packages/mojahed/webpush) | Web Push (VAPID + RFC 8291) with zero dependencies |
| [`mojahed/jilapi`](https://packagist.org/packages/mojahed/jilapi) | AES-256-GCM / Argon2id encryption for strings and files |
| [`mojahed/converts`](https://packagist.org/packages/mojahed/converts) | Bangla ↔ English digits, numbers, dates, units and hashes |
| [`mojahed/mparser`](https://packagist.org/packages/mojahed/mparser) | Parse complex strings with custom tokens and expressions |
| [`mojahed/eduplusqr`](https://packagist.org/packages/mojahed/eduplusqr) · [`mojahed/eduplusbarcode`](https://packagist.org/packages/mojahed/eduplusbarcode) | Fast QR and barcode generation with a Go backend |
| [`mojahed/only-eye`](https://packagist.org/packages/mojahed/only-eye) | Hide emails and markup from scrapers |
| [`eduplus/qr`](https://packagist.org/packages/eduplus/qr) · [`eduplus/archive`](https://packagist.org/packages/eduplus/archive) · [`eduplus/attendance`](https://packagist.org/packages/eduplus/attendance) | Eduplus SDKs for Laravel and PHP |

</details>

<details open>
<summary><b>⚙️ Mojahed Dev Suite: single-binary Go tools</b></summary>
<br>

`MdsSocket` WebSocket server · `EduplusQR` its own QR encoder, Bangla QR · `jilapi` file encryption · `MdsOstrich` sysadmin CLI · `MdsNetwork` browser SSH relay · `mdstunnel` dev tunnels · `MdsCurl` concurrent fetcher · `Tinkercode` Laravel runner · `mdsuitest` JSON-driven UI tests · `mdtorag` Markdown → RAG index · `MdsImage` · `Gitwatch` · `MdsType`

Plus browser extensions: **Md's Filler** (realistic Bangladeshi test data) and **Eduplus Mark Input**.

</details>

<img src=".github/readme/divider.svg" width="100%" alt="">

## 🧭 How I build

| | Principle | In practice |
|:--:|:--|:--|
| 📦 | **No build step unless it earns its place** | Blade + Alpine.js + Bootstrap, often no npm at all |
| 🧱 | **One binary, zero dependencies** | Infrastructure tools are single static Go binaries |
| 💾 | **Write atomically** | `.tmp` then `rename()`, so a crash never leaves half a file |
| 🇧🇩 | **Local first** | Bangladeshi boards, Bangla digits, lakh/crore, Taka, Bangla QR |
| 🔐 | **Privacy is a design decision** | Call audio and video are never stored, only the metadata |
| 👁️ | **If it runs, watch it** | Integrity baselines, malware scans and alerts on every server |

## 🦆 Need a breather? Play Duck Drift

**Deadline close? Prod on fire? Take 3 minutes.** Duck Drift is a small browser game I made for developers under pressure. You steer a rubber duck with your breath, let your worries float away, and watch the night turn into sunrise.

<p align="center">
  <a href="https://md-mojahed.github.io/game/" title="Click to play Duck Drift">
    <img src=".github/readme/duck-drift.svg" alt="Duck Drift gameplay: the duck rides a breathing path while worry clouds burst into stars. Click to play." width="100%">
  </a>
  <br>
  <sub>👆 Click the game to play in your browser. No install, no sign-up, works on phones.</sub>
</p>

<div align="center">

<a href="https://md-mojahed.github.io/game/"><img src="https://img.shields.io/badge/▶%20%20PLAY%20NOW-1%E2%80%933%20minutes-8ee6ff?style=for-the-badge&labelColor=2a2560" alt="Play now"></a>

</div>

| 🎮 How to play | |
|:--|:--|
| **Hold** space, the mouse or your finger | Breathe **in** (4 s). The duck rises |
| **Release** | Breathe **out** slowly (6 s). The duck drifts down |
| **Follow the glowing path** | Stay in sync to build your calm combo |
| **Fly through the dark clouds** | *"prod is down"*, *"CI is red"*… each one bursts into stars with a kinder thought |
| **Catch fireflies** | Every one plays a note, and none of them clash |

<details>
<summary><b>🧠 Why it works</b> (and why there's no way to lose)</summary>
<br>

- **Slow breathing:** the path paces you to about **6 breaths a minute with a longer exhale**. Breathing near that rate is linked to higher heart-rate variability, a marker of a calmer nervous system (Lehrer & Gevirtz, 2014).
- **Longer exhales:** in a 2023 study, a few minutes a day of exhale-focused breathing improved mood more than mindfulness meditation did (Balban et al., *Cell Reports Medicine*).
- **Naming worries:** labelling a stressful thought and watching it pass is a core move in Acceptance & Commitment Therapy. That's what the clouds are for.
- **No fail state:** no lives, no game over, every note in harmony. You get novelty without threat.

You rate your tension before and after. At the end you get a title like *Senior Calm Engineer* and can **save a postcard PNG** to share. Scores live only in your own browser. Nothing is uploaded and nobody else sees them.

*It's a toy, not therapy. If stress is heavy and constant, please talk to someone.* 💙

</details>

## 🤝 Let's work together

<div align="center">

**Have a system that needs building, fixing or scaling?**<br>
I usually reply within 2–4 hours during business hours.

<a href="mailto:dev.mojahedul@gmail.com"><img src="https://img.shields.io/badge/Email%20me-003366?style=for-the-badge&logo=gmail&logoColor=white" alt="Email"></a>
<a href="https://wa.me/8801861583588"><img src="https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" alt="WhatsApp"></a>
<a href="https://www.upwork.com/freelancers/~017a04691e484ba543"><img src="https://img.shields.io/badge/Hire%20on%20Upwork-6fda44?style=for-the-badge&logo=upwork&logoColor=white" alt="Upwork"></a>
<a href="https://md-mojahed.github.io"><img src="https://img.shields.io/badge/Open%20portfolio-0284c7?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Portfolio"></a>

<br>

<sub>💡 I enjoy turning complex real-world problems into simple, elegant software.</sub>

</div>