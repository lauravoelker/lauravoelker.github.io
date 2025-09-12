(function(){
  const ids = [
    "preset","orgSize","subModel","regionPlan","entraLevel","identitySource","rbac",
    "topology","connectivity","privDns","policyLevel","allowedRegions","tagSchema","vending","compliance",
    "defender","keys","baseline","monitoring","bcdr","budget","alerts","iac","pipelines","archetype",
    // Guardrails
    "guardDenyPublicIp",
    // AVD
    "avdRegion","avdHostPoolType","avdBalance","avdMaxSessions","avdDomainJoin","avdFslogix",
    "avdPrivateLinks","avdScaling","avdScaleMinHosts","avdScaleMaxHosts","avdPeakStart","avdPeakEnd",
    // AKS
    "aksRegion","aksPrivate","aksCni","aksIngress","aksOutbound","aksZones","aksSysSize","aksSysCount",
    "aksUserSize","aksUserCount","aksWi","aksKvCsi","aksAcr","aksAcrName","aksPolicy","aksNetPolicy","aksPsp",
    // SAP
    "sapRegion","sapPattern","sapHa","sapDb","sapSid","sapAppVm","sapDbVm","sapZones","sapAnf","sapBackup","sapMonitor","sapVnetCidr","sapSubnetApp","sapSubnetDb",
    // APIM
    "apimRegion","apimSku","apimCapacity","apimVnetMode","apimPrivateEndpoints","apimZones","apimMi"
  ];
  const el = Object.fromEntries(ids.map(id=>[id,document.getElementById(id)]));
  const avdSection  = document.getElementById("avdSection");
  const aksSection  = document.getElementById("aksSection");
  const sapSection  = document.getElementById("sapSection");
  const apimSection = document.getElementById("apimSection");

  const out = {
    summary:document.getElementById("summary"),
    bicep:document.getElementById("bicep"),
    tf:document.getElementById("tf"),
    avdBicep:document.getElementById("avdBicep"),
    avdTf:document.getElementById("avdTf"),
    aksBicep:document.getElementById("aksBicep"),
    aksTf:document.getElementById("aksTf"),
    sapBicep:document.getElementById("sapBicep"),
    sapTf:document.getElementById("sapTf"),
    apimBicep:document.getElementById("apimBicep"),
    apimTf:document.getElementById("apimTf"),
    toast:document.getElementById("toast")
  };
  const btn = {
    applyPreset:document.getElementById("applyPreset"),
    generate:document.getElementById("generate"),
    copyBicep:document.getElementById("copyBicep"),
    copyTf:document.getElementById("copyTf"),
    downloadBicep:document.getElementById("downloadBicep"),
    downloadTf:document.getElementById("downloadTf"),
    exportAlz:document.getElementById("exportAlz"),
    exportTfvars:document.getElementById("exportTfvars"),
    downloadAvdBicep:document.getElementById("downloadAvdBicep"),
    downloadAvdTf:document.getElementById("downloadAvdTf"),
    downloadAksBicep:document.getElementById("downloadAksBicep"),
    downloadAksTf:document.getElementById("downloadAksTf"),
    downloadSapBicep:document.getElementById("downloadSapBicep"),
    downloadSapTf:document.getElementById("downloadSapTf"),
    downloadApimBicep:document.getElementById("downloadApimBicep"),
    downloadApimTf:document.getElementById("downloadApimTf"),
    share:document.getElementById("share")
  };

  const presets = { /* … deine komplette presets-Definition aus der Datei … */ };

  function applyPreset(name){
    const p = presets[name];
    Object.entries(p).forEach(([k,v]) => {
      if (!el[k]) return;
      if (el[k].type === "checkbox") el[k].checked = !!v;
      else el[k].value = String(v);
    });
    toggleArchetype(); saveState(); toast("Preset applied");
  }

  function validate(){
    const required = ["orgSize","subModel","topology","connectivity","policyLevel","defender","budget","iac"];
    const missing = required.filter(k=>!el[k].value);
    if(missing.length){ toast("Please fill required fields: " + missing.join(", ")); return false; }

    const a = el.archetype.value;
    if(a==="AVD"){
      const req = ["avdRegion","avdHostPoolType","avdBalance","avdMaxSessions"];
      const miss = req.filter(k=>!el[k].value); if(miss.length){ toast("AVD: please fill " + miss.join(", ")); return false; }
    }
    if(a==="AKS"){
      const req = ["aksRegion","aksCni","aksSysSize","aksSysCount"];
      const miss = req.filter(k=>!el[k].value); if(miss.length){ toast("AKS: please fill " + miss.join(", ")); return false; }
    }
    if(a==="SAP"){
      const req = ["sapRegion","sapPattern","sapDb","sapSid","sapAppVm","sapDbVm","sapVnetCidr","sapSubnetApp","sapSubnetDb"];
      const miss = req.filter(k=>!el[k].value); if(miss.length){ toast("SAP: please fill " + miss.join(", ")); return false; }
      const vnet = el.sapVnetCidr.value.trim(), aC = el.sapSubnetApp.value.trim(), dC = el.sapSubnetDb.value.trim();
      if(!isValidCidr(vnet)) { toast("SAP: VNet CIDR is invalid"); return false; }
      if(!isValidCidr(aC) || !isValidCidr(dC)) { toast("SAP: Subnet CIDR(s) invalid"); return false; }
      if(!subnetWithin(vnet,aC) || !subnetWithin(vnet,dC)) { toast("SAP: Subnets must be inside VNet range"); return false; }
      if(rangesOverlap(cidrToRange(aC), cidrToRange(dC))) { toast("SAP: Subnets overlap"); return false; }
    }
    if(a==="APIM"){
      const req = ["apimRegion","apimSku","apimCapacity","apimVnetMode"];
      const miss = req.filter(k=>!el[k].value); if(miss.length){ toast("APIM: please fill " + miss.join(", ")); return false; }
    }
    return true;
  }

  function buildSummary(s){ /* … unverändert … */ }
  function bicepTemplate(s){ /* … unverändert … */ }
  function tfTemplate(s){ /* … unverändert … */ }
  function avdBicepTemplate(s){ /* … unverändert … */ }
  function avdTfTemplate(s){ /* … unverändert … */ }
  function aksBicepTemplate(s){ /* … unverändert … */ }
  function aksTfTemplate(s){ /* … unverändert … */ }
  function sapBicepTemplate(s){ /* … unverändert … */ }
  function sapTfTemplate(s){ /* … unverändert … */ }
  function apimBicepTemplate(s){ /* … unverändert … */ }
  function apimTfTemplate(s){ /* … unverändert … */ }

  function buildAlzParams(s){ /* … unverändert … */ }
  function buildTfvars(s){ /* … unverändert … */ }

  // CIDR utils
  function ipToInt(ip){ return ip.split('.').reduce((acc,oct)=> (acc<<8) + (parseInt(oct,10)&255), 0)>>>0; }
  function isValidIpv4(ip){ return /^(\d{1,3}\.){3}\d{1,3}$/.test(ip) && ip.split('.').every(n=>+n>=0 && +n<=255); }
  function isValidCidr(c){ const m=c.match(/^(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\/(\d{1,2})$/); if(!m) return false;
    const [,ip,p]=m; const pref=+p; return isValidIpv4(ip) && pref>=0 && pref<=32; }
  function cidrToRange(c){ const [ip,p]=c.split('/'); const base=ipToInt(ip); const pref=Number(p);
    const mask = pref===0 ? 0 : (0xFFFFFFFF << (32 - pref)) >>> 0; const start = (base & mask) >>> 0;
    const size = (pref===32 ? 1 : Math.pow(2, 32 - pref)); const end = (start + size - 1) >>> 0; return [start,end]; }
  function rangeContains(outer, inner){ return inner[0]>=outer[0] && inner[1]<=outer[1]; }
  function rangesOverlap(a,b){ return !(a[1]<b[0] || b[1]<a[0]); }
  function subnetWithin(superCidr, subCidr){ if(!isValidCidr(superCidr) || !isValidCidr(subCidr)) return false;
    return rangeContains(cidrToRange(superCidr), cidrToRange(subCidr)); }

  function apimCompatWarnings(s){
    const msgs=[]; if(s.archetype==="APIM"){
      const sku = (s.apimSku||"").toLowerCase(); const vnet = s.apimVnetMode||"None";
      if(vnet!=="None" && (sku==="basic" || sku==="standard")) msgs.push("APIM: Selected VNet mode may not be supported with this SKU. Please verify SKU/VNet compatibility in docs.");
      if(s.apimPrivateEndpoints==="Yes" && vnet==="None") msgs.push("APIM: Private Endpoints are typically used with VNet modes (External/Internal).");
    } return msgs;
  }

  function generate(){
    if(!validate()) return;
    const s = readState();
    out.summary.textContent   = buildSummary(s);
    out.bicep.textContent     = bicepTemplate(s);
    out.tf.textContent        = tfTemplate(s);
    out.avdBicep.textContent  = avdBicepTemplate(s);
    out.avdTf.textContent     = avdTfTemplate(s);
    out.aksBicep.textContent  = aksBicepTemplate(s);
    out.aksTf.textContent     = aksTfTemplate(s);
    out.sapBicep.textContent  = sapBicepTemplate(s);
    out.sapTf.textContent     = sapTfTemplate(s);
    out.apimBicep.textContent = apimBicepTemplate(s);
    out.apimTf.textContent    = apimTfTemplate(s);
    const hints = apimCompatWarnings(s); if(hints.length) toast(hints[0]);
    toast("Generated");
  }

  function readState(){
    const state = {};
    for (const k in el){
      const node = el[k]; if(!node) continue;
      if(node.type === "checkbox") state[k] = !!node.checked;
      else state[k] = node.value?.trim ? node.value.trim() : node.value;
    }
    return state;
  }
  function writeState(state){
    Object.entries(state).forEach(([k,v])=>{
      if(!el[k]) return;
      if(el[k].type === "checkbox") el[k].checked = !!v;
      else el[k].value = v;
    });
    toggleArchetype();
  }
  function saveState(){ localStorage.setItem("lzgen:v1", JSON.stringify(readState())); }
  function loadState(){
    const hash = location.hash.startsWith("#lz=") ? location.hash.slice(4) : null;
    if(hash){ try{ writeState(JSON.parse(decodeURIComponent(atob(hash)))); toast("Config loaded from link"); return; }catch(e){} }
    const raw = localStorage.getItem("lzgen:v1"); if(raw){ try{ writeState(JSON.parse(raw)); }catch(e){} }
  }

  function toggleArchetype(){
    const a = el.archetype.value;
    avdSection.style.display  = (a==="AVD")  ? "" : "none";
    aksSection.style.display  = (a==="AKS")  ? "" : "none";
    sapSection.style.display  = (a==="SAP")  ? "" : "none";
    apimSection.style.display = (a==="APIM") ? "" : "none";
  }

  function copy(t){ navigator.clipboard.writeText(t).then(()=>toast("Copied")).catch(()=>toast("Copy failed")); }
  function downloadFile(filename, content, type="text/plain"){
    const blob = new Blob([content], {type}); const a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = filename; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(a.href);
  }
  function shareLink(){
    const url = location.origin + location.pathname + "#lz=" + btoa(encodeURIComponent(JSON.stringify(readState())));
    copy(url); toast("Share link copied");
  }
  function toast(msg){ out.toast.textContent = msg; setTimeout(()=>out.toast.textContent="",3000); }

  btn.applyPreset?.addEventListener("click", ()=>applyPreset(el.preset.value));
  btn.generate.addEventListener("click", generate);
  btn.copyBicep.addEventListener("click", ()=>copy(out.bicep.textContent));
  btn.copyTf.addEventListener("click", ()=>copy(out.tf.textContent));
  btn.downloadBicep.addEventListener("click", ()=>downloadFile("caf-ready-lz.bicep", out.bicep.textContent || bicepTemplate(readState())));
  btn.downloadTf.addEventListener("click", ()=>downloadFile("caf-ready-lz.tf", out.tf.textContent || tfTemplate(readState())));
  btn.downloadAvdBicep.addEventListener("click", ()=>downloadFile("application-avd.bicep", out.avdBicep.textContent || avdBicepTemplate(readState())));
  btn.downloadAvdTf.addEventListener("click", ()=>downloadFile("application-avd.tf", out.avdTf.textContent || avdTfTemplate(readState())));
  btn.downloadAksBicep.addEventListener("click", ()=>downloadFile("application-aks.bicep", out.aksBicep.textContent || aksBicepTemplate(readState())));
  btn.downloadAksTf.addEventListener("click", ()=>downloadFile("application-aks.tf", out.aksTf.textContent || aksTfTemplate(readState())));
  btn.downloadSapBicep.addEventListener("click", ()=>downloadFile("application-sap.bicep", out.sapBicep.textContent || sapBicepTemplate(readState())));
  btn.downloadSapTf.addEventListener("click", ()=>downloadFile("application-sap.tf", out.sapTf.textContent || sapTfTemplate(readState())));
  btn.downloadApimBicep.addEventListener("click", ()=>downloadFile("application-apim.bicep", out.apimBicep.textContent || apimBicepTemplate(readState())));
  btn.downloadApimTf.addEventListener("click", ()=>downloadFile("application-apim.tf", out.apimTf.textContent || apimTfTemplate(readState())));
  btn.exportAlz.addEventListener("click", ()=>downloadFile("alz-platform.params.json", JSON.stringify(buildAlzParams(readState()), null, 2), "application/json"));
  btn.exportTfvars.addEventListener("click", ()=> {
    const tfv = buildTfvars(readState());
    const text = Object.entries(tfv).map(([k,v])=>{
      if(Array.isArray(v)) return `${k} = [${v.map(x=>typeof x==="string" ? `"${x}"` : x).join(", ")}]`;
      if(typeof v === "string") return `${k} = "${v}"`;
      return `${k} = ${v}`;
    }).join("\n");
    downloadFile("alz-platform.tfvars", text, "text/plain");
  });
  btn.share.addEventListener("click", shareLink);
  Object.keys(el).forEach(k=> el[k] && el[k].addEventListener("change", ()=>{ saveState(); if(k==="archetype") toggleArchetype(); }));

  loadState();
  if(!localStorage.getItem("lzgen:v1")) applyPreset("starter");
  toggleArchetype();
})();
