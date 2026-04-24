import timLogo from "@/assets/logos/tim-logo.png";
import claroLogo from "@/assets/logos/claro-logo.svg";
import vivoLogo from "@/assets/logos/vivo-logo.png";
import vrLogo from "@/assets/logos/vr-logo.png";
import c6Logo from "@/assets/logos/c6-logo.png";
import {
  menuOptionsClaro,
  menuOptionsTim,
  menuOptionsVivo,
  menuOptionsVR,
  menuOptionsC6,
} from "./menuItems.const";

/* 
brisanet.megalead.digital
tim.megalead.digital
vivo.megalead.digital
algar.megalead.digital
claro.megalead.digital
nio.megalead.digital
vero.megalead.digital
c6.megalead.digital
vr.megalead.digital
esses domínios, colocar no lugar dos numeros de portas dos options 
*/

// const [subdomain] = window.location.hostname.split('.'); // - PRODUÇÃO // usar esse
const subdomain = window.location.port; // - DEV // remover essse quando ja tiver os domínios configurados
const url = window.location.origin;

export const options = {
  "9001": {
    name: "Tim",
    logo: timLogo,
    primaryColor: "#0026d9",
    baseUrl: "https://evolution.bigdates.com.br:3720",
    favicon: `${url}/favicon/tim.ico`,
    optionsMenu: menuOptionsTim,
  },
  "9002": {
    name: "Claro",
    logo: claroLogo,
    primaryColor: "#da291c",
    baseUrl: "https://evolution.bigdates.com.br:3720",
    favicon: `${url}/favicon/claro.ico`,
    optionsMenu: menuOptionsClaro,
  },
  "9003": {
    name: "Vivo",
    logo: vivoLogo,
    primaryColor: "#660099",
    baseUrl: "https://evolution.bigdates.com.br:3720",
    favicon: `${url}/favicon/vivo.ico`,
    optionsMenu: menuOptionsVivo,
  },
  "9004": {
    name: "VR",
    logo: vrLogo,
    primaryColor: "#008a1e",
    baseUrl: "https://evolution.bigdates.com.br:3720",
    favicon: `${url}/favicon/vr.ico`,
    optionsMenu: menuOptionsVR,
  },
  "9005": {
    name: "C6",
    logo: c6Logo,
    primaryColor: "#008a1e",
    baseUrl: "https://evolution.bigdates.com.br:3720",
    favicon: `${url}/favicon/c6.ico`,
    optionsMenu: menuOptionsC6,
  },
};

export const appSetting =
  options[subdomain as keyof typeof options] || options["9001"];
