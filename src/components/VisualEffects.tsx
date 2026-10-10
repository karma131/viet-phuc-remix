import {useEffect,useRef,useState} from 'react';
import {AnimatePresence,motion,useReducedMotion} from 'motion/react';
import {ArrowUp} from 'lucide-react';
import type {CSSProperties} from 'react';

export function HeroAtmosphere(){
 return <div className="hero-atmosphere" aria-hidden="true"><div className="hero-light"/>{Array.from({length:24},(_,i)=><i key={i} className={i%3===0?'floating-petal':'golden-mote'} style={{'--left':`${(i*37+11)%100}%`,'--top':`${(i*23+7)%95}%`,'--duration':`${9+i%7}s`,'--delay':`${-i*.8}s`,'--drift':`${i%2?-32:36}px`,'--size':`${i%3===0?9+i%5:2+i%3}px`} as CSSProperties}/>)}</div>;
}

export function VisualEffects({route,celebration}:{route:string;celebration:number}){
 const reduced=useReducedMotion();const [progress,setProgress]=useState(0),[showTop,setShowTop]=useState(false),[burst,setBurst]=useState(false);
 const lastCelebration=useRef(celebration);
 useEffect(()=>{
  let frame=0;
  const update=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{const distance=document.documentElement.scrollHeight-innerHeight;setProgress(distance>0?scrollY/distance:0);setShowTop(scrollY>650);});};
  update();addEventListener('scroll',update,{passive:true});addEventListener('resize',update);
  return()=>{cancelAnimationFrame(frame);removeEventListener('scroll',update);removeEventListener('resize',update);};
 },[route]);

 useEffect(()=>{
  if(reduced)return;
  const seen=new WeakSet<Element>();
  const observer=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){(entry.target as HTMLElement).dataset.reveal='visible';observer.unobserve(entry.target)}},{threshold:.08,rootMargin:'0px 0px 30px 0px'});
  const scan=()=>{
   document.querySelectorAll<HTMLElement>('.section-heading,.garment-card,.story-card,.how-grid>div,.studio-promo>div,.collection-grid>button,.look-card,.source-card,.control-section').forEach((el,i)=>{
    if(seen.has(el))return;seen.add(el);el.dataset.reveal='pending';el.style.setProperty('--reveal-delay',`${i%4*65}ms`);observer.observe(el);
   });
  };
  scan();const mutations=new MutationObserver(scan);const main=document.querySelector('main');
  mutations.observe(document.getElementById('root')!,{childList:true,subtree:true});
  return()=>{observer.disconnect();mutations.disconnect();main?.querySelectorAll<HTMLElement>('[data-reveal]').forEach(el=>{el.dataset.reveal='visible'})};
 },[route,reduced]);

 useEffect(()=>{
  if(reduced||!matchMedia('(hover:hover) and (pointer:fine)').matches)return;
  let frame=0;let current:HTMLElement|null=null;
  const reset=()=>{if(current){current.style.setProperty('--tilt-x','0deg');current.style.setProperty('--tilt-y','0deg');current=null;}};
  const move=(event:PointerEvent)=>{
   if(event.pointerType!=='mouse')return;cancelAnimationFrame(frame);
   frame=requestAnimationFrame(()=>{
    const target=(event.target as Element).closest<HTMLElement>('.garment-art,.story-art,.look-art,.imperial-frame,.collection-grid>button');
    if(target!==current)reset();current=target;
    if(target){const box=target.getBoundingClientRect(),x=(event.clientX-box.left)/box.width,y=(event.clientY-box.top)/box.height;target.style.setProperty('--tilt-x',`${(x-.5)*5}deg`);target.style.setProperty('--tilt-y',`${(.5-y)*5}deg`);target.style.setProperty('--spot-x',`${x*100}%`);target.style.setProperty('--spot-y',`${y*100}%`);}
    const hero=(event.target as Element).closest<HTMLElement>('.hero');
    if(hero){const box=hero.getBoundingClientRect();hero.style.setProperty('--hero-x',`${((event.clientX-box.left)/box.width-.5)*10}px`);hero.style.setProperty('--hero-y',`${((event.clientY-box.top)/box.height-.5)*8}px`);}
   });
  };
  document.addEventListener('pointermove',move,{passive:true});document.addEventListener('pointerleave',reset);
  return()=>{cancelAnimationFrame(frame);reset();document.removeEventListener('pointermove',move);document.removeEventListener('pointerleave',reset)};
 },[reduced]);

 useEffect(()=>{
  if(reduced)return;
  const click=(event:MouseEvent)=>{
   const button=(event.target as Element).closest<HTMLElement>('.button,.round,.nav-studio');if(!button||button.hasAttribute('disabled'))return;
   const box=button.getBoundingClientRect(),size=Math.max(box.width,box.height)*2;
   const ripple=document.createElement('span');ripple.className='ink-ripple';ripple.setAttribute('aria-hidden','true');
   Object.assign(ripple.style,{width:`${size}px`,height:`${size}px`,left:`${(event.detail?event.clientX-box.left:box.width/2)-size/2}px`,top:`${(event.detail?event.clientY-box.top:box.height/2)-size/2}px`});
   button.appendChild(ripple);ripple.addEventListener('animationend',()=>ripple.remove(),{once:true});
  };
  document.addEventListener('click',click);return()=>document.removeEventListener('click',click);
 },[reduced]);

 useEffect(()=>{
  if(lastCelebration.current===celebration)return;lastCelebration.current=celebration;
  if(reduced)return;setBurst(true);const timer=setTimeout(()=>setBurst(false),1000);return()=>clearTimeout(timer);
 },[celebration,reduced]);

 return <><div className="reading-progress" aria-hidden="true" style={{transform:`scaleX(${progress})`}}/><AnimatePresence>{showTop&&<motion.button className="back-to-top" aria-label="Về đầu trang" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:10}} onClick={()=>scrollTo({top:0,behavior:reduced?'instant':'smooth'})}><ArrowUp size={19}/></motion.button>}</AnimatePresence>{burst&&<div className="save-burst" key={celebration} aria-hidden="true">{Array.from({length:14},(_,i)=><span key={i} style={{'--dx':`${Math.cos(i*Math.PI/7)*(90+i%3*30)}px`,'--dy':`${Math.sin(i*Math.PI/7)*(90+i%3*30)}px`,'--spin':`${i*37}deg`,'--delay':`${i%3*30}ms`} as CSSProperties}>✦</span>)}</div>}</>;
}
