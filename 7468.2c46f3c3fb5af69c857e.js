"use strict";(self.webpackChunksn_mermaid=self.webpackChunksn_mermaid||[]).push([[7468],{57575:(t,e,a)=>{function r(t,e){t.accDescr&&e.setAccDescription?.(t.accDescr),t.accTitle&&e.setAccTitle?.(t.accTitle),t.title&&e.setDiagramTitle?.(t.title)}a.d(e,{S:()=>r}),(0,a(27066).K2)(r,"populateCommonDb")},47468:(t,e,a)=>{a.d(e,{diagram:()=>w});var r=a(57575),n=a(65241),l=a(68529),o=a(27066),i=a(89859),c={packet:[]},s=structuredClone(c),d=o.UI.packet,k=(0,o.K2)((()=>{const t=(0,n.$t)({...d,...(0,o.zj)().packet});return t.showBits&&(t.paddingY+=10),t}),"getConfig"),p=(0,o.K2)((()=>s.packet),"getPacket"),b={pushWord:(0,o.K2)((t=>{t.length>0&&s.packet.push(t)}),"pushWord"),getPacket:p,getConfig:k,clear:(0,o.K2)((()=>{(0,o.IU)(),s=structuredClone(c)}),"clear"),setAccTitle:o.SV,getAccTitle:o.iN,setDiagramTitle:o.ke,getDiagramTitle:o.ab,getAccDescription:o.m7,setAccDescription:o.EI},g=(0,o.K2)((t=>{(0,r.S)(t,b);let e=-1,a=[],n=1;const{bitsPerRow:l}=b.getConfig();for(let{start:r,end:i,label:c}of t.blocks){if(i&&i<r)throw new Error(`Packet block ${r} - ${i} is invalid. End must be greater than start.`);if(r!==e+1)throw new Error(`Packet block ${r} - ${i??r} is not contiguous. It should start from ${e+1}.`);for(e=i??r,o.Rm.debug(`Packet block ${r} - ${e} with label ${c}`);a.length<=l+1&&b.getPacket().length<1e4;){const[t,e]=h({start:r,end:i,label:c},n,l);if(a.push(t),t.end+1===n*l&&(b.pushWord(a),a=[],n++),!e)break;({start:r,end:i,label:c}=e)}}b.pushWord(a)}),"populate"),h=(0,o.K2)(((t,e,a)=>{if(void 0===t.end&&(t.end=t.start),t.start>t.end)throw new Error(`Block start ${t.start} is greater than block end ${t.end}.`);return t.end+1<=e*a?[t,void 0]:[{start:t.start,end:e*a-1,label:t.label},{start:e*a,end:t.end,label:t.label}]}),"getNextFittingBlock"),f={parse:(0,o.K2)((async t=>{const e=await(0,i.qg)("packet",t);o.Rm.debug(e),g(e)}),"parse")},u=(0,o.K2)(((t,e,a,r)=>{const n=r.db,i=n.getConfig(),{rowHeight:c,paddingY:s,bitWidth:d,bitsPerRow:k}=i,p=n.getPacket(),b=n.getDiagramTitle(),g=c+s,h=g*(p.length+1)-(b?0:c),f=d*k+2,u=(0,l.D)(e);u.attr("viewbox",`0 0 ${f} ${h}`),(0,o.a$)(u,h,f,i.useMaxWidth);for(const[t,e]of p.entries())m(u,e,t,i);u.append("text").text(b).attr("x",f/2).attr("y",h-g/2).attr("dominant-baseline","middle").attr("text-anchor","middle").attr("class","packetTitle")}),"draw"),m=(0,o.K2)(((t,e,a,{rowHeight:r,paddingX:n,paddingY:l,bitWidth:o,bitsPerRow:i,showBits:c})=>{const s=t.append("g"),d=a*(r+l)+l;for(const t of e){const e=t.start%i*o+1,a=(t.end-t.start+1)*o-n;if(s.append("rect").attr("x",e).attr("y",d).attr("width",a).attr("height",r).attr("class","packetBlock"),s.append("text").attr("x",e+a/2).attr("y",d+r/2).attr("class","packetLabel").attr("dominant-baseline","middle").attr("text-anchor","middle").text(t.label),!c)continue;const l=t.end===t.start,k=d-2;s.append("text").attr("x",e+(l?a/2:0)).attr("y",k).attr("class","packetByte start").attr("dominant-baseline","auto").attr("text-anchor",l?"middle":"start").text(t.start),l||s.append("text").attr("x",e+a).attr("y",k).attr("class","packetByte end").attr("dominant-baseline","auto").attr("text-anchor","end").text(t.end)}}),"drawWord"),$={byteFontSize:"10px",startByteColor:"black",endByteColor:"black",labelColor:"black",labelFontSize:"12px",titleColor:"black",titleFontSize:"14px",blockStrokeColor:"black",blockStrokeWidth:"1",blockFillColor:"#efefef"},w={parser:f,db:b,renderer:{draw:u},styles:(0,o.K2)((({packet:t}={})=>{const e=(0,n.$t)($,t);return`\n\t.packetByte {\n\t\tfont-size: ${e.byteFontSize};\n\t}\n\t.packetByte.start {\n\t\tfill: ${e.startByteColor};\n\t}\n\t.packetByte.end {\n\t\tfill: ${e.endByteColor};\n\t}\n\t.packetLabel {\n\t\tfill: ${e.labelColor};\n\t\tfont-size: ${e.labelFontSize};\n\t}\n\t.packetTitle {\n\t\tfill: ${e.titleColor};\n\t\tfont-size: ${e.titleFontSize};\n\t}\n\t.packetBlock {\n\t\tstroke: ${e.blockStrokeColor};\n\t\tstroke-width: ${e.blockStrokeWidth};\n\t\tfill: ${e.blockFillColor};\n\t}\n\t`}),"styles")}}}]);