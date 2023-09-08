import { useRef, } from 'react'
import * as THREE from 'three';
import {OrbitControls} from 'three-orbitcontrols-ts';
//初始化场景
export const useScence=()=>{
    const scence = useRef(new THREE.Scene()).current;
    return scence
}
//初始化相机
export const useCamera=(type:string, param?:any)=>{
    const camera = useRef(new THREE[type||'PerspectiveCamera'](param)).current;
    return camera
}
//初始化渲染器
export const useRender=(type:string, param?:any)=>{
    const render = useRef(new THREE[type](param)).current; 
    return render
}
//控件
export const useOrbitControls=(camera:any,element:any)=>{
    const controls = new OrbitControls( camera, element );
    return controls
}
//坐标
export const useAxes=(size:number)=>{
    const axes = new THREE.AxesHelper(size);
    return axes
}
//光源
export const useLight=(type:string, ...param:any)=>{
    const ambLight = new THREE[type](...param) // 基本光源
    return ambLight
}