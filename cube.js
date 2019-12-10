"use strict";




function main() {

    var canvas = document.getElementById("responsive-canvas");
    var heightRatio = 1;
    canvas.width = 600;
    // canvas.height = $("#column").height();
    canvas.height = canvas.width * heightRatio;

    const renderer = new THREE.WebGLRenderer({ canvas });
    window.addEventListener("resize", onWindowResize, false);

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
        40,
        canvas.width / canvas.height,
        1,
        500
    );

    renderer.setSize(canvas.width, canvas.height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0xffe6b5, 1);
    document.body.appendChild(renderer.domElement);

    function onWindowResize() {
        camera.aspect = canvas.height / canvas.width;

        renderer.setSize(canvas.width, canvas.height);
        camera.updateProjectionMatrix();
    }

    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x8e8599 });
    var cube = new THREE.Mesh(geometry, material);
    var geo = new THREE.EdgesGeometry(cube.geometry);
    var mat = new THREE.LineBasicMaterial({ color: 0xffe6b5, linewidth: 10 });
    var wireframe = new THREE.LineSegments(geo, mat);

    wireframe.renderOrder = 1; // make sure wireframes are rendered 2nd
    cube.add(wireframe);

    scene.add(cube);

    camera.position.z = 4;

    var animate = function () {
        requestAnimationFrame(animate);

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        renderer.render(scene, camera);
    };

    animate();


}



main();

