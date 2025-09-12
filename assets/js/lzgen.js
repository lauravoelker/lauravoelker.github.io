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

  const presets = {
    starter:{
      orgSize:"Team", subModel:"Single", regionPlan:"Primary+DR",
      entraLevel:"P1", identitySource:"Cloud only", rbac:"Least privilege",
      topology:"Flat", connectivity:"None", privDns:"Yes",
      policyLevel:"Standard", allowedRegions:"westeurope,northeurope", tagSchema:"CostCenter,Owner,Environment", vending:"Manual", compliance:"None",
      defender:"Essentials", keys:"Platform managed", baseline:"Standard",
      monitoring:"Log Analytics", bcdr:"Azure Backup",
      budget:"1000", alerts:"50,80,100",
      iac:"Bicep", pipelines:"GitHub Actions", archetype:"Foundation",
      // AVD defaults
      avdRegion:"westeurope", avdHostPoolType:"Pooled", avdBalance:"BreadthFirst",
      avdMaxSessions:"12", avdDomainJoin:"Entra ID joined", avdFslogix:"Azure Files",
      avdPrivateLinks:"Yes", avdScaling:"On", avdScaleMinHosts:"1", avdScaleMaxHosts:"5", avdPeakStart:"08:00", avdPeakEnd:"18:00",
      // AKS defaults
      aksRegion:"westeurope", aksPrivate:"Yes", aksCni:"Azure CNI", aksIngress:"Nginx", aksOutbound:"NAT Gateway",
      aksZones:"1,2,3", aksSysSize:"Standard_D4s_v5", aksSysCount:"1", aksUserSize:"Standard_D4s_v5", aksUserCount:"2",
      aksWi:"On", aksKvCsi:"On", aksAcr:"Yes", aksAcrName:"", aksPolicy:"On", aksNetPolicy:"Azure", aksPsp:"baseline",
      // SAP defaults
      sapRegion:"westeurope", sapPattern:"Three-tier", sapHa:"Full", sapDb:"HANA", sapSid:"PRD",
      sapAppVm:"Standard_D8s_v5", sapDbVm:"Standard_E16ds_v5", sapZones:"1,2,3", sapAnf:"Yes", sapBackup:"ANF Snapshots",
      sapMonitor:"On", sapVnetCidr:"10.40.0.0/16", sapSubnetApp:"10.40.1.0/24", sapSubnetDb:"10.40.2.0/24",
      // APIM defaults
      apimRegion:"westeurope", apimSku:"Developer", apimCapacity:"1", apimVnetMode:"None",
      apimPrivateEndpoints:"No", apimZones:"1,2,3", apimMi:"On"
    },
    regulated:{
      orgSize:"Enterprise", subModel:"Multi", regionPlan:"Primary+DR",
      entraLevel:"P2", identitySource:"Hybrid (AD Connect)", rbac:"Owner restricted",
      topology:"Hub-and-Spoke", connectivity:"Site-to-Site VPN", privDns:"Yes",
      policyLevel:"Strict", allowedRegions:"westeurope,northeurope", tagSchema:"CostCenter,Owner,Environment,DataClass", vending:"Automated", compliance:"ISO27001",
      defender:"Full", keys:"Customer managed", baseline:"High",
      monitoring:"Log Analytics + SIEM", bcdr:"Azure Backup + ASR",
      budget:"5000", alerts:"50,75,90,100",
      iac:"Bicep", pipelines:"Azure DevOps", archetype:"APIM",
      // AVD
      avdRegion:"westeurope", avdHostPoolType:"Pooled", avdBalance:"DepthFirst", avdMaxSessions:"10", avdDomainJoin:"AD DS (hybrid) joined", avdFslogix:"Azure Files", avdPrivateLinks:"Yes", avdScaling:"On", avdScaleMinHosts:"2", avdScaleMaxHosts:"10", avdPeakStart:"08:00", avdPeakEnd:"18:00",
      // AKS
      aksRegion:"westeurope", aksPrivate:"Yes", aksCni:"Azure CNI", aksIngress:"AGIC", aksOutbound:"NAT Gateway",
      aksZones:"1,2", aksSysSize:"Standard_D4s_v5", aksSysCount:"2", aksUserSize:"Standard_D8s_v5", aksUserCount:"3",
      aksWi:"On", aksKvCsi:"On", aksAcr:"Yes", aksAcrName:"", aksPolicy:"On", aksNetPolicy:"Azure", aksPsp:"restricted",
      // SAP
      sapRegion:"westeurope", sapPattern:"Three-tier", sapHa:"Full", sapDb:"HANA", sapSid:"QAS",
      sapAppVm:"Standard_D8s_v5", sapDbVm:"Standard_E32ds_v5", sapZones:"1,2", sapAnf:"Yes", sapBackup:"ANF Snapshots",
      sapMonitor:"On", sapVnetCidr:"10.50.0.0/16", sapSubnetApp:"10.50.1.0/24", sapSubnetDb:"10.50.2.0/24",
      // APIM
      apimRegion:"westeurope", apimSku:"Standard", apimCapacity:"1", apimVnetMode:"Internal",
      apimPrivateEndpoints:"Yes", apimZones:"1,2", apimMi:"On"
    },
    enterprise:{
      orgSize:"Enterprise", subModel:"Multi", regionPlan:"Multi region",
      entraLevel:"P2", identitySource:"Hybrid (AD Connect)", rbac:"Least privilege",
      topology:"Hub-and-Spoke", connectivity:"ExpressRoute", privDns:"Yes",
      policyLevel:"Standard", allowedRegions:"westeurope,northeurope", tagSchema:"CostCenter,Owner,Environment,BusinessUnit", vending:"Automated", compliance:"MCSB",
      defender:"Full", keys:"Platform managed", baseline:"High",
      monitoring:"Log Analytics + SIEM", bcdr:"Azure Backup + ASR",
      budget:"8000", alerts:"50,80,100",
      iac:"Terraform", pipelines:"Azure DevOps", archetype:"AKS",
      // AVD
      avdRegion:"westeurope", avdHostPoolType:"Pooled", avdBalance:"BreadthFirst", avdMaxSessions:"16", avdDomainJoin:"Entra ID joined", avdFslogix:"Azure NetApp Files", avdPrivateLinks:"Yes", avdScaling:"On", avdScaleMinHosts:"3", avdScaleMaxHosts:"20", avdPeakStart:"07:30", avdPeakEnd:"19:00",
      // AKS
      aksRegion:"westeurope", aksPrivate:"Yes", aksCni:"Azure CNI", aksIngress:"AGIC", aksOutbound:"NAT Gateway",
      aksZones:"1,2,3", aksSysSize:"Standard_D4s_v5", aksSysCount:"3", aksUserSize:"Standard_D8s_v5", aksUserCount:"6",
      aksWi:"On", aksKvCsi:"On", aksAcr:"Yes", aksAcrName:"", aksPolicy:"On", aksNetPolicy:"Azure", aksPsp:"restricted",
      // SAP
      sapRegion:"westeurope", sapPattern:"Three-tier", sapHa:"Full", sapDb:"HANA", sapSid:"PRD",
      sapAppVm:"Standard_D16s_v5", sapDbVm:"Standard_M32ts", sapZones:"1,2,3", sapAnf:"Yes", sapBackup:"ANF Snapshots",
      sapMonitor:"On", sapVnetCidr:"10.60.0.0/16", sapSubnetApp:"10.60.1.0/24", sapSubnetDb:"10.60.2.0/24",
      // APIM
      apimRegion:"westeurope", apimSku:"Premium", apimCapacity:"2", apimVnetMode:"Internal",
      apimPrivateEndpoints:"Yes", apimZones:"1,2,3", apimMi:"On"
    }
  };

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
      // CIDR validations
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

  function buildSummary(s){
    const lines = [];
    lines.push(`Model: ${s.subModel}, Topology: ${s.topology}, Regions: ${s.regionPlan}`);
    lines.push(`Identity: ${s.identitySource} (${s.entraLevel}), RBAC: ${s.rbac}`);
    lines.push(`Connectivity: ${s.connectivity}, Private DNS: ${s.privDns}`);
    lines.push(`Policy level: ${s.policyLevel}, Allowed regions: ${s.allowedRegions||"not restricted"}`);
    lines.push(`Tags: ${s.tagSchema}, Compliance: ${s.compliance}`);
    lines.push(`Security: Defender=${s.defender}, Baseline=${s.baseline}, Keys=${s.keys}`);
    lines.push(`Ops: Monitoring=${s.monitoring}, BCDR=${s.bcdr}`);
    lines.push(`Cost: Budget=${s.budget}€, Alerts=${s.alerts}`);
    lines.push(`Automation: IaC=${s.iac}, Pipeline=${s.pipelines}, Archetype=${s.archetype}`);
    if(s.subModel==="Multi"){
      lines.push(`MG suggestion: Tenant Root -> Platform, LandingZones, Sandbox`);
      lines.push(`Suggested subscriptions: Connectivity, Identity, Management, Workload spokes`);
    } else {
      lines.push(`Suggestion: Single subscription with clear RG split for platform and workloads`);
    }
    if(s.archetype==="AVD"){
      lines.push(`AVD: ${s.avdHostPoolType} host pool in ${s.avdRegion}, ${s.avdBalance} balancing, max ${s.avdMaxSessions}/host, FSLogix=${s.avdFslogix}, Join=${s.avdDomainJoin}, PrivateLinks=${s.avdPrivateLinks}, Scaling=${s.avdScaling} (${s.avdScaleMinHosts}-${s.avdScaleMaxHosts}, ${s.avdPeakStart}-${s.avdPeakEnd})`);
    }
    if(s.archetype==="AKS"){
      lines.push(`AKS: ${s.aksPrivate==="Yes"?"private":"public"} cluster in ${s.aksRegion}, ${s.aksCni}, ingress=${s.aksIngress}, egress=${s.aksOutbound}, zones=[${s.aksZones}]; system ${s.aksSysCount}×${s.aksSysSize}, user ${s.aksUserCount}×${s.aksUserSize}; WI=${s.aksWi}, KV CSI=${s.aksKvCsi}, ACR=${s.aksAcr}${s.aksAcr==="Yes"&&s.aksAcrName?`(${s.aksAcrName})`:""}, Policy=${s.aksPolicy}, NetPolicy=${s.aksNetPolicy}, PSP=${s.aksPsp}`);
    }
    if(s.archetype==="SAP"){
      lines.push(`SAP: ${s.sapPattern} in ${s.sapRegion}, DB=${s.sapDb}, HA=${s.sapHa}, SID=${s.sapSid}, zones=[${s.sapZones}], ANF=${s.sapAnf}, Backup=${s.sapBackup}, Monitor=${s.sapMonitor}`);
    }
    if(s.archetype==="APIM"){
      lines.push(`APIM: ${s.apimSku} x${s.apimCapacity} in ${s.apimRegion}, VNet=${s.apimVnetMode}, PrivateEndpoints=${s.apimPrivateEndpoints}, zones=[${s.apimZones}], MI=${s.apimMi}`);
    }
    return lines.join("\n");
  }

  // Platform templates
  function bicepTemplate(s){
    return `// CAF Ready Bicep Starter (platform)
targetScope = 'subscription'
param location string = 'westeurope'
param monthlyBudget int = ${Number(s.budget)||1000}
param thresholds array = [${(s.alerts||"50,80,100").split(",").map(x=>Number(x.trim())).join(", ")}]
resource rg_mgmt 'Microsoft.Resources/resourceGroups@2024-03-01' = { name: 'rg-mgmt' location: location }
${s.topology==="Hub-and-Spoke" ? "resource rg_network 'Microsoft.Resources/resourceGroups@2024-03-01' = { name: 'rg-network-hub' location: location }" : "// flat topology"}

// Guardrail: Deny Public IP (custom Policy) 
${s.guardDenyPublicIp ? `
resource denyPipDef 'Microsoft.Authorization/policyDefinitions@2021-06-01' = {
  name: 'deny-public-ip'
  properties: {
    policyType: 'Custom'
    mode: 'All'
    displayName: 'Deny creation of Public IP addresses'
    policyRule: {
      if: { field: 'type', equals: 'Microsoft.Network/publicIPAddresses' }
      then: { effect: 'Deny' }
    }
  }
}
resource denyPipAssign 'Microsoft.Authorization/policyAssignments@2022-06-01' = {
  name: 'deny-public-ip-assignment'
  properties: {
    displayName: 'Deny Public IPs'
    policyDefinitionId: denyPipDef.id
  }
}
` : `// Guardrail: Deny Public IP disabled`}
`;
  }

  function tfTemplate(s){
    return `# CAF Ready Terraform Starter (platform)
terraform { required_providers { azurerm = { source = "hashicorp/azurerm" version = "~> 3.112" } } }
provider "azurerm" { features {} }
variable "location" { type = string, default = "westeurope" }
resource "azurerm_resource_group" "rg_mgmt" { name="rg-mgmt" location=var.location }
${s.topology==="Hub-and-Spoke" ? 'resource "azurerm_resource_group" "rg_network_hub" { name="rg-network-hub" location=var.location }' : "# flat topology"}
`;
  }

  // AVD templates
  function avdBicepTemplate(s){ if(s.archetype!=="AVD") return "// Select 'AVD' archetype."; return `// AVD minimal sample in ${s.avdRegion||"westeurope"}
param location string='${s.avdRegion||"westeurope"}'
resource rg_avd 'Microsoft.Resources/resourceGroups@2024-03-01' = { name:'rg-avd' location:location }
resource hp 'Microsoft.DesktopVirtualization/hostPools@2022-09-09' = { name:'hp-avd' location:location properties:{ hostPoolType:'${s.avdHostPoolType||"Pooled"}' loadBalancerType:'${s.avdBalance||"BreadthFirst"}' maxSessionLimit:${Number(s.avdMaxSessions)||12} preferredAppGroupType:'Desktop' startVmOnConnect:true } }
`; }
  function avdTfTemplate(s){ if(s.archetype!=="AVD") return "# Select 'AVD' archetype."; return `terraform { required_providers { azurerm = { source="hashicorp/azurerm" version="~> 3.112" } } }
provider "azurerm" { features {} }
variable "location" { type=string, default="${s.avdRegion||"westeurope"}" }
resource "azurerm_resource_group" "rg_avd" { name="rg-avd" location=var.location }
resource "azurerm_virtual_desktop_host_pool" "hp" { name="hp-avd" location=var.location resource_group_name=azurerm_resource_group.rg_avd.name type="${(s.avdHostPoolType||"Pooled")}" load_balancer_type="${s.avdBalance||"BreadthFirst"}" maximum_sessions_allowed=${Number(s.avdMaxSessions)||12} preferred_app_group_type="Desktop" start_vm_on_connect=true }
`; }

  // AKS templates
  function aksBicepTemplate(s){
    if(s.archetype!=="AKS") return "// Select 'AKS' archetype.";
    const zones = (s.aksZones||"").split(",").map(x=>x.trim()).filter(Boolean).map(z=>`'${z}'`).join(", ");
    const egress = s.aksOutbound==="NAT Gateway" ? "userDefinedRouting" : "loadBalancer";
    return `// AKS minimal sample in ${s.aksRegion||"westeurope"}
param location string='${s.aksRegion||"westeurope"}'
resource rg_aks 'Microsoft.Resources/resourceGroups@2024-03-01' = { name:'rg-aks' location:location }
resource aks 'Microsoft.ContainerService/managedClusters@2024-02-01' = {
  name: 'aks-cluster'
  location: location
  properties: {
    dnsPrefix: 'aksdemo'
    apiServerAccessProfile: { enablePrivateCluster: ${s.aksPrivate==="Yes"} }
    networkProfile: {
      networkPlugin: 'azure'
      networkPluginMode: '${s.aksCni==="CNI Overlay" ? "overlay" : "none"}'
      networkPolicy: '${(s.aksNetPolicy||"Azure").toLowerCase()}'
      outboundType: '${egress}'
    }
    identity: { type: 'SystemAssigned' }
    securityProfile: { workloadIdentity: { enabled: ${s.aksWi==="On"} } }
    addonProfiles: {
      azureKeyvaultSecretsProvider: { enabled: ${s.aksKvCsi==="On"} }
      ingressApplicationGateway: { enabled: ${s.aksIngress==="AGIC"} }
    }
    agentPoolProfiles: [
      { name:'sys', mode:'System', count:${Number(s.aksSysCount)||1}, vmSize:'${s.aksSysSize||"Standard_D4s_v5"}', availabilityZones:[${zones}] }
      ${Number(s.aksUserCount||0)>0 ? `,{ name:'user', mode:'User', count:${Number(s.aksUserCount)}, vmSize:'${s.aksUserSize||"Standard_D4s_v5"}', availabilityZones:[${zones}] }` : ``}
    ]
  }
}
// Notes: ACR (${s.aksAcr}${s.aksAcr==="Yes"&&s.aksAcrName?` - ${s.aksAcrName}`:""}), AKS Policy (${s.aksPolicy}), Pod Security=${s.aksPsp}
`;
  }
  function aksTfTemplate(s){
    if(s.archetype!=="AKS") return "# Select 'AKS' archetype.";
    const zones = (s.aksZones||"").split(",").map(x=>`"${x.trim()}"`).filter(Boolean).join(", ");
    const egress = s.aksOutbound==="NAT Gateway" ? "userDefinedRouting" : "loadBalancer";
    const networkPluginMode = s.aksCni==="CNI Overlay" ? "overlay" : "none";
    return `terraform { required_providers { azurerm = { source="hashicorp/azurerm" version="~> 3.112" } } }
provider "azurerm" { features {} }
variable "location" { type=string, default="${s.aksRegion||"westeurope"}" }
resource "azurerm_resource_group" "rg_aks" { name="rg-aks" location=var.location }
resource "azurerm_kubernetes_cluster" "aks" {
  name="aks-cluster" location=var.location resource_group_name=azurerm_resource_group.rg_aks.name dns_prefix="aksdemo"
  private_cluster_enabled = ${s.aksPrivate==="Yes"}
  default_node_pool { name="sys" vm_size="${s.aksSysSize||"Standard_D4s_v5"}" node_count=${Number(s.aksSysCount)||1} zones=[${zones}] }
  identity { type="SystemAssigned" }
  network_profile { network_plugin="azure" network_plugin_mode="${networkPluginMode}" network_policy="${(s.aksNetPolicy||"Azure").toLowerCase()}" outbound_type="${egress}" }
  key_vault_secrets_provider { secret_rotation_enabled = ${s.aksKvCsi==="On"} }
  workload_identity_enabled = ${s.aksWi==="On"}
}
${Number(s.aksUserCount||0)>0 ? `resource "azurerm_kubernetes_cluster_node_pool" "user" { name="user" kubernetes_cluster_id=azurerm_kubernetes_cluster.aks.id vm_size="${s.aksUserSize||"Standard_D4s_v5"}" node_count=${Number(s.aksUserCount)||2} zones=[${zones}] }` : `# no user node pool`}

# If ACR integration = Yes and name provided:
# - Grant AcrPull to AKS kubelet identity
# ACR name: ${s.aksAcr==="Yes" ? (s.aksAcrName||"(missing)") : "disabled"}
`;
  }

  // SAP templates
  function sapBicepTemplate(s){
    if(s.archetype!=="SAP") return "// Select 'SAP' archetype.";
    const zones = (s.sapZones||"").split(",").map(x=>`'${x.trim()}'`).filter(Boolean).join(", ");
    return `// SAP Landing Zone scaffold in ${s.sapRegion||"westeurope"}
param location string='${s.sapRegion||"westeurope"}'
resource rg_sap 'Microsoft.Resources/resourceGroups@2024-03-01' = { name:'rg-sap-${(s.sapSid||"SID").toLowerCase()}' location:location }
resource vnet_sap 'Microsoft.Network/virtualNetworks@2023-11-01' = {
  name: 'vnet-sap'
  location: location
  properties: {
    addressSpace: { addressPrefixes: [ '${s.sapVnetCidr||"10.40.0.0/16"}' ] }
    subnets: [
      { name:'app', properties:{ addressPrefix:'${s.sapSubnetApp||"10.40.1.0/24"}' } }
      { name:'db',  properties:{ addressPrefix:'${s.sapSubnetDb||"10.40.2.0/24"}' } }
    ]
  }
}
${s.sapAnf==="Yes" ? `// ANF volumes for /usr/sap, /sapmnt etc. – define as needed` : `// Using managed disks`}
 // Pattern: ${s.sapPattern}, DB: ${s.sapDb}, HA: ${s.sapHa}, Zones:[${zones}]
 // VM sizes: App=${s.sapAppVm}, DB=${s.sapDbVm}
 // Backup: ${s.sapBackup}, SAP Monitor: ${s.sapMonitor}
 // Use SAP workload modules for full deployment (ASCS/ERS, HANA, etc.)
`;
  }
  function sapTfTemplate(s){
    if(s.archetype!=="SAP") return "# Select 'SAP' archetype.";
    return `terraform { required_providers { azurerm = { source="hashicorp/azurerm" version="~> 3.112" } } }
provider "azurerm" { features {} }
variable "location" { type=string, default="${s.sapRegion||"westeurope"}" }
resource "azurerm_resource_group" "rg_sap" { name = "rg-sap-${(s.sapSid||"SID").toLowerCase()}" location = var.location }
resource "azurerm_virtual_network" "vnet_sap" { name="vnet-sap" location=var.location resource_group_name=azurerm_resource_group.rg_sap.name address_space=["${s.sapVnetCidr||"10.40.0.0/16"}"] }
resource "azurerm_subnet" "sub_app" { name="app" resource_group_name=azurerm_resource_group.rg_sap.name virtual_network_name=azurerm_virtual_network.vnet_sap.name address_prefixes=["${s.sapSubnetApp||"10.40.1.0/24"}"] }
resource "azurerm_subnet" "sub_db"  { name="db"  resource_group_name=azurerm_resource_group.rg_sap.name virtual_network_name=azurerm_virtual_network.vnet_sap.name address_prefixes=["${s.sapSubnetDb||"10.40.2.0/24"}"] }
# Pattern: ${s.sapPattern}, DB: ${s.sapDb}, HA: ${s.sapHa}, SID: ${s.sapSid}
# VM sizes: App=${s.sapAppVm}, DB=${s.sapDbVm}
# Backup: ${s.sapBackup}, SAP Monitor: ${s.sapMonitor}
# Use official SAP on Azure modules for full build-out.
`;
  }

  // APIM templates
  function apimBicepTemplate(s){
    if(s.archetype!=="APIM") return "// Select 'APIM' archetype.";
    const zones = (s.apimZones||"").split(",").map(x=>`'${x.trim()}'`).filter(Boolean).join(", ");
    const vnetMode = s.apimVnetMode;
    return `// APIM in ${s.apimRegion||"westeurope"}
param location string='${s.apimRegion||"westeurope"}'
resource rg_apim 'Microsoft.Resources/resourceGroups@2024-03-01' = { name:'rg-apim' location:location }
resource apim 'Microsoft.ApiManagement/service@2022-08-01' = {
  name: 'apim-${(s.apimSku||"Developer").toLowerCase()}'
  location: location
  sku: { name: '${s.apimSku||"Developer"}', capacity: ${Number(s.apimCapacity)||1} }
  zones: [${zones}]
  identity: { type: ${s.apimMi==="On" ? "'SystemAssigned'" : "'None'"} }
  properties: {
    publisherEmail: 'owner@example.com'
    publisherName: 'Owner'
    virtualNetworkType: '${vnetMode==="None" ? "None" : (vnetMode==="Internal" ? "Internal" : "External")}'
    ${vnetMode==="None" ? "" : `virtualNetworkConfiguration: { subnetResourceId: '/subscriptions/<subId>/resourceGroups/<rg>/providers/Microsoft.Network/virtualNetworks/<vnet>/subnets/<subnet>' }`}
  }
}
${s.apimPrivateEndpoints==="Yes" ? `// Add Private Endpoints to portal/management/gateway per your design` : `// No private endpoints`}
`;
  }
  function apimTfTemplate(s){
    if(s.archetype!=="APIM") return "# Select 'APIM' archetype.";
    const vnetType = s.apimVnetMode==="None" ? "None" : (s.apimVnetMode==="Internal" ? "Internal" : "External");
    return `terraform { required_providers { azurerm = { source="hashicorp/azurerm" version="~> 3.112" } } }
provider "azurerm" { features {} }
variable "location" { type=string, default="${s.apimRegion||"westeurope"}" }
resource "azurerm_resource_group" "rg_apim" { name="rg-apim" location=var.location }
resource "azurerm_api_management" "apim" {
  name                = "apim-${(s.apimSku||"Developer").toLowerCase()}"
  location            = var.location
  resource_group_name = azurerm_resource_group.rg_apim.name
  publisher_name      = "Owner"
  publisher_email     = "owner@example.com"
  sku_name            = "${(s.apimSku||"Developer")}_${Number(s.apimCapacity)||1}"
  virtual_network_type = "${vnetType}"
  identity { type = ${s.apimMi==="On" ? '"SystemAssigned"' : '"None"'} }
  ${vnetType!=="None" ? 'virtual_network_configuration { subnet_id = "/subscriptions/<subId>/resourceGroups/<rg>/providers/Microsoft.Network/virtualNetworks/<vnet>/subnets/<subnet>" }' : ""}
}
# For private endpoints (${s.apimPrivateEndpoints}): add azurerm_private_endpoint for gateway/management/portal.
`;
  }

  // Exports
  function buildAlzParams(s){
    const allowRegions = (s.allowedRegions||"").split(",").map(x=>x.trim()).filter(Boolean);
    const thresholds = (s.alerts||"50,80,100").split(",").map(x=>Number(x.trim())).filter(n=>!Number.isNaN(n));
    const tags = (s.tagSchema||"").split(",").map(x=>x.trim()).filter(Boolean);

    const base = {
      locationDefault: "westeurope",
      managementGroups: { root:"Tenant Root", platform:"Platform", landingZones:"LandingZones", sandbox:"Sandbox" },
      subscriptionModel: s.subModel,
      network: { topology:s.topology, connectivity:s.connectivity, privateDnsResolver: s.privDns==="Yes" },
      governance: { policyLevel:s.policyLevel, allowedRegions:allowRegions, tags, vending:s.vending, compliance:s.compliance },
      security: { defenderPlan:s.defender, baseline:s.baseline, keyManagement:s.keys },
      cost: { monthlyBudget: Number(s.budget)||0, thresholds },
      automation: { iac:s.iac, pipeline:s.pipelines }
    };

    if(s.archetype==="AVD"){
      base.application = {
        type: "AVD",
        avd: {
          region: s.avdRegion, hostPoolType: s.avdHostPoolType, loadBalancer: s.avdBalance,
          maxSessions: Number(s.avdMaxSessions)||12, joinType: s.avdDomainJoin, fslogix: s.avdFslogix,
          privateLinks: s.avdPrivateLinks==="Yes", scaling: s.avdScaling==="On",
          scaleMinHosts: Number(s.avdScaleMinHosts)||1, scaleMaxHosts: Number(s.avdScaleMaxHosts)||5,
          peakStart: s.avdPeakStart, peakEnd: s.avdPeakEnd
        }
      };
    }
    if(s.archetype==="AKS"){
      base.application = {
        type: "AKS",
        aks: {
          region: s.aksRegion, privateCluster: s.aksPrivate==="Yes", cni: s.aksCni,
          ingress: s.aksIngress, outbound: s.aksOutbound, zones: (s.aksZones||"").split(",").map(x=>x.trim()).filter(Boolean),
          sysNode: { size: s.aksSysSize, count: Number(s.aksSysCount)||1 },
          userNode: { size: s.aksUserSize, count: Number(s.aksUserCount)||0 },
          workloadIdentity: s.aksWi==="On", kvCsi: s.aksKvCsi==="On", acr: s.aksAcr==="Yes",
          acrName: s.aksAcrName || "",
          policy: s.aksPolicy==="On", networkPolicy: s.aksNetPolicy, podSecurity: s.aksPsp
        }
      };
    }
    if(s.archetype==="SAP"){
      base.application = {
        type: "SAP",
        sap: {
          region: s.sapRegion, pattern: s.sapPattern, ha: s.sapHa, db: s.sapDb, sid: s.sapSid,
          appVm: s.sapAppVm, dbVm: s.sapDbVm, zones: (s.sapZones||"").split(",").map(x=>x.trim()).filter(Boolean),
          anf: s.sapAnf==="Yes", backup: s.sapBackup, monitor: s.sapMonitor==="On",
          vnet: { cidr: s.sapVnetCidr, subnets: { app: s.sapSubnetApp, db: s.sapSubnetDb } }
        }
      };
    }
    if(s.archetype==="APIM"){
      base.application = {
        type: "APIM",
        apim: {
          region: s.apimRegion, sku: s.apimSku, capacity: Number(s.apimCapacity)||1,
          vnetMode: s.apimVnetMode, privateEndpoints: s.apimPrivateEndpoints==="Yes",
          zones: (s.apimZones||"").split(",").map(x=>x.trim()).filter(Boolean), managedIdentity: s.apimMi==="On"
        }
      };
    }
    return base;
  }

  function buildTfvars(s){
    const p = buildAlzParams(s);
    const flat = {
      location_default: p.locationDefault,
      mg_root: p.managementGroups.root,
      mg_platform: p.managementGroups.platform,
      mg_landingzones: p.managementGroups.landingZones,
      mg_sandbox: p.managementGroups.sandbox,
      subscription_model: p.subscriptionModel,
      network_topology: p.network.topology,
      network_connectivity: p.network.connectivity,
      private_dns_resolver: p.network.privateDnsResolver,
      policy_level: p.governance.policyLevel,
      allowed_regions: p.governance.allowedRegions || [],
      tag_schema: p.governance.tags || [],
      subscription_vending: p.governance.vending,
      compliance_pack: p.governance.compliance,
      defender_plan: p.security.defenderPlan,
      security_baseline: p.security.baseline,
      key_management: p.security.keyManagement,
      monthly_budget: p.cost.monthlyBudget,
      budget_thresholds: p.cost.thresholds,
      iac_tool: p.automation.iac,
      pipeline_tool: p.automation.pipeline
    };
    if(p.application?.type==="AVD"){ flat.avd_enabled = true; }
    if(p.application?.type==="AKS"){
      const a = p.application.aks;
      flat.aks_enabled = true;
      flat.aks_region = a.region; flat.aks_private_cluster = a.privateCluster; flat.aks_cni = a.cni;
      flat.aks_ingress = a.ingress; flat.aks_outbound = a.outbound; flat.aks_zones = a.zones;
      flat.aks_sys_size = a.sysNode.size; flat.aks_sys_count = a.sysNode.count;
      flat.aks_user_size = a.userNode.size; flat.aks_user_count = a.userNode.count;
      flat.aks_workload_identity = a.workloadIdentity; flat.aks_kv_csi = a.kvCsi; flat.aks_acr_integration = a.acr; flat.aks_acr_name = a.acrName || "";
      flat.aks_policy = a.policy; flat.aks_network_policy = a.networkPolicy; flat.aks_pod_security = a.podSecurity;
    }
    if(p.application?.type==="SAP"){
      const a = p.application.sap;
      flat.sap_enabled = true;
      flat.sap_region = a.region; flat.sap_pattern = a.pattern; flat.sap_ha = a.ha; flat.sap_db = a.db; flat.sap_sid = a.sid;
      flat.sap_app_vm = a.appVm; flat.sap_db_vm = a.dbVm; flat.sap_zones = a.zones;
      flat.sap_anf = a.anf; flat.sap_backup = a.backup; flat.sap_monitor = a.monitor;
      flat.sap_vnet_cidr = a.vnet.cidr; flat.sap_subnet_app = a.vnet.subnets.app; flat.sap_subnet_db = a.vnet.subnets.db;
    }
    if(p.application?.type==="APIM"){
      const a = p.application.apim;
      flat.apim_enabled = true;
      flat.apim_region = a.region; flat.apim_sku = a.sku; flat.apim_capacity = a.capacity;
      flat.apim_vnet_mode = a.vnetMode; flat.apim_private_endpoints = a.privateEndpoints;
      flat.apim_zones = a.zones; flat.apim_managed_identity = a.managedIdentity;
    }
    return flat;
  }

  // --- CIDR utilities ---
  function ipToInt(ip){ return ip.split('.').reduce((acc,oct)=> (acc<<8) + (parseInt(oct,10)&255), 0)>>>0; }
  function isValidIpv4(ip){ return /^(\d{1,3}\.){3}\d{1,3}$/.test(ip) && ip.split('.').every(n=>+n>=0 && +n<=255); }
  function isValidCidr(c){
    const m=c.match(/^(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\/(\d{1,2})$/);
    if(!m) return false; const [,ip,p]=m; const pref=+p;
    return isValidIpv4(ip) && pref>=0 && pref<=32;
  }
  function cidrToRange(c){
    const [ip,p]=c.split('/'); const base=ipToInt(ip); const pref=Number(p);
    const mask = pref===0 ? 0 : (0xFFFFFFFF << (32 - pref)) >>> 0;
    const start = (base & mask) >>> 0;
    const size = (pref===32 ? 1 : Math.pow(2, 32 - pref));
    const end = (start + size - 1) >>> 0;
    return [start,end];
  }
  function rangeContains(outer, inner){ return inner[0]>=outer[0] && inner[1]<=outer[1]; }
  function rangesOverlap(a,b){ return !(a[1]<b[0] || b[1]<a[0]); }
  function subnetWithin(superCidr, subCidr){
    if(!isValidCidr(superCidr) || !isValidCidr(subCidr)) return false;
    return rangeContains(cidrToRange(superCidr), cidrToRange(subCidr));
  }

  // APIM compatibility hints (non-blocking)
  function apimCompatWarnings(s){
    const msgs=[];
    if(s.archetype==="APIM"){
      const sku = (s.apimSku||"").toLowerCase();
      const vnet = s.apimVnetMode||"None";
      if(vnet!=="None" && (sku==="basic" || sku==="standard")){
        msgs.push("APIM: Selected VNet mode may not be supported with this SKU. Please verify SKU/VNet compatibility in docs.");
      }
      if(s.apimPrivateEndpoints==="Yes" && vnet==="None"){
        msgs.push("APIM: Private Endpoints are typically used with VNet modes (External/Internal).");
      }
    }
    return msgs;
  }

  // Generate & UI
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

    const hints = apimCompatWarnings(s);
    if(hints.length) toast(hints[0]);

    toast("Generated");
  }

  function readState(){
    const state = {};
    for (const k in el){
      const node = el[k];
      if(!node) continue;
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

  // Events
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
  btn.exportTfvars.addEventListener("click", ()=>{
    const tfv = buildTfvars(readState());
    const text = Object.entries(tfv).map(([k,v])=>{
      if(Array.isArray(v)) return `${k} = [${v.map(x=>typeof x==="string" ? `"${x}"` : x).join(", ")}]`;
      if(typeof v === "string") return `${k} = "${v}"`;
      return `${k} = ${v}`;
    }).join("\n");
    downloadFile("alz-platform.tfvars", text, "text/plain");
  });
  btn.share.addEventListener("click", shareLink);

  ids.forEach(k=> el[k] && el[k].addEventListener("change", ()=>{ saveState(); if(k==="archetype") toggleArchetype(); }));

  loadState();
  if(!localStorage.getItem("lzgen:v1")) applyPreset("starter");
  toggleArchetype();
})();
