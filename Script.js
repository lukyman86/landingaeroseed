// ===== basics =====
const $ = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

$("#year").textContent = new Date().getFullYear();

// ===== smooth scroll for internal links =====
$$('a[href^="#"]').forEach(a=>{
  a.addEventListener("click",(e)=>{
    const id = a.getAttribute("href");
    if(id.length>1){
      e.preventDefault();
      document.querySelector(id)?.scrollIntoView({behavior:"smooth",block:"start"});
    }
  });
});

// ===== countdown (7 days from first load, adjust as needed) =====
const start = Date.now();
const target = start + 7*24*60*60*1000;
const cdEl = $("#countdown");
const tick = ()=>{
  const t = target - Date.now();
  if(t<=0){ cdEl.textContent = "00d : 00h : 00m : 00s"; return clearInterval(tmr); }
  const d = Math.floor(t/86400000);
  const h = Math.floor((t%86400000)/3600000);
  const m = Math.floor((t%3600000)/60000);
  const s = Math.floor((t%60000)/1000);
  cdEl.textContent = `${String(d).padStart(2,"0")}d : ${String(h).padStart(2,"0")}h : ${String(m).padStart(2,"0")}m : ${String(s).padStart(2,"0")}s`;
};
const tmr = setInterval(tick,1000); tick();

// ===== reveal on scroll (timeline items) =====
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add("show"); io.unobserve(e.target); }
  });
},{threshold:.25});
$$(".timeline__item").forEach(el=>io.observe(el));

// ===== i18n toggle =====
const dict = {
  id:{
    nav_presale:"Presale", nav_rewards:"Rewards", nav_roadmap:"Roadmap", nav_contact:"Kontak",
    join_telegram:"Gabung Telegram",
    hero_title:"Tanam Bibit Digital, Panen Token Nyata!",
    hero_sub:"Ekosistem agro-crypto di jaringan Solana. Dapatkan reward Hybrid Seeds Token ($HST) dan ikuti presale AGC.",
    cta_presale:"Ikuti Presale AGC", cta_rewards:"Lihat Rewards HST",
    presale_title:"Presale Token AGC",
    presale_caption:"Harga 1 AGC = <b>0.001 SOL</b> • Maksimal kuota presale: <b>1,000,000 AGC</b>",
    presale_form_title:"Form Pemesanan",
    form_name:"Nama Lengkap", form_email:"Email", form_wallet:"Alamat Wallet Solana", form_amount:"Jumlah AGC",
    btn_buy:"Beli Sekarang",
    form_note:"* Ini simulasi front-end. Integrasi pembayaran on-chain & backend bisa ditambahkan kemudian.",
    presale_info_title:"Info Presale",
    presale_info_1:"Blockchain: Solana (Devnet untuk uji, Mainnet saat rilis)",
    presale_info_2:"Harga tetap: 0.001 SOL per 1 AGC",
    presale_info_3:"Kuota presale: 1,000,000 AGC",
    presale_info_4:"Konfirmasi via email & Telegram",
    presale_countdown:"Hitung mundur presale",
    disclaimer:"Catatan: Konten ini untuk tujuan promosi & pengujian. Lakukan riset mandiri sebelum membeli aset kripto.",
    rewards_title:"Rewards Hybrid Seeds Token ($HST)",
    r1:"Daftar dengan referral: <b>50 HST</b>", r2:"Daftar tanpa referral: <b>15 HST</b>", r3:"Check-in harian: <b>50 HST</b>",
    r4:"Tugas harian: <b>25 HST</b> per tugas", r5:"Bonus referral: <b>100 HST</b>", r6:"Lulus KYC: <b>1000 HST</b>",
    roadmap_title:"Roadmap",
    rm1_t:"Q1 — Foundation", rm1_d:"Riset pasar, desain tokenomics HST/AGC, prototipe aplikasi & landing.",
    rm2_t:"Q2 — Presale & Komunitas", rm2_d:"Presale AGC, program referral, pembentukan AECO Community.",
    rm3_t:"Q3 — App & Wallet", rm3_d:"Rilis AroSeed APK (KYC, chat, rewards), integrasi wallet & bot reward.",
    rm4_t:"Q4 — Mainnet & Listing", rm4_d:"Migrasi 10:1 Devnet→Mainnet HST, burn 9M, target listing DEX.",
    contact_title:"Kontak & Komunitas", contact_desc:"Ikuti kanal resmi kami untuk update pengembangan & jadwal presale.",
    footer_rights:"Semua hak dilindungi.", footer_powered:"Powered by Solana • AECO Community",
  },
  en:{
    nav_presale:"Presale", nav_rewards:"Rewards", nav_roadmap:"Roadmap", nav_contact:"Contact",
    join_telegram:"Join Telegram",
    hero_title:"Plant Digital Seeds, Harvest Real Tokens!",
    hero_sub:"Agro-crypto ecosystem on Solana. Earn Hybrid Seeds Token ($HST) and join the AGC presale.",
    cta_presale:"Join AGC Presale", cta_rewards:"View HST Rewards",
    presale_title:"AGC Token Presale",
    presale_caption:"Price 1 AGC = <b>0.001 SOL</b> • Presale cap: <b>1,000,000 AGC</b>",
    presale_form_title:"Order Form",
    form_name:"Full Name", form_email:"Email", form_wallet:"Solana Wallet Address", form_amount:"AGC Amount",
    btn_buy:"Buy Now",
    form_note:"* Front-end demo only. On-chain payment & backend integration can be added later.",
    presale_info_title:"Presale Info",
    presale_info_1:"Blockchain: Solana (Devnet for testing, Mainnet on release)",
    presale_info_2:"Fixed price: 0.001 SOL per 1 AGC",
    presale_info_3:"Presale quota: 1,000,000 AGC",
    presale_info_4:"Confirmation via email & Telegram",
    presale_countdown:"Presale countdown",
    disclaimer:"Disclaimer: For promotional and testing purposes. Do your own research before buying crypto assets.",
    rewards_title:"Hybrid Seeds Token ($HST) Rewards",
    r1:"Sign up with referral: <b>50 HST</b>", r2:"Sign up without referral: <b>15 HST</b>", r3:"Daily check-in: <b>50 HST</b>",
    r4:"Daily task: <b>25 HST</b> per task", r5:"Referral bonus: <b>100 HST</b>", r6:"KYC passed: <b>1000 HST</b>",
    roadmap_title:"Roadmap",
    rm1_t:"Q1 — Foundation", rm1_d:"Market research, HST/AGC tokenomics, app & landing prototypes.",
    rm2_t:"Q2 — Presale & Community", rm2_d:"AGC presale, referral program, AECO Community formation.",
    rm3_t:"Q3 — App & Wallet", rm3_d:"AroSeed APK release (KYC, chat, rewards), wallet & reward bot integration.",
    rm4_t:"Q4 — Mainnet & Listing", rm4_d:"10:1 Devnet→Mainnet HST migration, 9M burn, target DEX listing.",
    contact_title:"Contact & Community", contact_desc:"Follow our official channels for development updates & presale schedule.",
    footer_rights:"All rights reserved.", footer_powered:"Powered by Solana • AECO Community",
  }
};

let currentLang = "id";
const applyI18n = ()=>{
  $$("[data-i18n]").forEach(el=>{
    const key = el.getAttribute("data-i18n");
    const html = dict[currentLang][key] ?? "";
    if(html) el.innerHTML = html;
  });
};
applyI18n();

$("#langToggle").addEventListener("click", ()=>{
  currentLang = currentLang === "id" ? "en" : "id";
  applyI18n();
});

// ===== form handler (demo) =====
const form = $("#presaleForm");
form.addEventListener("submit", (e)=>{
  e.preventDefault();
  const payload = {
    name: $("#name").value.trim(),
    email: $("#email").value.trim(),
    wallet: $("#wallet").value.trim(),
    amount: Number($("#amount").value)
  };
  if(!payload.name || !payload.email || !payload.wallet || !payload.amount){
    alert(currentLang==="id" ? "Mohon lengkapi semua data." : "Please fill out all fields.");
    return;
  }
  // demo: tampilkan ringkasan
  alert(
    currentLang==="id"
      ? `Terima kasih, ${payload.name}!\nPemesanan: ${payload.amount} AGC.\nKonfirmasi dikirim ke: ${payload.email}.`
      : `Thank you, ${payload.name}!\nOrder: ${payload.amount} AGC.\nConfirmation sent to: ${payload.email}.`
  );
  form.reset();

  // TODO (opsional):
  // - kirim payload ke endpoint backend kamu (fetch POST)
  // - integrasi pembayaran SOL di Solana (Phantom/Backpack) untuk mainnet/devnet
});
