import {useState} from 'react';
import type {Garment} from '../types';
import {AvatarPreview} from './AvatarPreview';
import {discoveryPalettes} from './GarmentLayers';
import imageData from '../data/catalog-images.json';

export const catalogImages:Record<string,{src:string;small:string;label:string}>=imageData;

export function GarmentCatalogImage({garment,detail=false}:{garment:Garment;detail?:boolean}){
 const asset=catalogImages[garment.id];
 const [failed,setFailed]=useState('');
 if(asset&&failed!==asset.src)return <img className="catalog-photo" src={asset.src} srcSet={`${asset.small} 400w, ${asset.src} 800w`} sizes={detail?'(max-width:1023px) 100vw, 600px':'(max-width:359px) 100vw, (max-width:767px) 50vw, (max-width:1023px) 33vw, 400px'} alt={`${garment.name} · ${asset.label}`} loading="lazy" decoding="async" width={800} height={1200} onError={()=>setFailed(asset.src)}/>;
 return <AvatarPreview garment={garment} primary={garment.color} secondary={discoveryPalettes[garment.id]?.secondary} accent={discoveryPalettes[garment.id]?.accent} display="garment"/>;
}
