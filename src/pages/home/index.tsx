import * as THREE from 'three';
import { useRef, useEffect, useCallback } from 'react'
import {useCamera,useScence,useRender,useOrbitControls,useAxes,useLight} from '../../hooks/useThree3d'
import './index.less'
const Home =()=>{
    const page = useRef(); // useRef不会导致重新渲染
    /**
     * 场景、相机、渲染器作为threejs的基本结构，需要在页面进入时渲染完毕
     */
    const scence = useScence(); //场景
    const camera = useCamera('PerspectiveCamera'); //摄像机（透视投影）
    const render = useRender('WebGLRenderer') //渲染器
    useOrbitControls( camera, render.domElement );//创建控件对象
    const axes = useAxes(20);// 添加坐标轴
    const ambLight= useLight('AmbientLight','#ffffff', 0.3)
    const spotLight = useLight('SpotLight',0xFFFFFF)
    const timer = useRef(null) // 定时器
    /** 
     * 自适应浏览器窗口大小
    */
    const reszie = () => {
        //innerHeight 返回窗口的文档显示区的高度，如果有垂直滚动条，也包括滚动条高度
        //innerWidth 返回窗口的文档显示区的宽度，如果有水平滚动条，也包括滚动条高度
        camera.aspect = (window.innerWidth / window.innerHeight);
        camera.updateProjectionMatrix();
        render.setSize(window.innerWidth,window.innerHeight);
        
    }
    window.addEventListener('resize', reszie, false)


    useEffect(()=>{
        page.current.appendChild(render.domElement);
        init();
        initLight();
        initMesh();
        renderScene();
        return () => {
            // 销毁定时器
            cancelAnimationFrame(timer.current);
        }
    },[])

    // 初始化场景
    const init = useCallback(() => {
        render.setSize(page.current.offsetWidth, page.current.offsetHeight); // 渲染器设置尺寸
        // 设置背景颜色
        render.setClearColor(new THREE.Color(0x000000)); // 设置背景颜色和透明度
        render.shadowMap.enabled = true; // 渲染器允许渲染阴影⭐
        scence.add(axes);
        /**
         * 设置摄像机的属性
         */
        camera.aspect = (page.current.offsetWidth / page.current.offsetHeight) // 摄像机设置屏幕宽高比
        camera.fov = 45; // 摄像机的视角
        camera.near = 0.01; // 近面距离
        camera.far = 1001; // 远面距离
        camera.position.set(30, 40, 30) // 设置摄像机在threejs坐标系中的位置
        camera.lookAt(0, 0, 0) // 摄像机的指向
        camera.updateProjectionMatrix(); // 更新摄像机投影矩阵,在任何参数被改变以后必须被调用
    }, [render, scence])

    // 初始化环境光
    const initLight = () => {
        /**
         * 设置聚光灯相关的的属性
         */
        spotLight.position.set(50, 80, 15);
        spotLight.castShadow = true; // 只有该属性为true时，该点光源允许产生阴影，并且下列属性可用
        spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
        scence.add(ambLight,spotLight); // 向场景中添加光源
    }

    // 初始化模型
    const initMesh = () => {
        /**
         * 创建球体
         */
        const texture = new THREE.TextureLoader().load('./room.jpg');
        const sphereGeometry = new THREE.SphereGeometry(16, 50, 50); // 球状几何体
        sphereGeometry.scale(16, 16, -16);
        const sphereMaterial = new THREE.MeshBasicMaterial({ map: texture });
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial); // 向场景中添加创建的球模型
        scence.add(sphere); // 向场景中添加光源

    }
     // 渲染器执行渲染
     const renderScene = useCallback(() => {
        timer.current = window.requestAnimationFrame(() => renderScene()); // 启动动画，见interactive.md
        render.render(scence, camera);
    }, [render])
    return  <div className='page' ref={page}></div>
}
export default Home