import React from 'react';
import {ArtTile} from './Artwork';
import {Arm,Box,GOLD,INK,Label,PAPER,RED,Robot,Star,TEAL} from './Drawing';
import {clamp,ClipKind,lerp,progress,seed,stateAt} from '../timeline';
export type State = ReturnType<typeof stateAt>;

export const Sticker = ({x,y,text,size=30,fill=GOLD,rotate=0}: {x:number;y:number;text:string;size?:number;fill?:string;rotate?:number}) => <g transform={`rotate(${rotate} ${x} ${y})`}><Label x={x+1} y={y+3} size={size} anchor="middle" fill={INK} stroke={INK} strokeWidth={7} strokeLinejoin="round" weight={700}>{text}</Label><Label x={x} y={y} size={size} anchor="middle" fill={fill} stroke={INK} strokeWidth={4} paintOrder="stroke" strokeLinejoin="round" weight={700}>{text}</Label></g>;

export const Toolbar = ({s}: {s:State}) => {
 const sec=Math.floor(s.t),frames=Math.floor((s.t-sec)*30);
 return <g><Box x={26} y={14} w={1228} h={42} fill="#fcfaf4" r={10}/>
  {['#de8587','#edcf77','#94be99'].map((c,i)=><circle key={c} cx={44+i*16} cy="34" r="4.6" fill={c} stroke={INK} strokeWidth="1"/>)}
  <Robot x={95} y={27} s={.19} mood="focus"/>
  <path d="M96 25 l17 -4 m-15 -1 v-4 m6 3 v-5 m6 4 v-5" stroke={INK} strokeWidth="2"/>
  <Label x={127} y={40} size={21}>招聘工作台 · 从简历到入职</Label>
  <Box x={566} y={18} w={148} h={33} fill="#393730" r={7}/>
  <Label x={640} y={40} anchor="middle" size={20} fill="#f7f0e4">00:00:{String(sec).padStart(2,'0')}:{String(frames).padStart(2,'0')}</Label>
  <Label x={737} y={39} size={13} fill="#969387">· 已自动保存</Label>
  <Box x={990} y={21} w={61} h={27} fill="#efeadc" r={7} sw={1.6}/><Label x={1020} y={39} anchor="middle" size={15}>1080p</Label>
  <Box x={1064} y={18} w={176} h={33} fill={s.t<24?TEAL:s.t<25.8?GOLD:'#9ec5aa'} r={8}/>
  <Label x={1152} y={41} anchor="middle" size={18} fill={s.t<24?'white':INK} weight={700}>{s.t<24?'确认入职':s.t<25.8?`办理中 ${Math.round(s.exportProgress*99)}%`:'已入职 ✓'}</Label>
 </g>;
};

export const TransitionIcon = ({index,x,y,s=1}: {index:number;x:number;y:number;s?:number}) => <g transform={`translate(${x} ${y}) scale(${s})`} stroke={INK} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
 {index===0?<><rect x="-17" y="-15" width="34" height="32" rx="4" fill="#fffdf5"/><path d="M-17 -5 H17 M-9 -19 V-11 M9 -19 V-11"/><path d="M-9 4 l5 5 12 -12" stroke={TEAL} strokeWidth="3" fill="none"/></>:index===1?<><path d="M-13 -17 H15 V17 H-13Z" fill="#fffef5"/><path d="M-7 -9 H9 M-7 -3 H9"/><path d="M-7 7 l4 4 10 -10" stroke={TEAL} strokeWidth="3" fill="none"/></>:index===2?<><rect x="-18" y="-13" width="36" height="27" rx="3" fill={GOLD}/><path d="M-18 -13 L0 2 18 -13 M-18 14 l12 -11 m24 11 -12 -11" fill="none"/></>:index===3?<><circle r="19" fill="#e0eee4"/><path d="M-10 0 l7 8 14 -16" stroke={TEAL} strokeWidth="4" fill="none"/></>:index===4?<><circle r="19" fill="#fff3d2"/><path d="M0 -11 V0 l8 6" strokeWidth="3" fill="none"/></>:<><rect x="-18" y="-17" width="36" height="34" rx="4" fill="#e5ddef"/><circle cy="-4" r="6" fill="#fffdf5"/><path d="M-10 12 q0 -10 10 -10 t10 10Z" fill="#fffdf5"/></>}
 </g>;

export const Sidebar = ({s}: {s:State}) => <g>
 <Box x={26} y={66} w={254} h={314} fill="#faf7ef"/>
 {['人才','流程','评价'].map((word,i)=><g key={word}><Box x={38+i*80} y={76} w={73} h={25} r={5} fill={s.tab===i?GOLD:'#f0ece2'} sw={1.5}/><Label x={74+i*80} y={94} anchor="middle" size={16} fill={s.tab===i?INK:'#989285'}>{word}</Label></g>)}
 {s.tab===0?<>
 {(['resume','interview','offer','onboard'] as ClipKind[]).map((kind,i)=>{const x=39+(i%2)*123,y=112+Math.floor(i/2)*99;return <g key={kind}>
  <Box x={x} y={y} w={109} h={67} fill="white" r={6}/><ArtTile x={x+2} y={y+2} w={105} h={63} kind={kind}/>
  <rect x={x+78} y={y+49} width="28" height="16" rx="4" fill="#302d2788"/><Label x={x+92} y={y+61} size={11} fill="white" anchor="middle">{['AI','HR','录用','档案'][i]}</Label>
  <Label x={x+54} y={y+84} size={14} anchor="middle">{['简历解析','面试评价','Offer管理','入职档案'][i]}</Label>
  {s.t>2+i*.57&&s.t<2.5+i*.57&&<rect x={x-4} y={y-4} width="117" height="75" rx="8" fill="none" stroke={GOLD} strokeWidth="3"/>}
 </g>;})}
 {[0,1].map(i=><g key={i}><rect x={39+i*123} y="309" width="109" height="48" rx="6" fill="none" stroke="#c3bcaf" strokeWidth="1.5" strokeDasharray="5 5"/><Label x={93+i*123} y={341} anchor="middle" size={30} fill="#a9a596">＋</Label><Label x={93+i*123} y={373} anchor="middle" size={13} fill="#aaa596">上传简历</Label></g>)}
 </>:s.tab===1?<>
 {['安排面试','记录评价','创建Offer','确认录用','待入职','员工档案'].map((name,i)=>{const x=40+(i%2)*122,y=113+Math.floor(i/2)*85;return <g key={name}>
 <Box x={x} y={y} w={108} h={62} r={5} fill={['#c9c3df','#d6eee0','#f5d8e1','#d6eaf3','#f7e8bc','#eee8db'][i]} sw={1.7}/><TransitionIcon index={i} x={x+54} y={y+31} s={.72}/><Label x={x+54} y={y+77} anchor="middle" size={14}>{name}</Label>
 </g>;})}
 </>:<>
 {['专业能力','沟通表达','岗位匹配'].map((name,i)=><g key={name}><Box x={40} y={112+i*85} w={226} h={76} fill={['#fff3d2','#e5edf3','#e1eee4'][i]} sw={1.7}/><Label x={57} y={138+i*85} size={17}>{name}</Label>{Array.from({length:5},(_,j)=><Star key={j} x={69+j*39} y={164+i*85} r={10} fill={j<4?GOLD:'#eee9dc'}/>)}</g>)}
 </>}
</g>;

export const Settings = ({s}: {s:State}) => <g><Box x={1000} y={66} w={254} h={314} fill="#faf7ef"/>
 <Label x={1015} y={94} size={21}>评价维度</Label><Star x={1120} y={87} r={8} fill={GOLD}/><path d="M1016 111 H1240" stroke="#aaa79c" strokeWidth="1"/>
 {['专业能力','沟通表达','岗位匹配','评价记录'].map((name,i)=>{const v=[.85,.8,.9,1][i]*progress(s.t,15.8+i*.45,16.7+i*.45);const y=155+i*60;return <g key={name}>
 <Label x={1016} y={y-21} size={17}>{name}</Label><Label x={1238} y={y-21} size={14} anchor="end" fill="#77786e">{i===3?(v>.99?'已记录':'记录中'):(v>.1?'4 / 5':'待评价')}</Label>
 <rect x="1018" y={y-3} width="215" height="7" rx="3.5" fill="#e2e0d6" stroke={INK} strokeWidth="1.3"/><rect x="1018" y={y-2} width={215*v} height="5" rx="2.5" fill={TEAL}/>
 <circle cx={1018+215*v} cy={y} r="9" fill="#fffdf6" stroke={INK} strokeWidth="1.8"/><circle cx={1018+215*v} cy={y} r="1.4" fill="#8b8b7f"/>
 </g>;})}
</g>;

export const Timeline = ({s}: {s:State}) => {
 const step=s.t<5.3?0:s.t<15.4?1:s.t<20.4?2:s.t<25.65?3:4;
 const move=s.t<5.3?0:s.t<15.4?progress(s.t,5.3,6.5):s.t<20.4?1+progress(s.t,15.4,16.5):s.t<25.65?2+progress(s.t,20.4,22):3+progress(s.t,24,25.65);
 return <g><Box x={26} y={392} w={1228} h={310} fill="#faf8f0"/><Label x={46} y={422} size={20}>招聘流程</Label><Label x={1230} y={421} size={12} fill="#908b7e" anchor="end">同一位候选人 · 连续推进</Label>
 {['简历','面试','Offer','待入职','已入职'].map((name,i)=><g key={name}><Box x={49+i*237} y={443} w={220} h={146} fill={i<=step?'#ecf1df':'#f0eee5'} r={8} sw={1.5}/><Label x={159+i*237} y={465} anchor="middle" size={17} fill={i<=step?'#4f7c6a':'#a4a095'}>{name}</Label><path d={`M${63+i*237} 477 H${253+i*237}`} stroke="#d9d7ca"/>{i<4&&<path d={`M${269+i*237} 520 h12 m-4 -4 4 4 -4 4`} stroke={INK} fill="none" strokeWidth="1.3"/>}</g>)}
 <g transform={`translate(${63+237*move} ${493-Math.sin((move%1)*Math.PI)*10})`}><Box x={0} y={0} w={191} h={79} fill="#fffdf6" r={7} sw={1.5}/><circle cx="29" cy="29" r="18" fill={GOLD} stroke={INK}/><Label x={29} y={35} size={18} anchor="middle">林</Label><Label x={58} y={27} size={18}>林沐</Label><Label x={58} y={47} size={12} fill="#8c877c">产品设计师</Label><Label x={16} y={67} size={11} fill="#5b9075">{['资料已整理','面试与评价','录用信息确认','待入职准备','欢迎加入团队'][step]}</Label></g>
 <g opacity={progress(s.t,20.4,21)}><Label x={367} y={636} size={17} fill="#8a826f">Offer → 待入职 → 员工档案</Label><path d="M371 649 H853" stroke={TEAL} strokeWidth="3" pathLength="1" strokeDasharray="1" strokeDashoffset={1-progress(s.t,20.5,25.65)}/>{s.t>25.65&&<Star x={884} y={633} r={11} fill={GOLD}/>}</g>
 <Label x={1230} y={678} size={11} fill="#aaa497" anchor="end">职位 · 简历 · 面试 · Offer · 入职</Label></g>;
};

export const EditorRobot = ({s}: {s:State}) => {
 const t=s.t;
 let x=146,y=598;
 if(t>=15.4&&t<20.5){x=lerp(146,458,progress(t,15.4,15.8));y=598;}
 if(t>=20.5&&t<23.5){x=lerp(455,674,progress(t,20.5,23.5));y=597-9*Math.abs(Math.sin(t*8));}
 if(t>=23.5){x=lerp(674,950,progress(t,23.5,24.15));y=598;}
 // Keep the assistant inside the moving camera throughout the recruitment journey.
 y=(550-s.focusY)/s.zoom;
 const sx=x+75,sy=y+29;
 let target: [number,number]|null=null;
 if(t>=2.0&&t<4.75){const i=clamp(Math.floor((t-2)/.62),0,3);const p=((t-2)/.62)%1;target=[lerp(90+(i%2)*123,160+i*180,progress(p,.35,.9)),lerp(145+Math.floor(i/2)*100,505,progress(p,.35,.9))];}
 if(t>=6.4&&t<7.5) target=[lerp(380,511,progress(t,6.4,6.8)),565];
 if(t>=8.4&&t<9.5){const p=progress(t,8.75,9.3);target=[lerp(94,261,p),lerp(144,520,p)];}
 if(t>=9.6&&t<10.7){const p=progress(t,10,10.5);target=[lerp(216,454,p),lerp(144,520,p)];}
 if(t>=10.75&&t<11.6){const p=progress(t,11,11.45);target=[lerp(94,620,p),lerp(230,520,p)];}
 if(t>=15.6&&t<16.8)target=[1018+215*.85*progress(t,15.8,16.7),155];
 if(t>=16.8&&t<18.2)target=[1018+215*.8*progress(t,16.25,17.15),215];
 if(t>=18.2&&t<19.7)target=[1018+215*.9*progress(t,16.7,17.6),275];
 if(t>=23.65&&t<24.2)target=[1150,35];
 return <g opacity={progress(t,1.9,2.15)*(1-s.ending)}>
  {target&&<Arm x1={sx} y1={sy} x2={target[0]} y2={target[1]}/>}
  {t>=2&&t<4.48&&target&&<g transform={`rotate(${Math.sin(t*7)*8} ${target[0]} ${target[1]})`}><Box x={target[0]-36} y={target[1]-20} w={72} h={43} r={3} fill={GOLD} sw={1.5}/><ArtTile x={target[0]-34} y={target[1]-18} w={68} h={39} kind={(['resume','interview','offer','onboard'] as ClipKind[])[clamp(Math.floor((t-2)/.62),0,3)]}/></g>}
  {t>8.4&&t<11.6&&target&&<g><circle cx={target[0]} cy={target[1]} r="19" fill="#fffdf2" stroke={INK} strokeWidth="1.7"/><TransitionIcon index={t<9.5?0:t<10.7?1:2} x={target[0]} y={target[1]} s={.65}/></g>}
  {t>=15.6&&t<19.7&&target&&<circle cx={target[0]} cy={target[1]} r="13" fill="none" stroke={GOLD} strokeWidth="4" opacity=".8"/>}
  <Robot x={x} y={y} s={.77} t={t} mood={t<5?'wink':t<7.8?'sleep':t<15.6?'focus':'happy'} glasses={t>20.2}/>
  {t>5.4&&t<6.45&&<g transform={`translate(380 440) scale(${progress(t,5.4,5.65)})`}><path d="M0 -40 H155 Q163 -40 163 -31 V-11 Q163 -4 151 -4 H87 L79 8 69 -4 H0 Q-8 -4 -8 -14 V-30 Q-8 -40 0 -40Z" fill="#fffdf5" stroke={INK} strokeWidth="2"/><Label x={76} y={-15} size={18} anchor="middle">安排面试中…</Label></g>}
  {t>6.5&&t<7.4&&<><Sticker x={470} y={408} text="唰!" fill="#e6a0b8" size={34} rotate={-10}/><path d="M507 505 Q541 529 507 568 Q521 537 507 505Z" fill="#fffdeb" stroke={INK} strokeWidth="1.5"/></>}
  {t>13.7&&t<14.45&&<g transform={`translate(${x-25} ${y+35})`}><Box x={0} y={0} w={124} h={68} r={10} fill="#d4d0c1"/><Box x={7} y={5} w={110} h={55} r={8} fill="#fffdf2"/><Label x={61} y={41} size={26} anchor="middle" weight={700}>评价记录</Label></g>}
  {t>14.5&&t<15.5&&<g transform="translate(830 210) rotate(-12)"><rect x="-55" y="-25" width="120" height="43" rx="4" fill="none" stroke="#7f9e77" strokeWidth="3"/><rect x="-50" y="-20" width="110" height="33" rx="3" fill="none" stroke="#7f9e77"/><Label x={5} y={6} anchor="middle" size={25} fill="#7f9e77" weight={700}>已记录</Label></g>}
  {t>21&&t<22.8&&<Sticker x={250} y={444} text="流程衔接!" fill={TEAL} size={35} rotate={-7}/>}
 </g>;
};
