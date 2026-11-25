port module Main exposing (main)

{-| Portfolio of Md Mojahedul Islam, written in Elm.

Layout: an academic-profile style page. A sticky top navigation with a
scroll-spy pill, a sticky profile card on the left, and white content
cards on the right.

The first screen is calm. Further down it gets playful:

  - Inside Eduplus: an animated SVG map of the product ecosystem
  - A book's journey: the publication ERP with a live double-entry ledger
  - Lab: a production pop quiz, anatomy of a request, Bangla numbers, a shell

All text lives in the CONTENT section.

-}

import Browser
import Char
import Html exposing (Html, a, aside, button, div, footer, h1, h2, h3, h4, header, i, img, input, label, li, main_, nav, p, section, small, span, strong, text, ul)
import Html.Attributes exposing (alt, attribute, autocomplete, class, classList, disabled, for, height, href, id, placeholder, rel, spellcheck, src, style, target, title, value, width)
import Html.Events exposing (onClick, onInput, onSubmit)
import Html.Lazy exposing (lazy)
import Svg
import Svg.Attributes as SA
import Svg.Events as SE
import Time



-- PORTS


port saveTheme : String -> Cmd msg


port copyText : String -> Cmd msg


port activeSection : (String -> msg) -> Sub msg



-- MAIN


main : Program Flags Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }



-- MODEL


type alias Flags =
    { dark : Bool
    }


type WorkCat
    = AllWork
    | EduWork
    | BizWork
    | PlatformWork


type ToolLang
    = AllTools
    | GoLang
    | PhpLang
    | WebLang


type LineKind
    = Command
    | Output
    | Failure


type alias Line =
    { kind : LineKind
    , content : String
    }


type alias Model =
    { dark : Bool
    , menuOpen : Bool
    , active : String
    , copied : String
    , workCat : WorkCat
    , toolLang : ToolLang
    , node : String
    , stage : Int
    , playing : Bool
    , layer : Int
    , number : String
    , quizIndex : Int
    , quizAnswers : List Int
    , termInput : String
    , termLines : List Line
    , backupDay : Int
    }


init : Flags -> ( Model, Cmd Msg )
init flags =
    ( { dark = flags.dark
      , menuOpen = False
      , active = "about"
      , copied = ""
      , workCat = AllWork
      , toolLang = AllTools
      , node = "core"
      , stage = 0
      , playing = False
      , layer = 0
      , number = "12345678"
      , quizIndex = 0
      , quizAnswers = []
      , termInput = ""
      , termLines =
            [ Line Output "mojahed-shell v2.0"
            , Line Output "Type 'help', or tap a command below. Try 'neofetch'."
            ]
      , backupDay = 455
      }
    , Cmd.none
    )


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ activeSection SetActive
        , if model.playing then
            Time.every 1900 (\_ -> Tick)

          else
            Sub.none
        ]



-- UPDATE


type Msg
    = ToggleTheme
    | ToggleMenu
    | CloseMenu
    | SetActive String
    | Copy String String
    | SetWorkCat WorkCat
    | SetToolLang ToolLang
    | SelectNode String
    | SelectStage Int
    | TogglePlay
    | Tick
    | SelectLayer Int
    | SetNumber String
    | Answer Int
    | NextQuestion
    | RestartQuiz
    | TermInput String
    | TermSubmit
    | RunCommand String
    | SetBackupDay Int


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        ToggleTheme ->
            let
                dark =
                    not model.dark
            in
            ( { model | dark = dark }
            , saveTheme
                (if dark then
                    "dark"

                 else
                    "light"
                )
            )

        ToggleMenu ->
            ( { model | menuOpen = not model.menuOpen }, Cmd.none )

        CloseMenu ->
            ( { model | menuOpen = False }, Cmd.none )

        SetActive anchor ->
            ( { model | active = anchor }, Cmd.none )

        Copy key content ->
            ( { model | copied = key }, copyText content )

        SetWorkCat cat ->
            ( { model | workCat = cat }, Cmd.none )

        SetToolLang lang ->
            ( { model | toolLang = lang }, Cmd.none )

        SelectNode key ->
            ( { model | node = key }, Cmd.none )

        SelectStage index ->
            ( { model | stage = clamp 0 (List.length stages - 1) index, playing = False }, Cmd.none )

        TogglePlay ->
            if model.playing then
                ( { model | playing = False }, Cmd.none )

            else if model.stage >= List.length stages - 1 then
                ( { model | playing = True, stage = 0 }, Cmd.none )

            else
                ( { model | playing = True }, Cmd.none )

        Tick ->
            if model.stage >= List.length stages - 1 then
                ( { model | playing = False }, Cmd.none )

            else
                ( { model | stage = model.stage + 1 }, Cmd.none )

        SelectLayer index ->
            ( { model | layer = clamp 0 (List.length layers - 1) index }, Cmd.none )

        SetNumber typed ->
            ( { model | number = String.left 24 typed }, Cmd.none )

        Answer choice ->
            if List.length model.quizAnswers > model.quizIndex then
                ( model, Cmd.none )

            else
                ( { model | quizAnswers = model.quizAnswers ++ [ choice ] }, Cmd.none )

        NextQuestion ->
            ( { model | quizIndex = model.quizIndex + 1 }, Cmd.none )

        RestartQuiz ->
            ( { model | quizIndex = 0, quizAnswers = [] }, Cmd.none )

        TermInput typed ->
            ( { model | termInput = typed }, Cmd.none )

        TermSubmit ->
            ( { model | termLines = runCommand model.termInput model.termLines, termInput = "" }, Cmd.none )

        RunCommand command ->
            ( { model | termLines = runCommand command model.termLines, termInput = "" }, Cmd.none )

        SetBackupDay day ->
            ( { model | backupDay = clamp 0 backupMaxDay day }, Cmd.none )



-- TERMINAL


runCommand : String -> List Line -> List Line
runCommand raw lines =
    let
        command =
            String.toLower (String.trim raw)

        echo =
            Line Command (String.trim raw)
    in
    if command == "" then
        lines

    else if command == "clear" then
        []

    else
        case respond command of
            Just output ->
                keepLast 120 (lines ++ echo :: List.map (Line Output) output)

            Nothing ->
                keepLast 120
                    (lines
                        ++ [ echo
                           , Line Failure ("command not found: " ++ String.trim raw)
                           , Line Output "Type 'help' to see available commands."
                           ]
                    )


keepLast : Int -> List a -> List a
keepLast n list =
    List.drop (List.length list - n) list


respond : String -> Maybe (List String)
respond command =
    case command of
        "help" ->
            Just
                [ "Available commands:"
                , "  neofetch     system info, the fun way"
                , "  whoami       who I am"
                , "  stack        the tools I work with"
                , "  products     what I lead at Light Technologies"
                , "  mds          my own tool suite"
                , "  uptime       numbers so far"
                , "  cloud        where my servers live"
                , "  backup       how the backups rotate"
                , "  ping eduplus is the platform alive?"
                , "  git log      my upstream open-source commits"
                , "  joke         a programmer joke"
                , "  contact      how to reach me"
                , "  sudo hire    go on, try it"
                , "  clear        clear the screen"
                ]

        "neofetch" ->
            Just
                [ "    ▄▄▄▄▄▄▄       visitor@mojahed"
                , "   █ ▄▄▄▄▄ █      ───────────────"
                , "   █ █ M █ █      OS: Linux (of course)"
                , "   █ ▀▀▀▀▀ █      Host: Light Technologies, Dhaka"
                , "    ▀▀▀▀▀▀▀       Role: CTO & Lead Software Engineer"
                , "                  Uptime: 4+ years in production"
                , "                  Shell: bash, and this one"
                , "                  Languages: PHP, Go, JS, Python, Dart"
                , "                  Packages: 21 tools in Mojahed Dev Suite"
                , "                  Memory: 208 Eloquent models, all remembered"
                ]

        "whoami" ->
            Just
                [ fullName
                , "CTO & Lead Software Engineer @ Light Technologies"
                , "Software engineer · Linux system administrator · Dhaka, Bangladesh"
                ]

        "stack" ->
            Just
                [ "backend    PHP 8.3 · Laravel 13 · Go · Node.js · Python"
                , "frontend   Blade · Alpine.js · Vue.js · Bootstrap 5"
                , "mobile     Flutter"
                , "realtime   WebSockets (MdsSocket) · WebRTC · Web Push"
                , "ops        Linux · WHM/cPanel · Nginx · systemd · MySQL · Redis"
                , "security   pentesting · hardening · audits · AES-256-GCM"
                ]

        "products" ->
            Just
                [ "Eduplus      ERP · Lite · teacher app · website · admission"
                , "Platform     attendance hub · CDN · payments · SMS · meetings"
                , "Business     publication ERP · TravelPlus · MediFind · shops"
                ]

        "mds" ->
            Just
                [ "Mojahed Dev Suite: single-binary tools, zero runtime deps."
                , "MdsSocket  MdsOstrich  EduplusQR  jilapi  mdstunnel"
                , "MdsNetwork  MdsCurl  MdsImage  Tinkercode  mdsuitest  mdtorag"
                ]

        "cloud" ->
            Just
                [ "aws           EC2 · RDS · ELB · S3 · Route 53"
                , "hetzner       servers · Object Storage (S3-compatible)"
                , "linode        VPS"
                , "digitalocean  droplets"
                , "gcp           compute"
                , "hosting       WHM/cPanel · HestiaCP"
                ]

        "backup" ->
            Just
                [ "cron  →  mysqldump every DB  +  collect media assets"
                , "      →  zip  →  aws s3 cp --endpoint-url <object storage>"
                , "keep  →  10 daily · 12 monthly (promoted on the 1st)"
                , "Scroll to the Cloud section to time-travel through it."
                ]

        "uptime" ->
            Just
                [ "up 4+ years · load average: high, happily"
                , "50+ production websites · 5+ mobile apps"
                , "100+ schools on one attendance hub"
                , "Top Rated on Upwork"
                ]

        "ping eduplus" ->
            Just
                [ "PING eduplus: 56 data bytes"
                , "64 bytes from schools: icmp_seq=1 ttl=64 time=0.42 ms"
                , "64 bytes from teachers: icmp_seq=2 ttl=64 time=0.39 ms"
                , "64 bytes from guardians: icmp_seq=3 ttl=64 time=0.41 ms"
                , "--- 3 packets transmitted, 3 received, 0% packet loss ---"
                ]

        "joke" ->
            Just
                [ "Why did the Laravel developer go broke?"
                , "Because he used up all his cache."
                ]

        "contact" ->
            Just
                [ "email      " ++ email
                , "phone      " ++ phoneDisplay
                , "replies    usually within 2–4 hours (business hours)"
                ]

        "sudo hire" ->
            Just hireLines

        "sudo hire me" ->
            Just hireLines

        "hire" ->
            Just [ "Permission denied. Hiring needs root. Try: sudo hire" ]

        "ls" ->
            Just [ "eduplus/  publication-erp/  mds/  principles.txt  contact.txt" ]

        "cat principles.txt" ->
            Just (List.map .title principles)

        "pwd" ->
            Just [ "/home/mojahed" ]

        "uname -a" ->
            Just [ "Linux mojahed x86_64 GNU/Linux" ]

        "git log" ->
            Just gitLogLines

        "git log --author=mojahed" ->
            Just gitLogLines

        "rm -rf /" ->
            Just [ "Nice try. This machine is looked after by a white hat. 🛡" ]

        "exit" ->
            Just [ "There's no exit from a good conversation. Try 'contact' :)" ]

        _ ->
            Nothing


hireLines : List String
hireLines =
    [ "[sudo] password for visitor: ********"
    , "Access granted ✔"
    , "Send the details to " ++ email
    , "or message " ++ phoneDisplay ++ " on WhatsApp. I usually reply within 2–4 hours."
    ]


gitLogLines : List String
gitLogLines =
    [ "commit abe0c7a  (hestiacp/hestiacp, merged)"
    , "Author: Md Mojahedul Islam"
    , "Date:   Sep 2026"
    , ""
    , "    docs: add index.php fix for /phpmyadmin/ 404 on IP access"
    ]


suggestedCommands : List String
suggestedCommands =
    [ "neofetch", "whoami", "git log", "ping eduplus", "joke", "sudo hire" ]



-- NUMBERS


toBanglaDigits : String -> String
toBanglaDigits =
    String.map
        (\c ->
            if Char.isDigit c then
                Char.fromCode (0x09E6 + Char.toCode c - Char.toCode '0')

            else
                c
        )


{-| South Asian grouping: the last three digits, then pairs. 1234567 → 12,34,567
-}
groupSouthAsian : String -> String
groupSouthAsian digits =
    let
        pairs s =
            if String.length s <= 2 then
                s

            else
                pairs (String.dropRight 2 s) ++ "," ++ String.right 2 s
    in
    if String.length digits <= 3 then
        digits

    else
        pairs (String.dropRight 3 digits) ++ "," ++ String.right 3 digits


groupWestern : String -> String
groupWestern digits =
    if String.length digits <= 3 then
        digits

    else
        groupWestern (String.dropRight 3 digits) ++ "," ++ String.right 3 digits


readSouthAsian : Int -> String
readSouthAsian n =
    let
        parts =
            [ ( n // 10000000, "crore" )
            , ( modBy 100 (n // 100000), "lakh" )
            , ( modBy 100 (n // 1000), "thousand" )
            , ( modBy 1000 n, "" )
            ]
                |> List.filter (\( amount, _ ) -> amount > 0)
                |> List.map (\( amount, unit ) -> String.trim (String.fromInt amount ++ " " ++ unit))
    in
    if n == 0 then
        "zero"

    else
        String.join ", " parts


taka : Int -> String
taka n =
    "৳ " ++ groupSouthAsian (String.fromInt n)



-- CONTENT


fullName : String
fullName =
    "Md Mojahedul Islam"


photoUrl : String
photoUrl =
    "assets/photo.jpg"


cvUrl : String
cvUrl =
    "assets/Md-Mojahedul-Islam-CV.pdf"


email : String
email =
    "dev.mojahedul@gmail.com"


phoneDisplay : String
phoneDisplay =
    "+880 1861 583588"


githubUrl : String
githubUrl =
    "https://github.com/md-mojahed"


linkedinUrl : String
linkedinUrl =
    "https://www.linkedin.com/in/md-mojahed"


upworkUrl : String
upworkUrl =
    "https://www.upwork.com/freelancers/~017a04691e484ba543"


whatsappUrl : String
whatsappUrl =
    "https://wa.me/8801861583588"


companyUrl : String
companyUrl =
    "https://lighttechnologiesbd.com"


type alias NavItem =
    { anchor : String
    , label : String
    }


navItems : List NavItem
navItems =
    [ NavItem "about" "About"
    , NavItem "experience" "Experience"
    , NavItem "projects" "Projects"
    , NavItem "eduplus" "Eduplus"
    , NavItem "publication" "ERP"
    , NavItem "cloud" "Cloud"
    , NavItem "tools" "Tools"
    , NavItem "lab" "Lab"
    , NavItem "skills" "Skills"
    , NavItem "contact" "Contact"
    ]


type alias Stat =
    { value : String
    , label : String
    }


stats : List Stat
stats =
    [ Stat "4+" "Years in Production"
    , Stat "50+" "Websites Delivered"
    , Stat "100+" "Schools on One Hub"
    , Stat "Top" "Rated on Upwork"
    ]


type alias Focus =
    { icon : String
    , title : String
    , body : String
    }


focusAreas : List Focus
focusAreas =
    [ Focus "layer-group" "Product Engineering" "Multi-tenant Laravel systems: exams, results, fees, payroll, inventory and double-entry accounting."
    , Focus "microchip" "Systems & Tooling" "Single-binary Go tools for WebSockets, tunnels, storage and monitoring, so the products stay light."
    , Focus "shield-halved" "Linux & Security" "Production servers, hardened and watched: integrity baselines, malware scans, audits, backups."
    ]


type alias Role =
    { title : String
    , period : String
    , current : Bool
    , body : String
    , points : List String
    }


type alias Org =
    { icon : String
    , name : String
    , url : String
    , place : String
    , roles : List Role
    }


orgs : List Org
orgs =
    [ Org "building"
        "Light Technologies"
        companyUrl
        "Dhaka, Bangladesh"
        [ Role "CTO & Lead Software Engineer"
            "2021 – Present"
            True
            "Lead the technical vision and all product development at a BASIS-member software company (est. 2013) with 50+ people and 150+ clients."
            [ "Architected the Eduplus product family: ERP, multi-tenant Lite, teacher app, school websites, admission, game and shop."
            , "Designed shared platform services (attendance hub, CDN, payment gateway, SMS pipe, meeting API) used by every product."
            , "Built a 208-model publication ERP covering press, bindery, warehouse, sales, royalties, payroll and the general ledger."
            , "Run the production Linux/WHM servers and wrote the monitoring & security dashboard that watches them."
            , "Built the company's off-site backups: nightly MySQL and asset backups pushed to S3-compatible object storage with 10-daily / 12-monthly rotation."
            ]
        , Role "Lead Software Engineer"
            "Earlier"
            False
            "Led day-to-day engineering and delivery of client systems and the first generation of Eduplus."
            []
        ]
    , Org "briefcase"
        "Upwork"
        upworkUrl
        "Remote · Worldwide"
        [ Role "Top Rated Freelancer"
            "2019 – Present"
            True
            "Laravel, Vue.js, API and server-administration work for international clients: 37+ projects with a 100% job success rate. Known for clear communication and replies within 2–4 hours."
            []
        ]
    , Org "cloud"
        "Cloud & Server Administration"
        "#cloud"
        "AWS · Hetzner · Linode · DigitalOcean · Google Cloud"
        [ Role "System Administrator"
            "2020 – Present"
            True
            "Linux servers and cloud infrastructure for Light Technologies and client projects, including WithImpact.com."
            [ "AWS: EC2 instances behind load balancers, RDS databases, S3 storage and Route 53 DNS."
            , "Hetzner, Linode, DigitalOcean and Google Cloud servers, plus WHM/cPanel hosting, with automated cPanel provisioning for school websites."
            , "Off-site backups to S3-compatible object storage, Let's Encrypt automation, and CI/CD from Bitbucket to cPanel."
            ]
        ]
    ]


type alias Work =
    { name : String
    , kicker : String
    , body : String
    , badge : String
    , tags : List String
    , cat : WorkCat
    }


works : List Work
works =
    [ Work "Eduplus ERP: One Platform to Run an Institution"
        "Schools, colleges & madrasas · Bangladesh"
        "Admissions, routines, attendance, exams, results, fees, accounts, HR and SMS, built around Bangladeshi boards, grading and fee structures."
        "Flagship"
        [ "Laravel 13", "Pest 4", "MySQL" ]
        EduWork
    , Work "EduPlus Lite: Multi-tenant Education Portal"
        "Many institutions, one codebase"
        "Each tenant gets its own data, branding and payment setup, with PDF reports, Excel exports, SMS and virtual classrooms built in."
        "Multi-tenant"
        [ "Laravel 13", "Alpine.js", "ApexCharts" ]
        EduWork
    , Work "Eduplus Teacher App"
        "Flutter · Android & iOS"
        "Attendance, today's routine, one-tap online classes and exam mark entry from a phone. Institute-level theming and forced updates."
        "Mobile"
        [ "Flutter", "Sanctum API" ]
        EduWork
    , Work "School Website CMS"
        "Institution websites"
        "Notices, events, photo and video albums, staff profiles, clubs, \"stars of the institution\", short URLs and a visitor counter, all managed by the school."
        "CMS"
        [ "Laravel", "Blade" ]
        EduWork
    , Work "Eduplus Game & Shop"
        "Gamified learning"
        "Timed quizzes over a curriculum tree, with leaderboards, certificates and subscriptions. Points earned in the game are spent in the shop."
        "Gamification"
        [ "Laravel", "SSLCommerz", "REST API" ]
        EduWork
    , Work "Publication ERP for a Book Publisher"
        "208 models · 118 migrations"
        "Costing, paper purchasing, printing press, bindery, warehouses, sale centers, author royalties with TDS, payroll, provident fund and a full general ledger."
        "Enterprise"
        [ "Laravel", "Accounting", "Inventory" ]
        BizWork
    , Work "TravelPlus"
        "Hajj, Umrah & tour agencies"
        "Built for staff who don't want a \"deep\" system: minimum typing, mostly dropdowns, and income, expenses and dues calculated automatically."
        "SaaS"
        [ "Laravel 13", "Alpine.js" ]
        BizWork
    , Work "MediFind BD"
        "Healthcare directory"
        "Find hospitals, doctors and blood donors by division, district and area, then book an appointment."
        "Public"
        [ "Laravel 13", "Bootstrap 5" ]
        BizWork
    , Work "Rahma Organics"
        "E-commerce"
        "Cash-on-delivery shop with guest checkout, live order tracking and delivery zones. The admin dashboard shows revenue trends and low-stock alerts."
        "Commerce"
        [ "Laravel", "Alpine.js" ]
        BizWork
    , Work "Eduplus Attendance Hub"
        "Centralized data collection"
        "Pulls attendance logs from many device vendors' APIs, normalizes them and serves 100+ school projects. Concurrent fetches run as a Go binary."
        "100+ schools"
        [ "Laravel 13", "Go", "MdsCurl" ]
        PlatformWork
    , Work "Eduplus CDN"
        "Self-hosted, S3-style storage"
        "A Laravel control plane for clients, keys and buckets, and a Go data plane serving files from NVMe with in-memory config refreshed by poll plus push."
        "Infra"
        [ "Go", "Laravel", "TLS" ]
        PlatformWork
    , Work "Light Tech Monitor"
        "Server security dashboard"
        "Modified files, malware detections, HTTP health, disk, PHP error logs, processes, file integrity, backups and traffic, with email alerts."
        "Security"
        [ "Laravel 13", "Linux", "WHM" ]
        PlatformWork
    , Work "Eduplus Messenger"
        "Real-time chat & calls"
        "Direct and group chat, attachments, reactions, typing indicators, read receipts, presence, web push and WebRTC audio/video calls."
        "Realtime"
        [ "WebRTC", "MdsSocket", "Web Push" ]
        PlatformWork
    , Work "Eduplus Analytics"
        "Deployment intelligence"
        "Knows every domain running Eduplus. Unknown domains are flagged as unlicensed deployments."
        "Anti-piracy"
        [ "Laravel", "Analytics" ]
        PlatformWork
    ]


workCatName : WorkCat -> String
workCatName cat =
    case cat of
        AllWork ->
            "All"

        EduWork ->
            "Education"

        BizWork ->
            "Business"

        PlatformWork ->
            "Platform"


type alias Highlight =
    { icon : String
    , title : String
    , sub : String
    , body : String
    }


highlights : List Highlight
highlights =
    [ Highlight "star" "Top Rated on Upwork" "Freelance" "Earned through consistent delivery and client feedback."
    , Highlight "school" "100+ Schools on One Hub" "Eduplus Attendance" "One normalized attendance pipeline across many device vendors."
    , Highlight "book-open" "208-Model ERP" "Publication ERP" "Press to royalty, with every taka posted as a balanced journal."
    , Highlight "toolbox" "21 Self-built Tools" "Mojahed Dev Suite" "Go binaries, PHP packages and browser extensions my team uses daily."
    ]



-- ECOSYSTEM


type alias EcoNode =
    { key : String
    , name : String
    , icon : String
    , group : String
    , body : String
    , links : List String
    }


ecoNodes : List EcoNode
ecoNodes =
    [ EcoNode "core" "Eduplus ERP / Lite" "database" "core" "The source of truth: students, classes, exams, results, fees, accounts and HR. Lite runs many institutions from one multi-tenant codebase." [ "website", "admission", "teacher", "student", "attendance", "pgw", "sms", "meeting", "cdn", "analytics", "monitor" ]
    , EcoNode "website" "School website" "globe" "people" "Each institution's public face: notices, events, albums and admission links." [ "core", "admission" ]
    , EcoNode "admission" "Online admission" "user-plus" "people" "Applicants apply and pay online. Accepted students flow into the ERP, so nobody types them twice." [ "core", "pgw", "sms" ]
    , EcoNode "teacher" "Teacher app" "chalkboard-user" "people" "Flutter app for attendance, routines, marks and online classes, over a token-secured API." [ "core", "meeting" ]
    , EcoNode "student" "Student app" "mobile-screen" "people" "Students and guardians see results, routines, notices and fees." [ "core", "pgw" ]
    , EcoNode "attendance" "Attendance hub" "fingerprint" "services" "Collects device logs from many vendors for 100+ schools and hands them to the core." [ "core", "sms" ]
    , EcoNode "sms" "SMS pipe" "comment-sms" "services" "One outbound SMS pipeline for absence alerts, results, OTPs and payment receipts." [ "core", "attendance", "admission" ]
    , EcoNode "pgw" "Payment gateway" "credit-card" "services" "One SSLCommerz integration for fees, admission, subscriptions and shop orders." [ "core", "admission", "student", "game", "shop" ]
    , EcoNode "meeting" "Meeting API" "video" "services" "Google Meet / Zoom links behind one API, so a class starts from the routine." [ "core", "teacher" ]
    , EcoNode "cdn" "CDN" "cloud" "services" "Self-hosted S3-style storage on NVMe, served by Go." [ "core", "messenger", "shop" ]
    , EcoNode "socket" "MdsSocket" "bolt" "services" "A Go WebSocket server for chat, presence and WebRTC signaling." [ "messenger", "game" ]
    , EcoNode "game" "Eduplus Game" "gamepad" "ontop" "Quiz games on the curriculum tree, with leaderboards and certificates." [ "pgw", "shop", "socket" ]
    , EcoNode "shop" "Eduplus Shop" "bag-shopping" "ontop" "Pay with money, or with points earned in the game." [ "game", "pgw", "cdn" ]
    , EcoNode "messenger" "Messenger" "comments" "ontop" "Chat, groups, attachments, push notifications and calls." [ "socket", "cdn" ]
    , EcoNode "analytics" "Analytics" "chart-line" "watch" "Knows every domain running Eduplus and flags unlicensed ones." [ "core" ]
    , EcoNode "monitor" "Monitor" "shield-halved" "watch" "Watches the servers: changed files, malware, health, disk, logs, backups." [ "core" ]
    ]


findNode : String -> Maybe EcoNode
findNode key =
    List.head (List.filter (\n -> n.key == key) ecoNodes)


nodeName : String -> String
nodeName key =
    findNode key |> Maybe.map .name |> Maybe.withDefault key


{-| Hand-placed in tiers: people on top, watchers left, services right and
below the core, products built on top along the bottom.
-}
nodePos : String -> ( Float, Float )
nodePos key =
    case key of
        "core" ->
            ( 450, 225 )

        "website" ->
            ( 120, 50 )

        "admission" ->
            ( 330, 50 )

        "teacher" ->
            ( 570, 50 )

        "student" ->
            ( 780, 50 )

        "analytics" ->
            ( 105, 185 )

        "monitor" ->
            ( 105, 265 )

        "attendance" ->
            ( 795, 150 )

        "sms" ->
            ( 795, 225 )

        "meeting" ->
            ( 795, 300 )

        "pgw" ->
            ( 300, 360 )

        "cdn" ->
            ( 600, 360 )

        "shop" ->
            ( 150, 455 )

        "game" ->
            ( 370, 455 )

        "socket" ->
            ( 590, 455 )

        "messenger" ->
            ( 800, 455 )

        _ ->
            ( 450, 225 )


ecoEdges : List ( String, String )
ecoEdges =
    let
        addEdge ( x, y ) acc =
            if List.member ( x, y ) acc || List.member ( y, x ) acc then
                acc

            else
                acc ++ [ ( x, y ) ]
    in
    ecoNodes
        |> List.concatMap (\n -> List.map (\l -> ( n.key, l )) n.links)
        |> List.foldl addEdge []



-- PUBLICATION ERP


type alias Posting =
    { account : String
    , debit : Int
    , credit : Int
    }


type alias Stage =
    { icon : String
    , short : String
    , title : String
    , body : String
    , models : List String
    , note : String
    , postings : List Posting
    }


stages : List Stage
stages =
    [ Stage "feather-pointed"
        "Author"
        "Author & edition"
        "A book has many editions, and each print run records exactly which authors it pays. Royalties start here, not at the end."
        [ "Author", "Book", "BookEdition", "BookPrintRun", "BookPrintRunAuthor", "RoyaltyAccount" ]
        "Modelling the print run, not just the book, keeps royalties correct when a second edition adds a co-author."
        []
    , Stage "calculator"
        "Costing"
        "Costing sheet"
        "Before anything is printed, a costing sheet prices paper, plates, printing and binding, then goes through layered approvals."
        [ "CostingSheet", "CostingLine", "CostingSheetApprovalLayer", "PaperVariation", "BookPriceTier" ]
        "Approval is data, not code. Layers are rows, so the publisher can change who signs without a deploy."
        []
    , Stage "scroll"
        "Paper"
        "Paper & purchasing"
        "Requisitions collect vendor quotes and become purchase orders. Paper arrives against a goods receipt note."
        [ "PurchaseRequisition", "PurchaseRequisitionQuote", "PurchaseOrder", "GoodsReceiptNote", "VendorPayment" ]
        "Every receipt points back to the order line it fulfils, so partial deliveries never get lost."
        [ Posting "Paper inventory" 480000 0, Posting "Accounts payable: paper mill" 0 480000 ]
    , Stage "print"
        "Press"
        "Printing press"
        "A press plan assigns forms to machines with targets. Production is logged per machine, and paper and plates are tracked."
        [ "PressPlan", "PressPlanMachine", "PressProduction", "PressPaperReceipt", "PressPlateRate", "PressBill" ]
        "The press is modelled as its own business with its own customers, rates and income, because it is one."
        [ Posting "Work in progress: printing" 610000 0, Posting "Paper inventory" 0 480000, Posting "Press charges payable" 0 130000 ]
    , Stage "book"
        "Bindery"
        "Bindery"
        "Printed forms go to internal or outside binders. Materials, work, deliveries and returns are tracked, and binders are paid per rate."
        [ "BinderyOrder", "BinderySend", "BinderyWork", "BinderyDelivery", "BinderyReturn", "BinderyBinderBill" ]
        "Sent minus returned minus delivered must balance, so waste becomes visible instead of disappearing."
        [ Posting "Work in progress: binding" 150000 0, Posting "Binder bills payable" 0 150000 ]
    , Stage "warehouse"
        "Stock"
        "Warehouse"
        "Finished books are received into warehouses in batches, moved between sale centers and adjusted when counts disagree."
        [ "BookReceipt", "Warehouse", "StockBatch", "StockMovement", "StockTransfer", "UomConversion" ]
        "Stock is never a number in a column. It is the sum of movements, so \"why is it this number?\" always has an answer."
        [ Posting "Finished books inventory" 760000 0, Posting "Work in progress: printing" 0 610000, Posting "Work in progress: binding" 0 150000 ]
    , Stage "cash-register"
        "Sales"
        "Sales"
        "Invoices, a POS with hold memos, discounts, returns, and orders between the group's sister concerns."
        [ "SalesInvoice", "SalesReturn", "SaleCenter", "PosHoldMemo", "BookDiscount", "IntercoOrder" ]
        "Inter-company orders post to both companies' books at once, so the group consolidates without spreadsheets."
        [ Posting "Cash & receivables" 1250000 0, Posting "Book sales" 0 1250000, Posting "Cost of books sold" 760000 0, Posting "Finished books inventory" 0 760000 ]
    , Stage "hand-holding-dollar"
        "Royalty"
        "Royalty & closing"
        "Sales feed author royalties. Tax is deducted at source and deposited, and the fiscal period closes."
        [ "RoyaltyTransaction", "TdsDeduction", "RoyaltyTdsDeposit", "JournalEntry", "JournalLine", "FiscalYear" ]
        "Debits equal credits or nothing is saved. Closed periods lock, so last year's numbers can't quietly change."
        [ Posting "Royalty expense" 187500 0, Posting "Royalty payable: authors" 0 168750, Posting "TDS payable" 0 18750 ]
    ]


aroundTheBook : List String
aroundTheBook =
    [ "Payroll runs", "Provident fund", "Loans & advances", "Overtime & bonuses", "Leave & holidays", "Fixed assets & depreciation", "Rental properties", "Staff clinic", "Board resolutions" ]



-- TOOLS


type alias Tool =
    { name : String
    , lang : ToolLang
    , langLabel : String
    , body : String
    }


tools : List Tool
tools =
    [ Tool "MdsSocket" GoLang "Go" "Standalone WebSocket server with rooms, presence, live counts, keys & tokens and its own TLS. Built to run for years untouched."
    , Tool "EduplusQR" GoLang "Go" "Its own QR encoder (all 40 versions), 15 barcode types, Bangla QR payment payloads, and self-verification of every image."
    , Tool "jilapi" GoLang "Go" "AES-256-GCM + Argon2id + X25519/HKDF + Ed25519. Encrypts files of any size in constant memory."
    , Tool "MdsOstrich" GoLang "Go" "Cross-platform CLI for system info, server admin, file transfer and remote management."
    , Tool "MdsNetwork" GoLang "Go" "Browser SSH into teammates' PCs through a VPS relay. No VPN, no open ports."
    , Tool "mdstunnel" GoLang "Go" "Share a local dev server on the internet through your own VPS. Pure stdlib."
    , Tool "MdsCurl" GoLang "Go" "Concurrent HTTP fetcher PHP fires and forgets, with atomic file writes."
    , Tool "Tinkercode" GoLang "Go" "Self-hosted Laravel code runner. The WebSocket server (RFC 6455) is written from scratch."
    , Tool "mdsuitest" GoLang "Go" "Headed-Chrome UI tests from JSON over DevTools Protocol. No Node, no Playwright."
    , Tool "mdtorag" GoLang "Go" "Markdown docs into a RAG vector index with local Ollama embeddings."
    , Tool "MdsImage" GoLang "Go" "Resize, crop, effects, watermarks and batches in pure Go. No ImageMagick."
    , Tool "Gitwatch" GoLang "Go" "Real-time Git conflict watcher: see who is editing what before you collide."
    , Tool "MdsType" GoLang "Go" "Click-to-talk dictation over the network, typed into any focused window."
    , Tool "mojahed/aiapi" PhpLang "PHP" "One Laravel interface for OpenAI, Claude, Gemini, Ollama, Groq, DeepSeek and more."
    , Tool "mojahed/spa" PhpLang "PHP" "SPA feel for Laravel with Alpine.js + Axios. No build step, no npm, no Vite."
    , Tool "mojahed/webpush" PhpLang "PHP" "Web Push (VAPID + RFC 8291 aes128gcm) with zero third-party dependencies."
    , Tool "mojahed/converts" PhpLang "PHP" "Bangla ↔ English digits, numbers, dates, units and hashes."
    , Tool "eduplus/attendance" PhpLang "PHP" "SDK for the centralized Eduplus Attendance API."
    , Tool "MdsChatBot" WebLang "JS" "Zero-dependency, CDN-ready floating chatbot widget. One file."
    , Tool "Md's Filler" WebLang "Chrome" "Fills forms with realistic Bangladeshi test data, locally, in one click."
    , Tool "Eduplus Mark Input" WebLang "Chrome" "Bulk-fills exam marks to test result processing."
    ]


toolLangName : ToolLang -> String
toolLangName lang =
    case lang of
        AllTools ->
            "All"

        GoLang ->
            "Go"

        PhpLang ->
            "PHP"

        WebLang ->
            "JS & Chrome"



-- PRINCIPLES


type alias Principle =
    { icon : String
    , title : String
    , body : String
    , evidence : String
    }


principles : List Principle
principles =
    [ Principle "cube" "No build step unless it earns its place" "Most of my Laravel apps ship Blade with Alpine.js and Bootstrap and no npm at all. Fewer moving parts means fewer 2 a.m. surprises." "TravelPlus · MediFind · Attendance · Monitor"
    , Principle "box" "One binary, zero dependencies" "Infrastructure tools are single static Go binaries for Linux, macOS and Windows. Copy the file and it works." "MdsSocket · jilapi · MdsCurl · EduplusQR"
    , Principle "file-shield" "Write atomically" "Write to a .tmp file, then rename. A crash can never leave a half-written file for someone else to read." "MdsCurl outputs · logs"
    , Principle "location-dot" "Local first" "Bangladeshi boards and grading, Bangla digits, lakh and crore, Taka, Bangla QR. Software should fit the place it's used." "Eduplus · MdsConvert · EduplusQR"
    , Principle "user-lock" "Privacy is a design decision" "In a family messaging app I designed, call audio and video are never stored anywhere. Only call-history metadata is kept." "Tuki (design spec)"
    , Principle "eye" "If it runs, watch it" "Every server gets health checks, integrity baselines, malware scans and alerts. Every deployment of our software is known." "Monitor · Analytics"
    ]



-- QUIZ


type alias Question =
    { prompt : String
    , options : List String
    , answer : Int
    , why : String
    }


questions : List Question
questions =
    [ Question "A Laravel page lists 100 posts with their authors and runs 101 queries. Best fix?"
        [ "Add a bigger server", "Cache the whole page forever", "Eager load: Post::with('author')", "Add an index on posts.id" ]
        2
        "The classic N+1. Eager loading fetches every author in one extra query, so 101 queries become 2."
    , Question "Your server has ~4 GB free for PHP and each PHP-FPM worker uses ~80 MB. A sane pm.max_children?"
        [ "10", "50", "200", "1000" ]
        1
        "4096 ÷ 80 ≈ 51. Go much higher and the server swaps, and everything gets slower, not faster."
    , Question "Another process reads a file you're writing. Safest way to write it?"
        [ "Write directly and hope", "Write to file.tmp, then rename()", "Write it twice", "sleep(1) before reading" ]
        1
        "rename() is atomic on the same filesystem. Readers see the old file or the new one, never half of one."
    , Question "A journal entry's debits don't equal its credits. What should the system do?"
        [ "Save it and flag it", "Post the difference to a suspense account", "Reject the whole entry in a transaction", "Round it" ]
        2
        "Double-entry is an invariant, not a suggestion. Reject the whole entry, and the ledger can never drift."
    , Question "How is 1,23,45,678 read in Bangladesh?"
        [ "12 million 345 thousand…", "1 crore, 23 lakh, 45 thousand, 678", "123 lakh, 45,678", "1.2 billion" ]
        1
        "South Asian grouping: thousand, then lakh (1,00,000), then crore (1,00,00,000). Try the converter below."
    , Question "A user uploads \"photo.php.jpg\" into a public folder the server runs PHP in. Biggest risk?"
        [ "Disk fills up", "Remote code execution", "The image looks blurry", "Nothing, it ends in .jpg" ]
        1
        "Misconfigured handlers can execute it. Store uploads outside the web root, check real MIME types, and disable execution there."
    ]


quizVerdict : Int -> String
quizVerdict score =
    if score == List.length questions then
        "Perfect. We should work together. Seriously, get in touch."

    else if score >= 4 then
        "Senior instincts. Production would be safe with you."

    else if score >= 2 then
        "Solid start. Every one of these was learned the hard way."

    else
        "No worries, now you know. That's how production teaches everyone."



-- LAB: ANATOMY OF A REQUEST


type alias Layer =
    { icon : String
    , name : String
    , tech : String
    , what : String
    , note : String
    }


layers : List Layer
layers =
    [ Layer "laptop" "Client" "Browser · Alpine.js · Flutter" "The user taps a button. A web page or a mobile app sends an HTTPS request." "The fastest request is the one you never send. Cache headers and ETags let the browser skip the round trip."
    , Layer "server" "Web server" "Nginx · TLS · compression" "Nginx terminates TLS, compresses responses, serves static files and applies rate limits." "Static files never touch PHP. That keeps every PHP worker free for real work."
    , Layer "gears" "PHP runtime" "PHP-FPM worker pool" "A pool of PHP workers picks up the request. Too few and requests queue; too many and the server swaps." "Size the pool from memory, not guesswork: free RAM ÷ memory per worker."
    , Layer "code" "Application" "Laravel · middleware · services" "Middleware authenticates and resolves the tenant, routing picks a controller, and a service does the work." "Thin controllers, Form Request validation, business rules in services."
    , Layer "bolt" "Cache & queues" "Redis · workers · Go side-cars" "Expensive reads come from cache. Slow jobs like SMS, PDFs and vendor polling run off the request path." "If the user doesn't need to wait for it, they shouldn't."
    , Layer "database" "Database" "MySQL · indexes · transactions" "Indexed queries, wrapped in transactions wherever data must stay consistent, such as every journal entry." "Eager loading with with() turns 101 queries into 2."
    ]


securityPractices : List String
securityPractices =
    [ "HTTPS everywhere", "Validated input", "Prepared statements", "CSRF protection", "Least privilege", "Integrity baselines", "Regular audits" ]



-- SKILLS, SERVICES


type alias SkillGroup =
    { title : String
    , items : List String
    }


skillGroups : List SkillGroup
skillGroups =
    [ SkillGroup "Backend" [ "PHP 8.3", "Laravel 13", "Go", "Node.js", "Python", "REST APIs", "Pest" ]
    , SkillGroup "Frontend & Mobile" [ "Blade", "Alpine.js", "Vue.js", "Bootstrap 5", "Flutter" ]
    , SkillGroup "Data & Domains" [ "MySQL", "Redis", "SQLite", "Double-entry accounting", "Payroll", "Inventory", "Multi-tenancy" ]
    , SkillGroup "Realtime & Integrations" [ "WebSockets", "WebRTC", "Web Push", "SSLCommerz", "Meet / Zoom APIs", "SMS gateways", "LLM APIs & RAG" ]
    , SkillGroup "Cloud" [ "AWS EC2", "AWS RDS", "Elastic Load Balancing", "AWS S3", "Route 53", "Hetzner", "Hetzner Object Storage", "Linode", "DigitalOcean", "Google Cloud" ]
    , SkillGroup "Server & DevOps" [ "Linux", "WHM / cPanel", "HestiaCP", "Nginx / Apache", "systemd", "Bash automation", "Backups & rotation", "Let's Encrypt", "CI/CD", "Cross-platform builds" ]
    , SkillGroup "Security" [ "Penetration testing", "Vulnerability assessment", "Hardening", "Malware response", "Applied cryptography" ]
    ]


type alias Service =
    { icon : String
    , title : String
    , body : String
    }


services : List Service
services =
    [ Service "code" "Web Applications" "Laravel systems, from a focused tool to a 200-model ERP."
    , Service "mobile-screen" "Mobile Apps" "Flutter apps and the APIs behind them."
    , Service "plug" "APIs & Integrations" "Payments, SMS, meetings and LLMs, with clean contracts."
    , Service "terminal" "Server Administration" "Linux servers set up, tuned, monitored and kept fast."
    , Service "user-shield" "Security" "Audits, hardening and penetration testing."
    ]



-- VIEW HELPERS


icon : String -> Html msg
icon name =
    i [ class ("fa-solid fa-" ++ name), attribute "aria-hidden" "true" ] []


brand : String -> Html msg
brand name =
    i [ class ("fa-brands fa-" ++ name), attribute "aria-hidden" "true" ] []


newTab : List (Html.Attribute msg)
newTab =
    [ target "_blank", rel "noopener noreferrer" ]


extLink : String -> List (Html.Attribute msg) -> List (Html msg) -> Html msg
extLink url attrs children =
    a (href url :: newTab ++ attrs) children


card : String -> String -> String -> List (Html Msg) -> Html Msg
card anchor iconName heading children =
    section [ class "card reveal", id anchor ]
        (h2 [ class "card-title" ] [ icon iconName, text heading ] :: children)


chip : String -> Html msg
chip caption =
    span [ class "chip" ] [ text caption ]


pressed : Bool -> Html.Attribute msg
pressed on =
    attribute "aria-pressed"
        (if on then
            "true"

         else
            "false"
        )


code : String -> Html msg
code s =
    Html.code [] [ text s ]



-- VIEW


view : Model -> Html Msg
view model =
    div [ class "page" ]
        [ div [ class "progress", attribute "aria-hidden" "true" ] []
        , viewNavbar model
        , div [ class "layout" ]
            [ viewSidebar model.copied
            , main_ [ class "content" ]
                [ viewAbout ()
                , viewExperience ()
                , lazy viewProjects model.workCat
                , viewHighlights ()
                , viewEduplus model.node
                , viewPublication model.stage model.playing
                , lazy viewCloud model.backupDay
                , lazy viewTools model.toolLang
                , viewBreather ()
                , viewLab model
                , viewPrinciples ()
                , viewSkills ()
                , viewEducationServices ()
                , viewContact ()
                , viewFooter ()
                ]
            ]
        ]



-- NAVBAR


viewNavbar : Model -> Html Msg
viewNavbar model =
    header [ class "navbar" ]
        [ div [ class "nav-inner" ]
            [ a [ class "nav-brand", href "#about" ] [ icon "terminal", text "MD ", span [] [ text "MOJAHED" ] ]
            , nav [ classList [ ( "nav-menu", True ), ( "open", model.menuOpen ) ] ]
                (List.map
                    (\item ->
                        a
                            [ href ("#" ++ item.anchor)
                            , classList [ ( "nav-link", True ), ( "active", item.anchor == model.active ) ]
                            , onClick CloseMenu
                            ]
                            [ text item.label ]
                    )
                    navItems
                )
            , div [ class "nav-actions" ]
                [ a [ class "btn btn-primary btn-cv", href cvUrl, attribute "download" "" ] [ icon "file-arrow-down", text "Download CV" ]
                , button [ class "theme-btn", onClick ToggleTheme ]
                    (if model.dark then
                        [ icon "sun", span [ class "hide-sm" ] [ text "Light" ] ]

                     else
                        [ icon "moon", span [ class "hide-sm" ] [ text "Dark" ] ]
                    )
                , button [ class "menu-btn", onClick ToggleMenu, attribute "aria-label" "Menu" ]
                    [ icon
                        (if model.menuOpen then
                            "xmark"

                         else
                            "bars"
                        )
                    ]
                ]
            ]
        ]



-- SIDEBAR


viewSidebar : String -> Html Msg
viewSidebar copied =
    let
        copyBtn key content =
            button
                [ class "copy-btn"
                , onClick (Copy key content)
                , title "Copy"
                , attribute "aria-label" ("Copy " ++ key)
                ]
                [ icon
                    (if copied == key then
                        "check"

                     else
                        "copy"
                    )
                ]
    in
    aside [ class "sidebar" ]
        [ div [ class "avatar-ring" ] [ img [ class "avatar", src photoUrl, alt fullName, width 150, height 150 ] [] ]
        , h1 [ class "author-name" ] [ text "MD MOJAHEDUL ISLAM" ]
        , p [ class "author-role" ] [ text "CTO & Lead Software Engineer" ]
        , p [ class "author-keys" ] [ text "Laravel • Go • Linux • Security • System Architecture" ]
        , extLink companyUrl [ class "affil" ] [ icon "building", text "Light Technologies" ]
        , ul [ class "side-links" ]
            [ li [] [ extLink githubUrl [] [ brand "github", span [] [ text "GitHub" ] ] ]
            , li [] [ extLink linkedinUrl [] [ brand "linkedin", span [] [ text "LinkedIn" ] ] ]
            , li [] [ extLink upworkUrl [] [ brand "upwork", span [] [ text "Upwork · Top Rated" ] ] ]
            , li [] [ extLink whatsappUrl [] [ brand "whatsapp", span [] [ text "WhatsApp" ] ] ]
            , li [ class "with-copy" ] [ a [ href ("mailto:" ++ email) ] [ icon "envelope", span [ class "ellipsis" ] [ text email ] ], copyBtn "email" email ]
            , li [ class "with-copy" ] [ a [ href "tel:+8801861583588" ] [ icon "phone", span [] [ text phoneDisplay ] ], copyBtn "phone" "+8801861583588" ]
            , li [] [ span [ class "plain" ] [ icon "location-dot", span [] [ text "Dhaka, Bangladesh" ] ] ]
            ]
        , a [ class "btn btn-primary btn-block", href cvUrl, attribute "download" "" ] [ icon "file-arrow-down", text "Download CV (PDF)" ]
        , p [ class "status" ] [ span [ class "pulse" ] [], text "Open to new projects" ]
        , a [ class "side-game", href "game/" ] [ span [] [ text "🦆" ], span [] [ strong [] [ text "Need a breather?" ], small [] [ text "Play Duck Drift, 3 min" ] ] ]
        ]



-- ABOUT (first screen)


viewAbout : () -> Html Msg
viewAbout _ =
    section [ class "card reveal-off", id "about" ]
        [ div [ class "stats" ]
            (List.map
                (\s ->
                    div [ class "stat" ]
                        [ span [ class "stat-value" ] [ text s.value ]
                        , span [ class "stat-label" ] [ text s.label ]
                        ]
                )
                stats
            )
        , h2 [ class "card-title" ] [ icon "user-tie", text "Profile Summary" ]
        , p []
            [ text "I'm the "
            , strong [] [ text "CTO & Lead Software Engineer" ]
            , text " at "
            , extLink companyUrl [] [ text "Light Technologies" ]
            , text ", where I lead the technical vision and every product we ship. That includes the "
            , strong [] [ text "Eduplus" ]
            , text " platform used by schools, colleges and madrasas across Bangladesh, and enterprise systems such as a "
            , strong [] [ text "208-model publication ERP" ]
            , text "."
            ]
        , p []
            [ text "I work across the whole stack. I'll model a double-entry ledger in the morning, write a "
            , strong [] [ text "WebSocket server in Go" ]
            , text " after lunch, and harden the "
            , strong [] [ text "Linux server" ]
            , text " it deploys to before I go home. I'm also a "
            , strong [] [ text "Top Rated freelancer on Upwork" ]
            , text "."
            ]
        , div [ class "focus-grid" ]
            (List.map
                (\f ->
                    div [ class "focus" ]
                        [ span [ class "focus-icon" ] [ icon f.icon ]
                        , h3 [] [ text f.title ]
                        , p [] [ text f.body ]
                        ]
                )
                focusAreas
            )
        , a [ class "scroll-hint", href "#experience" ]
            [ text "That's the short version. Scroll for the long, fun one", span [ class "bounce" ] [ icon "arrow-down" ] ]
        ]



-- EXPERIENCE


viewExperience : () -> Html Msg
viewExperience _ =
    let
        role r =
            div [ classList [ ( "tl-item", True ), ( "current", r.current ) ] ]
                [ h4 []
                    [ text r.title
                    , span
                        [ classList [ ( "date-badge", True ), ( "green", r.current ) ] ]
                        [ text r.period ]
                    ]
                , p [] [ text r.body ]
                , if List.isEmpty r.points then
                    text ""

                  else
                    ul [ class "tl-points" ] (List.map (\pt -> li [] [ text pt ]) r.points)
                ]

        block o =
            div [ class "org-block" ]
                [ div [ class "org-head" ]
                    [ h3 []
                        [ icon o.icon
                        , if String.startsWith "#" o.url then
                            a [ href o.url ] [ text o.name ]

                          else
                            extLink o.url [] [ text o.name ]
                        ]
                    , span [ class "mono-accent" ] [ text o.place ]
                    ]
                , div [ class "timeline" ] (List.map role o.roles)
                ]
    in
    card "experience" "briefcase" "Professional Experience" (List.map block orgs)



-- PROJECTS


viewProjects : WorkCat -> Html Msg
viewProjects current =
    let
        count cat =
            if cat == AllWork then
                List.length works

            else
                List.length (List.filter (\w -> w.cat == cat) works)

        tab cat =
            button
                [ classList [ ( "filter-btn", True ), ( "active", cat == current ) ]
                , onClick (SetWorkCat cat)
                , pressed (cat == current)
                ]
                [ text (workCatName cat ++ " (" ++ String.fromInt (count cat) ++ ")") ]

        visible =
            List.filter (\w -> current == AllWork || w.cat == current) works

        entry w =
            div [ class "pub" ]
                [ h3 [] [ text w.name ]
                , p [ class "pub-venue" ] [ text w.kicker ]
                , p [ class "pub-body" ] [ text w.body ]
                , div [ class "pub-badges" ]
                    (span [ class ("badge-cat cat-" ++ String.toLower (workCatName w.cat)) ] [ icon (catIcon w.cat), text w.badge ]
                        :: List.map chip w.tags
                    )
                ]
    in
    card "projects"
        "diagram-project"
        "Products & Projects"
        [ p [ class "lead" ] [ text "Systems I've architected and led as lead developer at Light Technologies. Most are private client systems, so here is what they do and how they're built rather than links to code." ]
        , div [ class "filters", attribute "role" "group", attribute "aria-label" "Filter projects" ]
            (List.map tab [ AllWork, EduWork, BizWork, PlatformWork ])
        , div [ class "pub-list" ] (List.map entry visible)
        ]


catIcon : WorkCat -> String
catIcon cat =
    case cat of
        EduWork ->
            "graduation-cap"

        BizWork ->
            "briefcase"

        PlatformWork ->
            "server"

        AllWork ->
            "layer-group"



-- HIGHLIGHTS


viewHighlights : () -> Html Msg
viewHighlights _ =
    card "highlights"
        "award"
        "Highlights"
        [ div [ class "hl-grid" ]
            (List.map
                (\h ->
                    div [ class "hl" ]
                        [ span [ class "hl-icon" ] [ icon h.icon ]
                        , div []
                            [ h3 [] [ text h.title ]
                            , p [ class "mono-accent" ] [ text h.sub ]
                            , p [] [ text h.body ]
                            ]
                        ]
                )
                highlights
            )
        ]



-- EDUPLUS ECOSYSTEM (SVG)


viewEduplus : String -> Html Msg
viewEduplus selected =
    let
        current =
            findNode selected

        linked =
            current |> Maybe.map .links |> Maybe.withDefault []

        isHot ( x, y ) =
            x == selected || y == selected

        edgeView index ( x, y ) =
            let
                ( x1, y1 ) =
                    nodePos x

                ( x2, y2 ) =
                    nodePos y

                d =
                    "M" ++ String.fromFloat x1 ++ " " ++ String.fromFloat y1 ++ " L" ++ String.fromFloat x2 ++ " " ++ String.fromFloat y2

                hot =
                    isHot ( x, y )

                packet delay =
                    Svg.circle
                        [ SA.r
                            (if hot then
                                "4.5"

                             else
                                "2.6"
                            )
                        , SA.class "packet"
                        ]
                        [ Svg.animateMotion
                            [ SA.dur
                                (if hot then
                                    "1.6s"

                                 else
                                    "3.4s"
                                )
                            , SA.repeatCount "indefinite"
                            , SA.begin (String.fromFloat delay ++ "s")
                            , SA.path d
                            ]
                            []
                        ]
            in
            Svg.g
                [ SA.class
                    (if hot then
                        "edge hot"

                     else
                        "edge"
                    )
                ]
                (Svg.path [ SA.d d ] []
                    :: (if hot then
                            [ packet 0, packet 0.8 ]

                        else
                            [ packet (toFloat (modBy 7 index) * 0.45) ]
                       )
                )

        nodeView n =
            let
                ( cx, cy ) =
                    nodePos n.key

                isCore =
                    n.key == "core"

                w =
                    if isCore then
                        190

                    else
                        138

                h =
                    if isCore then
                        58

                    else
                        36

                state =
                    if n.key == selected then
                        " selected"

                    else if List.member n.key linked then
                        " linked"

                    else
                        " dim"
            in
            Svg.g
                [ SA.class
                    ("gnode"
                        ++ state
                        ++ (if isCore then
                                " core"

                            else
                                ""
                           )
                    )
                , SA.transform ("translate(" ++ String.fromFloat cx ++ " " ++ String.fromFloat cy ++ ")")
                , SE.onClick (SelectNode n.key)
                , attribute "role" "button"
                , attribute "tabindex" "0"
                , attribute "aria-label" n.name
                ]
                [ Svg.rect
                    [ SA.x (String.fromFloat (-w / 2))
                    , SA.y (String.fromFloat (-h / 2))
                    , SA.width (String.fromFloat w)
                    , SA.height (String.fromFloat h)
                    , SA.rx "10"
                    ]
                    []
                , Svg.text_ [ SA.textAnchor "middle", SA.dy ".35em" ] [ Svg.text n.name ]
                ]

        detail =
            case current of
                Just n ->
                    div [ class "eco-detail", attribute "aria-live" "polite" ]
                        [ span [ class "eco-detail-icon" ] [ icon n.icon ]
                        , div []
                            [ h3 [] [ text n.name ]
                            , p [] [ text n.body ]
                            , p [ class "eco-talks" ]
                                (strong [] [ text "Talks to: " ]
                                    :: List.intersperse (text " ")
                                        (List.map (\k -> button [ class "talk-chip", onClick (SelectNode k) ] [ text (nodeName k) ]) n.links)
                                )
                            ]
                        ]

                Nothing ->
                    text ""
    in
    card "eduplus"
        "circle-nodes"
        "Inside Eduplus"
        [ p [ class "lead" ]
            [ text "Eduplus isn't one app. It's an ecosystem of products and shared services I designed to fit together. Little dots are requests in flight. "
            , strong [] [ text "Click any box" ]
            , text " to see what it does and who it talks to."
            ]
        , div [ class "eco-stage" ]
            [ Svg.svg [ SA.viewBox "0 0 900 505", SA.class "eco-svg", attribute "role" "img", attribute "aria-label" "Map of the Eduplus ecosystem" ]
                [ Svg.g [] (List.indexedMap edgeView ecoEdges)
                , Svg.g [] (List.map nodeView (List.reverse ecoNodes))
                ]
            ]
        , detail
        ]



-- PUBLICATION ERP


viewPublication : Int -> Bool -> Html Msg
viewPublication index playing =
    let
        total =
            List.length stages

        current =
            List.head (List.drop index stages)

        progress =
            toFloat index / toFloat (total - 1) * 100

        station i s =
            button
                [ classList [ ( "station", True ), ( "active", i == index ), ( "done", i < index ) ]
                , onClick (SelectStage i)
                , pressed (i == index)
                , style "left" (String.fromFloat (toFloat i / toFloat (total - 1) * 100) ++ "%")
                ]
                [ span [ class "station-dot" ] [ icon s.icon ]
                , span [ class "station-label" ] [ text s.short ]
                ]

        ledger postings =
            if List.isEmpty postings then
                div [ class "ledger empty" ]
                    [ icon "circle-info", text " No money moves at this stage, but the ledger is already ready for it." ]

            else
                let
                    dr =
                        List.sum (List.map .debit postings)

                    cr =
                        List.sum (List.map .credit postings)

                    amount n =
                        if n == 0 then
                            ""

                        else
                            taka n

                    row pst =
                        div [ classList [ ( "l-row", True ), ( "cr", pst.credit > 0 ) ] ]
                            [ span [ class "l-acc" ] [ text pst.account ]
                            , span [ class "l-num" ] [ text (amount pst.debit) ]
                            , span [ class "l-num" ] [ text (amount pst.credit) ]
                            ]
                in
                div [ class "ledger" ]
                    ([ div [ class "l-row l-head" ] [ span [] [ text "Journal entry · sample" ], span [ class "l-num" ] [ text "Debit" ], span [ class "l-num" ] [ text "Credit" ] ] ]
                        ++ List.map row postings
                        ++ [ div [ class "l-row l-total" ]
                                [ span []
                                    [ if dr == cr then
                                        span [ class "balanced" ] [ icon "scale-balanced", text " Balanced" ]

                                      else
                                        span [] [ text "Unbalanced!" ]
                                    ]
                                , span [ class "l-num" ] [ text (taka dr) ]
                                , span [ class "l-num" ] [ text (taka cr) ]
                                ]
                           ]
                    )
    in
    card "publication"
        "book-open"
        "A Book's Journey Through My ERP"
        [ p [ class "lead" ]
            [ text "I built an ERP for one of Bangladesh's book publishers. It has "
            , strong [] [ text "208 models" ]
            , text " and follows a book from the author's manuscript to the royalty cheque. Press play and watch the book travel, with the double-entry ledger posting as it goes."
            ]
        , div [ class "journey" ]
            [ div [ class "track" ]
                [ div [ class "track-fill", style "width" (String.fromFloat progress ++ "%") ] []
                , div [ class "book-token", style "left" (String.fromFloat progress ++ "%") ] [ icon "book" ]
                ]
            , div [ class "stations" ] (List.indexedMap station stages)
            ]
        , div [ class "journey-controls" ]
            [ button [ class "btn btn-primary", onClick TogglePlay ]
                (if playing then
                    [ icon "pause", text "Pause" ]

                 else if index == total - 1 then
                    [ icon "rotate-right", text "Replay the journey" ]

                 else
                    [ icon "play", text "Play the journey" ]
                )
            , button [ class "btn btn-outline", onClick (SelectStage (index - 1)), disabled (index == 0) ] [ icon "arrow-left" ]
            , button [ class "btn btn-outline", onClick (SelectStage (index + 1)), disabled (index == total - 1) ] [ icon "arrow-right" ]
            , span [ class "mono-accent" ] [ text ("Stage " ++ String.fromInt (index + 1) ++ " / " ++ String.fromInt total) ]
            ]
        , case current of
            Just s ->
                div [ class "stage-grid", attribute "aria-live" "polite" ]
                    [ div [ class "stage-text" ]
                        [ h3 [] [ icon s.icon, text s.title ]
                        , p [] [ text s.body ]
                        , div [ class "models" ] (List.map code s.models)
                        , div [ class "note" ] [ strong [] [ icon "lightbulb", text " Design note: " ], text s.note ]
                        ]
                    , ledger s.postings
                    ]

            Nothing ->
                text ""
        , div [ class "around" ]
            [ h4 [] [ text "Around the book, the rest of the company runs on it too:" ]
            , div [ class "chips" ] (List.map chip aroundTheBook)
            ]
        ]



-- TOOLS


-- CLOUD & BACKUPS


type alias Provider =
    { icon : String
    , isBrand : Bool
    , name : String
    , sub : String
    , items : List String
    }


providers : List Provider
providers =
    [ Provider "aws" True "Amazon Web Services" "Compute, data & delivery" [ "EC2", "RDS", "Elastic Load Balancing", "S3", "Route 53" ]
    , Provider "server" False "Hetzner" "Servers & object storage" [ "Dedicated & cloud servers", "Object Storage (S3-compatible)", "Backup target" ]
    , Provider "network-wired" False "Linode" "Company servers" [ "VPS", "Production hosting" ]
    , Provider "digital-ocean" True "DigitalOcean" "Client projects" [ "Droplets" ]
    , Provider "google" True "Google Cloud" "Compute" [ "Cloud servers" ]
    , Provider "gauge-high" False "WHM / cPanel · HestiaCP" "Hosting fleet" [ "School & client sites", "Automated cPanel accounts", "Let's Encrypt" ]
    ]


backupPipeline : List ( String, String )
backupPipeline =
    [ ( "clock", "cron, nightly" )
    , ( "database", "mysqldump every database" )
    , ( "images", "collect media assets + .backupme files" )
    , ( "file-zipper", "zip the day" )
    , ( "cloud-arrow-up", "aws s3 cp → object storage" )
    , ( "rotate", "rotate: 10 daily, 12 monthly" )
    ]


backupMaxDay : Int
backupMaxDay =
    729


isLeap : Int -> Bool
isLeap y =
    (modBy 4 y == 0 && modBy 100 y /= 0) || modBy 400 y == 0


monthLength : Int -> Int -> Int
monthLength y m =
    case m of
        2 ->
            if isLeap y then
                29

            else
                28

        4 ->
            30

        6 ->
            30

        9 ->
            30

        11 ->
            30

        _ ->
            31


{-| Day 0 is 1 January 2026.
-}
dayToDate : Int -> ( Int, Int, Int )
dayToDate n =
    walkDate 2026 1 n


walkDate : Int -> Int -> Int -> ( Int, Int, Int )
walkDate y m rest =
    let
        len =
            monthLength y m
    in
    if rest < len then
        ( y, m, rest + 1 )

    else if m == 12 then
        walkDate (y + 1) 1 (rest - len)

    else
        walkDate y (m + 1) (rest - len)


pad2 : Int -> String
pad2 n =
    String.padLeft 2 '0' (String.fromInt n)


isoDay : Int -> String
isoDay n =
    let
        ( y, m, d ) =
            dayToDate n
    in
    String.fromInt y ++ "-" ++ pad2 m ++ "-" ++ pad2 d


monthNames : List String
monthNames =
    [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]


{-| Month index 0 is January 2026, named the way the script names files.
-}
monthFile : Int -> String
monthFile i =
    (List.drop (modBy 12 i) monthNames |> List.head |> Maybe.withDefault "")
        ++ "-"
        ++ String.fromInt (2026 + i // 12)


viewCloud : Int -> Html Msg
viewCloud day =
    let
        ( y, m, d ) =
            dayToDate day

        monthsDone =
            (y - 2026) * 12 + (m - 1)

        dailies =
            List.range (max 0 (day - 9)) day

        monthlies =
            List.range (max 0 (monthsDone - 12)) (monthsDone - 1)

        events =
            List.concat
                [ if d == 1 && monthsDone > 0 then
                    [ ( "arrow-up-right-dots", "promoted daily/" ++ isoDay (day - 1) ++ ".zip → monthly/" ++ monthFile (monthsDone - 1) ++ ".zip", "promote" ) ]

                  else
                    []
                , if d == 1 && monthsDone > 12 then
                    [ ( "trash-can", "removed monthly/" ++ monthFile (monthsDone - 13) ++ ".zip (older than 12 months)", "remove" ) ]

                  else
                    []
                , [ ( "cloud-arrow-up", "uploaded daily/" ++ isoDay day ++ ".zip", "upload" ) ]
                , if day >= 10 then
                    [ ( "trash-can", "removed daily/" ++ isoDay (day - 10) ++ ".zip (older than 10 days)", "remove" ) ]

                  else
                    []
                ]

        nextFirst =
            day + monthLength y m - d + 1

        provider pv =
            div [ class "provider" ]
                [ span [ class "provider-icon" ]
                    [ if pv.isBrand then
                        brand pv.icon

                      else
                        icon pv.icon
                    ]
                , div []
                    [ h3 [] [ text pv.name ]
                    , p [ class "mono-accent" ] [ text pv.sub ]
                    , div [ class "chips" ] (List.map chip pv.items)
                    ]
                ]

        step ( ic, label_ ) =
            div [ class "pipe-step" ] [ span [ class "pipe-icon" ] [ icon ic ], span [] [ text label_ ] ]

        file isNew name =
            span [ classList [ ( "zip", True ), ( "new", isNew ) ] ] [ icon "file-zipper", text name ]

        logLine ( ic, msg, kind ) =
            li [ class ("log-" ++ kind) ] [ icon ic, text (" " ++ msg) ]
    in
    card "cloud"
        "cloud"
        "Cloud & Infrastructure"
        [ p [ class "lead" ]
            [ text "I've run production on "
            , strong [] [ text "AWS" ]
            , text " (EC2, RDS, load balancers, S3, Route 53), "
            , strong [] [ text "Hetzner" ]
            , text ", "
            , strong [] [ text "Linode" ]
            , text ", "
            , strong [] [ text "DigitalOcean" ]
            , text " and "
            , strong [] [ text "Google Cloud" ]
            , text ", plus a fleet of WHM/cPanel servers for school and client sites."
            ]
        , div [ class "provider-grid" ] (List.map provider providers)
        , div [ class "lab-box backup" ]
            [ div [ class "lab-head" ]
                [ h3 [] [ icon "shield-heart", text "Backups that survive bad days" ]
                , span [ class "score" ] [ text "10 daily · 12 monthly" ]
                ]
            , p [ class "muted" ]
                [ text "Every night, two Bash jobs on each WHM server dump every MySQL database and collect the media assets (images, PDFs, JSON, audio, video, plus any file a site marks with "
                , code ".backupme"
                , text "). They zip the day and push it off-site to S3-compatible object storage with the AWS CLI. On the 1st of each month, the last daily backup is promoted to "
                , code "monthly/"
                , text ". That keeps 10 days of fine-grained restores and a year of month-ends, at a fraction of the storage."
                ]
            , div [ class "pipeline" ] (List.map step backupPipeline)
            , div [ class "sim" ]
                [ div [ class "sim-head" ]
                    [ span [ class "sim-title" ] [ icon "clock-rotate-left", text " Time-travel the bucket" ]
                    , span [ class "sim-date" ] [ text (isoDay day) ]
                    ]
                , div [ class "sim-controls" ]
                    [ button [ class "btn btn-outline btn-sm", onClick (SetBackupDay (day - 1)), disabled (day == 0) ] [ icon "minus", text "1 day" ]
                    , input
                        [ Html.Attributes.type_ "range"
                        , Html.Attributes.min "0"
                        , Html.Attributes.max (String.fromInt backupMaxDay)
                        , value (String.fromInt day)
                        , onInput (\s -> SetBackupDay (Maybe.withDefault day (String.toInt s)))
                        , class "sim-range"
                        , attribute "aria-label" "Simulated date"
                        ]
                        []
                    , button [ class "btn btn-outline btn-sm", onClick (SetBackupDay (day + 1)), disabled (day == backupMaxDay) ] [ icon "plus", text "1 day" ]
                    , button [ class "btn btn-primary btn-sm", onClick (SetBackupDay nextFirst), disabled (nextFirst > backupMaxDay) ] [ icon "forward", text "Next 1st" ]
                    ]
                , div [ class "bucket" ]
                    [ div [ class "folder" ]
                        [ p [ class "folder-name" ] [ icon "folder-open", text " s3://backups/db-backup/daily/ ", small [] [ text ("(" ++ String.fromInt (List.length dailies) ++ "/10)") ] ]
                        , div [ class "zips" ] (List.map (\n -> file (n == day) (isoDay n ++ ".zip")) (List.reverse dailies))
                        ]
                    , div [ class "folder" ]
                        [ p [ class "folder-name" ] [ icon "folder-open", text " s3://backups/db-backup/monthly/ ", small [] [ text ("(" ++ String.fromInt (List.length monthlies) ++ "/12)") ] ]
                        , if List.isEmpty monthlies then
                            p [ class "muted empty-folder" ] [ text "Empty until the first month completes. Try \"Next 1st\"." ]

                          else
                            div [ class "zips" ] (List.map (\i -> file (d == 1 && i == monthsDone - 1) (monthFile i ++ ".zip")) (List.reverse monthlies))
                        ]
                    ]
                , ul [ class "sim-log", attribute "aria-live" "polite" ] (List.map logLine events)
                ]
            ]
        ]



viewTools : ToolLang -> Html Msg
viewTools current =
    let
        tab lang =
            button
                [ classList [ ( "filter-btn", True ), ( "active", lang == current ) ]
                , onClick (SetToolLang lang)
                , pressed (lang == current)
                ]
                [ text (toolLangName lang) ]

        visible =
            List.filter (\t -> current == AllTools || t.lang == current) tools

        toolCard t =
            div [ class "tool" ]
                [ div [ class "tool-top" ]
                    [ h3 [] [ text t.name ]
                    , span [ class ("lang lang-" ++ String.toLower t.langLabel) ] [ text t.langLabel ]
                    ]
                , p [] [ text t.body ]
                ]
    in
    card "tools"
        "toolbox"
        "Mojahed Dev Suite"
        [ p [ class "lead" ]
            [ text "When the tool I need doesn't exist, or is too heavy, I write it. Most are single binaries with zero runtime dependencies. Some are on "
            , extLink githubUrl [] [ text "GitHub" ]
            , text "."
            ]
        , div
            [ class "upstream" ]
            [ span [ class "upstream-icon" ] [ brand "github" ]
            , span [ class "upstream-text" ]
                [ span [ class "upstream-kicker" ] [ text "Open-source contribution" ]
                , strong [] [ text "HestiaCP: open-source web hosting control panel" ]
                ]
            , span [ class "badge-merged" ] [ icon "code-merge", text "Merged" ]
            ]
        , div [ class "filters" ] (List.map tab [ AllTools, GoLang, PhpLang, WebLang ])
        , div [ class "tool-grid" ] (List.map toolCard visible)
        ]



-- BREATHER (Duck Drift game)


viewBreather : () -> Html Msg
viewBreather _ =
    let
        point ic title body =
            li [] [ span [ class "hl-icon" ] [ icon ic ], div [] [ strong [] [ text title ], p [] [ text body ] ] ]
    in
    card "breather"
        "spa"
        "Take a Breather"
        [ div [ class "breather" ]
            [ div [ class "breather-text" ]
                [ p [ class "lead" ]
                    [ text "Deadline close? Prod on fire? I made "
                    , strong [] [ text "Duck Drift" ]
                    , text ", a 1–3 minute game for developers under pressure. You steer a rubber duck by breathing, and the sky slowly turns from night to sunrise."
                    ]
                , ul [ class "breather-points" ]
                    [ point "wind" "Breathe to play" "Hold to breathe in for 4 seconds, release to breathe out for 6. That's about 6 breaths a minute with a longer exhale, the pace research links to a calmer nervous system."
                    , point "cloud" "Let worries go" "\"merge conflict\", \"CI is red\", \"47 unread on Slack\": drift through each cloud and it bursts into stars with a kinder thought."
                    , point "heart" "No way to lose" "No lives, no game over, every note in harmony. Before and after, you rate how tense you feel."
                    , point "lock" "Stays on your device" "Scores live only in your browser. Save a postcard PNG if you want to share it."
                    ]
                , a [ class "btn btn-primary", href "game/" ] [ icon "play", text "Play Duck Drift" ]
                ]
            , a [ class "breather-art", href "game/", attribute "aria-label" "Play Duck Drift" ]
                [ div [ class "ba-moon" ] []
                , div [ class "ba-path" ] []
                , div [ class "ba-duck" ] [ text "🦆" ]
                , div [ class "ba-cloud" ] [ text "prod is down" ]
                , div [ class "ba-cue" ] [ text "breathe with the duck" ]
                ]
            ]
        ]



-- LAB


viewLab : Model -> Html Msg
viewLab model =
    card "lab"
        "flask"
        "The Lab"
        [ p [ class "lead" ] [ text "Four small things to play with." ]
        , viewQuiz model.quizIndex model.quizAnswers
        , viewAnatomy model.layer
        , viewBangla model.number
        , viewTerminal model
        ]


viewQuiz : Int -> List Int -> Html Msg
viewQuiz index answers =
    let
        total =
            List.length questions

        score =
            List.map2 (\q ans -> q.answer == ans) questions answers
                |> List.filter identity
                |> List.length

        answered =
            List.length answers > index

        chosen =
            List.head (List.drop index answers)
    in
    div [ class "lab-box quiz" ]
        [ div [ class "lab-head" ]
            [ h3 [] [ icon "fire", text "Production Pop Quiz" ]
            , span [ class "score" ] [ text ("Score " ++ String.fromInt score ++ "/" ++ String.fromInt total) ]
            ]
        , if index >= total then
            div [ class "quiz-end" ]
                [ p [ class "big-score" ] [ text (String.fromInt score ++ " / " ++ String.fromInt total) ]
                , p [] [ text (quizVerdict score) ]
                , div [ class "row" ]
                    [ button [ class "btn btn-outline", onClick RestartQuiz ] [ icon "rotate-right", text "Try again" ]
                    , a [ class "btn btn-primary", href "#contact" ] [ icon "paper-plane", text "Get in touch" ]
                    ]
                ]

          else
            case List.head (List.drop index questions) of
                Just q ->
                    div []
                        [ div [ class "quiz-progress" ]
                            (List.indexedMap
                                (\qi _ ->
                                    span
                                        [ classList
                                            [ ( "qp", True )
                                            , ( "now", qi == index )
                                            , ( "past", qi < index )
                                            ]
                                        ]
                                        []
                                )
                                questions
                            )
                        , p [ class "q-prompt" ] [ span [ class "mono-accent" ] [ text ("Q" ++ String.fromInt (index + 1) ++ ". ") ], text q.prompt ]
                        , div [ class "options" ]
                            (List.indexedMap
                                (\oi opt ->
                                    button
                                        [ classList
                                            [ ( "option", True )
                                            , ( "right", answered && oi == q.answer )
                                            , ( "wrong", answered && chosen == Just oi && oi /= q.answer )
                                            ]
                                        , onClick (Answer oi)
                                        , disabled answered
                                        ]
                                        [ span [ class "opt-key" ] [ text (String.fromChar (Char.fromCode (65 + oi))) ], text opt ]
                                )
                                q.options
                            )
                        , if answered then
                            div [ class "why" ]
                                [ p []
                                    [ strong []
                                        [ text
                                            (if chosen == Just q.answer then
                                                "✔ Correct. "

                                             else
                                                "✘ Not quite. "
                                            )
                                        ]
                                    , text q.why
                                    ]
                                , button [ class "btn btn-primary", onClick NextQuestion ]
                                    [ text
                                        (if index == total - 1 then
                                            "See my score"

                                         else
                                            "Next question"
                                        )
                                    , icon "arrow-right"
                                    ]
                                ]

                          else
                            text ""
                        ]

                Nothing ->
                    text ""
        ]


viewAnatomy : Int -> Html Msg
viewAnatomy index =
    let
        current =
            List.head (List.drop index layers)

        layerBtn n l =
            button
                [ classList [ ( "layer", True ), ( "active", n == index ), ( "passed", n < index ) ]
                , onClick (SelectLayer n)
                , pressed (n == index)
                ]
                [ span [ class "layer-icon" ] [ icon l.icon ]
                , span [ class "layer-text" ]
                    [ span [ class "layer-name" ] [ text l.name ]
                    , span [ class "layer-tech" ] [ text l.tech ]
                    ]
                ]
    in
    div [ class "lab-box" ]
        [ div [ class "lab-head" ] [ h3 [] [ icon "route", text "Anatomy of a Request" ] ]
        , p [ class "muted" ] [ text "Every click on a Laravel app travels through these layers. Pick one." ]
        , div [ class "anatomy" ]
            [ div [ class "layers" ] (List.indexedMap layerBtn layers)
            , case current of
                Just l ->
                    div [ class "layer-detail", attribute "aria-live" "polite" ]
                        [ h4 [] [ icon l.icon, text (" " ++ l.name) ]
                        , p [] [ text l.what ]
                        , div [ class "note" ] [ strong [] [ icon "lightbulb", text " Engineering note: " ], text l.note ]
                        , div [ class "row" ]
                            [ button [ class "btn btn-outline btn-sm", onClick (SelectLayer (index - 1)), disabled (index == 0) ] [ icon "arrow-up", text "Up" ]
                            , button [ class "btn btn-primary btn-sm", onClick (SelectLayer (index + 1)), disabled (index == List.length layers - 1) ] [ icon "arrow-down", text "Deeper" ]
                            ]
                        ]

                Nothing ->
                    text ""
            ]
        , div [ class "security-strip" ]
            (span [ class "strip-label" ] [ icon "lock", text " Across every layer:" ] :: List.map chip securityPractices)
        ]


viewBangla : String -> Html Msg
viewBangla raw =
    let
        digits =
            String.filter Char.isDigit raw

        trimmed =
            let
                t =
                    String.foldl
                        (\c acc ->
                            if acc == "" && c == '0' then
                                ""

                            else
                                acc ++ String.fromChar c
                        )
                        ""
                        digits
            in
            if t == "" && digits /= "" then
                "0"

            else
                t

        grouped =
            groupSouthAsian trimmed

        reading =
            if String.length trimmed > 15 then
                "That's beyond what I'd ever invoice. Try something smaller."

            else
                String.toInt trimmed |> Maybe.map readSouthAsian |> Maybe.withDefault ""
    in
    div [ class "lab-box" ]
        [ div [ class "lab-head" ] [ h3 [] [ icon "language", text "Numbers, the Bangladeshi Way" ] ]
        , p [ class "muted" ] [ text "Bangladesh groups digits in lakh and crore, not millions, and writes them in Bangla. Eduplus prints fees, results and receipts this way. Type a number:" ]
        , label [ for "bn-input", class "sr-only" ] [ text "Number" ]
        , input
            [ id "bn-input"
            , class "bn-input"
            , value raw
            , onInput SetNumber
            , attribute "inputmode" "numeric"
            , autocomplete False
            , placeholder "e.g. 12345678"
            ]
            []
        , if trimmed == "" then
            p [ class "muted" ] [ text "Digits only, please." ]

          else
            div [ class "bn-out" ]
                [ div [ class "bn-cell" ] [ small [] [ text "Western" ], span [] [ text (groupWestern trimmed) ] ]
                , div [ class "bn-cell" ] [ small [] [ text "South Asian" ], span [] [ text grouped ] ]
                , div [ class "bn-cell bn-big" ] [ small [] [ text "বাংলা" ], span [] [ text ("৳ " ++ toBanglaDigits grouped) ] ]
                , div [ class "bn-cell bn-wide" ] [ small [] [ text "Read as" ], span [] [ text reading ] ]
                ]
        ]


viewTerminal : Model -> Html Msg
viewTerminal model =
    let
        viewLine l =
            case l.kind of
                Command ->
                    div [ class "t-line" ] [ span [ class "t-prompt" ] [ text "visitor@mojahed:~$ " ], text l.content ]

                Output ->
                    div [ class "t-line t-out" ] [ text l.content ]

                Failure ->
                    div [ class "t-line t-err" ] [ text l.content ]
    in
    div [ class "lab-box" ]
        [ div [ class "lab-head" ] [ h3 [] [ icon "terminal", text "mojahed-shell" ] ]
        , div [ class "terminal" ]
            [ div [ class "t-bar" ]
                [ span [ class "dot d1" ] [], span [ class "dot d2" ] [], span [ class "dot d3" ] [], span [ class "t-title" ] [ text "visitor@mojahed: ~" ] ]
            , div [ class "t-body", attribute "role" "log", attribute "aria-live" "polite" ] (List.map viewLine model.termLines)
            , Html.form [ class "t-input", onSubmit TermSubmit ]
                [ label [ for "t-cmd", class "t-prompt" ] [ text "visitor@mojahed:~$" ]
                , input
                    [ id "t-cmd"
                    , value model.termInput
                    , onInput TermInput
                    , autocomplete False
                    , spellcheck False
                    , attribute "autocapitalize" "off"
                    , attribute "aria-label" "Terminal command"
                    ]
                    []
                ]
            ]
        , div [ class "chips cmd-chips" ] (List.map (\c -> button [ class "chip chip-btn", onClick (RunCommand c) ] [ text c ]) suggestedCommands)
        ]



-- PRINCIPLES


viewPrinciples : () -> Html Msg
viewPrinciples _ =
    card "principles"
        "compass"
        "How I Build"
        [ p [ class "lead" ] [ text "Opinions are cheap, so each one comes with where you can see it in my work." ]
        , div [ class "principles" ]
            (List.map
                (\pr ->
                    div [ class "principle" ]
                        [ span [ class "hl-icon" ] [ icon pr.icon ]
                        , div []
                            [ h3 [] [ text pr.title ]
                            , p [] [ text pr.body ]
                            , p [ class "evidence" ] [ icon "magnifying-glass", text (" Seen in: " ++ pr.evidence) ]
                            ]
                        ]
                )
                principles
            )
        ]



-- SKILLS


viewSkills : () -> Html Msg
viewSkills _ =
    card "skills"
        "laptop-code"
        "Technical Skills Matrix"
        (List.map
            (\g ->
                div [ class "skill-group" ]
                    [ h3 [] [ text (g.title ++ ":") ]
                    , div [ class "chips" ] (List.map (\s -> span [ class "chip chip-blue" ] [ text s ]) g.items)
                    ]
            )
            skillGroups
        )



-- EDUCATION & SERVICES


viewEducationServices : () -> Html Msg
viewEducationServices _ =
    card "education"
        "graduation-cap"
        "Education & Services"
        [ div [ class "org-block" ]
            [ div [ class "org-head" ]
                [ h3 [] [ text "Bachelor of Science in Computer Science & Engineering" ]
                , span [ class "mono-accent" ] [ text "2019 – 2023" ]
                ]
            , p [ class "edu-org" ] [ text "Bangladesh University • Dhaka, Bangladesh" ]
            , p [ class "muted" ] [ text "Most of what's on this page I learned after that, by building it." ]
            ]
        , h3 [ class "sub-title" ] [ text "What I can do for you" ]
        , div [ class "service-grid" ]
            (List.map
                (\s ->
                    div [ class "service" ]
                        [ span [ class "hl-icon" ] [ icon s.icon ]
                        , h4 [] [ text s.title ]
                        , p [] [ text s.body ]
                        ]
                )
                services
            )
        ]



-- CONTACT


viewContact : () -> Html Msg
viewContact _ =
    card "contact"
        "paper-plane"
        "Let's Build Something"
        [ div [ class "contact" ]
            [ div []
                [ p [ class "contact-big" ] [ text "Have a system that needs building, fixing or scaling?" ]
                , p [ class "muted" ] [ text "I usually reply within 2–4 hours during business hours (Dhaka, GMT+6)." ]
                , div [ class "row" ]
                    [ a [ class "btn btn-primary", href ("mailto:" ++ email) ] [ icon "envelope", text "Email me" ]
                    , extLink whatsappUrl [ class "btn btn-outline" ] [ brand "whatsapp", text "WhatsApp" ]
                    , extLink upworkUrl [ class "btn btn-outline" ] [ brand "upwork", text "Hire on Upwork" ]
                    ]
                ]
            , ul [ class "contact-list" ]
                [ li [] [ icon "envelope", a [ href ("mailto:" ++ email) ] [ text email ] ]
                , li [] [ icon "phone", extLink whatsappUrl [] [ text phoneDisplay ] ]
                , li [] [ icon "location-dot", span [] [ text "Dhaka, Bangladesh" ] ]
                , li [] [ brand "github", extLink githubUrl [] [ text "github.com/md-mojahed" ] ]
                ]
            ]
        ]


viewFooter : () -> Html Msg
viewFooter _ =
    footer [ class "footer" ]
        [ p [] [ text ("© 2026 " ++ fullName ++ " • CTO & Lead Software Engineer") ]
        , p [ class "muted" ] [ text "You scrolled all the way down. Thank you!" ]
        ]
